import { Avatar, Grid, Table, Row, Text, Image, Col, Loading, Collapse } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Blank from '../../assets/images/blankplayer.jpg'
import './fanup.css'

const DEFAULT_USER_AVATAR = "https://media.istockphoto.com/id/588258370/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=Q81czqi4H-NRDFVBetE0aPs6WLg3El13oM9LdBnHV8o="; // Default user avatar
const DEFAULT_MALE_AVATAR = "https://media.istockphoto.com/id/588258370/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=Q81czqi4H-NRDFVBetE0aPs6WLg3El13oM9LdBnHV8o=";
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

        // await fetch(`http://localhost:3001/fantasy/getAllPlayers`)
        await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllPlayers`)
            .then(response => response.json())
            .then((playersData) => {
                teamsData.map((team) => {
                    var row1 = [
                        playersData[team[4]][1],
                        playersData[team[4]][2],
                        playersData[team[4]][3],
                        playersData[team[4]][4],
                        playersData[team[4]][5],
                        playersData[team[4]][6],
                        playersData[team[4]][7],
                        playersData[team[4]][8],
                        playersData[team[4]][9],
                    ]
                    var row2 = [
                        playersData[team[8]][1],
                        playersData[team[8]][2],
                        playersData[team[8]][3],
                        playersData[team[8]][4],
                        playersData[team[8]][5],
                        playersData[team[8]][6],
                        playersData[team[8]][7],
                        playersData[team[8]][8],
                        playersData[team[8]][9],
                    ]
                    var row3 = [
                        playersData[team[12]][1],
                        playersData[team[12]][2],
                        playersData[team[12]][3],
                        playersData[team[12]][4],
                        playersData[team[12]][5],
                        playersData[team[12]][6],
                        playersData[team[12]][7],
                        playersData[team[12]][8],
                        playersData[team[12]][9],
                    ]
                    var row4 = [
                        playersData[team[16]][1],
                        playersData[team[16]][2],
                        playersData[team[16]][3],
                        playersData[team[16]][4],
                        playersData[team[16]][5],
                        playersData[team[16]][6],
                        playersData[team[16]][7],
                        playersData[team[16]][8],
                        playersData[team[16]][9],
                    ]
                    var row5 = [
                        playersData[team[20]][1],
                        playersData[team[20]][2],
                        playersData[team[20]][3],
                        playersData[team[20]][4],
                        playersData[team[20]][5],
                        playersData[team[20]][6],
                        playersData[team[20]][7],
                        playersData[team[20]][8],
                        playersData[team[20]][9],
                    ]
                    team.push(row1)
                    team.push(row2)
                    team.push(row3)
                    team.push(row4)
                    team.push(row5)
                })
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

            {!LoginLoader && TeamsData &&

                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>
                    {TeamsData.map((team, index) => {
                        if(index<50){
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
                                                width: '700px',
                                            }
                                        }}
                                        contentLeft={
                                            <Avatar bordered size={'xl'} src={DEFAULT_USER_AVATAR} />
                                        }
                                        key={index}
                                        borderWeight={'null'}
                                        shadow
                                        title={team[1].split('-')[0].trim() + ' - ' + team[23]}
                                        subtitle='Expand for team'>
    
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
                                                    Worth: ${parseInt(team[6]) + parseInt(team[10]) + parseInt(team[14]) + parseInt(team[18]) + parseInt(team[22])} M
                                                </Text>
                                                <Text showIn={'xs'}
                                                    css={{
                                                        fontSize: '$lg',
                                                        fontWeight: '$medium'
                                                    }}>
                                                    Worth: ${parseInt(team[6]) + parseInt(team[10]) + parseInt(team[14]) + parseInt(team[18]) + parseInt(team[22])} M
                                                </Text>
    
                                            </Col>
    
                                            <Table bordered={true}
                                                aria-label="Fantasy teams' players stats"
                                                css={{
                                                    height: "auto",
                                                    minWidth: "100%",
                                                }}>
                                                <Table.Header>
                                                    <  Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Player</Table.Column>
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
    
                                                    <Table.Row>
                                                        <Table.Cell css={{ textAlign: 'center' }}>
                                                            <Avatar src={getPlayerAvatar(team[24][9])} size="sm" />
                                                            {team[24][0]}
                                                        </Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][7]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][8]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][1]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][2]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][3]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][4]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][5]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[24][6]}</Table.Cell>
                                                    </Table.Row>
    
                                                    <Table.Row>
                                                        <Table.Cell css={{ textAlign: 'center' }}>
                                                            <Avatar src={getPlayerAvatar(team[25][9])} size="sm" />
                                                            {team[25][0]}
                                                        </Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][7]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][8]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][1]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][2]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][3]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][4]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][5]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[25][6]}</Table.Cell>
                                                    </Table.Row>
    
                                                    <Table.Row>
                                                        <Table.Cell css={{ textAlign: 'center' }}>
                                                            <Avatar src={getPlayerAvatar(team[26][9])} size="sm" />
                                                            {team[26][0]}
                                                        </Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][7]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][8]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][1]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][2]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][3]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][4]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][5]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[26][6]}</Table.Cell>
                                                    </Table.Row>
    
                                                    <Table.Row>
                                                        <Table.Cell css={{ textAlign: 'center' }}>
                                                            <Avatar src={getPlayerAvatar(team[27][9])} size="sm" />
                                                            {team[27][0]}
                                                        </Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][7]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][8]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][1]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][2]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][3]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][4]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][5]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[27][6]}</Table.Cell>
                                                    </Table.Row>
    
                                                    <Table.Row>
                                                        <Table.Cell css={{ textAlign: 'center' }}>
                                                            <Avatar src={getPlayerAvatar(team[28][9])} size="sm" />
                                                            {team[28][0]}
                                                        </Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][7]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][8]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][1]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][2]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][3]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][4]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][5]}</Table.Cell>
                                                        <Table.Cell css={{ textAlign: 'center' }}>{team[28][6]}</Table.Cell>
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