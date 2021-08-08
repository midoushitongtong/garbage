import 'package:flutter/material.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Home Page'),
        ),
        body: Home(),
      ),
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
    );
  }
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 300.0,
        height: 300.0,
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(
            color: Colors.orange,
            width: 2.5,
          ),
          borderRadius: BorderRadius.all(
            Radius.circular(5),
          ),
        ),
        // transform: Matrix4.translationValues(0, -15, 0), // Y 轴上移 15
        // transform: Matrix4.rotationZ(15 * pi / 180), // 绕 Z 轴旋转 15 °
        // transform: Matrix4.diagonal3Values(1.1, 1.1, 1.1), // X 轴, Y轴 放大 1.1 倍
        // padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
        padding: EdgeInsets.only(
          top: 10,
          bottom: 10,
        ), // 和上面写法一致
        margin: EdgeInsets.only(
          bottom: 55,
        ),
        alignment: Alignment.center,
        child: Text(
          '111111111111111111111111111111111111111111111111111111111111',
          style: TextStyle(
            color: Colors.blue,
            fontSize: 25,
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic,
            decoration: TextDecoration.underline,
            decorationColor: Colors.blue,
            decorationStyle: TextDecorationStyle.dashed,
            letterSpacing: 5,
          ),
          textAlign: TextAlign.center,
          // overflow: TextOverflow.ellipsis,
          // maxLines: 1,
        ),
      ),
    );
  }
}
