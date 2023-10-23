import { Avatar, Col, Collapse, Grid, Loading, Progress, Table, Text, Spacer } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";

export default function Teams() {
    const [Fetching, setFetching] = useState(true);
    const [TeamAccordions, setTeamAccordions] = useState();

    const getTeamBudgetsData = async () => {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7teamlist')
            .then(response => response.json())
            .then((data) => {
                OnceTeamBudgetsData(data);
            })

    }

    const OnceTeamBudgetsData = async (teamslists) => {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7teams')
            .then(response => response.json())
            .then((data) => {
                createTeamAccordions(data, teamslists);
            })
    }

    async function createTeamAccordions(teams, teamslists) {
        if (teams.length > 1) {
            const response = await fetch('https://aba-backend-gr9t.onrender.com/aba7teamlist');
            const teamListsData = await response.json();
            setFetching(false);
            const onlyteams = []
            for (var i = 1; i < teams.length; i++) {
                onlyteams.push(teams[i])
            }
            setTeamAccordions(onlyteams.map((team, index) => (
                <Collapse
                    css={{
                        margin: '20px',
                        backgroundColor: 'White',
                        jc: 'center',
                        alignItems: 'center',
                        '@xsMax': {
                            width: '330px'
                        },
                        '@xsMin': {
                            width: '500px'
                        }
                    }}
                    contentLeft={
                        <Avatar bordered size={'xl'} src={team[0]} />
                    }
                    key={index}
                    borderWeight={'null'}
                    shadow
                    title={team[2]}
                    subtitle='Expand for details'>
                    <Grid.Container css={{
                        jc: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <Col>
                            <Text hideIn={'xs'}
                                css={{
                                    fontSize: '$2xl',
                                    fontWeight: '$medium'
                                }}>
                                Manager: {team[4]}
                            </Text>
                            <Text showIn={'xs'}
                                css={{
                                    fontSize: '$lg',
                                    fontWeight: '$medium'
                                }}>
                                Manager: {team[4]}
                            </Text>

                            {/* <Text hideIn={'xs'}
                            css={{
                                fontSize: '$xl',
                                fontWeight: '$medium',
                                padding: '0% 5% 2.5% 5%',
                            }}>
                                Owners: {team[5]}
                            </Text>
                            <Text showIn={'xs'}
                            css={{
                                fontSize: '$md',
                                fontWeight: '$medium'
                            }}>
                                Owners: {team[5]}
                            </Text> */}
                        </Col>


                    </Grid.Container>
                    {AccordionMaterial(team, teamListsData)}
                </Collapse>
            )))
        }
    }

    function AccordionMaterial(team, teamslists) {
        console.log(teamslists)
        var accMaterial = ''
        for (var i = 0; i < teamslists.length; i++) {
            console.log("im here")
            
            if (teamslists[i].length > 1) {
                
                if (team[2] === teamslists[i][0]) {
                    
                    var budgetBarValue = (parseInt(teamslists[i][26]) / 120) * 100
                    accMaterial =
                        <Grid.Container
                            css={{
                                jc: 'center',
                                alignItems: 'center'
                            }}>
                            {(teamslists[i][30]) &&
                                <Col>
                                    <Text
                                        css={{
                                            fontSize: '$xl',
                                            fontWeight: '$medium',
                                            paddingBottom: '5%'
                                        }}>
                                        Record: {teamslists[i][30]}
                                    </Text>
                                </Col>
                            }
                            {!teamslists[i][30] &&
                                <Col>
                                    <Text
                                        css={{
                                            fontSize: '$xl',
                                            fontWeight: '$medium',
                                            paddingBottom: '5%'
                                        }}>
                                        Record -
                                    </Text>
                                </Col>
                            }
                            <Table bordered
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}>
                                <Table.Header>
                                    <Table.Column>Player</Table.Column>
                                    <Table.Column>Price</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {teamslists[i][1] && teamslists[i][2] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][1]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][2]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][3] && teamslists[i][4] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][3]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][4]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][5] && teamslists[i][6] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][5]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][6]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][7] && teamslists[i][8] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][7]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][8]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][9] && teamslists[i][10] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][9]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][10]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][11] && teamslists[i][12] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][11]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][12]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][13] && teamslists[i][14] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][13]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][14]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][15] && teamslists[i][16] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][15]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][16]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][17] && teamslists[i][18] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][17]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][18]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][19] && teamslists[i][20] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][19]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][20]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][21] && teamslists[i][22] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][21]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][22]}</Table.Cell>
                                        </Table.Row>
                                    }
                                    {teamslists[i][23] && teamslists[i][24] &&
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][23]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'start' }}>{teamslists[i][24]}</Table.Cell>
                                        </Table.Row>
                                    }
                                </Table.Body>
                            </Table>
                            <Col
                                css={{
                                    marginTop: '20px'
                                }}>
                                <Text
                                    css={{
                                        fontSize: '$xl',
                                        fontWeight: '$medium',
                                        margin: '10px'
                                    }}>
                                    {teamslists[i][26]} M Spent (Max. 120)
                                </Text>
                                <Progress size='sm' color='warning' value={budgetBarValue} />
                            </Col>
                        </Grid.Container>

                }
            }
        }
        return (accMaterial)
    }


    useEffect(() => {
        getTeamBudgetsData();
        const interval = setInterval(() => {
            getTeamBudgetsData();
        }, 30000);

        return () => clearInterval(interval);
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
            {!Fetching && TeamAccordions &&
                <Grid.Container
                    css={{
                        jc: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                        padding: '30px 0px 0px 0px',
                        backgroundColor: '#faf7ea',
                        borderRadius: '20px',
                        borderStyle: 'solid',
                        borderWidth: '0px'
                    }}>
                    {TeamAccordions}
                </Grid.Container>
            }
            {!Fetching && !TeamAccordions &&
                <div>
                    <Text hideIn={'xs'}
                        css={{
                            fontSize: '$4xl',
                            fontWeight: '$semibold',
                            padding: '40px 10% 0px 10%',
                            textAlign: 'center',

                        }}>
                        No Teams yet... Check again after team registration starts!
                    </Text>
                    <Text showIn={'xs'}
                        css={{
                            fontSize: '$2xl',
                            fontWeight: '$semibold',
                            padding: '40px 10% 0px 10%',
                            textAlign: 'center',

                        }}>
                        No Teams yet... Check again after team registration starts!
                    </Text>
                    <Spacer y={15} />
                </div>
            }
        </div>
    )

}