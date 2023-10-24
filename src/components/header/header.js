import React from "react";
import "./header.css";
import { Navbar, Link, Image, Popover, Text } from "@nextui-org/react";
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import Logo from '../../assets/images/LogoWhite.svg'

function Header() {

    const items = [
        { name: 'Home', href: '/' },
        { name: 'FanUpxABA Fantasy', href: '/fanupabafantasy' },
        { name: 'RoadToABA', href: '/roadtoaba' },
        { name: 'Game Time', href: '/schedule' },
        { name: 'Gallery', href: '/gallery' },
    ]

    var active = window.location.pathname

    return (
        <Navbar className="navbar" variant="sticky" shouldHideOnScroll={false}>
            <Navbar.Toggle color="inherit" showIn="sm" />
            <Navbar.Brand hideIn="sm" css={{ '&:hover': { transform: 'scale(1.25)' } }}>
                <Image css={{
                    width: '40px',
                    height: '40px',
                    transitionDuration: '0.5s',
                    transitionProperty: 'transform',
                    '&:hover': {
                        cursor: 'pointer',
                        transform: 'rotate(360deg)',
                    }
                }} src={Logo}
                    onClick={() => {
                        window.location.pathname = ''
                    }} />
            </Navbar.Brand>
            <Navbar.Content hideIn="sm" variant="highlight-rounded">
                {items.map((item, index) => {
                    if (item.name == 'FanUpxABA Fantasy') {
                        return (
                            <Popover>
                                <Popover.Trigger>
                                    <Navbar.Link key={index} 
                                    // isActive={item.href === active.substring(0, item.href.length + 1)} href={item.href}
                                        css={{
                                            // fontFamily: 'MEregular'
                                        }}>
                                        {item.name}
                                    </Navbar.Link>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <Text css={{ p: "$10" }}>Coming soon!</Text>
                                </Popover.Content>
                            </Popover>
                        )
                    }
                    else {
                        return (
                            <Navbar.Link key={index} isActive={item.href === active.substring(0, item.href.length + 1)} href={item.href}
                                css={{
                                    // fontFamily: 'MEregular'
                                }}>
                                {item.name}
                            </Navbar.Link>
                        )
                    }
                })}

            </Navbar.Content>
            <Navbar.Content showIn={'sm'}>
                <Image css={{
                    width: '40px',
                    height: '40px'
                }} src={Logo} />
            </Navbar.Content>
            <Navbar.Content>
                <Link className="ig-link" target="_blank" href="https://www.instagram.com/aba_ashoka/">
                    <FaInstagram className="instagram-logo" size={'25px'} />
                </Link>
            </Navbar.Content>


            <Navbar.Collapse showIn={"sm"}>
                {items.map((item, index) => {
                    if(item.name!="FanUpxABA Fantasy")return(
                    <Navbar.CollapseItem key={index} isActive={item.href === active.substring(0, item.href.length + 1)}>
                        <Link href={item.href}
                            css={{
                                minWidth: "100%",
                            }}
                        >
                            {item.name}
                        </Link>
                    </Navbar.CollapseItem>)
})}

            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;