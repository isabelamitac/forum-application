const Posts = require("../schemas/Post");

// Create a new post -> POST /posts (collection)
const createPost = async (req, res) => {
	console.log(req);
	const post = new Posts({
		username: req.body.username,
		title: req.body.title,
		text: req.body.text,
		datePosted: req.body.datePosted
	});
  
	try {
		const postToSave = await post.save();
		res.status(200).json(postToSave);
	} catch (error) {
		res.status(400).json({ message: "Invalid request" });
	}
};

// Return the post with the given ID -> GET /posts/:id (individual item)
const getPostById = async (req, res) => {
	try {
		const postID = req.params.id;
		const postToFind = await Posts.findById(postID);
		if (!postToFind) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.status(200).json(postToFind);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Could not find any post with the given ID" });
	}
};

// Return all posts -> GET /posts (collection)
const getAllPosts = async (req, res) => {
	try {
		const posts = await Posts.find();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: "Could not find any posts" });
	}
};

// Update post details by given ID -> PUT /posts/:id (individual item)
const updatePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const updates = req.body;
		const options = { new: true };

		const updatedPost = await Posts.findByIdAndUpdate(
			postId,
			updates,
			options
		);
		res.send(updatedPost);
	} catch (error) {
		res.status(400).json({ message: "Could not update post" });
	}
};

// Delete post by given ID -> DELETE /posts/:id (individual item)
const deletePost = async (req, res) => {
	try {
		const post = await Posts.findById(req.params.id);
		if(post){
			await post.deleteOne();
			res.send("Post deleted succesfully");
		}
		else {
			res.send("Something went wrong");
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: "Could not delete post" });
	}
};

//Sort posts by date
const getSortedPosts = async (req, res) => {
	try {
		const sortBy = req.query.sortBy;

		// Define the default sort option (by date, ascending order)
		let sortOption = { createdAt: 1 };

		// Adjust the sort option based on the query parameter
		if (sortBy === "newest") {
			sortOption = { createdAt: -1 };
		}

		const sortedPosts = await Posts.find().sort(sortOption).exec();

		res.json({ sortedPosts });
	} catch (err) {
		res.status(500).json({ message: "Could not retrieve sorted posts" });
	}
};

module.exports = {
	createPost,
	getPostById,
	getAllPosts,
	updatePost,
	deletePost,
	getSortedPosts
};
  