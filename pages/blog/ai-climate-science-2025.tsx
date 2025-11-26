import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiActivity, FiAlertCircle, FiBarChart2, FiCalendar, FiClock, FiCloud, FiCloudRain, FiCpu, FiDatabase, FiDroplet, FiFilter, FiGlobe, FiLayers, FiMap, FiPieChart, FiSun, FiThermometer, FiTrendingUp, FiWind, FiZap } from 'react-icons/fi';
import { FaLeaf, FaTree, FaWater, FaWind, FaSolarPanel, FaRecycle, FaChartLine } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiJupyter, SiKeras } from 'react-icons/si';

const AIClimateScience: NextPage = () => {
  const router = useRouter();
  const currentUrl = `https://aivault.ai${router.asPath}`;
  const title = 'AI in Climate Science: Leveraging Machine Learning for Environmental Sustainability | AI Vault';
  const description = 'Explore how artificial intelligence is transforming climate science, from climate modeling and carbon tracking to disaster prediction and biodiversity conservation. Learn about cutting-edge AI applications in environmental sustainability.';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="AI in climate science, machine learning environment, climate change AI, environmental sustainability, carbon tracking, climate modeling, disaster prediction, biodiversity conservation, renewable energy AI" />
        <meta name="author" content="AI Vault Environmental Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://aivault.ai/images/ai-climate-science-og.jpg" />
        <meta property="og:site_name" content="AI Vault" />
        <meta property="article:published_time" content="2025-04-17T00:00:00+00:00" />
        <meta property="article:author" content="AI Vault Environmental Team" />
        <meta property="article:section" content="AI for Good" />
        <meta property="article:tag" content="AI in Climate Science" />
        <meta property="article:tag" content="Environmental AI" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aivault" />
        <meta name="twitter:creator" content="@aivault" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://aivault.ai/images/ai-climate-science-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": "https://aivault.ai/images/ai-climate-science-og.jpg",
            "author": {
              "@type": "Organization",
              "name": "AI Vault Environmental Team",
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
            "datePublished": "2025-04-17T00:00:00+00:00",
            "dateModified": "2025-04-17T00:00:00+00:00",
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-700 opacity-90"></div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                AI in Climate Science
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-green-100">
                Leveraging Machine Learning for Environmental Sustainability
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-green-100">
                  <span className="bg-green-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FaLeaf className="h-5 w-5" />
                  </span>
                  <span>AI for Good</span>
                </div>
                <div className="flex items-center text-green-100">
                  <span className="bg-green-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiClock className="h-5 w-5" />
                  </span>
                  <span>45 min read</span>
                </div>
                <div className="flex items-center text-green-100">
                  <span className="bg-green-500 bg-opacity-30 rounded-full p-2 mr-2">
                    <FiCalendar className="h-5 w-5" />
                  </span>
                  <span>April 17, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Author and Share */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src="/images/authors/ai-vault-environmental-team.jpg"
                    alt="AI Vault Environmental Team"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">AI Vault Environmental Team</p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span>AI for Good</span>
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
              As the climate crisis intensifies, artificial intelligence has emerged as a powerful tool in our fight against environmental degradation. From predicting extreme weather events to optimizing renewable energy systems, AI is revolutionizing how we understand and address climate change.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Role of AI in Climate Science</h2>
            
            <p>
              Climate science generates enormous amounts of complex data from satellites, sensors, and climate models. AI, particularly machine learning, excels at finding patterns and making predictions from these vast datasets, enabling breakthroughs in our understanding of climate systems.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiActivity className="h-5 w-5 text-green-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">AI in Climate Science: Key Applications</h3>
                  <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• Climate modeling and prediction with unprecedented accuracy</li>
                    <li>• Carbon footprint tracking and reduction strategies</li>
                    <li>• Early warning systems for natural disasters</li>
                    <li>• Biodiversity monitoring and conservation</li>
                    <li>• Optimization of renewable energy systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Climate Modeling and Prediction</h3>
            
            <p>
              Traditional climate models are computationally intensive and often struggle with the complexity of Earth's climate system. AI is enhancing these models through several approaches:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
                <div className="text-blue-600 mb-3">
                  <FiCloud className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Physics-Informed Neural Networks</h4>
                <p className="text-gray-700">Combining physical laws with neural networks to create more accurate and efficient climate models that respect the fundamental laws of physics.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-teal-200">
                <div className="text-teal-600 mb-3">
                  <FiWind className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Downscaling Global Models</h4>
                <p className="text-gray-700">Using ML to enhance the resolution of global climate models, providing more localized and accurate climate projections.</p>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Implementation Example: Climate Model Emulation</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Example of a neural network for climate model emulation using PyTorch
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import xarray as xr
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader, TensorDataset
from sklearn.preprocessing import StandardScaler

# Define the neural network architecture
class ClimateEmulator(nn.Module):
    def __init__(self, input_dim, hidden_dims=[256, 128, 64], output_dim=1, dropout_rate=0.2):
        super(ClimateEmulator, self).__init__()
        
        # Input layer
        layers = [
            nn.Linear(input_dim, hidden_dims[0]),
            nn.ReLU(),
            nn.BatchNorm1d(hidden_dims[0]),
            nn.Dropout(dropout_rate)
        ]
        
        # Hidden layers
        for i in range(1, len(hidden_dims)):
            layers.extend([
                nn.Linear(hidden_dims[i-1], hidden_dims[i]),
                nn.ReLU(),
                nn.BatchNorm1d(hidden_dims[i]),
                nn.Dropout(dropout_rate)
            ])
        
        # Output layer (regression)
        layers.append(nn.Linear(hidden_dims[-1], output_dim))
        
        # Combine all layers
        self.model = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.model(x)

# Data preparation function
def prepare_climate_data(file_path, input_vars, target_var, test_size=0.2, batch_size=32):
    """
    Prepare climate data for training a neural network.
    
    Args:
        file_path (str): Path to NetCDF file containing climate data
        input_vars (list): List of input variable names
        target_var (str): Name of target variable
        test_size (float): Fraction of data to use for testing
        batch_size (int): Batch size for DataLoader
    
    Returns:
        tuple: (train_loader, test_loader, input_scaler, target_scaler)
    """
    # Load climate data (NetCDF format)
    ds = xr.open_dataset(file_path)
    
    # Extract input and target variables
    X = np.column_stack([ds[var].values.reshape(-1) for var in input_vars])
    y = ds[target_var].values.reshape(-1, 1)
    
    # Remove rows with NaN values
    valid_idx = ~np.isnan(X).any(axis=1) & ~np.isnan(y).any(axis=1)
    X = X[valid_idx]
    y = y[valid_idx]
    
    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42
    )
    
    # Standardize features
    input_scaler = StandardScaler()
    X_train_scaled = input_scaler.fit_transform(X_train)
    X_test_scaled = input_scaler.transform(X_test)
    
    # Standardize target
    target_scaler = StandardScaler()
    y_train_scaled = target_scaler.fit_transform(y_train)
    y_test_scaled = target_scaler.transform(y_test)
    
    # Convert to PyTorch tensors
    X_train_tensor = torch.FloatTensor(X_train_scaled)
    y_train_tensor = torch.FloatTensor(y_train_scaled)
    X_test_tensor = torch.FloatTensor(X_test_scaled)
    y_test_tensor = torch.FloatTensor(y_test_scaled)
    
    # Create DataLoaders
    train_data = TensorDataset(X_train_tensor, y_train_tensor)
    test_data = TensorDataset(X_test_tensor, y_test_tensor)
    
    train_loader = DataLoader(train_data, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_data, batch_size=batch_size, shuffle=False)
    
    return train_loader, test_loader, input_scaler, target_scaler

def train_climate_emulator():
    # Example usage
    # Note: In a real scenario, you would load actual climate model data
    
    # Configuration
    config = {
        'input_vars': ['temperature', 'humidity', 'pressure', 'wind_speed', 'solar_radiation'],
        'target_var': 'precipitation',
        'hidden_dims': [256, 128, 64],
        'learning_rate': 0.001,
        'num_epochs': 100,
        'batch_size': 64,
        'patience': 10,  # Early stopping patience
        'model_save_path': 'climate_emulator.pt'
    }
    
    # Prepare data
    print("Preparing data...")
    train_loader, test_loader, input_scaler, target_scaler = prepare_climate_data(
        file_path='climate_data.nc',
        input_vars=config['input_vars'],
        target_var=config['target_var'],
        batch_size=config['batch_size']
    )
    
    # Initialize model
    input_dim = len(config['input_vars'])
    model = ClimateEmulator(
        input_dim=input_dim,
        hidden_dims=config['hidden_dims'],
        output_dim=1
    )
    
    # Loss function and optimizer
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=config['learning_rate'])
    
    # Learning rate scheduler
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5, verbose=True
    )
    
    # Early stopping
    best_loss = float('inf')
    patience_counter = 0
    
    # Training loop
    print("Starting training...")
    train_losses = []
    val_losses = []
    
    for epoch in range(config['num_epochs']):
        # Training
        model.train()
        train_loss = 0.0
        
        for inputs, targets in train_loader:
            optimizer.zero_grad()
            
            # Forward pass
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            
            # Backward pass and optimize
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item() * inputs.size(0)
        
        # Calculate average training loss
        train_loss = train_loss / len(train_loader.dataset)
        train_losses.append(train_loss)
        
        # Validation
        model.eval()
        val_loss = 0.0
        
        with torch.no_grad():
            for inputs, targets in test_loader:
                outputs = model(inputs)
                loss = criterion(outputs, targets)
                val_loss += loss.item() * inputs.size(0)
        
        # Calculate average validation loss
        val_loss = val_loss / len(test_loader.dataset)
        val_losses.append(val_loss)
        
        # Update learning rate
        scheduler.step(val_loss)
        
        # Print progress
        print(f'Epoch {epoch+1}/{config["num_epochs"]}, ' \
              f'Train Loss: {train_loss:.6f}, Val Loss: {val_loss:.6f}, ' \
              f'LR: {optimizer.param_groups[0]["lr"]:.2e}')
        
        # Check for early stopping
        if val_loss < best_loss:
            best_loss = val_loss
            patience_counter = 0
            # Save the best model
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'train_loss': train_loss,
                'val_loss': val_loss,
                'input_scaler': input_scaler,
                'target_scaler': target_scaler,
                'config': config
            }, config['model_save_path'])
        else:
            patience_counter += 1
            if patience_counter >= config['patience']:
                print(f'Early stopping at epoch {epoch+1}')
                break
    
    print("Training complete!")
    
    # Plot training history
    plt.figure(figsize=(10, 6))
    plt.plot(train_losses, label='Training Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss (MSE)')
    plt.title('Training and Validation Loss')
    plt.legend()
    plt.grid(True)
    plt.savefig('training_history.png')
    plt.close()
    
    return model, input_scaler, target_scaler

