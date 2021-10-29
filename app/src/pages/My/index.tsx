import { View, Text } from "@tarojs/components";
import Container from "../../components/Container";
import { Button, Cell, Popup } from "@taroify/core";
import { Arrow, ArrowDown, Cross } from "@taroify/icons";
import { useState } from "react";
import CellGroup from "@taroify/core/cell/cell-group";
const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container className="index">
      {/* <Container.Navbar title="test" /> */}
      <Container.Content>

          <Cell
            title="单元格"
            onClick={() => setIsOpen(true)}
            rightIcon={<Arrow />}
            clickable
            bordered
          />

      </Container.Content>
      <Popup open={isOpen} placement="bottom" style={{ height: "30%" }}>
        <Popup.Backdrop closeable />
        <Popup.Close>
          <Cross onClick={() => setIsOpen(false)} />
        </Popup.Close>
        1
      </Popup>
    </Container>
  );
};

export default Index;
