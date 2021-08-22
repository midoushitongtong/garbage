import 'dart:async';

import 'package:flutter/material.dart';
import '../components/custom_dialog.dart';

class CustomDialog extends StatefulWidget {
  CustomDialog({Key? key}) : super(key: key);

  @override
  _CustomDialogState createState() => _CustomDialogState();
}

class _CustomDialogState extends State<CustomDialog> {
  _showCustomDialog() async {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return MyDialog(
          title: 'hello',
          content: 'world',
        );
      },
    );

    // 3 秒后自动关闭
    Timer.periodic(Duration(milliseconds: 3000), (Timer timer) {
      Navigator.pop(context);

      timer.cancel();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CustomDialog'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _showCustomDialog,
              child: Text('CustomDialog'),
            ),
          ],
        ),
      ),
    );
  }
}
