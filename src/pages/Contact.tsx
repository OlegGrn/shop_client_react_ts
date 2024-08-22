import React from 'react';
import styled from "styled-components";
import MyCopyField from "../components/ui/MyCopyField";


const Contact = () => {
    return (
        <div style={{marginTop: "100px"}}>
            <H1>Олег Грудин</H1>
            <MyCopyField value={"grudinoleg@gmail.com"}/>
        </div>


    );
};

export default Contact;

const H1 = styled.h1`
  font-size: 1.7em;
  font-weight: bold;
  margin-bottom: 1em;
`

