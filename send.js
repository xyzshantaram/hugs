function init() {
    document.getElementById('generate-btn').addEventListener('click', function (e) {
        e.preventDefault();
        let existing = document.getElementsByClassName('result');
        if (existing) {
            for (let y of existing) {
                y.remove();
            }
        }
        let result = document.createElement('div');
        result.classList.add('result');

        let resInfo = document.createElement('div');
        resInfo.append('Your generated link: ');
        result.appendChild(resInfo);

        let link = document.createElement('input');
        link.classList.add('link');
        link.value = generateLink();
        result.appendChild(link);

        let copyBtn = document.createElement('button');
        copyBtn.innerHTML = "Copy";
        copyBtn.addEventListener('click', function () {
            let linkField = document.querySelector('.link');
            linkField.click();
            linkField.select();
            linkField.setSelectionRange(0, linkField.value.length);
            document.execCommand('copy');
            console.log('copied to clipboard');
        })

        result.appendChild(copyBtn);


        document.body.appendChild(result);
    })

    document.getElementById('message').addEventListener('input', function (e) {
        if (this.value.length > 140) {
            this.value = this.value.substring(0, 140);
        }
    })

    for (let id of ['sender-input', 'recipient-input', 'message']) {
        document.getElementById(id).addEventListener('input', function (e) {
            if (this.value.includes('=') || this.value.includes('&')) {
                this.value = this.value.replaceAll('&', '').replaceAll('=', '');
                alert('Please don\'t use = or & in your inputs.');
            }
        })
    }
}

function generateLink() {

    let senderName = encodeURI(document.getElementById('sender-input').value);
    let recpName = encodeURI(document.getElementById('recipient-input').value)
    let message = (document.getElementById('message').value);

    let str = window.location.href.replace('send.html', 'index.html')
    let b64edMessage = btoa(message);

    b64edMessage = b64edMessage.replaceAll('=', '-');
    str += `?sender=${senderName}&recipient=${recpName}&message=${b64edMessage}`;
    return str;
}

window.onload = init;
