import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiActivity, FiAlertTriangle, FiBarChart2, FiCalendar, FiCheckCircle, FiClock, FiCode, FiCpu, FiDatabase, FiDownload, FiEye, FiFilter, FiGitBranch, FiGlobe, FiHardDrive, FiLayers, FiList, FiMonitor, FiPieChart, FiRefreshCw, FiServer, FiSettings, FiShield, FiTrendingUp, FiZap } from 'react-icons/fi';
import { FaAws, FaDocker, FaGithub, FaPython } from 'react-icons/fa';
import { SiGrafana, SiKubernetes, SiPrometheus, SiPytorch, SiTensorflow } from 'react-icons/si';

const AIModelMonitoring: NextPage = () => {
  const router = useRouter();
  const currentUrl = `https://aivault.ai${router.asPath}`;
  const title = 'AI Model Monitoring and Observability in Production | AI Vault';
  const description = 'Comprehensive guide to monitoring machine learning models in production. Learn about data drift, model performance, observability tools, and best practices for maintaining reliable ML systems.';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ai monitoring, ml observability, model monitoring, data drift, model drift, mlops, machine learning operations, model performance, ai reliability" />
        <meta name="author" content="AI Vault MLOps Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://aivault.ai/images/ai-monitoring-og.jpg" />
        <meta property="og:site_name" content="AI Vault" />
        <meta property="article:published_time" content="2025-04-14T00:00:00+00:00" />
        <meta property="article:author" content="AI Vault MLOps Team" />
        <meta property="article:section" content="MLOps" />
        <meta property="article:tag" content="MLOps" />
        <meta property="article:tag" content="AI Monitoring" />
        <meta property="article:tag" content="Machine Learning" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aivault" />
        <meta name="twitter:creator" content="@aivault" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aivault.ai/images/ai-monitoring-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": "https://aivault.ai/images/ai-monitoring-og.jpg",
            "author": {
              "@type": "Organization",
              "name": "AI Vault MLOps Team",
              "url": "https://aivault.ai"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AI Vault",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aivault.ai/logo.png"
              }
            },
            "datePublished": "2025-04-14T00:00:00+00:00",
            "dateModified": "2025-04-14T00:00:00+00:00",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            }
          })}
        </script>
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                AI Model Monitoring
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
                Ensuring Reliability and Performance in Production ML Systems
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-blue-100">
                  <span className="bg-blue-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiActivity className="h-5 w-5" />
                  </span>
                  <span>MLOps & Production</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <span className="bg-blue-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiClock className="h-5 w-5" />
                  </span>
                  <span>32 min read</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <span className="bg-blue-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiCalendar className="h-5 w-5" />
                  </span>
                  <span>April 14, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Author and Share */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/images/authors/ai-vault-team.jpg"
                    alt="AI Vault MLOps Team"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">AI Vault MLOps Team</p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span>MLOps Engineers</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex md:mt-0 space-x-3">
                <span className="inline-flex rounded-md shadow-sm">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Share on Twitter
                  </a>
                </span>
                <span className="inline-flex rounded-md shadow-sm">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065a2.064 2.064 0 114.127 0 2.064 2.064 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Share on LinkedIn
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-6 py-8 lg:py-12 lg:px-12 max-w-4xl mx-auto prose prose-lg text-gray-700">
            <p className="lead text-xl text-gray-700 mb-8">
              As machine learning models move from research to production, ensuring their reliability, performance, and fairness becomes paramount. This comprehensive guide explores the critical aspects of monitoring AI models in production environments, covering everything from data drift detection to model performance tracking and operational metrics.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Model Monitoring is Essential</h2>
            
            <p>
              Machine learning models in production are subject to various challenges that can degrade their performance over time. Unlike traditional software, ML systems have an additional dimension of complexity: they depend on both code and data. This dual dependency creates unique monitoring requirements that go beyond traditional application performance monitoring (APM).
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Key Statistic</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>According to a 2025 ML Ops Community survey, 78% of organizations experienced model performance degradation in production, with 42% reporting that these issues went undetected for weeks or longer, highlighting the critical need for robust monitoring solutions.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Three Pillars of ML Monitoring</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-blue-600 mb-3">
                  <FiDatabase className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Data Monitoring</h3>
                <p className="text-gray-700">Tracking input data quality, distribution shifts, and schema changes that could impact model performance.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Data drift detection</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Feature distribution analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Missing data detection</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-blue-600 mb-3">
                  <FiBarChart2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Model Performance</h3>
                <p className="text-gray-700">Monitoring prediction accuracy, latency, and other performance metrics in real-time.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prediction accuracy tracking</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Latency and throughput metrics</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Error rate analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-blue-600 mb-3">
                  <FiServer className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. System Health</h3>
                <p className="text-gray-700">Ensuring the underlying infrastructure and services supporting the ML models are functioning correctly.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Resource utilization (CPU, GPU, memory)</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Service availability</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>API response times</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Implementing Data Drift Detection</h2>
            
            <p>
              Data drift occurs when the statistical properties of the input data change over time, potentially degrading model performance. Detecting and addressing data drift is crucial for maintaining model accuracy.
            </p>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg my-6">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Common Types of Data Drift</h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Covariate Shift</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Change in the distribution of input features (P(X) changes while P(Y|X) remains the same).</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Concept Drift</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Change in the relationship between input features and target variable (P(Y|X) changes).</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Label Drift</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Change in the distribution of output labels (P(Y) changes).</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Upstream Data Changes</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Modifications to data sources, collection methods, or preprocessing pipelines.</dd>
                  </div>
                </dl>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Implementing Drift Detection</h3>
            
            <p>
              Let's implement a drift detection system using Python and the alibi-detect library, which provides state-of-the-art drift detection algorithms.
            </p>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Example of implementing drift detection with alibi-detect
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from alibi_detect.datasets import fetch_kdd
from alibi_detect.cd import KSDrift, MMDDrift, CVMDrift
from alibi_detect.utils.saving import save_detector, load_detector
from alibi_detect.utils.visualize import plot_feature_score, plot_2d_decision_boundary

