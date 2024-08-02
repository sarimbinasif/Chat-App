const socket = io() // creates a new connection

let userName;
let textarea = document.querySelector("#textarea")
let msgarea = document.querySelector(".messageArea")

do {
    userName = prompt("Enter your name:")
} while (!userName);

textarea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
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


// recieve

socket.on("message", msg=>{
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}