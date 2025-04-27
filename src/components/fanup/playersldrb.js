import { Grid, Table, Row, Text, Col, Loading, Card, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import './fanup.css';

// Medal colors for top players
const RANK_COLORS = {
    1: '#FFD700', // Gold
    2: '#C0C0C0', // Silver
    3: '#CD7F32', // Bronze
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

    // Render player card for mobile view
    const renderPlayerCard = (player, index) => {
        const rank = index + 1;
        const isTopThree = rank <= 3;
        
        return (
            <Card key={player.name} css={{
                width: '100%',
                marginBottom: '16px',
                background: isTopThree ? `linear-gradient(135deg, #faf7ea, #faf7ea 60%, ${RANK_COLORS[rank]}40)` : '#faf7ea',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.15)'
                }
            }}>
                <Card.Body css={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            minWidth: '40px',
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
                            marginRight: '16px',
                            boxShadow: isTopThree ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
                        }}>
                            {rank}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                            <Text b size="1.1rem">{player.name}</Text>
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
                            <Text small css={{ color: '#666', marginBottom: '8px' }}>Fantasy Points </Text>
                            <Text b size="1.1rem" css={{ color: '#ff9f56' }}>{player.fantasyPoints.toFixed(2)}</Text>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                            <Text small css={{ color: '#666', marginBottom: '8px' }}>Price </Text>
                            <Text b size="1.1rem" css={{ color: '#163364' }}>${player.fantasyPrice}</Text>
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
                        backgroundColor: '#f5f2e3',
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

    const renderRankCell = (rank) => {
        const isTopThree = rank <= 3;
        return (
            <Table.Cell css={{ 
                textAlign: 'center',
                '@xsMax': { fontSize: '0.8rem', padding: '8px' }
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isTopThree ? RANK_COLORS[rank] : '#e0e0e0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: isTopThree ? '#333' : '#666',
                    margin: '0 auto'
                }}>
                    {rank}
                </div>
            </Table.Cell>
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
                                        const isTopThree = rank <= 3;
                                        
                                        return (
                                            <Table.Row key={player.name} css={{
                                                background: isTopThree ? `linear-gradient(90deg, #faf7ea, #faf7ea 80%, ${RANK_COLORS[rank]}30)` : '',
                                                transition: 'transform 0.2s ease, background-color 0.2s ease',
                                                height: '56px',
                                                '&:hover': {
                                                    background: isTopThree 
                                                        ? `linear-gradient(90deg, #faf7ea, #faf7ea 70%, ${RANK_COLORS[rank]}40)` 
                                                        : '#fff9e6'
                                                }
                                            }}>
                                                {renderRankCell(rank)}
                                                <Table.Cell css={{ paddingLeft: '16px' }}>
                                                    <Text b css={{ color: isTopThree ? '#163364' : '' }}>
                                                        {player.name}
                                                    </Text>
                                                </Table.Cell>
                                                <Table.Cell css={{ 
                                                    textAlign: 'center',
                                                    fontWeight: '$bold',
                                                    color: '#ff9f56',
                                                }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                                        {player.fantasyPoints.toFixed(2)}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell css={{ textAlign: 'center' }}>
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