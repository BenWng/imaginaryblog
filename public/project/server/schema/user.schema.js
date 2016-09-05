module.exports=function(app,mongoose,db){

    var UserSchema = mongoose.Schema({
        Name: String,
        account: String,
        id: String,
        following: [String],
        role: String
    },{collection:"cs5610.project.user"});
    return UserSchema;
}