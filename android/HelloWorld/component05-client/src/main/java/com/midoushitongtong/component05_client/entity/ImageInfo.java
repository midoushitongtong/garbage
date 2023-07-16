package com.midoushitongtong.component05_client.entity;

public class ImageInfo {
    public long id;
    public String title;
    public long size;
    public String path;

    @Override
    public String toString() {
        return "ImageInfo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", size=" + size +
                ", path='" + path + '\'' +
                '}';
    }
}
