package com.example.component04.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.example.component04.entity.Login;
import com.example.component04.entity.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LoginDBHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "login.db";
    private static final int DB_VERSION = 1;
    private static final String TABLE_NAME = "login";
    private static LoginDBHelper helper = null;
    private SQLiteDatabase readDB = null;
    private SQLiteDatabase writeDB = null;

    public static LoginDBHelper getInstance(Context context) {
        if (helper == null) {
            helper = new LoginDBHelper(context);
        }
        return helper;
    }

    private LoginDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    // 创建数据库，执行建表语句
    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql =
                "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                    "phoneNumber VARCHAR NOT NULL," +
                    "password VARCHAR NOT NULL," +
                    "remember INTEGER NOT NULL" +
                ");";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    // 打开数据库读连接
    public SQLiteDatabase openReadLink() {
        if (readDB == null || !readDB.isOpen()) {
            readDB = helper.getReadableDatabase();
        }
        return readDB;
    }

    // 打开数据库写连接
    public SQLiteDatabase openWriteLink() {
        if (writeDB == null || !writeDB.isOpen()) {
            writeDB = helper.getWritableDatabase();
        }
        return writeDB;
    }

    // 关闭数据库连接
    public void close() {
        if (readDB != null && readDB.isOpen()) {
            readDB.close();
            readDB = null;
        }
        if (writeDB != null && writeDB.isOpen()) {
            writeDB.close();
            writeDB = null;
        }
    }

    public void save(Login login) {
        try {
            writeDB.beginTransaction();
            deleteByPhoneNumber(login.phoneNumber);
            insert(login);
            writeDB.setTransactionSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            writeDB.endTransaction();
        }
    }

    public long insert(Login login) {
        ContentValues values = new ContentValues();
        values.put("phoneNumber", login.phoneNumber);
        values.put("password", login.password);
        values.put("remember", login.remember ? 1 : 0);
        // nullColumnHack: 如果第三个参数为空，为了保证 SQL 的正常运行，需要填一个列名设置为 NULL 如 INSERT INTO user (name) values (NULL)
        return writeDB.insert(TABLE_NAME, null, values);
    }

    public long deleteByPhoneNumber(String phoneNumber) {
        return writeDB.delete(TABLE_NAME, "phoneNumber=?", new String[]{ phoneNumber });
    }

    public Login queryLastRow() {
        Login login = null;
        String sql = "SELECT * FROM " + TABLE_NAME + " WHERE remember = 1 ORDER BY id DESC LIMIT 1";
        Cursor cursor = readDB.rawQuery(sql, null);
        if (cursor.moveToNext()) {
            login = new Login();
            login.id = cursor.getInt(0);
            login.phoneNumber = cursor.getString(1);
            login.password = cursor.getString(2);
            login.remember = cursor.getInt(3) == 1;
        }
        return login;
    }

    public Login queryByPhoneNumber(String phoneNumber) {
        Login login = null;
        Cursor cursor = readDB.query(TABLE_NAME, null, "phoneNumber=?", new String[]{ phoneNumber }, null, null, null);
        if (cursor.moveToNext()) {
            login = new Login();
            login.id = cursor.getInt(0);
            login.phoneNumber = cursor.getString(1);
            login.password = cursor.getString(2);
            login.remember = cursor.getInt(3) == 1;
        }
        return login;
    }
}
