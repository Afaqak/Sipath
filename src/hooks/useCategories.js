
const CATEGORIES_LOCAL_STORAGE_KEY = 'categories';

export const useCategories = () => {
  if (typeof window !== 'undefined') {
    const storedCategories = localStorage.getItem(CATEGORIES_LOCAL_STORAGE_KEY);
    return storedCategories ? JSON.parse(storedCategories) : [];
  } else {
    return [];
  }
};