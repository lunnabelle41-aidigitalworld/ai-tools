/**
 * Search result visualization service
 */

// Visualization types
export type VisualizationType = 
  | 'list'           // Standard list view
  | 'grid'           // Grid view with thumbnails
  | 'table'          // Tabular data view
  | 'chart'          // Chart visualization
  | 'map'            // Map-based visualization
  | 'timeline'       // Timeline view
  | 'graph'          // Network graph view
  | 'summary'        // Summary view
  | 'comparison'     // Side-by-side comparison
  | 'cluster'        // Clustered view
  | 'facet'          // Faceted navigation
  | 'trend';         // Trend analysis

// Chart types
export type ChartType = 
  | 'bar'            // Bar chart
  | 'line'           // Line chart
  | 'pie'            // Pie chart
  | 'scatter'        // Scatter plot
  | 'histogram'      // Histogram
  | 'heatmap'        // Heatmap
  | 'bubble'         // Bubble chart
  | 'radar'          // Radar chart
  | 'funnel'         // Funnel chart
  | 'tree'           // Tree map
  | 'sankey';        // Sankey diagram

// Visualization configuration
export interface VisualizationConfig {
  type: VisualizationType;
  chartType?: ChartType;
  dimensions?: string[];        // Fields to use as dimensions
  metrics?: string[];           // Fields to use as metrics
  groupBy?: string;             // Field to group by
  sortBy?: string;              // Field to sort by
  sortOrder?: 'asc' | 'desc';   // Sort order
  limit?: number;               // Limit number of results
  colorScheme?: string;         // Color scheme for charts
  showLabels?: boolean;         // Show labels on charts
  showLegend?: boolean;         // Show legend on charts
  interactive?: boolean;        // Enable interactive features
}

// Visualization data structure
export interface VisualizationData {
  type: VisualizationType;
  chartType?: ChartType;
  title: string;
  description: string;
  data: any[];
  labels?: string[];
  datasets?: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }>;
  options?: {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    scales?: any;
    plugins?: any;
  };
}

/**
 * Generate visualization data from search results
 */
export function generateVisualizationData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  if (!results || results.length === 0) {
    return {
      type: config.type,
      chartType: config.chartType,
      title: 'No Data',
      description: 'No results to visualize',
      data: []
    };
  }
  
  switch (config.type) {
    case 'chart':
      return generateChartData(results, config);
    case 'table':
      return generateTableData(results, config);
    case 'summary':
      return generateSummaryData(results, config);
    case 'timeline':
      return generateTimelineData(results, config);
    case 'cluster':
      return generateClusterData(results, config);
    default:
      return generateListData(results, config);
  }
}

/**
 * Generate chart data
 */
