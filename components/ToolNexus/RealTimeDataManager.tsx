// components/ToolNexus/RealTimeDataManager.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RealTimeData,
  ToolNexus,
  UserPersona,
  LiveDataPoint,
  Alert,
  WebSocketConnection
} from '../../types/tool-nexus';

interface RealTimeDataManagerProps {
  tool: ToolNexus;
  userPersona: UserPersona;
  onDataUpdate?: (data: RealTimeData) => void;
  onAlert?: (alert: Alert) => void;
}

// WebSocket connection manager
class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private listeners: Map<string, ((data: any) => void)[]> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  private maxReconnectAttempts = 5;

  connect(url: string, onData: (data: any) => void): Promise<WebSocketConnection> {
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(url);
        const connectionId = this.generateConnectionId();

        ws.onopen = () => {
          console.log(`WebSocket connected: ${connectionId}`);
          this.connections.set(connectionId, ws);
          this.addListener(connectionId, onData);
          this.reconnectAttempts.set(connectionId, 0);
          
          resolve({
            connection_id: connectionId,
            status: 'connected',
            last_activity: new Date(),
            message_count: 0,
            error_count: 0
          });
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.notifyListeners(connectionId, data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = () => {
          console.log(`WebSocket disconnected: ${connectionId}`);
          this.connections.delete(connectionId);
          this.listeners.delete(connectionId);
          this.attemptReconnect(url, connectionId, onData);
        };

        ws.onerror = (error) => {
          console.error(`WebSocket error: ${connectionId}`, error);
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(connectionId: string) {
    const ws = this.connections.get(connectionId);
    if (ws) {
      ws.close();
      this.connections.delete(connectionId);
      this.listeners.delete(connectionId);
    }
  }

  private generateConnectionId(): string {
    return `ws_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private addListener(connectionId: string, callback: (data: any) => void) {
    if (!this.listeners.has(connectionId)) {
      this.listeners.set(connectionId, []);
    }
    this.listeners.get(connectionId)!.push(callback);
  }

  private notifyListeners(connectionId: string, data: any) {
    const listeners = this.listeners.get(connectionId);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  private attemptReconnect(url: string, connectionId: string, onData: (data: any) => void) {
    const attempts = this.reconnectAttempts.get(connectionId) || 0;
    
    if (attempts < this.maxReconnectAttempts) {
      this.reconnectAttempts.set(connectionId, attempts + 1);
      
      setTimeout(() => {
        console.log(`Attempting to reconnect (${attempts + 1}/${this.maxReconnectAttempts}): ${connectionId}`);
        this.connect(url, onData);
      }, Math.pow(2, attempts) * 1000); // Exponential backoff
    } else {
      console.error(`Max reconnect attempts reached for: ${connectionId}`);
    }
  }
}

const RealTimeDataManager: React.FC<RealTimeDataManagerProps> = ({
  tool,
  userPersona,
  onDataUpdate,
  onAlert
}) => {
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const [connections, setConnections] = useState<WebSocketConnection[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsManagerRef = useRef<WebSocketManager>(new WebSocketManager());
  const dataBufferRef = useRef<Map<string, LiveDataPoint[]>>(new Map());

  // Initialize real-time data structure
  useEffect(() => {
    const initialData: RealTimeData = {
      tool_id: tool.tool_id,
      last_updated: new Date(),
      connections: [],
      data_streams: {
        performance_metrics: [],
        user_activity: [],
        system_health: [],
        pricing_updates: [],
        feature_usage: [],
        error_tracking: []
      },
      alerts: [],
      processing_queue: [],
      cache_status: {
        size: 0,
        hit_rate: 0,
        last_cleanup: new Date()
      },
      live_metrics: {
        current_visitors: 0,
        trial_starters_today: 0,
        active_users: 0,
        api_calls_per_minute: 0,
        server_response_time: 0,
        uptime_percentage: 0
      },
      recent_activity: [],
      system_status: {
        overall_status: 'operational',
        services: [],
        last_updated: new Date().toISOString()
      },
      trending_indicators: []
    };
    setRealTimeData(initialData);
  }, [tool.tool_id]);

  // Connect to data streams based on user persona
  const connectToDataStreams = useCallback(async () => {
    const streams = getDataStreamsForPersona(userPersona.primary_persona);
    const newConnections: WebSocketConnection[] = [];

    for (const stream of streams) {
      try {
        // Simulate WebSocket connection (in real implementation, use actual WebSocket URL)
        const connection = await wsManagerRef.current.connect(
          `wss://api.toolnexus.com/realtime/${tool.tool_id}/${stream.type}`,
          (data) => handleStreamData(stream.type, data)
        );
        
        newConnections.push(connection);
      } catch (error) {
        console.error(`Failed to connect to ${stream.type} stream:`, error);
        
        // Add alert for connection failure
        const alert: Alert = {
          id: `conn_fail_${Date.now()}`,
          type: 'error',
          severity: 'medium',
          title: 'Connection Failed',
          message: `Failed to connect to ${stream.name} data stream`,
          timestamp: new Date(),
          acknowledged: false,
          metadata: { stream_type: stream.type, error: (error as Error).message }
        };
        addAlert(alert);
      }
    }

    setConnections(newConnections);
    setIsConnected(newConnections.length > 0);
  }, [tool.tool_id, userPersona.primary_persona]);

  // Handle incoming stream data
  const handleStreamData = useCallback((streamType: string, data: any) => {
    const dataPoint: LiveDataPoint = {
      timestamp: new Date(),
      value: data.value,
      metadata: data.metadata || {},
      source: streamType
    };

    // Add to buffer for batch processing
    if (!dataBufferRef.current.has(streamType)) {
      dataBufferRef.current.set(streamType, []);
    }
    dataBufferRef.current.get(streamType)!.push(dataPoint);

    // Process data based on type
    processDataPoint(streamType, dataPoint);

    // Update real-time data state
    setRealTimeData(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        last_updated: new Date(),
        data_streams: {
          ...prev.data_streams,
          [streamType as keyof typeof prev.data_streams]: [...(prev.data_streams[streamType as keyof typeof prev.data_streams] || []), dataPoint].slice(-100) // Keep last 100 points
        }
      };
    });

    // Notify parent component
    if (onDataUpdate && realTimeData) {
      onDataUpdate(realTimeData);
    }
  }, [realTimeData, onDataUpdate]);

  // Process data point and generate insights
  const processDataPoint = useCallback((streamType: string, dataPoint: LiveDataPoint) => {
    switch (streamType) {
      case 'performance_metrics':
        checkPerformanceAlerts(dataPoint);
        break;
      case 'user_activity':
        checkActivityAnomalies(dataPoint);
        break;
      case 'system_health':
        checkHealthIssues(dataPoint);
        break;
      case 'pricing_updates':
        checkPricingChanges(dataPoint);
        break;
      case 'error_tracking':
        checkErrorSpikes(dataPoint);
        break;
    }
  }, []);

  // Alert generation functions
  const checkPerformanceAlerts = useCallback((dataPoint: LiveDataPoint) => {
    if (dataPoint.value.response_time > 5000) {
      const alert: Alert = {
        id: `perf_${Date.now()}`,
        type: 'warning',
        severity: 'high',
        title: 'Performance Degradation',
        message: `Response time exceeded 5s: ${dataPoint.value.response_time}ms`,
        timestamp: new Date(),
        acknowledged: false,
        metadata: { 
          metric: 'response_time', 
          value: dataPoint.value.response_time,
          threshold: 5000 
        }
      };
      addAlert(alert);
    }
  }, []);

  const checkActivityAnomalies = useCallback((dataPoint: LiveDataPoint) => {
    const recentActivity = dataBufferRef.current.get('user_activity') || [];
    if (recentActivity.length > 10) {
      const avgActivity = recentActivity.slice(-10).reduce((sum, dp) => sum + dp.value.active_users, 0) / 10;
      const currentActivity = dataPoint.value.active_users;
      
      if (currentActivity > avgActivity * 2) {
        const alert: Alert = {
          id: `activity_spike_${Date.now()}`,
          type: 'info',
          severity: 'medium',
          title: 'Activity Spike Detected',
          message: `User activity increased by ${((currentActivity / avgActivity - 1) * 100).toFixed(0)}%`,
          timestamp: new Date(),
          acknowledged: false,
          metadata: { 
            current_users: currentActivity,
            average_users: avgActivity,
            spike_percentage: ((currentActivity / avgActivity - 1) * 100)
          }
        };
        addAlert(alert);
      }
    }
  }, []);

  const checkHealthIssues = useCallback((dataPoint: LiveDataPoint) => {
    if (dataPoint.value.status !== 'healthy') {
      const alert: Alert = {
        id: `health_${Date.now()}`,
        type: 'error',
        severity: 'critical',
        title: 'System Health Issue',
        message: `System status: ${dataPoint.value.status}`,
        timestamp: new Date(),
        acknowledged: false,
        metadata: { 
          status: dataPoint.value.status,
          components: dataPoint.value.components
        }
      };
      addAlert(alert);
    }
  }, []);

  const checkPricingChanges = useCallback((dataPoint: LiveDataPoint) => {
    const pricingStream = dataBufferRef.current.get('pricing_updates') || [];
    if (pricingStream.length > 1) {
      const lastPrice = pricingStream[pricingStream.length - 2].value.price;
      const currentPrice = dataPoint.value.price;
      
      if (currentPrice !== lastPrice) {
        const alert: Alert = {
          id: `price_change_${Date.now()}`,
          type: 'info',
          severity: 'low',
          title: 'Price Update Detected',
          message: `Price changed from $${lastPrice} to $${currentPrice}`,
          timestamp: new Date(),
          acknowledged: false,
          metadata: { 
            old_price: lastPrice,
            new_price: currentPrice,
            change_percentage: ((currentPrice - lastPrice) / lastPrice * 100).toFixed(2)
          }
        };
        addAlert(alert);
      }
    }
  }, []);

  const checkErrorSpikes = useCallback((dataPoint: LiveDataPoint) => {
    const errorStream = dataBufferRef.current.get('error_tracking') || [];
    if (errorStream.length > 5) {
      const recentErrors = errorStream.slice(-5).reduce((sum, dp) => sum + dp.value.error_count, 0);
      const currentErrors = dataPoint.value.error_count;
      
      if (currentErrors > recentErrors * 3) {
        const alert: Alert = {
          id: `error_spike_${Date.now()}`,
          type: 'error',
          severity: 'high',
          title: 'Error Spike Detected',
          message: `Error count increased dramatically: ${currentErrors} errors`,
          timestamp: new Date(),
          acknowledged: false,
          metadata: { 
            current_errors: currentErrors,
            recent_average: recentErrors / 5,
            error_types: dataPoint.value.error_types
          }
        };
        addAlert(alert);
      }
    }
  }, []);

  // Add alert to state and notify parent
  const addAlert = useCallback((alert: Alert) => {
    setAlerts(prev => [alert, ...prev].slice(0, 50)); // Keep last 50 alerts
    if (onAlert) {
      onAlert(alert);
    }
  }, [onAlert]);

  // Get data streams relevant to user persona
  const getDataStreamsForPersona = (persona: string) => {
    const allStreams = [
      { type: 'performance_metrics', name: 'Performance Metrics', priority: 10 },
      { type: 'user_activity', name: 'User Activity', priority: 8 },
      { type: 'system_health', name: 'System Health', priority: 9 },
      { type: 'pricing_updates', name: 'Pricing Updates', priority: 6 },
      { type: 'feature_usage', name: 'Feature Usage', priority: 7 },
      { type: 'error_tracking', name: 'Error Tracking', priority: 8 }
    ];

    const personaPriorities: Record<string, Record<string, number>> = {
      developer: {
        performance_metrics: 10,
        error_tracking: 9,
        feature_usage: 8,
        system_health: 7,
        user_activity: 5,
        pricing_updates: 3
      },
      designer: {
        feature_usage: 10,
        user_activity: 8,
        performance_metrics: 6,
        system_health: 5,
        pricing_updates: 4,
        error_tracking: 3
      },
      executive: {
        user_activity: 10,
        pricing_updates: 9,
        system_health: 8,
        performance_metrics: 7,
        feature_usage: 6,
        error_tracking: 5
      },
      team_lead: {
        user_activity: 10,
        feature_usage: 9,
        performance_metrics: 8,
        error_tracking: 7,
        system_health: 6,
        pricing_updates: 5
      },
      freelancer: {
        pricing_updates: 10,
        performance_metrics: 8,
        feature_usage: 7,
        user_activity: 6,
        system_health: 5,
        error_tracking: 4
      },
      student: {
        feature_usage: 10,
        performance_metrics: 7,
        user_activity: 6,
        system_health: 5,
        error_tracking: 4,
        pricing_updates: 3
      }
    };

    const priorities = personaPriorities[persona] || {};
    
    return allStreams
      .map(stream => ({
        ...stream,
        priority: priorities[stream.type] || 5
      }))
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 4); // Return top 4 streams for persona
  };

  // Cleanup connections on unmount
  useEffect(() => {
    // Copy ref value to variable to satisfy react-hooks/exhaustive-deps rule
    const wsManager = wsManagerRef.current;
    
    return () => {
      connections.forEach(conn => {
        wsManager.disconnect(conn.connection_id);
      });
    };
  }, [connections]);

  // Auto-connect on mount
  useEffect(() => {
    connectToDataStreams();
  }, [connectToDataStreams]);

  // Simulate data updates for demo purposes
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      // Simulate random data updates
      const streamTypes = ['performance_metrics', 'user_activity', 'system_health'];
      const randomStream = streamTypes[Math.floor(Math.random() * streamTypes.length)];
      
      const mockData: Record<string, any> = {
        performance_metrics: {
          response_time: Math.random() * 1000 + 100,
          throughput: Math.random() * 1000,
          cpu_usage: Math.random() * 100,
          memory_usage: Math.random() * 100
        },
        user_activity: {
          active_users: Math.floor(Math.random() * 1000) + 100,
          new_users: Math.floor(Math.random() * 50),
          session_duration: Math.random() * 3600
        },
        system_health: {
          status: Math.random() > 0.1 ? 'healthy' : 'degraded',
          uptime: 99.9,
          components: {
            api: Math.random() > 0.05 ? 'healthy' : 'error',
            database: Math.random() > 0.02 ? 'healthy' : 'error',
            cache: 'healthy'
          }
        }
      };

      handleStreamData(randomStream, {
        value: mockData[randomStream] || {},
        metadata: { source: 'simulator' }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isConnected, handleStreamData]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">Real-Time Data Manager</h3>
        <p className="text-white/60">
          Live data streams and intelligent monitoring for {tool.tool_id}
        </p>
      </div>

      {/* Connection Status */}
      <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-white">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="text-sm text-white/60">
            {connections.length} active streams • {alerts.filter(a => !a.acknowledged).length} unacknowledged alerts
          </div>
        </div>
      </div>

      {/* Active Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Active Data Streams</h5>
          <div className="space-y-3">
            {connections.map((conn, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white">{conn.connection_id}</div>
                  <div className="text-sm text-white/60">
                    Status: {conn.status} • Messages: {conn.message_count}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  conn.status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Recent Alerts</h5>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.slice(0, 5).map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-blue-500/10 border-blue-500/30'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-medium">{alert.title}</div>
                    <div className="text-sm text-white/60">{alert.message}</div>
                  </div>
                  <div className="text-xs text-white/50">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Metrics */}
      {realTimeData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Performance</h5>
            <div className="space-y-2">
              {realTimeData.data_streams.performance_metrics.slice(-3).reverse().map((point, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-white/60">Response Time</span>
                  <span className="text-white">{point.value.response_time.toFixed(0)}ms</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">User Activity</h5>
            <div className="space-y-2">
              {realTimeData.data_streams.user_activity.slice(-3).reverse().map((point, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-white/60">Active Users</span>
                  <span className="text-white">{point.value.active_users}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">System Health</h5>
            <div className="space-y-2">
              {realTimeData.data_streams.system_health.slice(-3).reverse().map((point, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-white/60">Status</span>
                  <span className={`capitalize ${
                    point.value.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {point.value.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeDataManager;
