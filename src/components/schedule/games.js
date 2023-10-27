import React, { useState, useEffect } from "react";
import { Grid, Loading, Card, Text, Row, Button, Avatar, Spacer } from "@nextui-org/react";
import './schedule.css'

export default function Games() {
    const [Fetching, setFetching] = useState();
    const [Teams, setTeams] = useState();
    const [Day1Games, setDay1Games] = useState([]);
    const [Day2Games, setDay2Games] = useState([]);
    const [Day3Games, setDay3Games] = useState([]);
    const [Day1, setDay1] = useState(true);
    const [Day2, setDay2] = useState(false);
    const [Day3, setDay3] = useState(false);
    const [i, seti] = useState(25);

    async function getGames() {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7games')
            .then(response => response.json())
            .then(data => {
                const day1games = []
                const day2games = []
                const day3games = []
                for (var i = 1; i < 10; i++) {
                    day1games.push(data.values[i])
                }
                for (var i = 11; i < 26; i++) {
                    day2games.push(data.values[i])
                }
                for (var i = 27; i <= 35; i++) {
                    day3games.push(data.values[i])
                }
                setDay1Games(day1games)
                setDay2Games(day2games)
                setDay3Games(day3games.reverse())
                setFetching(false)
            })
    }

    async function getTeams() {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7teams')
            .then(response => response.json())
            .then(data => {
                setTeams(data)
            })
    }

    useEffect(() => {
        setFetching(true)
        getGames()
        getTeams()
    }, [])

    return (
        <>
            {Fetching &&
                <Grid.Container gap={4}
                    css={{
                        jc: 'center',
                        alignItems: 'center',
                        height: '60vh',
                    }}>
                    <Loading
                        size="xl"
                        color='warning'
                    />
                </Grid.Container>
            }
            {!Fetching && Teams &&
                <>

                    <Grid.Container
                        css={{
                            jc: 'center',
                            alignItems: 'center',
                        }}>
                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setDay1(true)
                                    setDay2(false)
                                    setDay3(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Friday
                                </Text>
                            </Button>
                        </Grid>
                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto rounded flat
                                onClick={() => {
                                    setDay1(false)
                                    setDay2(true)
                                    setDay3(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Saturday
                                </Text>
                            </Button>
                        </Grid>
                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto rounded flat
                                onClick={() => {
                                    setDay1(false)
                                    setDay2(false)
                                    setDay3(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Sunday
                                </Text>
                            </Button>
                        </Grid>
                    </Grid.Container>

                    {Day3Games.length != 0 && Day3 &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center'
                            }}>
                            <Grid>

                                {/* Day 3 Games */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        margin: '30px 0px 30px 0px',
                                        backgroundColor: '#faf7ea',
                                        borderRadius: '20px'
                                    }}>
                                    <Grid.Container
                                        css={{
                                            jc: 'center'
                                        }}>
                                        <Text
                                            css={{
                                                fontSize: '$4xl',
                                                fontWeight: '$semibold',
                                                padding: '20px',
                                                '@xsMax': {
                                                    fontSize: '$2xl'
                                                }
                                            }}>
                                            Day 3 (Sunday)
                                        </Text>
                                    </Grid.Container>
                                    {Day3Games.map((game, index) => (
                                        <Grid key={index}
                                            css={{
                                                padding: '12px'
                                            }}>
                                            <Card css={{ mw: "max-content" }}>
                                                <Card.Header>
                                                    <Text b>{game[4]}</Text>
                                                </Card.Header>

                                                <Card.Divider />

                                                <Card.Body css={{ py: "$10", padding: '20px 10px' }}>
                                                    <Grid.Container
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center'
                                                        }}>
                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '300px',
                                                                }
                                                            }}>
                                                            <Row
                                                                css={{
                                                                    jc: 'center',
                                                                    textAlign: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                {Teams.map((team, index) => (
                                                                    team[2] == game[1] ? <Avatar src={team[0]} /> : <></>
                                                                ))}
                                                                <Text
                                                                    css={{
                                                                        fontSize: '$2xl',
                                                                        fontWeight: '$semibold',
                                                                        padding: '0px 10px'
                                                                    }}>
                                                                    {game[1]}
                                                                </Text>
                                                            </Row>
                                                        </Grid>

                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '150px',
                                                                    alignItems: 'center'
                                                                }
                                                            }}>
                                                            <Text
                                                                css={{
                                                                    fontSize: '$2xl',
                                                                    fontWeight: '$semibold',
                                                                    padding: '0px 10px',
                                                                    display: 'inline'
                                                                }}>
                                                                {game[3]}
                                                            </Text>
                                                        </Grid>

                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '300px',
                                                                }
                                                            }}>
                                                            <Row
                                                                css={{
                                                                    jc: 'center',
                                                                    textAlign: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                <Text
                                                                    css={{
                                                                        fontSize: '$2xl',
                                                                        fontWeight: '$semibold',
                                                                        padding: '0px 10px'
                                                                    }}>
                                                                    {game[2]}
                                                                </Text>
                                                                {Teams.map((team, index) => (
                                                                    team[2] == game[2] ? <Avatar src={team[0]} /> : <></>
                                                                ))}
                                                            </Row>
                                                        </Grid>
                                                    </Grid.Container>
                                                    <Grid.Container
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <Text
                                                            css={{
                                                                color: '$gray600'
                                                            }}>
                                                            {game[5]}
                                                        </Text>
                                                    </Grid.Container>


                                                </Card.Body>

                                                <Card.Divider />

                                                <Card.Footer>
                                                    <Text b>October 29th Sunday {game[0]}</Text>
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    }

                    {Day2Games.length != 0 && Day2 &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center'
                            }}>
                            <Grid>

                                {/* Day 2 Games */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        margin: '30px 0px 30px 0px',
                                        backgroundColor: '#faf7ea',
                                        borderRadius: '20px'
                                    }}>
                                    <Grid.Container
                                        css={{
                                            jc: 'center'
                                        }}>
                                        <Text
                                            css={{
                                                fontSize: '$4xl',
                                                fontWeight: '$semibold',
                                                padding: '20px',
                                                '@xsMax': {
                                                    fontSize: '$2xl'
                                                }
                                            }}>
                                            Day 2 (Saturday)
                                        </Text>
                                    </Grid.Container>
                                    {Day2Games.map((game, index) => (
                                        <Grid key={index}
                                            css={{
                                                padding: '12px'
                                            }}>
                                            <Card isHoverable css={{ mw: "max-content" }}>
                                                <Card.Header>
                                                    <Text b>Game {i + index}</Text>
                                                </Card.Header>

                                                <Card.Divider />

                                                <Card.Body css={{ py: "$10" }}>
                                                    <Grid.Container
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center'
                                                        }}>
                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '300px',
                                                                }
                                                            }}>
                                                            <Row
                                                                css={{
                                                                    jc: 'center',
                                                                    textAlign: 'center'
                                                                }}>
                                                                {Teams.map((team, index) => (
                                                                    team[2] == game[1] ? <Avatar src={team[0]} /> : <></>
                                                                ))}
                                                                <Text
                                                                    css={{
                                                                        fontSize: '$2xl',
                                                                        fontWeight: '$semibold',
                                                                        padding: '0px 10px'
                                                                    }}>
                                                                    {game[1]}
                                                                </Text>
                                                            </Row>
                                                        </Grid>

                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                }
                                                            }}>
                                                            <Text
                                                                css={{
                                                                    fontSize: '$2xl',
                                                                    fontWeight: '$semibold',
                                                                    padding: '0px 10px',
                                                                    display: 'inline'
                                                                }}>
                                                                {game[3]}
                                                            </Text>
                                                        </Grid>

                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '300px',
                                                                }
                                                            }}>
                                                            <Row
                                                                css={{
                                                                    jc: 'center',
                                                                    textAlign: 'center'
                                                                }}>
                                                                <Text
                                                                    css={{
                                                                        fontSize: '$2xl',
                                                                        fontWeight: '$semibold',
                                                                        padding: '0px 10px'
                                                                    }}>
                                                                    {game[2]}
                                                                </Text>
                                                                {Teams.map((team, index) => (
                                                                    team[2] == game[2] ? <Avatar src={team[0]} /> : <></>
                                                                ))}
                                                            </Row>
                                                        </Grid>
                                                    </Grid.Container>


                                                </Card.Body>

                                                <Card.Divider />

                                                <Card.Footer>
                                                    {game[0] != '12:00 AM' && game[0] != '12:30 AM' &&
                                                        <Text b>October 28th Saturday {game[0]}</Text>
                                                    }
                                                    {game[0] == '12:00 AM' &&
                                                        <Text b>October 28th Sunday {game[0]}</Text>
                                                    }
                                                    {game[0] == '12:30 AM' &&
                                                        <Text b>October 28th Sunday {game[0]}</Text>
                                                    }
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    }

                    {Day1Games.length != 0 && Day1 &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center'
                            }}>
                            <Grid>

                                {/* Day 1 Games */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        margin: '30px 0px 30px 0px',
                                        backgroundColor: '#faf7ea',
                                        borderRadius: '20px'
                                    }}>
                                    <Grid.Container
                                        css={{
                                            jc: 'center'
                                        }}>
                                        <Text
                                            css={{
                                                fontSize: '$4xl',
                                                fontWeight: '$semibold',
                                                padding: '20px',
                                                '@xsMax': {
                                                    fontSize: '$2xl'
                                                }
                                            }}>
                                            Day 1 (Friday)
                                        </Text>
                                    </Grid.Container>
                                    {Day1Games.map((game, index) => (
                                        <Grid key={index}
                                            css={{
                                                padding: '12px'
                                            }}>
                                            <Card isHoverable css={{ mw: "max-content" }}>
                                                <Card.Header>
                                                    <Text b>Game {index + 1}</Text>
                                                </Card.Header>

                                                <Card.Divider />

                                                <Card.Body css={{ py: "$10" }}>
                                                    <Grid.Container
                                                        css={{
                                                            jc: 'center',
                                                            textAlign: 'center'
                                                        }}>
                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '300px',
                                                                }
                                                            }}>
                                                            <Row
                                                                css={{
                                                                    jc: 'center',
                                                                    textAlign: 'center'
                                                                }}>
                                                                {Teams.map((team, index) => (
                                                                    team[2] == game[1] ? <Avatar src={team[0]} /> : <></>
                                                                ))}
                                                                <Text
                                                                    css={{
                                                                        fontSize: '$2xl',
                                                                        fontWeight: '$semibold',
                                                                        padding: '0px 10px'
                                                                    }}>
                                                                    {game[1]}
                                                                </Text>
                                                            </Row>
                                                        </Grid>

                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                }
                                                            }}>
                                                            <Text
                                                                css={{
                                                                    fontSize: '$2xl',
                                                                    fontWeight: '$semibold',
                                                                    padding: '0px 10px',
                                                                    display: 'inline'
                                                                }}>
                                                                {game[3]}
                                                            </Text>
                                                        </Grid>

                                                        <Grid
                                                            css={{
                                                                '@xsMax': {
                                                                    width: '100%'
                                                                },
                                                                '@xsMin': {
                                                                    width: '300px',
                                                                }
                                                            }}>
                                                            <Row
                                                                css={{
                                                                    jc: 'center',
                                                                    textAlign: 'center'
                                                                }}>
                                                                <Text
                                                                    css={{
                                                                        fontSize: '$2xl',
                                                                        fontWeight: '$semibold',
                                                                        padding: '0px 10px'
                                                                    }}>
                                                                    {game[2]}
                                                                </Text>
                                                                {Teams.map((team, index) => (
                                                                    team[2] == game[2] ? <Avatar src={team[0]} /> : <></>
                                                                ))}
                                                            </Row>
                                                        </Grid>
                                                    </Grid.Container>


                                                </Card.Body>

                                                <Card.Divider />

                                                <Card.Footer>
                                                    {game[0] != '12:00 AM' &&
                                                        <Text b>October 27th Friday {game[0]}</Text>
                                                    }
                                                    {game[0] == '12:00 AM' &&
                                                        <Text b>October 27th Friday {game[0]}</Text>
                                                    }
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                    }
                </>
            }
        </>
    )
}