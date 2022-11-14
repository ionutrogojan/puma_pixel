const canvas = document.querySelector('#canvas_1');
let ctx = canvas.getContext('2d');
let drawing = false;
let bounds;
let activeLayer = 0;
let mouse = null;
var style;
(function (style) {
    style[style["WIDTH"] = 48] = "WIDTH";
    style[style["HEIGHT"] = 48] = "HEIGHT";
    style[style["SCALE"] = 10] = "SCALE";
})(style || (style = {}));
const layer1 = new Uint8ClampedArray(style.WIDTH * style.HEIGHT * 4).fill(0);
const layer2 = new Uint8ClampedArray(style.WIDTH * style.HEIGHT * 4).fill(0);
const combinedLayers = new Uint8ClampedArray(style.WIDTH * style.HEIGHT * 4).fill(0);
const canvasSettings = () => {
    canvas.style.setProperty("--canvas-scale", style.SCALE.toString());
};
const updateBounds = () => { bounds = canvas.getBoundingClientRect(); };
const drawLayer = (event, red, green, blue, alpha) => {
    if (!drawing)
        return;
    const x = Math.floor((event.clientX - bounds.left) / style.SCALE);
    const y = Math.floor((event.clientY - bounds.top) / style.SCALE);
    const i = (x * 4) + ((y * 4) * 48);
    switch (mouse) {
        case 0:
            layer1[i + 0] = red;
            layer1[i + 1] = green;
            layer1[i + 2] = blue;
            layer1[i + 3] = alpha;
            break;
        case 1:
            layer2[i + 0] = 0;
            layer2[i + 1] = 0;
            layer2[i + 2] = 0;
            layer2[i + 3] = 0;
            break;
        case 2:
            layer2[i + 0] = 24;
            layer2[i + 1] = 26;
            layer2[i + 2] = 27;
            layer2[i + 3] = 255;
            break;
    }
    for (let i = 0; i < layer1.length; i++) {
        if (layer2[i] === 0) {
            combinedLayers[i] = layer1[i];
        }
        else {
            combinedLayers[i] = layer2[i];
        }
    }
    const layerData = new ImageData(combinedLayers, style.WIDTH, style.HEIGHT);
    ctx.putImageData(layerData, 0, 0);
};
const start = (event) => {
    drawing = true;
    updateBounds();
    mouse = event.button;
    drawLayer(event, 255, 0, 85, 255);
};
const end = () => { drawing = false, mouse = null; };
canvas.addEventListener('mousedown', start);
document.addEventListener('mouseup', end);
canvas.addEventListener('mousemove', (e) => drawLayer(e, 255, 0, 85, 255));
canvas.oncontextmenu = () => false;
document.addEventListener("DOMContentLoaded", canvasSettings);
document.addEventListener("LayerSwitched", (e) => {
    activeLayer = e.detail.index;
    // console.log(activeLayer);
});
