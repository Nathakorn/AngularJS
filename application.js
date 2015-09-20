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
            $factory.addTab({name:$s.newTab});
        };
    }])
    .controller('tab1', ['$scope', 'todoApi',
        function ($s, $factory) {
        $s.list = $factory.getItemTab(1);
        $s.addTodo = function () {
            $factory.addToDo(1,{name:$s.newItem,complete:false});
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
            $factory.moveItemTab(1);
            
        };
        $s.clearItem = function () {
            $factory.clearAll(1);
        };
        $s.clearComplete = function () {
            $factory.clearComplete(1);
        };
    }
    ])
    .controller('tab2', ['$scope', 'todoApi',
        function ($s, $factory) {
        $s.list = $factory.getItemTab(2);
        $s.addTodo = function () {
            $factory.addToDo(2,{name:$s.newItem,complete:false});
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
            $factory.moveItemTab(2);
            
        };
        $s.clearItem = function () {
            $factory.clearAll(2);
        };
        $s.clearComplete = function () {
            $factory.clearComplete(2);
        };
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
        addTab: function(tabObject){
            arrayTab.push(tabObject);
        },
        addToDo: function(tabName,itemObject){
            if(tabName == "1"){
                itemTab1.push(itemObject);
             }   
            else if(tabName == "2"){
                itemTab2.push(itemObject);
            }
        },
        getItemTab: function(tabName){
            if(tabName == "1"){
                return itemTab1;
            }
            else if(tabName == "2"){
                return itemTab2;
            }
        },
        clearAll: function(tabName){
            if(tabName == "1"){
                itemTab1.length = 0;
            }
            else if(tabName == "2"){
                itemTab2.length = 0;
            }
        },
        clearComplete: function(tabName){
            if(tabName == 1){  
                var oldTodos = [];
                angular.forEach(itemTab1, function(todo) {
                    oldTodos.push(todo);
                });
                itemTab1.length = 0;
                angular.forEach(oldTodos, function(todo) {
                if (!todo.complete){
                    itemTab1.push(todo);
                }
                });
            }  
            else if(tabName == 2){
                 var oldTodos = [];
                angular.forEach(itemTab2, function(todo) {
                    oldTodos.push(todo);
                });
                itemTab2.length = 0;
                angular.forEach(oldTodos, function(todo) {
                if (!todo.complete){
                    itemTab2.push(todo);
                }
                });
            }
        },
        moveItemTab: function(tabName){
          if(tabName == 1){  
            var i;
            for(i = 0; i < itemTab1.length; i++){
                itemTab2.push(itemTab1[i]);
            }
            itemTab1.length = 0;
          }  
          else if(tabName == 2){
            var i;
            for(i = 0; i < itemTab2.length; i++){
                itemTab1.push(itemTab2[i]);
            }
            itemTab2.length = 0;
          }
        }
    };
}]);
