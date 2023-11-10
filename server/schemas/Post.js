var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema(
	{
		username : {
			type: String
		},

		title : {
			type: String
		},

		text : {
			type: String
		},

		datePosted: {
			type:Date, 
			default:Date.now
		},

		comments: [{ 
			type: Schema.Types.ObjectId, 
			ref: "comment" 
		}],
        
	},

	{ timestamps : true },
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
