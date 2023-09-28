import React from "react";
import './homeevents.css';
import EventsHead from "./headinghomeevents";
import EventsContent from "./contenthomeevents";

export default function HomeEvents () {
    return(
        <div>
            <EventsHead/>
            <EventsContent/>
        </div>
    )
}