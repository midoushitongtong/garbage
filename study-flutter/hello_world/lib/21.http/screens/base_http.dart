import 'package:flutter/material.dart';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

class BaseHttp extends StatefulWidget {
  BaseHttp({Key? key}) : super(key: key);

  @override
  _BaseHttpState createState() => _BaseHttpState();
}

class _BaseHttpState extends State<BaseHttp> {
  List _userList = [];

  @override
  void initState() {
    super.initState();
  }

  _getData() async {
    var apiUri = Uri.parse('https://jsonplaceholder.typicode.com/users');
    var response = await http.get(apiUri);
    if (response.statusCode == 200) {
      var jsonResponse = convert.jsonDecode(response.body) as List;
      print(jsonResponse[0]['name']);
    } else {
      print('请求失败了 satus: ${response.statusCode}');
    }
  }

  _postData() async {
    var apiUri = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    var response = await http.post(apiUri);
    if (response.statusCode == 201) {
      var jsonResponse =
          convert.jsonDecode(response.body) as Map<String, dynamic>;
      print(jsonResponse['id']);
    } else {
      print('请求失败了 satus: ${response.statusCode}');
    }
  }

  _refreshData() async {
    var apiUri = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    var response = await http.get(apiUri);
    if (response.statusCode == 200) {
      var jsonResponse = convert.json.decode(response.body);
      setState(() {
        _userList = jsonResponse;
      });
    } else {
      print('请求失败了 satus: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BaseHttp'),
      ),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextButton(
                onPressed: _getData,
                child: Text('Get Data'),
              ),
              TextButton(
                onPressed: _postData,
                child: Text('Post Data'),
              ),
              TextButton(
                onPressed: _refreshData,
                child: Text('Render Post Data'),
              ),
              Flexible(
                child: SingleChildScrollView(
                  child: Column(
                    children: _userList
                        .map((item) => Column(
                              children: [
                                Text(
                                  'id: ${item['id']}',
                                  textAlign: TextAlign.center,
                                ),
                                Text(
                                  'title: ${item['title']}',
                                  textAlign: TextAlign.center,
                                ),
                                Text(
                                  'body: ${item['body']}',
                                  textAlign: TextAlign.center,
                                ),
                                Divider(),
                              ],
                            ))
                        .toList(),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
