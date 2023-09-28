import React from "react";
import { Grid, Text } from "@nextui-org/react";

export default function GradientHeading(props){
    const headingcolor = props.gradient
    const descpadding = props.descpadding
    return(
        <Grid.Container
        css={{
            jc: 'center',
            textAlign: 'center',
            paddingBottom: '2%'
        }}>
            <Grid>
                <Grid.Container
                css={{
                    jc: 'center',
                    textAlign: 'center',
                }}>
                    <Grid>
                        <Text hideIn={'xs'}
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            fontSize: '$7xl',
                            fontWeight: '$semibold',
                            color: headingcolor,
                            padding:'5% 10px 0px 10px'
                        }}>
                            {props.heading}
                        </Text>
                        <Text showIn={'xs'}
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            fontSize: '$5xl',
                            fontWeight: '$semibold',
                            color: headingcolor,
                            padding: '5% 10px 0px 10px'
                        }}>
                            {props.heading}
                        </Text>
                    </Grid>
                    
                </Grid.Container>
                <Grid.Container
                css={{
                    jc: 'center',
                    textAlign: 'center'
                }}>
                    <Grid>
                        <Text hideIn={'xs'}
                        css={{
                            fontSize: '$xl',
                            color: '#163364',
                            padding: descpadding
                        }}>
                            {props.description}
                        </Text>
                        <Text showIn={'xs'}
                        css={{
                            fontSize: '$lg',
                            color: '#163364',
                            padding: descpadding
                        }}>
                            {props.description}
                        </Text>
                    </Grid>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}