var angularHomepage = require('../pages/angular-home-page.js');
var using = require('jasmine-data-provider');
var testData = require('../testdata/ships.json')

describe('Das Boot Home Page', function () {
    it('should display Home page', function () {
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
    beforeEach(function () {
        browser.get('http://localhost:9999/index.html');
    });

    // we will use this counter
    var shipsCounter = 0; 
    
    using(testData, function(inputData){
        it(`should add a new ship > ${inputData.name}`, function () {

            var shipwrecksLink = element(by.linkText('Shipwrecks'));
            shipwrecksLink.click();

            var addNewButton = element(by.linkText('Add New Shipwreck'));
            addNewButton.click();

            $('#name').sendKeys(inputData.name);
            $('#description').sendKeys(inputData.description);
            $('#condition').sendKeys(inputData.condition);
            $('#yearDiscovered').sendKeys(inputData.yearDiscovered);
            $('#depth').sendKeys(inputData.depth);
            $('#latitude').sendKeys(inputData.latitude)
            $('#longitude').sendKeys(inputData.longitude)
            $("input[value='Save']").click();

            // check newly added Shipwreck
            var swList = element.all(by.repeater('shipwreck in shipwrecks'));
            var name = swList.get(shipsCounter).element(by.binding('shipwreck.name'));
            var description = swList.get(shipsCounter).element(by.binding('shipwreck.description'));
            var year = swList.get(shipsCounter).element(by.binding('shipwreck.year'));

            expect(name.getText()).toEqual(inputData.name);
            expect(description.getText()).toEqual(inputData.description);
            expect(year.getText()).toEqual(inputData.yearDiscovered);

            shipsCounter++;
        });
    });

    it('should delete Shipwreck', function () {
        var shipwrecksLink = element(by.linkText('Shipwrecks'));``
        shipwrecksLink.click();
    
        var swList = element.all(by.repeater('shipwreck in shipwrecks'));
        
        expect(swList.count()).toEqual(shipsCounter, 
            'Shipwrecks count did not match!');
        
        var deleteButton = swList.get(0).element(by.linkText('Delete'))
        deleteButton.click();
        browser.switchTo().alert().accept();
        
        expect(swList.count()).toEqual(shipsCounter - 1, 
            'Shipwrecks count did not match post delete!');
    });
});
