import { ref } from "vue";

export const sendTask = (someTask) => {
  const result = ref('');

  const postTask = async () => {
    try {
      result.value = await someTask();
    } catch (e) {
      alert(`Не удалось создать задание! Статус: ${e.response.status}`);
      console.log(e);
    }
  };

  return { result, postTask };
};
