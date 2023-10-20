import React from "react";
import { Grid, Text, Col, Table, Image } from "@nextui-org/react";
import Auction from '../../assets/images/auction.png'

export default function AuctionRules() {
    return(
        <Grid.Container 
        css={{
            jc: 'center',
            textAlign: 'center'
        }}>
            <Grid>
                <Grid.Container 
                css={{
                    jc: 'center',
                    textAlign: 'center',
                    margin: '30px 0px 30px 0px',
                    backgroundColor: '#faf7ea',
                    borderRadius: '20px'
                }}>
                    <Col 
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        jc: 'center',
                    }}>
                        <Image
                        css={{
                            '@xsMin':{
                                width: '200px',
                                height: '200px',
                                borderRadius: '40px',
                                marginTop: '40px'
                            },
                            '@xsMax':{
                                width: '100px',
                                height: '100px',
                                borderRadius: '20px',
                                marginTop: '40px'
                            },
                            objectFit: 'cover'
                        }} src={Auction} />

                        <Text hideIn={'xs'}
                        css={{
                            fontSize: '$4xl',
                            fontWeight: '$semibold',
                            paddingTop: '20px',
                            paddingBottom: '20px'
                        }}>
                            Auction Rules
                        </Text>

                        <Text showIn={'xs'}
                        css={{
                            fontSize: '$2xl',
                            fontWeight: '$semibold',
                            paddingTop: '20px',
                            paddingBottom: '20px'
                        }}>
                            Auction Rules
                        </Text>

                        <Col
                        css={{
                            maxWidth: '1000px',
                            display: 'flex',
                            flexDirection: 'column',
                            jc: 'center',
                            textAlign:'left'
                        }}>
                            
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                1. The auction will be conducted on the 20th of October in the Sports Block MPH at 6:30 PM.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                2. All team owners must be dressed in formal attire, and only owners will be allowed to sit at the team table during the auction.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                3. The auction for the cis-men players will only start after the auction for the non-cis-men players has been fully concluded.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                4. Each team must decide on one person to wield the placard, and the auctioneer(s) will recognize that individual alone as the team's representative. For any change in the placard holder, the auctioneer must be notified with clear notice and communication.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                5. You must raise the placard high enough for the auctioneer’s benefit, and your bid will be recognized once the auctioneer has called out your team name along with the quoted price.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                6. All players will be divided into 5 tiers with the following base prices:
                            </Text>
                                <Table 
                                aria-label="Example table with static content"
                                css={{
                                height: "auto",
                                }}
                                >
                                    <Table.Header>
                                        <Table.Column>Tier</Table.Column>
                                        <Table.Column>Base Price</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row key='1'>
                                            <Table.Cell>1</Table.Cell>
                                            <Table.Cell>10M</Table.Cell>
                                        </Table.Row>
                                        <Table.Row key='2'>
                                            <Table.Cell>2</Table.Cell>
                                            <Table.Cell>7M</Table.Cell>
                                        </Table.Row>
                                        <Table.Row key='3'>
                                            <Table.Cell>3</Table.Cell>
                                            <Table.Cell>4M</Table.Cell>
                                        </Table.Row>
                                        <Table.Row key='4'>
                                            <Table.Cell>Wildcard</Table.Cell>
                                            <Table.Cell>1M</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                7. If a player goes unsold, they would be put into the auction again towards the end, for the minimum base price of 1 million, irrespective of the tier.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                8. <b>Right To Match</b>: The top 3 teams from last year’s tournament (<b>Escobar, HypeFly and Mylapore Machas</b>) have the option of matching the winning bid for a player who played for their team in ABA 6.0. Thereon, if matched, this player will once again return to their old team. The option to match will be presented to the respective team once the winning bid is recorded. Please wait to exercise the RTM till the auctioneer asks you. <b>Each of these can exercise their right to match on any <u>one</u> player</b>. 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                9. In case a team overbids i.e. bids in excess of the remaining funds, or bids in a way that makes team completion within budget impossible, this team will be docked 4 points from their starting tally at the tournament. <b>This will virtually rule your team out of contention for the knockout stages</b>, so suit yourselves. The maximum bid value for any player at the auction is 115 Million to allow for at least 5 players at a price of 1 million to fill up the team.
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                10. Once the hammer hits the podium, and the player is sold, the auctioneer will not entertain any further bids. 
                            </Text>
                            <Text
                            css={{
                                fontSize: '$xl',
                                padding: '10px'
                            }}>
                                11. The word of the auctioneer is final, and all disputes would be solved by the committee in consultation with the auctioneer.
                            </Text>
                        </Col>
                    </Col>
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}