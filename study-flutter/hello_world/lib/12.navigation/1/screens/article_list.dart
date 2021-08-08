import 'package:flutter/material.dart';

class ArticleList extends StatefulWidget {
  ArticleList({Key? key}) : super(key: key);

  @override
  _ArticleListState createState() => _ArticleListState();
}

class _ArticleListState extends State<ArticleList> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Article List'),
        ),
        body: ListView(
          children: <Widget>[
            Text(
              '文章1',
            ),
            Text(
              '文章2',
            ),
            Text(
              '文章3',
            ),
          ],
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
