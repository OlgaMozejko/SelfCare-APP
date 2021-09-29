import {
  navigateTo
} from "./router.js";

import {
  dailyMessage
} from "./motivation.js";

dailyMessage();

import {
  welcomeMessage
} from "./welcome-message.js";

welcomeMessage();

import MoodSelector from "./data-selection.js";

let moodSelector = new MoodSelector();
moodSelector.init();

let html = "";
let _selectedCatId;
let bob = "";


window.filterbyEmotions = function (value) {
  moodSelector.filterByEmotions(value);
  moodSelector.getPostsByCategory(value);
};

window.orderBy = function (value) {
  moodSelector.orderBy(value);
};

window.orderByEnvironment = function () {
  moodSelector.orderByEnvironment();
};
window.orderByLatest = function () {
  moodSelector.orderByLatest();
};
window.orderByOldest = function () {
  moodSelector.orderByOldest();
};

window.pushPost = function () {
  moodSelector.pushPost();
};

window.showDetailView = function (id) {
  moodSelector.showDetailView(id);
};

window.generateFavPostsButton = function (postId) {
  moodSelector.generateFavPostsButton(postId);
};

window.addToFavourites = function (postId) {
  moodSelector.addToFavourites(postId);
};

window.removeFromFavourites = function (postId) {
  moodSelector.removeFromFavourites(postId);
};

window.isFavPosts = function (postId) {
  moodSelector.isFavPosts(postId);
};



//------------ Olga -----------
//picking category based on the face selected by user &
//change of text & background color :  based on the selected mood
//picking tag based on tag in a drop-down selection

window.clearHtml = function () {
  let oldContent = document.querySelector("#activities-container");
  oldContent.innerHTML = "";
};

function categorySelected(catId) {
  clearHtml();
  _selectedCatId = catId;
  if (catId === "2") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "I'm so happy to see you being happy ❤";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--happy-yellow)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/happyhappyboi.png">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--happy-yellow)"; */
  }
  if (catId === "6") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "It's ok to feel bored or indecisive sometimes.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--indiffrent-brown)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/Indifferentboi.png">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--indiffrent-brown)"; */
  }
  if (catId === "3") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "It's only natural to feel down somedays 🤗";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--sad-blue)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/sadboi.png" class="blueboi">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--sad-blue)"; */
  }
  if (catId === "5") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "Everyone feels unmotivated sometimes, don't worry about it.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--unmotivated-green)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/unmotivatedboi.png">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--unmotivated-green)"; */
  }
  if (catId === "8") {
    document.querySelector("#changing-text").innerHTML = "";
    html =
      "It's normals to feel tired someimes, take deep breath, now it's time to rest.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--tired-purple)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/sleepysleepyboi.png" class="sleepyboi">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--tired-purple)"; */
  }
  if (catId === "7") {
    document.querySelector("#changing-text").innerHTML = "";
    html =
      "Everyone feels stressed sometimes, I'm proud of you acknowledging it.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--stressed-grey)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/stressedboi.png" class="blueboi">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--stressed-grey)"; */
  }
  if (catId === "4") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "It's normal to get angry or frustrated sometimes 🤗";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--frustrated-red)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/angryboi.png">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--frustrated-red)"; */
  }
  if (catId === "9") {
    document.querySelector("#changing-text").innerHTML = "";
    html =
      "It's hard to deal with anxiety and take care of yourself, I'm happy that you are doing it.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--anxious-purple)";
    document.querySelector("#armyofBobs").innerHTML = "";
    bob = `<img src="img/anxiousboi.png" class="purpleboi">`;
    document.querySelector("#armyofBobs").innerHTML = bob;

    /* document.querySelector("#activities-container").style.backgroundColor =
      "var(--anxious-purple)"; */
  }
}

function timeSelected(tagId) {
  if (tagId === "10" || tagId === "11" || tagId === "12" || tagId === "13") {
    moodSelector.getPostsByCatAndTag(_selectedCatId, tagId);
    navigateTo("#/allActivities");
  }
}

window.categorySelected = (catId) => categorySelected(catId);
window.timeSelected = (tagId) => timeSelected(tagId);
// window.filterByEnvironment = (value) => moodSelector.filterByEnvironment(value);

/*window.save_data = function () {
  if (typeof (Storage) !== "undefined") {
    let input = document.getElementById('inputName').value;
    localStorage.setItem('name', input);
    document.getElementById('inputName').value = localStorage.getItem('name');
    let storedValue = localStorage.getItem("name");
    document.querySelector("#user-name").innerHTML = storedValue;
    console.log(storedValue);
    navigateTo("#/settings");
    input = '';
    return storedValue;
  } else {
    alert("Sorry! No Web Storage support..")
  }
}*/

// Saves the input value = name, to the Local Storage - Marius

window.save_name = function () {
  let saveUser = document.querySelector("#save-name");
  let userName = document.querySelector("#username");
  let savedName = document.querySelectorAll(".user-name");

  saveUser.addEventListener(
    "submit",
    function (event) {
      // Don't submit the form
      event.preventDefault();

      // Ignore it if the wishlist item is empty
      if (userName.value.length < 1) return;

      // Add item to wishlist
      savedName.innerHTML = userName.value;

      // Clear input
      userName.value = "";

      // Save the list to localStorage
      localStorage.setItem("savedName", savedName.innerHTML);
    },
    false
  );

  // Check for saved wishlist items
  var saved = localStorage.getItem("savedName");

  // If there are any saved items, update our list
  if (saved) {
    savedName.innerHTML = saved;
  }
};

save_name();

window.save_name_main = function () {
  let saveUser = document.querySelector("#save-name2");
  let userName = document.querySelector("#username2");
  let savedName = document.querySelector(".user-name");

  saveUser.addEventListener(
    "submit",
    function (event) {
      // Don't submit the form
      event.preventDefault();

      // Ignore it if the wishlist item is empty
      if (userName.value.length < 1) return;

      // Add item to wishlist
      savedName.innerHTML = userName.value;

      // Clear input
      userName.value = "";

      // Save the list to localStorage
      localStorage.setItem("savedName", savedName.innerHTML);
    },
    false
  );

  // Check for saved wishlist items
  var saved = localStorage.getItem("savedName");

  // If there are any saved items, update our list
  if (saved) {
    savedName.innerHTML = saved;
  }

};

save_name_main();

window.showEditName = function () {
  let edit = document.querySelector("#edit-name");
  let form = document.querySelector("#save-name");
  if (form.style.display == "none") {
    form.style.display = "block";
    edit.style.display = "none";
  } else {
    window.saveButton = function () {
      form.style.display = "none";
      edit.style.display = "flex";
    };
    saveButton();
  }
};