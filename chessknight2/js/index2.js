const env = {
  pathPrefix: "../WebGL/1.1.1.0/",
  buildUrl: pathPrefix + "Build",
  loaderUrl: buildUrl + "/ChessKnight.loader.js",

  config: {
    dataUrl: buildUrl + "/ChessKnight.data.unityweb",
    frameworkUrl: buildUrl + "/ChessKnight.framework.js.unityweb",
    codeUrl: buildUrl + "/ChessKnight.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Freewebtime",
    productName: "ChessKnight",
    productVersion: "1.1.1.0",
  },

  container: document.querySelector("#unity-container"),
  canvas: document.querySelector("#unity-canvas"),
  loadingBar: document.querySelector("#unity-loading-bar"),
  progressBarFull: document.querySelector("#unity-progress-bar-full"),
  fullscreenButton: document.querySelector("#unity-fullscreen-button"),
  mobileWarning: document.querySelector("#unity-mobile-warning"),
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  container.className = "unity-mobile";
  // Avoid draining fillrate performance on mobile devices,
  // and default/override low DPI mode on mobile browsers.
  config.devicePixelRatio = 1;
  mobileWarning.style.display = "block";
  setTimeout(() => {
    mobileWarning.style.display = "none";
  }, 5000);
} else {
  canvas.style.width = "1280px";
  canvas.style.height = "800px";
}
loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  }).then((unityInstance) => {
    loadingBar.style.display = "none";
    fullscreenButton.onclick = () => {
      unityInstance.SetFullscreen(1);
    };
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);

// controls unity player in the page
class UnityPlayerController {
  constructor() {

  }

  load() {

  }

  start() {

  }

  stop() {

  }
}
