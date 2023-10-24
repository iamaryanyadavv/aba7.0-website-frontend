import { Text, Grid, Col, Modal, Loading, Row, Image, Avatar, Button, Table } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useTicker } from "../../hooks";
import Blank from '../../assets/images/blankplayer.jpg'
import './fanup.css'

export default function FanUpContent() {
    const [LoginLoader, setLoginLoader] = useState(false);
    const [SaveBTNLoader, setSaveBTNLoader] = useState(false);
    const [User, setUser] = useState({})
    const [signedin, setSignedin] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);

    // Fantasy Team ------------------------------------------

    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [selectedPlayers1, setSelectedPlayers1] = useState([])
    const [selectedPlayers2, setSelectedPlayers2] = useState([])
    const [selectedPlayers3, setSelectedPlayers3] = useState([])
    const [selectedPlayers4, setSelectedPlayers4] = useState([])

    const [GridNo, setGridNo] = useState(0)
    const [ShowPlayersModal, setShowPlayersModal] = useState(false)
    const [ShowResModal, setShowResModal] = useState(false)
    const [ValidatedSuccessfully, setValidatedSuccessfully] = useState(false)
    const [SavedSuccessfully, setSavedSuccessfully] = useState(false)
    // -------------------------------------------------------

    // Select Player Modal -------------------------------------
    const [OneReady, setOneReady] = useState(true);
    const [TwoReady, setTwoReady] = useState(false);
    const [ThreeReady, setThreeReady] = useState(false);
    const [FourReady, setFourReady] = useState(false);
    const [budget, setBudget] = useState(0)

    const [Tier1Players, setTier1Players] = useState([])
    const [Tier2Players, setTier2Players] = useState([])
    const [Tier3Players, setTier3Players] = useState([])
    const [Tier4Players, setTier4Players] = useState([])

    const [selectedTier1Players, setselectedTier1Players] = useState([])
    const [selectedTier2Players, setselectedTier2Players] = useState([])
    const [selectedTier3Players, setselectedTier3Players] = useState([])
    const [selectedTier4Players, setselectedTier4Players] = useState([])
    // ---------------------------------------------------------

    const getUserTeam = async (user) => {
        getAllPlayers()
        setLoginLoader(false)
        await fetch(`https://aba-backend-gr9t.onrender.com/fantasy/getTeam?email=${user.email}`)
            .then(response => response.json())
            .then((fantasydata) => {
                console.log(fantasydata)
                if (fantasydata[0].length > 0) {
                    var player1 = []
                    var player2 = []
                    var player3 = []
                    var player4 = []
                    var player5 = []
                    var sum = parseFloat(fantasydata[6]) + parseFloat(fantasydata[11]) + parseFloat(fantasydata[16]) + parseFloat(fantasydata[21]) + parseFloat(fantasydata[26])

                    for (var i = 0; i < fantasydata.length; i++) {
                        if (i >= 3 && i <= 7) {
                            player1.push(fantasydata[i])
                        }
                        if (i >= 8 && i <= 12) {
                            player2.push(fantasydata[i])
                        }
                        if (i >= 13 && i <= 17) {
                            player3.push(fantasydata[i])
                        }
                        if (i >= 18 && i <= 22) {
                            player4.push(fantasydata[i])
                        }
                        if (i >= 23 && i <= 27) {
                            player5.push(fantasydata[i])
                        }
                    }

                    var usersPlayers = [player1, player2, player3, player4, player5]
                    setSelectedPlayers(usersPlayers)
                    setBudget(sum)
                }

            })
        // get user's team and set player1-5, player1-5email IDS, and player 1-5 genders
    }

    const getAllPlayers = async () => {
        await fetch('https://aba-backend-gr9t.onrender.com/aba7players')
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

    // VALIDATION
    async function validateTeam() {
        if (selectedPlayers) {
            console.log(selectedPlayers)
            const res = await fetch('https://aba-backend-gr9t.onrender.com/fantasy/validateTeam', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    picture: User.picture,
                    name: User.name,
                    email: User.email,

                    player1photo: selectedPlayers[0][0],
                    player1: selectedPlayers[0][1],
                    player1gender: selectedPlayers[0][9],
                    player1price: selectedPlayers[0][18],
                    player1team: selectedPlayers[0][7],

                    player2photo: selectedPlayers[1][0],
                    player2: selectedPlayers[1][1],
                    player2gender: selectedPlayers[1][9],
                    player2price: selectedPlayers[1][18],
                    player2team: selectedPlayers[1][7],

                    player3photo: selectedPlayers[2][0],
                    player3: selectedPlayers[2][1],
                    player3gender: selectedPlayers[2][9],
                    player3price: selectedPlayers[2][18],
                    player3team: selectedPlayers[2][7],

                    player4photo: selectedPlayers[3][0],
                    player4: selectedPlayers[3][1],
                    player4gender: selectedPlayers[3][9],
                    player4price: selectedPlayers[3][18],
                    player4team: selectedPlayers[3][7],

                    player5photo: selectedPlayers[4][0],
                    player5: selectedPlayers[4][1],
                    player5gender: selectedPlayers[4][9],
                    player5price: selectedPlayers[4][18],
                    player5team: selectedPlayers[4][7],

                })
            })
            if (res.status == 200) {
                setValidatedSuccessfully(true)
                saveTeam()
            }
            else {
                setSaveBTNLoader(false)
                setValidatedSuccessfully(false)
                setShowResModal(true)
            }
        }

    }

    // SAVE TEAM
    async function saveTeam() {
        if (selectedPlayers) {
            console.log(selectedPlayers)
            const res = await fetch('https://aba-backend-gr9t.onrender.com/fantasy/saveTeam', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    picture: User.picture,
                    name: User.name,
                    email: User.email,
                    player1photo: selectedPlayers[0][0],
                    player1: selectedPlayers[0][1],
                    player1gender: selectedPlayers[0][9],
                    player1price: selectedPlayers[0][18],
                    player1team: selectedPlayers[0][7],

                    player2photo: selectedPlayers[1][0],
                    player2: selectedPlayers[1][1],
                    player2gender: selectedPlayers[1][9],
                    player2price: selectedPlayers[1][18],
                    player2team: selectedPlayers[1][7],

                    player3photo: selectedPlayers[2][0],
                    player3: selectedPlayers[2][1],
                    player3gender: selectedPlayers[2][9],
                    player3price: selectedPlayers[2][18],
                    player3team: selectedPlayers[2][7],

                    player4photo: selectedPlayers[3][0],
                    player4: selectedPlayers[3][1],
                    player4gender: selectedPlayers[3][9],
                    player4price: selectedPlayers[3][18],
                    player4team: selectedPlayers[3][7],

                    player5photo: selectedPlayers[4][0],
                    player5: selectedPlayers[4][1],
                    player5gender: selectedPlayers[4][9],
                    player5price: selectedPlayers[4][18],
                    player5team: selectedPlayers[4][7],


                })
            })
            if (res.status == 200) {
                setSaveBTNLoader(false)
                setSavedSuccessfully(true)
                setShowResModal(true)
            }
            else {
                setSaveBTNLoader(false)
                setSavedSuccessfully(false)
                setShowResModal(true)
            }
        }

    }

    async function checkTeam() {
        await validateTeam();
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

    function calculatePrice() {
        var sum = 0;
        var T1Players = []
        var T2Players = []
        var T3Players = []
        var T4Players = []
        var selectedPlayers = []
        if (selectedPlayers1) {
            var priceArr = Array.from(selectedPlayers1)
            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier1Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))][18])
                    T1Players.push(Tier1Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers.push(Tier1Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers[selectedPlayers.length-1][19] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))
                }
            }

        }
        if (selectedPlayers2) {

            var priceArr = Array.from(selectedPlayers2)
            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier2Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))][18])
                    T2Players.push(Tier2Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers.push(Tier2Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers[selectedPlayers.length-1][19] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))
                    console.log(selectedPlayers[selectedPlayers.length-1])
                }
            }
        }
        if (selectedPlayers3) {
            var priceArr = Array.from(selectedPlayers3)
            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier3Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))][18])
                    T3Players.push(Tier3Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers.push(Tier3Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers[selectedPlayers.length-1][19] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))
                }
            }
        }
        if (selectedPlayers4) {
            var priceArr = Array.from(selectedPlayers4)
            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier4Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))][18])
                    T4Players.push(Tier4Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers.push(Tier4Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))])
                    selectedPlayers[selectedPlayers.length-1][19] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".")+1))
                }
            }
        }
        setBudget(sum)
        setselectedTier1Players(T1Players)
        setselectedTier2Players(T2Players)
        setselectedTier3Players(T3Players)
        setselectedTier4Players(T4Players)

        var finalPlayers = []
        selectedPlayers.map((player, index) => {
            if (index < 5) {
                finalPlayers.push(player)
            }
        })
        // console.log('final', finalPlayers)
        setSelectedPlayers(finalPlayers)

        return true;
    }


    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.onload = () => {
            setLoginLoader(false);

            window.google.accounts.id.initialize({
                client_id: "361029505972-bds31bk8tege2lhk8eec4iftajlgp5om.apps.googleusercontent.com",
                callback: handleCallbackresponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById("GoogleButton"),
                { theme: 'outlined', size: 'large', shape: 'pill', }
            );
        };
        document.head.appendChild(script);

        return () => {
            // Cleanup: remove the script if component is unmounted
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        calculatePrice()
    }, [selectedPlayers1, selectedPlayers2, selectedPlayers3, selectedPlayers4])

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
                        backgroundColor: '#faf7ea',
                        borderRadius: '20px 20px 0px 0px'
                    }}>
                    <Col css={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                        margin: '20vh 0px 30vh 0px'
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
                                ${budget} Mil
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
                                    {selectedPlayers[0] ?
                                        <Image
                                            src={selectedPlayers[0][0]}
                                            css={{
                                                // borderStyle: 'solid',
                                                // borderWidth: '2px',
                                                // borderColor: '#ff9f56',
                                                borderRadius: '4px',
                                            }}
                                            width={100}
                                            height={150}
                                        />
                                        :
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
                                    }
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
                                    {selectedPlayers[1] ?
                                        <Image
                                            src={selectedPlayers[1][0]}
                                            css={{
                                                // borderStyle: 'solid',
                                                // borderWidth: '2px',
                                                // borderColor: '#ff9f56',
                                                borderRadius: '4px',
                                            }}
                                            width={100}
                                            height={150}
                                        />
                                        :
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
                                    }
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
                                    {selectedPlayers[2] ?
                                        <Image
                                            src={selectedPlayers[2][0]}
                                            css={{
                                                // borderStyle: 'solid',
                                                // borderWidth: '2px',
                                                // borderColor: '#ff9f56',
                                                borderRadius: '4px',
                                            }}
                                            width={100}
                                            height={150}
                                        />
                                        :
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
                                    }
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
                                    {selectedPlayers[3] ?
                                        <Image
                                            src={selectedPlayers[3][0]}
                                            css={{
                                                // borderStyle: 'solid',
                                                // borderWidth: '2px',
                                                // borderColor: '#ff9f56',
                                                borderRadius: '4px',
                                            }}
                                            width={100}
                                            height={150}
                                        />
                                        :
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
                                    }
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
                                    {selectedPlayers[4] ?
                                        <Image
                                            src={selectedPlayers[4][0]}
                                            css={{
                                                // borderStyle: 'solid',
                                                // borderWidth: '2px',
                                                // borderColor: '#ff9f56',
                                                borderRadius: '4px',
                                            }}
                                            width={100}
                                            height={150}
                                        />
                                        :
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
                                    }
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
                                2. Number of players to save your team = 5
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
                                3. Number of non-cis men in your team &gt;= 2
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
                                4. Number of players from one team &lt;= 2
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
                            <Button auto flat color={'warning'} onClick={checkTeam}
                                disabled={SaveBTNLoader}
                                css={{
                                    margin: '12px 0px'
                                }}>
                                {SaveBTNLoader ?
                                    <Loading type="points-opacity" color="warning" size="sm" />
                                    :
                                    <Text css={{
                                        fontWeight: '$semibold',
                                    }}>
                                        {/* Validate team --> if 200 OK --> save team */}
                                        Save Team
                                    </Text>
                                }
                            </Button>
                        </Col>
                    </Grid>


                </Grid.Container>
            }

            <Modal
                fullScreen={false}
                width="950px"
                closeButton
                open={ShowPlayersModal}
                onClose={() => {
                    setShowPlayersModal(false)
                }}
            >
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
                            aria-label="Tier 1 Table"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                            selectedKeys={selectedPlayers1}
                            onSelectionChange={setSelectedPlayers1}
                        >
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
                                {Tier1Players.map((player, index) => {
                                    return (
                                        <Table.Row
                                            key={index}
                                        >
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
                            aria-label="Tier 2 Table"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                            selectedKeys={selectedPlayers2}
                            onSelectionChange={setSelectedPlayers2}
                        >
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
                                        <Table.Row onClick={() => alert("hi")}>
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
                            aria-label="Tier 3 Table"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                            selectedKeys={selectedPlayers3}
                            onSelectionChange={setSelectedPlayers3}>
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
                                        <Table.Row onClick={() => alert("hi")}>
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
                            aria-label="Tier 4 Table"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                            selectedKeys={selectedPlayers4}
                            onSelectionChange={setSelectedPlayers4}>
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
                                        <Table.Row onClick={() => alert("hi")}>
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

            <Modal
                fullScreen={false}
                closeButton
                open={ShowResModal}
                onClose={() => {
                    setShowResModal(false)
                }}
            >
                {/* Not validated */}
                {ValidatedSuccessfully == false && SavedSuccessfully == false &&
                    <>
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
                                    borderWidth: '0px 0px 2px 0px',
                                    color: '$red600'
                                }}>
                                Unsuccessful save...!
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Text
                                css={{
                                    '@xsMax': {
                                        fontSize: '$sm',
                                        fontWeight: '$medium'
                                    },
                                    '@xsMin': {
                                        fontSize: '$base',
                                        fontWeight: '$medium'
                                    },
                                }}>
                                Invalid team! Please check the rules and try again.
                                If error persists, please email a screenshot of your team and error message to aba@ashoka.edu.in
                            </Text>
                        </Modal.Body>
                    </>
                }

                {/* Validated but not saved */}
                {ValidatedSuccessfully == true && SavedSuccessfully == false &&
                    <>
                        <Modal.Header >
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
                                    borderWidth: '0px 0px 2px 0px',
                                    color: '$red600'
                                }}>
                                Unsuccessful save...!
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Text
                                css={{
                                    '@xsMax': {
                                        fontSize: '$sm',
                                        fontWeight: '$medium'
                                    },
                                    '@xsMin': {
                                        fontSize: '$base',
                                        fontWeight: '$medium'
                                    },
                                }}>
                                Valid team but unable to save. Please check your internet connection and try again.
                                If error persists, please email a screenshot of your team and error message to aba@ashoka.edu.in
                            </Text>
                        </Modal.Body>
                    </>
                }

                {/* Validated and saved */}
                {ValidatedSuccessfully == true && SavedSuccessfully == true &&
                    <>
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
                                    borderWidth: '0px 0px 2px 0px',
                                    color: '$green600'
                                }}>
                                Successful save...!
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Text
                                css={{
                                    '@xsMax': {
                                        fontSize: '$sm',
                                        fontWeight: '$medium'
                                    },
                                    '@xsMin': {
                                        fontSize: '$base',
                                        fontWeight: '$medium'
                                    },
                                }}>
                                Your team has been successfully saved in the database! Thank you.
                            </Text>
                        </Modal.Body>
                    </>
                }

            </Modal>
        </>
    )
}