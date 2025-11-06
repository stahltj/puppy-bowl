//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.

// https://fsa-puppy-bowl.herokuapp.com/api/2510-tyler

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
let PLAYERS = [];
////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-tyler/players"
    );
    const obj = await response.json();
    console.log(obj.data);
    // Check if obj.data.players exists (nested structure)
    if (obj.data && obj.data.players) {
      PLAYERS = obj.data.players;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2510-tyler/players/${id}`
    );
    const obj = await response.json();
    console.log(obj.data);
    singlePlayerObj = obj.data;
    render();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * Do we have a way to do that currently...?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2510-tyler/players",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      }
    );
    const data = await response.json();
    init();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() some information is required.
 * Unless we get that information, we cannot call removePlayer()....
 */
/**
 * Note#2: Don't be afraid to add parameters to this function if you need to!
 */

const removePlayer = async (playerId) => {
  try {
    //console.log(id);
    await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2510-tyler/players/${playerId}`,
      {
        method: "DELETE",
      }
    );
    init();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked
 * - Remove from roster. when clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  const puppyList = document.getElementById("puppyList");
  //clear out existing puppylist
  puppyList.innerHTML = "";
  PLAYERS.forEach((puppy) => {
    const puppyElement = `        <div class="puppyContainer" data-status="${
      puppy.status
    }">
          <div class="imageWrapper">
            <img
              src="${puppy.imageUrl}"
              alt="${puppy.name}"
            />
          </div>
          <p class="puppyName">${puppy.name}</p>
          <button type="button" class="collapsible">Show Details</button>
          <div class="content">
            <p class="puppyBreed">${puppy.breed}</p>
            <p class="puppyId">${puppy.id}</p>
            <p class="puppyStatus">${puppy.status}</p>
            <p class="puppyTeam">${
              puppy.team ? puppy.team.name : "unassigned"
            }</p>
            <div class="removePlayer">
              <button id="removePlayerButton" onclick="removePlayer(${
                puppy.id
              })">
                Remove Player
              </button>
            </div>
          </div>`;
    puppyList.insertAdjacentHTML("beforeend", puppyElement);
  });
};

var coll = document.getElementsByClassName("collapsible");
var i;
/**
 * event handler for see details
 */
const detailHandlers = () => {
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
};

/**
 * add new puppy form handler
 */
const setUpPuppyFormHandler = () => {
  const form = document.getElementById("addPuppyForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const breed = document.getElementById("breed").value;
    const status = document.getElementById("status").value;
    const newPlayer = { name, breed, status };
    await addNewPlayer(newPlayer);
    form.reset();
  });
};
/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need...?
  await fetchAllPlayers();
  render();
  detailHandlers();
  setUpPuppyFormHandler();
};

init();
