import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import {
  createSelectorQuery,
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
  nextTick,
  NodesRef,
} from "@tarojs/taro";
import Container from "..";
import { ContainerChildren } from "../types";

const globalSystemInfo = getSystemInfoSync();
const getSystemInfo = () => {
  return globalSystemInfo ?? getSystemInfoSync();
};

export const getNavBarHeight = () => {
  const menuButtonBounding = getMenuButtonBoundingClientRect();
  const height = menuButtonBounding.top + menuButtonBounding.height + 5;
  return height;
};
// export const useScreenLayout = () => {
//   const screenLayout = useMemo(() => {
//     const systemInfo = getSystemInfo();
//     //胶囊布局信息
//     const menuButtonBounding = getMenuButtonBoundingClientRect();
//     return {
//       menuButtonBounding,
//       ...systemInfo,
//     };
//   }, []);
//   return screenLayout;
// };
export const getSafeArea = () => {
  const systemInfo = getSystemInfo();
  const safeBottom =
    systemInfo.screenHeight - (systemInfo?.safeArea?.bottom ?? 0);
  const safeTop = systemInfo.safeArea?.top;
  const safeHeight = systemInfo.safeArea?.height;
  return {
    safeBottom,
    safeTop,
    safeHeight,
  };
};
export const isIPhoneX = () => {
  const { safeArea, model } = getSystemInfo();
  return model.includes("iPhone") && (safeArea?.top ?? 0) > 20;
};

export const getFooterRect = (
  callback?: (rect: NodesRef.BoundingClientRectCallbackResult) => void
) => {
  nextTick(() => {
    createSelectorQuery()
      .select("#taroContainerFooter")
      .boundingClientRect((res) => {
        if (res?.height) {
          callback?.(res);
        }
      })
      .exec();
  });
};

export function findContainerChildren(node?: ReactNode): ContainerChildren {
  const children: ContainerChildren = {
    navbar: undefined,
    footer: undefined,
    content: undefined,
    other: [],
  };

  Children.forEach(node, (child: ReactNode) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      if (element.type === Container.Navbar) {
        children.navbar = element as ReturnType<typeof Container.Navbar>;
      } else if (element.type === Container.Content) {
        children.content = element;
      } else if (element.type === Container.Footer) {
        children.footer = element as ReturnType<typeof Container.Footer>;
      } else {
        children.other!.push(child);
      }
    } else {
      children.other!.push(child);
    }
  });

  return children;
}
