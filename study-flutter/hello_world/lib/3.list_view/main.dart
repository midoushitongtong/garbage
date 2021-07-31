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
  // 渲染垂直列表
  // 垂直列表的宽度是自适应的且不可修改, children 只能通过 margin/padding 来设置外边距/内边距
  // @override
  // Widget build(BuildContext context) {
  //   return ListView(
  //     padding: EdgeInsets.all(10),
  //     children: <Widget>[
  //       // ListTile(
  //       //   leading: Container(
  //       //     width: 100,
  //       //     alignment: Alignment.center,
  //       //     child: Icon(
  //       //       Icons.person,
  //       //       size: 25,
  //       //     ),
  //       //   ),
  //       //   title: Text('文章的标题'),
  //       //   subtitle: Text('文章的内容文章的内容文章的内容文章的内容文章的内容'),
  //       // ),
  //       // ListTile(
  //       //   leading: Container(
  //       //     width: 100,
  //       //     child: ClipRRect(
  //       //       borderRadius: BorderRadius.circular(5),
  //       //       child: Image.asset(
  //       //         'images/a.jpeg',
  //       //         fit: BoxFit.cover,
  //       //       ),
  //       //     ),
  //       //   ),
  //       //   title: Text('文章的标题'),
  //       //   subtitle: Text('文章的内容文章的内容文章的内容文章的内容文章的内容'),
  //       //   trailing: Icon(
  //       //     Icons.delete,
  //       //     size: 25,
  //       //   ),
  //       // ),

  //       Container(
  //         margin: EdgeInsets.only(bottom: 10),
  //         child: Image.asset('images/a.jpeg'),
  //       ),
  //       Container(
  //         margin: EdgeInsets.only(bottom: 10),
  //         child: Image.asset('images/a.jpeg'),
  //       ),
  //       Container(
  //         margin: EdgeInsets.only(bottom: 10),
  //         child: Image.asset('images/a.jpeg'),
  //       ),
  //       Container(
  //         margin: EdgeInsets.only(bottom: 10),
  //         child: Image.asset('images/a.jpeg'),
  //       ),
  //       Container(
  //         margin: EdgeInsets.only(bottom: 10),
  //         child: Image.asset('images/a.jpeg'),
  //       )
  //     ],
  //   );
  // }

  // 渲染水平列表
  // 水平列表的高度是自适应的且不可修改, children 只能通过 margin/padding 来设置外边距/内边距
  // @override
  // Widget build(BuildContext context) {
  //   return Container(
  //     height: 200,
  //     child: ListView(
  //       scrollDirection: Axis.horizontal,
  //       padding: EdgeInsets.all(10),
  //       children: <Widget>[
  //         Container(
  //           width: 200,
  //           margin: EdgeInsets.only(right: 10),
  //           color: Colors.cyan,
  //           child: ListView(
  //             children: <Widget>[
  //               Container(
  //                 margin: EdgeInsets.only(bottom: 10),
  //                 child: Image.asset(
  //                   'images/a.jpeg',
  //                   fit: BoxFit.cover,
  //                 ),
  //               ),
  //               Container(
  //                 margin: EdgeInsets.only(bottom: 10),
  //                 child: Image.asset(
  //                   'images/a.jpeg',
  //                   fit: BoxFit.cover,
  //                 ),
  //               ),
  //               Container(
  //                 margin: EdgeInsets.only(bottom: 10),
  //                 child: Image.asset(
  //                   'images/a.jpeg',
  //                   fit: BoxFit.cover,
  //                 ),
  //               ),
  //             ],
  //           ),
  //         ),
  //         Container(
  //           width: 200,
  //           margin: EdgeInsets.only(right: 10),
  //           color: Colors.orange,
  //         ),
  //         Container(
  //           width: 200,
  //           margin: EdgeInsets.only(right: 10),
  //           color: Colors.blue,
  //         ),
  //         Container(
  //           width: 200,
  //           margin: EdgeInsets.only(right: 10),
  //           color: Colors.orange,
  //         ),
  //         Container(
  //           width: 200,
  //           margin: EdgeInsets.only(right: 10),
  //           color: Colors.cyan,
  //         ),
  //         Container(
  //           width: 200,
  //           margin: EdgeInsets.only(right: 10),
  //           color: Colors.blue,
  //         ),
  //       ],
  //     ),
  //   );
  // }

  List<Widget> _buildList() {
    List dataList = [
      {'title': '文章标题1', 'content': '文章内容1'},
      {'title': '文章标题2', 'content': '文章内容2'},
      {'title': '文章标题3', 'content': '文章内容3'},
    ];

    List<Widget> widgetList = dataList.map((item) {
      return ListTile(
        title: Text(item['title']),
        subtitle: Text(item['content']),
      );
    }).toList();

    return widgetList;
  }

  // // 渲染动态列表
  // @override
  // Widget build(BuildContext context) {
  //   return ListView(children: this._buildList());
  // }

  // 使用 list view builder 来渲染列表
  @override
  Widget build(BuildContext context) {
    List<Widget> widgetList = this._buildList();

    return ListView.builder(
      itemCount: widgetList.length,
      itemBuilder: (context, index) {
        return widgetList[index];
      },
    );
  }
}