# Example prediction function
def predict_with_emulator(model, input_data, input_scaler, target_scaler):
    """
    Make predictions using the trained climate emulator.
    
    Args:
        model: Trained PyTorch model
        input_data: Numpy array of shape (n_samples, n_features)
        input_scaler: Fitted StandardScaler for input features
        target_scaler: Fitted StandardScaler for target variable
    
    Returns:
        Numpy array of predictions in original scale
    """
    model.eval()
    
    # Scale input data
    input_scaled = input_scaler.transform(input_data)
    
    # Convert to tensor
    input_tensor = torch.FloatTensor(input_scaled)
    
    # Make prediction
    with torch.no_grad():
        output_scaled = model(input_tensor).numpy()
    
    # Inverse transform to original scale
    predictions = target_scaler.inverse_transform(output_scaled)
    
    return predictions

# Example usage (uncomment to run)
# model, input_scaler, target_scaler = train_climate_emulator()

# Example input for prediction (replace with actual values)
# example_input = np.array([[25.0, 0.6, 1013.25, 3.2, 450.0]])  # temp, humidity, pressure, wind_speed, solar_rad
# prediction = predict_with_emulator(model, example_input, input_scaler, target_scaler)
# print(f"Predicted precipitation: {prediction[0][0]:.2f} mm")`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Carbon Footprint Tracking</h3>
            
            <p>
              Accurately measuring and reducing carbon emissions is critical for mitigating climate change. AI is enabling more precise and comprehensive carbon accounting across various sectors.
            </p>
            
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaChartLine className="h-5 w-5 text-teal-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-teal-800">AI for Carbon Accounting</h3>
                  <ul className="mt-2 text-sm text-teal-700 space-y-1">
                    <li>• Automated analysis of satellite imagery to monitor deforestation and land use changes</li>
                    <li>• Real-time tracking of industrial emissions using IoT sensors and computer vision</li>
                    <li>• Supply chain carbon footprint calculation using transaction data and ML</li>
                    <li>• Personalized carbon footprint tracking apps with behavior analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Implementation Example: Carbon Footprint Estimator</h4>
            
            <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-6">
              <code>
{`# Example of a carbon footprint estimation model using scikit-learn
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import joblib

class CarbonFootprintEstimator:
    def __init__(self):
        # Define numerical and categorical features
        self.numerical_features = [
            'electricity_kwh', 'natural_gas_therms', 'vehicle_miles', 
            'air_travel_miles', 'waste_lbs', 'diet_score'
        ]
        
        self.categorical_features = [
            'home_type', 'region', 'renewable_energy'
        ]
        
        # Initialize the preprocessing pipeline
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), self.numerical_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), self.categorical_features)
            ])
        
        # Initialize the model
        self.model = RandomForestRegressor(
            n_estimators=200,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        
        # Create the pipeline
        self.pipeline = Pipeline([
            ('preprocessor', self.preprocessor),
            ('regressor', self.model)
        ])
    
    def load_data(self, filepath):
        """Load and preprocess training data."""
        # Load the dataset
        data = pd.read_csv(filepath)
        
        # Separate features and target
        X = data.drop('carbon_footprint', axis=1)
        y = data['carbon_footprint']
        
        return X, y
    
    def train(self, X, y, test_size=0.2, random_state=42):
        """Train the carbon footprint estimator."""
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )
        
        # Train the model
        print("Training the model...")
        self.pipeline.fit(X_train, y_train)
        
        # Evaluate the model
        train_score = self.pipeline.score(X_train, y_train)
        test_score = self.pipeline.score(X_test, y_test)
        
        print(f"Training R² score: {train_score:.4f}")
        print(f"Test R² score: {test_score:.4f}")
        
        return self.pipeline
    
    def predict(self, X):
        """Predict carbon footprint for new data."""
        if not hasattr(self, 'pipeline'):
            raise ValueError("Model has not been trained. Call train() first.")
        
        return self.pipeline.predict(X)
    
    def save_model(self, filepath):
        """Save the trained model to disk."""
        joblib.dump(self.pipeline, filepath)
        print(f"Model saved to {filepath}")
    
    @classmethod
    def load_model(cls, filepath):
        """Load a trained model from disk."""
        estimator = cls()
        estimator.pipeline = joblib.load(filepath)
        return estimator

# Example usage
if __name__ == "__main__":
    # Initialize the estimator
    estimator = CarbonFootprintEstimator()
    
    # Load training data (replace with your dataset)
    # The dataset should contain the following columns:
    # - electricity_kwh: Annual electricity usage in kWh
    # - natural_gas_therms: Annual natural gas usage in therms
    # - vehicle_miles: Annual vehicle miles driven
    # - air_travel_miles: Annual air travel miles
    # - waste_lbs: Weekly waste production in pounds
    # - diet_score: Diet sustainability score (1-10, higher is better)
    # - home_type: Type of residence (Apartment, House, Condo, etc.)
    # - region: Geographic region (Northeast, South, Midwest, West)
    # - renewable_energy: Whether the home uses renewable energy (Yes/No)
    # - carbon_footprint: Annual carbon footprint in metric tons CO2e
    
    # Example of how to train the model (uncomment and modify as needed)
    """
    X, y = estimator.load_data('carbon_footprint_data.csv')
    estimator.train(X, y)
    estimator.save_model('carbon_footprint_model.joblib')
    
    # Example prediction
    new_data = pd.DataFrame({
        'electricity_kwh': [8000],
        'natural_gas_therms': [500],
        'vehicle_miles': [12000],
        'air_travel_miles': [5000],
        'waste_lbs': [15],
        'diet_score': [7],
        'home_type': ['House'],
        'region': ['Northeast'],
        'renewable_energy': ['No']
    })
    
    # Load the trained model
    # loaded_estimator = CarbonFootprintEstimator.load_model('carbon_footprint_model.joblib')
    
    # Make prediction
    footprint = estimator.predict(new_data)
    print(f"Estimated annual carbon footprint: {footprint[0]:.2f} metric tons CO2e")
    
    # Get feature importances
    feature_importances = estimator.pipeline.named_steps['regressor'].feature_importances_
    
    # Get feature names after one-hot encoding
    try:
        # For scikit-learn >= 1.0
        feature_names = (estimator.pipeline.named_steps['preprocessor']
                        .named_transformers_['cat']
                        .get_feature_names_out(estimator.categorical_features))
    except AttributeError:
        # For older scikit-learn versions
        feature_names = estimator.pipeline.named_steps['preprocessor']\
            .named_transformers_['cat']\
            .get_feature_names(estimator.categorical_features)
    
    # Combine numerical and categorical feature names
    all_feature_names = np.concatenate([estimator.numerical_features, feature_names])
    
    # Create a DataFrame of feature importances
    importance_df = pd.DataFrame({
        'feature': all_feature_names,
        'importance': feature_importances
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importances:")
    print(importance_df)
    """`}
              </code>
            </pre>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Disaster Prediction and Response</h3>
            
            <p>
              AI is transforming how we predict, prepare for, and respond to natural disasters, from hurricanes and floods to wildfires and droughts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-red-200">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Wildfire Prediction</h4>
                <p className="text-gray-700">Machine learning models analyze weather patterns, vegetation moisture, and historical fire data to predict wildfire risk with high accuracy.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li>• Real-time satellite image analysis</li>
                  <li>• Weather pattern prediction</li>
                  <li>• Evacuation route optimization</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Flood Forecasting</h4>
                <p className="text-gray-700">AI models process data from river gauges, rainfall measurements, and terrain models to predict flood risks and issue early warnings.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li>• High-resolution flood mapping</li>
                  <li>• Impact assessment on infrastructure</li>
                  <li>• Emergency response planning</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Biodiversity Conservation</h3>
            
            <p>
              AI is revolutionizing conservation efforts by enabling more effective monitoring of ecosystems and endangered species.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaTree className="h-5 w-5 text-green-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">AI in Conservation: Success Stories</h3>
                  <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• <strong>Elephant tracking:</strong> AI analyzes satellite imagery to monitor elephant populations and combat poaching</li>
                    <li>• <strong>Bioacoustics:</strong> Machine learning identifies species by their sounds in audio recordings from the wild</li>
                    <li>• <strong>Habitat monitoring:</strong> Drones and AI track deforestation and habitat changes in real-time</li>
                    <li>• <strong>Illegal fishing detection:</strong> AI analyzes vessel tracking data to identify suspicious fishing activities</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Renewable Energy Optimization</h3>
            
            <p>
              AI is critical for integrating renewable energy sources into the power grid and optimizing their performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
                <div className="text-yellow-600 mb-3">
                  <FaSolarPanel className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Solar Energy Forecasting</h4>
                <p className="text-gray-700">AI models predict solar power generation based on weather forecasts, historical data, and real-time sensor readings, enabling better grid management.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
                <div className="text-blue-600 mb-3">
                  <FaWind className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Wind Farm Optimization</h4>
                <p className="text-gray-700">Machine learning optimizes the operation of wind turbines, predicting maintenance needs and adjusting blade angles in real-time for maximum efficiency.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Challenges and Ethical Considerations</h2>
            
            <p>
              While AI offers tremendous potential for addressing climate change, several challenges must be addressed:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-red-200">
                <h4 className="text-lg font-semibold text-red-800 mb-3">1. Data Quality and Availability</h4>
                <p className="text-gray-700">Many regions most vulnerable to climate change lack the infrastructure to collect high-quality environmental data, potentially leading to biased models.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
                <h4 className="text-lg font-semibold text-yellow-800 mb-3">2. Energy Consumption</h4>
                <p className="text-gray-700">Training large AI models can be energy-intensive, potentially offsetting some of their environmental benefits if not powered by renewable energy.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">3. Model Interpretability</h4>
                <p className="text-gray-700">Complex AI models can be difficult to interpret, making it challenging to understand and trust their predictions in critical climate applications.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">4. Equitable Access</h4>
                <p className="text-gray-700">There's a risk that AI tools for climate action may not be equally accessible to all communities, particularly in the Global South.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Future of AI in Climate Science</h2>
            
            <p>
              As AI technologies continue to advance, their role in addressing climate change will only grow. Here are some promising directions for the future:
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiZap className="h-5 w-5 text-blue-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Emerging Trends</h3>
                  <ul className="mt-2 text-sm text-blue-700 space-y-1">
                    <li>• <strong>Foundation models for climate science:</strong> Large-scale AI models pre-trained on vast amounts of climate data that can be fine-tuned for specific tasks</li>
                    <li>• <strong>Digital twins of the Earth:</strong> Comprehensive virtual replicas of Earth's systems for simulating and predicting climate scenarios</li>
                    <li>• <strong>AI-powered climate policy tools:</strong> Decision-support systems that help policymakers evaluate the impact of different climate policies</li>
                    <li>• <strong>Citizen science and AI:</strong> Crowdsourced data collection combined with AI analysis for more comprehensive environmental monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Additional Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://www.ipcc.ch/" className="text-blue-600 hover:text-blue-800">Intergovernmental Panel on Climate Change (IPCC)</a>
                </li>
                <li>
                  <a href="https://www.climatechange.ai/" className="text-blue-600 hover:text-blue-800">Climate Change AI: Tackling Climate Change with Machine Learning</a>
                </li>
                <li>
                  <a href="https://www.unep.org/explore-topics/climate-action/what-we-do/climate-technology-centre-ctkc/artificial-intelligence" className="text-blue-600 hover:text-blue-800">UNEP: Artificial Intelligence for Climate Action</a>
                </li>
                <li>
                  <a href="https://ai.google/research/pubs/climate-change" className="text-blue-600 hover:text-blue-800">Google AI for Climate Change</a>
                </li>
                <li>
                  <a href="https://www.microsoft.com/en-us/ai/ai-for-earth" className="text-blue-600 hover:text-blue-800">Microsoft AI for Earth</a>
                </li>
              </ul>
            </div>

            <div className="mt-12 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">How You Can Contribute</h3>
              <p className="text-green-700">
                Interested in applying AI to climate science? Here are some ways to get involved:
              </p>
              <ul className="mt-3 space-y-2 text-green-700">
                <li>• Contribute to open-source climate AI projects</li>
                <li>• Participate in climate data science competitions</li>
                <li>• Advocate for responsible AI development that considers environmental impact</li>
                <li>• Support policies that promote open climate data and AI research</li>
                <li>• Consider the carbon footprint of your AI projects and use cloud providers with renewable energy commitments</li>
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
                <p className="mt-2 text-sm text-gray-400">Harnessing AI for a sustainable future.</p>
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

export default AIClimateScience;
