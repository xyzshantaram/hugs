let App = {
    UI: {},
    canvas: {},
    ctx: {},
    urlContents: {},
    assets: {}
}

if (!window.location.search) {
    window.location.replace("send.html");
}

const virtualCanvasSize = 480;

function init() {
    App.assets = new AssetManager(function () {
        window.requestAnimationFrame(draw);
    });
    App.assets.queueItems([new FileInfo('hug-0.png', 'img/hug-0.png', 'img'),
    new FileInfo('hug-1.png', 'img/hug-1.png', 'img'),
    new FileInfo('hug-2.png', 'img/hug-2.png', 'img'),
    new FileInfo('hug-3.png', 'img/hug-3.png', 'img')]);
    App.assets.loadAll();
    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (arg1, arg2) {
            let toRet = this;
            while (toRet.includes(arg1)) {
                toRet = toRet.replace(arg1, arg2);
            }
            return toRet;
        }
    }
    App.canvas = document.getElementById('canvas');


    App.canvas.width = App.canvas.clientWidth;
    App.canvas.height = App.canvas.clientHeight;

    App.ctx = canvas.getContext('2d');

    App.ctx.setTransform(1, 0, 0, 1, 0, 0);
    App.ctx.scale(
        App.canvas.width / virtualCanvasSize,
        App.canvas.height / virtualCanvasSize
    );

    App.UI.senderName = document.getElementById('sender-name');
    App.UI.recipientName = document.getElementById('recipient-name');
    App.UI.message = document.getElementById('message');
    App.UI.messageWrapper = document.getElementById('message-wrapper');

    for (let x of window.location.search.replace('?', '').split('&')) {
        let kvPair = x.split('=');
        App.urlContents[kvPair[0]] = decodeURI(kvPair[1]);
    }

    App.UI.senderName.innerHTML = 'Someone';
    App.UI.recipientName.innerHTML = 'person';
    App.UI.messageWrapper.style.display = 'none';

    if (Object.keys(App.urlContents).includes('sender')) {
        if (App.urlContents.sender.trim() !== '')
            App.UI.senderName.innerHTML = App.urlContents['sender'];
    }
    if (Object.keys(App.urlContents).includes('recipient')) {
        if (App.urlContents.sender.trim() !== '')
            App.UI.recipientName.innerHTML = App.urlContents['recipient'];
    }
    if (Object.keys(App.urlContents).includes('message')) {
        if (App.urlContents.message.trim() !== '') {
            App.UI.message.innerHTML = atob(App.urlContents['message'].replaceAll('-', '='));
            App.UI.messageWrapper.style.display = 'flex';
        }
    }

    window.addEventListener("resize", function () {
        App.ctx.setTransform(1, 0, 0, 1, 0, 0);
        App.canvas.width = App.canvas.clientWidth;
        App.canvas.height = App.canvas.clientHeight;
        console.log('scaling up to ', App.canvas.width / virtualCanvasSize, App.canvas.height / virtualCanvasSize)
        App.ctx.scale(
            App.canvas.width / virtualCanvasSize,
            App.canvas.height / virtualCanvasSize
        );
    });

    document.getElementById('replay-btn').onclick = function() {
        frameNo = 0;
    }
}

let frameNo = 0;
let frameCount = 0;

const PER_FRAME_DURATION = 30;
const NUM_FRAMES = 4;


function draw() {
    frameCount++;
    App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    App.ctx.drawImage(App.assets.getAsset(`hug-${frameNo}.png`), 0, 0);
    if (frameCount % PER_FRAME_DURATION === 0) {
        frameNo++;
    }
    if (frameNo >= NUM_FRAMES) {
        frameNo = NUM_FRAMES - 1;
    }

    window.requestAnimationFrame(draw);
}

window.onload = init;