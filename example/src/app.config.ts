export default defineAppConfig({
  pages: ["pages/index/index", "pages/my/index", "pages/testPage/index"],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
      },
    ],
  },
  entryPagePath: "pages/index/index",
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle:'custom'
  },
});
