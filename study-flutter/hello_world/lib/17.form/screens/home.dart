import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_text');
              },
              child: Text('前往 Base Text 页面'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_checkbox');
              },
              child: Text('前往 Base Checkbox 页面'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_radio');
              },
              child: Text('前往 Base Radio 页面'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_switch');
              },
              child: Text('前往 Base Switch 页面'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_form');
              },
              child: Text('前往 Base Form 页面'),
            ),
          ],
        ),
      ),
    );
  }
}
