import 'package:flutter/material.dart';

class CustomAppBar extends StatefulWidget {
  const CustomAppBar({Key? key}) : super(key: key);

  _CustomAppBarState createState() => _CustomAppBarState();
}

class _CustomAppBarState extends State<CustomAppBar> {
  final List<Tab> tabs = [
    Tab(text: '推荐'),
    Tab(text: '热门'),
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: Colors.cyan,
          title: Text('Custom App Bar Page'),
          leading: IconButton(
            icon: Icon(
              Icons.menu,
            ),
            onPressed: () {
              print('menu');
            },
          ),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.search),
              onPressed: () {
                print('search');
              },
            ),
          ],
          bottom: TabBar(
            indicatorColor: Colors.orange,
            labelColor: Colors.orange,
            unselectedLabelColor: Colors.cyanAccent,
            indicatorSize: TabBarIndicatorSize.label,
            tabs: tabs,
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            ListView(
              children: List<Widget>.filled(50, Text(''))
                  .map((e) => Text('第1个tab'))
                  .toList(),
            ),
            ListView(
              children: List<Widget>.filled(50, Text(''))
                  .map((e) => Text('第2个tab'))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}
