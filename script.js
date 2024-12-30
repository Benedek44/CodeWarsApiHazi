const apiBaseUrl = 'https://www.codewars.com/api/v1/users/';

document.getElementById('user-form').addEventListener('submit', function(event) {
  event.preventDefault();

  document.getElementById('user-cards').innerHTML = '';

  const usernames = document.getElementById('usernames').value.split(',').map(username => username.trim());

  usernames.forEach(username => {
    if (username) {
      fetchUserData(username);
    }
  });
});

function fetchUserData(username) {
  fetch(`${apiBaseUrl}${username}`)
    .then(response => response.json())
    .then(userData => createCard(userData))
    .catch(error => console.error('Hiba történt:', error));
}

function createCard(userData) {
  const card = document.createElement('div');
  card.classList.add('card');

  const languages = Object.keys(userData.ranks.languages).join(', ');
  const javascriptRank = userData.ranks.languages['javascript'] 
    ? userData.ranks.languages['javascript'].name 
    : 'N/A';

  card.innerHTML =
   `<h2>${userData.username}</h2>
    <p><strong>Teljes név:</strong> ${userData.name ? userData.name : 'Nincs megadva'}</p>
    <p><strong>Clan:</strong> ${userData.clan ? userData.clan : 'Nincs megadva'}</p>
    <p><strong>Programozási nyelvek:</strong> ${languages}</p>
    <p><strong>JavaScript Rank:</strong> ${javascriptRank}</p>
    <p><strong>Rank:</strong> ${userData.ranks.overall.name} (${userData.ranks.overall.score})</p>`;

  document.getElementById('user-cards').appendChild(card);
}
