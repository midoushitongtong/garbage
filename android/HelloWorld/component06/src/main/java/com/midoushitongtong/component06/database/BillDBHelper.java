package com.midoushitongtong.component06.database;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.midoushitongtong.component06.entity.BillInfo;
import com.midoushitongtong.component06.entity.Cart;
import com.midoushitongtong.component06.entity.Product;

import java.util.ArrayList;
import java.util.List;

public class BillDBHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "bill.db";
    // 账单信息表
    private static final String BILL_TABLE_NAME = "bill";
    private static final int DB_VERSION = 1;
    private static BillDBHelper dbHelper = null;
    private SQLiteDatabase readDB = null;
    private SQLiteDatabase writeDB = null;

    private BillDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    public static BillDBHelper getInstance(Context context) {
        if (dbHelper == null) {
            dbHelper = new BillDBHelper(context);
            dbHelper.openReadLink();
            dbHelper.openWriteLink();
        }
        return dbHelper;
    }

    // 打开数据库读连接
    public SQLiteDatabase openReadLink() {
        if (readDB == null || !readDB.isOpen()) {
            readDB = dbHelper.getReadableDatabase();
        }
        return readDB;
    }

    // 打开数据库写连接
    public SQLiteDatabase openWriteLink() {
        if (writeDB == null || !writeDB.isOpen()) {
            writeDB = dbHelper.getWritableDatabase();
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

    public long save(BillInfo billInfo) {
        ContentValues contentValues = new ContentValues();
        contentValues.put("date", billInfo.date);
        contentValues.put("type", billInfo.type);
        contentValues.put("remark", billInfo.remark);
        contentValues.put("amount", billInfo.amount);
        return writeDB.insert(BILL_TABLE_NAME, null, contentValues);
    }

    @SuppressLint("Range")
    public List<BillInfo> selectAll() {
        List<BillInfo> list = new ArrayList<>();
        Cursor cursor = readDB.rawQuery("SELECT * FROM " + BILL_TABLE_NAME, null);
        while (cursor.moveToNext()) {
            BillInfo billInfo = new BillInfo();
            billInfo.id = cursor.getInt(cursor.getColumnIndex("id"));
            billInfo.date = cursor.getString(cursor.getColumnIndex("date"));
            billInfo.type = cursor.getInt(cursor.getColumnIndex("type"));
            billInfo.remark = cursor.getString(cursor.getColumnIndex("remark"));
            billInfo.amount = cursor.getDouble(cursor.getColumnIndex("amount"));
            list.add(billInfo);
        }
        cursor.close();
        return list;
    }

    @SuppressLint("Range")
    public List<BillInfo> selectByMonth(String yearMonth) {
        List<BillInfo> list = new ArrayList<>();
        String sql = "SELECT * FROM " + BILL_TABLE_NAME + " WHERE DATE LIKE '" + yearMonth + "%'";
        Log.d("ning", sql);
        Cursor cursor = readDB.rawQuery(sql, null);
        while (cursor.moveToNext()) {
            BillInfo billInfo = new BillInfo();
            billInfo.id = cursor.getInt(cursor.getColumnIndex("id"));
            billInfo.date = cursor.getString(cursor.getColumnIndex("date"));
            billInfo.type = cursor.getInt(cursor.getColumnIndex("type"));
            billInfo.remark = cursor.getString(cursor.getColumnIndex("remark"));
            billInfo.amount = cursor.getDouble(cursor.getColumnIndex("amount"));
            list.add(billInfo);
        }
        cursor.close();
        return list;
    }

    // 创建数据库，执行建表语句
    @Override
    public void onCreate(SQLiteDatabase db) {
        String productSQL =
                "CREATE TABLE IF NOT EXISTS " + BILL_TABLE_NAME + " (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                    "date VARCHAR NOT NULL," +
                    "type INT NOT NULL," +
                    "remark VARCHAR NOT NULL," +
                    "amount DOUBLE NOT NULL" +
                ");";
        db.execSQL(productSQL);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}
