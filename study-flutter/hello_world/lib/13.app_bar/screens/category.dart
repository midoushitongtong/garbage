import 'package:flutter/material.dart';

class Category extends StatefulWidget {
  const Category({Key? key}) : super(key: key);

  _CategoryState createState() => _CategoryState();
}

class _CategoryState extends State<Category> {
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
          title: Row(
            children: <Widget>[
              Expanded(
                flex: 1,
                child: TabBar(
                  isScrollable: true, // 当一行放不下的时候, 可横向滚动继续查看
                  indicatorColor: Colors.orange,
                  labelColor: Colors.orange,
                  unselectedLabelColor: Colors.cyanAccent,
                  indicatorSize: TabBarIndicatorSize.label,
                  tabs: tabs,
                ),
              ),
            ],
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
