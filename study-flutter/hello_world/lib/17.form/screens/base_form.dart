import 'dart:developer';

import 'package:flutter/material.dart';

class BaseForm extends StatefulWidget {
  const BaseForm({Key? key}) : super(key: key);

  @override
  _BaseFormState createState() => _BaseFormState();
}

class _BaseFormState extends State<BaseForm> {
  TextEditingController _username = new TextEditingController();

  int _sex = 1;

  List _hobbies = [
    {"checked": false, "text": "吃饭"},
    {"checked": false, "text": "睡觉"},
    {"checked": false, "text": "吃饭2"},
    {"checked": false, "text": "睡觉2"},
    {"checked": false, "text": "吃饭3"},
    {"checked": false, "text": "睡觉3"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Form'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: <Widget>[
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '用户名',
                ),
                controller: _username,
              ),
              SizedBox(height: 15),
              Row(
                children: <Widget>[
                  Text('性别: '),
                  Row(
                    children: <Widget>[
                      Radio(
                        value: 1,
                        groupValue: _sex,
                        onChanged: (value) {
                          setState(() {
                            _sex = value as int;
                          });
                        },
                      ),
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _sex = 1;
                          });
                        },
                        child: Text('男'),
                      ),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Radio(
                        value: 2,
                        groupValue: _sex,
                        onChanged: (value) {
                          setState(() {
                            _sex = value as int;
                          });
                        },
                      ),
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _sex = 2;
                          });
                        },
                        child: Text('女'),
                      ),
                    ],
                  )
                ],
              ),
              SizedBox(height: 15),
              Row(
                children: <Widget>[
                  Text('爱好: '),
                  Expanded(
                    flex: 1,
                    child: Wrap(
                      children: _hobbies
                          .map((e) => Container(
                                width: 100,
                                child: Row(
                                  children: [
                                    Checkbox(
                                      value: e['checked'],
                                      onChanged: (value) {
                                        setState(() {
                                          e['checked'] = value;
                                        });
                                      },
                                    ),
                                    Expanded(
                                      flex: 1,
                                      child: GestureDetector(
                                        onTap: () {
                                          setState(() {
                                            e['checked'] = !e['checked'];
                                          });
                                        },
                                        child: Text(
                                          e['text'],
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ))
                          .toList(),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 15),
              Container(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    print(_username.text);
                    print(_sex);
                    print(_hobbies);
                  },
                  child: Text('提交'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
