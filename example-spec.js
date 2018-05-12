var angularHomepage = require('./angular-home-page.js');

describe('Angularjs homepage', function () {

    it('should great the named user', function () {
        browser.get('http://www.angularjs.org');

        element(by.model('yourName')).sendKeys('Unmesh');
        var greeting = element(by.binding('yourName'));

        expect(greeting.getText()).toEqual('Hello Unmesh!', 'Greeting message did not match');
    });
    1
    // Using PageObject
    it('should greet the named user1 - using pageobject', function () {
        angularHomepage.get();
        angularHomepage.setName('Julie');
        expect(angularHomepage.getGreetingText()).toEqual('Hello Julie!', 'Greeting message did not match');
    });
});