let App = {
    UI: {},
    canvas: {},
    ctx: {},
    urlContents: {}
}

if (!window.location.search) {
    window.location.replace("send.html");
}

function init() {
    App.canvas = document.getElementById('canvas');
    App.UI.senderName = document.getElementById('sender-name');
    App.UI.recipientName = document.getElementById('recipient-name');
    App.UI.message = document.getElementById('message');
    for (let x of window.location.search.replace('?', '').split('&')) {
        let kvPair = x.split('=');
        App.urlContents[kvPair[0]] = decodeURI(kvPair[1]);
    }

    if (Object.keys(App.urlContents).includes('sender')) {
        App.UI.senderName.innerHTML = App.urlContents['sender'];
    }
    else {
        App.UI.senderName.innerHTML = 'Someone';
    }

    if (Object.keys(App.urlContents).includes('recipient')) {
        App.UI.recipientName.innerHTML = App.urlContents['recipient'];
    }
    else {
        App.UI.recipientName.innerHTML = 'person';
    }

    if (Object.keys(App.urlContents).includes('message')) {
        App.UI.message.innerHTML = atob(App.urlContents['message'].replaceAll('-', '='));
    }
    else {
        App.UI.message.style.display = 'none';
    }
}

window.onload = init;