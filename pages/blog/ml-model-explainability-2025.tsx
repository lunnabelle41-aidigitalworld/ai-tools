import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiBookOpen, FiCalendar, FiCheckCircle, FiClock, FiCode, FiCpu, FiDatabase, FiDownload, FiEye, FiFilter, FiGitBranch, FiGlobe, FiImage, FiInfo, FiLayers, FiList, FiMonitor, FiPieChart, FiRefreshCw, FiServer, FiSettings, FiShield, FiTrendingUp, FiType, FiZap } from 'react-icons/fi';
import { FaPython, FaRegLightbulb } from 'react-icons/fa';
import { SiJupyter, SiPytorch, SiScikitlearn, SiTensorflow } from 'react-icons/si';

const MLModelExplainability: NextPage = () => {
  const router = useRouter();
  const currentUrl = `https://aivault.ai${router.asPath}`;
  const title = 'ML Model Explainability: Techniques and Tools for Transparent AI | AI Vault';
  const description = 'Comprehensive guide to machine learning model explainability. Learn about interpretability techniques, SHAP, LIME, counterfactual explanations, and best practices for implementing explainable AI in production.';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="machine learning explainability, model interpretability, SHAP, LIME, XAI, explainable AI, AI transparency, model debugging" />
        <meta name="author" content="AI Vault Research Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://aivault.ai/images/explainability-og.jpg" />
        <meta property="og:site_name" content="AI Vault" />
        <meta property="article:published_time" content="2025-04-15T00:00:00+00:00" />
        <meta property="article:author" content="AI Vault Research Team" />
        <meta property="article:section" content="AI Ethics" />
        <meta property="article:tag" content="AI Ethics" />
        <meta property="article:tag" content="Explainable AI" />
        <meta property="article:tag" content="Machine Learning" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aivault" />
        <meta name="twitter:creator" content="@aivault" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aivault.ai/images/explainability-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": "https://aivault.ai/images/explainability-og.jpg",
            "author": {
              "@type": "Organization",
              "name": "AI Vault Research Team",
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
            "datePublished": "2025-04-15T00:00:00+00:00",
            "dateModified": "2025-04-15T00:00:00+00:00",
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-90"></div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                ML Model Explainability
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-purple-100">
                Techniques and Tools for Transparent AI
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-purple-100">
                  <span className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FaRegLightbulb className="h-5 w-5" />
                  </span>
                  <span>AI Ethics & Explainability</span>
                </div>
                <div className="flex items-center text-purple-100">
                  <span className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiClock className="h-5 w-5" />
                  </span>
                  <span>35 min read</span>
                </div>
                <div className="flex items-center text-purple-100">
                  <span className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiCalendar className="h-5 w-5" />
                  </span>
                  <span>April 15, 2025</span>
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
                    src="/images/authors/ai-vault-research-team.jpg"
                    alt="AI Vault Research Team"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">AI Vault Research Team</p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span>AI Ethics & Explainability</span>
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
              As machine learning models become more complex and are deployed in critical applications, the need for explainability has never been greater. This comprehensive guide explores the techniques, tools, and best practices for making AI systems more transparent, interpretable, and trustworthy.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Importance of Model Explainability</h2>
            
            <p>
              Model explainability refers to the ability to explain and present machine learning model behavior in understandable terms to humans. It's crucial for building trust, ensuring fairness, meeting regulatory requirements, and debugging models.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-purple-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">Regulatory Landscape</h3>
                  <div className="mt-2 text-sm text-purple-700">
                    <p>Regulations like GDPR (Article 22), the EU AI Act, and various industry-specific guidelines now require organizations to provide explanations for automated decisions that significantly affect individuals. Failure to comply can result in fines up to 4% of global revenue or €20 million, whichever is higher.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Benefits of Explainable AI</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiShield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Trust & Accountability</h3>
                <p className="text-gray-700">Helps stakeholders understand and trust model decisions, enabling better accountability in AI systems.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiFilter className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Bias Detection</h3>
                <p className="text-gray-700">Reveals potential biases in model predictions by highlighting which features drive certain outcomes.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiTrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Model Improvement</h3>
                <p className="text-gray-700">Provides insights for model debugging and improvement by identifying problematic patterns.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiBookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Regulatory Compliance</h3>
                <p className="text-gray-700">Helps meet legal requirements for explainability in regulated industries like finance and healthcare.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Types of Explainability Methods</h2>
            
            <p>
              Explainability methods can be categorized based on their scope and approach. Understanding these categories helps in selecting the right technique for your specific use case.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Global vs. Local Explanations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Global Explanations</h4>
                <p className="text-gray-700">Provide an overall understanding of how the model makes decisions across the entire dataset.</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Feature importance scores</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Decision rules</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Model-agnostic global surrogates</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Local Explanations</h4>
                <p className="text-gray-700">Explain individual predictions, showing how the model arrived at a specific output for a given input.</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SHAP values for individual predictions</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>LIME explanations</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Counterfactual explanations</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Model-Specific vs. Model-Agnostic Methods</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Model-Specific</h4>
                <p className="text-gray-700">Methods designed for specific types of models, leveraging their internal structure.</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCode className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Decision tree feature importance</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Neural network attention mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Linear model coefficients</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
                <h4 className="text-lg font-semibold text-orange-800 mb-3">Model-Agnostic</h4>
                <p className="text-gray-700">Can be applied to any machine learning model, treating it as a black box.</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCode className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SHAP (SHapley Additive exPlanations)</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>LIME (Local Interpretable Model-agnostic Explanations)</span>
                  </li>
                  <li className="flex items-start">
                    <FiCode className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Anchors</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Explainability Techniques</h2>
            
            <p>
              Let's dive deeper into the most widely used explainability techniques, their implementations, and when to use them.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. SHAP (SHapley Additive exPlanations)</h3>
            
            <p>
              SHAP values provide a unified measure of feature importance by calculating the contribution of each feature to the prediction for a specific instance, based on concepts from cooperative game theory.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Key Properties of SHAP</h3>
                  <ul className="mt-2 text-sm text-blue-700 space-y-1">
                    <li><strong>Additive:</strong> The sum of SHAP values equals the difference between the model's prediction and the average prediction.</li>
                    <li><strong>Consistent:</strong> If a model changes so that a feature's contribution increases, the SHAP value also increases.</li>
                    <li><strong>Missingness:</strong> Features with missing values have a SHAP value of zero.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Implementing SHAP in Python</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install shap pandas scikit-learn

import numpy as np
import pandas as pd
import shap
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Load and prepare data
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = data.target

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Initialize SHAP explainer
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Visualize the first prediction's explanation
shap.initjs()
shap.force_plot(
    explainer.expected_value[1], 
    shap_values[1][0,:], 
    X_test.iloc[0,:],
    feature_names=data.feature_names,
    matplotlib=True,
    show=False
)
plt.tight_layout()
plt.savefig('shap_force_plot.png', dpi=300, bbox_inches='tight')
plt.close()

# Summary plot (feature importance)
shap.summary_plot(shap_values[1], X_test, feature_names=data.feature_names, show=False)
plt.tight_layout()
plt.savefig('shap_summary_plot.png', dpi=300, bbox_inches='tight')
plt.close()

# Dependence plot for a specific feature
shap.dependence_plot(
    "worst radius", 
    shap_values[1], 
    X_test, 
    feature_names=data.feature_names,
    interaction_index=None
)
plt.tight_layout()
plt.savefig('shap_dependence_plot.png', dpi=300, bbox_inches='tight')
plt.close()`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. LIME (Local Interpretable Model-agnostic Explanations)</h3>
            
            <p>
              LIME explains individual predictions by approximating the model locally with an interpretable model, such as a linear model, in the neighborhood of the instance being explained.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-orange-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-orange-800">When to Use LIME</h3>
                  <ul className="mt-2 text-sm text-orange-700 space-y-1">
                    <li>• You need explanations for individual predictions</li>
                    <li>• The model is a black box (e.g., deep neural networks, ensemble methods)</li>
                    <li>• You want to understand model behavior for specific instances</li>
                    <li>• You need explanations for text, image, or tabular data</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Implementing LIME in Python</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install lime

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from lime import lime_tabular
import matplotlib.pyplot as plt
from matplotlib import pyplot as plt
from lime import submodular_pick

# Load and prepare data
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = data.target

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Initialize LIME explainer
explainer = lime_tabular.LimeTabularExplainer(
    training_data=X_train.values,
    feature_names=data.feature_names,
    class_names=['malignant', 'benign'],
    mode='classification',
    verbose=True,
    random_state=42
)

# Explain a prediction
i = 0  # index of the instance to explain
exp = explainer.explain_instance(
    data_row=X_test.iloc[i],
    predict_fn=model.predict_proba,
    num_features=10,
    top_labels=1
)

# Save explanation to HTML
html = exp.as_html()
with open('lime_explanation.html', 'w') as f:
    f.write(html)

# Get the explanation as a matplotlib figure
fig = exp.as_pyplot_figure(label=1)
plt.tight_layout()
plt.savefig('lime_explanation.png', dpi=300, bbox_inches='tight')
plt.close()

# Submodular pick to get global insights
sp_obj = submodular_pick.SubmodularPick(
    explainer,
    X_test.values,
    model.predict_proba,
    num_features=10,
    num_exps_desired=10
)

# Save submodular pick explanations
for i, exp in enumerate(sp_obj.explanations):
    fig = exp.as_pyplot_figure(label=1)
    plt.tight_layout()
    plt.savefig(f'lime_submodular_pick_{i}.png', dpi=300, bbox_inches='tight')
    plt.close()`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Counterfactual Explanations</h3>
            
            <p>
              Counterfactual explanations describe the smallest change to the feature values that would change the model's prediction to a predefined output. They answer the question: "What would need to change to get a different outcome?"
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-green-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Benefits of Counterfactual Explanations</h3>
                  <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• Intuitive and actionable for end-users</li>
                    <li>• Model-agnostic and can be applied to any black-box model</li>
                    <li>• Useful for understanding decision boundaries</li>
                    <li>• Can help identify potential biases in the model</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Implementing Counterfactual Explanations</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install alibi

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import tensorflow as tf
from alibi.explainers import Counterfactual

# Set random seed for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

# Load and prepare data
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = data.target

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define a simple neural network model
def create_model(input_shape):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=input_shape),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Create and train the model
input_shape = (X_train.shape[1],)
model = create_model(input_shape)
model.fit(
    X_train.values, 
    y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.1,
    verbose=0
)

# Select an instance to explain
instance = X_test.iloc[0:1].values
prediction = model.predict(instance)
print(f"Original prediction: {prediction[0][0]:.4f} (class: {int(prediction[0][0] > 0.5)})")

# Define predict function for the explainer
predict_fn = lambda x: model.predict(x)

# Initialize counterfactual explainer
cf = Counterfactual(
    predict_fn=predict_fn,
    shape=(1, X_train.shape[1]),
    target_proba=0.5,  # Target probability for the counterfactual
    target_class='other',  # We want to flip the prediction
    max_iter=1000,
    feature_range=(X_train.values.min(axis=0), X_train.values.max(axis=0)),
    lam_init=1e-1,
    max_lam_steps=10,
    learning_rate_init=0.1,
    feature_names=data.feature_names
)

# Generate counterfactual explanation
cf.fit(X_train.values)
explanation = cf.explain(instance)

# Get the counterfactual
if explanation.cf is not None:
    print("\nCounterfactual found!")
    print(f"Original instance prediction: {model.predict(instance)[0][0]:.4f}")
    print(f"Counterfactual prediction: {model.predict(explanation.cf['X'])[0][0]:.4f}")
    
    # Calculate and display the changes
    changes = explanation.cf['X'] - instance
    changes_df = pd.DataFrame({
        'Feature': data.feature_names,
        'Original': instance.flatten(),
        'Counterfactual': explanation.cf['X'].flatten(),
        'Change': changes.flatten()
    })
    
    # Only show features that changed
    changed_features = changes_df[changes_df['Change'] != 0].sort_values('Change', key=abs, ascending=False)
    print("\nFeature changes needed:")
    print(changed_features[['Feature', 'Original', 'Counterfactual', 'Change']].to_string(index=False))
    
    # Visualize the most important changes
    plt.figure(figsize=(10, 6))
    top_changes = changed_features.nlargest(5, 'Change', key=abs)
    plt.barh(
        top_changes['Feature'], 
        top_changes['Change'],
        color=['green' if x > 0 else 'red' for x in top_changes['Change']]
    )
    plt.title('Top Feature Changes for Counterfactual')
    plt.xlabel('Change in Feature Value')
    plt.tight_layout()
    plt.savefig('counterfactual_changes.png', dpi=300, bbox_inches='tight')
    plt.close()
else:
    print("No counterfactual found within the given constraints.")`}
              </code>
            </pre>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Explainability for Different Data Types</h2>
            
            <p>
              Different data types require different explainability approaches. Let's explore techniques for various data modalities.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Tabular Data</h3>
            
            <p>
              For tabular data, we've already covered SHAP, LIME, and counterfactual explanations. Additional techniques include:
            </p>
            
            <ul className="list-disc pl-6 my-4 space-y-1">
              <li><strong>Partial Dependence Plots (PDP):</strong> Show the relationship between a feature and the predicted outcome after accounting for the average effect of all other features.</li>
              <li><strong>Individual Conditional Expectation (ICE):</strong> Similar to PDP but shows the relationship for individual instances.</li>
              <li><strong>Anchors:</strong> High-precision rules that "anchor" the prediction, providing conditions that are sufficient to guarantee the same prediction.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Text Data</h3>
            
            <p>
              For text classification and generation models, explainability focuses on identifying which words or phrases influence the model's predictions.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiType className="h-5 w-5 text-purple-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">Text Explainability Techniques</h3>
                  <ul className="mt-2 text-sm text-purple-700 space-y-1">
                    <li>• <strong>Attention Mechanisms:</strong> For transformer models, attention weights can indicate which tokens the model focuses on.</li>
                    <li>• <strong>LIME for Text:</strong> Perturbs input text by removing words and observes changes in predictions.</li>
                    <li>• <strong>Integrated Gradients:</strong> Attributes the prediction to the input features by integrating gradients.</li>
                    <li>• <strong>SHAP for Text:</strong> Similar to LIME but using SHAP values for feature attribution.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example: Text Classification with LIME</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install lime nltk scikit-learn

import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import fetch_20newsgroups
from lime import lime_text
from lime.lime_text import LimeTextExplainer

# Load a text dataset
categories = ['alt.atheism', 'soc.religion.christian']
newsgroups_train = fetch_20newsgroups(subset='train', categories=categories)
newsgroups_test = fetch_20newsgroups(subset='test', categories=categories)

# Create a simple text classification pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english')),
    ('clf', LogisticRegression(random_state=42))
])

# Train the model
pipeline.fit(newsgroups_train.data, newsgroups_train.target)

# Define class names for better interpretation
class_names = ['atheism', 'christian']

# Initialize LIME explainer
explainer = LimeTextExplainer(class_names=class_names)

# Select a random instance to explain
idx = 10
text_instance = newsgroups_test.data[idx]
true_label = newsgroups_test.target[idx]
pred_label = pipeline.predict([text_instance])[0]
pred_proba = pipeline.predict_proba([text_instance])[0]

print(f"True label: {class_names[true_label]}")
print(f"Predicted label: {class_names[pred_label]} (confidence: {pred_proba.max():.2f})")

# Generate explanation
explanation = explainer.explain_instance(
    text_instance, 
    pipeline.predict_proba, 
    num_features=10,
    top_labels=1
)

# Save explanation to HTML
html = explanation.as_html()
with open('lime_text_explanation.html', 'w') as f:
    f.write(html)

# Show the explanation in notebook (if running in notebook)
# explanation.show_in_notebook(text=True)`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Image Data</h3>
            
            <p>
              For image classification and object detection models, explainability focuses on identifying which regions of the image influenced the model's predictions.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiImage className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Image Explainability Techniques</h3>
                  <ul className="mt-2 text-sm text-blue-700 space-y-1">
                    <li>• <strong>Grad-CAM:</strong> Visualizes the importance of regions in the image using gradients.</li>
                    <li>• <strong>SHAP for Images:</strong> Extends SHAP values to image data, showing pixel importance.</li>
                    <li>• <strong>LIME for Images:</strong> Segments the image into superpixels and perturbs them to explain predictions.</li>
                    <li>• <strong>Integrated Gradients:</strong> Attributes the prediction to input pixels by integrating gradients.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example: Image Classification with Grad-CAM</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install tensorflow matplotlib opencv-python numpy

import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input, decode_predictions
import matplotlib.pyplot as plt
import cv2

# Load pre-trained VGG16 model
model = VGG16(weights='imagenet')

# Load and preprocess an image
img_path = 'example_image.jpg'  # Replace with your image path
img = image.load_img(img_path, target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)

# Make prediction
preds = model.predict(x)
print('Predicted:', decode_predictions(preds, top=3)[0])

# Get the predicted class index
pred_class = np.argmax(preds[0])

# Grad-CAM implementation
def grad_cam(model, img_array, layer_name, pred_index=None):
    # Create a model that maps the input image to the activations
    # of the last conv layer and the output predictions
    grad_model = tf.keras.models.Model(
        [model.inputs],
        [model.get_layer(layer_name).output, model.output]
    )
    
    # Compute the gradient of the top predicted class for the input image
    # with respect to the activations of the last conv layer
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        if pred_index is None:
            pred_index = tf.argmax(predictions[0])
        loss = predictions[:, pred_index]
    
    # Get the gradients of the loss with respect to the output feature map
    grads = tape.gradient(loss, conv_outputs)
    
    # Pool the gradients over all the axes leaving out the channel dimension
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    
    # Multiply each channel in the feature map array by its importance
    conv_outputs = conv_outputs[0]
    for i in range(pooled_grads.shape[0]):
        conv_outputs[:, :, i] *= pooled_grads[i]
    
    # Average over all the channels to get the heatmap
    heatmap = tf.reduce_mean(conv_outputs, axis=-1)
    
    # ReLU on the heatmap (equivalent to passing the feature maps through a ReLU)
    heatmap = np.maximum(heatmap, 0)
    
    # Normalize the heatmap
    heatmap /= np.max(heatmap)
    
    return heatmap

# Generate class activation heatmap
layer_name = 'block5_conv3'  # Last conv layer in VGG16
heatmap = grad_cam(model, x, layer_name)

# Rescale heatmap to a range 0-255
heatmap = np.uint8(255 * heatmap)

# Use jet colormap to colorize heatmap
heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

# Superimpose the heatmap on the original image
img = cv2.imread(img_path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img = cv2.resize(img, (224, 224))

# Resize heatmap to match the original image size
heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))

