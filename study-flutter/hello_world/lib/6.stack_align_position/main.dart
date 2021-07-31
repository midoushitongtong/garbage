import 'package:flutter/material.dart';

// class App extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       home: Scaffold(
//         appBar: AppBar(
//           title: Text('Home Page'),
//         ),
//         body: Home(),
//       ),
//     );
//   }
// }

// class Home extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Stack(
//       alignment: Alignment(0, 0),
//       children: <Widget>[
//         Container(
//           width: 300,
//           height: 300,
//           color: Colors.cyan,
//         ),
//         Text('hello'),
//       ],
//     );
//   }
// }

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

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        height: 300,
        color: Colors.cyan,
        child: Stack(children: <Widget>[
          Align(
            alignment: Alignment.topLeft,
            child: Icon(
              Icons.search,
              size: 35,
              color: Colors.yellow,
            ),
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Icon(
              Icons.search,
              size: 35,
              color: Colors.yellow,
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: Icon(
              Icons.search,
              size: 35,
              color: Colors.yellow,
            ),
          ),
          Positioned(
            top: 0,
            right: 0,
            child: Icon(
              Icons.search,
              size: 35,
              color: Colors.white,
            ),
          ),
          Positioned(
            top: 300 / 2 - 35 / 2,
            right: 0,
            child: Icon(
              Icons.search,
              size: 35,
              color: Colors.white,
            ),
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: Icon(
              Icons.search,
              size: 35,
              color: Colors.white,
            ),
          ),
        ]),
      ),
    );
  }
}
