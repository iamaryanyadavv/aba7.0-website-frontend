import { Grid, Image, Row, Link } from "@nextui-org/react";
import './footnavbar.css';
import React from "react";
import Logo from '../../assets/images/LogoWhite.svg';

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
                    }} src={Logo} width={'90px'} height={'90px'} />
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
                            <Link className="footnavbar-item" href="/fanupabafantasy">
                                FanUpxABA Fantasy
                            </Link>
                        </Grid>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/roatoaba" >
                                RoadToABA
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
                            <Link className="footnavbar-item" href="/schedule" >
                                Game Time
                            </Link>
                        </Grid>
                        <Grid 
                        css={{
                            padding: '12px'
                        }}>
                            <Link className="footnavbar-item" href="/gallery">
                                Gallery
                            </Link>
                        </Grid>
                    </Grid.Container>
                </Row>
            </Grid.Container>

        </Grid.Container>
    )
}