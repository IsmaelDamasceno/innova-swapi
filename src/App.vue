<style scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.body {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.header {
	text-decoration: none;
	color: rgb(0, 0, 0);
}

.header:hover {
	color: rgb(153, 138, 147);
}
</style>
<template>
	<div id="app" class="container">
		<RouterLink to="/" class="header">
			<div class="text-center">
				<h1 class="text-center mt-5">🚀 SWAPI 🚀</h1>
				<p>Search for Star Wars characters</p>
			</div>
		</RouterLink>

		<RouterView class="body" />
	</div>
</template>
<script>
import { RouterView } from "vue-router";
export default {
	name: "App",
	components: {
		RouterView
	},
}
</script>
