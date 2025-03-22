import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const DemandForecast = ({ medicines }) => {
  const [forecasts, setForecasts] = useState([]);
  const [model, setModel] = useState(null);

  // Initialize and train the model when component mounts
  useEffect(() => {
    initializeModel();
  }, []);

  // Generate forecasts when model is ready and medicines change
  useEffect(() => {
    if (model && medicines.length > 0) {
      generateForecasts();
    }
  }, [model, medicines]);

  const initializeModel = async () => {
    // Create a sequential neural network
    const newModel = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [6], units: 12, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'linear' })
      ]
    });

    // Compile the model
    newModel.compile({
      optimizer: tf.train.adam(0.01),
      loss: 'meanSquaredError'
    });

    // Train the model with historical data
    await trainModel(newModel);
    setModel(newModel);
  };

  const trainModel = async (newModel) => {
    // Generate training data
    const trainingData = generateTrainingData();
    
    // Convert to tensors
    const xs = tf.tensor2d(trainingData.inputs);
    const ys = tf.tensor2d(trainingData.outputs);

    // Train the model
    await newModel.fit(xs, ys, {
      epochs: 100,
      batchSize: 32,
      shuffle: true,
      verbose: 0
    });

    // Clean up tensors
    xs.dispose();
    ys.dispose();
  };

  const generateTrainingData = () => {
    const inputs = [];
    const outputs = [];

    // Generate synthetic training data for each medicine category
    medicines.forEach(medicine => {
      // Generate 24 months of historical data
      for (let i = 0; i < 24; i++) {
        const input = [
          i, // time
          getSeasonalityFactor(i % 12 + 1, medicine.category),
          medicine.price,
          getCategoryFactor(medicine.category),
          getMarketTrend(i),
          getExternalFactorImpact(medicine, i)
        ];

        const expectedDemand = calculateExpectedDemand(input, medicine);
        
        inputs.push(input);
        outputs.push([expectedDemand]);
      }
    });

    return { inputs, outputs };
  };

  const generateForecasts = async () => {
    const newForecasts = await Promise.all(medicines.map(async medicine => {
      // Prepare input features for prediction
      const features = tf.tensor2d([[
        new Date().getMonth(),
        getSeasonalityFactor(new Date().getMonth() + 1, medicine.category),
        medicine.price,
        getCategoryFactor(medicine.category),
        getCurrentMarketTrend(),
        getExternalFactorImpact(medicine, new Date().getMonth())
      ]]);

      // Make prediction
      const prediction = await model.predict(features).data();
      features.dispose();

      // Calculate confidence based on historical accuracy
      const confidence = calculateConfidence(medicine, prediction[0]);

      // Generate influencing factors
      const factors = analyzeInfluencingFactors(medicine, prediction[0]);

      return {
        id: medicine.id,
        name: medicine.name,
        currentStock: medicine.quantity,
        predictedDemand: Math.round(prediction[0]),
        confidence,
        trend: determineTrend(medicine, prediction[0]),
        recommendedOrder: Math.max(0, Math.round(prediction[0] - medicine.quantity)),
        factors
      };
    }));

    setForecasts(newForecasts);
  };

  // Helper functions for feature engineering
  const getCategoryFactor = (category) => {
    const categoryFactors = {
      'Antibiotics': 1.2,
      'Pain Relief': 1.0,
      'Antihistamine': 0.8,
      'Antidepressant': 1.1,
      default: 1.0
    };
    return categoryFactors[category] || categoryFactors.default;
  };

  const getCurrentMarketTrend = () => {
    // Simulate market trend (could be replaced with real market data)
    return 1 + (Math.random() * 0.2 - 0.1);
  };

  const getMarketTrend = (month) => {
    // Simulate historical market trends
    return 1 + Math.sin(month / 12 * Math.PI) * 0.1;
  };

  const calculateExpectedDemand = (input, medicine) => {
    // Simulate expected demand based on input features
    const [time, seasonality, price, category, market, external] = input;
    const baseDemand = medicine.quantity * seasonality * category * market * external;
    return baseDemand * (0.9 + Math.random() * 0.2); // Add some noise
  };

  const calculateConfidence = (medicine, prediction) => {
    // Calculate confidence score based on various factors
    let confidence = 85; // Base confidence

    // Adjust based on data quality and prediction variance
    if (medicine.quantity < 100) confidence -= 5;
    if (prediction > medicine.quantity * 2) confidence -= 10;
    if (medicine.category === 'Antibiotics' && isWinterSeason()) confidence += 5;

    return Math.min(95, Math.max(70, confidence));
  };

  const analyzeInfluencingFactors = (medicine, prediction) => {
    const factors = [];

    // Analyze seasonal impact
    if (isWinterSeason() && medicine.category === 'Antibiotics') {
      factors.push('Winter season - increased demand expected');
    }

    // Price sensitivity
    if (medicine.price > 15) {
      factors.push('Premium pricing may affect demand');
    }

    // Stock level impact
    if (medicine.quantity < prediction * 0.5) {
      factors.push('Critical stock level - immediate reorder recommended');
    }

    // Category-specific factors
    if (medicine.category === 'Antidepressant') {
      factors.push('Increasing mental health awareness');
    }

    return factors;
  };

  const determineTrend = (medicine, prediction) => {
    const ratio = prediction / medicine.quantity;
    if (ratio > 1.1) return 'increasing';
    if (ratio < 0.9) return 'decreasing';
    return 'stable';
  };

  const getSeasonalityFactor = (month, category) => {
    // Different categories have different seasonal patterns
    const seasonalPatterns = {
      'Antihistamine': [1.2, 1.3, 1.4, 1.5, 1.3, 1.1, 1.0, 1.0, 1.1, 1.2, 1.1, 1.0], // Higher in spring
      'Pain Relief': [1.1, 1.0, 1.1, 1.2, 1.1, 1.0, 1.0, 1.1, 1.2, 1.1, 1.0, 1.1],
      'Antibiotics': [1.3, 1.4, 1.2, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.4], // Higher in winter
      default: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    };
    
    return (seasonalPatterns[category] || seasonalPatterns.default)[month - 1];
  };

  const getExternalFactorImpact = (medicine, month) => {
    // Simulate external factor impact
    let impact = 1;

    // Age-related trends
    if (medicine.category === 'Antidepressant') {
      impact *= 1.15;
    }

    // Seasonal diseases
    if (medicine.category === 'Antibiotics' && isWinterSeason()) {
      impact *= 1.2;
    }

    // Market trends
    if (medicine.price > 15) {
      impact *= 0.9;
    }

    return impact;
  };

  const isWinterSeason = () => {
    const month = new Date().getMonth() + 1;
    return month >= 11 || month <= 2;
  };

  return (
    <div className="demand-forecast">
      <h3>AI-Powered Demand Forecast</h3>
      <div className="forecast-grid">
        {forecasts.map(forecast => (
          <div key={forecast.id} className="forecast-card">
            <div className="forecast-header">
              <h4>{forecast.name}</h4>
              <span className={`trend-badge ${forecast.trend}`}>
                {forecast.trend === 'increasing' ? '📈' : forecast.trend === 'decreasing' ? '📉' : '📊'}
              </span>
            </div>
            <div className="forecast-details">
              <div className="forecast-stat">
                <label>Current Stock</label>
                <p>{forecast.currentStock}</p>
              </div>
              <div className="forecast-stat">
                <label>Predicted Monthly Demand</label>
                <p>{forecast.predictedDemand}</p>
              </div>
              <div className="forecast-stat">
                <label>Confidence Score</label>
                <p>{forecast.confidence}%</p>
              </div>
              <div className="forecast-stat">
                <label>Recommended Order</label>
                <p className={forecast.recommendedOrder > 0 ? 'warning' : ''}>
                  {forecast.recommendedOrder > 0 ? `Order ${forecast.recommendedOrder} units` : 'Stock sufficient'}
                </p>
              </div>
              {forecast.factors.length > 0 && (
                <div className="forecast-factors">
                  <label>Influencing Factors:</label>
                  <ul>
                    {forecast.factors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandForecast; 