# 1. Prepare reference data (training data distribution)
# In a real scenario, this would be your training data
np.random.seed(42)
ref_data = np.random.normal(0, 1, (1000, 5))  # 1000 samples, 5 features

# 2. Initialize drift detector (using Kolmogorov-Smirnov test)
drift_detector = KSDrift(
    p_val=0.05,           # significance level
    X_ref=ref_data,       # reference data
    preprocess_fn=None,   # optional preprocessing function
    n_features=5,         # number of features
    preprocess_batch_fn=None,  # optional batch preprocessing
    n_kernel_centers=100, # for MMD-based detectors
    lambda_=1.0,          # regularization parameter for MMD
    n_folds=5,            # number of cross-validation folds
    retrain_from_scratch=True,  # whether to retrain from scratch
    seed=42               # random seed
)

# 3. Simulate new data (with and without drift)
# No drift case
no_drift_data = np.random.normal(0, 1, (100, 5))

# Drift case (shift in mean)
drift_data = np.random.normal(1, 1, (100, 5))  # Mean shifted by 1

# 4. Check for drift
preds_no_drift = drift_detector.predict(no_drift_data)
preds_drift = drift_detector.predict(drift_data)

print(f"No drift detected: {preds_no_drift['data']['is_drift']}")
print(f"Drift detected: {preds_drift['data']['is_drift']}")

# 5. Visualize drift scores
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.hist(no_drift_data[:, 0], alpha=0.7, label='No Drift', bins=30)
plt.title('No Drift')
plt.xlabel('Feature Value')
plt.ylabel('Frequency')
plt.legend()

plt.subplot(1, 2, 2)
plt.hist(drift_data[:, 0], alpha=0.7, label='With Drift', bins=30, color='orange')
plt.title('With Drift')
plt.xlabel('Feature Value')
plt.legend()
plt.tight_layout()
plt.savefig('drift_detection.png', dpi=300, bbox_inches='tight')

# 6. Save and load the detector (for production use)
save_detector(drift_detector, 'drift_detector')
loaded_detector = load_detector('drift_detector')

# 7. Advanced: Monitor specific features with different drift detectors
feature_detectors = {
    'ks': KSDrift(p_val=0.01, X_ref=ref_data),
    'mmd': MMDDrift(p_val=0.01, X_ref=ref_data),
    'cvm': CVMDrift(p_val=0.01, X_ref=ref_data)
}

