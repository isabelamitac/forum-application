var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
	{
		username : {
			type: String
		},

		text : {
			type: String,
			default: "no comment"
		},
        
		postId: {
			type: Schema.Types.ObjectId,
			ref: "postId"
		},

		posts: { 
			type: Schema.Types.ObjectId, 
			ref: "post" 
		}

	},
	{ timestamps : true },

);

const comment = mongoose.model("comment", CommentSchema);
module.exports = comment;
