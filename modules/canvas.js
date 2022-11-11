const canvas = document.querySelector('#canvas_1');
let ctx = canvas.getContext('2d');
let drawing = false;
let bounds;
let canvasScale = 10;
let penData;
const canvasSettings = () => { canvas.style.setProperty("--canvas-scale", canvasScale.toString()); };
const updateBounds = () => { bounds = canvas.getBoundingClientRect(); };
const updatePen = (red, green, blue, alpha, sizeX, sizeY) => {
    penData = ctx.createImageData(sizeX, sizeY);
    for (let i = 0; i < penData.data.length; i += 4) {
        penData.data[i + 0] = red; // R
        penData.data[i + 1] = green; // G
        penData.data[i + 2] = blue; // B
        penData.data[i + 3] = alpha; // A
    }
};
const draw = (event) => {
    if (!drawing)
        return;
    const x = Math.floor((event.clientX - bounds.left) / canvasScale);
    const y = Math.floor((event.clientY - bounds.top) / canvasScale);
    ctx.putImageData(penData, x, y);
};
const start = (event) => {
    drawing = true;
    updateBounds();
    switch (event.button) {
        case 0:
            updatePen(255, 0, 85, 255, 1, 1);
            break;
        case 1:
            updatePen(0, 0, 0, 0, 1, 1);
            break;
        case 2:
            updatePen(24, 26, 27, 255, 1, 1);
            break;
    }
    draw(event);
};
const end = () => { drawing = false; };
canvas.addEventListener('mousedown', start);
document.addEventListener('mouseup', end);
canvas.addEventListener('mousemove', draw);
canvas.oncontextmenu = () => false;
document.addEventListener("DOMContentLoaded", canvasSettings);
