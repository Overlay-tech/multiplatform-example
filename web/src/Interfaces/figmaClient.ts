import { INativeClientInterface } from './NativeClientInterface';

const changeLayerName = (layerId: string, newName: string) => {
  window.parent.postMessage(
    {
      type: 'CHANGE_LAYER_NAME_REQUEST',
      layerId,
      newName,
    },
    '*',
  );
};

const figmaClient: INativeClientInterface = {
  changeLayerName,
};

export default figmaClient;
