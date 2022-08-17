import { ref } from "vue";

export const fetchCategories = (getCategories) => {
  const categories = ref([]);

  const loadCategories = async () => {
    try {
      categories.value = await getCategories();
    } catch (e) {
      console.log(e);
    }
  };

  return { categories, loadCategories };
};
