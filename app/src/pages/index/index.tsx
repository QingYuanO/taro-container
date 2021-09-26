import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.css";
import Container from "../../components/Container";


export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <Container className="index">
        <Container.Navbar/>
        <Container.Content>
          <Text>Hello world!</Text>
        </Container.Content>
      </Container>
    );
  }
}
