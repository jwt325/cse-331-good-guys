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



// // // js/api.js

// // /**
// //  * Fetches the "users" data from the JSON Server.
// //  * @returns {Promise<any[]>} A promise that resolves to the array of users.
// //  */
// // function fetchUsers() {
// //     return fetch('http://localhost:3000/users')
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         return response.json();
// //       })
// //       .catch(error => {
// //         console.error("Error fetching users:", error);
// //         throw error;
// //       });
// //   }
  
// //   // Expose the fetchUsers function for use in main.js
// //   window.fetchUsers = fetchUsers;

// // /**
// //  * Fetch a single user (typically the logged in user)
// //  * @param {string} username
// //  * @param {string} password
// //  * @returns {Promise<any[]>} 
// //  */
// // function fetchUserByCredentials(username, password) {
// //   return fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error fetching users:", error);
// //       throw error;
// //     })
// // }
// // //Expose the function
// // window.fetchUserByCredentials = fetchUserByCredentials
  
// // /** 
// //  * Fetch a single user by user id
// //  * @param {string} user_id - the user Id to return information on
// //  * @returns {Promis<any[]>}
// //  */
// // function fetchUserById(user_id) {
// //   return fetch(`http://localhost:3000/users?id=${user_id}`)
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error fetching user by id:", error);
// //       throw error;
// //     });
// // }
// // //Expose the function
// // window.fetchUserById = fetchUserById;

// //   /**
// //  * Sends a POST request to create a new user.
// //  * @param {Object} newUser - The user object to create.
// //  * @returns {Promise<Object>} The created user.
// //  */
// // function createUser(newUser) {
// //   return fetch('http://localhost:3000/users', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify(newUser)
// //   })
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error creating user:", error);
// //       throw error;
// //     });
// // }
// // // Expose createUser function
// // window.createUser = createUser;

// // /** 
// //  * Route to create a new game
// //  * @param {Object} game - the details of the game
// //  * @param {string} game.title - the title of the posted game
// //  * @param {string} game.description - the description of the game
// //  * @param {string} game.user_id the id of the user who created the game
// //  * @param {string} game.location - the location of the game
// //  * @param {string} game.sport - the sport 
// //  * @param {string} game.skill - the recommended skill level of the game
// //  * @param {int} game.num_players - the number of players needed for the game
// //  * @returns {Promise<any[]>}
// //  */
// // function createGame(game) {
// //   return fetch('http://localhost:3000/games', {
// //     method: 'POST', 
// //     headers: {
// //       'Content-Type': 'application/json'
// //     }, 
// //     body: JSON.stringify(game)
// //   })
// //   .then(response => {
// //     if (!response.ok) {
// //       throw new Error(`HTTP error! status: ${response.status}`);
// //     } 
// //     return response.json;
// //   })
// //   .catch(error => {
// //     console.error("Error creating user:", error);
// //     throw error;
// //   });
// // }
// // //Expose create game function
// // window.createGame = createGame;

// // /** 
// //  * fetches all games 
// //  * @returns {Pormis<any[]>}
// //  */
// // function fetchGames() {
// //   return fetch('http://localhost:3000/games')
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error fetching games:", error);
// //       throw error;
// //     });
// // }
// // //Expose the function for use in main.js
// // window.fetchGames = fetchGames;

// // /** 
// //  * Fetches"games" data and filters by sport
// //  * @param {string} sport - the sport to search for
// //  * @return {Promise<Object>} the list of games found
// //  */
// // function fetchGamesBySport(sport) {
// //   return fetch(`http://localhost:3000/games?sport=${sport}`)
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error fetching games:", error);
// //     });
// // }
// // //expose the function
// // window.fetchGamesBySport = fetchGamesBySport;

// // /** 
// //  * Function to fetch games by the skill levle
// //  * @param {string} skill - the skill level to search for
// //  * @return {Promise<Object>} the list of games found
// //  */
// // function fetchGamesBySkill(skill) {
// //   return fetch(`http://localhost:3000/games?skill=${skill}`)
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error fetching games by skill:", error);
// //     });
// // }
// // //Expose the function
// // window.fetchGamesBySkill = fetchGamesBySkill;

