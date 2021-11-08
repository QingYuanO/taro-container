import Container, { getFooterBarRect } from "./src/components/Container/index";
import {
  useIsIPhoneX,
  useNavBarHeight,
  useSafeArea,
  useScreenLayout,
} from "./src/components/Container/hooks";

export { useIsIPhoneX, useNavBarHeight, useSafeArea, useScreenLayout,getFooterBarRect };
export default Container;
