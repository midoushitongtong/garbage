package com.midoushitongtong.component3;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.midoushitongtong.component3.util.ViewUtil;

import org.w3c.dom.Text;

public class FormActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form);

//        OnCheckedChangeListener checkBoxOnCheckedChangeListener = (CompoundButton buttonView, boolean isChecked) -> {
//            String desc = String.format("您%s这个Checkbox", isChecked ? "勾选" : "取消勾选");
//            buttonView.setText(desc);
//        };
//
//        CheckBox systemCheckbox = findViewById(R.id.system_checkbox);
//        CheckBox customCheckbox = findViewById(R.id.custom_checkbox);
//        systemCheckbox.setOnCheckedChangeListener(checkBoxOnCheckedChangeListener);
//        customCheckbox.setOnCheckedChangeListener(checkBoxOnCheckedChangeListener);
//
//        TextView switchStatusText = findViewById(R.id.switch_status_text);
//        SwitchCompat systemSwitch = findViewById(R.id.system_switch);
//        systemSwitch.setOnCheckedChangeListener((CompoundButton buttonView, boolean isChecked) -> {
//            String desc = String.format("Switch 的状态是%s", isChecked ? "开启" : "关闭");
//            switchStatusText.setText(desc);
//        });
//
//
//        TextView switchStatusText2 = findViewById(R.id.switch_status_text2);
//        CheckBox customSwitch = findViewById(R.id.custom_switch);
//        customSwitch.setOnCheckedChangeListener((CompoundButton buttonView, boolean isChecked) -> {
//            String desc = String.format("Switch 的状态是%s", isChecked ? "开启" : "关闭");
//            switchStatusText2.setText(desc);
//        });
//
//        TextView radioSelectResultText = findViewById(R.id.radio_select_status);
//        RadioGroup systemRadioGroup = findViewById(R.id.system_radio_group);
//        systemRadioGroup.setOnCheckedChangeListener((RadioGroup group, int checkedId) -> {
//            String desc = "";
//            if (checkedId == R.id.man) {
//                desc = "你选的是男孩";
//            }
//            if (checkedId == R.id.male) {
//                desc = "你选的是女孩";
//            }
//            radioSelectResultText.setText(desc);
//        });

//        EditText phoneNumberInput = findViewById(R.id.phone_number_input);
//        EditText passwordInput = findViewById(R.id.password_input);
//
//        // OnFocusChangeListener 焦点变化监听器
//        passwordInput.setOnFocusChangeListener((View view, boolean hasFocus) -> {
//            if (hasFocus) {
//                String phoneNumber = phoneNumberInput.getText().toString();
//                if (TextUtils.isEmpty(phoneNumber) || phoneNumber.length() < 11) {
//                    phoneNumberInput.requestFocus();
//                    Toast.makeText(this, "请输入11位电话号码", Toast.LENGTH_SHORT).show();
//                }
//            }
//        });

        EditText phoneNumberInput = findViewById(R.id.phone_number_input);
        phoneNumberInput.addTextChangedListener(new HideTextWatcher(phoneNumberInput, 11));
    }

    private class HideTextWatcher implements TextWatcher {
        // 编辑框对象
        private EditText editText;

        // 声明最大长度
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
            // 获取已输入的文本字符串
            String value = s.toString();
            if ((value.length() == maxLength)) {
                editText.clearFocus();
                // 隐藏输入法键盘
                ViewUtil.hideKeyboard(FormActivity.this, editText);
            }
        }
    }
}