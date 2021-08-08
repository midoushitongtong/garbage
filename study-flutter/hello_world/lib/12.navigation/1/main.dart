import 'package:flutter/material.dart';
import 'screens/home.dart';
import 'screens/category.dart';
import 'screens/search.dart';
import 'screens/setting.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
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
          onTap: (int index) {
            setState(() {
              _currentIndex = index;
            });
          },
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
                child: Icon(Icons.search),
              ),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: Padding(
                padding: EdgeInsets.only(
                  bottom: 3,
                ),
                child: Icon(Icons.settings),
              ),
              label: 'Setting',
            ),
          ],
        ),
      ),
    );
  }
}
