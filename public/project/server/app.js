module.exports = function(app,mongoose,db){

    var usersModel = require("./models/users.model.js")(app, mongoose, db);
    var postsModel = require("./models/posts.model.js")(app, mongoose, db);
    require("./services/users.service.js")(app,usersModel);
    require("./services/posts.service.js")(app,postsModel);
};
