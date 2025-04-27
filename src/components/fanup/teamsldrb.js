import { Avatar, Grid, Table, Row, Text, Image, Col, Loading, Collapse, Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import './fanup.css';

// Medal colors for top teams with enhanced distinctiveness
const RANK_COLORS = {
    0: '#4CAF50', // Special admin color (green)
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32', // Bronze
};

// Background gradients for top teams
const TEAM_GRADIENTS = {
    0: 'linear-gradient(135deg, #fff, #ebffeb 80%, #d4ffd4)',
    1: 'linear-gradient(135deg, #fff, #fffdf0 70%, #fff8d6)',
    2: 'linear-gradient(135deg, #fff, #f9f9f9 70%, #f0f0f0)',
    3: 'linear-gradient(135deg, #fff, #faf5f2 70%, #f5e9e0)',
};

// Border colors for emphasizing top teams
const TEAM_BORDERS = {
    0: '1px solid #4CAF50',
    1: '1px solid #FFD700',
    2: '1px solid #C0C0C0',
    3: '1px solid #CD7F32',
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
            
            // Sort teams by fantasy points (keeping admin message at index 0)
            const adminTeam = validTeams[0];
            const sortedTeams = validTeams.slice(1).sort((a, b) => {
                const scoreA = a[23] ? parseFloat(a[23]) : 0;
                const scoreB = b[23] ? parseFloat(b[23]) : 0;
                return scoreB - scoreA; // Sort in descending order
            });
            
            // Reinsert admin message at the beginning
            sortedTeams.unshift(adminTeam);
            
            setTeamsData(sortedTeams);
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

    // Render rank badge with enhanced styling
    const renderRankBadge = (rank) => {
        const isTopFour = rank <= 3;
        
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: RANK_COLORS[rank] || '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: rank === 0 ? '#fff' : (isTopFour ? '#333' : '#666'),
                boxShadow: isTopFour ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
                border: isTopFour ? '2px solid white' : 'none'
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
                                    const isTopFour = index <= 3;
                                    
                                    return (
                                        <Grid xs={12} key={index} css={{ 
                                            marginBottom: '16px',
                                        }}>
                                            <Collapse 
                                                css={{
                                                    width: '100%',
                                                    background: TEAM_GRADIENTS[index] || '#fff',
                                                    boxShadow: isTopFour ? '0 3px 12px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.1)',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    border: TEAM_BORDERS[index] || 'none',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        transform: isTopFour ? 'translateY(-3px)' : 'translateY(-2px)',
                                                        boxShadow: isTopFour ? '0 6px 18px rgba(0,0,0,0.2)' : '0 5px 15px rgba(0,0,0,0.15)'
                                                    }
                                                }}
                                                contentLeft={
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                        {renderRankBadge(index)}
                                                        <Avatar 
                                                            bordered 
                                                            size={'md'} 
                                                            src={DEFAULT_USER_AVATAR}
                                                            color={RANK_COLORS[index] ? "warning" : "default"}
                                                            borderWeight={isTopFour ? "bold" : "normal"}
                                                        />
                                                    </div>
                                                }
                                                borderWeight={isTopFour ? 'bold' : 'light'}
                                                shadow
                                                title={
                                                    <Text 
                                                        b 
                                                        size={isMobileView ? (isTopFour ? "1.1rem" : "1rem") : (isTopFour ? "1.3rem" : "1.2rem")} 
                                                        css={{ 
                                                            color: index === 0 ? '#4CAF50' : 
                                                                   index === 1 ? '#9e7c0c' : 
                                                                   index === 2 ? '#555555' : 
                                                                   index === 3 ? '#8a5a2b' : '',
                                                            textShadow: isTopFour ? '0 1px 1px rgba(0,0,0,0.05)' : 'none'
                                                        }}
                                                    >
                                                        {teamName}
                                                        {isTopFour && index !== 0 && (
                                                            <span style={{ 
                                                                marginLeft: '8px',
                                                                fontSize: '0.8em',
                                                                color: RANK_COLORS[index]
                                                            }}>
                                                                {index === 1 ? '🏆' : index === 2 ? '🥈' : '🥉'}
                                                            </span>
                                                        )}
                                                    </Text>
                                                }
                                                subtitle={
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        gap: '16px', 
                                                        alignItems: 'center', 
                                                        marginTop: '4px' 
                                                    }}>
                                                        <Text css={{ 
                                                            color: '#ff9f56', 
                                                            fontWeight: 'bold',
                                                            fontSize: isTopFour ? '1.1em' : '1em'
                                                        }}>
                                                            {teamScore} pts
                                                        </Text>
                                                        {index !== 0 && (
                                                            <Text css={{ 
                                                                color: '#666',
                                                                fontWeight: isTopFour ? 'bold' : 'normal'
                                                            }}>
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
                                                        background: isTopFour ? 'rgba(255,255,255,0.7)' : 'transparent',
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