# Combine the heatmap with the original image
superimposed_img = heatmap * 0.4 + img
superimposed_img = np.uint8(superimposed_img)
superimposed_img = cv2.cvtColor(superimposed_img, cv2.COLOR_BGR2RGB)

# Display the original image and the heatmap
plt.figure(figsize=(20, 10))

plt.subplot(1, 2, 1)
plt.imshow(img)
plt.title('Original Image')
plt.axis('off')

plt.subplot(1, 2, 2)
plt.imshow(superimposed_img)
plt.title('Grad-CAM Heatmap')
plt.axis('off')

plt.tight_layout()
plt.savefig('grad_cam_visualization.png', dpi=300, bbox_inches='tight')
plt.close()`}
              </code>
            </pre>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Explainability in Production</h2>
            
            <p>
              Deploying explainability in production requires careful consideration of performance, scalability, and integration with existing systems.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Performance Considerations</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiZap className="h-5 w-5 text-yellow-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Performance Impact of Explainability</h3>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    <li>• SHAP can be computationally expensive, especially for large models or datasets</li>
                    <li>• LIME is generally faster but may need to be optimized for production use</li>
                    <li>• Consider using approximate methods or caching explanations for similar inputs</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Optimizing SHAP for Production</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install shap numba joblib

import numpy as np
import pandas as pd
import shap
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
import time
import joblib
from pathlib import Path

# Load and prepare data
data = load_breast_cancer()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = data.target

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# 1. Use TreeExplainer for tree-based models (much faster than KernelExplainer)
# This is optimized for tree-based models like Random Forest and XGBoost
explainer = shap.TreeExplainer(model)

# 2. Pre-compute expected values for faster predictions
# This avoids recomputing the expected value for each explanation
expected_value = explainer.expected_value

# 3. Use a subset of the data for background distribution
# Instead of using all training data, use a representative sample
background = shap.sample(X, 100)  # Use 100 samples instead of the full dataset

def explain_instance(instance, explainer, expected_value):
    """Explain a single instance using the pre-computed explainer."""
    # Convert to numpy array if needed
    if hasattr(instance, 'values'):
        instance = instance.values.reshape(1, -1)
    
    # Get SHAP values
    shap_values = explainer.shap_values(instance, check_additivity=False)
    
    # For binary classification, use the SHAP values for the positive class
    if isinstance(shap_values, list):
        shap_values = shap_values[1]  # Positive class
    
    return {
        'shap_values': shap_values,
        'expected_value': expected_value,
        'prediction': model.predict_proba(instance)[0][1]  # Probability of positive class
    }

# 4. Cache explanations for similar inputs
# This is a simple in-memory cache, but you could use Redis or similar in production
explanation_cache = {}

def get_explanation_cached(instance, cache_key=None):
    """Get explanation from cache or compute it if not found."""
    if cache_key is None:
        # Create a simple hash of the instance for caching
        cache_key = hash(tuple(instance.flatten().astype(float)))
    
    if cache_key in explanation_cache:
        return explanation_cache[cache_key]
    
    # Compute explanation if not in cache
    explanation = explain_instance(instance, explainer, expected_value)
    explanation_cache[cache_key] = explanation
    return explanation

# 5. Parallelize explanations for multiple instances
def explain_batch(instances, n_jobs=-1):
    """Explain multiple instances in parallel."""
    return joblib.Parallel(n_jobs=n_jobs)(
        joblib.delayed(explain_instance)(instance.reshape(1, -1), explainer, expected_value)
        for instance in instances
    )

# Example usage
instance = X.iloc[0:1]  # Get first instance

# Time the first explanation (will be slower due to compilation)
start_time = time.time()
explanation = get_explanation_cached(instance.values)
first_time = time.time() - start_time
print(f"First explanation took {first_time:.4f} seconds")

# Time subsequent explanations (should be faster, especially with caching)
start_time = time.time()
for _ in range(10):
    explanation = get_explanation_cached(instance.values)
subsequent_time = (time.time() - start_time) / 10
print(f"Subsequent explanations took {subsequent_time:.4f} seconds on average")

# 6. Save and load the explainer for production use
explainer_save_path = 'shap_explainer.joblib'
joblib.dump(explainer, explainer_save_path)

# In production, you would load it like this:
# explainer = joblib.load(explainer_save_path)

# 7. Batch processing for better performance
batch_size = 32
batch_explanations = explain_batch(X.iloc[:batch_size].values)
print(f"Generated {len(batch_explanations)} explanations in a batch")`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. API Design for Explainability</h3>
            
            <p>
              When exposing explainability features through an API, consider the following design patterns:
            </p>
            
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>Synchronous vs. Asynchronous:</strong> For complex explanations, consider an asynchronous API that returns a job ID and allows clients to poll for results.</li>
              <li><strong>Granularity:</strong> Allow clients to specify the level of detail they need (e.g., just feature importance scores vs. full explanations).</li>
              <li><strong>Caching:</strong> Implement caching to avoid recomputing explanations for the same or similar inputs.</li>
              <li><strong>Rate Limiting:</strong> Protect your API from abuse with appropriate rate limiting.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example: FastAPI Service for Model Explainability</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Install required packages
