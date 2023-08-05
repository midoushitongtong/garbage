package com.midoushitongtong.component06.bean;

import com.midoushitongtong.component06.R;

import java.util.ArrayList;
import java.util.List;

public class Star {
    public int image;
    public String name;
    public String description;

    public Star(int image, String name, String description) {
        this.image = image;
        this.name = name;
        this.description = description;
    }

    private final static int[] startIconArray = {
            R.drawable.diqiu,
            R.drawable.jinxing,
            R.drawable.muxing,
            R.drawable.shuixing,
            R.drawable.huoxing,
            R.drawable.tuxing,
    };

    private final static String[] startArray = {
            "地球",
            "金星",
            "木星",
            "水星",
            "火星",
            "土星"
    };

    private final static String[] starDescriptionArray = {
            "地球的描述",
            "金星的描述",
            "木星的描述",
            "水星的描述",
            "火星的描述",
            "土星的描述"
    };

    public static List<Star> getDefaultList() {
        List<Star> list = new ArrayList<>();
        for (int i = 0; i < startIconArray.length; i++) {
            list.add(new Star(startIconArray[i], startArray[i], starDescriptionArray[i]));
        }
        return list;
    }
}
