import 'package:flutter/material.dart';

class BaseInput extends StatefulWidget {
  const BaseInput({Key? key}) : super(key: key);

  @override
  _BaseInputState createState() => _BaseInputState();
}

class _BaseInputState extends State<BaseInput> {
  TextEditingController _username = new TextEditingController();

  TextEditingController _password = new TextEditingController();

  @override
  initState() {
    super.initState();
    _username.text = '初始值';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Base Input'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: <Widget>[
              TextField(),
              SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '用户名',
                ),
              ),
              SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '用户名',
                ),
                maxLines: 4,
              ),
              SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '密码',
                ),
                obscureText: true,
              ),
              SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  icon: Icon(Icons.people),
                  hintText: '用户名',
                ),
              ),
              SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '用户名',
                ),
                controller: _username,
              ),
              SizedBox(height: 16),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '密码',
                ),
                obscureText: true,
                controller: _password,
              ),
              SizedBox(height: 15),
              ElevatedButton(
                onPressed: () {
                  print(_username.text);
                  print(_password.text);
                },
                child: Text('获取用户名和密码的值'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
