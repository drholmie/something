package com.example.vishnusmurali.volunteers;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.SparseArray;
import android.widget.Toast;

import com.google.android.gms.vision.barcode.Barcode;

import java.util.List;

import info.androidhive.barcode.BarcodeReader;

public class QRScan extends AppCompatActivity implements BarcodeReader.BarcodeReaderListener {

    private BarcodeReader barcodeReader;
    String req="";
    String rresult="";
    int n;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qrscan);
        barcodeReader = (BarcodeReader) getSupportFragmentManager().findFragmentById(R.id.barcode_fragment);
        n=getIntent().getIntExtra("n",6);
        req=getIntent().getStringExtra("req");
    }


    @Override
    public void onScanned(Barcode barcode) {
        // play beep sound
        barcodeReader.playBeep();
        rresult=barcode.displayValue;
        if (n == 0) {


            Intent int1 = new Intent(this, Confirm.class);
            int1.putExtra("rresult", rresult);
            int1.putExtra("req", req);
            startActivity(int1);
        }
        else if(n==1) {
            if (req.equals("taken")) {
                Intent int1 = new Intent(this, Ethcables.class);
                int1.putExtra("rresult", rresult);
                int1.putExtra("req", req);
                startActivity(int1);
            } else if (req.equals("given")) {
                Intent int1 = new Intent(this, Given.class);
                int1.putExtra("rresult", rresult);
                int1.putExtra("req", req);
                startActivity(int1);
            }
        }
        else if(n==2)
        {
            Intent tnt = new Intent(this, ConfirmRegister.class);
            tnt.putExtra("rresult", rresult);
            tnt.putExtra("req", req);
            startActivity(tnt);
        }
    }

    @Override
    public void onScannedMultiple(List<Barcode> list) {

    }

    @Override
    public void onBitmapScanned(SparseArray<Barcode> sparseArray) {

    }

    @Override
    public void onScanError(String s) {

    }

    @Override
    public void onCameraPermissionDenied() {
        Toast.makeText(getApplicationContext(), "Camera permission denied!", Toast.LENGTH_LONG).show();
    }
}
