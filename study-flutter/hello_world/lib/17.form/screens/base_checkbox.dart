import 'package:flutter/material.dart';

class BaseCheckbox extends StatefulWidget {
  const BaseCheckbox({Key? key}) : super(key: key);

  @override
  _BaseCheckboxState createState() => _BaseCheckboxState();
}

class _BaseCheckboxState extends State<BaseCheckbox> {
  bool _flag = true;
  bool _flag2 = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Checkbox'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Checkbox(
                    value: _flag,
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          _flag = value;
                        });
                      }
                    },
                  ),
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        _flag = !_flag;
                      });
                    },
                    child: Text('提示文字'),
                  )
                ],
              ),
              SizedBox(height: 15),
              ElevatedButton(
                onPressed: () {
                  print(_flag);
                },
                child: Text('获取当前选中状态'),
              ),
              SizedBox(height: 15),
              Divider(),
              SizedBox(height: 15),
              CheckboxListTile(
                title: Text('提示文字1'),
                subtitle: Text('提示文字2'),
                secondary: Icon(Icons.info),
                value: _flag2,
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _flag2 = value;
                    });
                  }
                },
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
