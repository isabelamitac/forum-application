<template>
  <div>
    <div class="container">
    <h4>Welcome to the Thread Talk forum</h4>
   
    <div class="post-container">
            <div class="postForm">
                <input type="username" placeholder="Username" v-model="postData.username" required/>
                <input type="title" placeholder="Title" v-model="postData.title" required/>
                <input type="text" placeholder="Text" v-model="postData.text" required/>
                <button class="createButton" id="saveBtn" @click="createPost()" >Create a post</button>
            </div>
          </div>

<h4>All Posts</h4>
<div class="posts-container-2">
<div v-if="allPosts.length > 0">
  <div v-for="post in allPosts" :key="post._id" class="posts-container">
      <div class="text3"> {{ post.title }} </div>
      <div class="text4"> {{ post.username }} </div>
      <div class="text2"> {{ post.text }} </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
  
<script>
import { Api } from "@/Api";

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "home",
	data() {
		return {
			postData: {
				username: "",
				title: "",
				text: "",
			},
			allPosts: [],
			postDetails: null,
			post: null,
		
		};
	},
	created() {
		this.getPostInfo();
		this.getAllPosts();
	},


	methods: {
		createPost() {
		// eslint-disable-next-line quotes
			Api.post(`/api/posts`, this.postData)
				.then(response => {
					console.log("Full Response:", response);
					if (response && response.data) {
						const newPost = response.data;
						this.createdPosts.push(newPost);

						localStorage.setItem("postId", newPost._id);
						console.log("Post ID saved to local storage:", newPost._id);
            
						// Clear form data after creating the post
						this.postData.username = "";
						this.postData.title = "";
						this.postData.text = "";

						console.log("Post created successfully:", newPost);
						location.reload();
            
					} else {
						console.error("Invalid response format:", response);
					}
				})
				.catch(error => {
					this.message = error;
				});
		},

		getPostInfo() {
			const postID = localStorage.getItem("postId");
			if (postID) {
				console.log("Post ID:", postID);
			} else {
				console.error("Post ID not found in localStorage.");
			}
			Api.get(`/api/posts/${postID}`)
				.then((res) => {
					this.post = res.data;
				})
				.catch((err) => {
					console.error(err);
				});
		},
    
		getAllPosts() {
			// eslint-disable-next-line quotes
			Api.get(`/api/posts`)
				.then((response) => {
					this.allPosts = response.data;
				})
				.catch((error) => {
					console.error(error);
				});
		},

		updatePost() {
			const postId = localStorage.getItem("postId");
			const newPost = {
				title: this.title || this.post.title,
				text: this.text || this.post.text
			};
			Api.put(`/posts/${postId}`, newPost).then((res) => {
				console.log(res);
				location.reload();
			});
		},

		deletePost() {
			Api.delete(`/posts/${this.post._id}`)
				.then((res) => {
					localStorage.clear();
					console.log(res);
					localStorage.removeItem("postId");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	}


};
</script>
  
  <style>
  @import url('../assets/style.css');
  </style>
  