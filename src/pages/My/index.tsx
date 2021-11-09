import { View, Text } from "@tarojs/components";
import { setNavigationBarColor, useDidShow } from "@tarojs/taro";

const Index = () => {
  useDidShow(() => {
    setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#00ff40",
    });
  });
  return <View className="index"></View>;
};

export default Index;
