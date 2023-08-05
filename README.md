# ULC E2E Test Automation

This is a protractor test automation framework which is being built for automation end to end flows for Universal Learning Connector (v3.0+)

## Getting Started

 Clone this repository on your local machine using below git command.
```
git clone git@github.com:PtcUniversity/ULC-E2E-Automation.git
```
Reach out to DevOps for latest com/ptcu/ulc/resources/loginData.json from e2e server.


### Prerequisites

* Node.js should be installed

### Installing

* Run the below command which will add all the project dependencies( protractor and allure jasmine reports). 

```
npm install
```

* Create Node.js run configuration in WebStorm for running test suites.

```
Node Parameters: <protractor module path>\built\cli.js
Application Parameters: <working directory>\conf.js <--suite=smoke>
```

* Install Maven for generating allure HTML reports and add the binary to the path environment variable.
* Download BrowserMob Proxy Server from the following URL and start it before running tests
(In case you have chosen a different port for the server other than 8080 then specify the same in the conf.js)

Run BrowserMob proxy as
browsermob-proxy-2.1.1-bin\browsermob-proxy-2.1.1\bin>browsermob-proxy -port <<port no if different than 8080>>

Run npm install in project directory
```
http://bmp.lightbody.net/
```

### Run protractor tests
To run protractor tests you can use any one of the following commands
* Go to the root of the repository and run the command `protractor conf.js`
* Maven command to run the protractor tests `mvn clean install`

### Generate Reports

* After running the test allure-results folder will be created at the root
* If pom.xml is not present at root then copy the pom.xml from the jasmine-allure-reporter node modules
* Run following maven command

```
mvn site -Dallure.results_pattern=allure-results
```

* Open the index.html located in ./target/site/allure-maven-plugin/

### Browser support
|Browser Version|Support|
|---------------|-------|
|Chrome|[x]|
|FF v46+|[x]|
|IE |[]|
|IE Edge|[]|


### Built With
Protractor, Jasmine, Maven, Allure Reports and BrowserMob Proxy

### Live View CI tests

## Note for DevOps
To live view CI tests the following 2 commands were executed sequentially on the Jenkins machine terminal.

  Xvfb :3 -ac -screen 0, 3600x1450x24 +extension RANDR
 
  x11vnc -display :3 -bg -forever -shared -nopw -listen 10.76.2.40 -xkb
 
## Note for QAs
Kindly install the VNC viewer plugin and connect to Jenkins server at port 5900 i.e. 10.76.2.40:5900 in order to live view the tests.
 
