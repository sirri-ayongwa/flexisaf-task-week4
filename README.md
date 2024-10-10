Currency Converter Application built with React

*Overview*
This Currency Converter app is built using React and demonstrates the implementation of RESTful API requests (GET, POST, PUT, DELETE). The app allows users to convert currencies based on the latest exchange rates retrieved from a third-party API. Additionally, it showcases how to create, update, and delete currency conversion records.

*Features*
1. *Currency Conversion*: Users can select the currency they want to convert from and to, input the amount, and receive a converted value.
2. *Record Management*: The app allows users to save, update, and delete conversion records to demonstrate various API operations.
3. *Error Handling*: The app gracefully handles errors, displaying user-friendly messages when something goes wrong.

*Key Learning Outcomes: RESTful API Integration*
1. GET Request: Fetching Currency Data
- The app utilizes the `GET` method to fetch the latest currency exchange rates from a third-party API.
- *Use Case*: Populate the dropdowns with available currencies and retrieve the conversion rate when a user selects the currencies.
- *Code Implementation*:
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`, {
          mode: 'cors',
        });
        const data = await response.json();
        if (data && data.conversion_rates) {
          setCurrencies([...Object.keys(data.conversion_rates)]);
        }
      } catch (error) {
        setError('Error fetching data from API: ' + error.message);
      }
    };
    fetchCurrencies();
  }, []);
- *Explanation*: This function fetches the currency conversion rates using a `GET` request when the app is loaded. The response data is used to populate the available currencies in the dropdowns.

2. POST Request: Saving Conversion Records
- The app uses a `POST` request to send the conversion data to an external API (simulated using `jsonplaceholder`).
- *Use Case*: After converting the currency, the user can save the conversion record.
- *Code Implementation*:
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
      }
    })
    .catch(error => setActionMessage('Failed to save conversion: ' + error.message));
  };
- *Explanation*: This `POST` request sends the converted currency data to the API. It demonstrates the creation of new records and the use of headers to specify the content type.

3. PUT Request: Updating Conversion Records
- The app uses a `PUT` request to update an existing conversion record.
- *Use Case*: The user can modify an existing conversion record (e.g., changing the amount).
- *Code Implementation*:
  const updateConversion = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        id: 1,
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 150,
        convertedAmount: 127.5,
      }),
    })
    .then(response => {
      if (response.ok) {
        setActionMessage('Conversion updated successfully!');
      }
    })
    .catch(error => setActionMessage('Failed to update conversion: ' + error.message));
  };
- *Explanation*: The `PUT` request is used to update an existing record by sending the updated data to the API. The request includes the `id` of the record being modified.

4. DELETE Request: Removing Conversion Records
- The app uses a `DELETE` request to remove a conversion record from the database.
- *Use Case*: The user can delete a previously saved conversion record.
- *Code Implementation*:
  const deleteConversion = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setActionMessage('Conversion deleted successfully!');
        setConversionRecord(null);
      }
    })
    .catch(error => setActionMessage('Failed to delete conversion: ' + error.message));
  };
- *Explanation*: The `DELETE` request removes a record from the server. After successfully deleting the record, the app clears the displayed conversion data.


*App Components*
1. *Dropdowns and Input Fields*: 
   - Two dropdowns (`fromCurrency` and `toCurrency`) allow users to select the currencies for conversion. 
   - An input field captures the amount to be converted.
  
2. *Action Buttons*: 
   - A "Convert" button triggers the currency conversion using the `GET` request.
   - "Save", "Update", and "Delete" buttons perform the `POST`, `PUT`, and `DELETE` operations respectively.

3. *Conversion Record Dialog*:
   - A toggleable dialog displays the saved conversion record, allowing users to view their previous conversions.
  

*Error Handling and User Feedback*
- The app uses `setError` to handle and display API-related errors. For example, if a request fails, the user is notified via a message displayed on the UI.
- Feedback messages such as "Conversion saved successfully!" or "Failed to delete conversion" keep users informed of the result of their actions.


*Conclusion*
Through this project, I have learned how to:
- Make RESTful API calls (GET, POST, PUT, DELETE) to interact with external APIs.
- Manage state in React to handle and display data dynamically.
- Implement basic error handling to improve the user experience.
- Use API calls effectively to perform CRUD (Create, Read, Update, Delete) operations.
