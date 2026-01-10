
import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([
    { id: "1", name: "Salary", type: "income" },
    { id: "2", name: "Freelance", type: "income" },
    { id: "3", name: "Food", type: "expense" },
    { id: "4", name: "Rent", type: "expense" },
    { id: "5", name: "Investment", type: "both" },
    { id: "6", name: "Kids School fee", type: "expense" },
    { id: "7", name: "maintenance", type: "expense" }
  ]);

  function addCategory(category) {
    setCategories(prev => [
      { id: crypto.randomUUID(), ...category },
      ...prev,
    ]);
  }

  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}
