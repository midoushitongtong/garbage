import 'package:flutter/material.dart';

class BaseFloatingActionButton extends StatefulWidget {
  const BaseFloatingActionButton({Key? key}) : super(key: key);

  @override
  _BaseFloatingActionButtonState createState() =>
      _BaseFloatingActionButtonState();
}

class _BaseFloatingActionButtonState extends State<BaseFloatingActionButton> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Floating Action Button'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.yellow,
        child: Icon(
          Icons.add,
          color: Colors.black,
          size: 25,
        ),
      ),
      floatingActionButtonLocation:
          FloatingActionButtonLocation.miniCenterDocked,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('123'),
          ],
        ),
      ),
    );
  }
}
