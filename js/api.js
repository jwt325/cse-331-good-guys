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
function fetchUserByCredentials(username, password) {
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
//Expose the function
window.fetchUserByCredentials = fetchUserByCredentials
  
/** 
 * Fetch a single user by user id
 * @param {string} user_id - the user Id to return information on
 * @returns {Promis<any[]>}
 */
function fetchUserById(user_id) {
  return fetch(`http://localhost:3000/users?id=${user_id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching user by id:", error);
      throw error;
    });
}
//Expose the function
window.fetchUserById = fetchUserById;

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
 * @param {string} game.location - the location of the game
 * @param {string} game.sport - the sport 
 * @param {string} game.skill - the recommended skill level of the game
 * @param {int} game.num_players - the number of players needed for the game
 * @returns {Promise<any[]>}
 */
function createGame(game) {
  return fetch('http://localhost:3000/games', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(game)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } 
    return response.json;
  })
  .catch(error => {
    console.error("Error creating user:", error);
    throw error;
  });
}
//Expose create game function
window.createGame = createGame;

/** 
 * fetches all games 
 * @returns {Pormis<any[]>}
 */
function fetchGames() {
  return fetch('http://localhost:3000/games')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching games:", error);
      throw error;
    });
}
//Expose the function for use in main.js
window.fetchGames = fetchGames;

/** 
 * Fetches"games" data and filters by sport
 * @param {string} sport - the sport to search for
 * @return {Promise<Object>} the list of games found
 */
function fetchGamesBySport(sport) {
  return fetch(`http://localhost:3000/games?sport=${sport}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching games:", error);
    });
}
//expose the function
window.fetchGamesBySport = fetchGamesBySport;

/** 
 * Function to fetch games by the skill levle
 * @param {string} skill - the skill level to search for
 * @return {Promise<Object>} the list of games found
 */
function fetchGamesBySkill(skill) {
  return fetch(`http://localhost:3000/games?skill=${skill}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching games by skill:", error);
    });
}
//Expose the function
window.fetchGamesBySkill = fetchGamesBySkill;

/**
 * Fetches the "games" data and filters by sport and skill level
 * @param {string} sport - the sports to search for
 * @param {string} skill - the skill level to search for
 * @return {Promise<Object>} the list of games found
 */
function fetchGamesBySportAndSkill(sport, skill) {
  return fetch(`http://localhost:3000/games?sport=${sport}&skill=${skill}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error fetching games:", error);
      throw error;
    });
}
//Expose the function
window.fetchGamesBySportAndSkill = fetchGamesBySportAndSkill;


/**
 * Function to enroll a player in a game
 * @param {Object} game_players
 * @param {string} game_players.game_id  - the game being signed up for
 * @param {string} game_players.player_id - the player signing up for the game
 * @param {bool} game_players.is_host - signifies if player is also host of the game
 * @returns {Promise<Object>} 
 */
function enrollPlayer(game_id, player_id) {
  return fetch(`http://localhost:3000/game_players`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game_players)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }) 
    .catch(error => {
      console.error("Error enrolling player:", error);
      throw error;
    });
}
//Expose the function
window.enrollPlayer = enrollPlayer;


