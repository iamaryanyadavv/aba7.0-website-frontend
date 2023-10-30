import React, { useState, useEffect } from "react";
import { Grid, Loading, Card, Text, Row, Button, Avatar, Table } from "@nextui-org/react";
import './schedule.css'

export default function Leaderboard() {
    const [Fetching, setFetching] = useState();

    const [TotalPoints, setTotalPoints] = useState([]);
    const [AVGPoints, setAVGPoints] = useState([]);

    const [TotalAssists, setTotalAssists] = useState([]);
    const [AVGAssists, setAVGAssists] = useState([]);

    const [TotalRebounds, setTotalRebounds] = useState([]);
    const [AVGRebounds, setAVGRebounds] = useState([]);

    const [TotalSteals, setTotalSteals] = useState([]);
    const [AVGSteals, setAVGSteals] = useState([]);

    const [TotalBlocks, setTotalBlocks] = useState([]);
    const [AVGBlocks, setAVGBlocks] = useState([]);

    const [showPoints, setShowPoints] = useState(true)
    const [showAssists, setShowAssists] = useState(false)
    const [showRebounds, setShowRebounds] = useState(false)
    const [showSteals, setShowSteals] = useState(false)
    const [showBlocks, setShowBlocks] = useState(false)

    const [showAVGPoints, setShowAVGPoints] = useState(false)
    const [showAVGAssists, setShowAVGAssists] = useState(false)
    const [showAVGRebounds, setShowAVGRebounds] = useState(false)
    const [showAVGSteals, setShowAVGSteals] = useState(false)
    const [showAVGBlocks, setShowAVGBlocks] = useState(false)

    const [showTotalPoints, setShowTotalPoints] = useState(true)
    const [showTotalAssists, setShowTotalAssists] = useState(true)
    const [showTotalRebounds, setShowTotalRebounds] = useState(true)
    const [showTotalSteals, setShowTotalSteals] = useState(true)
    const [showTotalBlocks, setShowTotalBlocks] = useState(true)


    async function getPoints() {
        // await fetch('http://localhost:3001/aba7/leaderboard/points')
        await fetch('https://aba-backend-gr9t.onrender.com/aba7/leaderboard/points')
            .then(response => response.json())
            .then(pointsData => {
                getAssists(pointsData)
            })
    }

    async function getAssists(pointsData) {
        // await fetch('http://localhost:3001/aba7/leaderboard/assists')
        await fetch('https://aba-backend-gr9t.onrender.com/aba7/leaderboard/assists')
            .then(response => response.json())
            .then(assistsData => {
                getRebounds(pointsData, assistsData)
            })
    }

    async function getRebounds(pointsData, assistsData) {
        // await fetch('http://localhost:3001/aba7/leaderboard/rebounds')
        await fetch('https://aba-backend-gr9t.onrender.com/aba7/leaderboard/rebounds')
            .then(response => response.json())
            .then(reboundsData => {
                getSteals(pointsData, assistsData, reboundsData)
            })
    }

    async function getSteals(pointsData, assistsData, reboundsData) {
        // await fetch('http://localhost:3001/aba7/leaderboard/steals')
        await fetch('https://aba-backend-gr9t.onrender.com/aba7/leaderboard/steals')
            .then(response => response.json())
            .then(stealsData => {
                getBlocks(pointsData, assistsData, reboundsData, stealsData)
            })
    }

    async function getBlocks(pointsData, assistsData, reboundsData, stealsData) {
        // await fetch('http://localhost:3001/aba7/leaderboard/blocks')
        await fetch('https://aba-backend-gr9t.onrender.com/aba7/leaderboard/blocks')
            .then(response => response.json())
            .then(blocksData => {
                // now we have points, assists, rebounds, steals and blocks arrays
                // console.log(pointsData)
                // console.log(assistsData)
                // console.log(reboundsData)
                // console.log(stealsData)
                // console.log(blocksData)

                var avgPoints = pointsData.sort((a, b) => b[2] - a[2])
                var avgAssists = assistsData.sort((a, b) => b[2] - a[2])
                var avgRebounds = reboundsData.sort((a, b) => b[2] - a[2])
                var avgSteals = stealsData.sort((a, b) => b[2] - a[2])
                var avgBlocks = blocksData.sort((a, b) => b[2] - a[2])

                console.log(avgBlocks)

                setAVGPoints(avgPoints)
                setAVGAssists(avgAssists)
                setAVGRebounds(avgRebounds)
                setAVGSteals(avgSteals)
                setAVGBlocks(avgBlocks)

                var totalPoints = avgPoints.sort((a, b) => b[1] - a[1])
                var totalAssists = avgAssists.sort((a, b) => b[1] - a[1])
                var totalRebounds = avgRebounds.sort((a, b) => b[1] - a[1])
                var totalSteals = avgSteals.sort((a, b) => b[1] - a[1])
                var totalBlocks = avgBlocks.sort((a, b) => b[1] - a[1])

                setTotalPoints(totalPoints)
                setTotalAssists(totalAssists)
                setTotalRebounds(totalRebounds)
                setTotalSteals(totalSteals)
                setTotalBlocks(totalBlocks)

                setFetching(false)
            })
    }

    useEffect(() => {
        setFetching(true)
        getPoints()
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
            {!Fetching && TotalPoints.length > 0 && TotalAssists.length > 0 && TotalRebounds.length > 0 && TotalSteals.length > 0 && TotalBlocks.length > 0 && AVGPoints.length > 0 && AVGRebounds.length > 0 && AVGAssists.length > 0 && AVGSteals.length > 0 && AVGBlocks.length > 0 &&
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
                                    setShowPoints(true)
                                    setShowAssists(false)
                                    setShowRebounds(false)
                                    setShowSteals(false)
                                    setShowBlocks(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Points
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowPoints(false)
                                    setShowAssists(true)
                                    setShowRebounds(false)
                                    setShowSteals(false)
                                    setShowBlocks(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Assists
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowPoints(false)
                                    setShowAssists(false)
                                    setShowRebounds(true)
                                    setShowSteals(false)
                                    setShowBlocks(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Rebounds
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowPoints(false)
                                    setShowAssists(false)
                                    setShowRebounds(false)
                                    setShowSteals(true)
                                    setShowBlocks(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Steals
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowPoints(false)
                                    setShowAssists(false)
                                    setShowRebounds(false)
                                    setShowSteals(false)
                                    setShowBlocks(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Blocks
                                </Text>
                            </Button>
                        </Grid>
                    </Grid.Container>

                </>
            }

            {showPoints && !showAssists && !showRebounds && !showSteals && !showBlocks && !Fetching &&
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>

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
                                    setShowTotalPoints(true)
                                    setShowAVGPoints(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Total
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowTotalPoints(false)
                                    setShowAVGPoints(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Average
                                </Text>
                            </Button>
                        </Grid>

                    </Grid.Container>

                    {showTotalPoints && !showAVGPoints &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Points</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {TotalPoints.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                    {!showTotalPoints && showAVGPoints &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Avg Points</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {AVGPoints.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2].toFixed(1)}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                </Grid.Container>
            }

            {!showPoints && showAssists && !showRebounds && !showSteals && !showBlocks && !Fetching &&

                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>

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
                                    setShowTotalAssists(true)
                                    setShowAVGAssists(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Total
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowTotalAssists(false)
                                    setShowAVGAssists(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Average
                                </Text>
                            </Button>
                        </Grid>

                    </Grid.Container>

                    {showTotalAssists && !showAVGAssists &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Assists</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {TotalAssists.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                    {!showTotalAssists && showAVGAssists &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Avg Assists</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {AVGAssists.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2].toFixed(1)}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                </Grid.Container>
            }

            {!showPoints && !showAssists && showRebounds && !showSteals && !showBlocks && !Fetching &&
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>

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
                                    setShowTotalRebounds(true)
                                    setShowAVGRebounds(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Total
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowTotalRebounds(false)
                                    setShowAVGRebounds(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Average
                                </Text>
                            </Button>
                        </Grid>

                    </Grid.Container>

                    {showTotalRebounds && !showAVGRebounds &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Rebounds</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {TotalRebounds.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[1].toFixed(2)}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                    {!showTotalRebounds && showAVGRebounds &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Avg Rebounds</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {AVGRebounds.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2].toFixed(1)}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                </Grid.Container>
            }

            {!showPoints && !showAssists && !showRebounds && showSteals && !showBlocks && !Fetching &&
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>

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
                                    setShowTotalSteals(true)
                                    setShowAVGSteals(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Total
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowTotalSteals(false)
                                    setShowAVGSteals(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Average
                                </Text>
                            </Button>
                        </Grid>

                    </Grid.Container>

                    {showTotalSteals && !showAVGSteals &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Steals</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {TotalSteals.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                    {!showTotalSteals && showAVGSteals &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Avg Steals</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {AVGSteals.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2].toFixed(1)}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                </Grid.Container>
            }

            {!showPoints && !showAssists && !showRebounds && !showSteals && showBlocks && !Fetching &&
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>

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
                                    setShowTotalBlocks(true)
                                    setShowAVGBlocks(false)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Total
                                </Text>
                            </Button>
                        </Grid>

                        <Grid
                            css={{
                                padding: '10px'
                            }}>
                            <Button className="games-btn" auto shadow rounded
                                onClick={() => {
                                    setShowTotalBlocks(false)
                                    setShowAVGBlocks(true)
                                }}>
                                <Text className="games-btn-text"
                                    css={{
                                        fontSize: '$md',
                                        fontWeight: '$semibold',
                                    }}>
                                    Average
                                </Text>
                            </Button>
                        </Grid>

                    </Grid.Container>

                    {showTotalBlocks && !showAVGBlocks &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Blocks</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {TotalBlocks.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                    {!showTotalBlocks && showAVGBlocks &&
                        <>
                            <Table bordered={true}
                                aria-label="Players Leaderboard"
                                lined
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Blocks</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {AVGBlocks.map((player, index) => {
                                        if (index < 10) {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{index + 1}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[0]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2].toFixed(1)}</Table.Cell>
                                                </Table.Row>

                                            )
                                        }
                                    })}
                                </Table.Body>
                            </Table>
                        </>
                    }

                </Grid.Container>
            }
        </>
    )
}