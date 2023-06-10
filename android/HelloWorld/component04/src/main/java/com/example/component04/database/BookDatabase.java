package com.example.component04.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import com.example.component04.dao.BookDao;
import com.example.component04.entity.Book;

// entities 表示数据库有哪些表
// version 表示数据库的版本
// exportSchema 表示是否导出 schema 文件
@Database(entities = {Book.class}, version = 1, exportSchema = true)
public abstract class BookDatabase extends RoomDatabase {
    public abstract BookDao bookDao();
}
