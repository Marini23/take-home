import { FC } from "react";
import { ChevronUpIcon } from "./icons";
import { ChevronDownIcon } from "./icons";
import { XMarkIcon } from "./icons";
import { RevertIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

type ToggleButtonProps = {
  isExpanded: boolean;
  onClick: () => void;
};

export const ExpandButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <ChevronUpIcon />
    </button>
  );
};

export const CollapseButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <ChevronDownIcon />
    </button>
  );
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
    >
      {isExpanded ? <ExpandButton /> : <CollapseButton />}
    </div>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};

export const RevertButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <RevertIcon />
    </button>
  );
};
