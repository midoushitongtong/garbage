import 'package:flutter/material.dart';

class Setting extends StatefulWidget {
  const Setting({Key? key}) : super(key: key);

  @override
  _SettingState createState() => _SettingState();
}

class _SettingState extends State<Setting> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          ElevatedButton(
            child: Text('跳转到登录页面'),
            onPressed: () {
              Navigator.pushNamed(context, '/sign_in');
            },
          ),
          ElevatedButton(
            child: Text('跳转到注册页面'),
            onPressed: () {
              Navigator.pushNamed(context, '/sign_up_step_1');
            },
          ),
        ],
      ),
    );
  }
}
