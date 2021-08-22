import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:hello_world/18.date/screens/date_library.dart';

import 'screens/bottom_tab.dart';
import 'screens/base_date.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final _routes = {
    '/': (BuildContext context) => BottomTab(),
    '/base_date': (BuildContext context) => BaseDate(),
    '/date_library': (BuildContext context) => DateLibrary(),
  };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // 隐藏右上角 debug,
      routes: _routes,
      initialRoute: '/',
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        Locale('zh', 'CN'),
        Locale('en', 'US'),
      ],
    );
  }
}
