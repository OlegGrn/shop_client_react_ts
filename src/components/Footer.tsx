import React from 'react';
import styled from "styled-components";
import {baseTheme} from "../styles/theme";




const Footer  = () => {
    return (
        <FooterBody>
            
        </FooterBody>
    );
};

export default Footer;

const FooterBody = styled.footer`
  height: 100px;
  background-color: ${baseTheme.colors.footer.bg};
`

