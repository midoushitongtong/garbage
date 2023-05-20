package com.midoushitongtong.component01;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.HashMap;
import java.util.Map;

public class CalculatorActivity extends AppCompatActivity {
    // 结果文本
    private TextView resultTextView;
    // 第一个操作数
    private String firstNum = "";
    // 运算符
    private String operator = "";
    // 第二个操作数
    private String secondNum = "";
    // 运算结果
    private String result ="";
    // 显示的文本内容
    private String showText = "";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
        initEvent();
    }

    private void init() {
        setContentView(R.layout.activity_calculator);
        resultTextView = findViewById(R.id.result);
    }

    private void initEvent() {
        // 取消
        findViewById(R.id.cancel).setOnClickListener((View view) -> handleInput("cancel"));
        // 除法
        findViewById(R.id.divide).setOnClickListener((View view) -> handleInput("divide"));
        // 乘法
        findViewById(R.id.multiple).setOnClickListener((View view) ->  handleInput("multiple"));
        // 清除
        findViewById(R.id.clear).setOnClickListener((View view) -> handleInput("clear"));
        // 7
        findViewById(R.id.seven).setOnClickListener((View view) -> handleInput("7"));
        // 8
        findViewById(R.id.eight).setOnClickListener((View view) -> handleInput("8"));
        // 9
        findViewById(R.id.nine).setOnClickListener((View view) -> handleInput("9"));
        // 加
        findViewById(R.id.plus).setOnClickListener((View view) -> handleInput("plus"));
        // 4
        findViewById(R.id.four).setOnClickListener((View view) -> handleInput("4"));
        // 5
        findViewById(R.id.five).setOnClickListener((View view) -> handleInput("5"));
        // 6
        findViewById(R.id.six).setOnClickListener((View view) -> handleInput("6"));
        // 减
        findViewById(R.id.minus).setOnClickListener((View view) -> handleInput("minus"));
        // 1
        findViewById(R.id.one).setOnClickListener((View view) -> handleInput("1"));
        // 2
        findViewById(R.id.two).setOnClickListener((View view) -> handleInput("2"));
        // 3
        findViewById(R.id.three).setOnClickListener((View view) -> handleInput("3"));
        // 求倒数
        findViewById(R.id.reciprocal).setOnClickListener((View view) -> handleInput("reciprocal"));
        // 0
        findViewById(R.id.zero).setOnClickListener((View view) -> handleInput("0"));
        // 小数点
        findViewById(R.id.dot).setOnClickListener((View view) -> handleInput("."));
        // 等号
        findViewById(R.id.equal).setOnClickListener((View view) -> handleInput("="));
        // 开根号
        findViewById(R.id.sqrt).setOnClickListener((View view) -> handleInput("√"));
    }
    
    
    private void handleInput(String inputText) {
        switch (inputText) {
            // 清除
            case "clear":
                clear();
                break;
            // 取消
            case "cancel":
                break;
            // 加、减、乘、除
            case "plus":
            case "minus":
            case "multiple":
            case "divide":
                if (!operator.equals("")) {
                    calculate();
                }
                operator = inputText;
                HashMap<String, String> showTextMap = new HashMap<>();
                showTextMap.put("plus", "+");
                showTextMap.put("minus", "-");
                showTextMap.put("multiple", "x");
                showTextMap.put("divide", "÷");
                refreshShowText(showText + showTextMap.get(inputText));
                break;
            // 等号
            case "=":
                calculate();
                break;
            // 开根号
            case "√":
                if (!operator.equals("")) {
                    calculate();
                }
                double result1 = Math.sqrt(Double.parseDouble(firstNum));
                refreshResult(String.valueOf(result1));
                refreshShowText(showText + "√=" + result1);
                break;
            // 求倒数
            case "reciprocal":
                if (!operator.equals("")) {
                    calculate();
                }
                double result2 = 1.0 / Math.sqrt(Double.parseDouble(firstNum));
                refreshResult(String.valueOf(result2));
                refreshShowText(showText + "/=" + result2);
                break;
            // 其他按钮 (数字和小数点)
            default:
                if (operator.equals("")) {
                    // 无运算符，则拼接第一个操作数
                    firstNum += inputText;
                } else {
                    // 有运算符，则拼接第二个操作数
                    secondNum += inputText;
                }
                if (showText.equals("0") && !inputText.equals(".")) {
                    refreshShowText(inputText);
                } else {
                    refreshShowText(showText + inputText);
                }
                break;
        }
    }

    private void refreshShowText(String newShowText) {
        showText = newShowText;
        resultTextView.setText(showText);
    }

    private void refreshResult(String newResult) {
        result = newResult;
        firstNum = newResult;
        operator = "";
        secondNum = "";
    }

    private void clear() {
        refreshResult("");
        refreshShowText("");
    }

    private void calculate() {
        double result = 0;
        switch (operator) {
            case "plus":
                result = Double.parseDouble(firstNum) + Double.parseDouble(secondNum);
                break;
            case "minus":
                result = Double.parseDouble(firstNum) - Double.parseDouble(secondNum);
                break;
            case "multiple":
                result = Double.parseDouble(firstNum) * Double.parseDouble(secondNum);
                break;
            case "divide":
                result = Double.parseDouble(firstNum) / Double.parseDouble(secondNum);
                break;
        }
        refreshResult(String.valueOf(result));
        refreshShowText(showText + "=" + result);
    }
}
