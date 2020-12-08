import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { sendToWebview } from 'sketch-module-web-view/remote';

const Sketch = require('sketch');
const document = require('sketch/dom').getSelectedDocument();
const webviewIdentifier = 'pixel-perfect.webview'

export default function () {
  const options = {
    identifier: webviewIdentifier,
    width: 400,
    height: 400,
    alwaysOnTop: true,
    show: false
  }

  const browserWindow = new BrowserWindow(options)
  const webContents = browserWindow.webContents

  // Command executed at the start
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()

    if (context.selection && context.selection.length !== 1) return;
    const nativeSelectedElement = context.selection[0];
    const sketchApiSelectedElement = Sketch.fromNative(nativeSelectedElement);

    sendToWebview(webviewIdentifier, `selectLayer(${JSON.stringify(sketchApiSelectedElement.id)}, ${JSON.stringify(sketchApiSelectedElement.name)})`)
  })

  // Listeners
  webContents.on(
    'CHANGE_LAYER_NAME_REQUEST',
    (command) => {
      const { newName, layerId } = JSON.parse(command);
      const layer = document.getLayerWithID(layerId);
      if (!layer) return;
      layer.name = newName;

      sendToWebview(webviewIdentifier, `selectLayer(${JSON.stringify(layerId)}, ${JSON.stringify(newName)})`)
    },
  );

  browserWindow.loadURL('http://localhost:3000')
}

export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
