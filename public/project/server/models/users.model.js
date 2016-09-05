var q=require("q");


module.exports=function(app, mongoose, db){


	var UserSchema = require ("../schema/user.schema.js")(app,mongoose,db);
	var UserModel = mongoose.model("UserModel", UserSchema);


	var api={
		createUser : createUser,
		findUsersAll: findUsersAll,
		findUserById: findUserById,
		findUserByGoogleId: findUserByGoogleId,
		findOrCreate: findOrCreate,
		findUserByAccount: findUserByAccount,
		findUserByCredentials: findUserByCredentials,
		updateUserById: updateUserById,
		deleteUserById: deleteUserById,
		followThisPerson: followThisPerson,
		unfollowThisPerson: unfollowThisPerson
	};

	return api;

	function createUser(user){
		var deferred = q.defer();
		UserModel.create(user,function(err,doc){
			UserModel.find(function(err,users){
				deferred.resolve(users);
			})
		})
		return deferred.promise;
	}

	function findUsersAll(){
		var deferred = q.defer();
		UserModel.find(function(err,users){
			deferred.resolve(users);
		})
		return deferred.promise;
	}

	function findUserById(id){
		var deferred = q.defer();
		UserModel.findById(id, function(err,user){
			console.log(user);
			deferred.resolve(user);
		})
		return deferred.promise;
	}

	function findUserByGoogleId(googleid){
		var deferred = q.defer();
		UserModel.findOne({GoogleId:googleid}, function(err,user){
			deferred.resolve(user);
		})
		return deferred.promise;
	}


	function findOrCreate(user){
		return findUserByGoogleId(user.GoogleId) || createUser(user) ;

	}


	function findUserByAccount(account){
		var deferred = q.defer();
		UserModel.findOne({Account: account}, function(err, user){
			deferred.resolve(user);
		})
		return deferred.promise;
	}

	function findUserByCredentials(credentials){
		var deferred = q.defer();

		var Account = credentials.Account;
		var activation = credentials.activation;
		UserModel.findOne({Account: Account, activation: activation}, function(err, user){
			deferred.resolve(user)
		})
		return deferred.promise;
	}


	function updateUserById(id,updatedUser){

		//console.log(updatedUser);
		var deferred = q.defer();

		UserModel.update({_id:id},{$set:{
			Name: updatedUser.Name,
			account: updatedUser.account,
			role: updatedUser.role
		}}, function(err,user){
			UserModel.find(function(err,users){
				deferred.resolve(users);
			})
		})

		return deferred.promise;
	}

	function deleteUserById(id){
		console.log(id);
		var deferred= q.defer();
		UserModel.findById(id).remove(function(err,removed){
			UserModel.find(function(err,users){
				deferred.resolve(users);
			})
		})
		return deferred.promise;
	}

	function followThisPerson(myId,idolId){

		console.log(myId);
		var deferred = q.defer();

		UserModel.findOneAndUpdate({_id:myId},
				{$addToSet:{following: idolId}},
				{new:true},
				function(err,user){
					deferred.resolve(user);
				}

					/*UserModel.find(function(err,users){
					deferred.resolve(users);
					}*/

		)

		return deferred.promise;
	}

	function unfollowThisPerson(myid,idolId){

		var deferred = q.defer();

		UserModel.findOneAndUpdate({_id:myid},
				{$pull:{following: idolId}},
				{new:true},
				function(err,user){
					deferred.resolve(user);
					/*UserModel.find(function(err,users){
						deferred.resolve(users);
					})*/
				})

		return deferred.promise;
	}



}
