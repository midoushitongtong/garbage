import 'package:flutter/material.dart';
import './screens/home.dart';
import './screens/category.dart';
import './screens/search.dart';
import './screens/setting.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  int _currentIndex = 0;

  List _pageList = [Home(), Category(), Search(), Setting()];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Home Page'),
        ),
        body: _pageList[_currentIndex],
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: _currentIndex,
          iconSize: 25,
          selectedFontSize: 11.5,
          unselectedFontSize: 11.5,
          selectedItemColor: Colors.blue,
          onTap: (int index) {
            setState(() {
              _currentIndex = index;
            });
          },
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 3),
                child: Icon(Icons.home),
              ),
              label: '首页',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 3),
                child: Icon(Icons.category),
              ),
              label: '分类',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 3),
                child: Icon(Icons.search),
              ),
              label: '搜索',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(bottom: 3),
                child: Icon(Icons.settings),
              ),
              label: '设置',
            ),
          ],
        ),
      ),
    );
  }
}
