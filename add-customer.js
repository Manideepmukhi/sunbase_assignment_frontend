// add-customer.js

function addCustomer() {
    const form = document.getElementById('addCustomerForm');
    const formData = new FormData(form);
  
    fetch('http://localhost:8081/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Add customer failed: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Customer added successfully:', data);
      // Handle successful customer addition, e.g., redirect to customer list page
      window.location.href = 'customer-list.html';
    })
    .catch(error => {
      console.error('Add customer failed:', error.message);
      // Handle customer addition error
    });
  }
  