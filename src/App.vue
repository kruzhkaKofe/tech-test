<template>
  <div class="app">
    <base-header @openModal="openModal" />

    <default-modal v-model:isShowModal="isShowModal">
      <task-form
        :editTask="editTask"
        :categories="categories"
        @createTask="createTask"
      />
    </default-modal>

    <template v-if="loading">
      <p>Loading...</p>
    </template>

    <template v-else-if="tasks.length > 0">
      <div class="cards__list">
        <base-card v-for="task in tasks" :key="task.id" :task="task" />
      </div>
      <div v-observer="loadMoreTasks" class="observer"></div>
    </template>

    <template v-else-if="error">
      <p>Что-то пошло не так...</p>
    </template>
  </div>
</template>

<script setup>
import BaseCard from "./components/base/BaseCard.vue";
import BaseHeader from "./components/base/BaseHeader.vue";
import DefaultModal from "./components/UI/DefaultModal.vue";
import TaskForm from "./components/TaskForm.vue";
import axios from "axios";
import { fetchTasks, fetchCategories, sendTask } from "./composables/index";
import { onMounted, ref, nextTick, watch } from "vue";

const editTask = ref({
  dateBegin: null,
  dateEnd: null,
  categoryId: null,
  price: 0,
  title: "",
});

const defaultTask = {
  dateBegin: null,
  dateEnd: null,
  categoryId: null,
  price: 0,
  title: "",
};

let isShowModal = ref(false);
let pagingCount = ref(12);
let pagingAfter = ref(0);

const { tasks, loading, error, loadTasks } = fetchTasks(async () => {
  const res = await axios.get("http://api.staging.umeu.app/test/tasks/search", {
    params: {
      pagingCount: pagingCount.value,
      pagingAfter: pagingAfter.value,
    },
  });

  prettyTime(res.data.result.offers);
  return res.data.result.offers;
});

const loadMoreTasks = async () => {
  try {
    pagingAfter.value += pagingCount.value;

    const res = await axios.get(
      "http://api.staging.umeu.app/test/tasks/search",
      {
        params: {
          pagingCount: pagingCount.value,
          pagingAfter: pagingAfter.value,
        },
      }
    );

    prettyTime(res.data.result.offers);
    tasks.value = [...tasks.value, ...res.data.result.offers];
  } catch (e) {
    console.log(e);
  }
};

const { categories, loadCategories } = fetchCategories(async () => {
  const res = await axios.get("http://api.staging.umeu.app/test/categories");
  return res.data.result.categories;
});

const { postTask } = sendTask(async () => {
  const res = await axios.post(
    "http://api.staging.umeu.app/test/task/create",
    editTask.value
  );
  return res;
});

const prettyTime = (tasks) => {
  tasks.forEach((task) => {
    if (task.dateEnd) {
      task.dateEnd = new Date(task.dateEnd).toLocaleString();
    }
  });
};

const formatedTimeISO = (task) => {
  if (task.dateBegin) {
    task.dateBegin = new Date(task.dateBegin).toISOString();
  }
  if (task.dateEnd) {
    task.dateEnd = new Date(task.dateEnd).toISOString();
  }
};

const validateTime = () => {
  const start = Date.parse(editTask.value.dateBegin);
  const end = Date.parse(editTask.value.dateEnd);
  if (end - start < 0) {
    return false;
  } else {
    return true;
  }
};

const createTask = () => {
  if (!validateTime()) {
    alert("Начало не может быть раньше. чем конец!");
    return;
  } else {
    formatedTimeISO(editTask.value);
    postTask();
    isShowModal.value = false;
    nextTick(() => {
      clearFields();
      location.reload();
    });
  }
};

const startScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

const stopScroll = () => {
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${getScrollbarWidth()}px`;
};

const getScrollbarWidth = () => {
  const item = document.createElement("div");

  item.style.position = "absolute";
  item.style.top = "-1000px";
  item.style.width = "50px";
  item.style.height = "50px";
  item.style.overflow = "scroll";
  item.style.visibility = "hidden";

  document.body.appendChild(item);
  const scrollbarWidth = item.offsetWidth - item.clientWidth;
  document.body.removeChild(item);

  return scrollbarWidth;
};

const openModal = () => {
  loadCategories();
  isShowModal.value = true;
  stopScroll();
};

const clearFields = () => {
  editTask.value = Object.assign({}, defaultTask);
};

watch(isShowModal, (newVal, oldVal) => {
  if (!isShowModal.value) {
    startScroll();
  }
});

onMounted(() => {
  loadTasks();
});
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

.cards__list
  padding-top: 6rem
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap
  min-height: 100vh
</style>
