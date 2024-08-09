import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function App() {
  const [model, setModel] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [userBehavior, setUserBehavior] = useState({ clicks: 0, scrolls: 0 });

  useEffect(() => {
    // Load the ML model
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (model) {
      // Prepare input for the model
      const input = tf.tensor2d([[screenSize, userBehavior.clicks, userBehavior.scrolls]]);
      model.predict(input).array().then(prediction => {
        // Apply dynamic styles based on prediction
        document.body.style.backgroundColor = prediction[0][0] > 0.5 ? 'lightblue' : 'lightcoral';
      });
    }
  }, [screenSize, userBehavior, model]);

  const handleUserAction = () => {
    setUserBehavior(prev => ({ ...prev, clicks: prev.clicks + 1 }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Responsive ML Web App</h1>
        <button onClick={handleUserAction}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
