var DasBootHomePage = function () {

    var homeLink = element(by.linkText("Home"));
    var shipwrecksLink = element(by.linkText("Shipwrecks"));
    var clickHereLink = element(by.linkText("Click Here! »"));

    this.get = function () {
        browser.get('http://localhost:9999/index.html');
    };

    this.openHomePage = function () {
        homeLink.click();
    };

    this.getHomePageLink = function () {
        return homeLink;
    };

    this.openShipwrecksList = function () {
        shipwrecksLink.click();
    };

    this.getShipwrecksLink= function () {
        return shipwrecksLink;
    };


    this.getClickHereLink = function () {
        return clickHereLink;
    }
};

module.exports = new DasBootHomePage();