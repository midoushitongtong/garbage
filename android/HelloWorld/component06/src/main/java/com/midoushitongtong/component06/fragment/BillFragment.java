package com.midoushitongtong.component06.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.adapter.BillListAdapter;
import com.midoushitongtong.component06.database.BillDBHelper;
import com.midoushitongtong.component06.entity.BillInfo;

import java.util.List;

public class BillFragment extends Fragment {
    public static BillFragment newInstance(String yearMonth) {
        BillFragment fragment = new BillFragment();
        Bundle args = new Bundle();
        args.putString("yearMonth", yearMonth);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle arguments = getArguments();
        String yearMonth= arguments.getString("yearMonth");
        View view = inflater.inflate(R.layout.fragment_bill, container, false);
        ListView listView = view.findViewById(R.id.lv_bill);
        BillDBHelper billDBHelper = BillDBHelper.getInstance(getContext());
        List<BillInfo> billInfoList = billDBHelper.selectByMonth(yearMonth);
        BillListAdapter billListAdapter = new BillListAdapter(getContext(), billInfoList);
        listView.setAdapter(billListAdapter);
        return view;
    }
}
