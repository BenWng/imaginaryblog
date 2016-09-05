(function(){
	angular
	.module("BlogApp")
	.factory("PostService",PostService);


	function PostService($rootScope,$q,$http){

		var service={
			createPost: createPost,
			findPostsAll: findPostsAll,
			findPostById: findPostById,
			findPostsByUserId: findPostsByUserId,
			updatePostById: updatePostById,
			findPostsByTag: findPostsByTag,
			deletePostById: deletePostById
		}

		return service;

		function findPostsAll(searchText){
			return $http.get("/api/project/post?searchText="+searchText);
		}

		function findPostById(id){
			return $http.get("/api/project/post/id/"+id);
		}

		function findPostsByUserId(userId){
			return $http.get("/api/project/post/user/"+userId);
		}

		function createPost(post){
			//console.log(post);
			return $http.post("/api/project/post",post);
		}

		function updatePostById(postId,post){
			//console.log(post);
			return $http.put("/api/project/post/"+postId, post);
		}

		function findPostsByTag(tag){
			//console.log(tag);
			return $http.get("/api/project/post/tag/"+tag);
		}

		function deletePostById(id){
			return $http.delete("/api/project/post/"+id);
		}
	}


})();