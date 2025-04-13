// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Call the fetchUsers function defined in api.js
    fetchUsers()
      .then(users => {
        console.log("Fetched:", users);
        // Display the fetched data in the output div
        const outputDiv = document.getElementById("output");
        outputDiv.textContent = JSON.stringify(users, null, 2);
      })
      .catch(error => {
        console.error("Error in main.js:", error);
        document.getElementById("output").textContent = "Failed to load data from backend.";
      });

      
  });
  