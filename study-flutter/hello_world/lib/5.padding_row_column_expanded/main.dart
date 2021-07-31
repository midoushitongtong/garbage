import 'package:flutter/material.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: Text(
              'Home Page',
            ),
          ),
          body: Home()),
    );
  }
}

// padding
// class Home extends StatelessWidget {
//   List<Widget> _buildList() {
//     return List.generate(3, (index) {
//       return Padding(
//         padding: EdgeInsets.fromLTRB(5, 5, 5, 0),
//         child: Container(
//           decoration: BoxDecoration(
//             borderRadius: BorderRadius.all(Radius.circular(5)),
//             border: Border.all(
//               color: Colors.blue,
//               style: BorderStyle.solid,
//               width: 1,
//             ),
//           ),
//           child: ClipRRect(
//             borderRadius: BorderRadius.only(
//               topLeft: Radius.circular(5),
//               topRight: Radius.circular(5),
//             ),
//             child: Image.asset(
//               'images/a.jpeg',
//               fit: BoxFit.cover,
//             ),
//           ),
//         ),
//       );
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: EdgeInsets.all(5),
//       child: GridView.count(
//         crossAxisCount: 2,
//         children: this._buildList(),
//       ),
//     );
//   }
// }

// row
// class IconContainer extends StatelessWidget {
//   double size;

//   Color color;

//   IconData icon;

//   IconContainer(this.icon, {this.color = Colors.blue, this.size = 23});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 55,
//       height: 55,
//       color: this.color,
//       child: Center(
//         child: Icon(
//           this.icon,
//           size: this.size,
//           color: Colors.white,
//         ),
//       ),
//     );
//   }
// }

// class Home extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 300,
//       height: 500,
//       color: Color.fromRGBO(0, 0, 0, 0.1),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//         crossAxisAlignment: CrossAxisAlignment.center,
//         children: <Widget>[
//           IconContainer(
//             Icons.home,
//             color: Colors.cyan,
//           ),
//           IconContainer(
//             Icons.person,
//             color: Colors.orange,
//           ),
//           IconContainer(
//             Icons.add,
//             color: Colors.blue,
//           )
//         ],
//       ),
//     );
//   }
// }

// column
// class IconContainer extends StatelessWidget {
//   double size;

//   Color color;

//   IconData icon;

//   IconContainer(this.icon, {this.color = Colors.blue, this.size = 23});

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 55,
//       height: 55,
//       color: this.color,
//       child: Center(
//         child: Icon(
//           this.icon,
//           size: this.size,
//           color: Colors.white,
//         ),
//       ),
//     );
//   }
// }

// class Home extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       width: 300,
//       height: 500,
//       color: Color.fromRGBO(0, 0, 0, 0.1),
//       child: Column(
//         mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//         crossAxisAlignment: CrossAxisAlignment.center,
//         children: <Widget>[
//           IconContainer(
//             Icons.home,
//             color: Colors.cyan,
//           ),
//           IconContainer(
//             Icons.person,
//             color: Colors.orange,
//           ),
//           IconContainer(
//             Icons.add,
//             color: Colors.blue,
//           )
//         ],
//       ),
//     );
//   }
// }

// expanded
class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: Column(
        children: <Widget>[
          Container(
            height: 200,
            color: Colors.cyan,
          ),
          SizedBox(
            height: 10,
          ),
          Row(
            children: <Widget>[
              Expanded(
                flex: 2,
                child: Container(
                  height: 200,
                  child: Image.asset(
                    'images/a.jpeg',
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
                  children: <Widget>[
                    Container(
                      height: 95,
                      child: Image.asset(
                        'images/a.jpeg',
                        fit: BoxFit.cover,
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Container(
                      height: 95,
                      child: Image.asset(
                        'images/a.jpeg',
                        fit: BoxFit.cover,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
