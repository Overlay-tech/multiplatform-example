# Multiplatform example

This project is an example for creating multiplatform (Figma/Sketch) plugin with React.

#### Prerequisites
- node
- Sketch
- Figma Desktop app

## Installation

```
make install
```

### 1. Start the web part

Then open a terminal and start the web part

```
cd web && npm run start
```

Now you can see your web part in `localhost:3000`.

### 2. Start the Sketch part

Open another terminal and build the sketch native part.

```
make build-sketch
```

Normally, Sketch should open and ask you to install the plugin.

### 3. Start the Figma part

Launch ngrok to expose the port 3000 to a https url.
```
./ngrok http 3000
```

Copy/paste the https ngrok tunnel url into the `figma/webpack.config.js`
```
const localUrl = '<insert your ngrok url here>';
```

Finally, open another terminal and start the figma webpack server

```
cd figma && npm run start
```

Now you can go in Figma Desktop app and click on `Manage plugins...` > `Create new plugin` > `Link existing plugin` and select the path to `figma/manifest.json`

You can use your plugin in Figma Desktop app 🎉

Made with ♥️ by **Overlay Team**
