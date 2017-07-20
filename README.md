# WorkFlow
Browser Based UI to manage day-to-day workflow

## Description

_MongoDB | Express.js | Angular | Node.js_

This is a concept app.
The purpose was to show that 'there are better ways' of doing thing. 

## Dependencies 

If you have Node installed you can 

```
$ mkdir [your app name here] 
```
Cd into that folder and run: 

```
$ npm init 
```

Add the following to your package.json file: 

```json
  "dependencies": {
    "body-parser": "^1.17.2",
    "bootstrap": "^3.3.7",
    "express": "^4.15.3",
    "jquery-typeahead": "^2.8.0",
    "mongojs": "^2.4.0",
    "mongoose": "^4.10.8"
  }
```

Then returnt to the terminal to run: 

```
$ npm install
``` 

You can also manually install the packages individually if you'd like. 

* See package.json

## Bugs

* ~~editPost~~
    * ~~when editing then posting -> bad request error thrown.~~
* missing some knowledge about angular 
   * Actually, the issue is not updating the model and then display updated content.

## Future Feature(s)

* Search function that yields "fill-able" sites when initial target was a no-go.
