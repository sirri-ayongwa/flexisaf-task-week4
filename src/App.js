import React, { useState, useEffect } from 'react';
import './App.css';

// Currency Converter App with RESTful API case studies
function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(''); 
  const [conversionRecord, setConversionRecord] = useState(null); 
  const [showRecord, setShowRecord] = useState(false); 

  const API_KEY = 'cb59a7ff656469b68f469acd';

  // Fetching currencies for dropdown (GET request)
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`, {
          mode: 'cors',
        });

        const data = await response.json();

        // Use conversion_rates instead of rates
        if (data && data.conversion_rates && typeof data.conversion_rates === 'object') {
          setCurrencies([...Object.keys(data.conversion_rates)]);
        } else {
          console.error('Invalid data structure: ', data);
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setError('Error fetching data from API: ' + error.message);
        console.error('Error:', error);
      }
    };

    fetchCurrencies();
  }, [API_KEY]);

  // Function to handle conversion (GET request)
  const convertCurrency = () => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`, {
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch conversion rate');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.conversion_rates && data.conversion_rates[toCurrency]) {
          const rate = data.conversion_rates[toCurrency];
          const result = (amount * rate).toFixed(2);
          setConvertedAmount(result);
          setConversionRecord({ fromCurrency, toCurrency, amount, convertedAmount: result });
        } else {
          throw new Error('Invalid conversion data');
        }
      })
      .catch(error => {
        setError('Error converting currency: ' + error.message);
        console.error(error);
      });
  };

  // POST Request example (create a new currency conversion record)
  const postConversion = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
      }),
    })
      .then(response => {
        if (response.ok) {
          setActionMessage('Conversion saved successfully!');
        } else {
          throw new Error('Failed to save conversion');
        }
        return response.json();
      })
      .catch(error => {
        setActionMessage('Failed to save conversion: ' + error.message);
        console.error(error);
      });
  };

  // PUT Request example (update a conversion record)
  const updateConversion = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 150,
        convertedAmount: 127.5,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        if (response.ok) {
          setActionMessage('Conversion updated successfully!');
          setConversionRecord({ fromCurrency: 'USD', toCurrency: 'EUR', amount: 150, convertedAmount: 127.5 });
        } else {
          throw new Error('Failed to update conversion');
        }
        return response.json();
      })
      .catch(error => {
        setActionMessage('Failed to update conversion: ' + error.message);
        console.error(error);
      });
  };

  // DELETE Request example (delete a conversion record)
  const deleteConversion = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setActionMessage('Conversion deleted successfully!');
          setConversionRecord(null); // Clear record after delete
        } else {
          throw new Error('Failed to delete conversion');
        }
      })
      .catch(error => {
        setActionMessage('Failed to delete conversion: ' + error.message);
        console.error(error);
      });
  };

  // Function to toggle record dialog
  const toggleRecordDialog = () => {
    setShowRecord(!showRecord);
  };

  return (
    <div className="app">
      <header>
        <h1>Currency Converter</h1>
      </header>
      <main>
        <div className="converter">
          {error && <div className="error">{error}</div>}
          
          <div className="input-group">
            <label>From:</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>To:</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Amount:</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </div>

          <button className="btn" onClick={convertCurrency}>Convert</button>
          {convertedAmount && (
            <div className="result">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </div>
          )}

          {/* Display action messages */}
          {actionMessage && <div className="action-message">{actionMessage}</div>}

          {/* Buttons for POST, PUT, DELETE requests */}
          <div className="api-actions">
            <button className="btn" onClick={postConversion}>Save Conversion (POST)</button>
            <button className="btn" onClick={updateConversion}>Update Conversion (PUT)</button>
            <button className="btn" onClick={deleteConversion}>Delete Conversion (DELETE)</button>
          </div>

          {/* View Record Button */}
          <button className="btn" onClick={toggleRecordDialog}>View Record</button>

          {/* Dialog box for displaying conversion record */}
          {showRecord && (
            <div className="record-dialog">
              <h2>Conversion Record</h2>
              {conversionRecord ? (
                <div>
                  <p>From: {conversionRecord.fromCurrency}</p>
                  <p>To: {conversionRecord.toCurrency}</p>
                  <p>Amount: {conversionRecord.amount}</p>
                  <p>Converted Amount: {conversionRecord.convertedAmount}</p>
                </div>
              ) : (
                <p>No record found. The record might have been deleted.</p>
              )}
              <button className="btn" onClick={toggleRecordDialog}>Close</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;