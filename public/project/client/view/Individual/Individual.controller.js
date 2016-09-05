(function(){
	  angular
		.module("BlogApp")
		.controller("individualController", individualController);
})();


/*function homeController($scope,$rootScope,PostService){
	var model=this;
	model.posts=PostService.findPostsAll();

}*/


function individualController($scope,$rootScope, $routeParams,PostService,UserService){

	//$scope.post=$rootScope.posts.filter(function(x){
	//		return x.id===$routeParams.id;
	//	})[0];
	//}




	PostService.findPostById($routeParams.id)
				.then(function(res){
					$scope.post=res.data;

					UserService.findUserById($scope.post.userId)
							.then(function(res){
								if (res.data == null){
									$scope.author="N/A (this author is deleted)";
									$scope.existing=false;
								}
								else {
									$scope.author = res.data.Name;
									$scope.existing=true;
								}
							})


					if ($rootScope.currentUser==null) {
						$scope.allowEdit= false;
					}
					else{
						// The boolean predicative decides if the Editor buttons shows or not
						$scope.allowEdit = $rootScope.currentUser._id == $scope.post.userId || $rootScope.currentUser.role=="Admin";

						// The boolean predicative decides if the follow or unfollow buttons show
						$scope.buttonShow= $rootScope.currentUser._id != $scope.post.userId;


						// The boolean predicative decides if the currentUser has already followed the creator of this post
						$scope.followAlready=$rootScope.currentUser.following.indexOf($scope.post.userId) != -1;



						$scope.followShow = $scope.buttonShow && (! $scope.followAlready);

						$scope.unfollowShow = $scope.buttonShow && $scope.followAlready;
					}
						$scope.tags=$scope.post.tags;
				});

	$scope.followThisPerson=function(){



		UserService.followThisPerson($rootScope.currentUser._id,{"idolId": $scope.post.userId})
				.then(function(doc){
					$scope.currentUser=doc.data;
					$rootScope.currentUser=$scope.currentUser;
					//console.log($rootScope.currentUser);
				});
		$scope.followShow=false;
		$scope.unfollowShow=true;
	};

	$scope.unfollowThisPerson=function(){
		UserService.unfollowThisPerson($rootScope.currentUser._id,{"idolId":$scope.post.userId})
				.then(function(doc){
					$scope.currentUser=doc.data;
					$rootScope.currentUser=$scope.currentUser;
					//console.log($rootScope.currentUser);
				})
		$scope.followShow=true;
		$scope.unfollowShow=false;
	};
}
