var connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();

document.getElementById('sendButton').disabled = true;

connection.on('ReceiveMessage', function (user, text, sentTime) {
    addMessage(user, text, sentTime);
});

connection.on('AddNewUser', function (user) {
    addActiveUser(user);
});

connection.on('OnConnected', function (messages, users) {

    for (let message of messages) {
        addMessage(message.userName, message.messageText, message.sentTime);
    }

    for (let user of users) {
        addActiveUser(user);
    }
});

connection.on('RemoveActiveUser', function (user) {
    removeActiveUser(user);
});

connection.start().then(function () {
    document.getElementById('sendButton').disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById('sendButton').addEventListener('click', function (event) {
    //const user = document.getElementById('userInput');
    const message = document.getElementById('messageInput');

    //if (user.value.trim() === '') {
    //    user.setCustomValidity("Field can't be empty.");
    //    user.reportValidity();
    //    return;
    //}
    if (message.value.trim() === '') {
        message.setCustomValidity("Field can't be empty.");
        message.reportValidity();
        return;
    } 

    connection.invoke('SendMessage', message.value).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

function addMessage(user, text, sentTime) {
    const userName = user.substr(0, user.indexOf('@')); 
    const onlyTime = sentTime.substr(0, 8); 

   

    const msg = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const currentUserName = currentUser.substr(0, currentUser.indexOf('@')); 

    const encodedMsg = `(${onlyTime}) ${userName}: ${msg}`;

   

    const li = document.createElement('li');
    li.textContent = encodedMsg;

    const list = document.getElementById('messagesList');

    if (currentUserName === userName) {
        li.style.color = '#5ca4d1';
    }

    list.append(li);

    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTo(0, chatWindow.scrollHeight);

    document.getElementById('messageInput').value = '';
};

function addActiveUser(user) {
    const userName = user.substr(0, user.indexOf('@')); 
    const currentUserName = currentUser.substr(0, currentUser.indexOf('@'));


    const li = document.createElement('li');
    li.setAttribute('id', userName);
    //li.textContent = userName;

    const list = document.getElementById('activeUsersList');


    if (currentUserName === userName) {
        li.style.color = '#5ca4d1';
    }

    li.appendChild(document.createTextNode(userName));
    list.appendChild(li);

    //todo: check if working
    const usersBox = document.getElementById('usersBox');
    usersBox.scrollTo(0, usersBox.scrollHeight);
};

function removeActiveUser(user) {
    const userName = user.substr(0, user.indexOf('@')); 

    const list = document.getElementById('activeUsersList');
    const candidate = document.getElementById(userName);
    list.removeChild(candidate);
}