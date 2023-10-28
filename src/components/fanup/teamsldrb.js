import { Avatar, Grid, Table, Row, Text, Image, Col, Loading, useAsyncList, useCollator } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function TeamsLeaderboard() {

    const [LoginLoader, setLoginLoader] = useState(true)

    const [TeamsData, setTeamsData] = useState()

    const getAllTeams = async () => {

        // await fetch(`http://localhost:3001/fantasy/getAllTeams`)
        await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllTeams`)
            .then(response => response.json())
            .then((teamsData) => {
                setTeamsData(teamsData)
                setLoginLoader(false)
            })
    }

    useEffect(() => {
        setLoginLoader(true)
        getAllTeams()
    }, [])

    return (
        <>
            {LoginLoader && //Show loader when LoginLoader===true - for the lag between loggin in and shoing welcome message
                <Grid.Container
                    css={{
                        jc: 'center',
                        alignItems: 'center',
                    }}>
                    <Grid css={{
                        margin: '20vh 0px 40vh 0px'
                    }}>
                        <Loading
                            size="md"
                            color='warning'
                        />
                    </Grid>
                </Grid.Container>
            }

            {!LoginLoader &&

                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>
                    {TeamsData &&
                        <Table bordered={false}
                            lined
                            striped
                            color={'warning'}
                            aria-label="Teams Leaderboard"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                        >
                            <Table.Header>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Rank</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start', paddingLeft: '8px' }}>Team</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }} >Points</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start', paddingLeft: '34px' }}>Player 1</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start', paddingLeft: '34px' }}>Player 2</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start', paddingLeft: '34px' }}>Player 3</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start', paddingLeft: '34px' }}>Player 4</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'start', paddingLeft: '34px' }}>Player 5</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Total</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {TeamsData.map((team, index) => {
                                    return (
                                        <Table.Row>

                                            <Table.Cell css={{ textAlign: 'center' }}> {index+1} </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'start' }}>
                                                <Row css={{
                                                    alignItems: 'center'
                                                }}>
                                                    <Avatar size={'md'} src={team[0]} />
                                                    <Text css={{
                                                        paddingLeft: '8px',
                                                        fontWeight: '$medium'
                                                    }}>
                                                        {team[1]}'s Team
                                                    </Text>
                                                </Row>
                                            </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'center' }}> {team[23]} </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'start' }}>
                                                <Row css={{
                                                    alignItems: 'center',
                                                    padding: '0px 8px'
                                                }}>
                                                    <Image height={'100px'} width={'150px'} src={team[3]} />
                                                    <Col>
                                                        <Text>
                                                            {team[4]}
                                                        </Text>

                                                        <Text>
                                                            {team[5]}
                                                        </Text>

                                                        <Text>
                                                            ${team[6]} M
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'start' }}>
                                                <Row css={{
                                                    alignItems: 'center',
                                                    padding: '0px 8px'
                                                }}>
                                                    <Image height={'100px'} width={'150px'} src={team[7]} />
                                                    <Col>
                                                        <Text>
                                                            {team[8]}
                                                        </Text>

                                                        <Text>
                                                            {team[9]}
                                                        </Text>

                                                        <Text>
                                                            ${team[10]} M
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'start' }}>
                                                <Row css={{
                                                    alignItems: 'center',
                                                    padding: '0px 8px'
                                                }}>
                                                    <Image height={'100px'} width={'150px'} src={team[11]} />
                                                    <Col>
                                                        <Text>
                                                            {team[12]}
                                                        </Text>

                                                        <Text>
                                                            {team[13]}
                                                        </Text>

                                                        <Text>
                                                            ${team[14]} M
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'start' }}>
                                                <Row css={{
                                                    alignItems: 'center',
                                                    padding: '0px 8px'
                                                }}>
                                                    <Image height={'100px'} width={'150px'} src={team[15]} />
                                                    <Col>
                                                        <Text>
                                                            {team[16]}
                                                        </Text>

                                                        <Text>
                                                            {team[17]}
                                                        </Text>

                                                        <Text>
                                                            ${team[18]} M
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'start' }}>
                                                <Row css={{
                                                    alignItems: 'center',
                                                    padding: '0px 8px'
                                                }}>
                                                    <Image height={'100px'} width={'150px'} src={team[19]} />
                                                    <Col>
                                                        <Text>
                                                            {team[20]}
                                                        </Text>

                                                        <Text>
                                                            {team[21]}
                                                        </Text>

                                                        <Text>
                                                            ${team[22]} M
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Table.Cell>

                                            <Table.Cell css={{ textAlign: 'center' }}> ${parseInt(team[6]) + parseInt(team[10]) + parseInt(team[14]) + parseInt(team[18]) + parseInt(team[22])} M </Table.Cell>
                                        </Table.Row>

                                    )
                                }
                                )}
                            </Table.Body>
                        </Table>
                    }
                </Grid.Container>

            }
        </>
    )
}