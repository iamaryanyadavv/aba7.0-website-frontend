import React from "react";
import { useState, useEffect } from "react";
import { Table, Grid, Loading, Avatar, Text, Col, Button, Popover } from "@nextui-org/react";
import AuctionRules from "./auctionrules";
import TournamentRules from "./tournamentrules";
import ABA7Games from './games'
import Pool1 from "./pool1";
import Pool2 from "./pool2";
import Pool3 from "./pool3";
import Pool4 from "./pool4";
import PlayersComponent from "./players";
import TeamsComponent from "./teams";
import LeaderboardComponent from './leaderboard';
import './schedule.css'

export default function ScheduleContent() {
    const [Fetching, setFetching] = useState(false);
    const [Games, setGames] = useState(false);
    const [Standings, setStandings] = useState(false)
    const [Rules, setRules] = useState(false)
    const [Players, setPlayers] = useState(false)
    const [Teams, setTeams] = useState(false)
    const [Leaderboard, setLeaderboard] = useState(true)

    async function getStandings() {
        await fetch('https://aplapi.onrender.com/seasons/apl6/standings')
            .then(response => response.json())
            .then(data => {
                setFetching(false)
            })
    }

    useEffect(() => {
        setFetching(true)
        getStandings();
    }, [])

    return (
        <div>
            {Fetching === true &&
                <Grid.Container gap={4}
                    css={{
                        jc: 'center',
                        alignItems: 'center',
                        height: '70vh',
                    }}>
                    <Loading
                        size="xl"
                        color='warning'
                    />
                </Grid.Container>
            }
            {!Fetching &&
                <div>
                    <Grid.Container
                        css={{
                            jc: 'center',
                            alignItems: 'center',
                        }}>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setGames(true)
                                    setStandings(false)
                                    setRules(false)
                                    setPlayers(false)
                                    setTeams(false)
                                    setLeaderboard(false)
                                }}
                            >
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Games
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setGames(false)
                                    setStandings(true)
                                    setRules(false)
                                    setPlayers(false)
                                    setTeams(false)
                                    setLeaderboard(false)
                                }}
                            >
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Standings
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setGames(false)
                                    setStandings(false)
                                    setRules(false)
                                    setPlayers(true)
                                    setTeams(false)
                                    setLeaderboard(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Players
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setGames(false)
                                    setStandings(false)
                                    setRules(false)
                                    setPlayers(false)
                                    setTeams(true)
                                    setLeaderboard(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Teams
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setGames(false)
                                    setStandings(false)
                                    setRules(false)
                                    setPlayers(false)
                                    setTeams(false)
                                    setLeaderboard(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Leaderboard
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setGames(false)
                                    setStandings(false)
                                    setRules(true)
                                    setPlayers(false)
                                    setTeams(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Rules
                                </Text>
                            </Button>
                        </Grid>
                    </Grid.Container>

                    {Games && !Standings && !Rules && !Players && !Teams && !Leaderboard &&
                        <>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 5px 0px',
                                    fontSize: '$6xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Games
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Games
                            </Text>
                            <ABA7Games />
                            {/* <Spacer 
                    css={{
                        '@xsMax':{
                            height: '45vh'
                        },
                        '@xsMin':{
                            height: '15vh'
                        }
                    }} /> */}
                        </>
                    }

                    {!Games && Standings && !Rules && !Players && !Teams && !Leaderboard &&
                        <>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$6xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Standings
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Standings
                            </Text>
                            <Pool1 />
                            <Pool2 />
                            <Pool3 />
                            <Pool4 />
                        </>
                    }

                    {!Games && !Standings && Rules && !Players && !Teams && !Leaderboard &&
                        <>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$6xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Rules
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Rules
                            </Text>
                            <Col>
                                <AuctionRules />
                                <TournamentRules />
                            </Col>
                        </>
                    }

                    {!Games && !Standings && !Rules && Players && !Teams && !Leaderboard &&
                        <>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 0px 0px',
                                    fontSize: '$6xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Players
                            </Text>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '0px 0px 20px 0px',
                                    fontSize: '$xl',
                                    fontWeight: '$normal',
                                    color: '#163364'
                                }}>
                                Click to check statistics
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Players
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '0px 0px 20px 0px',
                                    fontSize: '$md',
                                    fontWeight: '$normal',
                                    color: '#163364'
                                }}>
                                Click to check statistics
                            </Text>
                            <Col>
                                <PlayersComponent />
                            </Col>
                        </>
                    }

                    {!Games && !Standings && !Rules && !Players && Teams && !Leaderboard &&
                        <>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$6xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Teams
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Teams
                            </Text>
                            <Col>
                                <TeamsComponent />
                            </Col>
                        </>
                    }

                    {!Games && !Standings && !Rules && !Players && !Teams && Leaderboard &&
                        <>
                            <Text hideIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$6xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Leaderboard
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    textAlign: 'center',
                                    padding: '20px 0px 10px 0px',
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    color: '#163364'
                                }}>
                                Leaderboard
                            </Text>
                            <Col>
                                <LeaderboardComponent />
                            </Col>
                        </>
                    }



                </div>}

        </div>
    )
}