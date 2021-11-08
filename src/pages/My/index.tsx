import { View, Text } from "@tarojs/components";
import { Button, Cell, Dialog, Popup, Stepper } from "@taroify/core";
import { useState } from "react";
import { Arrow, ArrowDown, ArrowRight, Cross } from "@taroify/icons";
import Container from "../../components/Container";
import { getCurrentInstance, useDidShow } from "@tarojs/taro";


const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<number | string>(0);
  useDidShow(() => {
    getCurrentInstance()
      .page.getOpenerEventChannel()
      .emit("acceptDataFromOpenedPage", { data: "test" });
    getCurrentInstance()
      .page.getOpenerEventChannel()
      .once("test", (data) => {
        console.log(data);
      });
  });
  return (
    <View className="index">
      {/* <Container.Navbar title="test" /> */}
      <View>
        <Cell
          title="单元格"
          onClick={() => setIsOpen(true)}
          rightIcon={<Arrow />}
          clickable
        />
        <Cell title="单元格">内容</Cell>
        <Cell title="单元格" brief="描述信息">
          <Stepper value={value} onChange={setValue} />
        </Cell>
        <Dialog id="dialog" />
        <Cell
          title="提示弹窗"
          clickable
          bordered
          rightIcon={<ArrowRight />}
          onClick={() => Dialog.alert("提示")}
        />
      </View>
      <Popup
        open={isOpen}
        placement="bottom"
        style={{ height: "30%" }}
        onClose={() => setIsOpen(false)}
      >
        <Popup.Backdrop closeable />
        <Popup.Close>
          {/* <Cross onClick={() => setIsOpen(false)} /> */}
        </Popup.Close>
        1
      </Popup>
      <Dialog />
    </View>
  );
};

export default Index;
