import "./modules/canvas.js";
import "./modules/toolbar.js";

const icon = document.querySelector('link[rel = "shortcut icon"]')
const updatePage = (text, image) => { document.title = text, icon.href = `./img/logo/${image}` }

window.addEventListener('blur', () => updatePage('Unsaved Progress', 'grouchy2.png'));
window.addEventListener('focus', () => updatePage('Puma Pixel', 'grouchy.png'));