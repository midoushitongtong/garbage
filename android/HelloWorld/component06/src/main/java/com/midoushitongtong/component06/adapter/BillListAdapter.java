package com.midoushitongtong.component06.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.entity.BillInfo;

import java.util.List;

public class BillListAdapter extends BaseAdapter {
    private Context context;
    private List<BillInfo> billInfoList;

    public BillListAdapter(Context context, List<BillInfo> billInfoList) {
        this.context = context;
        this.billInfoList = billInfoList;
    }

    @Override
    public int getCount() {
        return billInfoList.size();
    }

    @Override
    public Object getItem(int position) {
        return billInfoList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return billInfoList.get(position).id;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder viewHolder;
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.item_bill, null);
            viewHolder = new ViewHolder();
            viewHolder.dateTextView = convertView.findViewById(R.id.tv_date);
            viewHolder.remarkTextView = convertView.findViewById(R.id.tv_remark);
            viewHolder.amountTextView = convertView.findViewById(R.id.tv_amount);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }
        BillInfo billInfo = billInfoList.get(position);
        viewHolder.dateTextView.setText(billInfo.date);
        viewHolder.remarkTextView.setText(billInfo.remark);
        viewHolder.amountTextView.setText(String.format("%s%d元", billInfo.type == 0 ? '+' : '-', (int) billInfo.amount));
        return convertView;
    }

    private final class ViewHolder {
        public TextView dateTextView;
        public TextView remarkTextView;
        public TextView amountTextView;
    }
}
