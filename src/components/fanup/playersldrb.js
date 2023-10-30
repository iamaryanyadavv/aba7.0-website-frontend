import React, { useEffect, useState } from "react";
import { Avatar, Grid, Table, Row, Text, Image, Col, Loading, Collapse } from "@nextui-org/react";

export default function PlayersLeaderboard() {

    const [LoginLoader, setLoginLoader] = useState(true)

    const [PlayersData, setPlayersData] = useState()

    const getAllPlayers = async () => {

        // await fetch(`http://localhost:3001/fantasy/getAllPlayers`)
        await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllPlayers`)
            .then(response => response.json())
            .then((playersdata) => {
                getAllStats(playersdata)
            })
    }

    const getAllStats = async (playersdata) => {
        // await fetch(`http://localhost:3001/aba7stats`)
        await fetch(`https://aba-backend-gr9t.onrender.com/aba7stats`)
            .then(response => response.json())
            .then((statsdata) => {
                statsdata.map((statArray) => {
                    if (playersdata[statArray[0]]) {
                        playersdata[statArray[0]][10].push(statArray)
                    }
                })
                var finalPlayersData = []
                for (const key in playersdata) {
                    finalPlayersData.push(playersdata[key])
                }
                // console.log(finalPlayersData)
                // setPlayersData(finalPlayersData)
                preparePlayerTierData(finalPlayersData)
                setLoginLoader(false)
            })
    }

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

    const preparePlayerTierData = (finalPlayersData) => {

        for (let i = 0; i < finalPlayersData.length; i++) {
            let sum =0;
            let count = 0;
            finalPlayersData[i][10].map((match) => {
                sum+=parseInt(match[9])
                count++
            })
            finalPlayersData[i][7] = parseFloat((sum / count).toFixed(1));
        }
        for (let i = 0; i < finalPlayersData.length; i++) {
          const sortedArray1 = finalPlayersData.slice().sort((a, b) => b[2] - a[2]);
          const rank1 = sortedArray1.findIndex((player) => player === finalPlayersData[i]) + 1;
          finalPlayersData[i].push(rank1+getRankSubscript(rank1));
      
          const sortedArray2 = finalPlayersData.slice().sort((a, b) => b[3] - a[3]);
          const rank2 = sortedArray2.findIndex((player) => player === finalPlayersData[i]) + 1;
          finalPlayersData[i].push(rank2+getRankSubscript(rank2));
      
          const sortedArray3 = finalPlayersData.slice().sort((a, b) => b[4] - a[4]);
          const rank3 = sortedArray3.findIndex((player) => player === finalPlayersData[i]) + 1;
          finalPlayersData[i].push(rank3+getRankSubscript(rank3));
      
          const sortedArray4 = finalPlayersData.slice().sort((a, b) => b[5] - a[5]);
          const rank4 = sortedArray4.findIndex((player) => player === finalPlayersData[i]) + 1;
          finalPlayersData[i].push(rank4+getRankSubscript(rank4));
      
          const sortedArray5 = finalPlayersData.slice().sort((a, b) => b[6] - a[6]);
          const rank5 = sortedArray5.findIndex((player) => player === finalPlayersData[i]) + 1;
          finalPlayersData[i].push(rank5+getRankSubscript(rank5));
      
          const sortedArray6 = finalPlayersData.slice().sort((a, b) => b[7] - a[7]);
          const rank6 = sortedArray6.findIndex((player) => player === finalPlayersData[i]) + 1;
          finalPlayersData[i].push(rank6+getRankSubscript(rank6));
        }
      
        finalPlayersData.sort((a, b) => b[8] - a[8]);
        console.log(finalPlayersData);
        setPlayersData(finalPlayersData);
      }
      

    useEffect(() => {
        setLoginLoader(true)
        getAllPlayers()
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

            {!LoginLoader && PlayersData &&
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>
                    {PlayersData.map((player, index) => {
                        if (index < 50) {
                            return (
                                <Col css={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    jc: 'center',
                                    width: 'max-content',
                                    margin: '0px 36px'
                                }}>

                                    <Text css={{
                                        fontWeight: '$semibold',
                                        padding: '16px 0px 4px 8px',
                                        '@xsMin': {
                                            fontSize: '$xl'
                                        },
                                        '@xsMax': {
                                            fontSize: '$lg'
                                        }
                                    }}>
                                        Rank: {index + 1}
                                    </Text>

                                    <Collapse
                                        css={{
                                            backgroundColor: 'White',
                                            jc: 'center',
                                            alignItems: 'center',
                                            '@xsMax': {
                                                width: '330px'
                                            },
                                            '@xsMin': {
                                                width: '600px',
                                            }
                                        }}
                                        contentLeft={
                                            <Avatar bordered size={'xl'} src={player[0]} />
                                        }
                                        key={index}
                                        borderWeight={'null'}
                                        shadow
                                        title={player[1] + ': ' + player[8]}
                                        subtitle='Expand for statistics'>

                                        <Grid.Container css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}>
                                            <Col>
                                                <Text hideIn={'xs'}
                                                    css={{
                                                        fontSize: '$xl',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    Fantasy Points: {player[8]}
                                                </Text>
                                                <Text showIn={'xs'}
                                                    css={{
                                                        fontSize: '$lg',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    Fantasy Points: {player[8]}
                                                </Text>

                                                <Text hideIn={'xs'}
                                                    css={{
                                                        fontSize: '$xl',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    Fantasy Price: ${player[9]} M
                                                </Text>
                                                <Text showIn={'xs'}
                                                    css={{
                                                        fontSize: '$lg',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    Fantasy Price: ${player[9]} M
                                                </Text>

                                                <Text hideIn={'xs'}
                                                    css={{
                                                        fontSize: '$xl',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    {player[1]}'s fantasy value is {(player[8] / player[9]).toFixed(2)}!
                                                </Text>
                                                <Text showIn={'xs'}
                                                    css={{
                                                        fontSize: '$lg',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    {player[1]}'s fantasy value is {(player[8] / player[9]).toFixed(2)}!
                                                </Text>
                                            </Col>

                                            <Table bordered={true}
                                                aria-label="Players Leaderboard"
                                                lined
                                                css={{
                                                    height: "auto",
                                                    minWidth: "100%",
                                                }}>
                                                <Table.Header>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'start' }}>Against</Table.Column>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Points</Table.Column>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Rebounds</Table.Column>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Assists</Table.Column>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Steals</Table.Column>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Blocks</Table.Column>
                                                    <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Fouls</Table.Column>
                                                    {/* <Table.Column css={{paddingRight: '8px',textAlign: 'center'}}>Fantasy Points</Table.Column> */}
                                                </Table.Header>
                                                <Table.Body>
                                                    {player[10].map((row) => {
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell css={{ textAlign: 'start' }}>
                                                                    {row[0] !== 'Average' && row[0] !== 'Rank' ? (
                                                                        <Text >
                                                                            vs {row[2]}
                                                                        </Text>
                                                                    ) : (
                                                                        <Text css={{
                                                                            borderStyle: 'solid',
                                                                            borderWidth: '2px 0px 0px 0px',
                                                                            borderColor: '#faf7ea'
                                                                        }}>
                                                                            {row[2]}
                                                                        </Text>
                                                                    )}
                                                                </Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{row[4]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{row[5]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{row[6]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{row[7]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{row[8]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{row[9]}</Table.Cell>
                                                                {/* {row[0] == 'Average' ?
                                                            <Table.Cell css={{ textAlign: 'center' }}>{row[8]} (Total) </Table.Cell>
                                                            :
                                                            <Table.Cell css={{ textAlign: 'center' }}>{row[8]}</Table.Cell>
                                                            } */}
                                                            </Table.Row>
                                                        )
                                                    })}
                                                        <Table.Row>
                                                                    <Table.Cell css={{ textAlign: 'start' }}>
                                                                        <Text >
                                                                        <b>Average</b>
                                                                        </Text>
                                                                    </Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[4]}</Table.Cell>      
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[6]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[7]}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell css={{ textAlign: 'start' }}>
                                                                        <Text >
                                                                            
                                                                            <i>Rank</i>
                                                                        </Text>
                                                                    </Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[11]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[12]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[13]}</Table.Cell>      
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[14]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[15]}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{player[16]}</Table.Cell>
                                                                </Table.Row>

                                                </Table.Body>
                                            </Table>


                                        </Grid.Container>

                                    </Collapse>
                                </Col>
                            )
                        }
                    })}

                </Grid.Container>
            }
        </>
    )
}