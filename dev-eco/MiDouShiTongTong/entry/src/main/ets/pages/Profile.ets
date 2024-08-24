import { router } from '@kit.ArkUI';

@Entry
@Component
struct Profile {
  @State
  message: string = 'Profile page';

  build() {
    RelativeContainer() {
      Column() {
        Text(this.message).id('ProfileHelloWorld').fontSize(50).fontWeight(FontWeight.Bold)

        Button('返回上一页').width('100%').margin({ top: 10 }).onClick(() => {
          router.back()
        })
      }
    }
    .height('100%')
    .width('100%')
    .padding(10)
  }
}