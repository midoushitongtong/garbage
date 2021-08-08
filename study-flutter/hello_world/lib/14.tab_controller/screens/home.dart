import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          ElevatedButton(
            child: Text('跳转到Custom Tab页面'),
            onPressed: () {
              Navigator.pushNamed(context, '/custom_tab_bar');
            },
          ),
        ],
      ),
    );
  }
}
