window.onmessage = async (event) => {
  // Messages coming from native part
  if (event.data.pluginMessage) {
    const frame = window.document.getElementById('root') as HTMLIFrameElement;
    frame.contentWindow.postMessage(
      { type: event.data.pluginMessage.type, data: { ...event.data.pluginMessage } },
      '*',
    );
    return;
  }

  if (event.data === 'CHECK_DESIGN_TOOL') {
    const frame = window.document.getElementById('root') as HTMLIFrameElement;
    frame.contentWindow.postMessage(
      {
        type: 'check-version-response',
        data: { designTool: 'FIGMA' },
      },
      '*',
    );
    return;
  }

  // Messages coming from web part
  if (event.data.type) {
    parent.postMessage({ pluginMessage: { ...event.data } }, '*');
    return;
  }
};
