<template>
  <div class="modal" v-if="isShowModal" @click="hideModal">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isShowModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isShowModal"]);

const hideModal = () => {
  emit("update:isShowModal", false);
};
</script>

<style lang="sass" scoped>

.modal
	position: fixed
	top: 0
	bottom: 0
	left: 0
	right: 0
	z-index: 15
	display: flex
	background-color: rgba(0, 0, 0, 0.4)

	&__content
		margin: auto
		background-color: #FFFFFF
		border-radius: 1rem
		padding: 1rem
		min-height: 5rem
		min-width: 15rem

</style>
