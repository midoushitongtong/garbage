import 'package:flutter/material.dart';
import 'screens/bottom_tab.dart';
import 'screens/base_input.dart';
import 'screens/base_checkbox.dart';
import 'screens/base_radio.dart';
import 'screens/base_switch.dart';
import 'screens/base_form.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final routes = {
    '/': (context) => BottomTab(),
    '/base_text': (context) => BaseInput(),
    '/base_checkbox': (context) => BaseCheckbox(),
    '/base_radio': (context) => BaseRadio(),
    '/base_switch': (context) => BaseSwitch(),
    '/base_form': (context) => BaseForm(),
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
