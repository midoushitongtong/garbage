import 'package:flutter/material.dart';

class MyDialog extends Dialog {
  final String title;

  final String content;

  MyDialog({this.title = '', this.content = ''});

  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child: Padding(
        padding: EdgeInsets.only(top: 50, right: 15, bottom: 50, left: 10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Flexible(
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Stack(
                      children: [
                        Align(
                          alignment: Alignment.center,
                          child: Container(
                            padding: EdgeInsets.only(
                              top: 15,
                              right: 50,
                              bottom: 15,
                              left: 50,
                            ),
                            child: Text(title),
                          ),
                        ),
                        Align(
                          alignment: Alignment.topRight,
                          child: Container(
                            width: 50,
                            height: 50,
                            child: InkWell(
                              onTap: () {
                                Navigator.pop(context);
                              },
                              child: Icon(Icons.close),
                            ),
                          ),
                        )
                      ],
                    ),
                    Divider(),
                    Flexible(
                      child: Container(
                        padding: EdgeInsets.all(15),
                        child: SingleChildScrollView(
                          child: Text(content),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
