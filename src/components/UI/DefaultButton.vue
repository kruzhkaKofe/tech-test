<template>
	<button class="button">
		<slot></slot>
	</button>
</template>

<script setup>

</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"

.button
	padding: 1rem 2rem
	border: none
	border-radius: 0.5rem
	filter: $default
	background-color: rgba(255, 255, 255, 1)
	color: $primary
	font-weight: 700	
	cursor: pointer
	font-size: 1.5rem
	@media(max-width: $bp-540)
		font-size: 1rem
	&:hover
		background-color: rgba(255, 255, 255, 0.9)
	&:active
		filter: drop-shadow(0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.05))
</style>