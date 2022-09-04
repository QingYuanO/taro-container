import { View, Text, Icon } from "@tarojs/components";
import { getCurrentInstance, navigateTo } from "@tarojs/taro";
import Container from "../../components/Container";

import "./index.css";

const Index = () => {
  const test = async () => {
    try {
      navigateTo({
        url: "/pages/testPage/index",
        events: {
          acceptDataFromOpenedPage(data) {
            console.log(data);
          },
        },
        success(res) {
          res.eventChannel.emit("test", { a: 1 });
        },
      });
      console.log(getCurrentInstance());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="index">
      <Container.Navbar title="首页" titleClassName="testTitle" />
      <Container.Content>
        <View onClick={test}>test11</View>
      </Container.Content>

    </Container>
  );
};

export default Index;
