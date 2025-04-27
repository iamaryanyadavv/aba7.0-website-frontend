import { Avatar, Grid, Table, Row, Text, Col, Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import './fanup.css'

const DEFAULT_MALE_AVATAR = "https://media.istockphoto.com/id/588258370/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=Q81czqi4H-NRDFVBetE0aPs6WLg3El13oM9LdBnHV8o=";
const DEFAULT_FEMALE_AVATAR = "https://static.vecteezy.com/system/resources/previews/052/259/390/non_2x/portrait-of-a-pink-haired-woman-female-avatars-illustration-in-a-flat-style-vector.jpg";

export default function PlayersLeaderboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [playersData, setPlayersData] = useState([]);

    const getPlayerAvatar = (gender) => {
        if (!gender) return DEFAULT_MALE_AVATAR;
        return gender.toLowerCase() === 'female' ? DEFAULT_FEMALE_AVATAR : DEFAULT_MALE_AVATAR;
    };

    const getAllPlayers = async () => {
        try {
            const response = await fetch('https://aba-backend-gr9t.onrender.com/fantasy/getAllPlayers');
            const data = await response.json();
            
            // Convert object to array and add player names as keys
            const playersArray = Object.entries(data).map(([name, stats]) => ({
                name,
                photo: stats[0],
                gender: stats[9] || 'Male', // Add gender mapping
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
                            marginBottom: '20px',
                            color: '#163364',
                            '@xsMax': {
                                fontSize: '1.5rem'
                            }
                        }}>
                            Top 50 Fantasy Players
                        </Text>
                        <Table 
                            bordered 
                            aria-label="Top 50 Fantasy Players"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                                '@xsMax': {
                                    minWidth: "400px",
                                }
                            }}
                            containerCss={{
                                '@xsMax': {
                                    overflowX: 'auto'
                                }
                            }}
                        >
                            <Table.Header>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { fontSize: '0.8rem' } }}>Rank</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { fontSize: '0.8rem' } }}>Player</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { fontSize: '0.8rem' } }}>Gender</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { fontSize: '0.8rem' } }}>Fantasy Points</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { fontSize: '0.8rem' } }}>Price</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { display: 'none' } }}>Points</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { display: 'none' } }}>Rebounds</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { display: 'none' } }}>Assists</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { display: 'none' } }}>Steals</Table.Column>
                                <Table.Column css={{ textAlign: 'center', '@xsMax': { display: 'none' } }}>Blocks</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {playersData.slice(0, 50).map((player, index) => (
                                    <Table.Row key={player.name}>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { 
                                                fontSize: '0.8rem',
                                                padding: '8px'
                                            }
                                        }}>{index + 1}</Table.Cell>
                                        <Table.Cell>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                gap: '8px',
                                                '@xsMax': {
                                                    flexDirection: 'column',
                                                    gap: '4px'
                                                }
                                            }}>
                                                {/* <Avatar 
                                                    src={getPlayerAvatar(player.gender)} 
                                                    size="sm"
                                                    bordered
                                                    color="warning"
                                                /> */}
                                                <Text css={{
                                                    '@xsMax': { 
                                                        fontSize: '0.8rem',
                                                        textAlign: 'center'
                                                    }
                                                }}>
                                                    {player.name}
                                                </Text>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { fontSize: '0.8rem' }
                                        }}>
                                            {player.gender || 'N/A'}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            fontWeight: '$semibold',
                                            color: '#ff9f56',
                                            '@xsMax': { fontSize: '0.8rem' }
                                        }}>
                                            {player.fantasyPoints.toFixed(2)}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { fontSize: '0.8rem' }
                                        }}>
                                            ${player.fantasyPrice}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { display: 'none' }
                                        }}>
                                            {player.points.toFixed(2)}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { display: 'none' }
                                        }}>
                                            {player.rebounds.toFixed(2)}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { display: 'none' }
                                        }}>
                                            {player.assists.toFixed(2)}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { display: 'none' }
                                        }}>
                                            {player.steals.toFixed(2)}
                                        </Table.Cell>
                                        <Table.Cell css={{ 
                                            textAlign: 'center',
                                            '@xsMax': { display: 'none' }
                                        }}>
                                            {player.blocks.toFixed(2)}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Col>
                </Grid.Container>
            )}
        </>
    );
}