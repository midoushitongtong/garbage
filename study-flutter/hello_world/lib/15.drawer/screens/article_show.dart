import 'package:flutter/material.dart';

class ArticleShow extends StatefulWidget {
  const ArticleShow({Key? key}) : super(key: key);

  _ArticleShowState createState() => _ArticleShowState();
}

class _ArticleShowState extends State<ArticleShow> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Article Show Page'),
      ),
      body: Column(
        children: <Widget>[
          Text('Article Show'),
        ],
      ),
    );
  }
}
