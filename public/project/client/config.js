(function(){
  angular
    .module("BlogApp")
    .config(Configuration)


    function Configuration( $routeProvider,$sceProvider,$locationProvider)
    {
      $routeProvider
        .when('/home',{
          templateUrl: './view/Home/Home.view.html'
        })
        .when('/add',{
          templateUrl: './view/Upload/Upload.view.html'
        })
        .when('/editor/:id',{
          templateUrl: './view/Editor/Editor.view.html'
        })
          .when('/upload',{
            templateUrl: './view/Upload/Upload.view.html',
              resolve: {
                  upload_show:upload_show
              }
          })
        .when('/contact',{
          templateUrl: './view/Contact/Contact.view.html'
        })
        .when('/profile',{
          templateUrl: './view/Profile/Profile.view.html'
        })
        .when('/individual/:id',{
          templateUrl: './view/Individual/Individual.view.html'
        })
          .when('/admin',{
            templateUrl: './view/Administrator/Administrator.view.html',
              resolve: {
                  admin_show: admin_show
              }
        })
          .otherwise({
              redirectTo:'/home'
          });

      $sceProvider.enabled(false);
      $locationProvider.html5Mode(true);


    }
})();


function admin_show($q,$http,$location){
    var deferred=$q.defer();
    $http.get("/loggedin")
        .success(function(user){
            if (user != '0' && user.role=="Admin")
             {
                deferred.resolve();
             }
             else
             {
                deferred.reject();
                $location.url("/home");
             }
        })
 }


function upload_show($q,$http,$location){
    var deferred=$q.defer();
    $http.get("/loggedin")
        .success(function(user){
            if (user != '0')
            {
                deferred.resolve();
            }
            else
            {
                alert("Please log in first");
                deferred.reject();
                $location.url("/home");

            }
        })
}
