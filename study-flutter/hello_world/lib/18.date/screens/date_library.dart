import 'package:flutter/material.dart';
import 'package:date_format/date_format.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';

class DateLibrary extends StatefulWidget {
  DateLibrary({Key? key}) : super(key: key);

  @override
  _DateLibraryState createState() => _DateLibraryState();
}

class _DateLibraryState extends State<DateLibrary> {
  DateTime _date = DateTime.now();

  DateTime _date2 = DateTime.now();

  DateTime _date3 = DateTime.now();

  void _showDatePicker() async {
    DatePicker.showDatePicker(
      context,
      locale: LocaleType.zh,
      currentTime: _date,
      showTitleActions: true,
      minTime: DateTime(2000),
      maxTime: DateTime.now(),
      onChanged: (DateTime date) {},
      onConfirm: ((DateTime date) {
        setState(
          () {
            _date = date;
          },
        );
      }),
    );
  }

  void _showTimePicker() async {
    DatePicker.showTimePicker(
      context,
      locale: LocaleType.zh,
      currentTime: _date2,
      showTitleActions: true,
      onChanged: (DateTime date) {},
      onConfirm: ((DateTime date) {
        setState(
          () {
            _date2 = date;
          },
        );
      }),
    );
  }

  void _showDateTimePicker() async {
    DatePicker.showDateTimePicker(
      context,
      locale: LocaleType.zh,
      currentTime: _date3,
      showTitleActions: true,
      minTime: DateTime(2000),
      maxTime: DateTime.now(),
      onChanged: (DateTime date) {},
      onConfirm: ((DateTime date) {
        setState(
          () {
            _date3 = date;
          },
        );
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DateLibrary'),
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
                  _showDateTimePicker();
                },
                child: Padding(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      Text(formatDate(_date3, [
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
        ],
      ),
    );
  }
}
