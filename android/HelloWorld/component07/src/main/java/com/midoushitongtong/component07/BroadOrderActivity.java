package com.midoushitongtong.component07;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Button;

import com.midoushitongtong.component07.receiver.OrderAReceiver;
import com.midoushitongtong.component07.receiver.OrderBReceiver;
import com.midoushitongtong.component07.receiver.StandardReceiver;

public class BroadOrderActivity extends AppCompatActivity {
  public static final String ORDER_ACTION = "com.midoushitongtong.component07.order";
  private OrderAReceiver orderAReceiver;
  private OrderBReceiver orderBReceiver;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_broad_order);
    init();
  }

  private void init() {
    Button sendStandardButton = findViewById(R.id.sendOrderButton);
    sendStandardButton.setOnClickListener(view -> {
      Intent intent = new Intent(ORDER_ACTION);
      sendOrderedBroadcast(intent, null);
    });
  }

  @Override
  protected void onStart() {
    super.onStart();
    // 多个接收器处理有序广播的顺序
    // 优先级越大的接收器越先收到广播
    // 优先级相同越早注册的接收器越先收到广播
    orderAReceiver = new OrderAReceiver();
    IntentFilter filterA = new IntentFilter(ORDER_ACTION);
    filterA.setPriority(1);
    registerReceiver(orderAReceiver, filterA);

    orderBReceiver = new OrderBReceiver();
    IntentFilter filterB = new IntentFilter(ORDER_ACTION);
    filterB.setPriority(2);
    registerReceiver(orderBReceiver, filterB);

  }

  @Override
  protected void onStop() {
    super.onStop();

    unregisterReceiver(orderAReceiver);
    unregisterReceiver(orderBReceiver);
  }
}