# pip install fastapi uvicorn python-multipart joblib scikit-learn pandas numpy

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import joblib
import numpy as np
import pandas as pd
import hashlib
import time
from datetime import datetime
import os
from pathlib import Path

# Initialize FastAPI app
app = FastAPI(
    title="ML Model Explainability API",
    description="API for explaining machine learning model predictions",
    version="1.0.0"
)

# Security
API_KEY = os.getenv("API_KEY", "your-secret-key")
api_key_header = APIKeyHeader(name="X-API-Key")

def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key"
        )
    return api_key

# Models
class ExplanationRequest(BaseModel):
    features: Dict[str, Any]
    explanation_type: str = "shap"  # or "lime", "counterfactual"
    num_features: Optional[int] = 5
    return_visualization: bool = True

class ExplanationResponse(BaseModel):
    explanation_id: str
    status: str
    explanation: Optional[Dict[str, Any]] = None
    visualization_url: Optional[str] = None
    timestamp: str

# Global variables for caching
EXPLANATION_CACHE = {}
MODEL = None
EXPLAINER = None

# Load model and explainer on startup
@app.on_event("startup")
async def load_model():
    global MODEL, EXPLAINER
    try:
        # In a real application, you would load your trained model here
        # For this example, we'll use a dummy model
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.datasets import load_breast_cancer
        import shap
        
        # Load example data and train a simple model
        data = load_breast_cancer()
        X, y = data.data, data.target
        
        MODEL = RandomForestClassifier(n_estimators=100, random_state=42)
        MODEL.fit(X, y)
        
        # Initialize explainer
        EXPLAINER = shap.TreeExplainer(MODEL)
        
        print("Model and explainer loaded successfully")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise e

