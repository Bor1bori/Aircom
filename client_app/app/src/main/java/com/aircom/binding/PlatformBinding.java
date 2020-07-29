package com.aircom.binding;

import android.content.Context;

import com.aircom.binding.audio.AndroidAudioRenderer;
import com.aircom.binding.crypto.AndroidCryptoProvider;
import com.aircom.nvstream.av.audio.AudioRenderer;
import com.aircom.nvstream.http.LimelightCryptoProvider;

public class PlatformBinding {
    public static String getDeviceName() {
        String deviceName = android.os.Build.MODEL;
        deviceName = deviceName.replace(" ", "");
        return deviceName;
    }

    public static AudioRenderer getAudioRenderer() {
        return new AndroidAudioRenderer();
    }

    public static LimelightCryptoProvider getCryptoProvider(Context c) {
        return new AndroidCryptoProvider(c);
    }
}
