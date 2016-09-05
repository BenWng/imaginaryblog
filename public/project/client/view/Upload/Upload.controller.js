(function(){
	  angular
		.module("BlogApp")
		.controller("uploadController", uploadController);
})();


function uploadController($scope,$rootScope,$location,$routeParams,PostService,UserService){

	$scope.currentUserId=$rootScope.currentUser._id;
	$scope.currentUserName=$rootScope.currentUser.Name;

	$scope.uploadNewPost=function(){
		$scope.post.userId=$scope.currentUserId;
		//$scope.post.author=$scope.currentUserName;
		$scope.tagsArray=$scope.post.tags.split(',');
		$scope.post.tags=$scope.tagsArray;
		$scope.post.youtube="http://www.youtube.com/embed/"+$scope.post.youtube+"?autoplay=0";
		for (var i=0; i<$scope.post.tags.length; i++){
			$scope.post.tags[i]	= $scope.post.tags[i].replace(/(^\s+|\s+$)/g, '');
		}
		PostService.createPost($scope.post)
		.then(function(){
			$location.path("/home");
		})
	}
}