import { defineStore } from "pinia";

export const useSliderover = defineStore("slideover", {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    isOpen: (state) => state.isOpen,
  },
  actions: {
    toggleOpen() {
      this.$patch({ isOpen: !this.isOpen });
    },
  },
});
