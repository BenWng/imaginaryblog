var q=require("q");


module.exports = function (app, mongoose, db) {

		var PostSchema = require ("../schema/post.schema.js")(app,mongoose,db);
		var PostModel = mongoose.model("PostModel", PostSchema);

		var api = {
			createPost: createPost,
			updatePostById : updatePostById,
			deletePostById : deletePostById,
			findPostsAll: findPostsAll,
			findPostById: findPostById,
			findPostsByTag: findPostsByTag,
			findPostsByUserId: findPostsByUserId,
		};

		return api;

		function createPost(post){
			var deferred = q.defer();
			//console.log(post);
			PostModel.create(post,function(err,doc){
				PostModel.find(function(err,posts){
					deferred.resolve(posts);
				})
			})
			return deferred.promise;
		}

		function updatePostById(id,updatedPost){
			var deferred = q.defer();

			PostModel.update({_id:id},{$set:{
				title: updatedPost.title,
				youtube: updatedPost.youtube,
				time: updatedPost.time,
				tags: updatedPost.tags,
				shortDescription: updatedPost.shortDescription,
				details: updatedPost.details
			}}, function(err,post){
				PostModel.find(function(err,posts){
					deferred.resolve(posts);
				})
			})
			return deferred.promise;
		}

		function deletePostById(id){
			var deferred= q.defer();
			PostModel.findById(id).remove(function(err,removed){
				PostModel.find(function(err,posts){
					deferred.resolve(posts);
				})
			})
			return deferred.promise;
		}

		//function findPostsAll(searchText){
		// 	if (searchText === 'undefined' || searchText ===null ){
		//		return posts;
		//	}
		// 	else {
		//		//console.log("test,test");
		//		return posts.filter(function(post){
		//			return post.title.indexOf(searchText)>-1 || post.author.indexOf(searchText)>-1 || post.tags.join().indexOf(searchText)>-1 || post.shortDescription.indexOf(searchText)>-1 || post.details.indexOf(searchText)>-1 ;
		//			});
        //
		//			console.log(results);
		//	}
		//}

		function findPostsAll(searchText){
			var deferred= q.defer();
			if (searchText === 'undefined' || searchText ===null ){
				PostModel.find(function(err,posts){
					deferred.resolve(posts);
				})
			}
			else{
				console.log("2searchText="+searchText);
				PostModel.find(
						{$or:
						[	{"title": { "$regex": searchText, "$options": "i" }},
							{tags:{ "$regex":searchText, "$options": "i" }},
							{"shortDescription":{ "$regex": searchText, "$options": "i" }},
							{"details":{ "$regex": searchText, "$options": "i" }}
						]},function(err,posts){
							console.log(posts);
							deferred.resolve(posts);
						}
				)
			}
			return deferred.promise;
		}





		function findPostById(id){
			var deferred = q.defer();
			PostModel.findById(id, function(err,post){
				deferred.resolve(post);
			})
			return deferred.promise;
		}

/*		//TODO: here if the given tag and the existing tag are in different cases(lower and capital),
		//the result would be false, I need to change this
		function findPostsByTag(tag){
			var postsByTag=[];
			for (var i=0;i<posts.length;i++){
				for (var j=0;j<posts[i].tags.length;j++){
					if (posts[i].tags[j]==tag){
						postsByTag.push(posts[i]);
						break;
					}
				}
			}
			return postsByTag;
		}*/

		function findPostsByTag(tag){
			var deferred= q.defer();
			PostModel.find({tags:{ "$regex":tag, "$options": "i" }},function(err,posts){
				console.log(tag);
				deferred.resolve(posts);
			})
			return deferred.promise;
		}




		function findPostsByUserId(userId){
			var deferred = q.defer();
			PostModel.find({userId: userId}, function(err, posts){
				deferred.resolve(posts);
			})
			return deferred.promise;
		}

}
