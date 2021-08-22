import 'package:flutter/material.dart';
import 'package:hello_world/21.http/screens/base_http.dart';
import 'screens/bottom_tab.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final _routes = {
    '/': (BuildContext context) => BottomTab(),
    '/base_http': (BuildContext context) => BaseHttp(),
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // 隐藏右上角 debug,
      routes: _routes,
      initialRoute: '/',
    );
  }
}
