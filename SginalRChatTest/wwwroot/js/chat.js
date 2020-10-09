var connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();

document.getElementById('sendButton').disabled = true;

connection.on('ReceiveMessage', function (user, text, sentTime) {
    addMessage(user, text, sentTime);
});

connection.on('OnConnected', function (messages) {

    for (let message of messages) {
        addMessage(message.userName, message.messageText, message.sentTime);
    }
});

connection.start().then(function () {
    document.getElementById('sendButton').disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById('sendButton').addEventListener('click', function (event) {
    const user = document.getElementById('userInput');
    const message = document.getElementById('messageInput');

    if (user.value.trim() === '') {
        user.setCustomValidity("Field can't be empty.");
        user.reportValidity();
        return;
    }
    if (message.value.trim() === '') {
        message.setCustomValidity("Field can't be empty.");
        message.reportValidity();
        return;
    } 

    connection.invoke('SendMessage', user.value, message.value).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

function addMessage(user, text, sentTime) {
    const msg = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const encodedMsg = `(${sentTime}) ${user}: ${msg}`;

    const li = document.createElement('li');
    li.textContent = encodedMsg;

    const list = document.getElementById('messagesList');
    list.insertBefore(li, list.childNodes[0]);
};