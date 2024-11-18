import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";

export const Entrypoint = () => {
  const [visibleDeletedCards, setVisibleDeletedCards] =
    useState<boolean>(false);
  const {
    visibleCards,
    setVisibleCards,
    fetchedOnce,
    setFetchedOnce,
    deletedCards,
    clearState,
  } = useStore();
  const listQuery = useGetListData();
  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    if (listQuery.isError) {
      console.error(
        listQuery.error instanceof Error
          ? listQuery.error.message
          : "An unknown error occurred."
      );
      return;
    }

    if (!fetchedOnce && listQuery.data) {
      setVisibleCards(listQuery.data.filter((item) => item.isVisible) ?? []);
      setFetchedOnce(true);
    }
  }, [listQuery.data, listQuery.isLoading, listQuery.isError, fetchedOnce]);

  const revealDeletedCards = () => {
    setVisibleDeletedCards((prev) => !prev);
  };

  const refreshData = async () => {
    try {
      clearState();

      const refreshedData = await listQuery.refetch();

      if (refreshedData.data) {
        console.log("Refetched data:", refreshedData);
        setVisibleCards(
          refreshedData.data.filter((item) => item.isVisible) ?? []
        );
      }
    } catch (error) {
      console.error("Failed to refresh data:");
    }
  };

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <button
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            onClick={refreshData}
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <button
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            onClick={revealDeletedCards}
          >
            {visibleDeletedCards ? "Hide" : "Reveal"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {visibleDeletedCards &&
            deletedCards.map((card) => (
              <Card key={card.id} id={card.id} title={card.title} />
            ))}
        </div>
      </div>
    </div>
  );
};
