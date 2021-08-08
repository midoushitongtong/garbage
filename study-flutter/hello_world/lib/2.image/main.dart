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
    );
  }
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        height: 600,

        // 加载网络图片
        // child: Image.network(
        //   'https://pic3.zhimg.com/80/v2-73244c6da9560f43df152a35d8aa0020_720w.jpg',
        //   // alignment: Alignment.topLeft,
        //   // fit: BoxFit.contain, // 全图显示, 自动等比例缩放, 和容器可能会有缝隙
        //   // fit: BoxFit.fill, // 全图显示, 图片会被拉伸, 填满容器
        //   // fit: BoxFit.cover, // 自动拉伸或裁剪, 填满容器, 还不会变形
        //   // color: Colors.black38,
        //   // colorBlendMode: BlendMode.color,
        //   // repeat: ImageRepeat.repeatY,
        // ),

        // 设置 image 圆角
        // child: ClipRRect(
        //   borderRadius: BorderRadius.circular(25),
        //   child: Image.network(
        //     'https://pic3.zhimg.com/80/v2-73244c6da9560f43df152a35d8aa0020_720w.jpg',
        //     repeat: ImageRepeat.repeatY,
        //   ),
        // ),

        // 设置 image 圆角的第 2 种方式
        // decoration: BoxDecoration(
        //   borderRadius: BorderRadius.all(
        //     Radius.circular(35),
        //   ),
        //   image: DecorationImage(
        //     image: NetworkImage(
        //       'https://pic3.zhimg.com/80/v2-73244c6da9560f43df152a35d8aa0020_720w.jpg',
        //     ),
        //     fit: BoxFit.cover,
        //   ),
        // ),

        // 加载本地图片
        child: ClipRRect(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(25),
            bottomRight: Radius.circular(25),
          ),
          child: Image.asset(
            'images/a.jpeg',
            repeat: ImageRepeat.repeatY,
          ),
        ),
      ),
    );
  }
}
