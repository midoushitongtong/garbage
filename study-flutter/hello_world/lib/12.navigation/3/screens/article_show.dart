import 'package:flutter/material.dart';

class ArticleShow extends StatefulWidget {
  ArticleShow({
    Key? key,
  }) : super(key: key);

  @override
  _ArticleShowState createState() => _ArticleShowState();
}

class _ArticleShowState extends State<ArticleShow> {
  @override
  Widget build(BuildContext context) {
    final arguments = ModalRoute.of(context)!.settings.arguments
        as ArticleShowScreenArguments;

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text(arguments.title),
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

class ArticleShowScreenArguments {
  final String title;

  ArticleShowScreenArguments({required this.title});
}
