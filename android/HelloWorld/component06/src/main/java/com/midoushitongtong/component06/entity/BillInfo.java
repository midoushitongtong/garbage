package com.midoushitongtong.component06.entity;

public class BillInfo {
    public int id;
    public String date;
    public int type;
    public double amount;
    public String remark;

    // 账单类型, 0 收入
    public static final int BILL_TYPE_INCOME = 0;
    // 账单类型, 1 支出
    public static final int BILL_TYPE_COST = 1;

    @Override
    public String toString() {
        return "BillInfo{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", type=" + type +
                ", amount=" + amount +
                ", remark='" + remark + '\'' +
                '}';
    }
}
