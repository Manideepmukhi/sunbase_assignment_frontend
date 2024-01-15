// index.js

$(document).ready(function () {
    $('#loginForm').submit(function (e) {
      e.preventDefault();
  
      const login_id = $('#login_id').val();
      const password = $('#password').val();
  
      // Make an API request to authenticate user and get token
      $.ajax({
        type: 'POST',
        url: 'https://assignment-production-92db.up.railway.app/api/auth/login',
        contentType: 'application/json',
        data: JSON.stringify({ login_id, password }),
        success: function (data) {
          // Save the token to localStorage
          localStorage.setItem('token', data);
  
          // Redirect to the customer list page
          window.location.href = 'customer-list.html';
        },
        error: function (error) {
          console.error('Login failed:', error.responseText);
          showAlert('Login Failed', 'Please check your credentials and try again.');
        }
       
      });
      function showAlert(title, message) {
        // Create a pop-up alert with the provided title and message
        alert(`${title}\n\n${message}`);
      }
    });
  });
  