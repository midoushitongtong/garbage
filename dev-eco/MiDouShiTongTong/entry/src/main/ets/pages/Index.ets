import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  @State
  message: string = 'Index Page';
  @State
  messageTextColor: string = "#000";

  build() {
    RelativeContainer() {
      Column() {
        Text(this.message).id('HelloWorld').fontSize(50).fontWeight(FontWeight.Bold).fontColor(this.messageTextColor)

        Avatar()

        Button('登录').width('100%').margin({ top: 10 }).onClick(() => {
          this.message = "迷都是通通"
          this.messageTextColor = "#f60"
        })

        Button('跳转到 Profile 页面').width('100%').margin({ top: 10 }).onClick(() => {
          router.pushUrl({
            url: 'pages/Profile'
          })
        })
      }
    }
    .height('100%')
    .width('100%')
    .padding(10)
  }
}

@Component
struct Avatar {
  build() {
    Image("https://pic3.zhimg.com/v2-8904e2113a38d23a4680b295d75e4206_b.jpg").width(300).height(300).margin({ top: 10 }).objectFit(ImageFit.Contain)
  }
}

interface A {
  name: string;
};
const a: A = {
  name: '123'
}
console.log(a.name);