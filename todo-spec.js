describe('todo list application', function() {
    it('should add a todo', function(){
        // navigate to the site
        browser.get('https://angularjs.org');

        // add a new todo
        element(by.model('todoList.todoText')).sendKeys('Write first Protractor test');
        element(by.css('[value="add"')).click();

        // check newly added todo
        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('Write first Protractor test');

        // cross it off the todo
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).toEqual(2);
    });
});