import { Grid, Col, Text, Image, Button } from "@nextui-org/react";
import './homeevents.css';
import React from "react";
import FIFA from '../../../assets/images/Grey.jpeg';
import Foosball from '../../../assets/images/LogoWhite.svg';
import AuctionPredictions from '../../../assets/images/Grey.jpeg';

export default function EventsContent () {

    return(
        <Grid.Container gap={0}
        css={{
            jc: 'center',
            textAlign: 'center',
            alignItems: 'center',
            backgroundColor: '#faf7ea'
        }}>
            <Grid.Container 
            css={{
                jc: 'center',
                textAlign: 'center'
            }}>
                <Grid className="hidden"
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    padding: '24px'
                }}>
                    <Col 
                    css={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Image 
                        
                        css={{
                            '@xsMin':{
                                width: '300px',
                                height: '300px',
                                borderRadius: '20px'
                            },
                            '@xsMax':{
                                width: '150px',
                                height: '150px',
                                borderRadius: '20px'
                            },
                            objectFit: 'cover'
                        }}
                        src={Foosball}/>
                        <Text
                        css={{
                            fontSize: '$2xl',
                            fontWeight: '$bold',
                            borderStyle: 'solid',
                            borderWidth: '0px 0px 2px 0px',
                            borderColor: '#ff9f56',
                            padding: '2%'
                        }}>
                            Road To ABA 7.0
                        </Text>
                        <Text
                        css={{
                            fontSize: '$xl',
                            fontWeight: '$semibold',
                            padding: '2%'
                        }}>
                            Check out all events leading up to the coveted ABA tournament!
                        </Text>
                    </Col>
                </Grid>


                {/* <Grid className="hidden"
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    padding: '24px'
                }}>
                    <Col 
                    css={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Image 
                        css={{
                            '@xsMin':{
                                width: '300px',
                                height: '300px',
                                borderRadius: '20px'
                            },
                            '@xsMax':{
                                width: '150px',
                                height: '150px',
                                borderRadius: '20px'
                            },
                            objectFit: 'cover'
                        }}
                        src={FIFA}/>
                        <Text
                        css={{
                            fontSize: '$3xl',
                            fontWeight: '$bold',
                            borderStyle: 'solid',
                            borderWidth: '0px 0px 2px 0px',
                            borderColor: '#ff9f56',
                            padding: '2%'
                        }}>
                            ABA x Abhinaya
                        </Text>
                        <Text
                        css={{
                            fontSize: '$2xl',
                            fontWeight: '$semibold',
                            padding: '2%'
                        }}>
                            7th November, 2023
                        </Text>
                    </Col>
                </Grid>

                        
                <Grid className="hidden"
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    padding: '24px'
                }}>
                    <Col 
                    css={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Image 
                        css={{
                            '@xsMin':{
                                width: '300px',
                                height: '300px',
                                borderRadius: '20px'
                            },
                            '@xsMax':{
                                width: '150px',
                                height: '150px',
                                borderRadius: '20px'
                            },
                            objectFit: 'cover'
                        }}
                        src={AuctionPredictions}/>
                        <Text
                        css={{
                            fontSize: '$3xl',
                            fontWeight: '$bold',
                            borderStyle: 'solid',
                            borderWidth: '0px 0px 2px 0px',
                            borderColor: '#ff9f56',
                            padding: '2%'
                        }}>
                            ABA x Vistaar
                        </Text>
                        <Text
                        css={{
                            fontSize: '$2xl',
                            fontWeight: '$semibold',
                            padding: '2%'
                        }}>
                            10th November, 2023
                        </Text>
                    </Col>
                </Grid> */}


            </Grid.Container>


            <Grid.Container gap={0} 
            css={{
                jc: 'center',
                textAlign: 'center',
                alignItems: 'center',
                padding: '20px 0px 80px 0px'
            }}>
                <Grid className="hidden">
                    <Button className="mini-events-btn"
                    auto shadow rounded>
                        <a href="/roadtoaba" className="mini-events-btn-2">Events Details</a> 
                    </Button>
                </Grid>
            </Grid.Container>
        </Grid.Container>
    )
}