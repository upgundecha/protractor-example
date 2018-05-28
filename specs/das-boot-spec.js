var dasBootHomePage = require('../pages/das-boot-home-page.js');
var using = require('jasmine-data-provider');
var testData = require('../testdata/ships.json')

describe('Das Boot Home Page', function () {
    it('should display Home page', function () {

        dasBootHomePage.get();

        expect(dasBootHomePage.getHomePageLink()
            .isPresent()).toBeTruthy('Unable to find Home Link');

        expect(dasBootHomePage.getShipwrecksLink()
            .isPresent()).toBeTruthy('Unable to find Shipwrecks Link');

        expect(dasBootHomePage.getClickHereLink()
            .isPresent()).toBeTruthy('Unable to find Click Here! » Link');
    });
});

describe('Das Boot Shipwrecks List', function () {
    beforeEach(function () {
        browser.get('http://localhost:9999/index.html');
    });

    // use ship records from the test data file
    using(testData, function (inputData) {
        it(`should add a new ship > ${inputData.name}`, function () {

            // go to the list page
            var shipwrecksLink = element(by.linkText('Shipwrecks'));
            shipwrecksLink.click();

            // press add new button to add a new record
            var addNewButton = element(by.linkText('Add New Shipwreck'));
            addNewButton.click();

            // enter values
            $('#name').sendKeys(inputData.name);
            $('#description').sendKeys(inputData.description);
            $('#condition').sendKeys(inputData.condition);
            $('#yearDiscovered').sendKeys(inputData.yearDiscovered);
            $('#depth').sendKeys(inputData.depth);
            $('#latitude').sendKeys(inputData.latitude)
            $('#longitude').sendKeys(inputData.longitude)
            $("input[value='Save']").click();


            // get ship list
            var swList = element.all(by.repeater('shipwreck in shipwrecks'));

            // check newly added Shipwreck which is added at the last position
            var name = swList.last().element(by.binding('shipwreck.name'));
            var description = swList.last().element(by.binding('shipwreck.description'));
            var year = swList.last().element(by.binding('shipwreck.year'));

            expect(name.getText()).toEqual(inputData.name);
            expect(description.getText()).toEqual(inputData.description);
            expect(year.getText()).toEqual(inputData.yearDiscovered);
        });
    });

    it('should view a record', function () {
        // record to validate
        var ship = testData[0];

        // go to the list page
        var shipwrecksLink = element(by.linkText('Shipwrecks'));
        shipwrecksLink.click();

        // get ship list
        var swList = element.all(by.repeater('shipwreck in shipwrecks'));

        // open first ship record
        var viewButton = swList.first().element(by.linkText('View'))
        viewButton.click();

        // get all the fields
        // there are two name fields on the page
        var name = element.all(by.binding('shipwreck.name'));

        // get rest of the fields
        var description = element(by.binding('shipwreck.description'));
        var condition = element(by.binding('shipwreck.condition'));
        var year = element(by.binding('shipwreck.year'));
        var depth = element(by.binding('shipwreck.depth'));
        var latitude = element(by.binding('shipwreck.latitude'));

        // check the values
        expect(name.get(0).getText()).toEqual(`Details for ${ship.name}`);
        expect(name.get(1).getText()).toEqual(ship.name);
        expect(description.getText()).toEqual(ship.description);
        expect(condition.getText()).toEqual(ship.condition);
        expect(year.getText()).toEqual(ship.yearDiscovered);
        expect(depth.getText()).toEqual(ship.depth);
        expect(latitude.getText()).toEqual(`${ship.latitude}, ${ship.longitude}`);
    });

    it('should edit a record', function () {
        newShipName = 'U Boat';

        // go to the list page       
        var shipwrecksLink = element(by.linkText('Shipwrecks'));
        shipwrecksLink.click();

        // get ship list
        var swList = element.all(by.repeater('shipwreck in shipwrecks'));

        // open first ship record
        var viewButton = swList.first().element(by.linkText('View'))
        viewButton.click();

        // press edit button to get in to edit mode
        var editButton = element(by.linkText('Edit'));
        editButton.click();

        // change name of the ship
        $('#name').clear();
        $('#name').sendKeys(newShipName);
        $("input[value='Save']").click();

        // get ship list
        var swList = element.all(by.repeater('shipwreck in shipwrecks'));

        // updated record moves to the end of the list
        var name = swList.last().element(by.binding('shipwreck.name'));

        // check updated name
        expect(name.getText()).toEqual(newShipName);
    });

    it('should delete a record', function () {
        // go to the list page       
        var shipwrecksLink = element(by.linkText('Shipwrecks'));
        shipwrecksLink.click();

        // get ship list
        var swList = element.all(by.repeater('shipwreck in shipwrecks'));

        var deleteButton = swList.first().element(by.linkText('Delete'))
        deleteButton.click();

        // pressing delete button displays confirmation alert
        browser.switchTo().alert().accept();

        // check count of ships after deleting a record
        expect(swList.count()).toEqual(2,
            'Shipwrecks count did not match after deleting the record!');
    });
});