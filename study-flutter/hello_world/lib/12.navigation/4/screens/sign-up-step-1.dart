import 'package:flutter/material.dart';

class SignUpStep1 extends StatefulWidget {
  const SignUpStep1({Key? key}) : super(key: key);

  @override
  _SignUpStep1State createState() => _SignUpStep1State();
}

class _SignUpStep1State extends State<SignUpStep1> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Sign Up Step 1'),
        ),
        body: Container(
          child: ElevatedButton(
            child: Text('下一步'),
            onPressed: () {
              Navigator.pushNamed(context, '/sign_up_step_2');
            },
          ),
        ),
      ),
    );
  }
}
