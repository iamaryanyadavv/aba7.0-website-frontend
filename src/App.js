import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/home.js';
import Header from './components/header/header';
import Footer from './components/footer/footer.js';
import FootNavbar from './components/footnavbar/footnavbar';
import Schedule from './pages/SchedulePage/schedule';

function App() {
    const theme = createTheme({
        type: 'light',
        theme: {
            colors: {
                white: '#ffffff',
                black: '#000000',
            }
        }
    })
    return (
        <NextUIProvider theme={theme}>
            <Header />
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/schedule" element={<Schedule />} />
                    </Routes>
                </Router>
            </div>
            <FootNavbar />
            <Footer />

        </NextUIProvider>
    );
}

export default App;
