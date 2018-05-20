var angularHomepage = require('../pages/angular-home-page.js');

describe('Das Boot Home Page', function () {
    it('should display menu', function () {
        browser.get('http://localhost:9999/index.html');

        var homeLink = element(by.linkText("Home"));
        var shipwrecksLink = element(by.linkText("Shipwrecks"));
        var clickHereLink = element(by.linkText("Click Here! »"));

        expect(homeLink.isPresent()).toBeTruthy('Unable to find Home Link');
        expect(shipwrecksLink.isPresent()).toBeTruthy('Unable to find Shipwrecks Link');
        expect(clickHereLink.isPresent()).toBeTruthy('Unable to find Click Here! » Link');
    });
});

describe('Das Boot Shipwrecks List', function () {
    it('should add a new Shipwreck', function () {
        browser.get('http://localhost:9999/index.html');
        
        var shipwrecksLink = element(by.linkText('Shipwrecks'));
        shipwrecksLink.click();

        var addNewButton = element(by.linkText('Add New Shipwreck'));
        addNewButton.click();

        $('#name').sendKeys('U Boat 66');
        $('#description').sendKeys('German U Boat 66');
        $('#condition').sendKeys('Fair');
        $('#yearDiscovered').sendKeys('2000');
        $('#depth').sendKeys('1000');
        $('#latitude').sendKeys('12.00')
        $('#longitude').sendKeys('12.00')
        $("input[value='Save']").click();

        // check newly added Shipwreck
        var swList = element.all(by.repeater('shipwreck in shipwrecks'));
        expect(swList.count()).toEqual(1, 'Shipwrecks count did not match!');
        expect(swList.get(0).getText()).toEqual('U Boat 66 German U Boat 66 2000 View Delete');
    });
});
