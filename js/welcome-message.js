// -------------- Olga ------------------

//vip need input name... 
//so meantime simple message print out

let hr = new Date().getHours();
let hi = "";

if (hr > 1 && hr < 12) {
      hi = "Good Morning";  
    }
if (hr > 12 && hr < 17) {
    hi = "Good Day";
}
else {
    hi = "Good Evening";
}

let messageHtml = `
<h5 class="home-text2">${hi}</h5>
<h5 class="home-text2">So glad to see you again 🥰</h5>
`;

export function welcomeMessage() {
    document.querySelector("#welcoming-message").innerHTML += messageHtml;
};



