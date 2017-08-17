# WorkFlow
Hacked up app to support day to day workflow for field ops. This 'app' if you will was my initial foray into the web. 
I wanted to update a few things and, well, I was very concerned by some of the code. It served its purpose as an initial 
dive into RESTful practices. 

I have since learned much more on the topic and would not consider this an exemplary model for what your code/projects should look like. With a new semester approaching I am concerned I won't get to continue to improve these skills. However, I am going to hack together another MEAN project within the next month. 

That being said, this is what I did. This is the exposure I got. Thanks, 

## Description

_MongoDB | Express.js | Angular | Node.js_

This is a concept app.
The purpose was to show that 'there are better ways' of doing things. Essentially this is a small CRUD style 
app in which you can: 

* create job sites
* read job site data (from MongoDB, both locally and from Mlab)
* update job site data
* delete job site data 



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
   * Issue is with $scope and, hook up portion of code to store results in MongoDB--will fix issue. 

## Future Feature(s)

* Search function that yields "fill-able" sites when initial target was a no-go.
