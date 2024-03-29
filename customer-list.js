// customer-list.js

// Function to update the customer table
function updateCustomerTable(customers) {
  const tableBody = document.querySelector('#customer-table tbody');
  tableBody.innerHTML = ''; // Clearing existing rows

  customers.forEach(customer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.firstName} ${customer.lastName}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.address}</td>
      <td> ${customer.city}</td> 
      <td>${customer.state}</td>
      <td>
      <button class="delete-btn" onclick="deleteCustomer(${customer.id})">Delete</button>
    </td>
      <!-- Add more columns as needed -->
    `;
    tableBody.appendChild(row);
  });
}
function openAddCustomerPage() {
  window.location.href = 'add-customer.html';
}

function deleteCustomer(customerId) {
  // Sending a DELETE request to your API endpoint
  fetch(`https://assignment-production-92db.up.railway.app/api/customers/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Delete failed: ${response.status}`);
    }
  })
  .then(deleteData => {
    console.log('Delete successful:', deleteData);
    // Reloading the customer table after deletion
    location.reload();
  })
  .catch(deleteError => {
    console.error('Delete failed:', deleteError.message);
    // Handling delete error
  });
}



// Function to sync customer data with the server
function syncCustomers() {
  const token = localStorage.getItem('token');

  // Sync data to the server
  fetch('https://assignment-production-92db.up.railway.app/api/customers/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       // Including token if available
    },
    body: (token)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status}`);
    }
    return response.json();
  })
  .then(syncData => {
    console.log('Sync successful:', syncData);




    // Fetch customer data from the DB after syncing
    fetch('https://assignment-production-92db.up.railway.app/api/customers', {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }
      return response.json();
    })
    .then(customerData => {
      console.log('Customer data fetched successfully:', customerData);
      updateCustomerTable(customerData); // Call function to update the table
    })
    .catch(fetchError => {
      console.error('Fetch failed:', fetchError.message);
      // Handle fetch error
    });
  })
  
  .catch(syncError => {
    console.error('Sync failed:', ( token ));
    // Handle sync error
  });
   // Redirect to the customer list page
 window.location.href = 'customer-list.html';
}

// Call updateCustomerTable when the page loads
document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display initial customer data
  fetch('https://assignment-production-92db.up.railway.app/api/customers', {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    return response.json();
  })
  .then(customerData => {
    console.log('Initial customer data fetched successfully:', customerData);
    updateCustomerTable(customerData); // Call function to update the table
  })
  .catch(fetchError => {
    console.error('Initial fetch failed:', fetchError.message);
    // Handle initial fetch error
  });
});

// Calling syncCustomers when a button is clicked
const syncButton = document.getElementById('syncButton');
syncButton.addEventListener('click', syncCustomers);
