import 'package:flutter/material.dart';

class BaseSwitch extends StatefulWidget {
  const BaseSwitch({Key? key}) : super(key: key);

  @override
  _BaseSwitchState createState() => _BaseSwitchState();
}

class _BaseSwitchState extends State<BaseSwitch> {
  bool _flag = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Switch'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Switch(
                    value: _flag,
                    onChanged: (value) {
                      setState(() {
                        _flag = value;
                      });
                    },
                  ),
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        _flag = !_flag;
                      });
                    },
                    child: Text('切换'),
                  ),
                ],
              ),
              SizedBox(height: 15),
              Divider(),
              SizedBox(height: 15),
            ],
          ),
        ),
      ),
    );
  }
}
