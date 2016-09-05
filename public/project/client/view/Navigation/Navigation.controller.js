(function(){
	  angular
		.module("BlogApp")
		.controller("navigationController", navigationController);
})();


function navigationController($http,$rootScope,$scope,$location){




	$http.get("/loggedin")
				.success(function(user){
					if (user != "0"){
					$rootScope.currentUser=user;
					$scope.currentUser=$rootScope.currentUser;
					//console.log($rootScope.currentUser._id);
						if (user.role=="Admin"){
							$scope.admin_navigation_show=true;
						}
					}
					else
					{
						$rootScope.currentUser=null;
						$scope.currentUser=null;
					}
				});

		$scope.currentPost=$rootScope.currentPost;
		$scope.searching=function(){
			$location.path("/home").search('searchText',$scope.searchText);
		}
		$scope.logout=function(){
			$http.get("/logout");
			$scope.currentUser=null;
			$rootScope.currentUser=null;
			$scope.admin_navigation_show=null;
			$location.path('/home');
		}

}
