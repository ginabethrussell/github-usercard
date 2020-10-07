import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
//const data = axios.get('https://api.github.com/users/ginabethrussell');

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/
//console.log(data);
/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
axios.get('https://api.github.com/users/ginabethrussell')
  .then(response => {
    console.log(response.data);
    const entryPoint = document.querySelector('.cards');
    const userCard = createCard(response.data);
    entryPoint.appendChild(userCard);
    
    GitHubCalendar(".calendar", "ginabethrussell", { responsive: true });

    // set up user for followers posted programmatically
    const nextUser = 'barbaralois';
    return nextUser;
  })
  .then(user=> {
    axios.get('http://api.github.com/users/' + user)
    .then(response => {
      console.log(response.data);
      const entryPoint = document.querySelector('.cards');
      const userCard = createCard(response.data);
      entryPoint.appendChild(userCard);
    })
    return user;
  })
  .then((user) => {
    postFollowers(user);
  })
  .catch(err => console.log(err))
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// create users array for additional github cards
const followersArray = ['jduell12','barbaralois','tetondan','dustinmyers','justsml','luishrd','bigknell'];

// iterate over users array to
//    send a get request
//    create and user card DOM element
//    add the DOM element card to the index.html page
// followersArray.forEach(githubName => {
//   axios.get(`https://api.github.com/users/` + githubName)
//   .then(response => {
//     const entryPoint = document.querySelector('.cards');
//     const userCard = createCard(response.data);
//     entryPoint.appendChild(userCard);
//   })
//   .catch(err => console.log(err))
// })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
      <div class='calendar'></div>
    </div>
*/
function createCard(userObj){
  //create elements, add data from object, add classes
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = userObj.avatar_url;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const h3 = document.createElement('h3');
  h3.classList.add('name');
  h3.textContent = userObj.name;

  const userP = document.createElement('p');
  userP.classList.add('username');
  userP.textContent = userObj.login;

  const locationP = document.createElement('p');
  locationP.textContent = `Location: ${userObj.location} `;

  const profileP = document.createElement('p');
  profileP.innerHTML = `Profile: <a href= "${userObj.html_url}">${userObj.html_url}</a>`;

  const followersP = document.createElement('p');
  followersP.textContent = `Followers: ${userObj.followers} `;

  const followingP = document.createElement('p');
  followingP.textContent = `Following: ${userObj.following} `;

  const bioP = document.createElement('p');
  bioP.textContent = `Bio: ${userObj.bio} `;

  // button to expand for more info
  const btn = document.createElement('button');
  btn.textContent = 'More Info';
  btn.classList.add('info-button');
  btn.addEventListener('click', (e)=> {
    console.log("More info coming soon");
    e.preventDefault();
    card.classList.toggle('expand');
  })

  // create calendar div for contributions
  const calendarDiv = document.createElement('div');
  calendarDiv.classList.add('calendar');

  // assemble card
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(h3);
  cardInfo.appendChild(userP);
  cardInfo.appendChild(locationP);
  cardInfo.appendChild(profileP);
  cardInfo.appendChild(followersP);
  cardInfo.appendChild(followingP);
  cardInfo.appendChild(bioP);
  card.appendChild(btn);
  card.appendChild(calendarDiv);

  // return card DOM element
  return card;
}

// Find and post the followers for any user
// Example gets data for barbaralois
function postFollowers(firstUser){
  axios.get('https://api.github.com/users/' + firstUser)
    .then(response => {
      console.log(response.data.followers_url)
      const userFollowers = [];
      // use her data.followers_url to get an object of her followers
      axios.get(response.data.followers_url)
      .then(response => {
        // Create an array of followers usernames from the returned object
        response.data.forEach(follower => {
        userFollowers.push(follower.login);
        })
        console.log(userFollowers);
        userFollowers.forEach(person => {
          // iterate over each follower name in the array and send request for user data
          axios.get('https://api.github.com/users/' + person)
          .then(response => {
            // create a card for each follower
            const entryPoint = document.querySelector('.cards');
            const userCard = createCard(response.data);
            entryPoint.appendChild(userCard);
          })  
        })
      })
    })
    .catch(err => console.log(err))
  }
  /*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
