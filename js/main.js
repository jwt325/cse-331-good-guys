// Fixed js/main.js

let isSignUpMode = false;
const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

const authDiv = document.getElementById('authControls');
const gameForm = document.getElementById('gameForm');

if (currentUser) {
  authDiv.innerHTML = `
    <span>Account: ${currentUser.username}</span>
    <button onclick="logout()">Logout</button>
  `;
  gameForm.style.display = 'block';
} else {
  authDiv.innerHTML = `
    <button onclick="openModal(false)">Login</button>
    <button onclick="openModal(true)">Sign Up</button>
  `;
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
      createUser({ username, password }).then(newUser => {
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
      games.forEach(game => {
        const li = document.createElement('li');
        li.textContent = `${game.author}: ${game.content}`;
        list.appendChild(li);
      });
    });
}

loadGames();

document.getElementById('submitGameBtn')?.addEventListener('click', () => {
  const content = document.getElementById('gameContent').value.trim();
  if (!content) return alert('Cannot game empty content.');
  fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author: currentUser.username, content })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById('gameContent').value = '';
    loadGames();
  });
});