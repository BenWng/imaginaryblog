(function(){
	  angular
		.module("BlogApp")
		.controller("homeController", homeController);
})();


/*function homeController($scope,$rootScope,PostService){
	var model=this;
	model.posts=PostService.findPostsAll();

}*/


function homeController($scope,$rootScope,$location,PostService,UserService){
	// console.log($location.search().user);
	var userId=$location.search().user;
	var tag=$location.search().tag;
	var searchText=$location.search().searchText;


	var authorapp= {
		findAuthor:	function(posts)
		{

			var returnedPosts=posts;
			for(i=0; i<returnedPosts.length; i++) {
				var post=returnedPosts[i];
				var post_author=(function (x){
					UserService.findUserById(x.userId)
						.then(function (res) {
							if (res.data==null){
								x["author"]="N/A";
							}
							else {
								x["author"] = res.data.Name;
							}
						})
					return x;
				})(post);
				returnedPosts[i]=post_author;
				//console.log(returnedPosts[i]);
			}
			return returnedPosts;
		}
	}



	if (userId && searchText==undefined) {
		PostService.findPostsByUserId($location.search().user)
				.then(function (res) {
					$scope.posts = res.data;
					$scope.posts=authorapp.findAuthor($scope.posts);
				});
	}

	else if (tag){
		PostService.findPostsByTag($location.search().tag)
				.then(function(res){
					$scope.posts=res.data;
					$scope.posts=authorapp.findAuthor($scope.posts);
				});
	}
	else{
		PostService.findPostsAll($location.search().searchText)
				.then(function (res) {
					$scope.posts = res.data;
					$scope.posts=authorapp.findAuthor($scope.posts);
				});

	}
}



