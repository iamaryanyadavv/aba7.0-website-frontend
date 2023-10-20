import { Grid, Text, Col, Image, Row } from "@nextui-org/react";
import './roadtoaba.css';
import React from "react";
import {IoLocation, IoGameController} from 'react-icons/io5';
import { AiOutlineTeam, AiOutlineClockCircle } from "react-icons/ai";
import Grey from '../../assets/images/Grey.jpeg';
import auction from '../../assets/images/roadtoabaauction.png';
import openingnight from '../../assets/images/roadtoabaopeningnight.png';
import questforthebest from '../../assets/images/roadtoabaquestforthebest.png';
import registration from '../../assets/images/roadtoabaregistration.png';
import scoutinggames from '../../assets/images/roadtoabascoutinggames.png';
import practice from '../../assets/images/roadtoabapractice.png';
import logo from '../../assets/images/logo.jpg';



export default function RoadToABAContents(){
    return(
        <>
            <Grid.Container
            css={{
                jc: 'center',
                textAlign: 'center',
                alignItems: 'center',
                paddingTop: '60px',
                color: '#163364'
            }}>
                <Grid>
                    <Grid.Container gap={0.5}
                    css={{
                        jc: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                        color: '#163364'
                    }}>

                        {/* Player Registration */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color: '#163364'
                                }}>
                                    3rd October 2023 
                                    
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color: '#163364'
                                    }}>
                                        3rd
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color: '#163364'
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color: '#163364'
                                    }}>
                                        2023 
            
                                    </Text>
                                    
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderRadius: '0px 0px 0px 0px',
                                borderColor: '#ff9f56',
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover',
                                        }}src={registration} />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color: '#163364'
                                                        }}>
                                                            Registration
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color: '#163364'
                                                        }}>
                                                            Registration
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                                
                                                {/* Description
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontSize: '$xl',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            width: '500px'
                                                        }}>
                                                            Head over to the 'Registrations' tab to register as a player!
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontSize: '$md',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            width: '250px'
                                                        }}>
                                                            Head over to the 'Registrations' tab to register as a player!
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container> */}


                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px',
                                                            
                                                        }}>
                                                            Team Owner registrations were conducted online the weekend before 3rd October and closed in 2 and a half minutes! There were 20 registrations and only the first 8 lucky teams were registered as final teams getting to compete in ABA 7.0
Player Registration on 3rd October closed in less than an hour with over 12 people on the waitlist! The event was conducted outside the mess and the cherry on top was the signing of the ABA poster by registered players. 

                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px'
                                                        }}>
                                                            Team Owner registrations were conducted online the weekend before 3rd October and closed in 2 and a half minutes! There were 20 registrations and only the first 8 lucky teams were registered as final teams getting to compete in ABA 7.0
Player Registration on 3rd October closed in less than an hour with over 12 people on the waitlist! The event was conducted outside the mess and the cherry on top was the signing of the ABA poster by registered players. 

                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>

                                

                                            
                                
                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>

                        {/* Team Registration */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color: '#163364'
                                }}>
                                    16th October 2023 
                                    
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                    }}>
                                        16th
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                    }}>
                                        2023 
            
                                    </Text>
                                    
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderColor: '#ff9f56'
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover'
                                        }} src={questforthebest} />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color: '#163364'
                                                        }}>
                                                            Quest for the best
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color: '#163364'
                                                            
                                                        }}>
                                                            Quest for the best
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                            


                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px'
                                                        }}>
                                                            4 teams, going neck to neck for the final 2 free teams that would get to take part in ABA 7.0. 
The teams were riled up and the first two teams to reach 15 points were the ones that were selected. The questions were basketball related ranging from the context of previous years ABA to International news. 
There was a significant number of people in the audience who were also given a chance to answer questions and win exciting fan prizes!

                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px',

                                                        }}>
                                                           4 teams, going neck to neck for the final 2 free teams that would get to take part in ABA 7.0. 
The teams were riled up and the first two teams to reach 15 points were the ones that were selected. The questions were basketball related ranging from the context of previous years ABA to International news. 
There was a significant number of people in the audience who were also given a chance to answer questions and win exciting fan prizes!

                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>

                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>

                        {/* Foosball Event */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color:'#163364'
                                }}>
                                    17th October 2023 
                                    
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        17th
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                    }}>
                                        2023 
            
                                    </Text>
                                    
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderColor: '#ff9f56'
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover'
                                        }} src={scoutinggames} />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                            Scouting Games (Merch Reveal)
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                            Scouting Games (Merch Reveal)
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px'
                                                        }}>
                                                            New players and players from the newest batch were given an opportunity to show off their basketball skills and make sure team owners know they’ll be worth the money! 
The players played random 3v3 matches and the team owners scourged through the tier lists to keep track. 
On the second day, ABA collabed with the Ashokan fashion club, CLAD, who set up a stall taking preorders for the much awaited ABA merch!

                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px'
                                                        }}>
                                                           New players and players from the newest batch were given an opportunity to show off their basketball skills and make sure team owners know they’ll be worth the money! 
The players played random 3v3 matches and the team owners scourged through the tier lists to keep track. 
On the second day, ABA collabed with the Ashokan fashion club, CLAD, who set up a stall taking preorders for the much awaited ABA merch!

                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>

                                                
                                
                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>

                        {/* Fifa Event */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color: '#163364'
                                }}>
                                20th October 2023
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color: '#163364'
                                    }}>
                                        20th
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color: '#163364'
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color: '#163364'
                                    }}>
                                        2023
                                        
                                    </Text>
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderColor: '#ff9f56'
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover'
                                        }} src={auction} />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color: '#163364'
                                                        }}>
                                                            Auction Night
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color: '#163364'
                                                        }}>
                                                            Auction Night
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px'
                                                        }}>
                                                            Teams battle it out to build the best team for ABA 7.0 
