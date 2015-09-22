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
            $s.tabList = $factory.getArrayTab();
            
        $s.addTab = function () {
            $factory.addTab({name:$s.newTab});
        };
    }])
    .controller('tabs', ['$scope', 'todoApi',
        function ($s, $factory){
            $s.list = $factory.query();
        $s.addTodo = function (name){
            $factory.addToDo({name:$s.newItem,inTab:name,complete:false,move:false});
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
        $s.moveItem = function (currentTabName,destinationTabName) {
            $factory.moveItemTab(currentTabName,destinationTabName);
        };
        $s.clearItem = function (tabName){
            $factory.clearAll(tabName);
        };
        $s.clearComplete = function (tabName) {
            $factory.clearComplete(tabName);
        };
    }
    ])
    .factory('todoApi', [function () {
        var arrayTab = [{
                    name: 'tab1',
                }, {
                    name: 'tab2',
                }];
        var allItem = [{
                    name: 'buy eggs',
                    inTab: 'tab1',
                    complete: false,
                    move: false
                }, {
                    name: 'buy milk',
                    inTab: 'tab1',
                    complete: true,
                    move: false
                },  {
                    name: 'collect underpants',
                    inTab: 'tab2',
                    complete: false,
                    move: false
                }, {
                    name: '...',
                    inTab: 'tab2',
                    complete: false,
                    move: false
                }, {
                    name: 'profit',
                    inTab: 'tab2',
                    complete: false,
                    move: false
                }
    ];
    return {
        query: function () {
            return allItem;
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
        addToDo: function(itemObject){
            allItem.push(itemObject);
        },
        getItemTab: function(tabName){
            var itemList = [];
            angular.forEach(allItem, function(todo) {
                if (todo.inTab == tabName){
                    itemList.push(todo);
                }
            });
            return itemList;
        },
        clearAll: function(tabName){
           var i = 0;
           while(i < allItem.length){
                if(allItem[i].inTab == tabName){
                    allItem.splice(i,1);
                }else{
                    i++;
                }
            }
        },
        clearComplete: function(tabName){
            var i = 0;
           while(i < allItem.length){
                if(allItem[i].inTab == tabName && allItem[i].complete){
                    allItem.splice(i,1);
                }else{
                    i++;
                }
            }
        },
        moveItemTab: function(name,destinationTab){
           var i = 0;
           while(i < allItem.length){
                if(allItem[i].inTab == name && allItem[i].move){
                    console.log(allItem[i].inTab);
                    allItem[i].inTab = destinationTab;
                    console.log(allItem[i].inTab);
                    allItem[i].move = false;
                    console.log(allItem[i]);
                }else{
                    i++;
                }
            }
            
        }
    };
}]);
