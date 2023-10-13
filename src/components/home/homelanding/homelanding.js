import React from "react";
import "./homelanding.css";
import { Button, Text, Link, Col, Row } from "@nextui-org/react";
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

function HomeLanding() {
    return (
        // <div className="homelanding">
        //     <video src={LandingImage} autoPlay loop muted />
        //     <div className="text">
        //         <p>Ashoka Premier League</p>
        //     </div>
        // </div>
        <div className="homelandingpage">
            <div className="hlbackg">
                <Col css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text hideIn={'xs'}
                        css={{
                            fontSize: '$7xl',
                            fontWeight: 200,
                            textAlign: 'center',
                            padding: '25vh 5px 0px 5px',
                            fontFamily: 'MEregular',
                            color: 'White',
                            width: '100vw'
                        }}>
                        ABA 7.0
                    </Text>
                    <Text showIn={'xs'}
                        css={{
                            fontSize: '$5xl',
                            fontWeight: '$semibold',
                            textAlign: 'center',
                            padding: '35vh 5px 2vh 5px',
                            fontFamily: 'MEregular',
                            color: 'White'
                        }}>
                        ABA 7.0
                    </Text>
                    <Button hideIn={'xs'}
                        auto
                        color={"warning"}
                        css={{
                            textAlign: 'center',
                            margin: '2.5vh 5px 32vh 5px',
                            fontFamily: 'MEregular',
                            justifySelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Row css={{
                            alignContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Link target="_blank" href="https://www.instagram.com/aba_ashoka/"
                                css={{
                                    color: '#163364',
                                    paddingRight: '4px',
                                    fontFamily: 'MEregular',
                                }}>
                                Instagram
                            </Link>
                            <HiExternalLink style={{ marginBottom: '4px' }} color="#163364" size={'25px'} />
                        </Row>
                    </Button>
                </Col>

            </div>
        </div>
    )
}

export default HomeLanding;