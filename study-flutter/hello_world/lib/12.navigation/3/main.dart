import 'package:flutter/material.dart';
import 'screens/bottom_tab.dart';
import 'screens/article_list.dart';
import 'screens/article_show.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final routes = {
    "/": (context) => BottomTab(),
    "/article_list": (context) => ArticleList(),
    "/article_show": (context) => ArticleShow()
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: this.routes,
      initialRoute: "/",
    );
  }
}
