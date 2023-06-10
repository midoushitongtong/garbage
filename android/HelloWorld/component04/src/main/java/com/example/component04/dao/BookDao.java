package com.example.component04.dao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.component04.entity.Book;

import java.util.List;

@Dao
public interface BookDao {
    @Insert
    void insert(Book... book);

    @Delete
    void delete(Book... books);

    @Query("DELETE FROM book")
    void deleteAll();

    @Update
    int update(Book... books);

    @Query("SELECT * FROM book")
    List<Book> queryAll();

    @Query("SELECT * FROM book WHERE name = :name ORDER BY id DESC LIMIT 1")
    Book queryByName(String name);
}
