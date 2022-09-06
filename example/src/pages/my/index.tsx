import { View, Text } from "@tarojs/components";
import { setNavigationBarColor, useDidShow } from "@tarojs/taro";
import Container from "taro-container";

const Index = () => {
  useDidShow(() => {
    setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#00ff40"
    });
  });
  return (
    <Container className="index">
      <Container.Navbar>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width:'100%'
          }}
        >我的</View>
      </Container.Navbar>
      <Container.Content>
        <View>test11</View>
      </Container.Content>
    </Container>
  );
};

export default Index;