def generate_explanation_id(features: dict, explanation_type: str) -> str:
    """Generate a unique ID for the explanation request."""
    feature_str = "".join(f"{k}:{v}" for k, v in sorted(features.items()))
    return hashlib.md5(f"{feature_str}:{explanation_type}".encode()).hexdigest()

@app.post("/explain", response_model=ExplanationResponse)
async def explain(
    request: ExplanationRequest,
    api_key: str = Depends(get_api_key)
):
    """Generate an explanation for a model prediction."""
    try:
        # Generate a unique ID for this explanation
        explanation_id = generate_explanation_id(request.features, request.explanation_type)
        
        # Check if explanation is already in cache
        if explanation_id in EXPLANATION_CACHE:
            return EXPLANATION_CACHE[explanation_id]
        
        # Convert features to the format expected by the model
        # In a real application, you would need to handle feature encoding properly
        feature_names = ["mean radius", "mean texture", "mean perimeter", "mean area", 
                        "mean smoothness", "mean compactness", "mean concavity", 
                        "mean concave points", "mean symmetry", "mean fractal dimension",
                        "radius error", "texture error", "perimeter error", "area error", 
                        "smoothness error", "compactness error", "concavity error",
                        "concave points error", "symmetry error", "fractal dimension error", 
                        "worst radius", "worst texture", "worst perimeter", "worst area", 
                        "worst smoothness", "worst compactness", "worst concavity",
                        "worst concave points", "worst symmetry", "worst fractal dimension"]
        
        # Create a feature vector with the same order as the model expects
        feature_vector = np.array([request.features.get(feature, 0) for feature in feature_names]).reshape(1, -1)
        
        # Get model prediction
        prediction = MODEL.predict_proba(feature_vector)[0]
        predicted_class = int(prediction[1] > 0.5)
        
        # Generate explanation based on the requested type
        explanation = {}
        visualization_path = None
        
        if request.explanation_type == "shap":
            # Generate SHAP values
            shap_values = EXPLAINER.shap_values(feature_vector, check_additivity=False)
            
            # For binary classification, use the SHAP values for the positive class
            if isinstance(shap_values, list):
                shap_values = shap_values[1]  # Positive class
            
            # Get top features
            top_indices = np.argsort(-np.abs(shap_values[0]))[:request.num_features]
            
            explanation = {
                "type": "shap",
                "predicted_class": predicted_class,
                "prediction_confidence": float(prediction[predicted_class]),
                "feature_importance": [
                    {
                        "feature": feature_names[i],
                        "value": float(feature_vector[0, i]),
                        "shap_value": float(shap_values[0, i]),
                        "impact": float(shap_values[0, i] * 100)  # As percentage
                    }
                    for i in top_indices
                ],
                "base_value": float(EXPLAINER.expected_value[1] if isinstance(EXPLAINER.expected_value, list) else EXPLAINER.expected_value)
            }
            
            # In a real application, you would generate and save a visualization
            # For this example, we'll just return a placeholder
            if request.return_visualization:
                visualization_path = f"/visualizations/{explanation_id}.png"
                # Save a dummy visualization in a real app, this would be a SHAP plot
                # import matplotlib.pyplot as plt
                # shap.plots.waterfall(shap_values[0], show=False)
                # plt.savefig(f"static{visualization_path}")
                # plt.close()
        
        elif request.explanation_type == "lime":
            # LIME explanation would go here
            explanation = {
                "type": "lime",
                "predicted_class": predicted_class,
                "explanation": "LIME explanation would be generated here in a real implementation"
            }
            
            if request.return_visualization:
                visualization_path = f"/visualizations/{explanation_id}.png"
        
        elif request.explanation_type == "counterfactual":
            # Counterfactual explanation would go here
            explanation = {
                "type": "counterfactual",
                "predicted_class": predicted_class,
                "explanation": "Counterfactual explanation would be generated here in a real implementation"
            }
            
            if request.return_visualization:
                visualization_path = f"/visualizations/{explanation_id}.png"
        
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported explanation type: {request.explanation_type}"
            )
        
        # Prepare response
        response = ExplanationResponse(
            explanation_id=explanation_id,
            status="success",
            explanation=explanation,
            visualization_url=f"https://api.yourservice.com{visualization_path}" if visualization_path else None,
            timestamp=datetime.utcnow().isoformat()
        )
        
        # Cache the explanation
        EXPLANATION_CACHE[explanation_id] = response
        
        return response
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating explanation: {str(e)}"
        )

