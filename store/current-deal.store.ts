import type { ICurrentDealStore } from "~/types/store.type";
import type { IDeal } from "~/types";
const initialState: ICurrentDealStore = {
  deal: null,
  isOpen: false,
};

export const useCurrentDealStore = defineStore("current-deal", {
  state: () => initialState,
  actions: {
    clear() {
      this.$patch(initialState);
    },
    set(deal: IDeal) {
      this.$patch({ deal, isOpen: true });
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
