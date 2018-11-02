package com.example.vishnusmurali.volunteers;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ImageViewHolder> {
    ArrayList<String> teamnames = new ArrayList<String>();
    ArrayList<String> numbers = new ArrayList<String>();
    Context ctx;

    public RecyclerViewAdapter(ArrayList<String> teamnames, ArrayList<String> numbers, Context ctx) {
        this.teamnames = teamnames;
        this.numbers = numbers;
        this.ctx = ctx;

    }

    @Override
    public ImageViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.photolayout, parent, false);
        ImageViewHolder imageViewHolder = new ImageViewHolder(view, ctx, teamnames, numbers);
        return imageViewHolder;
    }

    @Override
    public void onBindViewHolder(ImageViewHolder holder, int position) {
        String teamname = teamnames.get(position);
        String number = numbers.get(position);
        holder.teamname1.setText(teamname);
        holder.number1.setText(number);
    }

    @Override
    public int getItemCount() {
        return numbers.size();
    }

    public static class ImageViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView teamname1;
        TextView number1;
        ArrayList<String> teamname;
        ArrayList<String> number;
        Context ctx;

        public ImageViewHolder(View itemView, Context ctx, ArrayList<String> teamnames, ArrayList<String> numbers) {
            super(itemView);
            this.teamname = teamnames;
            this.number = numbers;
            this.ctx = ctx;

            itemView.setOnClickListener(this);
            teamname1 = itemView.findViewById(R.id.teamname);
            number1 = itemView.findViewById(R.id.number);

        }

        @Override
        public void onClick(View v) {
            int n = 2;
            int position = getAdapterPosition();
            String num_id = this.teamname.get(position);
            Intent register=new Intent(this.ctx,QRScan.class);
            register.putExtra("req",num_id);
            register.putExtra("n",n);
            this.ctx.startActivity(register);


        }
    }
}