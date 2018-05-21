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

    using(testData, function (inputData) {
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

    it('should view a record', function () {

        var ship = {
            name: "U Boat 66",
            description: "German U Boat 66",
            condition: "Fair",
            yearDiscovered: "2000",
            depth: "1000",
            latitude: "49.395203",
            longitude: "-37.302391"
        }

        var shipwrecksLink = element(by.linkText('Shipwrecks'));
        shipwrecksLink.click();

        var swList = element.all(by.repeater('shipwreck in shipwrecks'));
        var viewButton = swList.get(0).element(by.linkText('View'))
        viewButton.click();

        var name = element.all(by.binding('shipwreck.name'));
        var description = element(by.binding('shipwreck.description'));
        var condition = element(by.binding('shipwreck.condition'));
        var year = element(by.binding('shipwreck.year'));
        var depth = element(by.binding('shipwreck.depth'));
        var latitude = element(by.binding('shipwreck.latitude'));

        expect(name.get(0).getText()).toEqual(`Details for ${ship.name}`);
        expect(name.get(1).getText()).toEqual(ship.name);
        expect(description.getText()).toEqual(ship.description);
        expect(condition.getText()).toEqual(ship.condition);
        expect(year.getText()).toEqual(ship.yearDiscovered);
        expect(depth.getText()).toEqual(ship.depth);
        expect(latitude.getText()).toEqual(`${ship.latitude}, ${ship.longitude}`);
    });

    it('should edit a record', function() {

        newShipName = 'U Boat';

        var shipwrecksLink = element(by.linkText('Shipwrecks'));
        shipwrecksLink.click();

        var swList = element.all(by.repeater('shipwreck in shipwrecks'));
        
        var viewButton = swList.first().element(by.linkText('View'))
        viewButton.click();

        var editButton = element(by.linkText('Edit'));
        editButton.click();
        
        $('#name').clear();
        $('#name').sendKeys(newShipName);
        $("input[value='Save']").click();

        var swList = element.all(by.repeater('shipwreck in shipwrecks'));
        
        // updated record moves to the end of the list
        var name = swList.last().element(by.binding('shipwreck.name'));
        expect(name.getText()).toEqual(newShipName);
    });

    it('should delete a record', function () {
        var shipwrecksLink = element(by.linkText('Shipwrecks')); 
        shipwrecksLink.click();

        var swList = element.all(by.repeater('shipwreck in shipwrecks'));

        expect(swList.count()).toEqual(shipsCounter,
            'Shipwrecks count did not match!');

        var deleteButton = swList.first().element(by.linkText('Delete'))
        deleteButton.click();
        browser.switchTo().alert().accept();

        expect(swList.count()).toEqual(shipsCounter - 1,
            'Shipwrecks count did not match post delete!');
    });
});
