import React, {FC} from 'react';
import styled from "styled-components";
import {madeListWithPoints} from "../utils/madeListWithPoints";
import MyArrowBorder from "./ui/MyArrowBorder";
import {baseTheme} from "../styles/theme";

interface IQuantityPages {
    listPages: number[];
    changePage: any
    currentPage: number
}

const QuantityPages: FC<IQuantityPages> = (
    {listPages, changePage, currentPage}) => {

    console.log(
        "render QuantityPages "
    )

    let currentList = madeListWithPoints(listPages, currentPage)

    const widthArrow: string = "30%";
    const widthCircle: string = "100%";

    const prevPage = (currentPage: number) => {
        return function () {
            if (currentPage === 1) return
            changePage(currentPage, currentPage - 1)
        }
    }
    const nextPage = (currentPage: number, listPages: number[]) => {
        return function () {
            if (currentPage === listPages.length) return
            changePage(currentPage, currentPage + 1)
        }

    }

    return (
        <BodyContent>
            <Ul>
                <li>
                    {currentList.length > 1 && <MyArrowBorder
                        moveOnePage={prevPage(currentPage)}
                        widthArrow={widthArrow}
                        widthCircle={widthCircle}
                        direction={"prev"}/>}
                </li>
                {currentList.map((page, ind) => <li
                        key={ind}>
                        {typeof page === "string"
                            ? <Span>{page}</Span>
                            : <Button
                                $choose={page === currentPage}
                                onClick={() => changePage(currentPage, page)}
                            >
                                {page}
                            </Button>}
                    </li>
                )}
                <li>
                    {currentList.length > 1 && <MyArrowBorder
                        moveOnePage={nextPage(currentPage, listPages)}
                        widthArrow={widthArrow}
                        widthCircle={widthCircle}
                        direction={"next"}/>}
                </li>
            </Ul>
        </BodyContent>

    );
};

export default QuantityPages;

// увеличиваем все размеры одним свойством font-size у BodyContent
const BodyContent = styled.div`
    font-size: 16px;
    display: flex;    
    justify-content: start;
    align-items: center;    
    padding: 0 20px;
`

const Button = styled.button<{ $choose: boolean }>`
    font-size: 1em;   
    //background-color: ${baseTheme.colors.adminPanel.button.bg};
    background-color: ${({$choose}) => $choose 
            ? baseTheme.colors.adminPanel.button.bg 
            : "transparent"
};
    
    color: ${({$choose}) => $choose 
            ? baseTheme.colors.pages.font_active 
            : "inherit"};
    width: 100%;
    height: 100%;
    font-weight: bold;    
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover{
        color: ${baseTheme.colors.pages.font_hover };
    }
   
    
    
    
`
const Span = styled.span`
    display: flex;    
    height: 100%;
    align-items: end;
    font-weight: 600;
    
    
    
    
`
const Ul = styled.ul`
    display: flex;
    gap: 1em;
    li {
        text-align: center;
        width: 1.8em;
        height: 1.8em;
        flex-basis: 0;
        flex-grow: 1;

    }
`