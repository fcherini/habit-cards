import { Text, type TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

type ThemedTextTypes =
  | "default"
  | "title"
  | "subtitle"
  | "link"
  | "small"
  | "detail";

export type ThemedTextProps = TextProps & {
  type?: ThemedTextTypes;
};

export function Txt({ type = "default", className, ...rest }: ThemedTextProps) {
  return (
    <Text
      className={twMerge("text-inherit", textTypes[type], className)}
      {...rest}
    />
  );
}

const textTypes: Record<ThemedTextTypes, string> = {
  default: "text-16 leading-none text-inherit",
  small: "text-12 leading-none",
  title: "font-bold text-20 leading-none",
  detail: "text-14 font-semibold",
  subtitle: "font-bold text-16 leading-none",
  link: "text-secondary underline leading-none",
};
