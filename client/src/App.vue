<template>
	<div id="app">
	<PageHeader />
	<!-- Render the content of the current page view -->
	<router-view/>
	<PageFooter />
	</div>
  </template>
  
<script>
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";

export default {
	name: "App",
	components: {
		PageHeader,
		PageFooter
	}
};
</script>
  