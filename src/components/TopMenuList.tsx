import React, {FC, useContext} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {baseTheme} from "../styles/theme";
import {Context} from "../contexts";


interface ITopMenuList{
    menuList: {
        name: string
        path: string
    }[]
}

const TopMenuList: FC<ITopMenuList> = ({menuList}) => {

    const store: any = useContext(Context);
    const controlBurger = store.burger
    const isActiveBurger = controlBurger.isActiveBurger();

    const clickLink = () => {
        if(isActiveBurger) {
            controlBurger.click()
        }
    }
    return (
        <Ul>{
            menuList.map(item => <Li key={item.name}>
                <NavLink
                    onClick={clickLink}
                    to={item.path}
                >{item.name}
                </NavLink>
            </Li>)
        }
        </Ul>
    );
};

export default TopMenuList;

const Ul = styled.ul`
  display: flex;
  justify-content: start;
  gap: 10px;
  flex-wrap: wrap; 
    


  @media (${baseTheme.maxMedia.tablet768}) {  
    padding-bottom: 10px;
    flex-direction: column;
    gap: 0;
  }

`;

const Li = styled.li`
    color: ${baseTheme.colors.menu_list.font};

    @media (${baseTheme.maxMedia.tablet768}) {
        background-color: ${baseTheme.colors.burgerMenu.bg1n};
        &:nth-child(2n) {
            background-color: ${baseTheme.colors.burgerMenu.bg2n};
        }
        
    }

    & a {
        color: inherit;
        display: block;
        padding: 15px 30px;
        
        // анимация рамки
        transition-duration: 0.3s;
        transition-property: all;
        box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0);
        transform: translateZ(0);


        @media (${baseTheme.minMedia.tablet768}) {
            display: inline-block;

            &.active {                
                background-color: #efc564;
                border-radius: 5px;
                color: black;
            }

            &:hover:not(.active) {                
                color: #929296;
            }
        }

        @media (${baseTheme.maxMedia.tablet768}) {
          font-size: 25px;
            padding: 1em 1em 1em 0.5em;
            
            &.active{
                background-color: darkgoldenrod;
                color: #262729;
            }
        }
    }
`;