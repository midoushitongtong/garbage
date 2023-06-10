package com.example.component04.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.component04.entity.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserDBHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "user.db";
    private static final int DB_VERSION = 1;
    private static final String TABLE_NAME = "user";
    private static UserDBHelper helper = null;
    private SQLiteDatabase readDB = null;
    private SQLiteDatabase writeDB = null;

    private UserDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    // 创建数据库，执行建表语句
    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql =
                "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                    "name VARCHAR NOT NULL," +
                    "age INTEGER NOT NULL," +
                    "height LONG NOT NULL," +
                    "weight FLOAT NOT NULL," +
                    "married INTEGER NOT NULL," +
                    "updated_time VARCHAR NOT NULL" +
                ");";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "ALTER TABLE " + TABLE_NAME + " ADD COLUMN phoneNumber VARCHAR";
        db.execSQL(sql);
    }

    public static UserDBHelper getInstance(Context context) {
        if (helper == null) {
            helper = new UserDBHelper(context);
        }
        return helper;
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

    public long insert(User user) {
        ContentValues values = new ContentValues();
        values.put("name", user.name);
        values.put("age", user.age);
        values.put("height", user.height);
        values.put("weight", user.weight);
        values.put("married", user.married ? 1 : 0);
        values.put("updated_time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        // nullColumnHack: 如果第三个参数为空，为了保证 SQL 的正常运行，需要填一个列名设置为 NULL 如 INSERT INTO user (name) values (NULL)
        return writeDB.insert(TABLE_NAME, null, values);
    }

    public long insertTransaction(User user) {
        ContentValues values = new ContentValues();
        values.put("name", user.name);
        values.put("age", user.age);
        values.put("height", user.height);
        values.put("weight", user.weight);
        values.put("married", user.married ? 1 : 0);
        values.put("updated_time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        try {
            writeDB.beginTransaction();
            writeDB.insert(TABLE_NAME, null, values);
            int a = 10 / 0;
            writeDB.insert(TABLE_NAME, null, values);
            writeDB.setTransactionSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            writeDB.endTransaction();
        }

        return 1;
    }

    public long deleteAll() {
        return writeDB.delete(TABLE_NAME, "1=1", null);
    }

    public long deleteByName(String name) {
        return writeDB.delete(TABLE_NAME, "name=?", new String[]{ name });
    }

    public long update(User user) {
        ContentValues values = new ContentValues();
        values.put("name", user.name);
        values.put("age", user.age);
        values.put("height", user.height);
        values.put("weight", user.weight);
        values.put("married", user.married ? 1 : 0);
        values.put("updated_time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        return writeDB.update(TABLE_NAME, values,"name=?", new String[]{ user.name });
    }

    public List<User> queryAll() {
        List<User> list = new ArrayList<>();
        Cursor cursor = readDB.query(TABLE_NAME, null, null, null, null, null, null);
        while (cursor.moveToNext()) {
            User user = new User();
            user.id = cursor.getInt(0);
            user.name = cursor.getString(1);
            user.age = cursor.getInt(2);
            user.height = cursor.getLong(3);
            user.weight = cursor.getFloat(4);
            user.married = cursor.getInt(5) == 1;
            list.add(user);
        }
        return list;
    }

    public User queryByName(String name) {
        User user = null;
        Cursor cursor = readDB.query(TABLE_NAME, null, "name=?", new String[]{ name }, null, null, null);
        while (cursor.moveToNext()) {
            user = new User();
            user.id = cursor.getInt(0);
            user.name = cursor.getString(1);
            user.age = cursor.getInt(2);
            user.height = cursor.getLong(3);
            user.weight = cursor.getFloat(4);
            user.married = cursor.getInt(5) == 1;
        }
        return user;
    }
}
