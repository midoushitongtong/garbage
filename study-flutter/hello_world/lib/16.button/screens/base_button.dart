import 'package:flutter/material.dart';

class BaseButton extends StatefulWidget {
  const BaseButton({Key? key}) : super(key: key);

  @override
  _BaseButtonState createState() => _BaseButtonState();
}

class _BaseButtonState extends State<BaseButton> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Button'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // 普通按钮
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.blue),
                  ),
                  onPressed: () {},
                  child: Text('Button'),
                ),
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.yellow),
                  ),
                  onPressed: () {},
                  child: Text(
                    'Button',
                    style: TextStyle(
                      color: Colors.black,
                    ),
                  ),
                )
              ],
            ),
            // 设置按钮宽高
            Container(
              width: 200, // 给外层设置宽高, 用于设置 button 的宽高
              height: 100,
              child: ElevatedButton(
                onPressed: () {},
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(Colors.cyan),
                  elevation: MaterialStateProperty.all(5), // 阴影
                ),
                child: Text('Button'),
              ),
            ),
            // 自适应宽度
            Row(
              children: [
                Expanded(
                  flex: 1, // 自适应宽度, 屏幕的宽度
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(Colors.cyan),
                      elevation: MaterialStateProperty.all(5), // 阴影
                    ),
                    child: Text('Button'),
                  ),
                ),
              ],
            ),
            // 图标
            ElevatedButton.icon(
              onPressed: () {},
              icon: Icon(Icons.home),
              label: Text('Home'),
            ),
            // 圆角
            ElevatedButton(
              style: ButtonStyle(
                shape: MaterialStateProperty.all(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                    side: BorderSide(color: Colors.blue),
                  ),
                ),
                overlayColor: MaterialStateProperty.all(Colors.cyan), // 水波纹颜色
              ),
              onPressed: () {},
              child: Text('Button'),
            ),
            // 圆形
            Container(
              width: 85,
              height: 85,
              child: ElevatedButton(
                style: ButtonStyle(
                  shape: MaterialStateProperty.all(
                    CircleBorder(
                      side: BorderSide(color: Colors.blue),
                    ),
                  ),
                  side: MaterialStateProperty.all(BorderSide(
                    width: 5,
                    color: Colors.yellow,
                  )),
                ),
                onPressed: () {},
                child: Text('Button'),
              ),
            ),
            // 文本的按钮
            TextButton(
              onPressed: () {},
              child: Text('Button'),
            ),
            // 轮廓的按钮
            OutlinedButton(
              onPressed: () {},
              child: Text('Button'),
            ),
            // 按钮组
            ButtonBar(
              alignment: MainAxisAlignment.center,
              children: <Widget>[
                ElevatedButton(
                  onPressed: () {},
                  child: Text('Button'),
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: Text('Button'),
                ),
              ],
            ),
            MyButton(
              text: 'Button',
              pressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class MyButton extends StatelessWidget {
  final String text;
  final void Function() pressed;
  final num width;
  final num height;

  MyButton({
    Key? key,
    required this.text,
    required this.pressed,
    this.width = 75,
    this.height = 35,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: pressed, child: Text(text));
  }
}
