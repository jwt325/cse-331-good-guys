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
  

  /**
 * Sends a POST request to create a new user.
 * @param {Object} newUser - The user object to create.
 * @returns {Promise<Object>} The created user.
 */
function createUser(newUser) {
  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error creating user:", error);
      throw error;
    });
}

// Expose createUser function
window.createUser = createUser;

