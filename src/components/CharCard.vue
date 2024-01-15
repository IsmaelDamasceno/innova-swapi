
<style scoped>
.char-card {
	background-color: #311d27;
	cursor: pointer;
}

.char-card:hover {
	background-color: #333550;
}

@media (min-width: 768px) {
	.char-card {
		height: 30vh;
	}
}
</style>

<template>
	<main>
		<div class="card mb-4 shadow-lg border border-secondary text-light char-card">
			<div class="card-body">
				<p class="card-text">{{ data.name }}</p>
				<div class="">
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<p>Gender: {{ data.gender }}</p>
						</div>
						<small class="ms-auto text-muted">From planet {{ data.homeworld }}</small>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
export default {
	name: "CharCard",
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
};
</script>