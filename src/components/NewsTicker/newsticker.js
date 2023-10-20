import React from 'react';
import Marquee from 'react-fast-marquee';
const NewsTicker = () => {
  return (
    <Marquee
      pauseOnHover={true}
      speed={50}
      style={{
        background: 'white',
        color: 'black',
        paddingTop: '7px',
        paddingBottom: '8px',
        borderTop:"1px black",
        fontFamily:"fantasy"
      }}
      gradientColor={[255, 255, 255]}
      gradientWidth={'15%'}
    >
      <p
        style={{
          fontSize: '20px',
          fontWeight: "500",
          paddingRight: '2px',
          paddingLeft: '2px',
        }}
      >
        The auction is now live! Head on over to the sports block and join in on the action!
      </p>
    </Marquee>
  );
};

export default NewsTicker;