import React, {FC} from 'react';
import {IIcon} from "./interfaceSVG";



const Login2SVG:FC<IIcon> = ({color}) => {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32"
             height="32" viewBox="0 0 32 32" data-tags="user,profile,avatar,head">
            <g fill={color} transform="scale(0.03125 0.03125)">
                <path
                    d="M0 1024v-96c0-143.488 180.768-197.728 419.168-219.584-52.352-32.448-93.44-123.648-114.848-196.48-0.096-0-0.192 0.064-0.32 0.064-2.176 0-48-57.312-48-128 0-62.016-4.416-113.728 32.224-125.44-0.032-0.864-0.224-1.696-0.224-2.56 0-78.624 40.672-147.52 101.984-187.488 15.84-39.52 64.128-68.512 122.016-68.512s106.176 28.992 122.016 68.512c61.312 39.968 101.984 108.864 101.984 187.488 0 0.864-0.192 1.696-0.224 2.56 36.64 11.712 32.224 63.424 32.224 125.44 0 70.688-50.816 128-48 128-0.128 0-0.224-0.064-0.32-0.064-21.408 72.8-62.496 164.032-114.848 196.48 238.4 21.856 419.168 74.080 419.168 219.584v96h-1024z"/>
            </g>
        </svg>


    );
};

export default Login2SVG;

