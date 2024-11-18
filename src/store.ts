import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem } from "../src/api/getListData";
import { DeletedListItem } from "../src/api/getListData";

export type DeletedCard = DeletedListItem & {
  isDeleted: boolean;
};

type State = {
  visibleCards: ListItem[];
  fetchedOnce: boolean;
  expandedCards: number[];
  deletedCards: ListItem[];
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  setFetchedOnce: (status: boolean) => void;
  deleteCard: (id: number) => void;
  toggleCardExpansion: (id: number) => void;
  handleCardRevert: (id: number) => void;
  isCardExpanded: (id: number) => boolean;
  isDeletedCard: (id: number) => boolean;
  clearState: () => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      visibleCards: [],
      fetchedOnce: false,
      expandedCards: [],
      deletedCards: [],
      setVisibleCards: (cards) => set({ visibleCards: cards }),
      clearState: () =>
        set(() => ({
          visibleCards: [],
          deletedCards: [],
          expandedCards: [],
          fetchedOnce: false,
        })),
      setFetchedOnce: (status) => set(() => ({ fetchedOnce: status })),
      deleteCard: (id) =>
        set((state) => {
          const cardToDelete = state.visibleCards.find(
            (card) => card.id === id
          );
          if (!cardToDelete) return state;

          return {
            deletedCards: [...state.deletedCards, { ...cardToDelete }],
            visibleCards: state.visibleCards.filter((card) => card.id !== id),
          };
        }),
      toggleCardExpansion: (id) => {
        const { expandedCards } = get();
        if (expandedCards.includes(id)) {
          set({
            expandedCards: expandedCards.filter((cardId) => cardId !== id),
          });
        } else {
          set({
            expandedCards: [...expandedCards, id],
          });
        }
      },
      isCardExpanded: (id) => get().expandedCards.includes(id),
      handleCardRevert: (id) => {
        const { deletedCards, visibleCards } = get();

        const cardToRevert = deletedCards.find((card) => card.id === id);
        if (!cardToRevert) return;

        set((state) => {
          const updatedDeletedCards = state.deletedCards.filter(
            (card) => card.id !== id
          );

          const updatedVisibleCards = [...visibleCards, { ...cardToRevert }];

          return {
            visibleCards: updatedVisibleCards,
            deletedCards: updatedDeletedCards,
          };
        });
      },
      isDeletedCard: (id) => get().deletedCards.some((card) => card.id === id),
    }),

    {
      name: "cards-storage",
    }
  )
);
