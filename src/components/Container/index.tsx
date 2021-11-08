import { View, Text, Image, Icon } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import Taro, { NodesRef,useDidShow ,createSelectorQuery} from "@tarojs/taro";
import React, {
  ReactNode,
  useEffect,
  useState,
  Children,
  isValidElement,
  ReactElement,
} from "react";
import "./index.less";
import {
  useNavBarHeight,
  useScreenLayout,
  useSafeArea,
  useIsIPhoneX,
} from "./hooks";

export const getFooterBarRect: () => NodesRef.BoundingClientRectCallbackResult | null =
  () => {
    Taro.nextTick(() => {
      createSelectorQuery()
        .select("#taro-container__footerBarNode")
        .boundingClientRect((res) => {
          // console.log(res);
          if (res?.height) {
            return res;
          }
        })
        .exec();
    });
    return null
  };

interface ContainerChildren {
  navbar?: ReactNode;
  content?: ReactNode;
  footerBar?: ReactNode;
  other?: ReactNode[];
}
function findContainerChildren(node?: ReactNode): ContainerChildren {
  const children: ContainerChildren = {
    navbar: undefined,
    footerBar: undefined,
    content: undefined,
    other: [],
  };

  Children.forEach(node, (child: ReactNode) => {
    if (isValidElement(child)) {
      // console.log(child);
      const element = child as ReactElement;
      if (element.type === Container.Navbar) {
        children.navbar = element;
      } else if (element.type === Container.Content) {
        children.content = element;
      } else if (element.type === Container.FooterBar) {
        children.footerBar = element;
      } else {
        children.other!.push(child);
      }
    } else {
      children.other!.push(child);
    }
  });

  return children;
}

interface ContainerProps {
  children?: ReactNode;
  hasNavBarTop?: boolean;
  hasFooterBarBottom?: boolean;
}
function Container({
  children,
  hasNavBarTop = true,
  hasFooterBarBottom = true,
  ...otherViewProps
}: ContainerProps & ViewProps) {
  const { navbar, content, footerBar, other } = findContainerChildren(children);
  const [footerBarHeight, setFooterBarHeight] = useState(0);
  const { safeBottom } = useSafeArea();
  const navBarHeight = useNavBarHeight();
  useEffect(() => {
    Taro.nextTick(() => {
      createSelectorQuery()
        .select("#taro-container__footerBarNode")
        .boundingClientRect((res) => {
          // console.log(res);
          if (res?.height) {
            setFooterBarHeight(res?.height);
          }
        })
        .exec();
    });
  }, [footerBar]);
  return (
    <View {...otherViewProps}>
      {navbar}
      {content && (
        <View
          id="taro-container__contentNode"
          style={{
            marginTop: navbar && hasNavBarTop ? navBarHeight : 0,
            marginBottom: hasFooterBarBottom
              ? footerBar
                ? footerBarHeight
                : safeBottom
              : 0,
            position: "relative",
          }}
        >
          {content}
        </View>
      )}
      {other}
      {footerBar}
    </View>
  );
}

namespace Container {
  export interface NavbarProps {
    children?: ReactNode;
    leftContent?: ReactNode;
    title?: string;
    back?: boolean;
    onBack?: () => void;
    titleColor?: string;
    bgColor?: string;
  }
  export function Navbar({
    children,
    title,
    leftContent,
    titleColor = "#000",
    bgColor = "#fff",
    back,
    onBack = () => Taro.navigateBack(),
  }: NavbarProps) {
    const { menuButtonBounding } = useScreenLayout();
    const navBarHeight = useNavBarHeight();
    useDidShow(() => {});
    return (
      <View
        id="taro-container__navbarNode"
        className="taro-container__navbar_wrap"
        style={{
          height: navBarHeight,
          paddingTop: menuButtonBounding.top,
          paddingBottom: 5,
          boxSizing: "border-box",
          backgroundColor: bgColor,
        }}
      >
        {children ? (
          children
        ) : (
          <View className="taro-container__navbar_content_wrap">
            {leftContent ? (
              <View className="taro-container__left_operation">
                {leftContent}
              </View>
            ) : (
              <>
                {back && (
                  <View
                    className="taro-container__left_operation"
                    onClick={onBack}
                  >
                    <Icon type="clear" />
                  </View>
                )}
              </>
            )}
            {title && (
              <View className="taro-container__title_wrap">
                <Text
                  style={{
                    color: titleColor,
                  }}
                >
                  {title}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  export interface ContentProps extends ViewProps {
    children?: ReactNode | null;
  }
  export function Content(props: ContentProps) {
    const { children } = props;
    return <>{children}</>;
  }

  export interface FooterBarProps {
    children?: ReactNode;
    bgColor?: string;
    onFooterBarRenderAfter?: (
      dom: NodesRef.BoundingClientRectCallbackResult
    ) => void;
  }
  export function FooterBar({
    children,
    bgColor = "#fff",
    onFooterBarRenderAfter,
    ...viewProps
  }: FooterBarProps & Omit<ViewProps, "style">) {
    const isIPhone = useIsIPhoneX();
    const { className, id, ...otherViewProps } = viewProps;
    useEffect(() => {
      Taro.nextTick(() => {
        createSelectorQuery()
          .select("#taro-container__footerBarNode")
          .boundingClientRect((res) => {
            console.log(res);
            if (res?.height) {
              onFooterBarRenderAfter?.(res);
            }
          })
          .exec();
      });
    }, [onFooterBarRenderAfter]);
    return (
      <View
        id="taro-container__footerBarNode"
        className={`taro-container__footer_wrap ${
          isIPhone ? "taro-container__safe_bottom" : ""
        }  ${className ?? ""}`}
        style={{
          backgroundColor: bgColor,
        }}
        {...otherViewProps}
      >
        {children}
      </View>
    );
  }
}

export default Container;
