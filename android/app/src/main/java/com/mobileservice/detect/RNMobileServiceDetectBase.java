package com.mobileservice.detect;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.common.GoogleApiAvailability;
import com.huawei.hms.api.HuaweiApiAvailability;

public class RNMobileServiceDetectBase extends ReactContextBaseJavaModule {

    public RNMobileServiceDetectBase(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // ReactContextBaseJavaModule requires derived class implement getName method. This function returns a string.
    // This string is used to tag the native module on the JavaScript side
    @Override
    public String getName() {
        return "RNMobileServiceDetectBase";
    }

    // Gets the application package name
    // To export a method for JavaScript use, Java methods need to use the @reactmethod annotation
    @ReactMethod
    public void getPackageName() {
        Toast.makeText(getReactApplicationContext(),"RNMobileServiceDetectBase has been called",Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void getService(final Promise promise) {

        String service = getAvailableMobileService();
        if (null == service) {
            promise.reject("-1", "Error with mobile service");
            return;
        }
        WritableMap map = Arguments.createMap();
        map.putString("service", service);

        promise.resolve(map);
    }

    private String getAvailableMobileService() {
        boolean gms = isGmsAvailable();
        boolean hms = isHmsAvailable();
        String result = "";
        if (gms) {
            result = "google";
        } else if (hms) {
            result = "huawei";
        } else {
            result = "none";
        }
        return result;
    }

    private boolean isHmsAvailable() {
        boolean isAvailable = false;
        Context context = getReactApplicationContext();
        if (null != context) {
            int result = HuaweiApiAvailability.getInstance().isHuaweiMobileServicesAvailable(context);
            isAvailable = (com.huawei.hms.api.ConnectionResult.SUCCESS == result);
        }
        Log.i("React", "isHmsAvailable: " + isAvailable);
        return isAvailable;
    }

    private boolean isGmsAvailable() {
        boolean isAvailable = false;
        Context context = getReactApplicationContext();
        if (null != context) {
            int result = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(context);
            isAvailable = (com.google.android.gms.common.ConnectionResult.SUCCESS == result);
        }
        Log.i("React", "isGmsAvailable: " + isAvailable);
        return isAvailable;
    }

}