import { Text, Grid, Col, Modal, Loading, Row, Image, Avatar, Button, Table, Popover, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useTicker } from "../../hooks";
import Blank from '../../assets/images/blankplayer.jpg'
import './fanup.css'
import TeamsLeaderboard from "./teamsldrb";
import PlayersLeaderboard from "./playersldrb";

export default function FanUpContent() {
    const [LoginLoader, setLoginLoader] = useState(false);
    const [SaveBTNLoader, setSaveBTNLoader] = useState(false);
    const [User, setUser] = useState({})
    const [signedin, setSignedin] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [ShowTimeLockModal, setShowTimeLockModal] = useState(false)

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
    const [gotUserTeam, setGotUserTeam] = useState(false)
    const [gotAllPlayers, setGotAllPlayers] = useState(false)

    const [Tier1Players, setTier1Players] = useState([])
    const [Tier2Players, setTier2Players] = useState([])
    const [Tier3Players, setTier3Players] = useState([])
    const [Tier4Players, setTier4Players] = useState([])

    const [selectedTier1Players, setselectedTier1Players] = useState([])
    const [selectedTier2Players, setselectedTier2Players] = useState([])
    const [selectedTier3Players, setselectedTier3Players] = useState([])
    const [selectedTier4Players, setselectedTier4Players] = useState([])
    // ---------------------------------------------------------

    // NAV BTNS
    const [fantasyPage, setFantasyPage] = useState(false)
    const [teamLeaderboard, setTeamLeaderboard] = useState(true)
    const [playersLeaderboard, setPlayersLeaderboard] = useState(false)

    // ----------------------------------------------------------

    const getUserTeam = async (user) => {
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

                    var t1p = []
                    var t2p = []
                    var t3p = []
                    var t4p = []
                    var sum = parseFloat(fantasydata[6]) + parseFloat(fantasydata[12]) + parseFloat(fantasydata[18]) + parseFloat(fantasydata[24]) + parseFloat(fantasydata[30])

                    for (var i = 0; i < fantasydata.length; i++) {
                        if (i >= 3 && i <= 9) {
                            player1.push(fantasydata[i])
                        }
                        if (i >= 10 && i <= 16) {
                            player2.push(fantasydata[i])
                        }
                        if (i >= 17 && i <= 23) {
                            player3.push(fantasydata[i])
                        }
                        if (i >= 24 && i <= 30) {
                            player4.push(fantasydata[i])
                        }
                        if (i >= 31 && i <= 37) {
                            player5.push(fantasydata[i])
                        }
                    }

                    var usersPlayers = [player1, player2, player3, player4, player5]
                    console.log(usersPlayers)
                    for (var i = 0; i < usersPlayers.length; i++) {
                        if (usersPlayers[i][5] == '1') {
                            t1p.push(usersPlayers[i][6])
                        }
                        if (usersPlayers[i][5] == '2') {
                            t2p.push(usersPlayers[i][6])
                        }
                        if (usersPlayers[i][5] == '3') {
                            t3p.push(usersPlayers[i][6])
                        }
                        if (usersPlayers[i][5] == '4') {
                            t4p.push(usersPlayers[i][6])
                        }
                        console.log(usersPlayers[i])
                    }
                    setSelectedPlayers1(t1p)
                    setSelectedPlayers2(t2p)
                    setSelectedPlayers3(t3p)
                    setSelectedPlayers4(t4p)
                    setSelectedPlayers(usersPlayers)
                    setBudget(sum)
                    setGotUserTeam(true)
                }

            })
    }

    const getAllPlayers = async (user) => {
        try {
            console.log("Starting getAllPlayers function");
            const response = await fetch('https://aba-backend-gr9t.onrender.com/aba7players');
            const playersData = await response.json();
            
            console.log("API Response received:", playersData);
            console.log("Data type:", typeof playersData);
            
            // If it's an array, log its length
            if (Array.isArray(playersData)) {
                console.log("Array length:", playersData.length);
            }
            // If it's an object, log the number of keys
            else if (typeof playersData === 'object' && playersData !== null) {
                console.log("Number of keys:", Object.keys(playersData).length);
                console.log("Keys:", Object.keys(playersData).slice(0, 5), "...");  // Show first 5 keys
            }
            
            var tier1 = []
            var tier2 = []
            var tier3 = []
            var tier4 = []
            
            // Check if playersData exists and is an object
            if (playersData) {
                // Check if it's the new format (object with player names as keys)
                if (typeof playersData === 'object' && !Array.isArray(playersData) && playersData !== null) {
                    // For each player in the object
                    let index = 0;
                    const totalKeys = Object.keys(playersData).length;
                    console.log(`Processing ${totalKeys} players from object format`);
                    
                    Object.keys(playersData).forEach((playerName, keyIndex) => {
                        console.log(`Processing player ${keyIndex+1}/${totalKeys}: ${playerName}`);
                        const player = playersData[playerName];
                        
                        console.log(`Player data type: ${typeof player}, isArray: ${Array.isArray(player)}`);
                        if (player) {
                            console.log(`Player data exists, length: ${Array.isArray(player) ? player.length : 'not an array'}`);
                        } else {
                            console.log(`Player data is null or undefined for ${playerName}`);
                        }
                        
                        // Add additional validation to ensure player is valid
                        if (player && Array.isArray(player)) {
                            try {
                                console.log(`Player before processing: ${player.slice(0, 3)}...`);
                                
                                // Add an index property for reference
                                player.push(index);
                                
                                // Determine tier based on price - ensure index 9 exists or use a default value
                                console.log(`Checking price at index 9: ${player[9]}`);
                                const price = player[9] !== undefined ? parseFloat(player[9] || 0) : 0;
                                console.log(`Parsed price: ${price}`);
                                
                                if (price >= 35) {  // Tier 1: Most expensive players
                                    player[5] = '1'; // Set tier property
                                    tier1.push(player);
                                    console.log(`Added to tier 1: ${player[1]}`);
                                } 
                                else if (price >= 15) {  // Tier 2: Medium-high price
                                    player[5] = '2';
                                    tier2.push(player);
                                    console.log(`Added to tier 2: ${player[1]}`);
                                }
                                else if (price >= 10) {  // Tier 3: Medium price
                                    player[5] = '3';
                                    tier3.push(player);
                                    console.log(`Added to tier 3: ${player[1]}`);
                                }
                                else {  // Tier 4: Lowest price
                                    player[5] = '4';
                                    tier4.push(player);
                                    console.log(`Added to tier 4: ${player[1]}`);
                                }
                                
                                index++;
                            } catch (err) {
                                console.error(`Error processing player ${playerName}:`, err);
                                console.error("Player data causing error:", player);
                            }
                        } else {
                            console.warn(`Skipped invalid player entry: ${playerName}`);
                        }
                    });
                } 
                // Handle the old format if needed (array with values property)
                else if (playersData.values && Array.isArray(playersData.values)) {
                    console.log(`Processing ${playersData.values.length} players from values array`);
                    
                    playersData.values.forEach((player, idx) => {
                        console.log(`Processing player ${idx+1}/${playersData.values.length}`);
                        
                        if (player && Array.isArray(player)) {
                            try {
                                console.log(`Player data: ${player.slice(0, 3)}...`);
                                console.log(`Player tier: ${player[5]}`);
                                
                                if (player[5] === '1') {
                                    tier1.push(player);
                                    console.log(`Added to tier 1: ${player[1]}`);
                                }
                                if (player[5] === '2') {
                                    tier2.push(player);
                                    console.log(`Added to tier 2: ${player[1]}`);
                                }
                                if (player[5] === '3') {
                                    tier3.push(player);
                                    console.log(`Added to tier 3: ${player[1]}`);
                                }
                                if (player[5] === '4') {
                                    tier4.push(player);
                                    console.log(`Added to tier 4: ${player[1]}`);
                                }
                            } catch (err) {
                                console.error(`Error processing player at index ${idx}:`, err);
                                console.error("Player data causing error:", player);
                            }
                        } else {
                            console.warn(`Skipped invalid player at index ${idx}`);
                        }
                    });
                } else {
                    console.error("Unexpected data format:", playersData);
                    setLoginLoader(false);
                    return;
                }
                
                console.log(`Final counts - Tier 1: ${tier1.length}, Tier 2: ${tier2.length}, Tier 3: ${tier3.length}, Tier 4: ${tier4.length}`);
                
                // Check if any tier arrays have players without name property (index 1)
                if (tier1.length > 0) {
                    console.log("Sample tier 1 player:", tier1[0]);
                    console.log("First 3 tier 1 players have names:", 
                        tier1.slice(0, 3).map(p => p && typeof p[1] !== 'undefined'));
                }
                
                setTier1Players(tier1)
                setTier2Players(tier2)
                setTier3Players(tier3)
                setTier4Players(tier4)
                setGotAllPlayers(true)
            } else {
                console.error("No player data received");
                setLoginLoader(false);
                return;
            }
        } catch (error) {
            console.error("Error fetching players data:", error);
            setLoginLoader(false);
            return;
        }
        
        try {
            console.log("About to call getUserTeam with user:", user);
            await getUserTeam(user);
        } catch (error) {
            console.error("Error fetching user team:", error);
            setLoginLoader(false);
        }
    }

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
                    player1price: selectedPlayers[0][20],
                    player1team: selectedPlayers[0][7],
                    player1tier: selectedPlayers[0][5],

                    player2photo: selectedPlayers[1][0],
                    player2: selectedPlayers[1][1],
                    player2gender: selectedPlayers[1][9],
                    player2price: selectedPlayers[1][20],
                    player2team: selectedPlayers[1][7],
                    player5tier: selectedPlayers[1][5],

                    player3photo: selectedPlayers[2][0],
                    player3: selectedPlayers[2][1],
                    player3gender: selectedPlayers[2][9],
                    player3price: selectedPlayers[2][20],
                    player3team: selectedPlayers[2][7],
                    player5tier: selectedPlayers[2][5],

                    player4photo: selectedPlayers[3][0],
                    player4: selectedPlayers[3][1],
                    player4gender: selectedPlayers[3][9],
                    player4price: selectedPlayers[3][20],
                    player4team: selectedPlayers[3][7],
                    player5tier: selectedPlayers[3][5],

                    player5photo: selectedPlayers[4][0],
                    player5: selectedPlayers[4][1],
                    player5gender: selectedPlayers[4][9],
                    player5price: selectedPlayers[4][20],
                    player5team: selectedPlayers[4][7],
                    player5tier: selectedPlayers[4][5],

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
                    player1price: selectedPlayers[0][20],
                    player1team: selectedPlayers[0][7],
                    player1tier: selectedPlayers[0][5],
                    player1key: selectedPlayers[0][5] == '1' ? (selectedPlayers[0][21]) : (".1." + selectedPlayers[0][21]),

                    player2photo: selectedPlayers[1][0],
                    player2: selectedPlayers[1][1],
                    player2gender: selectedPlayers[1][9],
                    player2price: selectedPlayers[1][20],
                    player2team: selectedPlayers[1][7],
                    player2tier: selectedPlayers[1][5],
                    player2key: selectedPlayers[1][5] == '1' ? (selectedPlayers[1][21]) : (".1." + selectedPlayers[1][21]),

                    player3photo: selectedPlayers[2][0],
                    player3: selectedPlayers[2][1],
                    player3gender: selectedPlayers[2][9],
                    player3price: selectedPlayers[2][20],
                    player3team: selectedPlayers[2][7],
                    player3tier: selectedPlayers[2][5],
                    player3key: selectedPlayers[2][5] == '1' ? (selectedPlayers[2][21]) : (".1." + selectedPlayers[2][21]),

                    player4photo: selectedPlayers[3][0],
                    player4: selectedPlayers[3][1],
                    player4gender: selectedPlayers[3][9],
                    player4price: selectedPlayers[3][20],
                    player4team: selectedPlayers[3][7],
                    player4tier: selectedPlayers[3][5],
                    player4key: selectedPlayers[3][5] == '1' ? (selectedPlayers[3][21]) : (".1." + selectedPlayers[3][21]),

                    player5photo: selectedPlayers[4][0],
                    player5: selectedPlayers[4][1],
                    player5gender: selectedPlayers[4][9],
                    player5price: selectedPlayers[4][20],
                    player5team: selectedPlayers[4][7],
                    player5tier: selectedPlayers[4][5],
                    player5key: selectedPlayers[4][5] == '1' ? (selectedPlayers[4][21]) : (".1." + selectedPlayers[4][21]),


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

    const endDate = "2025-04-27T13:00:00.000Z"

    const { days, hours, minutes, seconds, isTimeUp } = useTicker(endDate);

    function handleManualLogin(e) {
        e.preventDefault();

        if (!manualEmail.includes('@') || manualName.trim() === '') {
            setLoginError(true);
            return;
        }

        setLoginLoader(true);
        document.getElementById("ManualLoginForm").hidden = true;

        if (!isTimeUp) {
            const userObject = {
                email: manualEmail,
                name: manualName,
                given_name: manualName.split(' ')[0],
                picture: null
            };

            setUser(userObject);
            setSignedin(true);
            getAllPlayers(userObject);
            setLoginError(false);
        } else {
            setShowTimeLockModal(true);
        }
    }

    const [manualEmail, setManualEmail] = useState('');
    const [manualName, setManualName] = useState('');
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        setLoginLoader(false);
    }, []);

    useEffect(() => {
        calculatePrice()
    }, [selectedPlayers1, selectedPlayers2, selectedPlayers3, selectedPlayers4])

    function calculatePrice() {
        var sum = 0;
        var T1Players = []
        var T2Players = []
        var T3Players = []
        var T4Players = []
        var selectedPlayers = []
        if (selectedPlayers1) {
            if (typeof (priceArr) !== "Array") {
                var priceArr = Array.from(selectedPlayers1)

            }
            else {
                priceArr = selectedPlayers1
            }

            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    console.log(parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1)))
                    sum += parseFloat(Tier1Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))][20])
                    T1Players.push(Tier1Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers.push(Tier1Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers[selectedPlayers.length - 1][21] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))
                }
            }

        }
        if (selectedPlayers2) {
            if (typeof (priceArr) !== "Array") {
                var priceArr = Array.from(selectedPlayers2)
            }
            else {
                priceArr = selectedPlayers2
            }

            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier2Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))][20])
                    T2Players.push(Tier2Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers.push(Tier2Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers[selectedPlayers.length - 1][21] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))
                    console.log(selectedPlayers[selectedPlayers.length - 1])
                }
            }
        }
        if (selectedPlayers3) {
            if (typeof (priceArr) !== "Array") {
                var priceArr = Array.from(selectedPlayers3)
            }
            else {
                priceArr = selectedPlayers3
            }
            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier3Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))][20])
                    T3Players.push(Tier3Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers.push(Tier3Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers[selectedPlayers.length - 1][21] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))
                }
            }
        }
        if (selectedPlayers4) {
            if (typeof (priceArr) !== "Array") {
                var priceArr = Array.from(selectedPlayers4)
            }
            else {
                priceArr = selectedPlayers4
            }
            var priceArr = Array.from(selectedPlayers4)
            if (priceArr.length > 0) {
                for (var i = 0; i < priceArr.length; i++) {
                    sum += parseFloat(Tier4Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))][20])
                    T4Players.push(Tier4Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers.push(Tier4Players[parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))])
                    selectedPlayers[selectedPlayers.length - 1][21] = parseInt(priceArr[i].substring(priceArr[i].lastIndexOf(".") + 1))
                }
            }
        }
        setBudget(sum)
        setselectedTier1Players(T1Players)
        setselectedTier2Players(T2Players)
        setselectedTier3Players(T3Players)
        setselectedTier4Players(T4Players)

        console.log('inside func', selectedPlayers)

        var finalPlayers = []
        selectedPlayers.map((player, index) => {
            if (index < 5) {
                finalPlayers.push(player)
            }
        })
        setSelectedPlayers(finalPlayers)

        return true;
    }

    return (
        <>

            <Grid.Container
                css={{
                    jc: 'center',
                    alignItems: 'center',
                    paddingBottom: '20px'
                }}>

                <Grid
                    css={{
                        padding: '10px'
                    }}>
                    <Button auto className="games-btn" rounded flat
                        onClick={() => {
                            setFantasyPage(true)
                            setTeamLeaderboard(false)
                            setPlayersLeaderboard(false)
                        }}
                    >
                        <Text className="games-btn-text"
                            css={{
                                fontSize: '$md',
                                fontWeight: '$semibold',
                            }}>
                            MyFantasyTeam
                        </Text>
                    </Button>
                </Grid>

                <Grid
                    css={{
                        padding: '10px'
                    }}>
                    <Button auto className="games-btn" rounded flat
                        onClick={() => {
                            setFantasyPage(false)
                            setTeamLeaderboard(true)
                            setPlayersLeaderboard(false)
                        }}
                    >
                        <Text className="games-btn-text"
                            css={{
                                fontSize: '$md',
                                fontWeight: '$semibold',
                            }}>
                            Top50 Fantasy Teams
                        </Text>
                    </Button>
                </Grid>

                <Grid
                    css={{
                        padding: '10px'
                    }}>
                    <Button auto className="games-btn" rounded flat
                        onClick={() => {
                            setFantasyPage(false)
                            setTeamLeaderboard(false)
                            setPlayersLeaderboard(true)
                        }}
                    >
                        <Text className="games-btn-text"
                            css={{
                                fontSize: '$md',
                                fontWeight: '$semibold',
                            }}>
                            Top50 Fantasy Players
                        </Text>
                    </Button>
                </Grid>
            </Grid.Container>

            {fantasyPage &&
                <>
                    {LoginLoader &&
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

                    {Object.keys(User).length == 0 && !LoginLoader && !isTimeUp &&
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
                                <Text>
                                    Locking in...
                                </Text>
                                <Row
                                    css={{
                                        jc: 'center',
                                        paddingBottom: '24px'
                                    }}>

                                    <Col
                                        css={{
                                            width: 'max-content'
                                        }}>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$3xl'
                                                }}>
                                                {days}
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                {days}
                                            </Text>
                                        </Grid.Container>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                Days
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$md'
                                                }}>
                                                Days
                                            </Text>
                                        </Grid.Container>
                                    </Col>

                                    <Text hideIn={'xs'}
                                        css={{
                                            fontSize: '$3xl',
                                            padding: '0% 5%'
                                        }}>
                                        :
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            fontSize: '$xl',
                                            padding: '0% 2.5%'
                                        }}>
                                        :
                                    </Text>

                                    <Col
                                        css={{
                                            width: 'max-content'
                                        }}>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$3xl'
                                                }}>
                                                {hours}
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                {hours}
                                            </Text>
                                        </Grid.Container>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                Hours
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$md'
                                                }}>
                                                Hours
                                            </Text>
                                        </Grid.Container>
                                    </Col>

                                    <Text hideIn={'xs'}
                                        css={{
                                            fontSize: '$3xl',
                                            padding: '0% 5%'
                                        }}>
                                        :
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            fontSize: '$xl',
                                            padding: '0% 2.5%'
                                        }}>
                                        :
                                    </Text>

                                    <Col
                                        css={{
                                            width: 'max-content'
                                        }}>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$3xl'
                                                }}>
                                                {minutes}
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                {minutes}
                                            </Text>
                                        </Grid.Container>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                Minutes
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$md'
                                                }}>
                                                Minutes
                                            </Text>
                                        </Grid.Container>
                                    </Col>

                                    <Text hideIn={'xs'}
                                        css={{
                                            fontSize: '$3xl',
                                            padding: '0% 5%'
                                        }}>
                                        :
                                    </Text>
                                    <Text showIn={'xs'}
                                        css={{
                                            fontSize: '$xl',
                                            padding: '0% 2.5%'
                                        }}>
                                        :
                                    </Text>

                                    <Col
                                        css={{
                                            width: 'max-content'
                                        }}>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$3xl'
                                                }}>
                                                {seconds}
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                {seconds}
                                            </Text>
                                        </Grid.Container>
                                        <Grid.Container
                                            css={{
                                                jc: 'center',
                                            }}>
                                            <Text hideIn={'xs'}
                                                css={{
                                                    fontSize: '$xl'
                                                }}>
                                                Seconds
                                            </Text>
                                            <Text showIn={'xs'}
                                                css={{
                                                    fontSize: '$md'
                                                }}>
                                                Seconds
                                            </Text>
                                        </Grid.Container>
                                    </Col>

                                </Row>

                                <form id="ManualLoginForm" onSubmit={handleManualLogin} style={{ width: '100%', maxWidth: '300px' }}>
                                    <Input
                                        bordered
                                        fullWidth
                                        color="warning"
                                        size="lg"
                                        placeholder="Full Name"
                                        aria-label="Full Name"
                                        value={manualName}
                                        onChange={(e) => setManualName(e.target.value)}
                                        css={{ marginBottom: '10px' }}
                                    />
                                    <Input
                                        bordered
                                        fullWidth
                                        color="warning"
                                        size="lg"
                                        placeholder="Email Address"
                                        aria-label="Email Address"
                                        value={manualEmail}
                                        onChange={(e) => setManualEmail(e.target.value)}
                                        css={{ marginBottom: '10px' }}
                                    />
                                    {loginError &&
                                        <Text color="error" css={{ marginBottom: '10px' }}>
                                            Please enter a valid email and name
                                        </Text>
                                    }
                                    <Button
                                        auto
                                        color="warning"
                                        type="submit"
                                        css={{ width: '100%' }}
                                    >
                                        Login to Create Fantasy Team
                                    </Button>
                                </form>

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
                                    Enter your details to make your ABA 8.0 Fantasy team!
                                </Text>
                            </Col>
                        </Grid.Container>
                    }

                    {isTimeUp &&
                        <>
                            <Grid.Container
                                css={{
                                    jc: 'center',
                                    backgroundColor: '#faf7ea',
                                    borderRadius: '20px 20px 0px 0px',
                                    textAlign: 'center',
                                    padding: '20vh 4px 20vh 4px'
                                }}>
                                <Text css={{
                                    '@xsMin': {
                                        fontSize: '$xl'
                                    },
                                    '@xsMax': {
                                        fontSize: '$base'
                                    }
                                }}>
                                    Fantasy teams are locked. Check out the leaderboards under 'Top50 Fantasy Teams'!
                                </Text>
                            </Grid.Container>
                        </>
                    }

                    {Object.keys(User).length !== 0 &&
                        <Modal
                            open={signedin && gotUserTeam}
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
                                    Welcome to the official ABA 8.0 FanUp fantasy {User.name}!
                                </Text>
                            </Modal.Body>

                        </Modal>
                    }

                    {ShowTimeLockModal &&
                        <Modal
                            open={ShowTimeLockModal}
                            closeButton
                            onClose={() => {
                                setShowTimeLockModal(false)
                            }}
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
                                        Too late ;(
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
                                    It's too late now to make your fantasy team, sorry!
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
                                            text={User.given_name[0].toUpperCase()}
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
                                                        borderRadius: '4px',
                                                    }}
                                                    width={100}
                                                    height={150}
                                                />
                                                :
                                                <Image
                                                    src={Blank}
                                                    css={{
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
                                                        borderRadius: '4px',
                                                    }}
                                                    width={100}
                                                    height={150}
                                                />
                                                :
                                                <Image
                                                    src={Blank}
                                                    css={{
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
                                                        borderRadius: '4px',
                                                    }}
                                                    width={100}
                                                    height={150}
                                                />
                                                :
                                                <Image
                                                    src={Blank}
                                                    css={{
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
                                                        borderRadius: '4px',
                                                    }}
                                                    width={100}
                                                    height={150}
                                                />
                                                :
                                                <Image
                                                    src={Blank}
                                                    css={{
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
                                                        borderRadius: '4px',
                                                    }}
                                                    width={100}
                                                    height={150}
                                                />
                                                :
                                                <Image
                                                    src={Blank}
                                                    css={{
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
                                        disabled={selectedPlayers.length < 5}
                                        css={{
                                            margin: '12px 0px'
                                        }}>
                                        {SaveBTNLoader ?
                                            <Loading type="points-opacity" color="warning" size="sm" />
                                            :
                                            <Text css={{
                                                fontWeight: '$semibold',
                                            }}>
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
                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Team</Table.Column>
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
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[20]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[7]}</Table.Cell>
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
                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Team</Table.Column>
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
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[20]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[7]}</Table.Cell>
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
                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Team</Table.Column>
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
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[20]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[7]}</Table.Cell>
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
                                        <Table.Column css={{ paddingRight: '8px', textAlign: 'center' }}>Team</Table.Column>
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
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[20]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[5]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[2]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[3]}</Table.Cell>
                                                    <Table.Cell css={{ textAlign: 'center' }}>{player[7]}</Table.Cell>
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
            }

            {teamLeaderboard &&
                <TeamsLeaderboard />
            }

            {playersLeaderboard &&
                <PlayersLeaderboard />
            }

        </>
    )
}