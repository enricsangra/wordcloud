# wordcloud
Simple single page application.

## Setup
With Node.js installed in your machine, run npm install in the project folder.

## Building the app
The generation of the bundles is managed through Grunt.
Running "grunt" will create the new builds for the JS and the CSS files with a minimized and not minimized versions.

## Running the tests
The tests are written with Jasmine and run with Karma.
To run the tests, use the command "karma start" and open http://localhost:9876 in the browser you want to test.
Automatically the console will show the results.
There's a watcher configured to the files. Every time they are saved, the tests will run for all the browsers listening.

## Testing in browser
The package "http-server" is also installed to be able to run the application if needed in the browser.
Run "http-server" in console and access through http://localhost:8080/topic_cloud.html#topic_cloud to the app.

## Modifying the data
The data used for the collection of topics can be found at "data/topics.json" file. Modify this to add new topics if necessary.