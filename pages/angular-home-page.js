var AngularHomePage = function () {
    var nameInput = element(by.model('yourName'));
    var greeting = element(by.binding('yourName'));

    this.get = function () {
        browser.get('http://www.angularjs.org');
    };

    this.setName = function (name) {
        nameInput.sendKeys(name);
    };

    this.getGreetingText = function () {
        return greeting.getText();
    };
};

module.exports = new AngularHomePage();