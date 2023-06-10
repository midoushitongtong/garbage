package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;

import com.example.component04.dao.BookDao;
import com.example.component04.entity.Book;
import com.example.component04.util.ToastUtil;

import java.util.List;

public class RoomWriterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_room_writer);

        EditText nameEditText = findViewById(R.id.name_edit_text);
        EditText authorEditText = findViewById(R.id.author_edit_text);
        EditText pressEditText = findViewById(R.id.press_edit_text);
        EditText priceEditText = findViewById(R.id.price_edit_text);


        BookDao bookDao = AppApplication.getInstance().getBookDatabase().bookDao();

        findViewById(R.id.add_button).setOnClickListener(view -> {
            Book book = new Book();
            book.setName(nameEditText.getText().toString());
            book.setAuthor(authorEditText.getText().toString());
            book.setPress(pressEditText.getText().toString());
            book.setPrice(Double.parseDouble(priceEditText.getText().toString()));
            bookDao.insert(book);
            ToastUtil.show(this, "添加成功");
        });

        findViewById(R.id.edit_button).setOnClickListener(view -> {
            Book book = new Book();
            book.setId(2);
            book.setName(nameEditText.getText().toString());
            book.setAuthor(authorEditText.getText().toString());
            book.setPress(pressEditText.getText().toString());
            book.setPrice(Double.parseDouble(priceEditText.getText().toString()));
            bookDao.update(book);
            ToastUtil.show(this, "修改成功");
        });

        findViewById(R.id.delete_button).setOnClickListener(view -> {
            Book book = new Book();
            book.setId(1);
            bookDao.delete(book);
            ToastUtil.show(this, "删除成功");
        });

        findViewById(R.id.select_button).setOnClickListener(view -> {
            List<Book> list = bookDao.queryAll();
            for (Book book : list) {
                Log.d("ning", book.toString());
            }
        });
    }
}