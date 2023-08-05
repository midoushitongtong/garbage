package com.midoushitongtong.component06.entity;

public class Cart {
    public int id;
    public int productId;
    public int count;
    public Product product;

    public Cart() {
    }

    public Cart(int id, int productId, int count) {
        this.id = id;
        this.productId = productId;
        this.count = count;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", productId=" + productId +
                ", count=" + count +
                '}';
    }
}
