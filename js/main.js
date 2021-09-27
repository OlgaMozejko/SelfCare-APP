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

//------------ Olga -----------
//picking category based on the face selected by user &
//change of text & background color :  based on the selected mood
//picking tag based on tag in a drop-down selection

let html = "";
let _selectedCatId;

window.filterbyEmotions = function (value) {
  moodSelector.filterByEmotions(value);
  moodSelector.getPostsByCategory(value);
}

window.orderBy = function (value) {
  moodSelector.orderBy(value);
}

window.orderByEnvironment = function () {
  moodSelector.orderByEnvironment();
}
window.orderByLatest = function () {
  moodSelector.orderByLatest();
}
window.orderByOldest = function () {
  moodSelector.orderByOldest();
}

function categorySelected(catId) {
  _selectedCatId = catId;
  if (catId === "2") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "I'm so happy to see you being happy ❤";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--happy-yellow)";
  }
  if (catId === "6") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "It's ok to feel bored or indecisive sometimes.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--indiffrent-brown)";
  }
  if (catId === "3") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "It's only natural to feel down somedays 🤗";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--sad-blue)";
  }
  if (catId === "5") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "Everyone feels unmotivated sometimes, don't worry about it.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--unmotivated-green)";
  }
  if (catId === "8") {
    document.querySelector("#changing-text").innerHTML = "";
    html =
      "It's normals to feel tired someimes, take deep breath, now it's time to rest.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--tired-purple)";
  }
  if (catId === "7") {
    document.querySelector("#changing-text").innerHTML = "";
    html =
      "Everyone feels stressed sometimes, I'm proud of you acknowledging it.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--stressed-grey)";
  }
  if (catId === "4") {
    document.querySelector("#changing-text").innerHTML = "";
    html = "It's normal to get angry or frustrated sometimes 🤗";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--frustrated-red";
  }
  if (catId === "9") {
    document.querySelector("#changing-text").innerHTML = "";
    html =
      "It's hard to deal with anxiety and take care of yourself, I'm happy that you are doing it.";
    document.querySelector("#changing-text").innerHTML += html;
    document.querySelector("#time-selection-wrapper").style.backgroundColor =
      "var(--anxious-purple)";
  }
}

function timeSelected(tagId) {
  if (tagId === "10") {
    moodSelector.getPostsByCatAndTag(_selectedCatId, tagId);
    navigateTo("#/allActivities");
  }
  if (tagId === "12") {
    moodSelector.getPostsByCatAndTag(_selectedCatId, tagId);
    navigateTo("#/allActivities");
  }
  if (tagId === "11") {
    moodSelector.getPostsByCatAndTag(_selectedCatId, tagId);
    navigateTo("#/allActivities");
  }
  if (tagId === "13") {
    moodSelector.getPostsByCatAndTag(_selectedCatId, tagId);
    navigateTo("#/allActivities");
  }
}

window.categorySelected = (catId) => categorySelected(catId);
window.timeSelected = (tagId) => timeSelected(tagId);