import 'package:flutter/material.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Home Page'),
        ),
        body: Home(),
      ),
    );
  }
}

// class Home extends StatelessWidget {
//   Widget _buildCardItem() {
//     return Card(
//       margin: EdgeInsets.all(10),
//       child: Container(
//         padding: EdgeInsets.all(10),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: <Widget>[
//             Text(
//               '文章的标题',
//               style: TextStyle(
//                 fontSize: 23,
//               ),
//             ),
//             SizedBox(
//               height: 10,
//             ),
//             Text(
//               '文章的描述',
//             ),
//             SizedBox(
//               height: 10,
//             ),
//             Text(
//               '作者: abc',
//             ),
//             SizedBox(
//               height: 10,
//             ),
//             Text(
//               '发布日期: 2021',
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return ListView(
//       children: [
//         this._buildCardItem(),
//         this._buildCardItem(),
//       ],
//     );
//   }
// }

class Home extends StatelessWidget {
  Widget _buildCardItem(String networkImageUrl) {
    return Card(
      margin: EdgeInsets.all(10),
      child: Column(
        children: <Widget>[
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Image.network(
              networkImageUrl,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child: Row(
              children: <Widget>[
                Container(
                  width: 50,
                  height: 50,
                  child: ClipRRect(
                    borderRadius: BorderRadius.all(Radius.circular(25)),
                    child: Image.network(
                      networkImageUrl,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                SizedBox(
                  width: 10,
                ),
                Expanded(
                  flex: 1,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        '文章的标题',
                        style: TextStyle(
                          fontSize: 15,
                        ),
                      ),
                      Text(
                        '文章的文章的描述文章的描述文章的描述文章的描述描述文章的文章的描述文章的描述文章的描述文章的描述描述文章的文章的描述文章的描述文章的描述文章的描述描述文章的文章的描述文章的描述文章的描述文章的描述描述',
                        overflow: TextOverflow.ellipsis,
                        maxLines: 3,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        this._buildCardItem(
            'https://pic3.zhimg.com/80/v2-73244c6da9560f43df152a35d8aa0020_720w.jpg'),
        this._buildCardItem(
            'https://pic1.zhimg.com/80/v2-f31b1f7c70d5ded0cc41bf3cf83d8ced_720w.jpg'),
        this._buildCardItem(
            'https://pic3.zhimg.com/80/v2-73244c6da9560f43df152a35d8aa0020_720w.jpg'),
        this._buildCardItem(
            'https://pic1.zhimg.com/80/v2-f31b1f7c70d5ded0cc41bf3cf83d8ced_720w.jpg'),
        this._buildCardItem(
            'https://pic1.zhimg.com/80/v2-f31b1f7c70d5ded0cc41bf3cf83d8ced_720w.jpg'),
      ],
    );
  }
}
