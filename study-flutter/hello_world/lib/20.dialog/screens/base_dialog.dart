import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class BaseDialog extends StatefulWidget {
  BaseDialog({Key? key}) : super(key: key);

  @override
  _BaseDialogState createState() => _BaseDialogState();
}

class _BaseDialogState extends State<BaseDialog> {
  _showAlertDialog() async {
    String result = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('是否离开当前页面?'),
          content: SingleChildScrollView(
            child: Text('系统不会保留当前数据'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context, "cancel");
              },
              child: Text('取消'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context, 'confirm');
              },
              child: Text('确定'),
            ),
          ],
        );
      },
    );

    if (result == 'cancel') {
      print('点了取消按钮');
    }

    if (result == 'confirm') {
      print('点了确认按钮');
    }
  }

  _showSimpleDialog() async {
    String result = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return SimpleDialog(
          title: Text('选择你的爱好'),
          children: [
            SimpleDialogOption(
              child: Row(
                children: [
                  Radio(
                    value: 1,
                    groupValue: 0,
                    onChanged: (value) {},
                  ),
                  Text('爱好1')
                ],
              ),
              onPressed: () {
                Navigator.pop(context, "爱好1");
              },
            ),
            SimpleDialogOption(
              child: Row(
                children: [
                  Radio(
                    value: 1,
                    groupValue: 0,
                    onChanged: (value) {},
                  ),
                  Text('爱好2')
                ],
              ),
              onPressed: () {
                Navigator.pop(context, "爱好2");
              },
            ),
            SimpleDialogOption(
              child: Row(
                children: [
                  Radio(
                    value: 1,
                    groupValue: 0,
                    onChanged: (value) {},
                  ),
                  Text('爱好3')
                ],
              ),
              onPressed: () {
                Navigator.pop(context, "爱好3");
              },
            )
          ],
        );
      },
    );

    print(result);
  }

  _showModalBottomSheet() async {
    String result = await showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SingleChildScrollView(
          child: Column(
            children: [
              ListTile(
                title: Text('文章1'),
                onTap: () {
                  Navigator.pop(context, '文章1');
                },
              ),
              ListTile(
                title: Text('文章2'),
                onTap: () {
                  Navigator.pop(context, '文章2');
                },
              ),
              ListTile(
                title: Text('文章3'),
                onTap: () {
                  Navigator.pop(context, '文章3');
                },
              )
            ],
          ),
        );
      },
    );

    print(result);
  }

  _showToast() {
    Fluttertoast.showToast(
      msg: "提交完成",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 3,
      backgroundColor: Colors.black54,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BaseDialog'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _showAlertDialog,
              child: Text('AlertDialog'),
            ),
            ElevatedButton(
              onPressed: _showSimpleDialog,
              child: Text('SimpleDialog'),
            ),
            ElevatedButton(
              onPressed: _showModalBottomSheet,
              child: Text('ModalBottomSheet'),
            ),
            ElevatedButton(
              onPressed: _showToast,
              child: Text('Toast'),
            ),
          ],
        ),
      ),
    );
  }
}
