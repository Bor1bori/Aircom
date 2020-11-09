package com.aircom.ui;

import android.graphics.drawable.Drawable;

public class ListViewItem {
    private int type ;

    private String title ;
    private String account ;

    private Drawable usageDrawble;
    private String usedTime;
    private String leftTime;
    private String providedTime;

    public void setType(int type) {
        this.type = type ;
    }
    public int getType(){
        return this.type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Drawable getUsageDrawble() {
        return usageDrawble;
    }

    public void setUsageDrawble(Drawable usageDrawble) {
        this.usageDrawble = usageDrawble;
    }

    public String getUsedTime() {
        return usedTime;
    }

    public void setUsedTime(String usedTime) {
        this.usedTime = usedTime;
    }

    public String getLeftTime() {
        return leftTime;
    }

    public void setLeftTime(String leftTime) {
        this.leftTime = leftTime;
    }

    public String getProvidedTime() {
        return providedTime;
    }

    public void setProvidedTime(String providedTime) {
        this.providedTime = providedTime;
    }
}
