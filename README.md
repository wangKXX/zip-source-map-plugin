# zip-map-file-plugin

## Using npm:
```
npm i zip-map-file-plugin
```
## describe:
Compress the packaged. Map file

## hook:

zipDone

## example:
```
compiler.hooks.zipDone.tap("upload-sourcemap-plugin",  url => {
  console.log(url);
});
```