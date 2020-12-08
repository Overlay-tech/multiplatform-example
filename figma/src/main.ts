figma.showUI(__html__, {width: 400, height: 400});

const sendALayerToTheWebview = (layerId: string, layerName: string) =>
  figma.ui.postMessage({
    type: 'select-layer',
    layerId,
    layerName,
  });

// Command executed at the start
const initPlugin = () => {
  if (figma.currentPage.selection && figma.currentPage.selection.length !== 1) return;
  const nativeSelectedElement = figma.currentPage.selection[0];

  sendALayerToTheWebview(nativeSelectedElement.id,  nativeSelectedElement.name)
}

initPlugin();

// Listeners
figma.ui.onmessage = msg => {
  if (msg.type === 'CHANGE_LAYER_NAME_REQUEST') {
    const node = figma.getNodeById(msg.layerId);
    if (!node) return;
    node.name = msg.newName;

    sendALayerToTheWebview(msg.layerId, msg.newName)
  }
};
