import { Avatar, Grid, Table, Row, Text, Image, Col, Loading, Collapse, Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import './fanup.css';

// Medal colors for top teams
const RANK_COLORS = {
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32', // Bronze
};

const DEFAULT_USER_AVATAR = "https://us-tuna-sounds-images.voicemod.net/74c1d12f-c974-4d4a-9f14-c9421280c1fd-1661473146032.png";

export default function TeamsLeaderboard() {
    const [LoginLoader, setLoginLoader] = useState(true);
    const [TeamsData, setTeamsData] = useState();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 650);

    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 650);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getAllTeams = async () => {
        try {
            const response = await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllTeams`);
            const teamsData = await response.json();
            getAllPlayers(teamsData);
        } catch (error) {
            console.error('Error fetching teams:', error);
            setLoginLoader(false);
        }
    }

    const getAllPlayers = async (teamsData) => {
        try {
            const response = await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getAllPlayers`);
            const playersData = await response.json();
            
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
        } catch (error) {
            console.error('Error fetching players:', error);
            setLoginLoader(false);
        }
    }

    useEffect(() => {
        setLoginLoader(true);
        getAllTeams();
    }, []);

    // Calculate team worth
    const calculateTeamWorth = (team) => {
        if (team && team[6] && team[10] && team[14] && team[18] && team[22]) {
            return parseInt(team[6]) + parseInt(team[10]) + parseInt(team[14]) + parseInt(team[18]) + parseInt(team[22]);
        }
        return 0;
    };

    // Render rank badge
    const renderRankBadge = (rank) => {
        const isTopThree = rank <= 3;
        
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isTopThree ? RANK_COLORS[rank] : '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: isTopThree ? '#333' : '#666',
                boxShadow: isTopThree ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
            }}>
                {rank}
            </div>
        );
    };

    return (
        <>
            {LoginLoader ? (
                <Grid.Container
                    css={{
                        jc: 'center',
                        alignItems: 'center',
                        minHeight: '50vh',
                        backgroundColor: '#faf7ea',
                        borderRadius: '24px 24px 0 0'
                    }}>
                    <Loading size="xl" color='warning'>
                        <Text h4 css={{ textAlign: 'center', color: '#666' }}>
                            Loading Teams...
                        </Text>
                    </Loading>
                </Grid.Container>
            ) : (
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0 0',
                    '@xsMax': {
                        padding: '12px'
                    }
                }}>
                    <Col css={{ 
                        width: '100%', 
                        maxWidth: '1200px', 
                        padding: '20px',
                        '@xsMax': {
                            padding: '10px'
                        }
                    }}>
                        <Text h2 css={{ 
                            textAlign: 'center', 
                            marginBottom: '24px',
                            color: '#163364',
                            '@xsMax': {
                                fontSize: '1.5rem'
                            }
                        }}>
                            Fantasy Teams Leaderboard
                        </Text>
                        
                        <Grid.Container gap={2} justify="center">
                            {TeamsData && TeamsData.map((team, index) => {
                                if (index < 50) {
                                    const teamName = team[1] ? (typeof team[1] === 'string' ? team[1].split('-')[0].trim() : 'Unknown Team') : team[1];
                                    const teamScore = team[23] || 0;
                                    const teamWorth = calculateTeamWorth(team);
                                    const isTopThree = index <= 3;
                                    
                                    return (
                                        <Grid xs={12} key={index} css={{ 
                                            marginBottom: '16px',
                                        }}>
                                            <Collapse 
                                                css={{
                                                    width: '100%',
                                                    background: isTopThree ? `linear-gradient(135deg, #fff, #fff 80%, ${RANK_COLORS[index]}30)` : '#fff',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        boxShadow: '0 5px 15px rgba(0,0,0,0.15)'
                                                    }
                                                }}
                                                contentLeft={
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                        {renderRankBadge(index)}
                                                        <Avatar 
                                                            bordered 
                                                            size={'md'} 
                                                            src={DEFAULT_USER_AVATAR}
                                                            color={isTopThree ? "warning" : "default"}
                                                        />
                                                    </div>
                                                }
                                                borderWeight={'light'}
                                                shadow
                                                title={
                                                    <Text b size={isMobileView ? "1rem" : "1.2rem"} css={{ color: isTopThree ? '#163364' : '' }}>
                                                        {teamName}
                                                    </Text>
                                                }
                                                subtitle={
                                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '4px' }}>
                                                        <Text css={{ color: '#ff9f56', fontWeight: 'bold' }}>
                                                            {teamScore} pts
                                                        </Text>
                                                        {index !== 0 && (
                                                            <Text css={{ color: '#666' }}>
                                                                Worth: ${teamWorth} M
                                                            </Text>
                                                        )}
                                                    </div>
                                                }
                                            >
                                                {index !== 0 && (
                                                    <Grid.Container css={{
                                                        jc: 'center',
                                                        alignItems: 'center',
                                                        padding: '16px 0',
                                                    }}>
                                                        {isMobileView ? (
                                                            // Mobile view - cards for each player
                                                            <Grid.Container gap={1}>
                                                                {[24, 25, 26, 27, 28].map((rowIndex) => (
                                                                    <Grid xs={12} key={rowIndex}>
                                                                        <Card css={{ 
                                                                            width: '100%',
                                                                            background: '#f5f2e3',
                                                                            marginBottom: '8px'
                                                                        }}>
                                                                            <Card.Body css={{ padding: '12px' }}>
                                                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                    <Text b>{team[rowIndex] ? team[rowIndex][0] : 'N/A'}</Text>
                                                                                    <Text css={{ color: '#ff9f56', fontWeight: 'bold' }}>
                                                                                        {team[rowIndex] ? team[rowIndex][7] : '0'} pts
                                                                                    </Text>
                                                                                </div>
                                                                                
                                                                                <div style={{ 
                                                                                    display: 'grid', 
                                                                                    gridTemplateColumns: 'repeat(5, 1fr)',
                                                                                    gap: '8px',
                                                                                    textAlign: 'center',
                                                                                    marginTop: '12px',
                                                                                    padding: '8px 0',
                                                                                    backgroundColor: '#fff',
                                                                                    borderRadius: '6px'
                                                                                }}>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                                        <Text small css={{ color: '#666' }}>PTS</Text>
                                                                                        <Text b>{team[rowIndex] ? team[rowIndex][1] : '0'}</Text>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                                        <Text small css={{ color: '#666' }}>REB</Text>
                                                                                        <Text b>{team[rowIndex] ? team[rowIndex][2] : '0'}</Text>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                                        <Text small css={{ color: '#666' }}>AST</Text>
                                                                                        <Text b>{team[rowIndex] ? team[rowIndex][3] : '0'}</Text>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                                        <Text small css={{ color: '#666' }}>STL</Text>
                                                                                        <Text b>{team[rowIndex] ? team[rowIndex][4] : '0'}</Text>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                                        <Text small css={{ color: '#666' }}>BLK</Text>
                                                                                        <Text b>{team[rowIndex] ? team[rowIndex][5] : '0'}</Text>
                                                                                    </div>
                                                                                </div>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Grid>
                                                                ))}
                                                            </Grid.Container>
                                                        ) : (
                                                            // Desktop view - table
                                                            <Table 
                                                                bordered
                                                                aria-label="Fantasy teams' players stats"
                                                                css={{
                                                                    height: "auto",
                                                                    minWidth: "100%",
                                                                }}
                                                            >
                                                                <Table.Header>
                                                                    <Table.Column css={{ textAlign: 'center', width: '25%' }}>Player</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '12%' }}>Fantasy Points</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '12%' }}>Fantasy Price</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '10%' }}>Points</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '10%' }}>Rebounds</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '10%' }}>Assists</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '10%' }}>Steals</Table.Column>
                                                                    <Table.Column css={{ textAlign: 'center', width: '10%' }}>Blocks</Table.Column>
                                                                </Table.Header>
                                                                <Table.Body>
                                                                    {[24, 25, 26, 27, 28].map((rowIndex) => (
                                                                        <Table.Row key={rowIndex} css={{
                                                                            height: '56px', // Consistent row height
                                                                            transition: 'background-color 0.2s ease',
                                                                            '&:hover': {
                                                                                backgroundColor: '#fff9e6'
                                                                            }
                                                                        }}>
                                                                            <Table.Cell css={{ 
                                                                                textAlign: 'left', 
                                                                                paddingLeft: '16px',
                                                                                fontWeight: 'bold'
                                                                            }}>
                                                                                {team[rowIndex] ? team[rowIndex][0] : 'N/A'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ 
                                                                                textAlign: 'center',
                                                                                fontWeight: '$bold',
                                                                                color: '#ff9f56',
                                                                            }}>
                                                                                {team[rowIndex] ? team[rowIndex][7] : '0'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                                                {team[rowIndex] ? team[rowIndex][8] : '0'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                                                {team[rowIndex] ? team[rowIndex][1] : '0'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                                                {team[rowIndex] ? team[rowIndex][2] : '0'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                                                {team[rowIndex] ? team[rowIndex][3] : '0'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                                                {team[rowIndex] ? team[rowIndex][4] : '0'}
                                                                            </Table.Cell>
                                                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                                                {team[rowIndex] ? team[rowIndex][5] : '0'}
                                                                            </Table.Cell>
                                                                        </Table.Row>
                                                                    ))}
                                                                </Table.Body>
                                                            </Table>
                                                        )}
                                                    </Grid.Container>
                                                )}
                                            </Collapse>
                                        </Grid>
                                    );
                                }
                                return null;
                            })}
                        </Grid.Container>
                    </Col>
                </Grid.Container>
            )}
        </>
    );
}