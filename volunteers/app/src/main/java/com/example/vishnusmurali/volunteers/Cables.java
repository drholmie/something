package com.example.vishnusmurali.volunteers;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import org.json.JSONException;
import org.json.JSONObject;

public class Cables extends AppCompatActivity {
    private IntentIntegrator qrScan;
    int SCAN_BARCODE = 1021;
    int n;
    String req;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cables);
        n=1;
    }


    public void cables(View view) {
        switch (view.getId()){
            case R.id.taken:{
                req="taken";
                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);

            }break;
            case R.id.given:{
                req="given";
                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);

            }break;
        }
    }
}
