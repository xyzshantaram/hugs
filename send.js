function init() {

    for (let id of ['sender-input', 'recipient-input', 'message']) {
        document.getElementById(id).addEventListener('input', function(e) {
            if (this.value.includes('=') || this.value.includes('&')) {
                this.value = this.value.replaceAll('&', '').replaceAll('=', '');
                alert('Please don\'t use = or & in your inputs.');
            }
        })
    }

    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function(arg1, arg2) {
            let toRet = this.slice();
            while (toRet.includes(arg1)) {
                toRet = toRet.replace(arg1, arg2);
            }
            return toRet;
        }
    }
    document.getElementById('generate-btn').addEventListener('click', function(e) {
        e.preventDefault();
        for (let cls of ['freepik', 'result', 'share']) {
            let existing = document.getElementsByClassName(cls);
            if (existing) {
                for (let y of existing) {
                    y.remove();
                }
            }
        }

        let result = document.createElement('div');
        result.classList.add('result');

        let url = generateLink();

        let resInfo = document.createElement('div');
        resInfo.style.textAlign = 'center';
        resInfo.append('Your generated link: ');
        result.appendChild(resInfo);

        let link = document.createElement('input');
        link.classList.add('link');
        link.value = url;
        result.appendChild(link);


        let copyBtn = document.createElement('button');
        copyBtn.innerHTML = "Copy";
        copyBtn.addEventListener('click', function() {
            let linkField = document.querySelector('.link');
            linkField.click();
            linkField.select();
            linkField.setSelectionRange(0, linkField.value.length);
            document.execCommand('copy');
        });

        let viewBtn = document.createElement('button');
        viewBtn.innerHTML = "View";
        viewBtn.onclick = function() {
            window.location.replace(url);
        }
        let actions = document.createElement('div');
        actions.appendChild(copyBtn);
        actions.appendChild(viewBtn);

        actions.classList.add('actions');

        result.appendChild(actions);
        document.body.appendChild(result);

        let shareDiv = document.createElement('div');
        shareDiv.classList.add('share');
        shareDiv.append('Share with your friend! ');

        let waBtn = document.createElement('button');
        waBtn.classList.add('icon');
        waBtn.style.backgroundImage = 'url(\'img/whatsapp.svg\')';
        shareDiv.appendChild(waBtn);

        waBtn.onclick = function() {
            window.location.replace(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`)
        }

        let emailBtn = document.createElement('button');
        emailBtn.classList.add('icon');
        emailBtn.style.backgroundImage = 'url(\'img/arroba.svg\')';
        shareDiv.appendChild(emailBtn);

        emailBtn.onclick = function() {
            window.location.replace(`mailto:?body=${encodeURIComponent(url)}`)
        }
        document.body.appendChild(shareDiv);

        let legalese = document.createElement('div');
        legalese.id = 'legalese';
        legalese.classList.add('freepik');
        legalese.innerHTML = 'WhatsApp and e-mail icons by Freepik';
        document.body.appendChild(legalese);
    })

    document.getElementById('message').addEventListener('input', function(e) {
        if (this.value.length > 140) {
            this.value = this.value.substring(0, 140);
        }
    })
}

function generateLink() {

    let raw = {
        sender: document.getElementById('sender-input').value,
        recipient: document.getElementById('recipient-input').value,
        message: document.getElementById('message').value
    }

    cleaned = {}
    encoded = {}
    let params = new URLSearchParams();
    params.set("new", "true");

    for (let key of Object.keys(raw)) {
        cleaned[key] = raw[key].replaceAll('>', '&gt;').replaceAll('<', '&lt;');
        encoded[key] = Base64.encode(cleaned[key]);
        params.set(key, encoded[key]);
    }

    let str = window.location.href.replace('send.html', 'index.html');
    str += `?${params.toString()}`;
    return str;
}

window.onload = init;