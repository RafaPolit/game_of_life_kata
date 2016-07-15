Game Of Life - Kata
===================

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

### For Tests

For running tests, we will use GRUNT (JS task runner) so we need to install it globally:
```
$ sudo npm install -g grunt-cli
```

### Dependencies

In order to install dependencies and other external required modules, cd into each **server** and **client** folders and run:
```
$ npm install
```

**Client** uses Bower to keep track of required packages, so we need Bower installed globally as well:
```
$ sudo npm install -g bower
```

Now cd into the client folder and install the bower packages defined in the bower.json file with:
```
$ bower install
```
