import 'package:flutter/material.dart';

import 'screens/bottom_tab.dart';
import 'screens/swiper_library.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final _routes = {
    '/': (BuildContext context) => BottomTab(),
    '/swiper_library': (BuildContext context) => SwiperLibrary(),
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
