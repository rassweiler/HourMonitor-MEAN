[![HourMonitor Logo](http://kylerassweiler.com/media/img/HourMonitor/logo.png)](http://hourmonitor.kylerassweiler.ca)

[![Build Status](https://travis-ci.org/rassweiler/HourMonitor-MEAN.svg?branch=master)](https://travis-ci.org/rassweiler/HourMonitor-MEAN)

HourMonitor is a simple web application for tracking hours worked, designed to be mobile friendly and multiplatform.

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager, if you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Yeoman - Install the generator with npm:

```
$ npm install -g yo
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

* Python - [Download & Install](https://www.python.org/downloads/)
* GIT - [Download & Install](https://git-scm.com/downloads)
* JDK - [Download & Install](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

## Quick Install

###Windows
- Install python 2.7 (not 3) and select to add to path
- Install git
- Install Node.js
- Install MongoDB (also add path to env var e.g. C:\Program Files\MongoDB\Server\3.0\bin to make starting it easier)
- Create dirs C:\data\db\
- clone this repo
- Open new powershell(now called ps2) and cd to repo dir
- Enter in ps2:
```
npm install -g bower
```
- Enter in ps2:
```
$ npm install -g grunt-cli
```
- Enter in ps2:
```
$ npm install -g generator-meanjs
```
- Install the rest of the projects dependencies. enter in ps2:
```
$ npm install
```
This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

###Linux
TODO: Add linux install instructions

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)

You also need mongodb running in a seperate shell:

```
$ mongod
```
Your db should run on the 27017 port so in your browser just go to [http://localhost:27017](http://localhost:27017)

                            
That's it! your application should be running by now, to proceed with your development check the other sections in this documentation. 
If you encounter any problem try the Troubleshooting section.

## Credits
- HourMonitor - Created by [Kyle Rassweiler](http://www.kylerassweiler.com)
- MEAN - Inspired by the great work of [Madhusudhan Srinivasa](https://github.com/madhums/)
The MEAN name was coined by [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
