import { createContext, useEffect, useState } from 'react'
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({} );

  useEffect(() => {
    const fetchCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    }
    fetchCategoriesMap();
  }, []);

  const value = { categoriesMap, setCategoriesMap };
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
