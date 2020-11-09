package com.aircom;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Collections;
import java.util.concurrent.LinkedBlockingQueue;

import com.aircom.binding.PlatformBinding;
import com.aircom.computers.ComputerManagerListener;
import com.aircom.computers.ComputerManagerService;
import com.aircom.data.PcDeallocationResponse;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;
import com.aircom.nvstream.http.ComputerDetails;
import com.aircom.nvstream.http.NvHTTP;
import com.aircom.nvstream.http.PairingManager;
import com.aircom.preferences.StreamSettings;
import com.aircom.ui.MyPageFragment;
import com.aircom.ui.PCInactiveFragment;
import com.aircom.utils.Dialog;
import com.aircom.utils.ServerHelper;
import com.aircom.utils.SpinnerDialog;
import com.aircom.utils.UiHelper;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import android.app.ActionBar;
import android.app.Activity;
import android.app.FragmentTransaction;
import android.app.Service;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.view.Gravity;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.annotation.NonNull;
import android.app.Fragment;


import org.xmlpull.v1.XmlPullParserException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddComputerAutomatically extends Activity {
    public boolean runningPolling, freezeUpdates, inForeground;
    boolean doubleBackToExitPressedOnce = false;
    public ComputerManagerService.ComputerManagerBinder managerBinder;
    public static final LinkedBlockingQueue<String> computersToAdd = new LinkedBlockingQueue<>();
    public Thread addThread;
    public static ServiceAPI service;
    public static String hostAddress;
    public final ServiceConnection serviceConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, final IBinder binder) {
            managerBinder = ((ComputerManagerService.ComputerManagerBinder)binder);
            startAddThread();
        }

        public void onServiceDisconnected(ComponentName className) {
            joinAddThread();
            managerBinder = null;
        }
    };

    public boolean isWrongSubnetSiteLocalAddress(String address) {
        try {
            InetAddress targetAddress = InetAddress.getByName(address);
            if (!(targetAddress instanceof Inet4Address) || !targetAddress.isSiteLocalAddress()) {
                return false;
            }

            // We have a site-local address. Look for a matching local interface.
            for (NetworkInterface iface : Collections.list(NetworkInterface.getNetworkInterfaces())) {
                for (InterfaceAddress addr : iface.getInterfaceAddresses()) {
                    if (!(addr.getAddress() instanceof Inet4Address) || !addr.getAddress().isSiteLocalAddress()) {
                        // Skip non-site-local or non-IPv4 addresses
                        continue;
                    }

                    byte[] targetAddrBytes = targetAddress.getAddress();
                    byte[] ifaceAddrBytes = addr.getAddress().getAddress();

                    // Compare prefix to ensure it's the same
                    boolean addressMatches = true;
                    for (int i = 0; i < addr.getNetworkPrefixLength(); i++) {
                        if ((ifaceAddrBytes[i / 8] & (1 << (i % 8))) != (targetAddrBytes[i / 8] & (1 << (i % 8)))) {
                            addressMatches = false;
                            break;
                        }
                    }

                    if (addressMatches) {
                        return false;
                    }
                }
            }

            // Couldn't find a matching interface
            return true;
        } catch (SocketException e) {
            e.printStackTrace();
            return false;
        } catch (UnknownHostException e) {
            return false;
        }
    }

    public void doAddPc(String host) {
        boolean wrongSiteLocal = false;
        boolean success;
        final ComputerDetails details = new ComputerDetails();

        //페어링 알림 메세지 띄울 필요x
        /*SpinnerDialog dialog = SpinnerDialog.displayDialog(this, getResources().getString(R.string.title_add_pc),
            getResources().getString(R.string.msg_add_pc), false);*/

        try {
            details.manualAddress = host;
            success = managerBinder.addComputerBlocking(details);
        } catch (IllegalArgumentException e) {
            // This can be thrown from OkHttp if the host fails to canonicalize to a valid name.
            // https://github.com/square/okhttp/blob/okhttp_27/okhttp/src/main/java/com/squareup/okhttp/HttpUrl.java#L705
            e.printStackTrace();
            success = false;
        }
        if (!success){
            wrongSiteLocal = isWrongSubnetSiteLocalAddress(host);
        }

        //dialog.dismiss();

        if (wrongSiteLocal) {
            Dialog.displayDialog(this, getResources().getString(R.string.conn_error_title), getResources().getString(R.string.addpc_wrong_sitelocal), false);
            PCInactiveFragment.setConnectionViewInactive();
            requestPcDeallocate();

        }
        else if (!success) {
            Dialog.displayDialog(this, getResources().getString(R.string.conn_error_title), getResources().getString(R.string.addpc_fail), false);
            PCInactiveFragment.setConnectionViewInactive();
            requestPcDeallocate();
        }
        else {
            AddComputerAutomatically.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.addpc_success), Toast.LENGTH_LONG).show();

                    if (!isFinishing()) {
                        // 만약 pc가 pairing 되지 않은 상태라면
                        if (details.pairState != PairingManager.PairState.PAIRED) {
                            doPair(details);
                            return;
                        }
                        Intent intent = new Intent(AddComputerAutomatically.this, AppView.class);
                        intent.putExtra(AppView.NAME_EXTRA, details.name);
                        intent.putExtra(AppView.UUID_EXTRA, details.uuid);
                        intent.putExtra(AppView.NEW_PAIR_EXTRA, true);
                        startActivity(intent);
                        PCInactiveFragment.setConnectionViewInactive();
                        //AddComputerManually.this.finish();
                    }
                }
            });
        }

    }

    public void startAddThread() {
        addThread = new Thread() {
            @Override
            public void run() {
                while (!isInterrupted()) {
                    String computer;

                    try {
                        computer = computersToAdd.take();
                    } catch (InterruptedException e) {
                        return;
                    }

                    doAddPc(computer);
                }
            }
        };
        addThread.setName("UI - AddComputerManually");
        addThread.start();
    }

    public void joinAddThread() {
        if (addThread != null) {
            addThread.interrupt();

            try {
                addThread.join();
            } catch (InterruptedException ignored) {}

            addThread = null;
        }
    }

    @Override
    protected void onStop() {
        super.onStop();

        Dialog.closeDialogs();
        SpinnerDialog.closeDialogs(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (managerBinder != null) {
            joinAddThread();
            unbindService(serviceConnection);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_computer_automatically);
        setInitialView();
        setBottomNavigationView();
        UiHelper.setLocale(this);
        setActionBar();
        UiHelper.notifyNewRootView(this);
        service = RetrofitClient.getClient().create(ServiceAPI.class);

        // Bind to the ComputerManager service
        bindService(new Intent(AddComputerAutomatically.this,
                    ComputerManagerService.class), serviceConnection, Service.BIND_AUTO_CREATE);
    }

    private void setInitialView() {
        Fragment currentFragment = new PCInactiveFragment();
        FragmentTransaction ft = getFragmentManager().beginTransaction();
        ft.replace(R.id.fragmentLocation, currentFragment).commit();
    }

    private void setBottomNavigationView() {
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setItemIconTintList(null);
        bottomNavigationView.setOnNavigationItemSelectedListener
                (new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.navigation_home:
                        Fragment newFragment = new PCInactiveFragment();
                        FragmentTransaction ft = getFragmentManager().beginTransaction();
                        ft.replace(R.id.fragmentLocation, newFragment).commit();
                        break;
                    case R.id.navigation_my_page:
                        newFragment = new MyPageFragment();
                        ft = getFragmentManager().beginTransaction();
                        ft.replace(R.id.fragmentLocation, newFragment).commit();
                        break;
                    case R.id.navigation_setting:
                        newFragment = new StreamSettings();
                        ft = getFragmentManager().beginTransaction();
                        ft.replace(R.id.fragmentLocation, newFragment).commit();
                        break;
                    default:
                        System.out.println("invalid consequence");
                        break;
                }
                return true;
            }
        });
    }

    private void setActionBar() {
        ActionBar actionBar = getActionBar();
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        actionBar.setCustomView(getLayoutInflater().inflate(R.layout.actionbar_default, null),
                new ActionBar.LayoutParams(
                        ActionBar.LayoutParams.WRAP_CONTENT,
                        ActionBar.LayoutParams.MATCH_PARENT,
                        Gravity.CENTER
                )
        );
    }

    private void requestPcDeallocate() {
        service = RetrofitClient.getClient().create(ServiceAPI.class);
        service.withdrawRequest(SharedPreference.
                getLoginToken(AddComputerAutomatically.this)).
                enqueue(new Callback<PcDeallocationResponse>() {
                    @Override
                    public void onResponse(Call<PcDeallocationResponse> call,
                                           Response<PcDeallocationResponse> response) {
                        System.out.println("status code: "+response.code());
                        System.out.println("response body: "+response.body());
                        PCInactiveFragment.setConnectionViewInactive();
                        // finish();
                    }

                    @Override
                    public void onFailure(Call<PcDeallocationResponse> call,
                                          Throwable t) {
                        Toast.makeText(AddComputerAutomatically.this, "네트워크 상태를 확인해주세요",
                                Toast.LENGTH_SHORT).show();
                    }
                });
    }

    public void doPair(final ComputerDetails computer) {
        if (computer.state == ComputerDetails.State.OFFLINE ||
                ServerHelper.getCurrentAddressFromComputer(computer) == null) {
            //Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.pair_pc_offline), Toast.LENGTH_SHORT).show();
            PCInactiveFragment.setConnectionViewInactive();
            requestPcDeallocate();
            Toast.makeText(AddComputerAutomatically.this, "PC 할당에 오류가 생겼습니다. " +
                    "1-2분 후 다시 연결하기 버튼을 눌러주세요", Toast.LENGTH_SHORT).show();
            return;
        }
        if (computer.runningGameId != 0) {
            //Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.pair_pc_ingame), Toast.LENGTH_LONG).show();
            PCInactiveFragment.setConnectionViewInactive();
            requestPcDeallocate();
            Toast.makeText(AddComputerAutomatically.this, "PC 할당에 오류가 생겼습니다. " +
                    "1-2분 후 다시 연결하기 버튼을 눌러주세요", Toast.LENGTH_SHORT).show();
            return;
        }
        if (managerBinder == null) {
            //Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.error_manager_not_running), Toast.LENGTH_LONG).show();
            PCInactiveFragment.setConnectionViewInactive();
            requestPcDeallocate();
            Toast.makeText(AddComputerAutomatically.this, "PC 할당에 오류가 생겼습니다. " +
                    "1-2분 후 다시 연결하기 버튼을 눌러주세요", Toast.LENGTH_SHORT).show();
            return;
        }

        Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.pairing), Toast.LENGTH_SHORT).show();
        new Thread(new Runnable() {
            @Override
            public void run() {
                NvHTTP httpConn;
                String message;
                boolean success = false;
                try {
                    // Stop updates and wait while pairing
                    stopComputerUpdates(true);
                    //여기서 컴퓨터 연결
                    httpConn = new NvHTTP(ServerHelper.getCurrentAddressFromComputer(computer),
                            managerBinder.getUniqueId(),
                            computer.serverCert,
                            PlatformBinding.getCryptoProvider(AddComputerAutomatically.this));
                    if (httpConn.getPairState() == PairingManager.PairState.PAIRED) {
                        // Don't display any toast, but open the app list
                        message = null;
                        success = true;
                    }
                    else {
                        final String pinStr = "1111";//PairingManager.generatePinString();

                        // Spin the dialog off in a thread because it blocks

                        //Dialog.displayDialog(AddComputerAutomatically.this, getResources().getString(R.string.pair_pairing_title),
                         //       getResources().getString(R.string.pair_pairing_msg)+" "+pinStr, false);

                        PairingManager pm = httpConn.getPairingManager();

                        PairingManager.PairState pairState = pm.pair(httpConn.getServerInfo(), pinStr);
                        if (pairState == PairingManager.PairState.PIN_WRONG) {
                            message = getResources().getString(R.string.pair_incorrect_pin);
                        }
                        else if (pairState == PairingManager.PairState.FAILED) {
                            message = getResources().getString(R.string.pair_fail);
                        }
                        else if (pairState == PairingManager.PairState.ALREADY_IN_PROGRESS) {
                            message = getResources().getString(R.string.pair_already_in_progress);
                        }
                        else if (pairState == PairingManager.PairState.PAIRED) {
                            // Just navigate to the app view without displaying a toast
                            message = null;
                            success = true;

                            // Pin this certificate for later HTTPS use
                            managerBinder.getComputer(computer.uuid).serverCert = pm.getPairedCert();

                            // Invalidate reachability information after pairing to force
                            // a refresh before reading pair state again
                            managerBinder.invalidateStateForComputer(computer.uuid);
                        }
                        else {
                            // Should be no other values
                            message = null;
                        }
                    }
                } catch (UnknownHostException e) {
                    message = getResources().getString(R.string.error_unknown_host);
                } catch (FileNotFoundException e) {
                    message = getResources().getString(R.string.error_404);
                } catch (XmlPullParserException | IOException e) {
                    e.printStackTrace();
                    message = e.getMessage();
                }

                Dialog.closeDialogs();

                final String toastMessage = message;
                final boolean toastSuccess = success;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (toastMessage != null) {
                            Toast.makeText(AddComputerAutomatically.this, toastMessage, Toast.LENGTH_LONG).show();
                        }

                        if (toastSuccess) {
                            // Open the app list after a successful pairing attempt
                            Intent intent = new Intent(AddComputerAutomatically.this, AppView.class);
                            intent.putExtra(AppView.NAME_EXTRA, computer.name);
                            intent.putExtra(AppView.UUID_EXTRA, computer.uuid);
                            intent.putExtra(AppView.NEW_PAIR_EXTRA, true);
                            startActivity(intent);
                        }

                        else {
                            // Start polling again if we're still in the foreground
                            startComputerUpdates();
                        }
                    }
                });
            }
        }).start();
    }

    public void startComputerUpdates() {
        // Only allow polling to start if we're bound to CMS, polling is not already running,
        // and our activity is in the foreground.
        if (managerBinder != null && !runningPolling && inForeground) {
            freezeUpdates = false;
            managerBinder.startPolling(new ComputerManagerListener() {
                @Override
                public void notifyComputerUpdated(final ComputerDetails details) {
                    if (!freezeUpdates) {
                        AddComputerAutomatically.this.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                //updateComputer(details);
                            }
                        });
                    }
                }
            });
            runningPolling = true;
        }
    }

    public void stopComputerUpdates(boolean wait) {
        if (managerBinder != null) {
            if (!runningPolling) {
                return;
            }

            freezeUpdates = true;
            managerBinder.stopPolling();

            if (wait) {
                managerBinder.waitForPollingStopped();
            }

            runningPolling = false;
        }
    }

    public void doUnpair(final ComputerDetails computer) {
        if (computer.state == ComputerDetails.State.OFFLINE ||
                ServerHelper.getCurrentAddressFromComputer(computer) == null) {
            Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.error_pc_offline), Toast.LENGTH_SHORT).show();
            return;
        }
        if (managerBinder == null) {
            Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.error_manager_not_running), Toast.LENGTH_LONG).show();
            return;
        }

        Toast.makeText(AddComputerAutomatically.this, getResources().getString(R.string.unpairing), Toast.LENGTH_SHORT).show();
        new Thread(new Runnable() {
            @Override
            public void run() {
                NvHTTP httpConn;
                String message;
                try {
                    httpConn = new NvHTTP(ServerHelper.getCurrentAddressFromComputer(computer),
                            managerBinder.getUniqueId(),
                            computer.serverCert,
                            PlatformBinding.getCryptoProvider(AddComputerAutomatically.this));
                    if (httpConn.getPairState() == PairingManager.PairState.PAIRED) {
                        httpConn.unpair();
                        if (httpConn.getPairState() == PairingManager.PairState.NOT_PAIRED) {
                            message = getResources().getString(R.string.unpair_success);
                        }
                        else {
                            message = getResources().getString(R.string.unpair_fail);
                        }
                    }
                    else {
                        message = getResources().getString(R.string.unpair_error);
                    }
                } catch (UnknownHostException e) {
                    message = getResources().getString(R.string.error_unknown_host);
                } catch (FileNotFoundException e) {
                    message = getResources().getString(R.string.error_404);
                } catch (XmlPullParserException | IOException e) {
                    message = e.getMessage();
                    e.printStackTrace();
                }

                final String toastMessage = message;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(AddComputerAutomatically.this, toastMessage, Toast.LENGTH_LONG).show();
                    }
                });
            }
        }).start();
    }

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            finishAffinity();
            return;
        }

        this.doubleBackToExitPressedOnce = true;
        Toast.makeText(this, "'뒤로'버튼 한번 더 누르시면 종료됩니다.",
                Toast.LENGTH_SHORT).show();

        new Handler(Looper.myLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                doubleBackToExitPressedOnce=false;
            }
        }, 2000);
    }
}