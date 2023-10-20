import { Text, Grid, Col, Avatar, Row, Spacer, Link, Table, Image, Modal, Button } from "@nextui-org/react";
import { Loading } from '@nextui-org/react';
import React from "react";
import { useState, useEffect } from "react";
import User from '../../assets/images/User.png';
import './schedule.css';
import { AiOutlineDollar } from 'react-icons/ai';
import { TbSoccerField } from "react-icons/tb";
import { BsBook, BsGenderAmbiguous } from "react-icons/bs";


export default function Players() {
    const [Fetching, setFetching] = useState(true);
    const [PreTierAllotmentPlayers, setPreTierAllotmentPlayers] = useState([]);
    const [Tier1PlayerData, setTier1PlayerData] = useState([]);
    const [Tier2PlayerData, setTier2PlayerData] = useState([]);
    const [Tier3PlayerData, setTier3PlayerData] = useState([]);
    const [Tier4PlayerData, setTier4PlayerData] = useState([]);
    const [OneReady, setOneReady] = useState(true);
    const [TwoReady, setTwoReady] = useState(false);
    const [ThreeReady, setThreeReady] = useState(false);
    const [FourReady, setFourReady] = useState(false);
    const [Top10Ready, setTop10Ready] = useState(false)
    const [Search, setSearch] = useState('');
    const [Top10, setTop10] = useState([]);
    const [StatsModal, setStatsModal] = useState(false);
    const [StatsPlayer, setStatsPlayer] = useState();
    const [PlayersWithStats, setPlayersWithStats] = useState({});

    // Player array - 
    // 0: Picture
    // 1: Name
    // 2: PrimaryPosition
    // 3: SecondaryPosition
    // 4: Comments
    // 5: Tier
    // 6: Price
    // 7: Team
    // 8: Team Logo
    // 9: Gender
    // 10: Batch

    //Team array - 
    // 0: team logo image base64
    // 1: team logo colour text
    // 2: manager email
    // 3: team name
    // 4: payment mode
    // 5: manager name
    // 6: owners name
    // 7: manager email
    // 8: manager phone

    //Stats array - 
    // 0: player name
    // 1: team for
    // 2: team against
    // 3: Minutes
    // 4: Points
    // 5: Rebounds
    // 6: Assists
    // 7: Steals
    // 8: Fouls

    const getTeamData = async () => {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7teams')
            .then(response => response.json())
            .then((data) => {
                // console.log(data)
                OnceTeamData(data)
            })
    }

    const OnceTeamData = async (teams) => {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7players')
            .then(response => response.json())
            .then((data) => {
                // console.log(data)
                OncePlayerData(data, teams);
                setFetching(false);
            })
    }

    const OncePlayerData = async (players, teams) => {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7stats')
            .then(response => response.json())
            .then((data) => {
                // console.log(data)
                preparePlayerTierData(data, players, teams)
            })
    }

    useEffect(() => {
        if (StatsModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [StatsModal]);

    const TierLessCards = PreTierAllotmentPlayers.map((player, index) => (

        <>
            <Grid key={index}
                css={{
                    margin: '12px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                onClick={() => {
                    setStatsPlayer(player[1])
                    setStatsModal(true)
                }}
            >
                <Image
                    src={player[0]}
                    css={{
                        width: '200px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </Grid>
        </>
    ))

    const Tier1Cards = Tier1PlayerData.map((player, index) => (
        <>
            <Grid key={index}
                css={{
                    margin: '12px',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                onClick={() => {
                    setStatsPlayer(player[1])
                    setStatsModal(true)
                }}
                className="player-card"
            >
                <Image
                    src={player[0]}
                    css={{
                        width: '300px',
                        height: '450px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </Grid>
        </>
    ))

    const Tier2Cards = Tier2PlayerData.map((player, index) => (

        <>
            <Grid key={index}
                css={{
                    margin: '12px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                onClick={() => {
                    setStatsPlayer(player[1])
                    setStatsModal(true)
                }}
                className="player-card"
            >
                <Image
                    src={player[0]}
                    css={{
                        width: '300px',
                        height: '450px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </Grid>
        </>
    ))

    const Tier3Cards = Tier3PlayerData.map((player, index) => (

        <>
            <Grid key={index}
                css={{
                    margin: '12px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                onClick={() => {
                    setStatsPlayer(player[1])
                    setStatsModal(true)
                }}
                className="player-card"
            >
                <Image
                    src={player[0]}
                    css={{
                        width: '300px',
                        height: '450px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </Grid>
        </>
    ))

    const Tier4Cards = Tier4PlayerData.map((player, index) => (

        <>
            <Grid key={index}
                css={{
                    margin: '12px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                onClick={() => {
                    setStatsPlayer(player[1])
                    setStatsModal(true)
                }}
                className="player-card"
            >
                <Image
                    src={player[0]}
                    css={{
                        width: '300px',
                        height: '450px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </Grid>
        </>
    ))

    const preparePlayerTierData = (stats, players, teams) => {
        const pretierallotmentplayers = []
        const tier1players = []
        const tier2players = []
        const tier3players = []
        const tier4players = []
        var playerssorted = []
        var top10 = []

        var playerswithstats = {}
        function getRankSubscript(rank) {
            if (rank % 10 === 1 && rank % 100 !== 11) {
                return "st";
            } else if (rank % 10 === 2 && rank % 100 !== 12) {
                return "nd";
            } else if (rank % 10 === 3 && rank % 100 !== 13) {
                return "rd";
            } else {
                return "th";
            }
        }
        for (const player of players.values) {
            playerswithstats[player[1]] = [[], player[2], player[3], player[10]]
        }
       
        for (const stat of stats) {
            var statArray = [stat[2], stat[3], stat[4], stat[5], stat[6], stat[7], stat[8]]
            playerswithstats[stat[0]][0].push(statArray)
        }

        for (const player of players.values) {
            const statIndices = [12, 13, 14, 15, 16, 17];
        
            const rankArray = ['Rank'];
        
            for (const statIndex of statIndices) {
                const statValue = player[statIndex];
                const temprank = calculateRank(players.values, statIndex, statValue);
                const rank = temprank+getRankSubscript(temprank);
                rankArray.push(rank);
            }
        
            playerswithstats[player[1]][0].push(['Average', ...player.slice(12, 18)]);
            playerswithstats[player[1]][0].push(rankArray);
        }
        
        // Function to calculate the rank of a player for a specific stat
        function calculateRank(playersArray, statIndex, statValue) {
            const sortedArray = playersArray.slice().sort((a, b) => b[statIndex] - a[statIndex]);
            const rank = sortedArray.findIndex((player) => player[statIndex] === statValue) + 1;
            return rank;
        }
        
        setPlayersWithStats(playerswithstats)

        if (players.values.length > 1) {
            for (var i = 0; i < players.values.length; i++) {
                for (var j = 0; j < teams.length; j++) {
                    if (teams[j][2] == players.values[i][7]) {
                        players.values[i][8] = teams[j][0]
                    }
                }
                if (players.values[i][5] == '0') {
                    if (players.values[i][5] == '0') {
                        pretierallotmentplayers.push(players.values[i])
                    }
                }
                else if (players.values[i][5] != '0') {
                    if (players.values[i][5] == '1') {
                        tier1players.push(players.values[i])
                    }
                    if (players.values[i][5] == '2') {
                        tier2players.push(players.values[i])
                    }
                    if (players.values[i][5] == '3') {
                        tier3players.push(players.values[i])
                    }
                    if (players.values[i][5] == '4') {
                        tier4players.push(players.values[i])
                    }
                }
            }
            // playerssorted = players.values.sort(function (a, b) {
            //     return b[6] - a[6]
            // })
        }
        setPreTierAllotmentPlayers(pretierallotmentplayers)
        setTier1PlayerData(tier1players)
        setTier2PlayerData(tier2players)
        setTier3PlayerData(tier3players)
        setTier4PlayerData(tier4players)

        // loop to set the top 10 most expensive players
        // for (var i = 1; i < 11; i++) {
        //     top10.push(playerssorted[i])
        // }
        // setTop10(top10)

        //loop at t0 update each player with their team logo
        // for (var i = 0; i < players.values.length; i++) {
        //     for (var j = 0; j < teams.length; j++) {
        //         if (teams[j][2] == players.values[i][7]) {
        //             players.values[i][8] = teams[j][0]
        //         }
        //     }
        // }



    }

    useEffect(() => {
        getTeamData();
    }, [])

    return (
        <div>
            {Fetching === true &&
                <Grid.Container gap={4}
                    css={{
                        jc: 'center',
                        alignItems: 'center',
                        height: '60vh',
                    }}>
                    <Loading
                        size="xl"
                        color={'warning'}
                    />
                </Grid.Container>
            }
            {!Fetching &&
                <div>

                    {/* Navigation Buttons */}
                    <Grid.Container
                        css={{
                            jc: 'center',
                            alignItems: 'center',
                        }}>
                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '16px 42px'
                                }
                            }}>
                            <Text id='tier1btn'
                                css={{
                                    fontSize: '$lg',
                                    color: '#E6BE8A',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(255, 215, 0, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(true)
                                    setTwoReady(false)
                                    setThreeReady(false)
                                    setFourReady(false)
                                    document.getElementById('tier1btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier1btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 1
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '16px 42px'
                                }
                            }}>
                            <Text id='tier2btn'
                                css={{
                                    fontSize: '$lg',
                                    color: 'rgb(157, 171, 187)',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(192, 192, 192, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(192, 192, 192, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(false)
                                    setTwoReady(true)
                                    setThreeReady(false)
                                    setFourReady(false)
                                    document.getElementById('tier2btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier2btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 2
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '16px 42px'
                                }
                            }}>
                            <Text id='tier3btn'
                                css={{
                                    fontSize: '$lg',
                                    color: '#CD7F32',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(190, 159, 103, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(205, 127, 50, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(false)
                                    setTwoReady(false)
                                    setThreeReady(true)
                                    setFourReady(false)
                                    document.getElementById('tier3btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier3btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 3
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '16px 42px'
                                }
                            }}>
                            <Text id='tier4btn'
                                css={{
                                    fontSize: '$lg',
                                    color: 'rgb(183, 110, 121)',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(183, 110, 121, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(183, 110, 121, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(false)
                                    setTwoReady(false)
                                    setThreeReady(false)
                                    setFourReady(true)
                                    document.getElementById('tier4btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier4btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 4
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '16px 42px'
                                }
                            }}>
                            <Link id='sheetsbtn'
                                css={{
                                    fontSize: '$lg',
                                    color: 'White',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(15, 157, 88, 0.8)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(15, 157, 88, 0.9)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    document.getElementById('sheetsbtn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('sheetsbtn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                                href='https://docs.google.com/spreadsheets/d/1Jl4oSC0BPjafsaBesmxV_vpcAvjiYrVxFiOhlk6_dZo/edit#gid=0'
                                target='_blank'
                                rel='noreferrer'
                            >
                                View in Sheets
                            </Link>
                        </Grid>

                        {/* <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button auto className="games-btn" rounded flat
                                onClick={() => {
                                    setTop10Ready(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Top 10 Most Expensive
                                </Text>
                            </Button>
                        </Grid> */}
                    </Grid.Container>

                    {/* Top 10 Modal */}
                    {/* {Top10 &&
                        <Modal
                            closeButton
                            open={Top10Ready}
                            onClose={() => {
                                setTop10Ready(false)
                            }}>
                            <Modal.Header>
                                <Text
                                    css={{
                                        '@xsMax': {
                                            fontSize: '$md',
                                            fontWeight: '$medium'
                                        },
                                        '@xsMin': {
                                            fontSize: '$xl',
                                            fontWeight: '$medium'
                                        },
                                        border: 'solid',
                                        borderColor: '#C4B454',
                                        borderWidth: '0px 0px 2px 0px'
                                    }}>
                                    Top 10 Most Expensive Players
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                {Top10.map((player, index) => (
                                    <Row
                                        css={{
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>
                                        <Avatar size={'lg'} src={player[0]} css={{ jc: 'start' }} />
                                        <Text
                                            css={{
                                                padding: '0px 6px 0px 12px',
                                                '@xsMax': {
                                                    fontSize: '$md',
                                                    fontWeight: '$medium'
                                                },
                                                '@xsMin': {
                                                    fontSize: '$xl',
                                                    fontWeight: '$medium'
                                                },
                                            }}>
                                            {player[1]}
                                        </Text>
                                        <Text
                                            css={{
                                                '@xsMax': {
                                                    fontSize: '$md',
                                                    fontWeight: '$medium'
                                                },
                                                '@xsMin': {
                                                    fontSize: '$xl',
                                                    fontWeight: '$medium'
                                                },
                                            }}>
                                            - {player[6]}M
                                        </Text>
                                    </Row>
                                ))}
                            </Modal.Body>
                        </Modal>
                    } */}

                    {/* Stats Modal */}
                    {StatsPlayer &&
                        <Modal
                            fullScreen={true}
                            scroll
                            shouldBlockScroll={false}
                            closeButton
                            open={StatsModal}
                            onClose={() => {
                                setStatsModal(false)
                                setStatsPlayer(null)
                            }}>
                            <Modal.Header>
                                <Text
                                    css={{
                                        '@xsMax': {
                                            fontSize: '$md',
                                            fontWeight: '$medium'
                                        },
                                        '@xsMin': {
                                            fontSize: '$xl',
                                            fontWeight: '$medium'
                                        },
                                        border: 'solid',
                                        borderColor: '#faf7ea',
                                        borderWidth: '0px 0px 2px 0px'
                                    }}>
                                    {StatsPlayer}'s Statistics
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <Col>
                                    <Row>
                                        <Text css={{
                                            fontWeight: '$semibold',
                                            marginRight: '4px'
                                        }}>
                                            Name:
                                        </Text>
                                        <Text>
                                            {StatsPlayer}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text css={{
                                            fontWeight: '$semibold',
                                            marginRight: '4px'
                                        }}>
                                            Height:
                                        </Text>
                                        <Text>
                                            {PlayersWithStats[StatsPlayer][2]}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text css={{
                                            fontWeight: '$semibold',
                                            marginRight: '4px'
                                        }}>
                                            Type:
                                        </Text>
                                        <Text>
                                            {PlayersWithStats[StatsPlayer][1]}
                                        </Text>
                                    </Row>
                                    <Row css={{
                                        paddingBottom: '12px'
                                    }}>
                                        <Text css={{
                                            fontWeight: '$semibold',
                                            marginRight: '4px'
                                        }}>
                                            Batch:
                                        </Text>
                                        <Text>
                                            {PlayersWithStats[StatsPlayer][3]}
                                        </Text>
                                    </Row>

                                    <Table bordered={true}
                                        css={{
                                            height: "auto",
                                            minWidth: "100%",
                                        }}>
                                        <Table.Header>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'start'}}>Against</Table.Column>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Minutes</Table.Column>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Points</Table.Column>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Rebounds</Table.Column>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Assists</Table.Column>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Steals</Table.Column>
                                            <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Fouls</Table.Column>
                                        </Table.Header>
                                        <Table.Body>
                                            {PlayersWithStats[StatsPlayer][0].map((row) => {
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell css={{ textAlign: 'start' }}>
                                                        {row[0] !== 'Average' && row[0] !== 'Rank' ? (
                                                            <Text>
                                                                vs {row[0]}
                                                            </Text>
                                                        ) : (
                                                            <Text>
                                                                {row[0]}
                                                            </Text>
                                                        )}

                                                        </Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{row[1]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{row[2]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{row[3]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{row[4]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{row[5]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{row[6]}</Table.Cell>
                                                    </Table.Row>
                                                )
                                            })}
                                        </Table.Body>
                                    </Table>

                                </Col>
                            </Modal.Body>
                        </Modal>
                    }

                    {/* Tier 1 Block*/}
                    {Tier1Cards.length != 0 && OneReady && !TwoReady && !ThreeReady && !FourReady &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                margin: '30px 0px 30px 0px',
                                backgroundColor: '#faf7ea',
                                borderRadius: '20px'
                            }}>
                            <Grid
                                css={{
                                    jc: 'center',
                                    alignItems: 'center'
                                }}>


                                {/* Heading */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <Text hideIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$6xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: '#C4B454'
                                        }}>
                                        TIER 1
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$2xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: '#C4B454'
                                        }}>
                                        TIER 1
                                    </Text>
                                </Grid.Container>

                                {/* Content */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                    }}>

                                    {Tier1Cards}

                                </Grid.Container>

                            </Grid>

                        </Grid.Container>
                    }

                    {/* Tier 2 Block */}
                    {Tier2Cards.length != 0 && !OneReady && TwoReady && !ThreeReady && !FourReady &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                margin: '30px 0px 30px 0px',
                                backgroundColor: '#faf7ea',
                                borderRadius: '20px'
                            }}>
                            <Grid
                                css={{
                                    jc: 'center',
                                    alignItems: 'center'
                                }}>


                                {/* Heading */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <Text hideIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$6xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: 'rgb(157, 171, 187)'
                                        }}>
                                        TIER 2
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$2xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: 'rgb(157, 171, 187)'
                                        }}>
                                        TIER 2
                                    </Text>
                                </Grid.Container>

                                {/* Content */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                    }}>

                                    {Tier2Cards}

                                </Grid.Container>

                            </Grid>

                        </Grid.Container>
                    }

                    {/* Tier 3 Block */}
                    {Tier3Cards.length != 0 && !OneReady && !TwoReady && ThreeReady && !FourReady &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                margin: '30px 0px 60px 0px',
                                backgroundColor: '#faf7ea',
                                borderRadius: '20px'
                            }}>
                            <Grid
                                css={{
                                    jc: 'center',
                                    alignItems: 'center'
                                }}>


                                {/* Heading */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <Text hideIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$6xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: '#CD7F32'
                                        }}>
                                        TIER 3
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$2xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: 'rgb(190, 159, 103)'
                                        }}>
                                        TIER 3
                                    </Text>
                                </Grid.Container>

                                {/* Content */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                    }}>

                                    {Tier3Cards}

                                </Grid.Container>

                            </Grid>

                        </Grid.Container>
                    }

                    {/* Tier 4 Block */}
                    {Tier4Cards.length != 0 && !OneReady && !TwoReady && !ThreeReady && FourReady &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                margin: '30px 0px 30px 0px',
                                backgroundColor: '#faf7ea',
                                borderRadius: '20px'
                            }}>
                            <Grid
                                css={{
                                    jc: 'center',
                                    alignItems: 'center'
                                }}>


                                {/* Heading */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <Text hideIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$6xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: '#B76E79'
                                        }}>
                                        TIER 4
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$2xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: '#B76E79'
                                        }}>
                                        TIER 4
                                    </Text>
                                </Grid.Container>

                                {/* Content */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                    }}>

                                    {Tier4Cards}

                                </Grid.Container>

                            </Grid>

                        </Grid.Container>
                    }

                    {/* Pre Tier Allotment Block */}
                    {TierLessCards.length != 0 &&
                        <Grid.Container
                            css={{
                                jc: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                                margin: '30px 0px 30px 0px',
                                backgroundColor: '#faf7ea',
                                borderRadius: '20px'
                            }}>
                            <Grid
                                css={{
                                    jc: 'center',
                                    alignItems: 'center'
                                }}>


                                {/* Heading */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                        marginTop: '20px'
                                    }}>
                                    <Text hideIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$6xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: 'White'
                                        }}>
                                        Registered
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            fontSize: '$2xl',
                                            fontWeight: '$semibold',
                                            paddingBottom: '20px',
                                            color: 'White'
                                        }}>
                                        Registered
                                    </Text>
                                </Grid.Container>

                                {/* Content */}
                                <Grid.Container
                                    css={{
                                        jc: 'center',
                                        textAlign: 'center',
                                    }}>

                                    {TierLessCards}

                                </Grid.Container>

                            </Grid>

                        </Grid.Container>
                    }

                    {/* {TierLessCards.length == 0 && Tier1Cards.length == 0 && Tier2Cards.length == 0 && Tier3Cards.length == 0 && Tier4Cards.length == 0 &&
                        <div>
                            <Text hideIn={'xs'}
                                css={{
                                    fontSize: '$4xl',
                                    fontWeight: '$semibold',
                                    padding: '40px 10% 0px 10%',
                                    textAlign: 'center',

                                }}>
                                No Players yet... Check again after player registration starts!
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$semibold',
                                    padding: '40px 10% 0px 10%',
                                    textAlign: 'center',

                                }}>
                                No Players yet... Check again after player registration starts!
                            </Text>
                            <Spacer y={15} />
                        </div>
                    } */}
                </div>
            }
        </div>


    )
}