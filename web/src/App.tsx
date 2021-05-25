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
    window.parent.postMessage('CHECK_DESIGN_TOOL', '*');

    const askFigmaForDesignTool = () =>
      new Promise(resolve => {
        const designToolSentByFigma = (event: any) => {
          if (event.data.type === 'check-version-response') resolve({ designTool: event.data.data.designTool });
        };

        window.addEventListener('message', designToolSentByFigma, false);
      });

    const askSketchForDesignTool = () =>
      new Promise(resolve => {
        // @ts-ignore This function is call in the sketch side
        window.sendDesignTool = (designTool: DesignToolEnum) => {
          resolve({
            designTool,
          });
        };
      });

    const askForDesignToolTimeout = () => new Promise(function(resolve, reject) {
      setTimeout(() => reject(new Error('timeout')), 2000);
    });

    Promise.race([
      askForDesignToolTimeout(),
      askFigmaForDesignTool(),
      askSketchForDesignTool()
    ]).then((value: any) => {
      setDesignTool(value.designTool);
      }, () => {
      console.log('error design tool unknown')
    });

    // Figma Listener
    window.onmessage = async (event: any) => {
      if (event.data.type === 'select-layer') {
        setLayerName(event.data.data.layerName)
        setLayerId(event.data.data.layerId)
      }
    };

    // Sketch Listener
    window.selectLayer = (layerId: string, name: string) => {
      setLayerName(name)
      setLayerId(layerId)
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
