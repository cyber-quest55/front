 import { styled } from "@umijs/max";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

type BoxProps = {
  shadow?: number;
  cursor?: string;
  transition?: string;
  gap?: number
};

const Box = styled.div<
  BoxProps &
    LayoutProps &
    ColorProps &
    PositionProps &
    SpaceProps &
    FlexProps &
    BorderProps &
    FlexboxProps &
    TypographyProps
>(
  ({ shadow, cursor, transition, theme, gap }: any) => ({
   shadow, cursor, transition, theme, gap 
  }),
  compose(layout, space, color, position, flexbox, flex, border, typography)
);

Box.defaultProps = {
  shadow: 0,
  cursor: "unset",
};

export default Box;