function generateChartData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  const chartType = config.chartType || 'bar';
  const dimensions = config.dimensions || ['category'];
  const metrics = config.metrics || ['count'];
  
  // Group results by dimensions
  const grouped: Record<string, any[]> = {};
  results.forEach(result => {
    const key = dimensions.map(dim => result[dim] || 'Unknown').join(' - ');
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(result);
  });
  
  // Calculate metrics for each group
  const labels = Object.keys(grouped);
  const data: number[] = [];
  
  labels.forEach(label => {
    const group = grouped[label];
    let value = 0;
    
    switch (metrics[0]) {
      case 'count':
        value = group.length;
        break;
      case 'sum':
        value = group.reduce((sum, item) => sum + (item[metrics[1]] || 0), 0);
        break;
      case 'average':
        value = group.reduce((sum, item) => sum + (item[metrics[1]] || 0), 0) / group.length;
        break;
      case 'max':
        value = Math.max(...group.map(item => item[metrics[1]] || 0));
        break;
      case 'min':
        value = Math.min(...group.map(item => item[metrics[1]] || 0));
        break;
      default:
        value = group.length;
    }
    
    data.push(value);
  });
  
  // Generate colors
  const backgroundColors = generateColors(labels.length);
  const borderColors = backgroundColors.map(color => 
    color.replace('0.6', '1')
  );
  
  return {
    type: 'chart',
    chartType,
    title: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`,
    description: `Visualization of ${results.length} results grouped by ${dimensions.join(', ')}`,
    data: results,
    labels,
    datasets: [{
      label: metrics[0] === 'count' ? 'Count' : `${metrics[0]} of ${metrics[1] || ''}`,
      data,
      backgroundColor: backgroundColors,
      borderColor: borderColors
    }],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: chartType === 'pie' || chartType === 'radar' ? undefined : {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

/**
 * Generate table data
 */
function generateTableData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  if (results.length === 0) {
    return {
      type: 'table',
      title: 'Search Results',
      description: 'No results found',
      data: []
    };
  }
  
  // Extract unique fields from results
  const allFields = new Set<string>();
  results.forEach(result => {
    Object.keys(result).forEach(key => {
      if (key !== 'id' && key !== '_snippet') {
        allFields.add(key);
      }
    });
  });
  
  // Limit fields for better display
  const fields = Array.from(allFields).slice(0, 8);
  
  // Prepare table data
  const tableData = results.map(result => {
    const row: Record<string, any> = {};
    fields.forEach(field => {
      row[field] = result[field];
    });
    return row;
  });
  
  return {
    type: 'table',
    title: 'Search Results Table',
    description: `Displaying ${results.length} results in tabular format`,
    data: tableData,
    labels: fields
  };
}

/**
 * Generate summary data
 */
function generateSummaryData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  // Calculate summary statistics
  const totalResults = results.length;
  const categories = [...new Set(results.map(r => r.category || 'Uncategorized'))];
  const types = [...new Set(results.map(r => r.type || 'Unknown'))];
  
  // Calculate average rating if available
  const ratings = results
    .map(r => r.rating)
    .filter(r => typeof r === 'number' && r > 0);
  const avgRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length 
    : 0;
  
  // Calculate date range if available
  const dates = results
    .map(r => r.publishedAt)
    .filter(d => d)
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());
  
  const dateRange = dates.length > 0 
    ? `${formatDate(dates[0])} to ${formatDate(dates[dates.length - 1])}`
    : 'Unknown';
  
  return {
    type: 'summary',
    title: 'Search Results Summary',
    description: 'Overview of search results',
    data: results,
    datasets: [{
      label: 'Summary Statistics',
      data: [
        totalResults,
        categories.length,
        types.length,
        parseFloat(avgRating.toFixed(1)),
        dates.length
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }],
    labels: [
      'Total Results',
      'Categories',
      'Types',
      'Avg Rating',
      'Date Range'
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Search Results Summary'
        }
      }
    }
  };
}

/**
 * Generate timeline data
 */
function generateTimelineData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  // Filter results with dates
  const datedResults = results.filter(r => r.publishedAt);
  
  if (datedResults.length === 0) {
    return {
      type: 'timeline',
      title: 'Timeline View',
      description: 'No results with dates available',
      data: []
    };
  }
  
  // Sort by date
  datedResults.sort((a, b) => 
    new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
  
  // Group by month/year
  const grouped: Record<string, any[]> = {};
  datedResults.forEach(result => {
    const date = new Date(result.publishedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(result);
  });
  
  // Prepare timeline data
  const labels = Object.keys(grouped).sort();
  const data = labels.map(label => grouped[label].length);
  
  return {
    type: 'timeline',
    title: 'Results Timeline',
    description: `Showing ${datedResults.length} results over time`,
    data: datedResults,
    labels,
    datasets: [{
      label: 'Results per Month',
      data,
      backgroundColor: ['rgba(54, 162, 235, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)']
      // borderWidth: 1 // Removed as it's not part of the dataset interface
    }],
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

/**
 * Generate cluster data
 */
function generateClusterData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  // Group by category
  const grouped: Record<string, any[]> = {};
  results.forEach(result => {
    const category = result.category || 'Uncategorized';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(result);
  });
  
  // Prepare cluster data
  const labels = Object.keys(grouped);
  const data = labels.map(label => grouped[label].length);
  
  return {
    type: 'cluster',
    title: 'Results by Category',
    description: `Clustering ${results.length} results into ${labels.length} categories`,
    data: results,
    labels,
    datasets: [{
      label: 'Results per Category',
      data,
      backgroundColor: generateColors(labels.length)
    }]
  };
}

/**
 * Generate list data (default)
 */
function generateListData(
  results: any[],
  config: VisualizationConfig
): VisualizationData {
  return {
    type: 'list',
    title: 'Search Results',
    description: `Displaying ${results.length} results`,
    data: results.slice(0, config.limit || 50)
  };
}

/**
 * Generate colors for charts
 */
function generateColors(count: number): string[] {
  const colors = [
    'rgba(54, 162, 235, 0.6)',    // Blue
    'rgba(255, 99, 132, 0.6)',    // Red
    'rgba(255, 205, 86, 0.6)',    // Yellow
    'rgba(75, 192, 192, 0.6)',    // Green
    'rgba(153, 102, 255, 0.6)',   // Purple
    'rgba(255, 159, 64, 0.6)',    // Orange
    'rgba(199, 199, 199, 0.6)',   // Grey
    'rgba(83, 109, 254, 0.6)',    // Indigo
    'rgba(255, 105, 180, 0.6)',   // Pink
    'rgba(0, 128, 128, 0.6)'      // Teal
  ];
  
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get recommended visualization based on data characteristics
 */
export function getRecommendedVisualization(results: any[]): VisualizationType {
  if (results.length === 0) return 'list';
  
  // Check for temporal data
  const hasDates = results.some(r => r.publishedAt || r.date || r.timestamp);
  if (hasDates) return 'timeline';
  
  // Check for location data
  const hasLocation = results.some(r => r.location || r.coordinates || r.address);
  if (hasLocation) return 'map';
  
  // Check for numerical data suitable for charts
  const numericalFields = Object.keys(results[0]).filter(key => 
    typeof results[0][key] === 'number'
  );
  if (numericalFields.length >= 2) return 'chart';
  
  // Check for categorical data
  const categoricalFields = Object.keys(results[0]).filter(key => 
    typeof results[0][key] === 'string' && results[0][key].length < 50
  );
  if (categoricalFields.length >= 2) return 'cluster';
  
  // Default to list view
  return 'list';
}