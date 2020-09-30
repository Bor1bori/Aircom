package com.aircom.data;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class SharedPreference {
    static final String PREF_USER_NAME= "username";
    static final String PREF_LOGIN_TOKEN = "loginToken";

    static SharedPreferences getSharedPreferences(Context ctx) {
        return PreferenceManager.getDefaultSharedPreferences(ctx);
    }

    public static void setLoginToken(Context ctx, String loginToken) {
        SharedPreferences.Editor editor = getSharedPreferences(ctx).edit();
        editor.putString(PREF_LOGIN_TOKEN, loginToken);
        editor.commit();
    }

    public static String getLoginToken(Context ctx) {
        return getSharedPreferences(ctx).getString(PREF_LOGIN_TOKEN, "");
    }

    public static void setUserName(Context ctx, String userName) {
        SharedPreferences.Editor editor = getSharedPreferences(ctx).edit();
        editor.putString(PREF_USER_NAME, userName);
        editor.commit();
    }

    public static String getUserName(Context ctx) {
        return getSharedPreferences(ctx).getString(PREF_USER_NAME, "");
    }

    public static void setLoginChecked(Context ctx, boolean checked, String key) {
        SharedPreferences.Editor editor = getSharedPreferences(ctx).edit();
        editor.putBoolean(key, checked);
        editor.commit();
    }

    public static boolean getLoginChecked(Context ctx, String key) {
        return getSharedPreferences(ctx).getBoolean(key, false);
    }

    public static void clearLoginToken(Context ctx) {
        SharedPreferences.Editor editor = getSharedPreferences(ctx).edit();
        editor.clear(); //clear all stored data
        editor.commit();
    }
}
