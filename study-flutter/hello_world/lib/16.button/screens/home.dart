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
                Navigator.pushNamed(context, '/base_button');
              },
              child: Text('前往 Base Button 页面'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/base_floating_action_button');
              },
              child: Text('前往 Floating Action Button 页面'),
            )
          ],
        ),
      ),
    );
  }
}
