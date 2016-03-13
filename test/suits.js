/* eslint-disable */

var phantomcss = require('phantomcss/phantomcss.js');
var fs = require('fs');

phantom.casperTest = true;
phantom.casperPath = fs.workingDirectory + '/node_modules/casperjs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

var casper = require('casper').create({
    pageSettings: {
        loadImages:  true
    },
    viewportSize: {
        width: 360,
        height: 400
    }
});

phantomcss.init({
    casper: casper,
    libraryRoot: fs.absolute(fs.workingDirectory + '/node_modules/phantomcss'),
    screenshotRoot: fs.absolute(fs.workingDirectory + '/phantomcss/screenshots'),
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/phantomcss/diff/failures'),
    comparisonResultRoot: fs.absolute(fs.workingDirectory + '/phantomcss/diff/results'),
    cleanupComparisonImages: false,
    addIteratorToImage: false,
    addLabelToFailedImage: false,
    onFail: function(test) { // to get base64 of image from terminal
        console.log('===Diff===');
        var file = test.filename.replace('.png', '.diff.png');
        console.log(casper.base64encode(file));

        console.log('===Fail===');
        file = test.filename.replace('.png', '.fail.png');
        console.log(casper.base64encode(file));
    }
});

casper.test.begin('Visual testing', 1, function (test) {
    casper.start(fs.absolute(fs.workingDirectory + '/build/index.html'));

    casper.then(function () {
        casper.echo('Capturing...');
        phantomcss.screenshot('body', 1000, null, 'example');
    });

    casper.then(function () {
        phantomcss.compareAll();
    });

    casper.run(function () {
        test.done();
        phantom.exit(phantomcss.getExitStatus());
    });
});
