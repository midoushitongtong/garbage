import 'package:flutter/material.dart';
import 'setting.dart';

import 'home.dart';
import 'category.dart';

class BottomTab extends StatefulWidget {
  const BottomTab({Key? key}) : super(key: key);

  _BottomTabState createState() => _BottomTabState();
}

class _BottomTabState extends State<BottomTab> {
  int _currentIndex = 0;

  List _pageList = [Home(), Category(), Setting()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: (int index) {
          setState(() {
            _currentIndex = index;
          });
        },
        unselectedItemColor: Colors.black54,
        selectedItemColor: Colors.blue,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(
                bottom: 3,
              ),
              child: Icon(Icons.home),
            ),
            label: 'Home',
          ),
          // 放置一个空的按钮
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(
                bottom: 3,
              ),
              child: Icon(Icons.category),
            ),
            label: 'Category',
          ),
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(
                bottom: 3,
              ),
              child: Icon(Icons.settings),
            ),
            label: 'Setting',
          )
        ],
      ),
      body: _pageList[_currentIndex],
    );
  }
}
