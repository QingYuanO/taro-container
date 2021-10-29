import { View, Text } from "@tarojs/components";
import "./index.css";
import Container from "../../components/Container";
import { Button } from "@taroify/core";
import { navigateTo } from "@tarojs/taro";
const Index = () => {
  return (
    <Container className="index">
      <Container.Navbar title="test" />
      <Container.Content>
        <Button onClick={() => navigateTo({url:'/pages/my/index'})} color="primary">主要按钮</Button>
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
