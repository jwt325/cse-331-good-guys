// js/api.js

/**
 * Fetches the "users" data from the JSON Server.
 * @returns {Promise<any[]>} A promise that resolves to the array of users.
 */
function fetchUsers() {
    return fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        throw error;
      });
  }
  
  // Expose the fetchUsers function for use in main.js
  window.fetchUsers = fetchUsers;
  