// // /**
// //  * Fetches the "games" data and filters by sport and skill level
// //  * @param {string} sport - the sports to search for
// //  * @param {string} skill - the skill level to search for
// //  * @return {Promise<Object>} the list of games found
// //  */
// // function fetchGamesBySportAndSkill(sport, skill) {
// //   return fetch(`http://localhost:3000/games?sport=${sport}&skill=${skill}`)
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .catch(error => {
// //       console.error("Error fetching games:", error);
// //       throw error;
// //     });
// // }
// // //Expose the function
// // window.fetchGamesBySportAndSkill = fetchGamesBySportAndSkill;


// // /**
// //  * Function to enroll a player in a game
// //  * @param {Object} game_players
// //  * @param {string} game_players.game_id  - the game being signed up for
// //  * @param {string} game_players.player_id - the player signing up for the game
// //  * @param {bool} game_players.is_host - signifies if player is also host of the game
// //  * @returns {Promise<Object>} 
// //  */
// // function enrollPlayer(game_id, player_id) {
// //   return fetch(`http://localhost:3000/game_players`, {
// //       method:'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify(game_players)
// //     })
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       return response.json();
// //     }) 
// //     .catch(error => {
// //       console.error("Error enrolling player:", error);
// //       throw error;
// //     });
// // }
// // //Expose the function
// // window.enrollPlayer = enrollPlayer;

// // api.js
// // This version of api.js fetches data from a static db.json file
// // and simulates write operations by immediately resolving a promise.
// // Ensure that db.json is placed in your public folder so it is accessible
// // via /db.json at the root of your deployed application.

// /**
//  * Helper function that loads the entire database from db.json.
//  * @returns {Promise<Object>} A promise resolving to the entire data object.
//  */
// function fetchDB() {
//   return fetch('/db.json')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error while fetching db.json! status: ${response.status}`);
//       }
//       return response.json();
//     });
// }

// /**
//  * Fetches the "users" array from the database.
//  * @returns {Promise<Array>} A promise that resolves with the users array.
//  */
// function fetchUsers() {
//   return fetchDB().then(data => data.users || []);
// }
// window.fetchUsers = fetchUsers;

// /**
//  * Fetches a user by credentials by filtering the "users" array.
//  * @param {string} username - The username to search for.
//  * @param {string} password - The password to match.
//  * @returns {Promise<Array>} A promise that resolves with the matching user(s).
//  */
// function fetchUserByCredentials(username, password) {
//   return fetchDB()
//     .then(data => {
//       return (data.users || []).filter(user =>
//         user.username === username && user.password === password
//       );
//     })
//     .catch(error => {
//       console.error("Error fetching user by credentials:", error);
//       throw error;
//     });
// }
// window.fetchUserByCredentials = fetchUserByCredentials;

// /**
//  * Fetches a user by user ID.
//  * @param {string|number} user_id - The ID of the user.
//  * @returns {Promise<Array>} A promise that resolves with an array of matching users.
//  */
// function fetchUserById(user_id) {
//   return fetchDB()
//     .then(data => {
//       return (data.users || []).filter(user => user.id == user_id);
//     })
//     .catch(error => {
//       console.error("Error fetching user by ID:", error);
//       throw error;
//     });
// }
// window.fetchUserById = fetchUserById;

// /**
//  * Simulates sending a POST request to create a new user.
//  * Since we're serving a static db.json, this just simulates success.
//  * @param {Object} newUser - The new user object.
//  * @returns {Promise<Object>} A promise that resolves with the newUser.
//  */
// function createUser(newUser) {
//   console.log("Simulating user creation:", newUser);
//   return new Promise(resolve => resolve(newUser));
// }
// window.createUser = createUser;

// /**
//  * Simulates sending a POST request to create a new game.
//  * @param {Object} game - The game object containing details (title, description, etc.).
//  * @returns {Promise<Object>} A promise that resolves with the game object.
//  */
// function createGame(game) {
//   console.log("Simulating game creation:", game);
//   return new Promise(resolve => resolve(game));
// }
// window.createGame = createGame;

// /**
//  * Fetches the "games" array from the database.
//  * @returns {Promise<Array>} A promise that resolves with the games array.
//  */
// function fetchGames() {
//   return fetchDB().then(data => data.games || []);
// }
// window.fetchGames = fetchGames;

// /**
//  * Fetches games filtered by sport.
//  * @param {string} sport - The sport to filter by.
//  * @returns {Promise<Array>} A promise that resolves with the filtered games.
//  */
// function fetchGamesBySport(sport) {
//   return fetchDB()
//     .then(data => {
//       return (data.games || []).filter(game => game.sport === sport);
//     })
//     .catch(error => {
//       console.error("Error fetching games by sport:", error);
//       throw error;
//     });
// }
// window.fetchGamesBySport = fetchGamesBySport;

// /**
//  * Fetches games filtered by skill level.
//  * @param {string} skill - The skill level to filter by.
//  * @returns {Promise<Array>} A promise that resolves with the filtered games.
//  */
// function fetchGamesBySkill(skill) {
//   return fetchDB()
//     .then(data => {
//       return (data.games || []).filter(game => game.skill === skill);
//     })
//     .catch(error => {
//       console.error("Error fetching games by skill:", error);
//       throw error;
//     });
// }
// window.fetchGamesBySkill = fetchGamesBySkill;

// /**
//  * Fetches games filtered by both sport and skill.
//  * @param {string} sport - The sport to filter by.
//  * @param {string} skill - The skill level to filter by.
//  * @returns {Promise<Array>} A promise that resolves with the filtered games.
//  */
// function fetchGamesBySportAndSkill(sport, skill) {
//   return fetchDB()
//     .then(data => {
//       return (data.games || []).filter(game => game.sport === sport && game.skill === skill);
//     })
//     .catch(error => {
//       console.error("Error fetching games by sport and skill:", error);
//       throw error;
//     });
// }
// window.fetchGamesBySportAndSkill = fetchGamesBySportAndSkill;

// /**
//  * Simulates enrolling a player in a game.
//  * @param {string|number} game_id - The ID of the game.
//  * @param {string|number} player_id - The ID of the player.
//  * @returns {Promise<Object>} A promise that resolves with the enrollment details.
//  */
// function enrollPlayer(game_id, player_id) {
//   console.log("Simulating enrolling player:", { game_id, player_id });
//   return new Promise(resolve => resolve({ game_id, player_id, success: true }));
// }
// window.enrollPlayer = enrollPlayer;

