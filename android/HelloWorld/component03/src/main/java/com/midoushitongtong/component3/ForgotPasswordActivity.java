package com.midoushitongtong.component3;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.midoushitongtong.component3.util.ViewUtil;

import java.util.Random;

public class ForgotPasswordActivity extends AppCompatActivity {

    private String verificationCode;

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
                ViewUtil.hideKeyboard(ForgotPasswordActivity.this, editText);
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);

        String phoneNumber = getIntent().getExtras().getString("phoneNumber");
        EditText passwordEditText = findViewById(R.id.password_edit_text);
        EditText confirmPasswordEditText = findViewById(R.id.confirm_password_edit_text);
        EditText verificationCodeEditText = findViewById(R.id.verification_code_edit_text);
        Button getVerificationCodeButton = findViewById(R.id.get_verification_code_button);
        Button doneButton = findViewById(R.id.done_button);

        // 获取验证码点击事件
        getVerificationCodeButton.setOnClickListener(view -> {
            verificationCode = String.format("%06d", new Random().nextInt(999999));
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("请记住验证码");
            builder.setMessage("手机号: " + phoneNumber + ", 本次验证码是: " + verificationCode);
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
        });

        // 确定按钮点击事件
        doneButton.setOnClickListener(view -> {
            String password = passwordEditText.getText().toString();
            String confirmPassword = confirmPasswordEditText.getText().toString();
            if (password.length() < 6) {
                Toast.makeText(this, "密码长度需要大于等于 6 位", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!password.equals(confirmPassword.toString())) {
                Toast.makeText(this, "两次输入密码不一致, 请检查", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!verificationCodeEditText.getText().toString().equals(verificationCode)) {
                Toast.makeText(this, "请输入正确的验证码", Toast.LENGTH_SHORT).show();
                return;
            }
            Toast.makeText(this, "密码修改成功", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent();
            intent.putExtra("newPassword", password);
            setResult(Activity.RESULT_OK, intent);
            finish();
        });
    }
}