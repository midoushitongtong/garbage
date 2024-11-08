package com.midoushitongtong.component06.adapter;

import android.content.Context;
import android.media.Image;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.bean.Star;

import java.util.List;

public class StarBaseAdapter  extends BaseAdapter {
    private Context context;
    private List<Star> starList;

    public StarBaseAdapter(Context context, List<Star> starList) {
        this.context = context;
        this.starList = starList;
    }

    @Override
    public int getCount() {
        return starList.size();
    }

    @Override
    public Object getItem(int position) {
        return starList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if (convertView == null) {
            // 根据布局文件生成转换视图对象
            convertView = LayoutInflater.from(context).inflate(R.layout.spinner_select_item_list_star, null);
            holder = new ViewHolder();
            holder.image = convertView.findViewById(R.id.image);
            holder.name = convertView.findViewById(R.id.name);
            holder.description = convertView.findViewById(R.id.description);
            // 将视图持有者保存到转换试图中
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        Star star = starList.get(position);
        holder.image.setImageResource(star.image);
        holder.name.setText(star.name);
        holder.description.setText(star.description);
        return convertView;
    }

    public final class ViewHolder {
        public ImageView image;
        public TextView name;
        public TextView description;
    }
}
