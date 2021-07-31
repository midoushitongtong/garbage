import 'package:flutter/material.dart';
import 'screens/sign-up-step-1.dart';
import 'screens/sign-up-step-2.dart';
import 'screens/bottom_tab.dart';
import 'screens/article_list.dart';
import 'screens/article_show.dart';
import 'screens/sign-in.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final routes = {
    "/": (context) => BottomTab(),
    "/article_list": (context) => ArticleList(),
    "/article_show": (context) => ArticleShow(),
    "/sign_in": (context) => SignIn(),
    "/sign_up_step_1": (context) => SignUpStep1(),
    "/sign_up_step_2": (context) => SignUpStep2(),
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: this.routes,
      initialRoute: "/",
    );
  }
}
