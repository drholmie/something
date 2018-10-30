package com.example.vishnusmurali.volunteers;

import android.content.Intent;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Ethcables extends AppCompatActivity {
    TextView textView;
    EditText editText;
    FirebaseFirestore db;
    String rresult;
    String req;
    int k=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ethcables);
        textView=(TextView)findViewById(R.id.tv);
        editText=(EditText)findViewById(R.id.ed);
        db = FirebaseFirestore.getInstance();
        rresult=getIntent().getStringExtra("rresult");
        req=getIntent().getStringExtra("req");
        FirebaseFirestoreSettings settings = new FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(true)
                .build();
        db.setFirestoreSettings(settings);


    }

    public void submit(View view) {
        load();
        this.finish();

}
public void load(){
    final DocumentReference docRef = db.collection("participants").document(rresult);
    docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
        @Override
        public void onEvent(@Nullable DocumentSnapshot snapshot,
                            @Nullable FirebaseFirestoreException e) {
            if (e != null) {
                Log.w("Listened", "Listen failed.", e);
                return;
            }
            Map<String, Object> other = new HashMap<String, Object>();
            if (snapshot != null && snapshot.exists()) {
                Log.d("", "Current data: " + snapshot.getData());


                other = (Map<String, Object>) snapshot.get("other");
//                ArrayList<> eth= (ArrayList<String>)(other.get("ethernetCables"));
             //    ArrayList<String>ether=new ArrayList();
                int eth = Integer.parseInt( String.valueOf(other.get("ethernetCables")));

                if(eth!=0) {
                    textView.setText(String.valueOf(eth));


//                    for (int i = 0; i < eth.size(); ++i) {
//                        ether.add(String.valueOf(eth.get(i)));
//                    }
                }
                    String l=String.valueOf(editText.getText());


                Map<String, Object> user = new HashMap<>();
                if(req.equals("taken")) {
                    if(!l.equals("")) {
//                        ether.add(l);

                      eth=Integer.parseInt(l);
                        other.put("ethernetCables", eth);
                        user.put("other", other);
                        Toast.makeText(getApplicationContext(), "Submitted", Toast.LENGTH_LONG);
                    }
                }
                else if (req.equals("given")){
                    if(!l.equals("")) {
//                        eth.remove(l);

                        other.put("ethernetCables", 0);
                        user.put("other", other);
                        Toast.makeText(getApplicationContext(), "Submitted", Toast.LENGTH_LONG);
                    }
                }


                db.collection("participants")
                        .document(rresult)
                        .update(user);
                return;


            } else {
                Toast.makeText(getApplicationContext(),"NOt Accepted",Toast.LENGTH_LONG);
            }
        }
    });
}

}

