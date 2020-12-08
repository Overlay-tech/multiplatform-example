import React, {useEffect, useState} from 'react';
import { random } from 'flower-names';
import './App.css';
import sketchClient from "./Interfaces/sketchClient";
import figmaClient from "./Interfaces/figmaClient";

declare var window : any
enum DesignToolEnum {
  SKETCH = 'SKETCH',
  FIGMA = 'FIGMA',
}

function App() {
  const [layerName, setLayerName] = useState<string>('')
  const [layerId, setLayerId] = useState<string>('')
  const [designTool, setDesignTool] = useState<DesignToolEnum>(DesignToolEnum.SKETCH)

  useEffect(() => {
    // Figma Listener
    window.onmessage = async (event: any) => {
      if (event.data.type === 'select-layer') {
        setLayerName(event.data.data.layerName)
        setLayerId(event.data.data.layerId)
        setDesignTool(DesignToolEnum.FIGMA);
      }
    };

    // Sketch Listener
    window.selectLayer = (layerId: string, name: string) => {
      setLayerName(name)
      setLayerId(layerId)
      setDesignTool(DesignToolEnum.SKETCH);
    };
  }, [])

  const renameLayer = () => {
    const flowerName = random();
    switch (designTool) {
      case DesignToolEnum.SKETCH:
        sketchClient.changeLayerName(layerId, flowerName)
        break;
      case DesignToolEnum.FIGMA:
        figmaClient.changeLayerName(layerId, flowerName)
        break;
    }
  }

  return (
    <main className="main">
      <span role="img" aria-label="rose" className="emoji">🌹</span>
      <p className="text">{layerName}</p>
      <button className="button" onClick={renameLayer}>I want to be a flower !</button>
    </main>
  );
}

export default App;
