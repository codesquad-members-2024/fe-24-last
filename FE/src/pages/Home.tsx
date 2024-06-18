import React from "react";
import styled from "styled-components";
const Home = () => {
    return <HomeStyle>
        <pre>{`	
    nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn	
    nnnn                         nnnn	
    nnnnnnn                          nnnn	
    nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn	
    nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn	
    nnnnnnnn                           nnn	
    nnnnnnnn    nnnnnnnn     nnnnnnn   nnn	
    nnnnnnnn      nnnnnnn      nnn     nnn	
    nnnnnnnn      nnnnnnnn     nnn     nnn	
    nnnnnnnn      nnnnnnnnnn   nnn     nnn	
    nnnnnnnn      nnn nnnnnnn  nnn     nnn	
    nnnnnnnn      nnn  nnnnnnnnnnn     nnn	
    nnnnnnnn      nnn   nnnnnnnnnn     nnn	
    nnnnnnnn      nnn     nnnnnnnn     nnn	
    nnnnnnnn      nnn      nnnnnnn     nnn	
    nnnnnnnn    nnnnnnnn    nnnnnn     nnn	  
      nnnnnn                           nnn		
        nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn		
          nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    `}</pre>
    노션 HOME 입니다!
    </HomeStyle>;
};

export default Home;

const HomeStyle = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center
    
`


