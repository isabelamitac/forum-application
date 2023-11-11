<template>
    <div class="header">
        <h1>ThreadTalk</h1>
    </div>
</template>

<script>

export default {
	name: "PageHeader",
	components: {
	}
};

</script>

<style>

.header {
    width: 100%;
    text-align: center;
    background: #262D34;
  }

  @media only screen and (max-width: 900px) {
    .header {
      margin: 1em auto;
    }
  }
</style>
