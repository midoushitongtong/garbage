import 'package:flutter/material.dart';

class BaseRadio extends StatefulWidget {
  const BaseRadio({Key? key}) : super(key: key);

  @override
  _BaseRadioState createState() => _BaseRadioState();
}

class _BaseRadioState extends State<BaseRadio> {
  int _city = 1;
  int _city2 = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Radio'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Radio(
                    value: 1,
                    groupValue: _city,
                    onChanged: (value) {
                      setState(() {
                        _city = value as int;
                      });
                    },
                  ),
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        _city = 1;
                      });
                    },
                    child: Text('北京'),
                  ),
                ],
              ),
              Row(
                children: <Widget>[
                  Radio(
                    value: 2,
                    groupValue: _city,
                    onChanged: (value) {
                      setState(() {
                        _city = value as int;
                      });
                    },
                  ),
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        _city = 2;
                      });
                    },
                    child: Text('上海'),
                  ),
                ],
              ),
              SizedBox(height: 15),
              Divider(),
              SizedBox(height: 15),
              RadioListTile(
                value: 1,
                groupValue: _city2,
                title: Text('北京'),
                subtitle: Text('这是北京'),
                secondary: Container(
                  width: 35,
                  height: 35,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(35),
                    child: Image.asset(
                      'images/a.jpeg',
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                onChanged: (value) {
                  setState(() {
                    _city2 = value as int;
                  });
                },
              ),
              RadioListTile(
                value: 2,
                groupValue: _city2,
                title: Text('上海'),
                subtitle: Text('这是上海'),
                secondary: Container(
                  width: 35,
                  height: 35,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(35),
                    child: Image.asset(
                      'images/a.jpeg',
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                onChanged: (value) {
                  setState(() {
                    _city2 = value as int;
                  });
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
