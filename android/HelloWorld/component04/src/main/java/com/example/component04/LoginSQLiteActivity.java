package com.example.component04;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import com.example.component04.database.LoginDBHelper;
import com.example.component04.entity.Login;
import com.example.component04.util.ViewUtil;

public class LoginSQLiteActivity extends AppCompatActivity {
    private String password = "123456";
    private LoginDBHelper loginDBHelper = null;

    private class HideTextWatcher implements TextWatcher {
        private EditText editText;

        private int maxLength;

        public HideTextWatcher(EditText editText, int maxLength) {
            this.editText = editText;
            this.maxLength = maxLength;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }

        @Override
        public void afterTextChanged(Editable s) {
            String value = s.toString();
            if (value.length() == this.maxLength) {
                ViewUtil.hideKeyboard(LoginSQLiteActivity.this, editText);
            }
        }
    }

    // 验证手机号表单
    private boolean validatePhoneNumber() {
        EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        if (phoneNumberEditText.getText().toString().length() < 11) {
            Toast.makeText(this, "请输入正确的手机号", Toast.LENGTH_SHORT).show();
            return false;
        }
        return true;
    }

    // 登录成功
    private void handleLoginSuccess() {
        EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        EditText passwordEditText = findViewById(R.id.password_edit_text);
        CheckBox rememberPasswordCheckbox = findViewById(R.id.remember_password_checkbox);

        Login login = new Login(
                phoneNumberEditText.getText().toString(),
                passwordEditText.getText().toString(),
                rememberPasswordCheckbox.isChecked()
        );

        // 保存登录信息到 sqlite
        loginDBHelper.save(login);

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("登录成功");
        builder.setTitle("点击 确定 按钮返回上个页面");
        builder.setPositiveButton("确认返回", (dialog, which) -> {
            finish();
        });
        builder.setNegativeButton("我再看看", null);
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }

    // init
    private void init() {
        Login login = loginDBHelper.queryLastRow();
        if (login != null && login.remember) {
            EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
            EditText passwordEditText = findViewById(R.id.password_edit_text);
            CheckBox rememberPasswordCheckbox = findViewById(R.id.remember_password_checkbox);

            phoneNumberEditText.setText(login.phoneNumber);
            passwordEditText.setText(login.password);
            rememberPasswordCheckbox.setChecked(login.remember);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_sqlite);


        Button loginButton = findViewById(R.id.login_button);
        EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        EditText passwordEditText = findViewById(R.id.password_edit_text);
        CheckBox rememberPasswordCheckbox = findViewById(R.id.remember_password_checkbox);

        // 监听文本变化事件
        phoneNumberEditText.addTextChangedListener(new HideTextWatcher(phoneNumberEditText, 11));

        // 监听文本变化事件
        passwordEditText.addTextChangedListener(new HideTextWatcher(passwordEditText, 6));

        // 监听 focus 事件
        passwordEditText.setOnFocusChangeListener((view, hasFocus) -> {
            if (hasFocus) {
                Login login = loginDBHelper.queryByPhoneNumber(phoneNumberEditText.getText().toString());
                if (login != null && login.remember) {
                    passwordEditText.setText(login.password);
                    rememberPasswordCheckbox.setChecked(true);
                } else {
                    passwordEditText.setText("");
                    rememberPasswordCheckbox.setChecked(false);
                }
            }
        });

        // 登录按钮点击事件
        loginButton.setOnClickListener(view -> {
            // 验证手机号表单
            if (!validatePhoneNumber()) {
                return;
            }

            // 密码登录
            Log.d("ning", passwordEditText.getText().toString());
            Log.d("ning", password);
            if (!passwordEditText.getText().toString().equals(password)) {
                Toast.makeText(this, "请输入正确的密码", Toast.LENGTH_SHORT).show();
                return;
            }
            handleLoginSuccess();
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        loginDBHelper = LoginDBHelper.getInstance(this);
        loginDBHelper.openReadLink();
        loginDBHelper.openWriteLink();

        init();
    }

    @Override
    protected void onStop() {
        super.onStop();
        loginDBHelper.close();
    }
}