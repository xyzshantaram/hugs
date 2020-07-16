class AssetManager {
    constructor(callback) {
        this.queue = [];
        this.successCount = 0;
        this.results = {};
        this.callback = callback;
    }

    loadAll() {
        let that = this;
        that.numFiles = that.queue.length;
        for (let x of this.queue) {
            fetch(x.url, { method: 'GET' }).then((res) => {
                if (res.ok) {
                    if (x.type === 'img') {
                        res.blob().then((result) => {
                            createImageBitmap(result).then((imgBitmap) => {
                                that.results[x.name] = imgBitmap;
                            })
                        }).then(function () {
                            that.successCount++;
                            if (that.isDone()) {
                                that.callback();
                            }
                        });
                    }
                }
                that.queue.remove(x);
            });
        }
    }

    queueItems(arr) { // array of file objects
        for (let x of arr) {
            if (!this.queue.includes(x))
                this.queue.push(x);
        }
    }

    isDone() {
        return (this.numFiles == this.successCount);
    }

    getAsset(name) {
        return this.results[name]
    }
}

class FileInfo {
    constructor(name, url, type) {
        this.name = name;
        this.url = url;
        this.type = type;
    }
}

Array.prototype.remove = function (v) {
    if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
    }
    return false;
}
