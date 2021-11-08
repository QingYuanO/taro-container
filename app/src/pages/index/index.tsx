import { View, Text, Icon } from "@tarojs/components";
import "./index.css";
import Container from "../../components/Container";
import { Button } from "@taroify/core";
import { getCurrentInstance, navigateTo } from "@tarojs/taro";
const Index = () => {
  const test = async () => {
    try {
      navigateTo({
        url: "/pages/my/index",
        events: {
          acceptDataFromOpenedPage(data) {
            console.log(data);
          },
        },
        success(res){
          res.eventChannel.emit('test',{a:1})
        },
      });
      console.log(getCurrentInstance());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="index">
      <Container.Navbar title="test" leftContent={<View style={{backgroundColor:'red',height:52}}>1</View>} />
      <Container.Content>
        <Button onClick={test} color="primary">
          主要按钮
        </Button>
        <Button color="info">信息按钮</Button>
        <Button color="success">成功按钮</Button>
        <Button color="warning">警告按钮</Button>
        <Button color="danger">危险按钮</Button>
        <Button color="default">默认按钮</Button>
      </Container.Content>
    </Container>
  );
};

export default Index;
