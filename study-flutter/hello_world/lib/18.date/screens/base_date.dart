import 'package:flutter/material.dart';
import 'package:date_format/date_format.dart';

class BaseDate extends StatefulWidget {
  BaseDate({Key? key}) : super(key: key);

  @override
  _BaseDateState createState() => _BaseDateState();
}

class _BaseDateState extends State<BaseDate> {
  DateTime _date = DateTime.now();

  DateTime _date2 = DateTime.now();

  @override
  void initState() {
    super.initState();

    // 当前时间
    // print(DateTime.now().toString());

    // 当前时间戳
    // print(DateTime.now().millisecondsSinceEpoch.toString());

    // 从时间戳还原日期
    // print(DateTime.fromMillisecondsSinceEpoch(1628948466490));

    // 使用第三方库格式化日期
    // print(formatDate(
    //     DateTime.now(), [yyyy, '年', mm, '月', dd, '日', ' ', HH, ':', nn, ':', ss]));
  }

  void _showDatePicker() async {
    DateTime? result = await showDatePicker(
      context: context,
      initialDate: _date,
      firstDate: DateTime(1980),
      lastDate: DateTime(2100),
    );

    setState(() {
      if (result != null) {
        _date = result;
      }
    });
  }

  void _showTimePicker() async {
    TimeOfDay? result = await showTimePicker(
      context: context,
      initialTime: TimeOfDay(
        hour: _date2.hour,
        minute: _date2.minute,
      ),
    );

    setState(() {
      if (result != null) {
        DateTime temp = DateTime(
          _date2.year,
          _date2.month,
          _date2.day,
          result.hour,
          result.minute,
          0,
        );
        _date2 = temp;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BaseDate'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              InkWell(
                onTap: () {
                  _showDatePicker();
                },
                child: Padding(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      Text(formatDate(_date, [
                        yyyy,
                        '-',
                        mm,
                        '-',
                        dd,
                        ' ',
                        HH,
                        ':',
                        nn,
                        ':',
                        ss,
                      ])),
                      Icon(Icons.arrow_drop_down),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              InkWell(
                onTap: () {
                  _showTimePicker();
                },
                child: Padding(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      Text(formatDate(_date2, [
                        yyyy,
                        '-',
                        mm,
                        '-',
                        dd,
                        ' ',
                        HH,
                        ':',
                        nn,
                        ':',
                        ss,
                        ' ',
                        am
                      ])),
                      Icon(Icons.arrow_drop_down),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
