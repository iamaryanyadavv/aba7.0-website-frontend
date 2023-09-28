import React from "react";
import { Grid, Spacer } from "@nextui-org/react";
import GradientHeading from "../../components/headings/gradientheading";
import ScheduleContent from "../../components/schedule/schedulecontent";

export default function Schedule(){
    return(
        <div>
        <Grid.Container
        css={{
            jc: 'center',
            alignItems: 'center'
        }}>
            <Spacer y={2} />
            <GradientHeading
                heading='ABA 7.0 Schedule'
                description='You can find all of the tournament details of ABA Season 7.0!'
                gradient='#163364'
            />
        </Grid.Container>
        <ScheduleContent/>
        </div>
    )
}