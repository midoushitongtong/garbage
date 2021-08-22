import 'package:flutter/material.dart';

import 'screens/bottom_tab.dart';
import 'screens/base_dialog.dart';
import 'screens/custom_dialog.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final _routes = {
    '/': (BuildContext context) => BottomTab(),
    '/base_dialog': (BuildContext context) => BaseDialog(),
    '/custom_dialog': (BuildContext context) => CustomDialog(),
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
