import React from "react";
import HomeLanding from "../../components/home/homelanding/homelanding";
import HomeEvents from "../../components/home/homeevents/homeevents";
import HomePrizes from "../../components/home/homeprizes/homeprizes"
import NewsTicker from "../../components/NewsTicker/newsticker";
const Home = () => {
    return(
        <>
            <NewsTicker/>
            <HomeLanding/>
            <HomePrizes/>
            <HomeEvents/>
        </>
    )
}

export default Home;