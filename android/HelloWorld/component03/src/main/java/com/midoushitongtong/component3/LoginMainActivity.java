package com.midoushitongtong.component3;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.midoushitongtong.component3.util.ViewUtil;

import java.util.Random;

public class LoginMainActivity extends AppCompatActivity {
    private String verificationCode;

    private String password = "123456";

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
                ViewUtil.hideKeyboard(LoginMainActivity.this, editText);
            }
        }
    }

    private ActivityResultLauncher<Intent> forgotPasswordActivityResultLauncher = registerForActivityResult(
        new ActivityResultContracts.StartActivityForResult(),
        result -> {
            if (result == null || result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
                return;
            }
            password = result.getData().getStringExtra("newPassword");
        }
    );

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
        RadioGroup loginTypeRadioGroup = findViewById(R.id.login_type_radio_group);
        CheckBox rememberPasswordCheckbox = findViewById(R.id.remember_password_checkbox);
        EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        EditText passwordEditText = findViewById(R.id.password_edit_text);

        if (loginTypeRadioGroup.getCheckedRadioButtonId() == R.id.login_type_radio_button_login_by_password) {
            SharedPreferences sharedPreferences = getSharedPreferences("login_form", Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            if (rememberPasswordCheckbox.isChecked()) {
                // 记住密码
                editor.putString("phoneNumber", phoneNumberEditText.getText().toString());
                editor.putString("password", passwordEditText.getText().toString());
                editor.putBoolean("rememberPassword", true);
            } else {
                editor.putString("phoneNumber", null);
                editor.putString("password", null);
                editor.putBoolean("rememberPassword", false);
            }
            editor.commit();
        }

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_main);


        RadioGroup loginTypeRadioGroup = findViewById(R.id.login_type_radio_group);
        LinearLayout passwordLoginFormContainer = findViewById(R.id.password_login_form_container);
        LinearLayout verificationCodeLoginFormContainer = findViewById(R.id.verification_code_login_form_container);
        Button loginButton = findViewById(R.id.login_button);
        Button forgotPasswordButton = findViewById(R.id.forget_password_button);
        Button getVerificationCodeButton = findViewById(R.id.get_verification_code_button);
        EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        EditText passwordEditText = findViewById(R.id.password_edit_text);
        EditText verificationCodeEditText = findViewById(R.id.verification_code_edit_text);
        CheckBox rememberPasswordCheckbox = findViewById(R.id.remember_password_checkbox);


        SharedPreferences sharedPreferences = getSharedPreferences("login_form", Context.MODE_PRIVATE);
        String savedPhoneNumber = sharedPreferences.getString("phoneNumber", "");
        String savedPassword = sharedPreferences.getString("password", "");
        boolean rememberPassword = sharedPreferences.getBoolean("rememberPassword", false);

        if (rememberPassword) {
            rememberPasswordCheckbox.setChecked(true);
            phoneNumberEditText.setText(savedPhoneNumber);
            passwordEditText.setText(savedPassword);
        }

        // 切换登录方式
        loginTypeRadioGroup.setOnCheckedChangeListener((RadioGroup radioGroup, int checkedId) -> {
            if (checkedId == R.id.login_type_radio_button_login_by_password) {
                passwordLoginFormContainer.setVisibility(View.VISIBLE);
                verificationCodeLoginFormContainer.setVisibility(View.GONE);
            }
            if (checkedId == R.id.login_type_radio_button_login_by_verification) {
                passwordLoginFormContainer.setVisibility(View.GONE);
                verificationCodeLoginFormContainer.setVisibility(View.VISIBLE);
            }
        });

        // 监听文本变化事件
        phoneNumberEditText.addTextChangedListener(new HideTextWatcher(phoneNumberEditText, 11));

        // 监听文本变化事件
        passwordEditText.addTextChangedListener(new HideTextWatcher(passwordEditText, 6));

        // 监听文本变化事件
        verificationCodeEditText.addTextChangedListener(new HideTextWatcher(verificationCodeEditText, 6));

        // 忘记密码点击事件
        forgotPasswordButton.setOnClickListener(view -> {
            // 验证手机号表单
            if (!validatePhoneNumber()) {
                return;
            }
            Intent intent = new Intent(this, ForgotPasswordActivity.class);
            intent.putExtra("phoneNumber", phoneNumberEditText.getText().toString());
            forgotPasswordActivityResultLauncher.launch(intent);
        });

        // 获取验证码点击事件
        getVerificationCodeButton.setOnClickListener(view -> {
            // 验证手机号表单
            if (!validatePhoneNumber()) {
                return;
            }
            verificationCode = String.format("%06d", new Random().nextInt(999999));
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("请记住验证码");
            builder.setMessage("手机号: " + phoneNumberEditText.getText().toString() + ", 本次验证码是: " + verificationCode);
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
        });

        // 登录按钮点击事件
        loginButton.setOnClickListener(view -> {
            // 验证手机号表单
            if (!validatePhoneNumber()) {
                return;
            }

            int checkedId = loginTypeRadioGroup.getCheckedRadioButtonId();

            if (checkedId == R.id.login_type_radio_button_login_by_password) {
                // 密码登录
                Log.d("debug", passwordEditText.getText().toString());
                Log.d("debug", password);
                if (!passwordEditText.getText().toString().equals(password)) {
                    Toast.makeText(this, "请输入正确的密码", Toast.LENGTH_SHORT).show();
                    return;
                }
                handleLoginSuccess();
            }

            if (checkedId == R.id.login_type_radio_button_login_by_verification) {
                // 验证码登录
                if (!verificationCodeEditText.getText().toString().equals(verificationCode)) {
                    Toast.makeText(this, "请输入正确的验证码", Toast.LENGTH_SHORT).show();
                    return;
                }
                handleLoginSuccess();
            }
        });
    }
}