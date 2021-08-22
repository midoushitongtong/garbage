import 'package:flutter/material.dart';
import 'package:card_swiper/card_swiper.dart';

class SwiperLibrary extends StatefulWidget {
  SwiperLibrary({Key? key}) : super(key: key);

  @override
  _SwiperLibraryState createState() => _SwiperLibraryState();
}

class _SwiperLibraryState extends State<SwiperLibrary> {
  List _swiperList = [
    {
      'image': 'images/a.jpeg',
    },
    {
      'image': 'images/a.jpeg',
    },
    {
      'image': 'images/a.jpeg',
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('SwiperLibrary'),
      ),
      body: Column(
        children: [
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Swiper(
              // loop: true,
              // autoplay: true,
              // duration: 1000,
              itemCount: _swiperList.length,
              pagination: SwiperPagination(),
              control: SwiperControl(),
              itemBuilder: (BuildContext context, int index) {
                return Image.asset(
                  _swiperList[index]['image'],
                  fit: BoxFit.cover,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
