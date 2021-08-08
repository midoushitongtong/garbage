import 'package:flutter/material.dart';

import 'home.dart';
import 'category.dart';

class BottomTab extends StatefulWidget {
  const BottomTab({Key? key}) : super(key: key);

  _BottomTabState createState() => _BottomTabState();
}

class _BottomTabState extends State<BottomTab> {
  int _currentIndex = 0;

  List _pageList = [Home(), Category()];

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
          )
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            // DrawerHeader(
            //   child: Text(
            //     'User',
            //     style: TextStyle(
            //       color: Colors.white,
            //     ),
            //   ),
            //   decoration: BoxDecoration(
            //     image: DecorationImage(
            //       image: AssetImage('images/a.jpeg'),
            //       fit: BoxFit.cover,
            //     ),
            //   ),
            // ),
            UserAccountsDrawerHeader(
              accountName: Text('abc'),
              accountEmail: Text('abc@abc.a'),
              currentAccountPicture: ClipRRect(
                borderRadius: BorderRadius.circular(65),
                child: Image.asset(
                  'images/a.jpeg',
                  fit: BoxFit.cover,
                ),
              ),
              otherAccountsPictures: [
                Image.asset(
                  'images/a.jpeg',
                  fit: BoxFit.cover,
                ),
                Image.asset(
                  'images/a.jpeg',
                  fit: BoxFit.cover,
                ),
              ],
            ),
            Column(
              children: List.filled(15, 0)
                  .map(
                    (e) => GestureDetector(
                      onTap: () {
                        Navigator.pop(context); // 打开 drawer 会入栈, 这里出栈, 也就是关闭侧边栏
                        Navigator.pushNamed(context, '/article_show');
                      },
                      child: Column(
                        children: [
                          Padding(
                            padding: EdgeInsets.all(10),
                            child: Row(
                              children: <Widget>[
                                ClipRRect(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(35)),
                                  child: Container(
                                    width: 35,
                                    height: 35,
                                    color: Colors.cyan,
                                    child: Center(
                                      child: Icon(
                                        Icons.home,
                                        color: Colors.white,
                                        size: 23,
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 10,
                                ),
                                Expanded(
                                  flex: 1,
                                  child: Text(
                                    '1234567890 1234567890 1234567890',
                                    style: TextStyle(fontSize: 15),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Divider(),
                        ],
                      ),
                    ),
                  )
                  .toList(),
            ),
          ],
        ),
      ),
      body: _pageList[_currentIndex],
    );
  }
}
