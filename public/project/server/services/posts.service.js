module.exports = function (app,model){

  app.post("/api/project/post", createPost);
  app.put("/api/project/post/:postId", updatePostById);
  app.delete("/api/project/post/:postId", deletePostById);
  app.get("/api/project/post", findPostsAll);
  app.get("/api/project/post/id/:postId", findPostById);
  app.get("/api/project/post/tag/:tag",findPostsByTag);
  app.get("/api/project/post/user/:userId",findPostsByUserId);


  function createPost(req,res){
    var newPost = req.body;
    //console.log(newPost);
    model.createPost(newPost).then(function(posts){
          res.json(posts);
    });
  }

  function updatePostById (req,res){
    var updatedPost=req.body;
    var id=req.params.postId;
    model.updatePostById(id,updatedPost).then(function(posts){
          res.json(posts);
    });
  }

  function deletePostById(req,res){
    var id=req.params.postId;
    model.deletePostById(id).then(function(posts){
          res.json(posts);
    });
  }

  function findPostsAll(req,res){
    //console.log(req.query.searchText);
    model.findPostsAll(req.query.searchText).then(function(posts){
          res.json(posts);
    });
  }

  function findPostById(req,res){
    id=req.params.postId;
    //console.log(id);
    model.findPostById(id).then(function(post){
          //console.log(post);
          res.json(post);
    });
  }

  function findPostsByTag(req,res){
    var tag=req.params.tag;
    console.log(tag);
    model.findPostsByTag(tag).then(function(posts){
          res.json(posts);
    });
  }

  function findPostsByUserId(req,res){
    var userId=req.params.userId;
    model.findPostsByUserId(userId).then(function(posts){
          res.json(posts);
    });
  }

}
