package com.midoushitongtong.component06.adapter;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.midoushitongtong.component06.fragment.BillFragment;

import java.util.Calendar;

public class BillPagerAdapter extends FragmentStatePagerAdapter {
    private Calendar calendar;
    public BillPagerAdapter(@NonNull FragmentManager fm, Calendar calendar) {
        // BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT: 懒加载
        super(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        this.calendar = calendar;;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        int month = position + 1;
        String zeroMonth = month < 10 ? "0" + month : String.valueOf(month);
        String yearMonth = calendar.get(Calendar.YEAR) + "-" + zeroMonth;
        Log.d("ning", yearMonth);
        return BillFragment.newInstance(yearMonth);
    }

    @Override
    public int getCount() {
        return 12;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return (position + 1) + "月份";
    }

    @Override
    public int getItemPosition(@NonNull Object object) {
        return POSITION_NONE;
    }
}
