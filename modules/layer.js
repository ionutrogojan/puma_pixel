document.addEventListener('click', (event) => {
    const targetTool = event.target;
    const index = targetTool.getAttribute('data-layerIndex');
    if (!index)
        return;
    const activeTool = document.querySelector("[data-layerState='active']");
    if (targetTool === activeTool)
        return;
    activeTool.dataset.layerstate = 'inactive';
    targetTool.dataset.layerstate = 'active';
    const activeLayer = new CustomEvent('LayerSwitched', { detail: { index: parseInt(index) } });
    document.dispatchEvent(activeLayer);
});
