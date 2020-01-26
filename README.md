# react-json-previewer
A compact way to view object contents as JSON - Click on the component to toggle preview on/off.
Intended as a simple debugging tool during react development.


![alt text](https://github.com/tri-bit/react-json-previewer/blob/master/docs/intro_image.png?raw=true "Example")

## Installation
```javascript

npm install @tri-bit/react-json-previewer

```

## Usage
```jsx
import  JSONPreviewer  from '@tri-bit/react-json-previewer';


const sourceObject = {example:'object'};

<JSONPreviewer sourceObject={sourceObject} />

```

## Props

| prop                              |  description                                                                                                         |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `sourceObject`                    | The only required prop - the contents of this object will be displayed by the component                              |
| `displayType`                     | Default value is `true` - toggles the display of object key's type in parentheses after the key's name               |
| `previewTitle`                    | The always displayed title of the preview component, `"JSONPreviewer"` is the default value                          |
| `expanded`                        | Default value is `false` - If true the preview will remain opened                                                    |
| `stringDisplayLimit`              | Default value is `1024` - Shortens the display of long strings. Set to `-1` to remove the limit                      |


