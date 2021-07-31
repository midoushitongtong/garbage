import 'package:flutter/material.dart';
import 'article_show.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          ElevatedButton(
            child: Text('跳转到文章列表页面'),
            onPressed: () {
              Navigator.pushNamed(
                context,
                '/article_list',
              );
            },
          ),
          ElevatedButton(
            child: Text('跳转到文章详情页面并传值'),
            onPressed: () {
              Navigator.pushNamed(
                context,
                '/article_show',
                arguments: ArticleShowScreenArguments(title: '123'),
              );
            },
          ),
        ],
      ),
    );
  }
}
