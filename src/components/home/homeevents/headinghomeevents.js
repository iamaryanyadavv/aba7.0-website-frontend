import React from "react";
import './homeevents.css';
import { Grid, Text } from "@nextui-org/react";

export default function EventsHead () {

    return(
        <Grid.Container className="hidden"
        css={{
            jc: 'center',
            textAlign: 'center',
            paddingTop: '2.5%',
            backgroundColor: '#faf7ea',
            borderWidth: '10px 0px 0px 0px',
            borderStyle: 'solid',
            borderColor: 'White'
        }}>
            <Grid>
                <Grid.Container
                css={{
                    jc: 'center',
                    textAlign: 'center'
                }}>
                    <Grid>
                        <Text hideIn={'xs'}
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            fontSize: '$7xl',
                            fontWeight: '$semibold',
                            // textGradient: "45deg, $purple600 -20%, $pink600 100%",
                            color: '#163364',
                            padding:'2.5% 10px 0px 10px'
                        }}>
                             Events
                        </Text>
                        <Text showIn={'xs'}
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            fontSize: '$5xl',
                            fontWeight: '$semibold',
                            // textGradient: "45deg, $purple600 -20%, $pink600 100%",
                            color: '#163364',
                            padding: '5% 10px 0px 10px'
                        }}>
                             Events
                        </Text>
                    </Grid>
                    
                </Grid.Container>
                
            </Grid>
        </Grid.Container>
    )
}