import { Pressable, PressableProps } from "react-native";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type StyledCardTypes = "default" | "accent" | "blank";
type StyledCardLayout = "default" | "square";

type StyledButtonProps = PressableProps & {
  children: ReactNode;
  type?: StyledCardTypes;
  layout?: StyledCardLayout;
};

export const Card = ({
  children,
  type = "default",
  layout = "default",
  className,
  ...rest
}: StyledButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        "flex rounded-16 shadow-box border border-base-100 py-1.5 px-2.5 hover:shadow-box-sm transition-all items-center",
        cardTypes[type],
        cardLayout[layout],
        className
      )}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const cardTypes: Record<StyledCardTypes, string> = {
  default: "text-base-100 bg-base-5",
  accent: "text-base-5 bg-base-50",
  blank: "rounded-none shadow-none border-0",
};
const cardLayout: Record<StyledCardLayout, string> = {
  default: "",
  square: "asepct-square",
};
