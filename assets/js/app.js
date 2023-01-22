Rogie = {
    static: function() {
        var viewWidth,
            viewHeight,
            canvas = document.getElementById("canvas"),
            ctx;


        var patternSize = 128,
            patternScaleX = 1.5,
            patternScaleY = 1.5,
            patternRefreshInterval = 6,
            patternAlpha = 20;

        var patternPixelDataLength = patternSize * patternSize * 4,
            patternCanvas,
            patternCtx,
            patternData,
            frame = 0;

        window.onload = function() {
            initCanvas();
            initGrain();
            requestAnimationFrame(loop);
        };






        function initCanvas() {
            viewWidth = canvas.width = canvas.clientWidth;
            viewHeight = canvas.height = canvas.clientHeight;
            ctx = canvas.getContext('2d');

            ctx.scale(patternScaleX, patternScaleY);
        }


        function initGrain() {
            patternCanvas = document.createElement('canvas');
            patternCanvas.width = patternSize;
            patternCanvas.height = patternSize;
            patternCtx = patternCanvas.getContext('2d');
            patternData = patternCtx.createImageData(patternSize, patternSize);
        }


        function update() {
            var value;

            for (var i = 0; i < patternPixelDataLength; i += 4) {
                value = (Math.random() * 255) | 0;

                patternData.data[i] = value;
                patternData.data[i + 1] = value;
                patternData.data[i + 2] = value;
                patternData.data[i + 3] = patternAlpha;
            }

            patternCtx.putImageData(patternData, 0, 0);
        }


        function draw() {
            ctx.clearRect(0, 0, viewWidth, viewHeight);

            ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
            ctx.fillRect(0, 0, viewWidth, viewHeight);
        }

        function loop() {
            if (++frame % patternRefreshInterval === 0) {
                update();
                draw();
            }

            requestAnimationFrame(loop);
        }

    },
    funLetters: function(fragment) {
        var elements = fragment.querySelectorAll('.fun-letters');
        [].forEach.call(elements, function(word) {
            [].forEach.call(word.childNodes, function(str) {
                if (str.wholeText) {
                    word.innerHTML = str.wholeText.replace(/(.)/ig, '<span class="rgb-text-shift">$1</span>');
                    [].forEach.call(word.querySelectorAll('span'), function(element, i) {
                        var r = (Math.cos(i)) * -10;
                        element.style.transform = "rotate(" + r + "deg)";
                    });
                }
            });
        });
    },

    addTunes: function(tracks) {
        this.tunes = tracks
    },
    loadRandomTune: function(autoplay) {
        var player = document.querySelector(".tunes")
        var autoplay = autoplay || false;
        var track = this.tunes[Math.floor(Math.random() * this.tunes.length)]
        var name = player.querySelector(".tunes-name")
        var btn = player.querySelector(".tunes-play")
        var audio = this.audio = new Audio(track.audio)
        player.classList.remove("loaded")
        audio.volume = "0.05"
        name.innerHTML = track.name
        name.setAttribute('text', track.name)
        audio.addEventListener("loadeddata", function() {
            player.classList.add("loaded")
            btn.addEventListener("click", Rogie.toggleTune.bind(Rogie))
            if (autoplay) {
                Rogie.toggleTune()
            }
        })
        audio.addEventListener("ended", function() {
            Rogie.loadRandomTune(true)
        });
    },
    toggleTune: function() {
        if (!this.audio) return

        var btn = document.querySelector(".tunes-play")
        if (this.audio.paused) {
            this.audio.play()
            btn.setAttribute("text", btn.innerHTML = "❚❚")
        } else {
            this.audio.pause()
            btn.setAttribute("text", btn.innerHTML = "►")
        }
    },

    init: function() {

        // Static
        this.static();


        // Fun Letters
        this.funLetters(document.querySelector('body'));

        // CRT Text
        document.querySelectorAll('.rgb-text-shift').forEach(function(link) {
            link.setAttribute('text', link.innerText)
        })



        // fade in
        window.addEventListener("load", function() {
            document.body.classList.add("loaded")
        })
    }
}

Rogie.init()


document.addEventListener('keydown', function(e) {
    if (e.keyCode === 49) {
        console.log("1'e bastığın zaman çalışır");
    }
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 50) {
        console.log("2'e bastığın zaman çalışır");
    }
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 51) {
        console.log("3'e bastığın zaman çalışır");
    }
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 52) {
        console.log("4'e bastığın zaman çalışır");
    }
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 53) {
        console.log("5'e bastığın zaman çalışır");
    }
});