@app.get("/explanations/{explanation_id}", response_model=ExplanationResponse)
async def get_explanation(
    explanation_id: str,
    api_key: str = Depends(get_api_key)
):
    """Retrieve a previously generated explanation by ID."""
    if explanation_id not in EXPLANATION_CACHE:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Explanation not found"
        )
    
    return EXPLANATION_CACHE[explanation_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`}
              </code>
            </pre>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Best Practices for Implementing Explainability</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Start with the Right Questions</h3>
                <p className="text-gray-700">Before implementing explainability, identify what you need to explain and to whom. Different stakeholders require different types of explanations.</p>
                <ul className="mt-3 pl-5 space-y-1 text-sm text-gray-600">
                  <li>• <strong>Data scientists</strong> need detailed technical explanations for model debugging.</li>
                  <li>• <strong>Business stakeholders</strong> need high-level insights into model behavior and business impact.</li>
                  <li>• <strong>End-users</strong> need simple, actionable explanations they can understand and trust.</li>
                  <li>• <strong>Regulators</strong> need documentation of model fairness, accountability, and compliance with regulations.</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Choose the Right Level of Explainability</h3>
                <p className="text-gray-700">Not all models require the same level of explainability. Consider the following factors when choosing an approach:</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <h4 className="font-medium text-blue-800">High-Stakes Decisions</h4>
                    <p className="text-sm text-blue-700">For applications like healthcare, criminal justice, or financial lending, use the most interpretable models (e.g., linear models, decision trees) or combine complex models with robust explanation methods.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded">
                    <h4 className="font-medium text-blue-800">Lower-Stakes Decisions</h4>
                    <p className="text-sm text-blue-700">For recommendations, ad targeting, or other lower-impact applications, simpler explanations or model-agnostic methods may suffice.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Ensure Explanations are Actionable</h3>
                <p className="text-gray-700">Good explanations should help users understand how to achieve a desired outcome. Consider the following:</p>
                <ul className="mt-3 pl-5 space-y-1 text-sm text-gray-600">
                  <li>• Provide clear, non-technical language that matches the user's domain knowledge.</li>
                  <li>Highlight the most important factors influencing the prediction.</li>
                  <li>When possible, provide counterfactual explanations (e.g., "If X were different by Y, the prediction would change to Z").</li>
                  <li>Allow users to explore "what-if" scenarios to understand how changes would affect predictions.</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Validate and Test Explanations</h3>
                <p className="text-gray-700">Just as you would validate your model's predictions, you should also validate its explanations:</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-yellow-800">Sanity Checks</h4>
                    <ul className="mt-1 space-y-1 text-sm text-yellow-700">
                      <li>• Do the explanations make sense to domain experts?</li>
                      <li>• Are the most important features actually relevant to the prediction task?</li>
                      <li>• Do similar inputs produce similar explanations?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800">Quantitative Evaluation</h4>
                    <ul className="mt-1 space-y-1 text-sm text-yellow-700">
                      <li>• Measure the stability of explanations for similar inputs</li>
                      <li>• Test if removing important features actually changes the prediction</li>
                      <li>• Compare explanations across different explanation methods</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Address Potential Pitfalls</h3>
                <p className="text-gray-700">Be aware of common challenges in implementing explainability:</p>
                <div className="mt-3 space-y-3">
                  <div>
                    <h4 className="font-medium text-red-800">False Sense of Understanding</h4>
                    <p className="text-sm text-red-700">Explanations can sometimes give a false sense of understanding. Be transparent about the limitations of your explanation methods.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-800">Explanation Hacking</h4>
                    <p className="text-sm text-red-700">Be cautious of adversarial attacks that can manipulate explanations without changing predictions, or vice versa.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-800">Overhead</h4>
                    <p className="text-sm text-red-700">Some explanation methods can be computationally expensive. Consider the trade-off between explanation quality and performance.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Future Trends in Explainable AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Causal Explainability</h3>
                <p className="text-gray-700">Moving beyond correlation to understand causal relationships in model predictions, enabling more robust and actionable explanations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Interactive Explanations</h3>
                <p className="text-gray-700">Developing more interactive and dynamic explanation interfaces that allow users to explore and query model behavior in real-time.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Explainability for Generative AI</h3>
                <p className="text-gray-700">New techniques to explain the behavior of large language models and other generative AI systems, which present unique interpretability challenges.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Standardization and Regulation</h3>
                <p className="text-gray-700">Emerging standards and regulations that define what constitutes a "good" explanation in different domains and applications.</p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 my-8 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-5 w-5 text-purple-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">Key Takeaway</h3>
                  <div className="mt-2 text-sm text-purple-700">
                    <p>Model explainability is not just a technical challenge but a critical component of responsible AI development. By implementing robust explainability techniques, you can build more transparent, trustworthy, and accountable AI systems. Remember that explainability is not a one-size-fits-all solution—it requires careful consideration of your specific use case, stakeholders, and regulatory requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Additional Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://christophm.github.io/interpretable-ml-book/" className="text-blue-600 hover:text-blue-800">Interpretable Machine Learning - A Guide for Making Black Box Models Explainable</a>
                </li>
                <li>
                  <a href="https://shap.readthedocs.io/" className="text-blue-600 hover:text-blue-800">SHAP Documentation</a>
                </li>
                <li>
                  <a href="https://github.com/marcotcr/lime" className="text-blue-600 hover:text-blue-800">LIME: Local Interpretable Model-agnostic Explanations</a>
                </li>
                <li>
                  <a href="https://docs.seldon.io/projects/alibi/en/stable/" className="text-blue-600 hover:text-blue-800">Alibi: Algorithms for Explaining Machine Learning Models</a>
                </li>
                <li>
                  <a href="https://pair.withgoogle.com/guidebook/" className="text-blue-600 hover:text-blue-800">People + AI Guidebook - Google's guide to human-centered AI products</a>
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
                <p className="mt-2 text-sm text-gray-400">Advancing transparent and responsible AI through cutting-edge research and development.</p>
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

export default MLModelExplainability;
