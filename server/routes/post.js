/* eslint-disable linebreak-style */
const express = require("express");
const router = express.Router();

const {
	createPost,
	getPostById,
	getAllPosts,
	updatePost,
	deletePost,
	getSortedPosts
} = require("../controllers/Posts");

const {
	addComment,
	viewComments,
	editComment,
	deleteComment
} = require("../controllers/Comments");

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/posts?sortBy=newest", getSortedPosts);

router.post("/:id/comments", addComment);
router.get("/:id/comments", viewComments);
router.put("/:id/comments/:cid", editComment);
router.delete("/:id/comments/:cid", deleteComment);

module.exports = router;
