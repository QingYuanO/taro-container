import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { IconProps } from "../../types";
import { BackIcon, HomeIcon } from "../icon";

export default function DefaultLeftIcon({ size, color }: IconProps) {
  const { app } = Taro.getCurrentInstance();
  const currentPages = Taro.getCurrentPages();
  //@ts-ignore
  const { config } = app;
  //获取app.config的配置
  const { entryPagePath, pages, tabBar } = config;
  //获取首屏页面
  const realEntryPagePath = entryPagePath ?? pages[0];

  //获取tabBar页面路径
  const tabBarPaths = tabBar?.list?.map((t) => t.pagePath);

  const notBackIconPagePathArr: string[] = tabBarPaths ?? [realEntryPagePath];

  const isShowDefaultLeftIcon = !notBackIconPagePathArr.includes(
    currentPages.at(-1)?.route ?? ""
  );

  const isShowBackIcon = currentPages.length > 1;

  const onBack = () => {
    Taro.navigateBack({
      fail() {
        Taro.reLaunch({ url: `/${realEntryPagePath}` });
      },
    });
  };

  const onToEntryPage = () => {
    Taro.reLaunch({ url: `/${realEntryPagePath}` });
  };

  if (!isShowDefaultLeftIcon) {
    return null;
  }
  return (
    <View onClick={isShowBackIcon ? onBack : onToEntryPage}>
      {isShowBackIcon ? (
        <BackIcon size={size} color={color} />
      ) : (
        <HomeIcon size={size} color={color} />
      )}
    </View>
  );
}
