import 'package:flutter/material.dart';
import 'screens/bottom_tab.dart';
import 'screens/custom_app_bar.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final routes = {
    "/": (context) => BottomTab(),
    "/custom_app_bar": (context) => CustomAppBar(),
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // 隐藏右上角 debug
      routes: routes,
      initialRoute: "/",
    );
  }
}
