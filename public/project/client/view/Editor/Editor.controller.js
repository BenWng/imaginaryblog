(function(){
	  angular
		.module("BlogApp")
		.controller("editorController", editorController);
})();


function editorController($scope,$rootScope,$location,$routeParams,PostService,UserService){

	var postId=$routeParams.id;

	//console.log(postId);

	if (postId) {
		PostService.findPostById(postId)
				.then(function (res) {
					$scope.post = res.data;
					//console.log($scope.post);
				});
	};



	$scope.submitPost=function(){
		console.log($scope.post.tags);
		if(Array.isArray($scope.post.tags)) {
			if ($scope.post.tags.length === 1) {
				$scope.post.tags = $scope.post.tags[0].split(',');
				for (var i=0; i<$scope.post.tags.length; i++){
					$scope.post.tags[i]	= $scope.post.tags[i].replace(/(^\s+|\s+$)/g, '');
				}
			}
		}
		else{
			$scope.post.tags = $scope.post.tags.split(',');
			for (var i=0; i<$scope.post.tags.length; i++){
				$scope.post.tags[i]	= $scope.post.tags[i].replace(/(^\s+|\s+$)/g, '');
			}
		}

		PostService.updatePostById(postId,$scope.post)
				.then(function(){
					$location.path("/home");
				})
	}


	$scope.deletePost=function(){
		var r=confirm("'Are you sure you want to delete this post?");
		if (r==true) {
			PostService.deletePostById(postId)
					.then(function () {
						$location.path("/home");
					})
		}

	}
}