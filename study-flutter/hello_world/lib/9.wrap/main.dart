import 'package:flutter/material.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text(
            'Home Page',
          ),
        ),
        body: Home(),
      ),
    );
  }
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 500,
      height: 500,
      padding: EdgeInsets.all(10),
      child: Wrap(
        spacing: 10, // 主轴间距
        // runSpacing: 10, // 交叉轴间距
        alignment: WrapAlignment.start, // 主轴对其方式
        // runAlignment: WrapAlignment.spaceAround, // 交叉轴对齐方式
        // direction: Axis.vertical, // 主轴方向, 默认 horizontal 水平
        children: <Widget>[
          MyButton('第1集'),
          MyButton('第2集'),
          MyButton('第3集'),
          MyButton('第4集'),
          MyButton('第5集'),
          MyButton('第6集'),
          MyButton('第7集'),
          MyButton('第8集'),
          MyButton('第9集'),
          MyButton('第10集'),
        ],
      ),
    );
  }
}

class MyButton extends StatelessWidget {
  final String text;

  const MyButton(this.text, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      child: Text(
        this.text,
        style: TextStyle(
          color: Colors.white,
        ),
      ),
      onPressed: () {},
    );
  }
}
