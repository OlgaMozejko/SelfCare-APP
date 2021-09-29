// -------------- Olga ------------------

//vip need input name...
//so meantime simple message print out

let hr = new Date().getHours();
let hi = "";

if (hr > 1 && hr < 12) {
  hi = "Good Morning";
}
if (hr > 12 && hr < 17) {
  hi = "Greetings";
}
if (hr > 17 && hr < 1) {
  hi = "Good Evening";
}

let messageHtml = `${hi}`;

export function welcomeMessage() {
  document.querySelector("#welcoming").innerHTML += messageHtml;
}