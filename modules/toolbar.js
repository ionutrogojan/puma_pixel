document.addEventListener('click', (event) => {
    const targetTool = event.target;
    if (!targetTool.getAttribute('data-toolname'))
        return;
    const activeTool = document.querySelector("[data-toolstate='active']");
    if (targetTool === activeTool)
        return;
    activeTool.dataset.toolstate = 'inactive';
    targetTool.dataset.toolstate = 'active';
});
