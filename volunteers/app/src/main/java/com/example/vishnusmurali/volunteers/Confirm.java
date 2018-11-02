package com.example.vishnusmurali.volunteers;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.FirebaseFirestoreSettings;
import com.google.zxing.integration.android.IntentIntegrator;

import java.util.HashMap;
import java.util.Map;

public class Confirm extends AppCompatActivity {
FirebaseFirestore db;
String rresult;
String req;
int n=1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm);
        rresult=getIntent().getStringExtra("rresult");
        req=getIntent().getStringExtra("req");
        db = FirebaseFirestore.getInstance();

        FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(true)
                .build();
        db.setFirestoreSettings(settings);

    }

    public void confirm(View view) {
        load(rresult);
//        Intent int1=new Intent(this,Food.class);
//        int1.putExtra("n",1);
//        startActivity(int1);
        this.finish();

    }

    public void reject(View view) {
//        Intent int1=new Intent(this,Food.class);
//        int1.putExtra("n",1);
//        startActivity(int1);
        this.finish();
    }
    public void load(final String rresult) {


        final DocumentReference docRef = db.collection("participants").document(rresult);
        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w("Listened", "Listen failed.", e);
                    return;
                }
                Map<String, Object> meals1 = new HashMap<String, Object>();
                Map<String, Object> details = new HashMap<String, Object>();
                if (snapshot != null && snapshot.exists()) {
                    Log.d("", "Current data: " + snapshot.getData());


                    meals1 = (Map<String, Object>) snapshot.get("meals");
                    details = (Map<String, Object>) snapshot.get("details");
                    String time = String.valueOf(System.currentTimeMillis());
                    if (!String.valueOf(details.get("teamid")).equals("")) {


                        Map<String, Object> user = new HashMap<>();
                        String r = String.valueOf(meals1.get(req));
                        if (r.equals("false")) {
                            Toast.makeText(getApplicationContext(), "Accepted", Toast.LENGTH_LONG).show();
                            meals1.put(req, time);
                            user.put("meals", meals1);
                            db.collection("participants")
                                    .document(rresult)
                                    .update(user);
                            return;

                        } else {
                            Toast.makeText(getApplicationContext(), "NOt Accepted", Toast.LENGTH_LONG).show();

                        }

                    } else {
                        Toast.makeText(getApplicationContext(), "Not registered to a team yet.", Toast.LENGTH_LONG).show();
//                        Log.d("", "Current data: null");
                    }
                }
                else {
                    Toast.makeText(getApplicationContext(), "Invalid.", Toast.LENGTH_LONG).show();

                }
            }
        });

    }

    @Override
    public void onBackPressed() {
            super.onBackPressed();
            this.finish();
        }


}
