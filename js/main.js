// Fixed js/main.js

let isSignUpMode = false;
const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

const authDiv = document.getElementById('authControls');
const gameForm = document.getElementById('toggleGameFormBtn');

if (currentUser) {
  authDiv.innerHTML = `
    <span style="cursor: pointer; text-decoration: underline;" onclick="goToUserPage()">
      Account: ${currentUser.username}
    </span>
    <button onclick="logout()">Logout</button>
  `;
  gameForm.style.display = 'block';
} else {
  authDiv.innerHTML = `
    <button onclick="openModal(false)">Login</button>
    <button onclick="openModal(true)">Sign Up</button>
  `;
}

function goToUserPage() {
  window.location.href = 'user.html';
}


function logout() {
  localStorage.removeItem('loggedInUser');
  location.reload();
}

function openModal(signup) {
  isSignUpMode = signup;
  document.getElementById('authModal').style.display = 'flex';
  document.getElementById('modalTitle').textContent = signup ? 'Sign Up' : 'Login';
}

function closeModal() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function submitAuth() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Username and password are required.');
    return;
  }

  if (isSignUpMode) {
    window.fetchUsers().then(users => {
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        alert('Username already exists. Please choose another.');
        return;
      }
      createUser({ username, password, sports: {}, games_attended : 0,
      games_enrolled: 0, motivation: "", location: "", metrics: {} }).then(newUser => {
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        closeModal();
        location.reload();
      });
    });
  } else {
    // console.log("here")
    window.fetchUserByCredentials(username, password)
      .then(users => {
        if (users && users.length > 0) {
          const found = users[0];
          localStorage.setItem('loggedInUser', JSON.stringify(found));
          closeModal();
          location.reload();
        } else {
          alert('Invalid credentials.');
        }
      })
      .catch(err => {
        alert('Login failed. Please try again later.');
        console.error(err);
      });
  }
}

window.submitAuth = submitAuth;

function loadGames() {
  window.fetchGames()
    .then(games => {
      const list = document.getElementById('gameList');
      list.innerHTML = '';

      games.forEach((game, index) => {
        const entry = document.createElement('div');
        entry.classList.add(`game-entry-${game.id}`);

        const titleEl = document.createElement('div');
        titleEl.id = `game-title`;
        titleEl.textContent = game.title;

        const descriptionEl = document.createElement('div');
        descriptionEl.id = `game-description`;
        descriptionEl.textContent = game.description;

        const locationEl = document.createElement('div');
        locationEl.id = `game-location`;
        locationEl.textContent = game.location;

        const dateTimeEl = document.createElement('div');
        dateTimeEl.id = `game-dateTime`;
        dateTimeEl.textContent = new Date(game.dateTime).toLocaleString();

        const numPlayersEl = document.createElement('div');
        numPlayersEl.id = `game-numPlayers`;
        numPlayersEl.textContent = `Total Players Needed: ${game.numPlayers}`;

        entry.appendChild(titleEl);
        entry.appendChild(descriptionEl);
        entry.appendChild(locationEl);
        entry.appendChild(dateTimeEl);
        entry.appendChild(numPlayersEl);

        list.appendChild(entry);
      });
    });
}


loadGames();

document.getElementById('submitGameBtn')?.addEventListener('click', () => {
  const title = document.getElementById('gameTitle').value.trim();
  const description = document.getElementById('gameDescription').value.trim();
  const location = document.getElementById('gameLocation').value.trim();
  const sport = document.getElementById('gameSport').value.trim();
  const skill = document.getElementById('gameSkill').value.trim();
  const numPlayers = document.getElementById('numPlayers').value.trim();
  const dateTime = document.getElementById('gameDateTime').value.trim();  

  if (!title) return alert('Cannot game empty content.');
  fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, user_id: currentUser.id, location, dateTime, sport, skill, players: [currentUser.id], numPlayers})
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById('gameTitle').value = '';
    document.getElementById('gameDescription').value = '';
    document.getElementById('gameLocation').value = '';
    document.getElementById('gameSport').value = '';
    document.getElementById('gameSkill').value = '';
    document.getElementById('numPlayers').value = '';
    document.getElementById('gameDateTime').value = '';
    loadGames();
  });
});