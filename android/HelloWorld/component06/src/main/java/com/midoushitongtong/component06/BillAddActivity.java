package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.midoushitongtong.component06.database.BillDBHelper;
import com.midoushitongtong.component06.entity.BillInfo;
import com.midoushitongtong.component06.util.DateUtil;
import com.midoushitongtong.component06.util.ToastUtil;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class BillAddActivity extends AppCompatActivity {
    private TextView dateTextView;
    private BillDBHelper billDBHelper;

    private void showDatePickDialog() {
        Calendar calendar = Calendar.getInstance();
        DatePickerDialog datePickerDialog = new DatePickerDialog(
                this,
                (DatePicker datePickerView, int year, int month, int dayOfMonth) -> {
                    calendar.set(Calendar.YEAR, year);
                    calendar.set(Calendar.MONTH, month);
                    calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                    dateTextView.setText(DateUtil.getDate(calendar));
                },
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH)
        );
        datePickerDialog.show();
    }

    private void save() {
        RadioGroup typeRadioGroup = findViewById(R.id.rg_type);
        EditText remarkEditText = findViewById(R.id.et_remark);
        EditText amountEditText = findViewById(R.id.et_amount);

        BillInfo billInfo = new BillInfo();
        billInfo.date = dateTextView.getText().toString();
        billInfo.type = typeRadioGroup.getCheckedRadioButtonId() == R.id.rb_income
                ? BillInfo.BILL_TYPE_INCOME
                : BillInfo.BILL_TYPE_COST;
        billInfo.remark = remarkEditText.getText().toString();
        billInfo.amount = Double.parseDouble(amountEditText.getText().toString());

        billDBHelper = BillDBHelper.getInstance(this);
        if (billDBHelper.save(billInfo) > 0) {
            ToastUtil.show(this, "添加账单成功!");
        }

//        for (BillInfo billInfo1 : billDBHelper.selectAll()) {
//            Log.d("ning", billInfo1.toString());
//        }
    }

    private void init() {
        TextView titleTextView = findViewById(R.id.tv_title);
        TextView optionTextView = findViewById(R.id.tv_option);
        dateTextView = findViewById(R.id.tv_date);
        Button saveButton = findViewById(R.id.btn_save);
        ImageView backImageView = findViewById(R.id.iv_back);

        Calendar calendar = Calendar.getInstance();

        titleTextView.setText("请填写账单");
        optionTextView.setText("账单列表");
        dateTextView.setText(DateUtil.getDate(calendar));

        // 设置点击事件, 点击之后弹出日期选择框, 更新当前日期
        dateTextView.setOnClickListener(view -> {
            showDatePickDialog();
        });

        // 设置点击事件，跳转页面
        optionTextView.setOnClickListener(view -> {
            Intent intent = new Intent();
            intent.setClass(this, BillPagerActivity.class);
            startActivity(intent);
        });

        backImageView.setVisibility(View.GONE);

        // 保存按钮
        saveButton.setOnClickListener(view -> {
            save();
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bill_add);
        init();
        billDBHelper = BillDBHelper.getInstance(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}