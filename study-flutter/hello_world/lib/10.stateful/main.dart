import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

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

// class Home extends StatefulWidget {
//   const Home({Key? key}) : super(key: key);

//   @override
//   _HomeState createState() => _HomeState();
// }

// class _HomeState extends State<Home> {
//   int count = 0;

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Text(count.toString()),
//         ElevatedButton(
//           child: Text('123'),
//           onPressed: () {
//             setState(() {
//               count++;
//             });
//           },
//         ),
//       ],
//     );
//   }
// }

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<String> list = [];

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: list.map((item) => Text(item)).toList(),
        ),
        ElevatedButton(
          child: Text(
            'add',
          ),
          onPressed: () {
            setState(() {
              list.add((list.length + 1).toString());
            });
          },
        )
      ],
    );
  }
}
