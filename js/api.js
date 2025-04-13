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
 * Fetch a single user (typically the logged in user)
 * @param {string} username
 * @param {string} password
 * @returns {Promise<any[]>} 
 */
function fetchUser(username, password) {
  return fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching users:", error);
      throw error;
    })
}
  

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

/** 
 * Route to create a new game
 * @param {Object} game - the details of the game
 * @param {string} game.title - the title of the posted game
 * @param {string} game.description - the description of the game
 * @param {string} game.user_id the id of the user who created the game
 */

/**
 * Fetches the "games" data and filters by sport and skill level
 * @param {Array[string]} sports - the sports to search for
 * @param {string} skill - the skill level to search for
 * @return {Promise<Object>} the list of games found
 */
