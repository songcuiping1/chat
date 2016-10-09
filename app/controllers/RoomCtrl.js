angular.module('chatMod').controller('RoomCtrl',function($scope,$routeParams,$rootScope,$http){
    var roomId=$routeParams.id;
    $http({
        url:`/rooms/${roomId}`,
        method:'GET'
    }).success(function(result){
       if(result.err==0){
           $scope.room=result.data;
       }else{
           $rootScope.errorMsg=result.msg;
       }

    })
var socket=io.connect('ws://localhost:9090');
    socket.on('message',function(msgObj){
        $scope.room.messages.push()

    });
    $scope.send=function(event){
      socket.send({user:$rootScope.user._id,content:$scope.content});

    }
})
