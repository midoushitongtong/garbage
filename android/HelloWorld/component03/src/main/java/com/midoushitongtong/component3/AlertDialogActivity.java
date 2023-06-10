package com.midoushitongtong.component3;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;
import android.widget.TimePicker;

import org.w3c.dom.Text;

import java.util.Calendar;
import java.util.Date;

public class AlertDialogActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_alert_dialog);

//        TextView message = findViewById(R.id.message);
//        Button showAlertDialogButton = findViewById(R.id.show_alert_dialog_button);
//        showAlertDialogButton.setOnClickListener((View view) -> {
//            // 创建对话框的构造器
//            AlertDialog.Builder builder = new AlertDialog.Builder(this);
//            // 设置对话框标题
//            builder.setTitle("尊敬的用户");
//            // 设置对话框内容
//            builder.setMessage("确认退出登录吗?");
//            // 设置对话框确认按钮点击监听
//            builder.setPositiveButton("确认", (dialog, which) -> {
//                message.setText("点击了确认");
//            });
//            // 设置对话框取消按钮点击监听
//            builder.setNegativeButton("取消", (dialog, which) -> {
//                message.setText("点击了取消");
//            });
//            // 根据构建器创建提示话对象
//            AlertDialog dialog = builder.create();
//            // 显示对话框
//            dialog.show();
//        });

//        TextView message = findViewById(R.id.message);
//        DatePicker datePicker = findViewById(R.id.date_picker);
//        Button confirmButton = findViewById(R.id.confirm_button);
//        Button showDatePickerDialogButton = findViewById(R.id.show_date_picker_dialog_button);
//
//        confirmButton.setOnClickListener((View view) -> {
//            String desc = String.format("您选择的日期是%s年%s月%s日", datePicker.getYear(), datePicker.getMonth() + 1, datePicker.getDayOfMonth());
//            message.setText(desc);
//        });
//
//        showDatePickerDialogButton.setOnClickListener((View view) -> {
//            DatePickerDialog datePickerDialog = new DatePickerDialog(this, (DatePicker datePicker1, int year, int month, int dayOfMonth) -> {
//                String desc = String.format("您选择的日期是%s年%s月%s日", year, month + 1, dayOfMonth);
//                message.setText(desc);
//            }, 2023, 4, 30);
//            datePickerDialog.show();
//        });

        TextView message = findViewById(R.id.message);
        TimePicker timePicker = findViewById(R.id.timer_picker);
        Button showTimePickerDialog = findViewById(R.id.show_timer_picker_dialog);
        Button confirm = findViewById(R.id.confirm);
        confirm.setOnClickListener((View) -> {
            String desc = String.format("您选择的时间是 %d 时 %d 分", timePicker.getHour(), timePicker.getMinute());
            message.setText(desc);
        });
        showTimePickerDialog.setOnClickListener((View view) -> {
            Calendar calendar = Calendar.getInstance();
            TimePickerDialog timePickerDialog = new TimePickerDialog(this,
                new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                        String desc = String.format("您选择的时间是 %d 时 %d 分", hourOfDay, minute);
                        message.setText(desc);
                    }
                },
                calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE),
                // true 表示 24 小时制, false 表示 12 小时制
                true
            );
            timePickerDialog.show();
        });
    }
}