import { Box } from "@ant-design/charts";
import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
 
interface FlexTypes {
  gap?: string | number
}

const FlexBox = styled(Box)<
  FlexboxProps & LayoutProps & SpaceProps & ColorProps & BorderProps & FlexTypes
>`
  display: flex;
  flex-direction: ${props => props.flexDirection as any};
  gap: ${props => props.gap};
 
  ${layout}
  ${color}
  ${flexbox}
  ${space}
  ${border}
`;

export default FlexBox;