import React, {FC} from 'react';
import styled from "styled-components";

interface IMySwitch {
    width: string
    height: string
    name: string
    isChecked: boolean,
    funcOnChange: any,
    colorCircle?: string,
    colorYes?: string,
    colorNo?: string,
    colorFont?: string
}

const MySwitch: FC<IMySwitch> = (
    {
        width,
        height,
        colorNo,
        colorYes,
        colorCircle,
        colorFont,
        name,
        isChecked,
        funcOnChange
    }) => {

    return (
        <Switch $width={width}
                $height={height}
                $colorCircle={colorCircle ? colorCircle : "#262729"}
                $colorNo={colorNo ? colorNo : "rgba(146, 146, 150, 0.5)"}
                $colorYes={colorYes ? colorYes : "#EFC564"}
                $colorFont={colorFont ? colorFont : "inherit"}
        >
            <input type={"checkbox"}
                   name={name}
                   onChange={funcOnChange}
                   checked={isChecked}
            />
            <label>
                <span></span>
            </label>
        </Switch>
    );
};
export default MySwitch;


const Switch = styled.form<
    {
        $width: string,
        $height: string,
        $colorCircle: string,
        $colorNo: string,
        $colorYes: string,
        $colorFont: string
    }>`
  width: ${({$width}) => $width};
  height: ${({$height}) => $height};
  position: relative;
  transition: all 0.3s ease-in 0s;

  font-size: calc(${({$height}) => $height} / 2.5);
  font-weight: 400;

  color: ${({$colorFont}) => $colorFont};

  font-family: Helvetica, Arial, sans-serif;


  & input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
    cursor: pointer;

    &:checked ~ label {
      & span {
        transform: translateX(calc(${({$width}) => $width} - 100%));
      }
    }
  }

  & label {
    width: 100%;
    height: 100%;
    background-color: ${({$colorNo}) => $colorNo};


    border-radius: calc(${({$height}) => $height} / 2);
    overflow: hidden;

    display: flex;
    justify-content: start;
    align-items: center;
    transition: all 0.3s ease-in 0s;

    &:after {
      content: "Нет";
      font-family: inherit;
      text-transform: uppercase;
      font-weight: bold;

      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: calc(${({$height}) => $height});
    }

    & span {
      display: block;
      height: ${({$height}) => $height};
      width: ${({$height}) => $height};
      transition: all 0.2s ease-in 0s;
      position: relative;
      z-index: 2;

      &:before {
        content: "ДA";
        font-family: inherit;
        text-transform: uppercase;
        font-weight: bold;

        width: calc(${({$width}) => $width} - ${({$height}) => $height} / 2);
        padding-right: calc(${({$height}) => $height} / 2);
        height: 100%;

        background-color: ${({$colorYes}) => $colorYes};

        position: absolute;
        top: 0;
        right: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
        background: ${({$colorCircle}) => $colorCircle};
      }
    }
  }
`