import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, RevertButton, ToggleButton } from "./Buttons";
import { useStore } from "../store";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
};

export const Card: FC<CardProps> = ({ id, title, description }) => {
  const toggleCardExpansion = useStore((state) => state.toggleCardExpansion);
  const isCardExpanded = useStore((state) => state.isCardExpanded(id));
  const deleteCard = useStore((state) => state.deleteCard);
  const isDeletedCard = useStore((state) => state.isDeletedCard(id));
  const handleCardRevert = useStore((state) => state.handleCardRevert);

  const toggleVisibilityDescription = () => {
    toggleCardExpansion(id);
  };

  return (
    <div className="border border-black px-2 py-1.5 ">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium ">{title}</h1>
        <div className="flex">
          {!isDeletedCard && (
            <ToggleButton
              isExpanded={isCardExpanded}
              onClick={toggleVisibilityDescription}
            />
          )}
          {isDeletedCard ? (
            <RevertButton onClick={() => handleCardRevert(id)} />
          ) : (
            <DeleteButton onClick={() => deleteCard(id)} />
          )}
        </div>
      </div>
      <div
        className={`animation-container ${
          isCardExpanded ? "expanded" : "collapsed"
        }`}
      >
        <p
          className={`text-sm animation-list ${
            isCardExpanded ? "visible" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
