describe('angularjs homepage', function() {
    it('should great the named user', function(){
        browser.get('http://www.angularjs.org');

        element(by.model('yourName')).sendKeys('Unmesh');
        var greeting = element(by.binding('yourName'));
        
        expect(greeting.getText()).toEqual('Hello Unmesh!');
    });
});