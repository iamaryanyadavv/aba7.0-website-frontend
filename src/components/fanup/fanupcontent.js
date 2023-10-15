import { Text, Grid, Col, Modal, Loading, Row, Image, Avatar, Button } from "@nextui-org/react";
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
    // -------------------------------------------------------

    const [SavedSuccessfully, setSavedSuccessfully] = useState()

    const getUserTeam = async (user) => {
        getAllPlayers()
        console.log(user)
        setLoginLoader(false)
        // get user's team and set player1-5, and player1-5email IDS
    }

    const getAllPlayers = async () => {
        await fetch('http://localhost:3001/aba7players')
            .then(response => response.json())
            .then((players) => {
                console.log(players.values)
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
            {Object.keys(User).length == 0 &&
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
                                '@xsMin':{
                                    fontSize: '$xl',
                                },
                                '@xsMax':{
                                    fontSize: '$base'
                                },
                                margin: '0px 0px 0px 8px'
                            }}>
                                {User.given_name}'s Team:
                            </Text>
                            <Text css={{
                                fontWeight: '$medium',
                                '@xsMin':{
                                    fontSize: '$xl',
                                },
                                '@xsMax':{
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
                            padding: '0% 48px'
                        }}
                            className="fantasy-court"
                        >
                            <Row css={{
                                justifyContent: 'center',
                            }}>
                                <Grid css={{
                                    margin: '24px 12px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
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
                                    margin: '24px 12px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
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
                                    margin: '24px 12px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
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
                                    margin: '24px 12px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
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
                                    margin: '24px 12px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        opacity: '0.95',
                                        transform: 'scale(1.025)'
                                    }
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
                                    fontSize: '$base'
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
        </>
    )
}