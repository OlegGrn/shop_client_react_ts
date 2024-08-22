import React, {FC} from 'react';
import {IIcon} from "./interfaceSVG";



const PasswordSVG:FC<IIcon> = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32"
             height="32" viewBox="0 0 32 32" data-tags="locked,encryption,login,log in">
            <g fill={color} transform="scale(0.03125 0.03125)">
                <path
                    d="M928 1024h-832c-17.664 0-32-14.304-32-32v-512c0-17.696 14.336-32 32-32h96v-128c0-176.736 143.264-320 320-320s320 143.264 320 320v128h96c17.696 0 32 14.304 32 32v512c0 17.696-14.304 32-32 32zM704 304c0-97.216-85.984-176-192-176s-192 78.784-192 176v144h384v-144z"/>
            </g>
        </svg>
    );
};


export default PasswordSVG;

