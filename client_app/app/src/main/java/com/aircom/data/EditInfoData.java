package com.aircom.data;

import com.google.gson.annotations.SerializedName;

import org.jcodec.containers.mp4.boxes.Edit;

public class EditInfoData {

    public EditInfoData(){

    }
    public EditInfoData(String password, String birthDate, String gender) {
        this.password = password;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    @SerializedName("password")
    private String password;

    @SerializedName("birthdate")
    private String birthDate;

    @SerializedName("gender")
    private String gender;

    public String getPassword(){
        return this.password;
    }
    public String getBirthDate(){
        return this.birthDate;
    }
    public String getGender(){
        return this.gender;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
