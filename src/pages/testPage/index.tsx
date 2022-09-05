import { View } from "@tarojs/components";
import { useEffect, useRef } from "react";
import Container from "../../components/Container";
import { getNavBarHeight } from "../../components/Container/helper";
import useObserver from "../../components/Container/hooks/useObserver";
import { FooterRef } from "../../components/Container/types";

const TestPage = () => {
  const footerRef = useRef<FooterRef>();
  useEffect(() => {
    footerRef?.current?.getFooterRect((rect) => {
      console.log(rect);
    });
  }, [footerRef]);
  // const { show } = useObserver("testObserver1");

  // console.log('test1',test1);
  // console.log('test2',test2);

  return (
    <Container>
      <Container.Navbar title={true ? "TestPage" : "haha"} />
      <Container.Content>
        <View
          id="testObserver1"
          style={{ marginBottom: 20, backgroundColor: "pink" }}
        >
          testObserver1
        </View>
        <View
          id="testObserver2"
          style={{
            marginBottom: 20,
            backgroundColor: "deeppink",
            position: "sticky",
            top: getNavBarHeight(),
          }}
        >
          testObserver2
        </View>
        <View
          style={{ height: 700, backgroundColor: "skyblue", marginBottom: 20 }}
        >
          TestPage
        </View>
      </Container.Content>
      <Container.Footer
        ref={footerRef}
        onFooterRenderAfter={(res) => {
          // console.log(res);
        }}
      >
        <View style={{ backgroundColor: "red" }} className="test">
          1
        </View>
      </Container.Footer>
    </Container>
  );
};

export default TestPage;
