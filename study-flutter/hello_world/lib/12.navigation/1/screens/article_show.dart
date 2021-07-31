import 'package:flutter/material.dart';

class ArticleShow extends StatefulWidget {
  final String title;

  ArticleShow({Key? key, this.title = '默认标题'}) : super(key: key);

  @override
  _ArticleShowState createState() => _ArticleShowState(title: title);
}

class _ArticleShowState extends State<ArticleShow> {
  final String title;

  _ArticleShowState({required this.title});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text(
            title,
          ),
        ),
        body: Text(
          '文章详情',
        ),
        floatingActionButton: FloatingActionButton(
          child: Text('返回'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
