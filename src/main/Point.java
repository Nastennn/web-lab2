package main;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Point {
    private double x;
    private double y;
    private double R;
    private String time;
    private boolean isInArea;
    private boolean isCorrect;
    boolean isNumber;

    public Point() {
    }

    Point (double x, double y, double r, Date date, boolean isNumber){
        this.x = x;
        this.y = y;
        this.R = r;
        SimpleDateFormat formatForDateNow = new SimpleDateFormat("HH:mm:ss");
        this.time = formatForDateNow.format(date);
        this.isInArea = isInArea(x, y, r);
        if (isInArea){
            isCorrect = true;
        }
        this.isNumber = isNumber;
    }

    Point (boolean isNumber){
        this.isNumber = isNumber;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return R;
    }

    public String getTime() {
        return time;
    }

    public boolean isInArea(double x, double y, double r) {
        boolean isInArea = false;
        if ((x >= 0 && y <= 0) && (x <= r && y >= -r)) {
            isInArea = true;
        } else if ((x <= 0 && y <= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= (Math.pow(r, 2)))) {
            isInArea = true;
        } else if ((y >= 0 && x >= 0) && (y <= (-x + r / 2))) {
            isInArea = true;
        }
        return isInArea;
    }

    public boolean isCorrect(){
        return isCorrect;
    }

    public boolean isNumber(){
        return isNumber;
    }




    @Override
    public String toString() {
        return "main.Point{";
    }
}
