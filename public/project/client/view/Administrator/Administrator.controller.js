(function(){
    angular
        .module("BlogApp")
        .controller("adminController", adminController);
})();



function adminController($scope,$rootScope,$location,$routeParams,PostService,UserService){

    UserService.findUsersAll()
        .then(function(res){
            $scope.users=res.data;
        })
    $scope.findUserById=function(id){
        UserService.findUserById(id)
            .then(function(res){
                $scope.user=res.data;
                console.log($scope.user);
            })
    }

    $scope.deleteUserById=function(id){
        var r=confirm("'Are you sure you want to delete this user?");
        if (r==true) {
            UserService.deleteUserById(id)
                .then(function (res) {
                    $scope.users = res.data;
                })
        }
    }

    $scope.updateUserById=function(id,user){
        console.log(user);
        UserService.updateUserById(id,user)
            .then(function(res){
                $scope.users = res.data;
            })
    }


}