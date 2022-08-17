<template>
  <form class="form" @submit.prevent="createTask">
    <div class="form__field">
      <label for="begin" class="form__label">Начало: </label>
      <input
        type="datetime-local"
        name="date-begin"
        id="begin"
        class="form__input"
        v-model="editTask.dateBegin"
      />
    </div>
    <div class="form__field">
      <label for="end" class="form__label">Конец: </label>
      <input
        type="datetime-local"
        name="date-end"
        id="end"
        class="form__input"
        v-model="editTask.dateEnd"
      />
    </div>
    <div class="form__field">
      <label for="categoryID" class="form__label">Категория (ID): </label>
      <select
        name="category-id"
        id="categoryID"
        class="form__input"
        v-model="editTask.categoryId"
        required
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.title }}
        </option>
      </select>
    </div>
    <div class="form__field">
      <label for="price" class="form__label">Оплата: </label>
      <input
        type="number"
        name="price-value"
        id="price"
        min="0"
        placeholder="Введите число"
        class="form__input"
        required
        v-model="editTask.price"
      />
    </div>
    <div class="form__field">
      <label for="title" class="form__label">Название: </label>
      <input
        type="text"
        name="task-title"
        id="title"
        placeholder="Введите название"
        class="form__input"
        required
        v-model="editTask.title"
      />
    </div>
    <default-button class="form__button"> Создать </default-button>
  </form>
</template>

<script setup>
import DefaultButton from "./UI/DefaultButton.vue";

const props = defineProps({
  editTask: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["createTask"]);

const createTask = () => {
  emit("createTask");
};
</script>

<style lang="sass" scoped>
@import "../styles/variables.sass"

.form
	&__field
		& + &
			margin-top: 1rem
	&__label
		color: $primary
		font-size: 1.5rem
		@media(max-width: $bp-540)
			font-size: 1rem
	&__input
		font-size: 1.3rem
		padding: 0.5rem
		width: 15rem
		@media(max-width: $bp-540)
			font-size: 0.8rem
			width: 10rem
	&__button
		margin-top: 1rem
</style>
