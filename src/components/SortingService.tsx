import React, {FC} from 'react';
import styled from "styled-components";
import ProductStore from "../store/productStore";
import BaseStore from "../store/common_class/BaseStore";

interface IServiceList {
    thLabel: (string | number)[]
    store: ProductStore | BaseStore
}


const SortingService: FC<IServiceList> = ({thLabel, store}) => {

    function upSort(ind: number) {
        return function (e:any) {
            e.preventDefault()
            store.sortList(ind + 1, 0)
        }
    }

    function downSort(ind: number) {
        return function (e:any) {
            e.preventDefault()
            store.sortList(ind + 1, 1)
        }
    }

    return (
        <GridBody>
            <li></li>
            {
                thLabel.map((item, ind) => <li key={ind}>
                    <Button
                        onClick={upSort(ind)}
                    >
                        <UpArrow/>
                    </Button>
                    <Button
                        onClick={downSort(ind)}
                    >
                        <DownArrow/>
                    </Button>
                </li>)
            }
        </GridBody>
    );
};

export default SortingService;

const GridBody = styled.ul`
  padding: 25px 0 5px 0;
  display: grid;
  grid-template-columns: 25px repeat(auto-fit, minmax(100px, 1fr));

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`
const UpArrow = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
  transform: translate(0, 25%) rotate(135deg);
`
const DownArrow = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
  transform: translate(0, -25%) rotate(-45deg);
`

const Button = styled.button`
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`

