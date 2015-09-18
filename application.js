angular.module('todo', [])
    .controller('page', ['$scope',
        function ($s) {
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
            $s.list = [{
                name: 'tab1',
            }, {
                name: 'tab2',
            }];

    }])
    .controller('tab1', ['$scope',
        function ($s) {
            $s.list = [{
                name: 'buy eggs',
                complete: false
            }, {
                name: 'buy milk',
                complete: true
            }];
        $s.addTodo = function () {
        $s.list.push({name:$s.newItem,complete:false});
        $s.newItem = '';
         };
        $s.DoComplete = function (item){
            if(item.complete == false){
                item.complete = true;
            }
            else{
                item.complete = false;
            }
        };
        $s.moveItem = function () {

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
    .controller('tab2', ['$scope',
        function ($s) {
        $s.list = [{
            name: 'collect underpants',
            complete: false
        }, {
            name: '...',
            complete: false
        }, {
            name: 'profit',
            complete: false
        }];
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
        }
    };
}]);
