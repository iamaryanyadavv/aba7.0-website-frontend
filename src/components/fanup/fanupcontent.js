import { Text, Grid, Col, Modal, Loading, Row, Image, Avatar, Button, Table } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useTicker } from "../../hooks";
import Blank from '../../assets/images/blankplayer.jpg'
import './fanup.css'

export default function FanUpContent() {
    const [LoginLoader, setLoginLoader] = useState(false);
    const [User, setUser] = useState({})
    const [signedin, setSignedin] = useState(false)

    // Fantasy Team ------------------------------------------
    const [Player1, setPlayer1] = useState('')
    const [Player2, setPlayer2] = useState('')
    const [Player3, setPlayer3] = useState('')
    const [Player4, setPlayer4] = useState('')
    const [Player5, setPlayer5] = useState('')

    const [Player1Email, setPlayer1Email] = useState('')
    const [Player2Email, setPlayer2Email] = useState('')
    const [Player3Email, setPlayer3Email] = useState('')
    const [Player4Email, setPlayer4Email] = useState('')
    const [Player5Email, setPlayer5Email] = useState('')

    const [Player1Gender, setPlayer1Gender] = useState('')
    const [Player2Gender, setPlayer2Gender] = useState('')
    const [Player3Gender, setPlayer3Gender] = useState('')
    const [Player4Gender, setPlayer4Gender] = useState('')
    const [Player5Gender, setPlayer5Gender] = useState('')

    const [GridNo, setGridNo] = useState(0)
    const [ShowPlayersModal, setShowPlayersModal] = useState(false)
    const [SavedSuccessfully, setSavedSuccessfully] = useState()
    // -------------------------------------------------------

    // Select Player Modal -------------------------------------
    const [OneReady, setOneReady] = useState(true);
    const [TwoReady, setTwoReady] = useState(false);
    const [ThreeReady, setThreeReady] = useState(false);
    const [FourReady, setFourReady] = useState(false);

    const [Tier1Players, setTier1Players] = useState([])
    const [Tier2Players, setTier2Players] = useState([])
    const [Tier3Players, setTier3Players] = useState([])
    const [Tier4Players, setTier4Players] = useState([])
    // ---------------------------------------------------------

    const getUserTeam = async (user) => {
        getAllPlayers()
        console.log(user)
        setLoginLoader(false)
        await fetch('http://localhost:3001/aba7fantasy')
            .then(response => response.json())
            .then((fantasydata) => {
                console.log(fantasydata)
            })
        // get user's team and set player1-5, player1-5email IDS, and player 1-5 genders
    }

    const getAllPlayers = async () => {
        await fetch('http://localhost:3001/aba7players')
            .then(response => response.json())
            .then((players) => {
                var tier1 = []
                var tier2 = []
                var tier3 = []
                var tier4 = []
                players.values.map((player) => {
                    if (player[5] == '1') {
                        tier1.push(player)
                    }
                    if (player[5] == '2') {
                        tier2.push(player)
                    }
                    if (player[5] == '3') {
                        tier3.push(player)
                    }
                    if (player[5] == '4') {
                        tier4.push(player)
                    }
                })
                setTier1Players(tier1)
                setTier2Players(tier2)
                setTier3Players(tier3)
                setTier4Players(tier4)
            })
    }

    const saveTeam = async (e) => {
        const res = await fetch('https://localhost:3001/aba7fantasy', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                // picture: ,
                // name: ,
                // email: ,
                // player1: ,
                // player1email: ,
                // player2: ,
                // player2email: ,
                // player3: ,
                // player3email: ,
                // player4: ,
                // player4email: ,
                // player5: ,
                // player5email: ,
            })
        })
        if (res.status == 200) {
            setSavedSuccessfully(true)
        }
        else {
            setSavedSuccessfully(false)
        }
    }

    //12:30pm on 27th October, 2023 GMT or 6pm on 27th October, 2023 IST
    const endDate = "2023-10-27T12:30:00.000Z"

    const { days, hours, minutes, seconds, isTimeUp } = useTicker(endDate);

    function handleCallbackresponse(response) {

        var userObject = jwt_decode(response.credential)
        setLoginLoader(true);
        document.getElementById("GoogleButton").hidden = true;
        setUser(userObject)
        setSignedin(true)
        getUserTeam(userObject)
    }

    useEffect(() => {
        setLoginLoader(true)
        window.setTimeout(() => {
            window.google.accounts.id.initialize({
                client_id: "361029505972-bds31bk8tege2lhk8eec4iftajlgp5om.apps.googleusercontent.com",
                callback: handleCallbackresponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById("GoogleButton"),
                { theme: 'outlined', size: 'large', shape: 'pill', }
            );
            setLoginLoader(false)
        }, 2000)

    }, [isTimeUp])

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

            {/* GOOGLE LOGIN BTN */}
            {Object.keys(User).length == 0 && !LoginLoader &&
                <Grid.Container
                    css={{
                        jc: 'center',
                    }}>
                    <Col css={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                        margin: '20vh 0px 40vh 0px'
                    }}>
                        <div className="GoogleButton" id='GoogleButton'></div>
                        <Text css={{
                            '@xsMax': {
                                fontSize: '$base'
                            },
                            '@xsMin': {
                                fontSize: '$lg'
                            },
                            fontWeight: '$normal',
                            color: '#163364',
                            paddingTop: '12px'
                        }}>
                            Login with your ashoka email ID to make your ABA 7.0 Fantasy team!
                        </Text>
                    </Col>
                </Grid.Container>
            }

            {Object.keys(User).length !== 0 &&
                <Modal
                    open={signedin}
                    closeButton
                >
                    <Modal.Header
                        css={{
                            paddingTop: '0px',
                        }}>
                        <Col>
                            <Text
                                css={{
                                    textAlign: 'center',
                                    fontSize: '$3xl',
                                    fontWeight: '$medium',
                                    color: '#ff9f56',
                                    borderStyle: 'solid',
                                    borderWidth: '0px 0px 2px 0px',
                                    borderColor: '#faf7ea'
                                }}>
                                Success!
                            </Text>
                        </Col>
                    </Modal.Header>
                    <Modal.Body
                        css={{
                            paddingTop: '0px'
                        }}>
                        <Text
                            css={{
                                textAlign: 'center',
                                fontSize: '$xl',
                                fontWeight: '$medium',
                                color: 'black',
                            }}>
                            Welcome to the official ABA 7.0 FanUp fantasy {User.name}!
                        </Text>
                    </Modal.Body>

                </Modal>
            }

            {signedin && !LoginLoader &&
                <Grid.Container css={{
                    backgroundColor: '#faf7ea',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderRadius: '24px 24px 0px 0px'
                }}>
                    {/* Team PLayers Grid */}
                    <Grid css={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <Row css={{
                            jc: 'center',
                            alignItems: 'center',
                            margin: '0px 0px 12px 0px',
                            padding: '12px',
                            borderStyle: 'solid',
                            borderWidth: '0px 0px 2px 0px',
                            borderColor: '#ff9f56'
                        }}>
                            {User.picture ?
                                <Avatar
                                    src={User.picture}
                                    size={'md'}
                                />
                                :
                                <Avatar
                                    text={User.given_name[0].toUppper()}
                                    size={'xl'}
                                />
                            }
                            <Text css={{
                                fontWeight: '$medium',
                                '@xsMin': {
                                    fontSize: '$xl',
                                },
                                '@xsMax': {
                                    fontSize: '$base'
                                },
                                margin: '0px 0px 0px 8px'
                            }}>
                                {User.given_name}'s Team:
                            </Text>
                            <Text css={{
                                fontWeight: '$medium',
                                '@xsMin': {
                                    fontSize: '$xl',
                                },
                                '@xsMax': {
                                    fontSize: '$base'
                                },
                                margin: '0px 0px 0px 8px'
                            }}>
                                $0Mil
                            </Text>
                        </Row>
                        <Col css={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 'max-content',
                            borderRadius: '8px',
                            padding: '0% 12px'
                        }}
                            className="fantasy-court"
                        >

                            <Row css={{
                                justifyContent: 'center',
                            }}>
                                <Grid css={{
                                    margin: '24px 24px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
                                }}
                                    onClick={() => {
                                        setShowPlayersModal(true)
                                        setGridNo(1)
                                    }}>
                                    <Image
                                        src={Blank}
                                        css={{
                                            // borderStyle: 'solid',
                                            // borderWidth: '2px',
                                            // borderColor: '#ff9f56',
                                            borderRadius: '4px',
                                        }}
                                        width={100}
                                        height={150}
                                    />
                                </Grid>
                                <Grid css={{
                                    margin: '24px 24px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
                                }}
                                    onClick={() => {
                                        setShowPlayersModal(true)
                                        setGridNo(2)
                                    }}>
                                    <Image
                                        src={Blank}
                                        css={{
                                            // borderStyle: 'solid',
                                            // borderWidth: '2px',
                                            // borderColor: '#ff9f56',
                                            borderRadius: '4px',

                                        }}
                                        width={100}
                                        height={150}
                                    />
                                </Grid>
                            </Row>

                            <Row css={{
                                justifyContent: 'center',
                            }}>
                                <Grid css={{
                                    margin: '12px 12px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
                                }}
                                    onClick={() => {
                                        setShowPlayersModal(true)
                                        setGridNo(3)
                                    }}>
                                    <Image
                                        src={Blank}
                                        css={{
                                            // borderStyle: 'solid',
                                            // borderWidth: '2px',
                                            // borderColor: '#ff9f56',
                                            borderRadius: '4px',

                                        }}
                                        width={100}
                                        height={150}
                                    />
                                </Grid>
                            </Row>

                            <Row css={{
                                justifyContent: 'center',
                            }}>
                                <Grid css={{
                                    margin: '24px 24px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
                                }}
                                    onClick={() => {
                                        setShowPlayersModal(true)
                                        setGridNo(4)
                                    }}>
                                    <Image
                                        src={Blank}
                                        css={{
                                            // borderStyle: 'solid',
                                            // borderWidth: '2px',
                                            // borderColor: '#ff9f56',
                                            borderRadius: '4px',

                                        }}
                                        width={100}
                                        height={150}
                                    />
                                </Grid>
                                <Grid css={{
                                    margin: '24px 24px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
                                }}
                                    onClick={() => {
                                        setShowPlayersModal(true)
                                        setGridNo(5)
                                    }}>
                                    <Image
                                        src={Blank}
                                        css={{
                                            // borderStyle: 'solid',
                                            // borderWidth: '2px',
                                            // borderColor: '#ff9f56',
                                            borderRadius: '4px',

                                        }}
                                        width={100}
                                        height={150}
                                    />
                                </Grid>
                            </Row>
                        </Col>
                    </Grid>

                    {/* Rules Grid */}
                    <Grid css={{
                        jc: 'center',
                        alignItems: 'center',
                        margin: '24px'
                    }}>
                        <Col css={{
                            borderStyle: 'solid',
                            borderWidth: '0px 0px 0px 2px',
                            borderColor: '#ff9f56',
                            paddingLeft: '12px'
                        }}>
                            <Text css={{
                                '@xsMin': {
                                    fontSize: '$xl'
                                },
                                '@xsMax': {
                                    fontSize: '$lg'
                                },
                                fontWeight: '$medium'
                            }}>
                                Validity Conditions
                            </Text>
                            <Text css={{
                                '@xsMin': {
                                    fontSize: '$base'
                                },
                                '@xsMax': {
                                    fontSize: '$md'
                                },
                                fontWeight: '$medium'
                            }}>
                                1. Maximum team value &lt;= $50Mil
                            </Text>
                            <Text css={{
                                '@xsMin': {
                                    fontSize: '$base'
                                },
                                '@xsMax': {
                                    fontSize: '$md'
                                },
                                fontWeight: '$medium'
                            }}>
                                2. Minimum number of players to save your team = 5
                            </Text>
                            <Text css={{
                                '@xsMin': {
                                    fontSize: '$base'
                                },
                                '@xsMax': {
                                    fontSize: '$md'
                                },
                                fontWeight: '$medium'
                            }}>
                                3. Minimum number of women in your team = 2
                            </Text>
                            <Text css={{
                                '@xsMin': {
                                    fontSize: '$base'
                                },
                                '@xsMax': {
                                    fontSize: '$md'
                                },
                                fontWeight: '$medium'
                            }}>
                                4. Cannot have more than 2 players from one team
                            </Text>
                            <Text css={{
                                '@xsMin': {
                                    fontSize: '$base'
                                },
                                '@xsMax': {
                                    fontSize: '$md'
                                },
                                fontWeight: '$medium'
                            }}>
                                5. Cannot have the same player more than once in your team.
                            </Text>
                            <Button auto flat color={'warning'}
                                css={{
                                    margin: '12px 0px'
                                }}>
                                <Text css={{
                                    fontWeight: '$semibold',
                                }}>
                                    Save Team
                                </Text>
                            </Button>
                        </Col>
                    </Grid>


                </Grid.Container>
            }

            <Modal
                fullScreen={true}
                closeButton
                open={ShowPlayersModal}
                onClose={()=>{
                    setShowPlayersModal(false)
                }}>
                <Modal.Header>
                    <Text
                        css={{
                            '@xsMax': {
                                fontSize: '$md',
                                fontWeight: '$medium'
                            },
                            '@xsMin': {
                                fontSize: '$xl',
                                fontWeight: '$medium'
                            },
                            border: 'solid',
                            borderColor: '#faf7ea',
                            borderWidth: '0px 0px 2px 0px'
                        }}>
                        Choose your player, {User.given_name}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Grid.Container
                        css={{
                            jc: 'center',
                            alignItems: 'center',
                        }}>
                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '8px 24px'
                                }
                            }}>
                            <Text id='tier1btn'
                                css={{
                                    fontSize: '$lg',
                                    color: '#E6BE8A',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(255, 215, 0, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(true)
                                    setTwoReady(false)
                                    setThreeReady(false)
                                    setFourReady(false)
                                    document.getElementById('tier1btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier1btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 1
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '8px 24px'
                                }
                            }}>
                            <Text id='tier2btn'
                                css={{
                                    fontSize: '$lg',
                                    color: 'rgb(157, 171, 187)',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(192, 192, 192, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(192, 192, 192, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(false)
                                    setTwoReady(true)
                                    setThreeReady(false)
                                    setFourReady(false)
                                    document.getElementById('tier2btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier2btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 2
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '8px 24px 24px 24px'
                                }
                            }}>
                            <Text id='tier3btn'
                                css={{
                                    fontSize: '$lg',
                                    color: '#CD7F32',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(190, 159, 103, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(205, 127, 50, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(false)
                                    setTwoReady(false)
                                    setThreeReady(true)
                                    setFourReady(false)
                                    document.getElementById('tier3btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier3btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 3
                            </Text>
                        </Grid>

                        <Grid
                            css={{
                                '@xsMin': {
                                    padding: '16px'
                                },
                                '@xsMax': {
                                    padding: '8px 24px 24px 24px'
                                }
                            }}>
                            <Text id='tier4btn'
                                css={{
                                    fontSize: '$lg',
                                    color: 'rgb(183, 110, 121)',
                                    fontWeight: '$semibold',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(183, 110, 121, 0.2)',
                                    textAlign: 'center',
                                    padding: '2px 24px',
                                    transition: 'padding 0.5s',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(183, 110, 121, 0.25)',
                                        padding: '2px 24px',
                                    }
                                }}
                                onClick={() => {
                                    setOneReady(false)
                                    setTwoReady(false)
                                    setThreeReady(false)
                                    setFourReady(true)
                                    document.getElementById('tier4btn').style.transform = 'scale(0.95)'
                                    window.setTimeout(() => {
                                        document.getElementById('tier4btn').style.transform = 'scale(1)'
                                    }, 150)
                                }}
                            >
                                Tier 4
                            </Text>
                        </Grid>
                    </Grid.Container>

                    {OneReady && Tier1Players &&
                        <Table bordered={true}
                        color={'warning'}
                        selectionMode="multiple"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}>
                            <Table.Header>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Picture</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Name</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }} >Fantasy Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Tier</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Type</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Height</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Auction Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Gender</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Batch</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {Tier1Players.map((player) => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                <Avatar src={player[0]} size={'md'} />
                                            </Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[18]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[6]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[9]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[10]}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    }

                    {TwoReady && Tier2Players &&
                        <Table bordered={true}
                        color={'warning'}
                        selectionMode="multiple"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}>
                            <Table.Header>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Picture</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Name</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }} >Fantasy Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Tier</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Type</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Height</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Auction Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Gender</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Batch</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {Tier2Players.map((player) => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                <Avatar src={player[0]} size={'md'} />
                                            </Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[18]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[6]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[9]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[10]}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    }

                    {ThreeReady && Tier3Players &&
                        <Table bordered={true}
                        color={'warning'}
                        selectionMode="multiple"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}>
                            <Table.Header>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Picture</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Name</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }} >Fantasy Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Tier</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Type</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Height</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Auction Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Gender</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Batch</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {Tier3Players.map((player) => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                <Avatar src={player[0]} size={'md'} />
                                            </Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[18]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[6]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[9]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[10]}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    }

                    {FourReady && Tier4Players &&
                        <Table bordered={true}
                        color={'warning'}
                        selectionMode="multiple"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}>
                            <Table.Header>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Picture</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Name</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }} >Fantasy Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Tier</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Type</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Height</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Auction Price</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Gender</Table.Column>
                                <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Batch</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {Tier4Players.map((player) => {
                                    return (
                                        <Table.Row>
                                            <Table.Cell css={{ textAlign: 'center' }}>
                                                <Avatar src={player[0]} size={'md'} />
                                            </Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[1]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[18]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[6]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[9]}</Table.Cell>
                                            <Table.Cell css={{ textAlign: 'center' }}>{player[10]}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    }

                </Modal.Body>
            </Modal>
        </>
    )
}