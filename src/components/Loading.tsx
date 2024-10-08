import React from 'react';
import styled from "styled-components";

const Loading = () => {

    console.log("render Loading")
    return (
        <Loader>
            
        </Loader>
    );
};

export default Loading;

const Loader = styled.div`
  display: inline-block;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

