import 'package:flutter/material.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text(
            'Home page',
          ),
        ),
        body: Home(),
      ),
    );
  }
}

// grid view
// class Home extends StatelessWidget {
//   Widget build(BuildContext context) {
//     return GridView.count(
//       crossAxisCount: 3,
//       children: List.generate(10, (index) {
//         return Center(
//           child: Text(
//             '123',
//           ),
//         );
//       }),
//     );
//   }
// }

// grid view
// class Home extends StatelessWidget {
//   List<Widget> _buildList() {
//     return List.generate(
//       15,
//       (index) => Container(
//         alignment: Alignment.center,
//         decoration: BoxDecoration(
//           color: Colors.cyan,
//         ),
//         child: Text(
//           '第$index条数据',
//           style: TextStyle(
//             color: Colors.white,
//           ),
//         ),
//       ),
//     );
//   }
//   Widget build(BuildContext context) {
//     return GridView.count(
//       crossAxisCount: 3,
//       crossAxisSpacing: 15.0,
//       mainAxisSpacing: 15.0,
//       childAspectRatio: 0.5,
//       padding: EdgeInsets.all(15.0),
//       children: this._buildList(),
//     );
//   }
// }

// // grid view
// class Home extends StatelessWidget {
//   List<Widget> _buildList() {
//     List dataList = [
//       {'title': '商品1', 'image_url': 'images/a.jpeg'},
//       {'title': '商品2', 'image_url': 'images/a.jpeg'},
//       {'title': '商品3', 'image_url': 'images/a.jpeg'},
//     ];
//     return dataList
//         .map((item) => Container(
//               decoration: BoxDecoration(
//                 border: Border.all(
//                   color: Colors.blue,
//                   width: 1,
//                   style: BorderStyle.solid,
//                 ),
//                 borderRadius: BorderRadius.all(
//                   Radius.circular(15),
//                 ),
//               ),
//               child: Column(
//                 children: [
//                   ClipRRect(
//                     borderRadius: BorderRadius.only(
//                       topLeft: Radius.circular(10),
//                       topRight: Radius.circular(10),
//                     ),
//                     child: Image.asset(
//                       item['image_url'],
//                     ),
//                   ),
//                   SizedBox(
//                     height: 10,
//                   ),
//                   Text(
//                     item['title'],
//                   ),
//                 ],
//               ),
//             ))
//         .toList();
//   }

//   Widget build(BuildContext context) {
//     return GridView.count(
//       crossAxisCount: 2,
//       crossAxisSpacing: 15,
//       mainAxisSpacing: 15,
//       padding: EdgeInsets.all(15),
//       children: this._buildList(),
//     );
//   }
// }

// grid view builder
class Home extends StatelessWidget {
  List _dataList = [
    {'title': '商品1', 'image_url': 'images/a.jpeg'},
    {'title': '商品2', 'image_url': 'images/a.jpeg'},
    {'title': '商品3', 'image_url': 'images/a.jpeg'},
  ];

  Widget _buildListItem(int index) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.blue,
          width: 1,
          style: BorderStyle.solid,
        ),
        borderRadius: BorderRadius.all(
          Radius.circular(15),
        ),
      ),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(10),
              topRight: Radius.circular(10),
            ),
            child: Image.asset(
              this._dataList[index]['image_url'],
            ),
          ),
          SizedBox(
            height: 10,
          ),
          Text(
            this._dataList[index]['title'],
          ),
        ],
      ),
    );
  }

  Widget build(BuildContext context) {
    return GridView.builder(
        padding: EdgeInsets.all(15),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 15,
          crossAxisSpacing: 15,
        ),
        itemCount: this._dataList.length,
        itemBuilder: (BuildContext context, int index) =>
            this._buildListItem(index));
  }
}
