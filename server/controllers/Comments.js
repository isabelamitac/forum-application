const Comments = require("../schemas/Comment");
const Posts = require("../schemas/Post");

// Add a new comment > POST /posts/:post_id/comments (Relationship)
const addComment = async (req, res) => {
	try {
		const comment = await Comments.create(req.body);
		res.status(201).json(comment);
	} catch (error) {
		res.status(500).json({ message: "Could not create comment" });
	}
};
  
// View all comments for a post -> GET /posts/:post_id/comments (Relationship)
const viewComments = async (req, res) => {
	try {
		const post = await Posts.findById(req.params.id);
  
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
  
		const comments = await Comments.find({ postId: post.id }).exec();
		res.json(comments);
	} catch (error) {
		res.status(500).json({ message: "Could not find any comments" });
	}
};

// Edit a certain comment -> PUT /posts/:id/comments/:cid (Relationship)
const editComment = async (req, res) => {
	try {
		const postID = req.params.id;
		const commentId = req.params.cid;
		const updatedComment = req.body.text;

		const post = await Posts.findById(postID);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
    
		// Find the comment with the given ID that belongs to the post
		const commentToUpdate = await Comments.findOne({
			_id: commentId,
			postId: post._id,
		}).exec();
    
		if (!commentToUpdate) {
			return res.status(404).json({ message: "Comment not found for this post" });
		}
    
		commentToUpdate.text = updatedComment;
		await commentToUpdate.save();

		res.json({ message: "Comment updated successfully" });
	} catch (err) {
		res.status(500).json({ message: "Could not update the comment" });
	}
    
};

// Delete a certain comment -> DELETE /posts/:id/comments/:cid (Relationship)
const deleteComment = async (req, res) => {
	try {
		const postID = req.params.id;
		const commentId = req.params.cid;
  
		const post = await Posts.findById(postID);
  
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
  
		// Find the comment with the given ID that belongs to the post
		const commentToDelete = await Comments.findOne({
			_id: commentId,
			postId: post._id,
		}).exec();
  
		if (!commentToDelete) {
			return res
				.status(404)
				.json({ message: "Comment not found for this post" });
		}
		await Comments.deleteOne({
			_id: commentId,
			postId: post._id,
		}).exec();
  
		res.json({ message: "Comment deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Could not delete the comment" });
	}
};

module.exports = {
	addComment,
	viewComments,
	editComment,
	deleteComment
};
   