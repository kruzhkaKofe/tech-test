import { ref } from "vue";

export const fetchTasks = (getTasks) => {
  const loading = ref(false);
  const error = ref(false);
  const tasks = ref([]);

  const loadTasks = async () => {
    error.value = false;
    loading.value = true;
    try {
      tasks.value = await getTasks();
    } catch (e) {
      console.log(e);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  return { tasks, loading, error, loadTasks,};
};
