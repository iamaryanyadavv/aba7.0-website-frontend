import React from "react";
import { useState, useEffect } from "react";
import { Grid, Text, Col, Table, Image } from "@nextui-org/react";
import APL from '../../assets/images/gamerules.png'

export default function TournamentRules() {
    return(
        <Grid.Container 
        css={{
            jc: 'center',
            textAlign: 'center'
        }}>
            <Grid>
                <Grid.Container 
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    margin: '30px 0px 30px 0px',
                    backgroundColor: '#faf7ea',
                    borderRadius: '20px'
                }}>
                    <Col 
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        jc: 'center',
                    }}>
                        <Image
                        css={{
                            '@xsMin':{
                                width: '200px',
                                height: '200px',
                                borderRadius: '40px',
                                marginTop: '40px'
                            },
                            '@xsMax':{
                                width: '100px',
                                height: '100px',
                                borderRadius: '20px',
                                marginTop: '40px'
                            },
                            objectFit: 'cover'
                        }} src={APL} />

                        <Text hideIn={'xs'}
                        css={{
                            fontSize: '$4xl',
                            fontWeight: '$semibold',
                            paddingTop: '20px',
                            paddingBottom: '20px'
                        }}>
                            Game Rules
                        </Text>

                        <Text showIn={'xs'}
                        css={{
                            fontSize: '$2xl',
                            fontWeight: '$semibold',
                            paddingTop: '20px',
                            paddingBottom: '20px'
                        }}>
                            Event
                        </Text>

                        <Col
                        css={{
                            maxWidth: '1000px',
                            display: 'flex',
                            flexDirection: 'column',
                            jc: 'center',
                            textAlign:'left'
                        }}>
                            
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                The tournament has two stages - Group Stages & Knockouts.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                Each team will play all other teams in their group.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px',
                                textDecoration:'underline',
                                fontWeight: 'bold'
                            }}>
                                General:
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - A win is equal to 2 points. A loss is equal to 0 points.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - If there is a tie in the number of wins, it will go down to point difference. If there is a tie in point difference as well, the team who won in their head to head will qualify for the next stage.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Top 2 teams from each pool will qualify to the next stage.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px',
                                textDecoration:'underline',
                                fontWeight:'bold'
                            }}>
                                Duration:
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - No warm-up time will be given, teams should be ready to play as soon as the previous match finishes. If the team fails to reach at the scheduled time, the match will result in a forfeit.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - A coin toss at the start of every match decides who starts the game with possession of the ball.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - There will be a 12 second shot clock, when violated will result in the opposite team gaining possession. (6)
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - After an offensive rebound(only counted if the ball touches the rim) or a change of possession, the shot clock is reset to 12 seconds.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px',
                                textDecoration:'underline',
                                fontWeight:'bold'
                            }}>
                                Players:
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - 5 out of the 6 players must play every match 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - 1 non-cis man player and 2 cis men from 1 team should be on court at all times. Any team that fails to follow the above rule will be docked 2 points in the group stage (equivalent to a win) and will automatically forfeit any knockout game where this occurs 
                            </Text>
                                <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                            - At least 5 players must have a minimum playing time of 2 minutes in a match.

                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - All substitutions can only be made on a dead ball.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px',
                                textDecoration:'underline',
                                fontWeight:'bold'
                            }}>
                                Playing:
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Half court rules apply: A 3-pointer is worth 2 points, while a 2-point basket or free throw is worth 1.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - After a conversion, the ball is live. That means the team that conceded gets a free rebound and needs to clear the ball at the 3 point line, by either dribbling or passing the ball out. After the free rebound is taken the other team can immediately start defending.
                            </Text>
                                <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                            - Only 5 seconds will be given to take the free rebound, if not taken it will result in a turnover and the other team gets the possession.

                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Each team gets to call one 30-second Timeout in each game. 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - “First to 21” rule applies in regular time. If scores are tied at the end of regulation time, there will be an overtime of 3 minutes. The “First to 21” rule does not hold once the game reaches OT. 
                            </Text>
                                <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                            - Clearances will apply at the 3-point line, and any change of possession will require a clearance. 

                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - All other common Basketball rules will apply (Travel, Carry, Double Dribble, etc). 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - The Referees’ decision will be final. The ABA committee will make the final call regarding any general conflicts.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Possession of the ball given to either team following any dead ball situation shall start/resume with a checkball.
                            </Text>

                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px',
                                textDecoration:'underline',
                                fontWeight:'bold'
                            }}>
                                Fouls:
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Each shooting foul will result in one free throw. 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Flagrant fouls are awarded one free throw and ball possession. Each player can only commit a maximum of 1 flagrant foul in one game. On the second flagrant foul, the player will be ejected. 
                            </Text>
                                <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                            - Bonus Free Throw Rules: Once a team commits 5 defensive team fouls in the game, from the 5th foul onwards, the following free throw rules will be followed: 

                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Each team gets to call one 30-second Timeout in each game. 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 80px'
                            }}>
                                1. Common foul: One free throw 
                            </Text>
                                <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 80px'
                            }}>
                            2. Shooting foul: One free throw

                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 80px'
                            }}>
                                3. And one: Basket count and free throw
                            </Text>

                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Each shooting foul will result in one free throw. 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Unsportsmanlike conduct can result in a technical foul to a player as well as an owner. Which will lead to 1 free shot as well as possession of the ball. (outside done by OC) 
                            </Text>   
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px',
                                textDecoration:'underline',
                                fontWeight:'bold'
                            }}>
                                Power Play:
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - A power play can be called on a dead ball by the captain or an owner of the team.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - <b>The power play states</b>: For the duration of a minute, the captain/owner can choose to boost either a 1 pointer or a 2 pointer. In this minute if chosen to boost a 1 pointer– all 1 pointers scored will be worth 2 points. If chosen to boost a 2 pointer– all 2 pointers will be worth 3 points.
                            </Text>
                                <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                            - This Power play can only be called once in a match.

                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '2.5px 10px 10px 40px'
                            }}>
                                - Note: The ball is live after a point scored, you cannot call a power play after someone scores. It can only be called if there is a foul or a free throw or the ball goes out of bounds.
                            </Text>                             
                        </Col>
                    </Col>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}