Tensions run high as players are being bid on and teams are trying to bring out their best strategies. With fun roasts and gripping Right To Match battles, this is an event to lookout for.
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px'
                                                        }}>
                                                            Teams battle it out to build the best team for ABA 7.0 
Tensions run high as players are being bid on and teams are trying to bring out their best strategies. With fun roasts and gripping Right To Match battles, this is an event to lookout for.

                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>

                                                
                                
                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>

                        {/* Predictions Event */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color:'#163364'
                                }}>
                                   23rd October 2023
                                    
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        23rd
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        2023 
            
                                    </Text>
                                    
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderColor: '#ff9f56'
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover'
                                        }} src={practice} />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                            Practice Games
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                            Practice Games
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                                
                                               


                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px'
                                                        }}>
                                                            Post auction the teams are given a chance to practice their playing strategies and utilize their strongest players to make the team a well oiled machine. To add onto this the court will be buzzing as there will be many fun basketball related games organized for owners and the audience along with another chance to win exciting prizes!
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px'
                                                        }}>
                                                          Post auction the teams are given a chance to practice their playing strategies and utilize their strongest players to make the team a well oiled machine. To add onto this the court will be buzzing as there will be many fun basketball related games organized for owners and the audience along with another chance to win exciting prizes!
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>

                                               
                                
                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>

                        {/* Scouting Games */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color:'#163364'
                                }}>
                                    26th October 2023 
                                    
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px',
                                    color:'#163364'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        26th
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        2023 
            
                                    </Text>
                                    
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderColor: '#ff9f56'
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover'
                                        }} src={openingnight}  />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                         Opening Night
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                        Opening Night
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                                

                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px'
                                                        }}>
                                                            An All star game amongst ABA 6.0 and ABA 5.0 captains!! Winner gets the glory. Loser gets a forfeit. Come join us along with Vistaar and Abhinaya for the most fun Thursday night yet!!
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px'
                                                        }}>
                                                           An All star game amongst ABA 6.0 and ABA 5.0 captains!! Winner gets the glory. Loser gets a forfeit. Come join us along with Vistaar and Abhinaya for the most fun Thursday night yet!!
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>

                                            
                                                

                                               
                                
                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>
                        {/* Scouting Games */}
                        <Row
                        css={{
                            jc: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            {/* Date-Timeline */}
                            <Grid hideIn={'sm'}
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}>
                                <Text hideIn={'sm'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    alignItems: 'baseline',
                                    width: '180px',
                                    color:'#163364'
                                }}>
                                    27th-29th October 2023 
                                    
                                </Text>
                            </Grid>
                            <Grid showIn={'sm'}>
                                <Col 
                                css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    width: '70px',
                                    color:'#163364'
                                }}> 
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        27th-29th
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        October
                                        
                                    </Text>
                                    <Text showIn={'sm'}
                                    css={{
                                        fontSize: '$lg',
                                        fontWeight: '$semibold',
                                        textAlign: 'center',
                                        color:'#163364'
                                    }}>
                                        2023 
            
                                    </Text>
                                    
                                </Col>

                            </Grid>

                            {/* Content Card */}
                            <Grid
                            css={{
                                borderStyle: 'solid',
                                borderWidth: '0px 0px 0px 2px',
                                borderColor: '#ff9f56'
                            }}>
                                <Grid.Container gap={0}
                                css={{
                                    jc: 'flex-start',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                }}>
                                    {/* Image side grid */}
                                    <Grid
                                    css={{
                                        alignItems: 'center',
                                        margin: '0px 10px 0px 10px'
                                    }}>
                                        <Image css={{
                                            '@xsMin':{
                                                width: '250px',
                                                height: '250px',
                                                borderRadius: '20px'
                                            },
                                            '@xsMax':{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '20px'
                                            },
                                            objectFit: 'cover'
                                        }} src={logo}  />
                                    </Grid>

                                    {/* Text side grid */}
                                    <Grid
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Col>
                                                {/* Title */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    jc: 'center',
                                                    maxWidth: 'fit-content',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$4xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                         ABA 7.0
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '$2xl',
                                                            fontWeight: '$bold',
                                                            borderStyle: 'solid',
                                                            borderWidth: '0px 0px 2px 0px',
                                                            borderColor: '#ff9f56',
                                                            color:'#163364'
                                                        }}>
                                                        ABA 7.0
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                                

                                                {/* Description 2 */}
                                                <Grid.Container gap={0.5}
                                                css={{
                                                    maxWidth: 'fit-content',
                                                    jc: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Grid>
                                                        <Text hideIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$md',
                                                            width: '500px'
                                                        }}>
                                                            The moment we've all been waiting for...
                                                        </Text>
                                                        <Text showIn={'sm'}
                                                        css={{
                                                            jc: 'center',
                                                            fontWeight: '$medium',
                                                            textAlign: 'left',
                                                            fontSize: '$sm',
                                                            width: '250px'
                                                        }}>
                                                           The moment we've all been waiting for...
                                                        </Text>
                                                    </Grid>
                                                </Grid.Container>
                                
                                        </Col>
                                    </Grid>

                                </Grid.Container>
                            </Grid>
                        </Row>
                    </Grid.Container>


                </Grid>
            </Grid.Container>
        </>
    )
}