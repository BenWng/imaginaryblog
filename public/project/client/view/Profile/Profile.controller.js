(function(){
    angular
        .module("BlogApp")
        .controller("profileController", profileController);
})();



function profileController($scope,$http,$rootScope,$location,$routeParams,PostService,UserService){

    $scope.myPeople=[];

    var peopleDetail= {
        addDetail: function (links)
        {
            var people = [];
            for (var i = 0; i < links.length; i++) {
                var onePerson = (function (x) {
                    UserService.findUserById(x)
                        .then(function (res) {
                            //console.log(res.data);
                            if (res.data!= null) {
                                people.push(res.data);
                                $scope.myPeople.push(res.data);
                            }
                            return res.data;
                        })
                })(links[i]);
                //console.log(onePerson);
            }
            return people;
        }
    };


    $http.get("/loggedin")
        .success(function(user) {
            if (user != "0") {
                $scope.currentUser = user;
                $scope.peopleLinks = $scope.currentUser.following;
                peopleDetail.addDetail($scope.peopleLinks);
            }
        });

    $scope.deleteIdol=function(idol) {
        var r = confirm("'Are you sure you want to unfollow this person?");
        if (r == true) {
            for (var i = $scope.myPeople.length - 1; i >= 0; i--) {
                if ($scope.myPeople[i]._id === idol._id) {
                    $scope.myPeople.splice(i, 1);
                }
            }

            UserService.unfollowThisPerson($rootScope.currentUser._id, {"idolId": idol._id})
                .then(function (doc) {
                    $scope.currentUser = doc.data;
                    $rootScope.currentUser = $scope.currentUser;
                    console.log($rootScope.currentUser);
                })

        }
    }
}