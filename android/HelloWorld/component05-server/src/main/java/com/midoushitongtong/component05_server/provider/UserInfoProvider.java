package com.midoushitongtong.component05_server.provider;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.util.Log;

import com.midoushitongtong.component05_server.UserInfoContent;
import com.midoushitongtong.component05_server.database.UserDBHelper;

public class UserInfoProvider extends ContentProvider {
    private UserDBHelper userDBHelper = null;
    private static final UriMatcher URI_MATCHER = new UriMatcher(UriMatcher.NO_MATCH);
    public static final String AUTHORITIES = "com.midoushitongtong.component05_server.provider.UserInfoProvider";
    private static final int MULTIPLE = 1;
    private static final int SINGLE = 2;

    static {
        // 往 uri 添加匹配路径
        URI_MATCHER.addURI(AUTHORITIES, "/user", MULTIPLE);
        URI_MATCHER.addURI(AUTHORITIES, "/user/#", SINGLE);
    }

    public UserInfoProvider() {
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        SQLiteDatabase writeDB = userDBHelper.getWritableDatabase();
        int count = 0;
        switch (URI_MATCHER.match(uri)) {
            // 删除多行
            // com.midoushitongtong.component05_server.provider.UserInfoProvider/user
            case MULTIPLE:
                count = writeDB.delete(UserDBHelper.TABLE_NAME, selection, selectionArgs);
                break;
            // 删除单行
            // com.midoushitongtong.component05_server.provider.UserInfoProvider/user/1
            case SINGLE:
                String id = uri.getLastPathSegment();
                count = writeDB.delete(UserDBHelper.TABLE_NAME, "id=?", new String[]{ id });
                break;
        }
        writeDB.close();
        return count;
    }

    @Override
    public String getType(Uri uri) {
        // TODO: Implement this to handle requests for the MIME type of the data
        // at the given URI.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    // content://com.midoushitongtong.component05_server.provider.UserInfoProvider/user
    @Override
    public Uri insert(Uri uri, ContentValues values) {
        Log.d("ning", "UserInfoProvider insert");
        if (URI_MATCHER.match(uri) == SINGLE) {
            SQLiteDatabase writeDB = userDBHelper.getWritableDatabase();
            long rowId = writeDB.insert(UserDBHelper.TABLE_NAME, null, values);
            writeDB.close();

//            if (rowId > 0) {
                  // 新的 uri
//                Uri newUri = ContentUris.withAppendedId(UserInfoContent.CONTENT_URI, rowId);
                  // 通知监听器
//                getContext().getContentResolver().notifyChange(newUri, null);
//            }
        }
        return uri;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        Log.d("ning", "UserInfoProvider query");
        if (URI_MATCHER.match(uri) == SINGLE) {
            SQLiteDatabase readDB = userDBHelper.getReadableDatabase();
            return readDB.query(UserDBHelper.TABLE_NAME, projection, selection, selectionArgs, null, null, null);
        }
        return null;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
                      String[] selectionArgs) {
        // TODO: Implement this to handle requests to update one or more rows.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public boolean onCreate() {
        Log.d("ning", "UserInfoProvider onCreate");
        userDBHelper = UserDBHelper.getInstance(getContext());
        return true;
    }
}