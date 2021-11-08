import { View, Text, Icon } from "@tarojs/components";
import { getCurrentInstance, navigateTo } from "@tarojs/taro";
import Container,{} from "taro-container";
import "./index.css";



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

      </Container.Content>
    </Container>
  );
};

export default Index;
