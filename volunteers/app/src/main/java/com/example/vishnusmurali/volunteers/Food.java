package com.example.vishnusmurali.volunteers;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.FirebaseFirestoreSettings;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;


import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static java.lang.System.load;


public class Food extends AppCompatActivity implements View.OnClickListener {
    private IntentIntegrator qrScan;
    public FirebaseFirestore db;
    String rresult;
    String req;
    int c = 0;
    TextView breakfast;
    TextView lunch;
    TextView dinner;
    TextView mns;
    TextView snacks;
    TextView lunch1;
    int SCAN_BARCODE = 1021;
    int n;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_food);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // but=(Button)findViewById(R.id.but);
        breakfast = (TextView) findViewById(R.id.breakfast);
        lunch = (TextView) findViewById(R.id.lunch);
        snacks = (TextView) findViewById(R.id.snacks);
        dinner = (TextView) findViewById(R.id.dinner);
        mns = (TextView) findViewById(R.id.mns);
        lunch1=(TextView) findViewById(R.id.lunch2);
        breakfast.setOnClickListener(this);
        lunch.setOnClickListener(this);
        snacks.setOnClickListener(this);
        dinner.setOnClickListener(this);
        mns.setOnClickListener(this);
        lunch1.setOnClickListener(this);
        // but.setOnClickListener(this);
        db = FirebaseFirestore.getInstance();

        FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(true)
                .build();
        db.setFirestoreSettings(settings);
        n=0;

//        qrScan = new IntentIntegrator(this);
//        qrScan.setPrompt("Scan a barcode");
//        qrScan.setCameraId(0);  // Use a specific camera of the device
//        qrScan.setOrientationLocked(true);
//        qrScan.setBeepEnabled(true);


//        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
//        fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                        .setAction("Action", null).show();
//            }
//        });
    }
//    @Override
//    public void onStart(){
//        super.onStart();
//        n=getIntent().getIntExtra("n",0);
//        if(n==1) {
//            qrScan.initiateScan();
//        }
//
//    }


    @Override
    public void onBackPressed() {
        Intent intent = new Intent();
        intent.putExtra("isModified", false);
        setResult(1021, intent);
        finish();
    }


    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.breakfast:{
                req="breakfast";
                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);

            }break;
            case R.id.lunch:{
                req="lunchDay1";

                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);
            }break;
            case R.id.dinner:{
                req="dinner";

                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);
            }break;
            case R.id.snacks:{
                req="snacks";

                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);
            }break;
            case R.id.mns:{
                req="mns";

                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);
            }break;
            case R.id.lunch2:{
                req="lunchDay2";

                Intent i=new Intent(this,QRScan.class);
                i.putExtra("req",req);
                i.putExtra("n",n);
                startActivity(i);
            }break;
        }
    }
}