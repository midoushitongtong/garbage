package com.midoushitongtong.component05_client;

import android.net.Uri;

public class UserInfoContent {
    public static final String AUTHORITIES = "com.midoushitongtong.component05_server.provider.UserInfoProvider";

    // 访问内容提供器的 uri
    public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITIES + "/user");

    // 表的字段名
    public static final String FIELD_NAME_ID = "id";
    public static final String FIELD_NAME_NAME = "name";
    public static final String FIELD_NAME_AGE = "age";
    public static final String FIELD_NAME_HEIGHT = "height";
    public static final String FIELD_NAME_WEIGHT = "weight";
    public static final String FIELD_NAME_MARRIED = "married";
}
