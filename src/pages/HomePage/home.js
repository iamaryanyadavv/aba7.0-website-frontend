import React from "react";
import HomeLanding from "../../components/home/homelanding/homelanding";
import HomeEvents from "../../components/home/homeevents/homeevents";
import HomePrizes from "../../components/home/homeprizes/homeprizes"

const Home = () => {
    return(
        <>
            <HomeLanding/>
            <HomePrizes/>
            <HomeEvents/>
        </>
    )
}

export default Home;