import { Grid, Image, Row, Link } from "@nextui-org/react";
import './footnavbar.css';
import React from "react";
import BlueLogo from '../../assets/images/Grey.jpeg';

export default function FootNavbar () {
    return(
        <Grid.Container 
        css={{
            jc: 'center',
            textAlign: 'center',
            alignItems: 'center',
            backgroundColor: '#faf7ea',
            borderWidth: '10px 0px 0px 0px',
            borderStyle: 'solid',
            borderColor: 'White'
        }}>

            <Grid.Container gap={0}
            css={{
                jc: 'center',
                textAlign: 'center',
                alignItems: 'center',
                marginTop: '15px',
            }}>
                <Grid
                css={{
                    padding: '12px'
                }}>
                    <Image 
                    css={{
                        borderRadius: '10px'
                    }} src={BlueLogo} width={'90px'} height={'90px'} />
                </Grid>
            </Grid.Container>

            <Grid.Container gap={0}
            css={{
                jc: 'center',
                textAlign: 'center',
                alignItems: 'center',
                
            }}>
                <Row
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    alignItems: 'center'
                }}>
                    <Grid.Container gap={0}
                    css={{
                        jc: 'center',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/">
                                Home
                            </Link>
                        </Grid>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/registration" >
                                ABAxKKIx
                            </Link>
                        </Grid>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/events" >
                                Schedule
                            </Link>
                        </Grid>
                    </Grid.Container>
                </Row>
                <Row
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    alignItems: 'center'
                }}>
                    <Grid.Container gap={0}
                    css={{
                        jc: 'center',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/slots" >
                                RoadToABA
                            </Link>
                        </Grid>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/seasons">
                                FanUpxABA Fantasy
                            </Link>
                        </Grid>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/team">
                                Gallery
                            </Link>
                        </Grid>
                    </Grid.Container>
                </Row>
            </Grid.Container>

        </Grid.Container>
    )
}