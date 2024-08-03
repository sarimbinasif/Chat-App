const socket = io() // creates a new connection

let userName;
let textarea = document.querySelector("#textarea")
let msgarea = document.querySelector(".messageArea")
let sendButton = document.querySelector("#sendBtn");

do {
    userName = prompt("Enter your name:")
} while (!userName);

textarea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
        textarea.value="";
    }
})


sendButton.addEventListener('click', () => {
    sendMessage(textarea.value);
    textarea.value = ""; 
});


function sendMessage(message) {

    if (!message.trim()) {
        return; // Don't send empty messages
    }

    let msg = {
        user: userName,
        message: message.trim() // to trim spaces before and after text
    }
    appendMessage(msg, "outgoingMsg")


    // send to server now we can listen
    socket.emit("message", msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, "message")

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
`
    mainDiv.innerHTML = markup
    msgarea.appendChild(mainDiv)

}


// Listens for message events from the server. 

socket.on("message", msg=>{
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}