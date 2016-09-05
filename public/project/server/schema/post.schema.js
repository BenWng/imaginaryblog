module.exports=function(app,mongoose,db){

    var PostSchema = mongoose.Schema({
        id: Number,
        userId: String,
        title: String,
        youtube: String,
        time: {type: Date, default: Date.now},
        tags: [String],
        shortDescription: String,
        details: String
    },{collection:"cs5610.project.post"});
    return PostSchema;
}