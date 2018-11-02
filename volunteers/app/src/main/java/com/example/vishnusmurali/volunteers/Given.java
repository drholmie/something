package com.example.vishnusmurali.volunteers;

import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
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

public class Given extends AppCompatActivity {
    TextView textView;
    FirebaseFirestore db;
    String rresult;
    String req;
    int k=0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_given);
        textView=(TextView)findViewById(R.id.tv1);
        db = FirebaseFirestore.getInstance();
        rresult=getIntent().getStringExtra("rresult");
        req=getIntent().getStringExtra("req");
        FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(true)
                .build();
        db.setFirestoreSettings(settings);

    }

    public void submit(View view) {
        load(rresult);
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
                Map<String, Object> eth = new HashMap<String, Object>();
                Map<String, Object> details = new HashMap<String, Object>();
                if (snapshot != null && snapshot.exists()) {
                    Log.d("", "Current data: " + snapshot.getData());


                    eth = (HashMap<String, Object>) snapshot.get("other");
                    details = (HashMap<String, Object>) snapshot.get("details");

                    if(!String.valueOf(details.get("teamid")).equals("")) {

                        String time = String.valueOf(System.currentTimeMillis());
                        if (String.valueOf(eth.get("cablesGivenBack")).equals("false")) {
                            textView.setText(String.valueOf(eth.get("ethernetCables")));
                            //String l=editText.getText().toString();
                            Map<String, Object> user = new HashMap<>();
                            //String r=String.valueOf(eth.get(req));
                            //  if (r.equals("false")) {
                            k=1;
                            Toast.makeText(getApplicationContext(), "Accepted", Toast.LENGTH_LONG).show();
                            eth.put("cablesGivenBack", time);
                            user.put("other", eth);
                            db.collection("participants")
                                    .document(rresult)
                                    .update(user);
                            return;
                        }
                        else{
                            if(k!=1) {
                                Toast.makeText(getApplicationContext(), "NOt Accepted", Toast.LENGTH_LONG).show();
                            }
                        }
                    }
                    else{
                             Toast.makeText(getApplicationContext(),"Not registered to Team",Toast.LENGTH_LONG).show();

                    }

                    //   } else {
                    //      Toast.makeText(getApplicationContext(),"NOt Accepted",Toast.LENGTH_LONG);
                    //   }
                } else {
                    Log.d("", "Current data: null");
                }
            }
        });

    }
}
