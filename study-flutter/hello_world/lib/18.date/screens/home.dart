import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_date');
              },
              child: Text('前往 Base Date 页面'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/date_library');
              },
              child: Text('前往 Date Library 页面'),
            ),
          ],
        ),
      ),
    );
  }
}
