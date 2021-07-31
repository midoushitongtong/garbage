import 'package:flutter/material.dart';

class ArticleShow extends StatefulWidget {
  final arguments;

  ArticleShow({Key? key, this.arguments}) : super(key: key);

  @override
  _ArticleShowState createState() => _ArticleShowState(arguments: arguments);
}

class _ArticleShowState extends State<ArticleShow> {
  final arguments;

  _ArticleShowState({required this.arguments});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text(
            arguments["title"],
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
