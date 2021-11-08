import { useMemo } from "react";
import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from "@tarojs/taro";

export const useNavBarHeight = () => {
  const height = useMemo(() => {
    const menuButtonBounding = getMenuButtonBoundingClientRect();
    return menuButtonBounding.top + menuButtonBounding.height + 5;
  }, []);
  return height;
};
export const useScreenLayout = () => {
  const screenLayout = useMemo(() => {
    const systemInfo = getSystemInfoSync();
    //胶囊布局信息
    const menuButtonBounding = getMenuButtonBoundingClientRect();
    return {
      menuButtonBounding,
      ...systemInfo,
    };
  }, []);
  return screenLayout;
};
export const  useSafeArea = () => {
  const systemInfo = getSystemInfoSync();
  const safeBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
  const safeTop= systemInfo.safeArea.top;
  const safeHeight = systemInfo.safeArea.height
  return {
    safeBottom,
    safeTop,
    safeHeight,
  }
}
export const useIsIPhoneX = () => {
  return useMemo(() => {
    // 判断设备是否为刘海屏 - 暂定方案
    // 安全区域中top无刘海屏为20，如有刘海屏top>20  - 20应该是业界固定数值
    const { safeArea,model } = getSystemInfoSync();
    return model.includes('iPhone') && safeArea.top > 20;
  }, []);
};
