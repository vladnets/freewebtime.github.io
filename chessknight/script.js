"use strict";
var VladnetsLanding;
(function (VladnetsLanding) {
    let Orientation;
    (function (Orientation) {
        Orientation["Unknown"] = "orientation-unknown";
        Orientation["Portrait"] = "orientation-portrait";
        Orientation["Landscape"] = "orientation-landscape";
        Orientation["Square"] = "orientation-square";
    })(Orientation || (Orientation = {}));
    const viewport = {
        orientation: Orientation.Unknown,
        width: 0,
        height: 0
    };
    const layout = {
        isDirty: false,
        lastWidthClassName: "",
        lastHeightClassName: "",
        lastOrientationClassName: ""
    };
    const config = {
        widths: {
            none: {
                size: 0,
                name: "none"
            },
            tiny: {
                size: 320,
                name: "tiny"
            },
            small: {
                size: 600,
                name: "small"
            },
            medium: {
                size: 800,
                name: "medium"
            },
            normal: {
                size: 1200,
                name: "normal"
            },
            large: {
                size: 1920,
                name: "large"
            },
            huge: {
                size: 0,
                name: "huge"
            }
        },
        heights: {
            none: {
                size: 0,
                name: "none"
            },
            tiny: {
                size: 320,
                name: "tiny"
            },
            small: {
                size: 480,
                name: "small"
            },
            medium: {
                size: 600,
                name: "medium"
            },
            normal: {
                size: 1000,
                name: "normal"
            },
            large: {
                size: 1280,
                name: "large"
            },
            huge: {
                size: 0,
                name: "huge"
            }
        }
    };
    function updateViewport() {
        var width = window.visualViewport.width * window.visualViewport.scale;
        var height = window.visualViewport.height * window.visualViewport.scale;
        var orientation = Orientation.Unknown;
        if (width == height) {
            orientation = Orientation.Square;
        }
        else if (width < height) {
            orientation = Orientation.Portrait;
        }
        else {
            orientation = Orientation.Landscape;
        }
        // nothing changed
        // if (viewport.width === width && viewport.height === height && viewport.orientation === orientation) {
        //   return;
        // }
        layout.isDirty = true;
        viewport.width = width;
        viewport.height = height;
        viewport.orientation = orientation;
        console.log("viewport", window.visualViewport.width * window.visualViewport.scale);
    }
    VladnetsLanding.updateViewport = updateViewport;
    function updateLayoutSize() {
        const body = document.body;
        if (body === null) {
            return;
        }
        const { widths, heights } = config;
        let widthClassName = "width-";
        if (viewport.width < widths.tiny.size) {
            widthClassName += widths.none.name;
        }
        else if (viewport.width < widths.small.size) {
            widthClassName += widths.tiny.name;
        }
        else if (viewport.width < widths.medium.size) {
            widthClassName += widths.small.name;
        }
        else if (viewport.width < widths.normal.size) {
            console.log("really?", viewport.width);
            widthClassName += widths.medium.name;
        }
        else if (viewport.width < widths.large.size) {
            widthClassName += widths.normal.name;
        }
        else if (viewport.width > widths.large.size) {
            widthClassName += widths.huge.name;
        }
        let heightClassName = "height-";
        if (viewport.height < heights.tiny.size) {
            heightClassName += heights.none.name;
        }
        else if (viewport.height < heights.small.size) {
            heightClassName += heights.tiny.name;
        }
        else if (viewport.height < heights.medium.size) {
            heightClassName += heights.small.name;
        }
        else if (viewport.height < heights.normal.size) {
            heightClassName += heights.medium.name;
        }
        else if (viewport.height < heights.large.size) {
            heightClassName += heights.normal.name;
        }
        else if (viewport.height > heights.large.size) {
            heightClassName += heights.huge.name;
        }
        if (widthClassName !== layout.lastWidthClassName) {
            if (layout.lastWidthClassName) {
                body.classList.remove(layout.lastWidthClassName);
            }
            body.classList.add(widthClassName);
            layout.lastWidthClassName = widthClassName;
        }
        if (heightClassName !== layout.lastHeightClassName) {
            if (layout.lastHeightClassName) {
                body.classList.remove(layout.lastHeightClassName);
            }
            body.classList.add(heightClassName);
            layout.lastHeightClassName = heightClassName;
        }
    }
    function updateLayout() {
        // layout wasn't changed since last time
        if (!layout.isDirty) {
            return;
        }
        const body = document.body;
        if (body !== null) {
            if (viewport.orientation !== layout.lastOrientationClassName) {
                const orientationClassName = viewport.orientation;
                // remove last orientation class
                if (layout.lastOrientationClassName) {
                    body.classList.remove(layout.lastOrientationClassName);
                }
                // add orientation class
                body.classList.add(orientationClassName);
                // save last orientation to avoid unnecessary class update
                layout.lastOrientationClassName = orientationClassName;
            }
        }
        updateLayoutSize();
        // reset layout dirtiness
        layout.isDirty = false;
    }
    function onLoad() {
        updateViewport();
        updateLayout();
    }
    var resizeTimeoutId = -1;
    function onResize() {
        clearTimeout(resizeTimeoutId);
        resizeTimeoutId = setTimeout(() => {
            updateViewport();
            updateLayout();
        }, 1);
    }
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onResize);
})(VladnetsLanding || (VladnetsLanding = {}));
