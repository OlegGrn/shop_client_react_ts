import React from 'react';
import styled from 'styled-components'
import Container from "./Container";
import NavBar from "./NavBar";
import {baseTheme} from "../styles/theme";





const Header = () => {


    return (
        <HeaderBody>
            <Container>
                <NavBar/>
            </Container>
        </HeaderBody>
    );
};

export default Header;

const HeaderBody = styled.div`
  background: ${baseTheme.colors.header.bg};
  color: ${baseTheme.colors.font.main};  
 
  position: sticky;
  top: 0;
  z-index: 2;
    
  
  
  
`