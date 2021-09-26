//---------------- Olga ---------------
//daily motivations message for the user

//array of messages
let sentences = [
    "It’s okay to cry over things you thought you moved past.",
    "When it’s right, you won’t be questioning it.",
    "Stop pushing your boundaries for people who push you towards mental breakdown.",
    "You’ll get over it just like you got over that other thing.",
    "What’s meant for you won’t always find you. You have to be open to receiving it.",
    "Stop reaching out to people who keep hurting you.",
    "Just want to remind you that it’s okay. You’re okay. It’s all going to be okay.",
    "You did your best with what you knew at the time.",
    "You don’t have to have it all figured out right now.", 
    "I'm proud of the progress you are making. No matter how small.",
    "Pause for a moment and take a few deep breaths.",
    "Be gentle to yourself today.",
    "Self -care can be small, simple and take just a moment. Fit it into your daily life",
    "It’s not just you. You’re not alone",
    "Breathe, just breathe.",
    "Bad things come to an end eventually.",
    "Life is a wave, it’s only natural to be down sometimes.",
    "Don’t worry if people leave after you set your boundaries, they aren't worth it.",
    "In a world full of bitches, be a badass one.",
    "Don’t ask for permission., just do it!",
    "Not all battles are worth spending your energy on, just let it go.",
    "Don’t worry what other people think, they don’t do it very often.",
     "It’s not about having time, it’s about making time for yourself.",
     "If you don’t let your past die, then it won’t let you live.",
     "Choose people that choose you.",
     "It’s ok if some people dislike you, not everyone has good taste.",
     "Everything is going to be ok in the end. If it’s not ok, that’s not the end.", 
     "You are the most valuable investment you will ever make.",
    "Take a deep breath. It’s a bad day, not a bad life.",
     "If no one else told you today… I’m proud of how hard you’re trying",
     "Make yourself a priority, you are your longest commitment."
    ];   

    export function dailyMessage(){
        //to get a random mesage everytime you load the page
        //let message = sentences[Math.floor(Math.random() * sentences.length)];
        
        //to get message depening on the day - everyday random message 
        var d = new Date().getDate();
        let message = sentences[d];


        document.querySelector('#messages').innerHTML = message;
    };






