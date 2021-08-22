import 'package:flutter/material.dart';
import 'screens/base_button.dart';
import 'screens/base_floating_action_button.dart';
import 'screens/bottom_tab.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final routes = {
    '/': (context) => BottomTab(),
    '/base_button': (context) => BaseButton(),
    '/base_floating_action_button': (context) => BaseFloatingActionButton(),
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // 隐藏右上角 debug
      routes: routes,
      initialRoute: '/',
    );
  }
}