# Test each detector on the drifted data
for name, detector in feature_detectors.items():
    preds = detector.predict(drift_data)
    print(f"{name.upper()} - Drift detected: {preds['data']['is_drift']}")
    print(f"p-value: {preds['data']['p_val']:.4f}")
    if 'distance' in preds['data']:
        print(f"Distance: {preds['data']['distance']:.4f}")
    print("-" * 50)`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Monitoring Model Performance</h3>
            
            <p>
              Tracking model performance metrics in production is essential for identifying when models need to be retrained or replaced. Here's how to implement a comprehensive performance monitoring system.
            </p>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiBarChart2 className="h-5 w-5 text-indigo-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-indigo-800">Key Performance Metrics</h3>
                  <div className="mt-2 text-sm text-indigo-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Accuracy/Precision/Recall/F1:</strong> Standard classification metrics</li>
                      <li><strong>MAE/RMSE/R²:</strong> Common regression metrics</li>
                      <li><strong>Latency:</strong> Time taken to generate predictions</li>
                      <li><strong>Throughput:</strong> Number of predictions per second</li>
                      <li><strong>Error Rate:</strong> Percentage of failed predictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Example of implementing model performance monitoring
import time
import numpy as np
from datetime import datetime
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pandas as pd
import mlflow
from prometheus_client import start_http_server, Gauge, Counter, Histogram

class ModelPerformanceMonitor:
    def __init__(self, model_name, model_version, metrics_interval=60):
        """
        Initialize the model performance monitor.
        
        Args:
            model_name (str): Name of the model being monitored
            model_version (str): Version of the model
            metrics_interval (int): Interval in seconds for calculating metrics
        """
        self.model_name = model_name
        self.model_version = model_version
        self.metrics_interval = metrics_interval
        
        # Initialize metrics storage
        self.predictions = []
        self.true_labels = []
        self.prediction_times = []
        self.last_metric_time = time.time()
        
        # Initialize Prometheus metrics
        self.accuracy_gauge = Gauge(
            f'{model_name}_accuracy', 
            'Model accuracy',
            ['model_name', 'model_version']
        )
        self.latency_histogram = Histogram(
            f'{model_name}_prediction_latency_seconds',
            'Prediction latency in seconds',
            ['model_name', 'model_version']
        )
        self.throughput_counter = Counter(
            f'{model_name}_predictions_total',
            'Total number of predictions',
            ['model_name', 'model_version']
        )
        self.error_counter = Counter(
            f'{model_name}_errors_total',
            'Total number of prediction errors',
            ['model_name', 'model_version', 'error_type']
        )
        
        # Start Prometheus metrics server
        start_http_server(8000)
    
    def log_prediction(self, features, prediction, true_label=None, prediction_time=None):
        """
        Log a prediction and its metadata.
        
        Args:
            features: Input features used for the prediction
            prediction: Model's prediction
            true_label: Ground truth label (if available)
            prediction_time: Time taken for the prediction in seconds
        """
        timestamp = datetime.utcnow()
        prediction_time = prediction_time or 0
        
        # Store prediction data
        self.predictions.append({
            'timestamp': timestamp,
            'features': features,
            'prediction': prediction,
            'true_label': true_label,
            'prediction_time': prediction_time
        })
        
        # Store true label if available
        if true_label is not None:
            self.true_labels.append(true_label)
        
        # Store prediction time
        self.prediction_times.append(prediction_time)
        
        # Update Prometheus metrics
        self.latency_histogram.labels(
            model_name=self.model_name, 
            model_version=self.model_version
        ).observe(prediction_time)
        
        self.throughput_counter.labels(
            model_name=self.model_name,
            model_version=self.model_version
        ).inc()
        
        # Periodically calculate and log metrics
        current_time = time.time()
        if current_time - self.last_metric_time > self.metrics_interval:
            self.calculate_and_log_metrics()
            self.last_metric_time = current_time
    
    def calculate_and_log_metrics(self):
        """Calculate and log performance metrics."""
        if not self.predictions:
            return
            
        # Prepare data for metrics calculation
        df = pd.DataFrame(self.predictions)
        
        # Calculate metrics if true labels are available
        if len(self.true_labels) > 0 and len(self.true_labels) == len(self.predictions):
            y_true = np.array(self.true_labels)
            y_pred = np.array([p['prediction'] for p in self.predictions])
            
            # Calculate classification metrics
            accuracy = accuracy_score(y_true, y_pred)
            precision = precision_score(y_true, y_pred, average='weighted')
            recall = recall_score(y_true, y_pred, average='weighted')
            f1 = f1_score(y_true, y_pred, average='weighted')
            
            # Update Prometheus metrics
            self.accuracy_gauge.labels(
                model_name=self.model_name,
                model_version=self.model_version
            ).set(accuracy)
            
            # Log metrics to MLflow
            with mlflow.start_run():
                mlflow.log_metrics({
                    'accuracy': accuracy,
                    'precision': precision,
                    'recall': recall,
                    'f1_score': f1,
                    'avg_prediction_time': np.mean(self.prediction_times) if self.prediction_times else 0,
                    'predictions_per_second': len(self.predictions) / self.metrics_interval
                })
            
            # Print metrics
            print(f"\n--- Performance Metrics (Last {self.metrics_interval} seconds) ---")
            print(f"Accuracy: {accuracy:.4f}")
            print(f"Precision: {precision:.4f}")
            print(f"Recall: {recall:.4f}")
            print(f"F1 Score: {f1:.4f}")
        
        # Log latency statistics
        if self.prediction_times:
            avg_latency = np.mean(self.prediction_times)
            p95_latency = np.percentile(self.prediction_times, 95)
            p99_latency = np.percentile(self.prediction_times, 99)
            
            print(f"\n--- Latency (seconds) ---")
            print(f"Average: {avg_latency:.4f}")
            print(f"95th percentile: {p95_latency:.4f}")
            print(f"99th percentile: {p99_latency:.4f}")
        
        # Log throughput
        throughput = len(self.predictions) / self.metrics_interval
        print(f"\n--- Throughput ---")
        print(f"Predictions per second: {throughput:.2f}")
        
        # Reset metrics for the next interval
        self.predictions = []
        self.true_labels = []
        self.prediction_times = []

# Example usage
if __name__ == "__main__":
    # Initialize monitor
    monitor = ModelPerformanceMonitor(
        model_name="fraud_detection",
        model_version="1.0.0",
        metrics_interval=60  # Log metrics every 60 seconds
    )
    
    # Simulate predictions
    import random
    
    for i in range(1000):
        # Simulate features and prediction
        features = np.random.rand(10)  # 10 features
        true_label = random.randint(0, 1)  # Binary classification
        
        # Simulate prediction time (50ms ± 20ms)
        prediction_time = 0.05 + random.gauss(0, 0.02)
        prediction = random.choices([0, 1], weights=[0.1, 0.9])[0]  # 90% accuracy
        
        # Log prediction
        monitor.log_prediction(
            features=features.tolist(),
            prediction=prediction,
            true_label=true_label,
            prediction_time=prediction_time
        )
        
        # Sleep to simulate time between predictions
        time.sleep(random.uniform(0.01, 0.1))
`}
              </code>
            </pre>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Building an Observability Stack for ML</h2>
            
            <p>
              A robust ML observability stack combines metrics, logs, and traces to provide comprehensive visibility into your ML systems. Here's how to build one using modern open-source tools.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-blue-600 mb-3">
                  <SiPrometheus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Metrics Collection</h3>
                <p className="text-gray-600 text-sm">Prometheus for collecting and storing time-series metrics from your ML services.</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Prometheus
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-orange-600 mb-3">
                  <SiGrafana className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Visualization</h3>
                <p className="text-gray-600 text-sm">Grafana for creating dashboards to visualize metrics and set up alerts.</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Grafana
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-yellow-600 mb-3">
                  <FiActivity className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Distributed Tracing</h3>
                <p className="text-gray-600 text-sm">Jaeger or Zipkin for tracing requests across microservices.</p>
                <div className="mt-3 space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Jaeger
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Zipkin
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiHardDrive className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Log Management</h3>
                <p className="text-gray-600 text-sm">ELK Stack or Loki for centralized log management and analysis.</p>
                <div className="mt-3 space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ELK
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Loki
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-green-600 mb-3">
                  <FiGitBranch className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Feature Store</h3>
                <p className="text-gray-600 text-sm">Feast or Hopsworks for managing and monitoring feature data.</p>
                <div className="mt-3 space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Feast
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Hopsworks
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-red-600 mb-3">
                  <FiAlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Alerting</h3>
                <p className="text-gray-600 text-sm">Alertmanager or PagerDuty for setting up alerts based on metrics and logs.</p>
                <div className="mt-3 space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Alertmanager
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    PagerDuty
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Example: ML Observability with Prometheus and Grafana</h3>
            
            <p>
              Let's set up a basic ML observability stack using Prometheus and Grafana to monitor model performance metrics.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">1. Install Prometheus and Grafana</h4>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>
{`# Using Docker Compose
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    restart: unless-stopped
    depends_on:
      - prometheus

volumes:
  grafana-storage:`}
                  </code>
                </pre>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">2. Configure Prometheus</h4>
                <p className="text-sm text-gray-600 mb-2">Create a <code>prometheus.yml</code> file:</p>
                <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>
{`global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'ml_models'
    static_configs:
      - targets: ['host.docker.internal:8000']  # Your ML service
    metrics_path: '/metrics'
    scheme: 'http'

  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']`}
                  </code>
                </pre>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">3. Create a Grafana Dashboard</h4>
                <p className="text-sm text-gray-600 mb-2">After setting up, access Grafana at <code>http://localhost:3000</code> (username: admin, password: admin) and create a dashboard with panels for:</p>
                <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
                  <li>Model accuracy over time</li>
                  <li>Prediction latency (average, p95, p99)</li>
                  <li>Request rate and error rate</li>
                  <li>Feature distribution statistics</li>
                  <li>Drift detection metrics</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Best Practices for ML Monitoring</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Define Clear SLIs and SLOs</h3>
                <p className="text-gray-700">Establish Service Level Indicators (SLIs) and Objectives (SLOs) specific to your ML models. For example:</p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                  <li>99.9% of predictions should complete within 200ms</li>
                  <li>Model accuracy should not drop below 95% of the baseline</li>
                  <li>Data drift should not exceed 5% for any critical feature</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Monitor at Multiple Levels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-green-50 rounded">
                    <h4 className="font-medium text-green-800">Infrastructure</h4>
                    <p className="text-sm text-green-700">CPU, memory, GPU utilization, network I/O</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <h4 className="font-medium text-blue-800">Application</h4>
                    <p className="text-sm text-blue-700">API response times, error rates, request volumes</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <h4 className="font-medium text-purple-800">Model</h4>
                    <p className="text-sm text-purple-700">Prediction accuracy, data drift, concept drift</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Implement Automated Retraining</h3>
                <p className="text-gray-700">Set up automated pipelines to retrain models when performance degrades beyond a certain threshold. Include validation steps to ensure new models meet quality standards before deployment.</p>
                <div className="mt-3 p-3 bg-yellow-50 rounded text-sm text-yellow-700">
                  <p className="font-medium">Example trigger conditions:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Model accuracy drops below threshold for 3 consecutive days</li>
                    <li>Significant data drift detected in key features</li>
                    <li>Scheduled retraining (e.g., weekly, monthly)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Implement Canary Deployments</h3>
                <p className="text-gray-700">When deploying new model versions, use canary deployments to gradually shift traffic to the new version while monitoring for issues.</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded">
                    <h4 className="font-medium text-red-800">A/B Testing</h4>
                    <p className="text-sm text-red-700">Route a percentage of traffic to the new model and compare performance metrics.</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <h4 className="font-medium text-red-800">Shadow Mode</h4>
                    <p className="text-sm text-red-700">Run new models in parallel without affecting production traffic to validate performance.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Centralize Logging and Alerting</h3>
                <p className="text-gray-700">Aggregate logs from all components of your ML system and set up alerts for critical issues.</p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key alerts to set up:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center"><FiAlertTriangle className="text-yellow-500 mr-2" /> Model accuracy degradation</li>
                    <li className="flex items-center"><FiAlertTriangle className="text-yellow-500 mr-2" /> Increased prediction latency</li>
                    <li className="flex items-center"><FiAlertTriangle className="text-yellow-500 mr-2" /> Data pipeline failures</li>
                    <li className="flex items-center"><FiAlertTriangle className="text-yellow-500 mr-2" /> Feature store unavailability</li>
                    <li className="flex items-center"><FiAlertTriangle className="text-red-500 mr-2" /> Model service downtime</li>
                    <li className="flex items-center"><FiAlertTriangle className="text-red-500 mr-2" /> Data drift above threshold</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Case Study: Monitoring a Recommendation System</h2>
            
            <p>
              Let's examine how a large e-commerce platform implemented monitoring for their recommendation system, which serves millions of product recommendations daily.
            </p>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg my-6">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recommendation System Monitoring Implementation</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Key components and metrics for monitoring a production recommendation system</p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">System Overview</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <p>The recommendation system uses a hybrid approach with collaborative filtering and deep learning models to generate personalized product recommendations for users.</p>
                      <p className="mt-2"><strong>Scale:</strong> 10M+ daily active users, 100M+ recommendations per day</p>
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Key Metrics Tracked</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Business Metrics</p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Click-Through Rate (CTR)</li>
                            <li>Conversion Rate</li>
                            <li>Average Order Value (AOV) from recommendations</li>
                            <li>Revenue per Mille (RPM)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">Technical Metrics</p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Model inference latency (p50, p95, p99)</li>
                            <li>Feature generation time</li>
                            <li>Cache hit/miss ratio</li>
                            <li>Error rates by endpoint</li>
                          </ul>
                        </div>
                      </div>
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Drift Detection</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <p>Implemented drift detection for:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>User feature distributions (e.g., age, location, browsing behavior)</li>
                        <li>Product catalog changes</li>
                        <li>User interaction patterns</li>
                        <li>Model output distributions</li>
                      </ul>
                      <p className="mt-2"><strong>Alert Threshold:</strong> Alert when KL divergence &gt; 0.1 for any major feature group</p>
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Implementation</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <p><strong>Tech Stack:</strong></p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Prometheus + Grafana for metrics and dashboards</li>
                        <li>ELK Stack for log aggregation</li>
                        <li>Custom Python service for drift detection</li>
                        <li>Airflow for scheduling and orchestration</li>
                      </ul>
                      
                      <p className="mt-3"><strong>Key Learnings:</strong></p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Start with a small set of critical metrics and expand gradually</li>
                        <li>Involve both data scientists and engineers in defining monitoring requirements</li>
                        <li>Set up separate dashboards for different stakeholders (engineering, product, business)</li>
                        <li>Regularly review and update alert thresholds to reduce noise</li>
                      </ul>
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Results</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-green-800 font-medium">30%</p>
                          <p className="text-sm text-green-700">Reduction in time to detect model degradation</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-green-800 font-medium">50%</p>
                          <p className="text-sm text-green-700">Fewer production incidents</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-green-800 font-medium">15%</p>
                          <p className="text-sm text-green-700">Increase in recommendation-driven revenue</p>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Future Trends in ML Monitoring</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Root Cause Analysis</h3>
                <p className="text-gray-700">AI-powered tools that can automatically detect, diagnose, and even fix issues in ML systems without human intervention.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Causal Inference for ML</h3>
                <p className="text-gray-700">Moving beyond correlation to understand the causal relationships between model inputs and outputs for better interpretability.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Federated Learning Monitoring</h3>
                <p className="text-gray-700">New techniques for monitoring models trained across decentralized devices while preserving privacy.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">ML Observability as Code</h3>
                <p className="text-gray-700">Defining monitoring and observability configurations as code for better versioning and reproducibility.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Key Takeaway</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Effective AI model monitoring requires a combination of technical implementation and organizational processes. By implementing comprehensive monitoring, you can catch issues early, maintain model performance, and build trust with your users. Remember that monitoring is not a one-time setup but an ongoing process that should evolve with your ML systems.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Additional Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://ml-ops.org/" className="text-blue-600 hover:text-blue-800">MLOps.org - Community and Resources</a>
                </li>
                <li>
                  <a href="https://www.mlflow.org/" className="text-blue-600 hover:text-blue-800">MLflow - Open Source Platform for the Machine Learning Lifecycle</a>
                </li>
                <li>
                  <a href="https://prometheus.io/" className="text-blue-600 hover:text-blue-800">Prometheus - Monitoring System & Time Series Database</a>
                </li>
                <li>
                  <a href="https://grafana.com/" className="text-blue-600 hover:text-blue-800">Grafana - The Open Observability Platform</a>
                </li>
                <li>
                  <a href="https://www.seldon.io/" className="text-blue-600 hover:text-blue-800">Seldon - MLOps and Model Monitoring</a>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold">AI Vault</span>
                </Link>
                <p className="mt-2 text-sm text-gray-400">Empowering AI innovation through reliable and observable machine learning systems.</p>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-400 md:text-right">
                &copy; 2025 AI Vault. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIModelMonitoring;
