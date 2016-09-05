


(function(){
  angular
    .module("BlogApp")
    .factory("UserService",UserService);

    function UserService($rootScope,$q,$http){

        var service = {
          createUser : createUser,
          findUsersAll: findUsersAll,
          findUserById: findUserById,
          findUserByAccount: findUserByAccount,
          findUserByCredentials: findUserByCredentials,
          updateUserById: updateUserById,
          deleteUserById: deleteUserById,
            followThisPerson: followThisPerson,
            unfollowThisPerson: unfollowThisPerson
        };
        return service;

        function createUser(newUser){
       
          return $http.post("/api/project/user",newUser);
        }

        function findUsersAll(){
            //console.log("findUsersAll");
          return $http.get("/api/project/usersall");
        }


        function findUserById(id){
       
          //to-do: not very sure about this url

          return $http.get("/api/project/user/"+id);
        }

        function findUserByAccount(account){

          return $http.get("/api/project/user/account/"+account);
        }


        function findUserByCredentials(username,activation){
          //Totally unsure about this
          return $http.get("/api/project/user/credential?username="+username+"&activation="+activation);
        }


        function updateUserById(id,user){

          return $http.put("/api/project/user/"+id,user);
        }


        function deleteUserById(id){
          return $http.delete("/api/project/user/"+id);
        }

        function followThisPerson(myId,idolId){
            return $http.put("/api/project/user/follow/"+myId,idolId);
        }

        function unfollowThisPerson(myId,idolId){
            return $http.put("/api/project/user/unfollow/"+myId,idolId);
        }

    }
})();
