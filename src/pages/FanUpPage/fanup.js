import React from "react";
import { Grid, Spacer } from "@nextui-org/react";
import GradientHeading from "../../components/headings/gradientheading";
import FanUpContent from "../../components/fanup/fanupcontent";

export default function FanUpPage(){
    return(
        <div>
        <Grid.Container
        css={{
            jc: 'center',
            alignItems: 'center'
        }}>
            <Spacer y={2} />
            <GradientHeading
                heading='ABA 8.0 Fantasy'
                description='Our very own fantasy league powered by FanUp!'
                gradient='#163364'
            />
        </Grid.Container>
        <FanUpContent/>
        </div>
    )
}