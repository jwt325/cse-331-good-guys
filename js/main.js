// Fixed js/main.js

let isSignUpMode = false;
const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

const authDiv = document.getElementById('authControls');
const gameForm = document.getElementById('toggleGameFormBtn');

if (currentUser) {
  authDiv.innerHTML = `
    <div class="user-info">
      <span class="user-link" onclick="goToUserPage()">
        👤 ${currentUser.username}
      </span>
      <button class="logout-btn" onclick="logout()">Logout</button>
    </div>
  `;
  gameForm.style.display = 'block';
} else {
  authDiv.innerHTML = `
    <button class="user-link" onclick="openModal(false)">Login</button>
    <button class="user-link" onclick="openModal(true)">Sign Up</button>
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
  document.getElementById('email').style.display = signup ? 'block' : 'none';
}

function closeModal() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function submitAuth() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const email = document.getElementById('email').value.trim();

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
      createUser({ username, password, email, sports: {}, games_attended : 0,
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

function openConfirmModal(message, onConfirm) {
  const confirmModal = document.getElementById('confirmModal');
  const confirmMessage = document.getElementById('confirmMessage');
  const confirmYesBtn = document.getElementById('confirmYesBtn');
  const confirmNoBtn = document.getElementById('confirmNoBtn');

  confirmMessage.textContent = message;
  confirmModal.style.display = 'flex';

  const yesHandler = () => {
    onConfirm();
    closeConfirmModal();
  };

  const noHandler = () => {
    closeConfirmModal();
  };

  confirmYesBtn.onclick = yesHandler;
  confirmNoBtn.onclick = noHandler;
}

function closeConfirmModal() {
  const confirmModal = document.getElementById('confirmModal');
  confirmModal.style.display = 'none';
}


function loadGames() {
  window.fetchGames()
    .then(games => {
      const list = document.getElementById('gameList');
      list.innerHTML = '';

      games.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

      games.forEach((game) => {
        const entry = document.createElement('div');
        entry.className = 'game-card';
      
        const alreadyJoined = game.players?.includes(currentUser?.id);
        const isCreator = game.user_id === currentUser?.id;
      
        entry.innerHTML = `
          <div class="game-header">
            <h3>${game.sport?.toUpperCase() || 'SPORT'} EVENT @ ${game.location || 'Location'}</h3>
            <p class="game-time">
              ${game.sport || 'No sport provided.'} · 
              ${game.skill || 'All Skill Levels Welcome'}
            </p>
            <p class="game-time">
              ${new Date(game.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} · 
              ${new Date(game.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EST
            </p>
          </div>
          <p class="game-desc">${game.description || 'No description provided.'}</p>
          <p class="game-joined">${game.players?.length || 0}/${game.numPlayers} people joined</p>
      
          <div class="game-buttons">
            ${!isCreator ? `
              <button class="join-btn ${alreadyJoined ? 'joined' : ''}" data-game-id="${game.id}">
                ${alreadyJoined ? 'GAME JOINED' : 'CLICK TO JOIN'}
              </button>
              <button class="contact-btn"><a href="mailto:${game.email}">Contact</a></button>
            ` : `
              <button class="delete-btn" data-game-id="${game.id}">DELETE EVENT</button>
            `}
          </div>
        `;
      
        list.appendChild(entry);

        if (!isCreator) {
          const joinBtn = entry.querySelector('.join-btn');
          joinBtn.addEventListener('click', () => {
            if (!currentUser) {
              openModal(false);
              return;
            }

            openConfirmModal(
              alreadyJoined ? "Are you sure you want to leave this event?" : "Are you sure you want to join this event?",
              () => {
                const newPlayers = alreadyJoined
                  ? game.players.filter(id => id !== currentUser.id)
                  : [...(game.players || []), currentUser.id];

                fetch(`http://localhost:3000/games/${game.id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ players: newPlayers })
                })
                  .then(response => {
                    if (!response.ok) throw new Error("Failed to update game");
                    return response.json();
                  })
                  .then(() => loadGames())
                  .catch(err => {
                    console.error("Error updating game:", err);
                    alert("An error occurred while updating your game status.");
                  });
              }
            );
          });
        } else {
          const deleteBtn = entry.querySelector('.delete-btn');
          deleteBtn.addEventListener('click', () => {
            openConfirmModal("Are you sure you want to permanently delete this event?", () => {
              fetch(`http://localhost:3000/games/${game.id}`, {
                method: 'DELETE'
              })
                .then(response => {
                  if (!response.ok) throw new Error("Failed to delete game");
                  loadGames();
                })
                .catch(err => {
                  console.error("Error deleting game:", err);
                  alert("An error occurred while trying to delete this game.");
                });
            });
          });
        }
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
    body: JSON.stringify({ title, description, user_id: currentUser.id, email:currentUser.email, location, dateTime, sport, skill, players: [currentUser.id], numPlayers})
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