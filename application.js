angular.module('todo', [])
    .controller('page', ['$scope', 'todoApi',
        function ($s, $factory) {
            var uiCurrent = 1;
            $s.ui = {
                current: function (newUICurrent) {
                    if (typeof newUICurrent != 'undefined') {
                        uiCurrent = newUICurrent;
                    }
                    return uiCurrent;
                },
                isCurrent: function (c) {
                    return (uiCurrent === c);
                }
            };
            $s.list = $factory.getArrayTab();
        $s.addTab = function () {
        $s.list.push({name:$s.newTab});
        $s.newTab = '';
         };
    }])
    .controller('tab1', ['$scope', 'todoApi',
        function ($s, $factory) {
        $s.list = $factory.getItemTab(1);
        $s.addTodo = function () {
            $s.list.push({name:$s.newItem,complete:false});
            $s.newItem = '';
         };
        $s.DoComplete = function (item){
            if(!item.complete){
                item.complete = true;
            }
            else{
                item.complete = false;
            }
        };
        $s.moveItem = function () {
            $factory.moveItemTab();
            $s.list = [];
            
        };
        $s.clearItem = function () {
            $s.list = [];
        };
        $s.clearComplete = function () {
            var oldTodos = $s.list;
            $s.list = [];
            angular.forEach(oldTodos, function(todo) {
            if (!todo.complete) $s.list.push(todo);
            });
        };
    }
    ])
    .controller('tab2', ['$scope', 'todoApi',
        function ($s, $factory) {
        $s.list = $factory.getItemTab(2);
    }])
    .factory('todoApi', [function () {
    var data = [
        {
            list: 'shopping',
            name: 'buy eggs',
            complete: false
        },
        {
            list: 'shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'business',
            name: 'collect underpants',
            complete: false
        },
        {
            list: 'business',
            name: '...',
            complete: false
        },
        {
            list: 'business',
            name: 'profit',
            complete: false
        }
    ];
    var arrayTab = [{
                name: 'tab1',
            }, {
                name: 'tab2',
            }];
    var itemTab1 = [{
                name: 'buy eggs',
                complete: false
            }, {
                name: 'buy milk',
                complete: true
            }];
    var itemTab2 = [{
            name: 'collect underpants',
            complete: false
        }, {
            name: '...',
            complete: false
        }, {
            name: 'profit',
            complete: false
        }];
    return {
        query: function () {
            return data;
        },
        get: function (id) {
            return data[id];
        },
        create: function(obj) {
            data.push(obj);
            return obj;
        },
        update: function(id, obj) {
            data[id] = obj;
            return obj;
        },
        destroy: function(id) {
            data.splice(id, 1);
            return data;
        },
        getArrayTab: function(){
            return arrayTab;
        },
        getItemTab: function(tabName){
            if(tabName == "1"){
                return itemTab1;
            }
            else if(tabName == "2"){
                return itemTab2;
            }

        },
        moveItemTab: function(){
            angular.forEach(itemTab1, function(item){
                itemTab2.push(item);
            });
        }
    };
}]);
