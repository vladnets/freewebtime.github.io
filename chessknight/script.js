"use strict";
var ChessKnight;
(function (ChessKnight) {
    var pathPrefix = "WebGL/0.10/";
    var buildUrl = pathPrefix + "Build/";
    var loaderUrl = buildUrl + "ChessKnight.loader.js";
    var config = {
        dataUrl: buildUrl + "ChessKnight.data.unityweb",
        frameworkUrl: buildUrl + "ChessKnight.framework.js.unityweb",
        codeUrl: buildUrl + "ChessKnight.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Freewebtime",
        productName: "ChessKnight",
        productVersion: "1.1.0.10",
        // By default Unity keeps WebGL canvas render target size matched with
        // the DOM size of the canvas element (scaled by window.devicePixelRatio)
        // Set this to false if you want to decouple this synchronization from
        // happening inside the engine, and you would instead like to size up
        // the canvas DOM size and WebGL render target sizes yourself.
        // matchWebGLToCanvasSize: false
    };
    var canvasElementQuery = "#unity-player-canvas";
    var unityPlayerLoading;
    function showLoadingBar() {
        var loadingBar = document.querySelector("#unity-loading-bar");
        loadingBar.style.display = "block";
    }
    function hideLoadingBar() {
        var loadingBar = document.querySelector("#unity-loading-bar");
        loadingBar.style.display = "none";
    }
    function showMobileWarning() {
        var mobileWarning = document.querySelector("#unity-mobile-warning");
        mobileWarning.style.display = "block";
    }
    function loadUnityPlayer() {
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            config.devicePixelRatio = 1;
            showMobileWarning();
        }
        unityPlayerLoading = new Promise((resolve, reject) => {
            var script = document.createElement("script");
            script.src = loaderUrl;
            script.onload = () => {
                resolve();
            };
            script.onerror = (error) => {
                reject(error);
            };
            document.body.appendChild(script);
        });
    }
    ChessKnight.loadUnityPlayer = loadUnityPlayer;
    function startUnityPlayer() {
        if (unityPlayerLoading === null) {
            return;
        }
        showLoadingBar();
        unityPlayerLoading
            .then(() => {
                var canvas = document.querySelector(canvasElementQuery);
                var progressBarFull = document.querySelector("#unity-progress-bar-full");
                var fullscreenButton = document.querySelector("#unity-fullscreen-button");
                if (canvas === null) {
                    console.error("ERROR: Canvas is null");
                    return;
                }
                if (canvas === null) {
                    console.error("ERROR: Canvas is null");
                    return;
                }
                var timeoutId;
                var updateLayout = () => {
                    if (canvas === null) {
                        return;
                    }
                    canvas.style.display = "none";
                    canvas.hidden = true;
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        var canvasContainer = document.querySelector("#player-canvas-container");
                        if (canvasContainer !== null) {
                            // canvas.width = canvasContainer.offsetWidth;
                            // canvas.height = canvasContainer.offsetHeight;
                        }
                        canvas.style.display = "";
                        canvas.hidden = false;
                    }, 100);
                };
                document.addEventListener("fullscreenchange", updateLayout);
                window.addEventListener("resize", updateLayout);
                // updateLayout();
                window.createUnityInstance(canvas, config, (progress) => {
                    if (progressBarFull === null) {
                        return;
                    }
                    // updateLayout();
                    progressBarFull.style.width = 100 * progress + "%";
                }).then((unityInstance) => {
                    window.unityInstance = unityInstance;
                    hideLoadingBar();
                    updateLayout();
                    if (fullscreenButton !== null) {
                        document.body.classList.add("started");
                        fullscreenButton.onclick = () => {
                            unityInstance.SetFullscreen(1);
                        };
                    }
                    else {
                        console.error("ERROR: no fullscreen button");
                    }
                }).catch((message) => {
                    alert(message);
                });
            })
            .catch((error) => {
                console.log(`error! ${error.message}`);
            });
    }
    ChessKnight.startUnityPlayer = startUnityPlayer;
})(ChessKnight || (ChessKnight = {}));
/// <reference path="./player.ts" />
window.addEventListener("load", () => {
    ChessKnight.loadUnityPlayer();

    var playButtons = document.querySelectorAll(".button.button-play");
    var containers = document.querySelectorAll(".play-button-container");

    playButtons.forEach(playButton => {
      playButton.addEventListener("click", () => {
        playButton.style.display = "none";

        containers.forEach(container => {
            container.style.display = "none";
        });

        ChessKnight.startUnityPlayer();

        var mobileWarning = document.querySelector("#unity-mobile-warning");
        setTimeout(() => {
            mobileWarning.style.display = "none";
        }, 5000);
      });
    });

    var helpUkraineButtons = document.querySelectorAll(".button-help-Ukraine-clickable");
    helpUkraineButtons.forEach(button => {
        button.addEventListener("click", () => {
            var body = document.body;
            if (body.classList.contains("page-help-Ukraine")) {
                body.classList.remove("page-help-Ukraine");
                body.classList.add("page-player");
            }
            else {
                body.classList.add("page-help-Ukraine");
                body.classList.remove("page-player");
            }
        });
    });

    var downloadButtons = document.querySelectorAll(".button-download");
    downloadButtons.forEach(button => {
        button.addEventListener("click", () => {
            var toolbars = document.querySelectorAll('.toolbar');
            toolbars.forEach(toolbar => {
                if (toolbar.classList.contains("mode-downloads-open")) {
                    toolbar.classList.remove("mode-downloads-open");
                    toolbar.classList.add("mode-downloads-closed");
                }
                else {
                    toolbar.classList.add("mode-downloads-open");
                    toolbar.classList.remove("mode-downloads-closed");
                }
            });
        });
    });
});
