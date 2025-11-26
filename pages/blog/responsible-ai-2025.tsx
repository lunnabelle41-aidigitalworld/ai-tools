import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiCalendar, FiCheckCircle, FiClock, FiCode, FiDownload, FiEye, FiLock, FiShield, FiUsers } from 'react-icons/fi';
import { FaBalanceScale, FaUserShield, FaChartLine } from 'react-icons/fa';
import { GiJusticeStar } from 'react-icons/gi';

const ResponsibleAI: NextPage = () => {
  const router = useRouter();
  const currentUrl = `https://aivault.ai${router.asPath}`;
  const title = 'Responsible AI: Implementing Ethical Machine Learning in Production | AI Vault';
  const description = 'Comprehensive guide to implementing responsible AI practices in production. Learn about fairness, accountability, transparency, and ethical considerations for machine learning systems.';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="responsible ai, ethical ai, ai fairness, ai ethics, machine learning ethics, ai governance, ai transparency, ai accountability" />
        <meta name="author" content="AI Vault Ethics Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://aivault.ai/images/responsible-ai-og.jpg" />
        <meta property="og:site_name" content="AI Vault" />
        <meta property="article:published_time" content="2025-04-13T00:00:00+00:00" />
        <meta property="article:author" content="AI Vault Ethics Team" />
        <meta property="article:section" content="AI Ethics" />
        <meta property="article:tag" content="AI Ethics" />
        <meta property="article:tag" content="Responsible AI" />
        <meta property="article:tag" content="Machine Learning" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aivault" />
        <meta name="twitter:creator" content="@aivault" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aivault.ai/images/responsible-ai-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": "https://aivault.ai/images/responsible-ai-og.jpg",
            "author": {
              "@type": "Organization",
              "name": "AI Vault Ethics Team",
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
            "datePublished": "2025-04-13T00:00:00+00:00",
            "dateModified": "2025-04-13T00:00:00+00:00",
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
                Responsible AI
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-purple-100">
                Implementing Ethical Machine Learning in Production
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-purple-100">
                  <span className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <GiJusticeStar className="h-5 w-5" />
                  </span>
                  <span>AI Ethics & Governance</span>
                </div>
                <div className="flex items-center text-purple-100">
                  <span className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiClock className="h-5 w-5" />
                  </span>
                  <span>30 min read</span>
                </div>
                <div className="flex items-center text-purple-100">
                  <span className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiCalendar className="h-5 w-5" />
                  </span>
                  <span>April 13, 2025</span>
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
                    src="/images/authors/ai-ethics-team.jpg"
                    alt="AI Vault Ethics Team"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">AI Vault Ethics Team</p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span>AI Ethics & Governance</span>
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
              As artificial intelligence systems become increasingly integrated into critical decision-making processes, the need for responsible AI practices has never been more urgent. This comprehensive guide explores the principles, frameworks, and practical implementation of ethical machine learning in production environments.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Imperative for Responsible AI</h2>
            
            <p>
              The rapid advancement of AI technologies has brought both unprecedented opportunities and significant ethical challenges. From biased hiring algorithms to discriminatory loan approval systems, the consequences of unethical AI can be far-reaching and damaging. Responsible AI is not just a moral obligation but a business imperative in today's increasingly regulated and socially conscious landscape.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-purple-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">Key Statistic</h3>
                  <div className="mt-2 text-sm text-purple-700">
                    <p>According to a 2025 Gartner report, organizations that implement comprehensive responsible AI practices experience 30% fewer AI-related incidents and achieve 25% higher customer trust scores compared to their peers.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Core Principles of Responsible AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FaBalanceScale className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fairness</h3>
                <p className="text-gray-700">Ensuring AI systems treat all individuals and groups equitably, without discrimination or bias based on protected attributes such as race, gender, or age.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiShield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accountability</h3>
                <p className="text-gray-700">Establishing clear lines of responsibility for AI system behavior and ensuring mechanisms for redress when issues arise.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiEye className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
                <p className="text-gray-700">Making AI system operations understandable to stakeholders, including how decisions are made and what data is used.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FiLock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy</h3>
                <p className="text-gray-700">Protecting personal and sensitive data throughout the AI system lifecycle, from collection to deployment and beyond.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FaUserShield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety & Security</h3>
                <p className="text-gray-700">Ensuring AI systems operate reliably and securely, with appropriate safeguards against misuse or adversarial attacks.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="text-purple-600 mb-3">
                  <FaChartLine className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Robustness</h3>
                <p className="text-gray-700">Designing AI systems that perform consistently across different contexts and can handle edge cases appropriately.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Implementing Responsible AI in Practice</h2>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Bias Detection and Mitigation</h3>
            
            <p>
              Bias can creep into AI systems at various stages, from data collection to model deployment. Implementing robust bias detection and mitigation strategies is crucial for developing fair and equitable AI systems.
            </p>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg my-6">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Bias Mitigation Techniques</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Approaches to identify and reduce bias in machine learning models</p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Pre-processing</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Modify training data to remove biases before model training (e.g., reweighting, resampling)</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">In-processing</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Modify learning algorithms to optimize for fairness during training (e.g., adversarial debiasing, fairness constraints)</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Post-processing</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Adjust model outputs after prediction to ensure fairness (e.g., equalized odds, calibration)</dd>
                  </div>
                </dl>
              </div>
            </div>

            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-3">Example: Implementing Fairness Metrics</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Example of implementing fairness metrics using AIF360
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric
from aif360.algorithms.preprocessing import Reweighing
import pandas as pd
import numpy as np

# Load your dataset
df = pd.read_csv('your_dataset.csv')

# Define privileged and unprivileged groups
privileged_groups = [{'gender': 1}]  # Assuming 1 represents the privileged group
unprivileged_groups = [{'gender': 0}]  # Assuming 0 represents the unprivileged group

# Convert to AIF360 dataset
dataset = BinaryLabelDataset(
    df=df,
    label_names=['target'],
    protected_attribute_names=['gender'],
    favorable_label=1,
    unfavorable_label=0
)

# Calculate fairness metrics
metric = BinaryLabelDatasetMetric(
    dataset,
    unprivileged_groups=unprivileged_groups,
    privileged_groups=privileged_groups
)

# Print fairness metrics
print(f"Statistical Parity Difference: {metric.statistical_parity_difference():.4f}")
print(f"Disparate Impact: {metric.disparate_impact():.4f}")
print(f"Average Odds Difference: {metric.average_odds_difference():.4f}")

# Apply reweighing to mitigate bias
RW = Reweighing(unprivileged_groups=unprivileged_groups,
               privileged_groups=privileged_groups)
dataset_transf = RW.fit_transform(dataset)

# Check metrics after mitigation
metric_transf = BinaryLabelDatasetMetric(
    dataset_transf,
    unprivileged_groups=unprivileged_groups,
    privileged_groups=privileged_groups
)

print("\nAfter mitigation:")
print(f"Statistical Parity Difference: {metric_transf.statistical_parity_difference():.4f}")
print(f"Disparate Impact: {metric_transf.disparate_impact():.4f}")
print(f"Average Odds Difference: {metric_transf.average_odds_difference():.4f}")`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Explainability and Interpretability</h3>
            
            <p>
              Making AI systems interpretable is essential for building trust, enabling debugging, and meeting regulatory requirements. Different stakeholders require different levels of explanation, from technical teams to end-users.
            </p>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCode className="h-5 w-5 text-indigo-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-indigo-800">Implementation Tip</h3>
                  <div className="mt-2 text-sm text-indigo-700">
                    <p>Use SHAP (SHapley Additive exPlanations) or LIME (Local Interpretable Model-agnostic Explanations) to provide local explanations for individual predictions, complementing global model interpretability techniques.</p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-medium text-gray-900 mt-6 mb-3">Example: Implementing SHAP for Model Explainability</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Example of implementing SHAP for model explainability
import shap
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt

# Load and prepare your data
# X_train, X_test, y_train, y_test = ...

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Initialize SHAP explainer
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Visualize feature importance
plt.figure(figsize=(10, 6))
shap.summary_plot(shap_values, X_test, plot_type="bar")
plt.title("Feature Importance (SHAP values)")
plt.tight_layout()
plt.savefig('feature_importance.png')
plt.close()

# Explain individual predictions
idx = 0  # Index of the instance to explain
shap.force_plot(
    explainer.expected_value[1], 
    shap_values[1][idx,:], 
    X_test.iloc[idx,:],
    matplotlib=True,
    show=False
)
plt.title(f"SHAP values for prediction of instance {idx}")
plt.tight_layout()
plt.savefig('shap_force_plot.png')
plt.close()

# Generate SHAP dependence plots for important features
for feature in X_train.columns[:3]:  # Top 3 features
    shap.dependence_plot(
        feature, 
        shap_values[1], 
        X_test,
        interaction_index=None,
        show=False
    )
    plt.title(f"SHAP Dependence Plot for {feature}")
    plt.tight_layout()
    plt.savefig(f'shap_dependence_{feature}.png')
    plt.close()`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Privacy-Preserving Machine Learning</h3>
            
            <p>
              Protecting sensitive data while still enabling effective machine learning is a critical aspect of responsible AI. Several techniques can help achieve this balance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Differential Privacy</h3>
                <p className="text-gray-700 mb-4">A system for publicly sharing information about a dataset by describing the patterns of groups within the dataset while withholding information about individuals in the dataset.</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about differential privacy →</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Federated Learning</h3>
                <p className="text-gray-700 mb-4">A machine learning approach where the model is trained across multiple decentralized devices or servers holding local data samples, without exchanging them.</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Explore federated learning →</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Homomorphic Encryption</h3>
                <p className="text-gray-700 mb-4">A form of encryption that allows computation on ciphertexts, generating an encrypted result which, when decrypted, matches the result of operations performed on the plaintext.</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Understand homomorphic encryption →</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Synthetic Data Generation</h3>
                <p className="text-gray-700 mb-4">Creating artificial data that maintains the statistical properties of the original data while protecting individual privacy.</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn about synthetic data →</a>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. AI Governance and Compliance</h3>
            
            <p>
              Establishing robust AI governance frameworks is essential for ensuring responsible AI practices are consistently applied across an organization.
            </p>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg my-6">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Key Components of an AI Governance Framework</h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Policies and Standards</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Documented guidelines for responsible AI development, deployment, and monitoring.</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Risk Management</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Processes for identifying, assessing, and mitigating AI-related risks.</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Ethics Review Boards</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Cross-functional teams that review high-risk AI applications for ethical considerations.</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Monitoring and Auditing</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Ongoing assessment of AI systems for compliance with ethical guidelines and regulations.</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Training and Awareness</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Programs to educate employees about responsible AI principles and practices.</dd>
                  </div>
                </dl>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Responsible AI Tooling Ecosystem</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 mb-3">
                  <FiCheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Fairness 360</h3>
                <p className="text-gray-600 text-sm">Comprehensive open-source toolkit with 70+ fairness metrics and 10+ bias mitigation algorithms.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 mb-3">
                  <FiEye className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SHAP & LIME</h3>
                <p className="text-gray-600 text-sm">Model-agnostic tools for explaining individual predictions and understanding feature importance.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 mb-3">
                  <FiLock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">TensorFlow Privacy</h3>
                <p className="text-gray-600 text-sm">Library for training machine learning models with differential privacy.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 mb-3">
                  <FiUsers className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">IBM AI Explainability 360</h3>
                <p className="text-gray-600 text-sm">Comprehensive set of algorithms for interpreting and explaining machine learning models.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 mb-3">
                  <FiDownload className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Microsoft Responsible AI</h3>
                <p className="text-gray-600 text-sm">Suite of tools and frameworks for building responsible AI systems on Azure.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 mb-3">
                  <FiCode className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Google Responsible AI</h3>
                <p className="text-gray-600 text-sm">Tools and best practices for developing AI responsibly, including the What-If Tool and Fairness Indicators.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Implementing a Responsible AI Workflow</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Assess and Plan</h3>
                  <p className="mt-1 text-gray-600">Conduct an AI ethics impact assessment to identify potential risks and mitigation strategies before development begins.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Diverse and Representative Data</h3>
                  <p className="mt-1 text-gray-600">Ensure training data is representative of the population the model will serve, with special attention to edge cases and underrepresented groups.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Bias Testing</h3>
                  <p className="mt-1 text-gray-600">Implement comprehensive bias testing throughout the model development lifecycle, not just as a final check.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Human-in-the-Loop</h3>
                  <p className="mt-1 text-gray-600">Design systems with appropriate human oversight, especially for high-stakes decisions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <span className="text-purple-600 font-bold">5</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Continuous Monitoring</h3>
                  <p className="mt-1 text-gray-600">Implement robust monitoring for model drift, performance degradation, and emerging fairness issues in production.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <span className="text-purple-600 font-bold">6</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Documentation and Transparency</h3>
                  <p className="mt-1 text-gray-600">Maintain thorough documentation of model development, testing, and monitoring processes.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Future of Responsible AI</h2>
            
            <p className="mb-6">
              As AI systems become more complex and integrated into critical aspects of society, the field of responsible AI continues to evolve. Emerging trends include:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Automated AI Ethics:</strong> Tools that automatically detect and mitigate ethical issues during model development and deployment.</li>
              <li><strong>Regulatory Frameworks:</strong> Increasingly comprehensive regulations governing AI development and use, such as the EU AI Act and US AI Bill of Rights.</li>
              <li><strong>AI Ethics as a Service:</strong> Third-party services that provide ethical auditing and certification for AI systems.</li>
              <li><strong>Explainable AI (XAI):</strong> Continued advancement in techniques to make complex models more interpretable and transparent.</li>
              <li><strong>AI for Social Good:</strong> Leveraging AI to address societal challenges while maintaining ethical standards.</li>
            </ul>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 my-8 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheckCircle className="h-5 w-5 text-purple-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">Key Takeaway</h3>
                  <div className="mt-2 text-sm text-purple-700">
                    <p>Responsible AI is not a one-time effort but an ongoing commitment that must be integrated into every stage of the AI lifecycle, from design to deployment and beyond. By prioritizing ethical considerations and implementing robust governance frameworks, organizations can harness the power of AI while minimizing risks and maximizing positive impact.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Additional Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://ai.google/responsibility/" className="text-blue-600 hover:text-blue-800">Google's Responsible AI Practices</a>
                </li>
                <li>
                  <a href="https://www.microsoft.com/en-us/ai/responsible-ai" className="text-blue-600 hover:text-blue-800">Microsoft Responsible AI Resources</a>
                </li>
                <li>
                  <a href="https://www.ibm.com/artificial-intelligence/ethics" className="text-blue-600 hover:text-blue-800">IBM AI Ethics</a>
                </li>
                <li>
                  <a href="https://www.partnershiponai.org/" className="text-blue-600 hover:text-blue-800">Partnership on AI</a>
                </li>
                <li>
                  <a href="https://www.aies-conference.com/" className="text-blue-600 hover:text-blue-800">AIES Conference on AI, Ethics, and Society</a>
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
                <p className="mt-2 text-sm text-gray-400">Empowering AI innovation through responsible practices and ethical considerations.</p>
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

export default ResponsibleAI;
