~ function (undefined) {
    var PreLoad = function (a, b) {
        var c = b || {};
        this.source = a, this.count = 0, this.total = a.length, this.onload = c.onload, this.prefix = c.prefix || "", this.init()
    };
    PreLoad.prototype.init = function () {
        var a = this;
        a.source.forEach(function (b) {
            var c = b.substr(b.lastIndexOf(".") + 1).toLowerCase(),
                d = a.prefix + b;
            switch (c) {
                case "js":
                    a.script.call(a, d);
                    break;
                case "css":
                    a.stylesheet.call(a, d);
                    break;
                case "jpg":
                case "gif":
                case "png":
                case "jpeg":
                    a.image.call(a, d)
            }
        })
    }, PreLoad.prototype.getProgress = function () {
        return Math.round(this.count / this.total * 100)
    }, PreLoad.prototype.image = function (a) {
        var b = document.createElement("img");
        this.load(b, a), b.src = a
    }, PreLoad.prototype.stylesheet = function (a) {
        var b = document.createElement("link");
        this.load(b, a), b.rel = "stylesheet", b.type = "text/css", b.href = a, document.head.appendChild(b)
    }, PreLoad.prototype.script = function (a) {
        var b = document.createElement("script");
        this.load(b, a), b.type = "text/javascript", b.src = a, document.head.appendChild(b)
    }, PreLoad.prototype.load = function (a, b) {
        var c = this;
        a.onload = a.onerror = a.onabort = function (a) {
            c.onload && c.onload({
                count: ++c.count,
                total: c.total,
                item: b,
                type: a.type
            })
        }
    };
    var tasks = ['img/1.jpg', 'img/1-1-1.png','img/1-1-2.png', 'img/1-1-3.png', 'img/1-1-4.png', 'img/1-2-2.png', 'img/1-2-3.png', 'img/1-2-4.png', 'img/1-3-2.png', 'img/1-3-3.png', 'img/1-3-4.png', 'img/1-4-2.png', 'img/1-4-3.png', 'img/1-4-4.png']
    var $progress = document.getElementById('progress');

    function loading(load) {
        var count = load.count
        var total = load.total
        $progress.innerHTML = Math.round(100 * count / total) + '%'
        if (count === total) return complete()
    }

    function next(el, fn) {
        el.className += ' scaleOut'
        setTimeout(function () {
            el.parentNode.removeChild(el)
            fn && fn()
        }, 800)
    }

    var scriptData = ['http://wx.rongo.net.cn/CommonJS/jquery-1.10.2.min.js', 'http://wx.rongo.net.cn/CommonJS/jquery.cookie.js', 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js', 'http://wx.rongo.net.cn/CommonJS/Common.js', 'js/swiper.min.js', 'js/jquery.qrcode.min.js', 'js/index.js']

    function createScript(data) {
        if (data.length == 0) {
            return;
        }
        var s = document.createElement('script');
        s.src = data[0];
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        s.onload = function () {
            scriptData.splice(0, 1)
            createScript(scriptData);
        }
    }
    function complete() {
        var $loader = document.getElementById('loader')
        document.getElementById("wrap").style.display = "block"
        next($loader);
        setTimeout(function () {
            createScript(scriptData)
        }, 100)
    }

    new PreLoad(tasks, {
        onload: loading
    })
}();
