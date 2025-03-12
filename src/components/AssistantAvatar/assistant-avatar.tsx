import { Avatar, type AvatarProps } from "@sk-web-gui/avatar";
import { cx } from "@sk-web-gui/utils";
import React from "react";
import type { AIFeedAvatar, AssistantInfo } from "../../types";

export interface AssistantAvatarProps
  extends React.ComponentPropsWithoutRef<"div"> {
  avatar?: AIFeedAvatar;
  assistant?: AssistantInfo;
  size?: AvatarProps["size"];
}

export const AssistantAvatar = React.forwardRef<
  HTMLDivElement,
  AssistantAvatarProps
>((props, ref) => {
  const { avatar, assistant, size, className, ...rest } = props;

  const getAvatarProps = () => {
    if (avatar) {
      if (avatar.type === Avatar) {
        return {
          ...avatar.props,
        };
      } else {
        return null;
      }
    } else {
      return {
        imageElement:
          typeof assistant?.avatar !== "string" ? assistant?.avatar : undefined,
        imageUrl:
          typeof assistant?.avatar === "string" ? assistant?.avatar : undefined,
        initials: assistant?.shortName || "AI",
        imageAlt: "",
      };
    }
  };

  return getAvatarProps() ? (
    <Avatar
      ref={ref}
      {...getAvatarProps()}
      className={cx("sk-ai-assistant-avatar", className)}
      size={size}
      imageAlt=""
      aria-hidden="true"
      {...rest}
    />
  ) : (
    <div
      ref={ref}
      className={cx("sk-ai-assistant-avatar", className)}
      aria-hidden="true"
      {...rest}
    >
      {avatar}
    </div>
  );
});
