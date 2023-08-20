package com.midoushitongtong.component07.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.util.Log;

public class NetworkReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent != null) {
      // 从系统服务获取连接管理器
      ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);

      NetworkCapabilities capabilities = cm.getNetworkCapabilities(cm.getActiveNetwork());
      if (capabilities != null) {
        if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
          Log.d("debug", "当前使用 wifi 网络");
        } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
          Log.d("debug", "当前使用 蜂窝网络");
        } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN)) {
          Log.d("debug", "当前使用 vpn 网络");
        }
      } else {
        Log.d("debug", "当前没有网络");
      }
    }
  }
}
