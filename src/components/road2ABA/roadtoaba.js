import React from "react";
import './roadtoaba.css';
import RoadToAPLContent from "./roadtoabacontent";
import GradientHeading from "../headings/gradientheading";

export default function RoadToABA(){
    return(
        <div className="roadtoAPLpage">
            <div className="RTAPLbackg">
            <GradientHeading
                heading='Road to ABA'
                description='You can find all of the tournament details of ABA Season 7.0! Zahaan test'
                gradient='#163364'
            />
                <RoadToAPLContent/>
            </div>
        </div>
    )
}