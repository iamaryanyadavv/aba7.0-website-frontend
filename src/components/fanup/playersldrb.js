import { Grid, Table, Row, Text, Col, Loading, Card, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import './fanup.css';

// Medal colors for top players with enhanced distinctiveness
const RANK_COLORS = {
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32', // Bronze
    4: '#3498db', // Blue
    5: '#9b59b6', // Purple
};

// Background gradients for top players
const PLAYER_GRADIENTS = {
    1: 'linear-gradient(135deg, #fff, #fffdf0 70%, #fff8d6)',
    2: 'linear-gradient(135deg, #fff, #f9f9f9 70%, #f0f0f0)',
    3: 'linear-gradient(135deg, #fff, #faf5f2 70%, #f5e9e0)',
    4: 'linear-gradient(135deg, #fff, #f5f9ff 70%, #e6f0ff)',
    5: 'linear-gradient(135deg, #fff, #f9f5ff 70%, #f0e6ff)',
};

// Border colors for emphasizing top players
const PLAYER_BORDERS = {
    1: '1px solid #FFD700',
    2: '1px solid #C0C0C0',
    3: '1px solid #CD7F32',
    4: '1px solid #3498db',
    5: '1px solid #9b59b6',
};

// Text colors for top players
const PLAYER_TEXT_COLORS = {
    1: '#9e7c0c', // Gold text
    2: '#555555', // Silver text
    3: '#8a5a2b', // Bronze text
    4: '#2980b9', // Blue text
    5: '#8e44ad', // Purple text
};

export default function PlayersLeaderboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [playersData, setPlayersData] = useState([]);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 650);

    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 650);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getAllPlayers = async () => {
        try {
            const response = await fetch('https://aba-backend-gr9t.onrender.com/fantasy/getAllPlayers');
            const data = await response.json();
            
            // Convert object to array and add player names as keys
            const playersArray = Object.entries(data).map(([name, stats]) => ({
                name,
                points: parseFloat(stats[2] || 0),
                rebounds: parseFloat(stats[3] || 0),
                assists: parseFloat(stats[4] || 0),
                steals: parseFloat(stats[5] || 0),
                fouls: parseFloat(stats[6] || 0),
                blocks: parseFloat(stats[7] || 0),
                fantasyPoints: parseFloat(stats[8] || 0),
                fantasyPrice: parseFloat(stats[9] || 0),
            }));

            // Sort by fantasy points in descending order
            playersArray.sort((a, b) => b.fantasyPoints - a.fantasyPoints);
            setPlayersData(playersArray);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching players:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllPlayers();
    }, []);

    // Render enhanced rank badge for top players
    const renderRankBadge = (rank) => {
        const isTopFive = rank <= 5;
        
        return (
            <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: RANK_COLORS[rank] || '#e0e0e0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: isTopFive ? '#333' : '#666',
                margin: '0 auto',
                boxShadow: isTopFive ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
                border: isTopFive ? '2px solid white' : 'none'
            }}>
                {rank}
            </div>
        );
    };

    // Render player card for mobile view with enhanced top player styling
    const renderPlayerCard = (player, index) => {
        const rank = index + 1;
        const isTopFive = rank <= 5;
        const isTopThree = rank <= 3;
        
        return (
            <Card key={player.name} css={{
                width: '100%',
                marginBottom: '16px',
                background: PLAYER_GRADIENTS[rank] || '#faf7ea',
                boxShadow: isTopFive ? '0 3px 12px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: PLAYER_BORDERS[rank] || 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: isTopFive ? 'translateY(-3px)' : 'translateY(-2px)',
                    boxShadow: isTopFive ? '0 6px 18px rgba(0,0,0,0.2)' : '0 5px 15px rgba(0,0,0,0.15)'
                }
            }}>
                <Card.Body css={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: RANK_COLORS[rank] || '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            color: '#333',
                            marginRight: '16px',
                            boxShadow: isTopFive ? '0 2px 5px rgba(0,0,0,0.3)' : 'none',
                            border: isTopFive ? '2px solid white' : 'none'
                        }}>
                            {rank}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                            <Text b size={isTopFive ? "1.2rem" : "1.1rem"} css={{ 
                                color: PLAYER_TEXT_COLORS[rank] || '',
                                textShadow: isTopFive ? '0 1px 1px rgba(0,0,0,0.05)' : 'none'
                            }}>
                                {player.name}
                                {isTopThree && (
                                    <span style={{ 
                                        marginLeft: '8px',
                                        fontSize: '0.8em',
                                        color: RANK_COLORS[rank]
                                    }}>
                                        {rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🥉'}
                                    </span>
                                )}
                            </Text>
                        </div>
                    </div>
                    
                    <div style={{ 
                        display: 'flex', 
                        marginTop: '16px',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #eee',
                        paddingTop: '12px',
                        alignItems: 'center' 
                    }}>
                        <div>
                            <Text small css={{ color: '#666', marginBottom: '8px' }}>Fantasy Points</Text>
                            <Text b size={isTopFive ? "1.2rem" : "1.1rem"} css={{ color: '#ff9f56' }}>{player.fantasyPoints.toFixed(2)}</Text>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                            <Text small css={{ color: '#666', marginBottom: '8px' }}>Price</Text>
                            <Text b size={isTopFive ? "1.2rem" : "1.1rem"} css={{ color: '#163364' }}>${player.fantasyPrice}</Text>
                        </div>
                    </div>
                    
                    {/* Stats section with improved layout and spacing */}
                    <div style={{ 
                        marginTop: '12px', 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '8px',
                        textAlign: 'center',
                        padding: '12px 0',
                        backgroundColor: isTopFive ? 'rgba(255,255,255,0.7)' : '#f5f2e3',
                        borderRadius: '6px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Text small css={{ color: '#666' }}>PTS</Text>
                            <Text b>{player.points.toFixed(1)}</Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Text small css={{ color: '#666' }}>REB</Text>
                            <Text b>{player.rebounds.toFixed(1)}</Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Text small css={{ color: '#666' }}>AST</Text>
                            <Text b>{player.assists.toFixed(1)}</Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Text small css={{ color: '#666' }}>STL</Text>
                            <Text b>{player.steals.toFixed(1)}</Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Text small css={{ color: '#666' }}>BLK</Text>
                            <Text b>{player.blocks.toFixed(1)}</Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    return (
        <>
            {isLoading ? (
                <Grid.Container 
                    css={{ 
                        jc: 'center', 
                        alignItems: 'center',
                        minHeight: '50vh',
                        backgroundColor: '#faf7ea',
                        borderRadius: '24px 24px 0 0'
                    }}
                >
                    <Loading size="xl" color='warning'>
                        <Text h4 css={{ textAlign: 'center', color: '#666' }}>
                            Loading Players...
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
                            Top 50 Fantasy Players
                        </Text>
                        
                        {isMobileView ? (
                            <div style={{ padding: '0 4px' }}>
                                {playersData.slice(0, 50).map((player, index) => 
                                    renderPlayerCard(player, index)
                                )}
                            </div>
                        ) : (
                            <Table 
                                bordered 
                                aria-label="Top 50 Fantasy Players"
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                }}
                                containerCss={{
                                    '@xsMax': {
                                        overflowX: 'auto'
                                    }
                                }}
                            >
                                <Table.Header>
                                    <Table.Column css={{ textAlign: 'center', width: '80px' }}>Rank</Table.Column>
                                    <Table.Column css={{ textAlign: 'left' }}>Player</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '140px' }}>Fantasy Points</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '100px' }}>Price</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '100px' }}>Points</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '100px' }}>Rebounds</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '100px' }}>Assists</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '100px' }}>Steals</Table.Column>
                                    <Table.Column css={{ textAlign: 'center', width: '100px' }}>Blocks</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {playersData.slice(0, 50).map((player, index) => {
                                        const rank = index + 1;
                                        const isTopFive = rank <= 5;
                                        const isTopThree = rank <= 3;
                                        
                                        return (
                                            <Table.Row key={player.name} css={{
                                                background: PLAYER_GRADIENTS[rank] || '',
                                                border: PLAYER_BORDERS[rank] || 'none',
                                                transition: 'transform 0.2s ease, background-color 0.2s ease',
                                                height: '56px',
                                                '&:hover': {
                                                    background: isTopFive 
                                                        ? PLAYER_GRADIENTS[rank]
                                                        : '#fff9e6'
                                                }
                                            }}>
                                                <Table.Cell css={{ 
                                                    textAlign: 'center',
                                                    '@xsMax': { fontSize: '0.8rem', padding: '8px' }
                                                }}>
                                                    {renderRankBadge(rank)}
                                                </Table.Cell>
                                                <Table.Cell css={{ paddingLeft: '16px' }}>
                                                    <Text b css={{ 
                                                        color: PLAYER_TEXT_COLORS[rank] || '',
                                                        fontSize: isTopFive ? '1.05rem' : 'inherit'
                                                    }}>
                                                        {player.name}
                                                        {isTopThree && (
                                                            <span style={{ 
                                                                marginLeft: '8px',
                                                                fontSize: '0.8em',
                                                                color: RANK_COLORS[rank]
                                                            }}>
                                                                {rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🥉'}
                                                            </span>
                                                        )}
                                                    </Text>
                                                </Table.Cell>
                                                <Table.Cell css={{ 
                                                    textAlign: 'center',
                                                    fontWeight: '$bold',
                                                    color: '#ff9f56',
                                                    fontSize: isTopFive ? '1.05rem' : 'inherit'
                                                }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                                        {player.fantasyPoints.toFixed(2)}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell css={{ 
                                                    textAlign: 'center',
                                                    fontWeight: isTopFive ? '$bold' : 'inherit'
                                                }}>
                                                    ${player.fantasyPrice}
                                                </Table.Cell>
                                                <Table.Cell css={{ textAlign: 'center' }}>
                                                    {player.points.toFixed(1)}
                                                </Table.Cell>
                                                <Table.Cell css={{ textAlign: 'center' }}>
                                                    {player.rebounds.toFixed(1)}
                                                </Table.Cell>
                                                <Table.Cell css={{ textAlign: 'center' }}>
                                                    {player.assists.toFixed(1)}
                                                </Table.Cell>
                                                <Table.Cell css={{ textAlign: 'center' }}>
                                                    {player.steals.toFixed(1)}
                                                </Table.Cell>
                                                <Table.Cell css={{ textAlign: 'center' }}>
                                                    {player.blocks.toFixed(1)}
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        )}
                    </Col>
                </Grid.Container>
            )}
        </>
    );
}