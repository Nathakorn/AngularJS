angular.module('todo', [])
    .controller('page', ['$scope', 'todoApi', 
        function ($s, $factory, $sce) {
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
        $s.toTrustedHTML = function( html ){
            return $sce.trustAsHtml( html );
        }

    }])
    .controller('tab1', ['$scope', 'todoApi',
        function ($s, $factory) {
        $s.list = $factory.getItemTab(1);
        $s.addTodo = function () {
            $factory.addToDo(1,{name:$s.newItem,complete:false,move:false});
            
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
        $s.doMove = function (item){
            if(!item.move){
                item.move = true;
            }
            else{
                item.move = false;
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
            $factory.addToDo(2,{name:$s.newItem,complete:false,move: false});
            $s.newItem = '';
         };
        $s.doMove = function (item){
            if(!item.move){
                item.move = true;
            }
            else{
                item.move = false;
            }
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
    .controller('OtherTab', ['$scope', 'todoApi',
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
                html: ''
            }, {
                name: 'tab2',
                html: ''
            }];
    var itemTab1 = [{
                name: 'buy eggs',
                complete: false,
                move: false
            }, {
                name: 'buy milk',
                complete: true,
                move: false
            }];
    var itemTab2 = [{
            name: 'collect underpants',
            complete: false,
                move: false
        }, {
            name: '...',
            complete: false,
                move: false
        }, {
            name: 'profit',
            complete: false,
                move: false
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
              var moveResult = [];
              var oldTodos = [];
                angular.forEach(itemTab1, function(todo) {
                    oldTodos.push(todo);
                });
                itemTab1.length = 0;
                angular.forEach(oldTodos, function(todo) {
                if (!todo.move){
                    itemTab1.push(todo);
                }
                else{
                    moveResult.push(todo);
                }
                });
            var i;
            for(i = 0; i < moveResult.length; i++){
                moveResult[i].move = false;
                itemTab2.push(moveResult[i]);
            }
            
          }  
          else if(tabName == 2){
             var moveResult = [];
              var oldTodos = [];
                angular.forEach(itemTab2, function(todo) {
                    oldTodos.push(todo);
                });
                itemTab2.length = 0;
                angular.forEach(oldTodos, function(todo) {
                if (!todo.move){
                    itemTab2.push(todo);
                }
                else{
                    moveResult.push(todo);
                }
                });
            var i;
            for(i = 0; i < moveResult.length; i++){
                moveResult[i].move = false;
                itemTab1.push(moveResult[i]);
            }
            
          }
        }
    };
}]);
