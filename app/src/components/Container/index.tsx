import { View, Text, Image } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import Taro, { eventCenter, NodesRef, useRouter } from "@tarojs/taro";
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
  Children,
  isValidElement,
  ReactElement,
} from "react";

import { createSelectorQuery } from "@tarojs/taro";
import { useDidShow } from "@tarojs/taro";

import "./index.less";

import { useNavBarHeight, useScreenLayout, useSafeArea } from "./hooks";

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
  onFooterBarRenderAfter?: (
    dom: NodesRef.BoundingClientRectCallbackResult
  ) => void;
}
function Container({
  children,
  hasNavBarTop = true,
  hasFooterBarBottom = true,
  onFooterBarRenderAfter,
  ...otherViewProps
}: ContainerProps & ViewProps) {
  const { navbar, content, footerBar, other } = findContainerChildren(children);
  const [footerBarHeight, setFooterBarHeight] = useState(0);
  const { safeBottom } = useSafeArea();
  const navBarHeight = useNavBarHeight();
  const router = useRouter();
  useEffect(() => {
    eventCenter.once(router.onReady, () => {
      Taro.nextTick(() => {
        createSelectorQuery()
          .select("#footerBarNode")
          .boundingClientRect((res) => {
            // console.log(res);
            if (res?.height) {
              setFooterBarHeight(res?.height);
              onFooterBarRenderAfter?.(res);
            }
          })
          .exec();
      });
    });
  }, []);
  return (
    <View {...otherViewProps}>
      {navbar}
      {content && (
        <View
          id="contentNode"
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
    leftBackIconColor?: string;
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
    onBack=() => Taro.navigateBack()
  }: NavbarProps) {
    const { menuButtonBounding } = useScreenLayout();
    const navBarHeight = useNavBarHeight();
    useDidShow(() => {});
    return (
      <View
        id="navbarNode"
        className="navbar_wrap"
        style={{
          height: navBarHeight,
          paddingTop: menuButtonBounding.top,
          paddingBottom: 5,
          boxSizing: "border-box",
          backgroundColor: bgColor,
        }}
      >
        <View className="navbar_content_wrap">
          {leftContent && <View className="left_operation">{leftContent}</View>}
          {!leftContent && back && <View className="left_operation" onClick={onBack}>1</View>}
          {children}
          {title && (
            <View className="title_wrap">
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
      </View>
    );
  }

  export interface ContentProps extends ViewProps {
    children?: ReactNode;
  }
  export function Content(props: ContentProps) {
    const { children, ...viewProps } = props;
    return children;
  }

  export interface FooterBarProps {
    children?: ReactNode;
    bgColor?: string;
  }
  export function FooterBar({ children, bgColor = "#fff" }: FooterBarProps) {
    const { safeBottom } = useSafeArea();
    return (
      <View
        id="footerBarNode"
        className="footerBar_wrap"
        style={{
          paddingBottom: safeBottom,
          backgroundColor: bgColor,
        }}
      >
        {children}
      </View>
    );
  }
}

export default Container;
