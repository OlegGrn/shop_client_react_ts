import React, {FC} from 'react';
import styled from "styled-components";
import MyCheckBox from "./MyCheckBox";
import {baseTheme} from "../../styles/theme";



interface ITableProduct {
    //list: any[][]
    list: (number | string)[][]
    thLabel: string[]
    heightScroll?: number
}

const MyTable: FC<ITableProduct> =  (
    {list, thLabel, heightScroll}) => {

    console.log(list)


    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th></th>
                    {thLabel.map(item => <th key={item}>{item}</th>)}
                </tr>
                </thead>
            </Table>
            <ScrollDiv $height={heightScroll? `${heightScroll}px`: "70vh"}>
                <Table>
                    <Tbody>
                    {
                        list.map(data => <tr key={data[0]}>
                            {data.map((item, ind) =>
                                ind === 0
                                    ? <td key={ind}>
                                        <MyCheckBox name={"id"} value={item}/>
                                    </td>
                                    : ind <= thLabel.length
                                        ? <td key={ind}>{item}</td>
                                        : null
                            )}
                        </tr>)
                    }
                    </Tbody>
                </Table>
            </ScrollDiv>
        </>


    );
};

export default MyTable;

const ScrollDiv = styled.div<{$height: string}>`
    //height: 300px;
    height: ${({$height}) => $height};
    overflow-x: auto;
    
`

const Table = styled.table`

    width: 100%;   
    color: ${baseTheme.colors.table.font};
    border-collapse: collapse;

    thead {
        display: block;
    }

    th {
        font-size: 24px;
        font-weight: 300;
        color: ${baseTheme.colors.table.font_th};
    }

    tr {
        display: grid;
        grid-template-columns: 40px repeat(auto-fit, minmax(100px, 1fr));

        td {
            padding: 10px 5px;
            border: 1px solid ${baseTheme.colors.table.line};            

            &:first-child {
                padding: 20%;
            }
        }
    }
`
const Tbody = styled.tbody`
    background-color: ${baseTheme.colors.table.bg};
    overflow-y: hidden;
    
`





