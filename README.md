### Game Of Life - Kata

General installation instructions:

Install build essentials:
```
$sudo apt-get install build-essential
```
Install NODE and NPM
Fastest way is to use apt-get but adding the correct sources:
```
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
It may be important to update npm:
```
$ npm install npm@2 -g
```

Bower:
```
$ sudo npm install -g bower
```

For running tests, we would use GRUNT (JS task runner) installed globally:
```
$ sudo npm install -g grunt-cli
```

In order to install dependencies and other external files, cd into each **server** and **client** folders and run:
```
$ npm install
```
In the client folder, it is also important to execute:
```
$ bower install
```
