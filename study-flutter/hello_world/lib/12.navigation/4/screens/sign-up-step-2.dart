import 'package:flutter/material.dart';

class SignUpStep2 extends StatefulWidget {
  const SignUpStep2({Key? key}) : super(key: key);

  @override
  _SignUpStep2State createState() => _SignUpStep2State();
}

class _SignUpStep2State extends State<SignUpStep2> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Sign Up Step 2'),
        ),
        body: Container(
          child: ElevatedButton(
            child: Text('完成'),
            onPressed: () {
              // replace 到根路由 (会重置组件状态)
              // Navigator.pushReplacementNamed(context, '/');

              // 跳转到根路由, 并清空路由栈 (会重置组件状态)
              // 第三个参数, 用于判断路由 Remove 结束的位置, 如果返回 true 就会停止 Remove
              // Navigator.pushNamedAndRemoveUntil(
              //   context,
              //   '/',
              //   (route) => false,
              // );

              // 返回到根路由 (不会重置组件状态)
              Navigator.popUntil(context, ModalRoute.withName('/'));
            },
          ),
        ),
      ),
    );
  }
}
