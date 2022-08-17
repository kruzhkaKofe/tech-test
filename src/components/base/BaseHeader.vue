<template>
  <header class="header">
    <default-button @click="openModal"> Создать задание </default-button>
  </header>
</template>

<script setup>
import DefaultButton from "../UI/DefaultButton.vue";

const emit = defineEmits(["openModal"]);

const openModal = () => {
	emit('openModal')
};
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"

.header
	height: 6rem
	width: 100vw
	position: fixed
	top: 0
	left: 0
	right: 0
	z-index: 10
	background-color: $primary
	filter: $default
	display: flex
	align-items: center
	justify-content: center
</style>
