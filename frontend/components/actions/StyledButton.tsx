import { Pressable, PressableProps } from "react-native";
import { Txt } from "../StyledText";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type StyledButtonTypes = "default" | "accent";
type StyledButtonLayout = "full" | "fit";

type StyledButtonProps = PressableProps & {
  children: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  type?: StyledButtonTypes;
  layout?: StyledButtonLayout;
};

export const Btn = ({
  children,
  icon,
  type = "default",
  className,
  layout = "full",
  ...rest
}: StyledButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        "flex flex-row rounded-10 shadow-box border border-base-100 py-1.5 px-2.5 hover:shadow-box-sm transition-all items-center",
        buttonTypes[type],
        buttonLayout[layout],
        className
      )}
      {...rest}
    >
      <Txt className="text-14 font-semibold text-inherit">{children}</Txt>
      <Ionicons className="text-inherit" size={18} name={icon} />
    </Pressable>
  );
};

const buttonTypes: Record<StyledButtonTypes, string> = {
  default: "text-base-100 bg-base-5",
  accent: "text-base-5 bg-base-50",
};
const buttonLayout: Record<StyledButtonLayout, string> = {
  full: "w-full justify-between",
  fit: "w-fit gap-1",
};
