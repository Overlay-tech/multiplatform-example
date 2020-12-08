import { INativeClientInterface } from './NativeClientInterface';

const changeLayerName = (layerId: string, newName: string) => {
  window.parent.postMessage(
    'CHANGE_LAYER_NAME_REQUEST',
    JSON.stringify({
      layerId,
      newName,
    }),
  );
};

const sketchClient: INativeClientInterface = {
  changeLayerName,
};

export default sketchClient;
