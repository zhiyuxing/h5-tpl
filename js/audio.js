~ function(src) {
    var className = 'play'
    var trigger = 'ontouchend' in document ? 'touchstart' : 'click'
    var $musci = document.createElement('div')
    var $audio = document.createElement('audio')

    function start() {
        document.removeEventListener(trigger, start, false)
        if (!$audio.paused) return
        $audio.play()
    }

    function toggle() {
        if (!$audio.paused) return $audio.pause()

        $audio.currentTime = 0
        $audio.play()
    }

    function play(e) {
        $musci.classList.add(className)
    }

    function pause(e) {
        $musci.classList.remove(className)
    }

    $musci.className = 'music-icon'
    $audio.src = src;
    $audio.loop = true;
    document.body.appendChild($musci)
    document.body.appendChild($audio)

    $audio.addEventListener('play', play, false)
    $audio.addEventListener('pause', pause, false)
    $audio.addEventListener('ended', pause, false)
    $musci.addEventListener('click', toggle, false)
    $audio.play()
    document.addEventListener("WeixinJSBridgeReady", function() {
        $audio.play();
    }, false);

    document.addEventListener(trigger, start, false)
}('img/bgm.mp3');