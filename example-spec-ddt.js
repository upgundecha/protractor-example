var using = require('jasmine-data-provider');

var angularHomepage = require('./angular-home-page.js');
var testData = require('./test-data.json')

describe('Angularjs homepage', function() {
    using(testData, function(inputData){
        it(`should great the named user ${inputData.name}`, function(){
            browser.get('http://www.angularjs.org');
    
            var name = inputData.name

            element(by.model('yourName')).sendKeys(name);
            var greeting = element(by.binding('yourName'));
            
            expect(greeting.getText()).toEqual(`Hello ${name}!`, 'Greeting message did not match!');
        });
    });
});