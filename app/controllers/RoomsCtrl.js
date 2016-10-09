angular.module('chatMod').controller('RoomsCtrl',function($scope){
$scope.rooms=$scope._rooms=[{name:'JAVA'},{name:'JAVASCRIPT'}];
$http({
    url:'/rooms',
    method:'GET'
}).success(function(result){
   if(result.err==0){
       $scope.rooms=$scope._rooms=result.data;
   }else{
       $rootScope.errorMsg=result.msg;
   }
})
$scope.filter=function(){
    var keyword=$scope.keyword;
  $scope.rooms= $scope._rooms.filter(function(item){
       return item.name.indexOf(keyword) !=-1

    })
}
$scope.createRoom=function(){
  $http({
      url:'/rooms',
      method:'POST',
      data:{name:$scope.keyword}
  }).success(function(result){
     if(result.err==0){
         $scope._rooms.push(result.data);
         $scope.filter();
     }else{
         $scope.errorMsg=result.msg;
     }

  })

}

    $scope.gogogo = function(_id){
        $location.path('/rooms/'+_id);
    }

});
