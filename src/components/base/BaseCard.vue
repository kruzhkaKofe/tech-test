<template>
  <div class="wrapper">
    <article class="card">
      <div class="card__content">
        <h2 class="card__title text-highlighter">{{ task.title }}</h2>
        <p class="card__date-end text-highlighter">
          Дедлайн:
          <time
            class="card__time"
            :datetime="task.dateEnd"
            v-if="task.dateEnd"
            >{{ task.dateEnd }}</time
          >
          <span v-else class="card__time">Бессрочно</span>
        </p>
        <div class="card__description">
          <p class="card__category">
            <span class="text-highlighter">Категория: </span>
            {{ task.category }}
          </p>
          <p class="card__price">
            <span class="text-highlighter">Цена: </span>
            {{ task.price }}
          </p>
        </div>
      </div>
      <img src="../../assets/card-icon.svg" alt="Иконка" class="card__icon" />
    </article>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"

.text-highlighter
	font-weight: 700
	color: $primary

.wrapper
	padding: 0.5rem
	width: 50%
	@media(max-width: $bp-900)
		&
			width: 100%

.card
	display: flex
	justify-content: space-between
	align-items: center
	background-color: #FFFFFF
	min-height: 10rem
	height: 100%
	padding: 1rem
	border-radius: 1rem
	filter: $default
	@media(max-width: $bp-540)
		&
			min-height: 15rem
			flex-direction: column
	&__content
		width: 100%
		margin-right: 1rem
	&__title
		margin-bottom: 1rem
	&__time
		font-weight: 400
		color: black
	&__icon
		width: 6rem
		height: 6rem
		@media(max-width: $bp-540)
			&
				margin-top: 1rem
</style>
