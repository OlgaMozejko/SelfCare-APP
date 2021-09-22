//Olga 
//daily motivations message for the user

//array of messages
let sentences = [
    "bad things come to an end eventually",
    "breath, just breath",
    "this moticational message is the best",
    "but this one is even better",
    "now you are going to be so motivated",
    "motivation galore"
    ];   

    export function dailyMessage(){
        //to get a random mesage everytime you load the page
        let message = sentences[Math.floor(Math.random() * sentences.length)];
        
        //to get random message depening on the day - everyday random message 



        document.querySelector('#messages').innerHTML = message;
    };






