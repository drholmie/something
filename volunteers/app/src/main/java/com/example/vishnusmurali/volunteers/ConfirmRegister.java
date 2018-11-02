package com.example.vishnusmurali.volunteers;

import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.FirebaseFirestoreSettings;

import java.util.HashMap;
import java.util.Map;

public class ConfirmRegister extends AppCompatActivity {
    FirebaseFirestore db;
    String rresult;
    String req;
    TextView tv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm_register);
        rresult=getIntent().getStringExtra("rresult");
        req=getIntent().getStringExtra("req");
        db = FirebaseFirestore.getInstance();
        tv=(TextView)findViewById(R.id.tv1);
        FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(true)
                .build();
        db.setFirestoreSettings(settings);
        load1(rresult);
    }

    private void load1(String rresult) {
        final DocumentReference docRef = db.collection("participants").document(rresult);
        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w("Listened", "Listen failed.", e);
                    return;
                }
                Map<String, Object> details = new HashMap<String, Object>();
                if (snapshot != null && snapshot.exists()) {
                    Log.d("", "Current data: " + snapshot.getData());


                    details = (Map<String, Object>) snapshot.get("details");
                    // String time = String.valueOf(System.currentTimeMillis());


                    Map<String, Object> user = new HashMap<>();
                    String r = String.valueOf(details.get("name"));
                    if (!r.equals("")) {
                        tv.setText(r);
                        return;
                    }
                    else if(r.equals("")) {
                        tv.setText("");
                        return;
                    }


//                    else {
//                        Toast.makeText(getApplicationContext(),"NOt Accepted",Toast.LENGTH_LONG);
//                    }
                    }
                else {
                    Log.d("", "Current data: null");
                }
            }
        });

    }

    public void confirm(View view) {
        load(rresult);

        this.finish();
    }

    public void reject(View view) {
        this.finish();
    }
    public void load(final String rresult){
        final DocumentReference docRef = db.collection("participants").document(rresult);
        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w("Listened", "Listen failed.", e);
                    return;
                }
                Map<String, Object> details = new HashMap<String, Object>();
                if (snapshot != null && snapshot.exists()) {
                    Log.d("", "Current data: " + snapshot.getData());


                    details = (Map<String, Object>) snapshot.get("details");
                    // String time = String.valueOf(System.currentTimeMillis());


                    Map<String, Object> user = new HashMap<>();
                    String r = String.valueOf(details.get("teamid"));
                    if (r.equals("")) {
                        Toast.makeText(getApplicationContext(), "Accepted", Toast.LENGTH_LONG).show();
                        details.put("teamid", req);
                        user.put("details", details);
                        db.collection("participants")
                                .document(rresult)
                                .update(user);
                        return;


//                    else {
//                        Toast.makeText(getApplicationContext(),"NOt Accepted",Toast.LENGTH_LONG);
//                    }
                    }}
                    else {
                        Log.d("", "Current data: null");
                    }
                }
        });


    }
}
