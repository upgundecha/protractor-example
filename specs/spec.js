describe('Protractor Demo App', function () {

    // Iteration 1 - Simple Scenarios
    /*
    it('should have a tile', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should add one and two', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
        element(by.model('first')).sendKeys(1);
        element(by.model('second')).sendKeys(2);

        element(by.id('gobutton')).click();

        expect(element(by.binding('latest')).getText()).toEqual('3');
    });
    */

    // Iteration 2 - Multiple Scenarios

    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));


    beforeEach(function () {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should add one and two', function () {
        firstNumber.sendKeys(1);
        secondNumber.sendKeys(2);

        goButton.click();

        expect(latestResult.getText()).toEqual('3', 'Result did not match!');
    });

    it('should add four and six', function () {
        firstNumber.sendKeys(4);
        secondNumber.sendKeys(6);

        goButton.click();

        expect(latestResult.getText()).toEqual('10');
    });

    it('should read the value from an input', function () {
        firstNumber.sendKeys(1);
        expect(firstNumber.getAttribute('value')).toEqual('1', 'Result did not match!');
    });


    // Iteration 3 - lists of elements
    var history = element.all(by.repeater('result in memory'));

    function add(a, b) {
        firstNumber.sendKeys(a);
        secondNumber.sendKeys(b);
        goButton.click();
    }

    it('should have a history', function () {
        add(1, 2);
        add(3, 4);

        expect(history.last().getText()).toContain('1 + 2', 'Could not find the last expression');

        expect(history.count()).toEqual(2, 'History count did not match!');

        add(5, 6);

        expect(history.count()).toEqual(3, 'History count did not match!');
    });
});