import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, { payload }) => {
      const { products, search } = payload;
      state.filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    },
    filterBySort: (state, { payload }) => {
      const { products, sort, selectedCategory } = payload;
      let sortedProducts = [...products];

      if (selectedCategory !== "All") {
        sortedProducts = sortedProducts.filter((product) => product.category === selectedCategory);
      }

      if (sort === "newest") {
        sortedProducts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      } else if (sort === "lowest-price") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "highest-price") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      state.filteredProducts = sortedProducts;
    },
    filterByCategory: (state, { payload }) => {
      const { products, category } = payload;
      if (category === "All") {
        state.filteredProducts = products;
      } else {
        state.filteredProducts = products.filter((product) => product.category === category);
      }
    },
  },
});

export const { filterBySearch, filterBySort, filterByCategory } = filterSlice.actions;

export default filterSlice.reducer;
