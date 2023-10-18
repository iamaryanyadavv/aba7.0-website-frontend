import React from "react";
import './roadtoaba.css';
import RoadToAPLContent from "./roadtoabacontent";
import GradientHeading from "../headings/gradientheading";

export default function RoadToABA(){
    return(
        <div className="roadtoAPLpage">
            <div className="RTAPLbackg">
            <GradientHeading
                heading='ABA 7.0 Schedule'
                description='You can find all of the tournament details of ABA Season 7.0!'
                gradient='#163364'
            />
                <RoadToAPLContent/>
            </div>
        </div>
    )
}