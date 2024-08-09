import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customization, setCustomization] = useState({ color: '#ffffff', font: 'Arial' });

  useEffect(() => {
    axios.get('/api/templates')
      .then(response => setTemplates(response.data))
      .catch(error => console.error('Error fetching templates', error));
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCustomizationChange = (e) => {
    setCustomization({ ...customization, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Template Generator</h1>
      <div className="template-selector">
        <h2>Select Template</h2>
        {templates.map(template => (
          <button key={template.id} onClick={() => handleTemplateSelect(template)}>
            {template.name}
          </button>
        ))}
      </div>
      {selectedTemplate && (
        <div className="customization">
          <h2>Customize Template</h2>
          <label>
            Color:
            <input type="color" name="color" value={customization.color} onChange={handleCustomizationChange} />
          </label>
          <label>
            Font:
            <select name="font" value={customization.font} onChange={handleCustomizationChange}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
            </select>
          </label>
          <div className="preview" style={{ backgroundColor: customization.color, fontFamily: customization.font }}>
            <h1>{selectedTemplate.title}</h1>
            <p>{selectedTemplate.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
