import { Avatar, Grid, Table, Row, Text, Image, Col, Loading, Collapse } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Blank from '../../assets/images/blankplayer.jpg'
import './fanup.css'

const DEFAULT_USER_AVATAR = "https://us-tuna-sounds-images.voicemod.net/74c1d12f-c974-4d4a-9f14-c9421280c1fd-1661473146032.png"; // Default user avatar
const DEFAULT_MALE_AVATAR = "https://us-tuna-sounds-images.voicemod.net/74c1d12f-c974-4d4a-9f14-c9421280c1fd-1661473146032.png";
const DEFAULT_FEMALE_AVATAR = "https://i.imgur.com/8Km9tLL.png";

export default function TeamsLeaderboard() {

    const [LoginLoader, setLoginLoader] = useState(true)

    const [TeamsData, setTeamsData] = useState()

    const getPlayerAvatar = (gender) => {
        if(!gender) return DEFAULT_MALE_AVATAR; // Return
        return gender.toLowerCase() === 'female' ? DEFAULT_FEMALE_AVATAR : DEFAULT_MALE_AVATAR;
    };

    const getAllTeams = async () => {

        // await fetch(`http://localhost:3001/fantasy/getAllTeams`)
        await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllTeams`)
            .then(response => response.json())
            .then((teamsData) => {
                getAllPlayers(teamsData)
            })
    }

    const getAllPlayers = async (teamsData) => {
        await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllPlayers`)
            .then(response => response.json())
            .then((playersData) => {
                const validTeams = teamsData.filter(team => team && team.length >= 20);
                
                // Add admin message as first team
                const adminMessage = {
                    1: "Zahaan Shapoorjee (i made this in 20 minutes sorry for all the bugs <3)",
                    23: "∞",
                    length: 24
                };
                validTeams.unshift(adminMessage);
                
                validTeams.forEach((team, index) => {
                    if (index === 0) return; // Skip processing the admin message
                    const getPlayerStats = (playerIndex) => {
                        if (!playersData[team[playerIndex]]) {
                            return [null, null, null, null, null, null, null, null, null];
                        }
                        return [
                            playersData[team[playerIndex]][1],
                            playersData[team[playerIndex]][2],
                            playersData[team[playerIndex]][3],
                            playersData[team[playerIndex]][4],
                            playersData[team[playerIndex]][5],
                            playersData[team[playerIndex]][6],
                            playersData[team[playerIndex]][7],
                            playersData[team[playerIndex]][8],
                            playersData[team[playerIndex]][9],
                        ];
                    };

                    team.push(getPlayerStats(4));  // row1
                    team.push(getPlayerStats(8));  // row2
                    team.push(getPlayerStats(12)); // row3
                    team.push(getPlayerStats(16)); // row4
                    team.push(getPlayerStats(20)); // row5
                });
                setTeamsData(validTeams);
                setLoginLoader(false);
            });
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

            {!LoginLoader && TeamsData &&

                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>
                    {TeamsData.map((team, index) => {
                        if(index < 50){
                            const teamName = team[1] ? (typeof team[1] === 'string' ? team[1].split('-')[0].trim() : 'Unknown Team') : team[1];
                            const teamScore = team[23] || 0;
                            
                            return (
                                <Col key={index} css={{
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
                                        Rank: {index}
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
                                                width: '700px',
                                            }
                                        }}
                                        contentLeft={
                                            <Avatar bordered size={'xl'} src={DEFAULT_USER_AVATAR} />
                                        }
                                        key={index}
                                        borderWeight={'null'}
                                        shadow
                                        title={`${teamName} - ${teamScore}pts`}
                                        subtitle='Expand for team'>
        
                                        <Grid.Container css={{
                                            jc: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}>
                                            <Col>
                                                {index !== 0 && ( // Only show worth for non-admin teams
                                                    <>
                                                        <Text hideIn={'xs'}
                                                            css={{
                                                                fontSize: '$xl',
                                                                fontWeight: '$medium'
                                                            }}>
                                                            Worth: ${parseInt(team[6]) + parseInt(team[10]) + parseInt(team[14]) + parseInt(team[18]) + parseInt(team[22])} M
                                                        </Text>
                                                        <Text showIn={'xs'}
                                                            css={{
                                                                fontSize: '$lg',
                                                                fontWeight: '$medium'
                                                            }}>
                                                            Worth: ${parseInt(team[6]) + parseInt(team[10]) + parseInt(team[14]) + parseInt(team[18]) + parseInt(team[22])} M
                                                        </Text>
                                                    </>
                                                )}
                                            </Col>

                                            {index !== 0 && ( // Only show table for non-admin teams
                                                <Table bordered={true}
                                                    aria-label="Fantasy teams' players stats"
                                                    css={{
                                                        height: "auto",
                                                        minWidth: "100%",
                                                    }}>
                                                    <Table.Header>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Fantasy Points</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Fantasy Price</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Points</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Rebounds</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Assists</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Steals</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Blocks</Table.Column>
                                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Fouls</Table.Column>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        {[24, 25, 26, 27, 28].map((rowIndex) => (
                                                            <Table.Row key={rowIndex}>
                                                                <Table.Cell css={{ textAlign: 'center' }}>
                                                                    <Avatar src={team[rowIndex] ? getPlayerAvatar(team[rowIndex][9]) : DEFAULT_MALE_AVATAR} size="sm" />
                                                                    {team[rowIndex] ? team[rowIndex][0] : ''}
                                                                </Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][7] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][8] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][1] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][2] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][3] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][4] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][5] : ''}</Table.Cell>
                                                                <Table.Cell css={{ textAlign: 'center' }}>{team[rowIndex] ? team[rowIndex][6] : ''}</Table.Cell>
                                                            </Table.Row>
                                                        ))}
                                                    </Table.Body>
                                                </Table>
                                            )}
                                        </Grid.Container>
        
                                    </Collapse>
                                </Col>
                            )
                        }
                        return null;
                    })}


                </Grid.Container>

            }
        </>
    )
}