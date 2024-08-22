import React from 'react';
import styled from "styled-components";

const Preloader = () => {
    return (
        <PreloadingBlock>
            <svg width="65" height="65" viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
                {/* Нижний круг с чёрточками*/}
                <CircleDown cx="32" cy="32" r="25"/>
                {/*Верхний круг с одной видимой полоской*/}
                <CircleUp transform="rotate(-90 32 32)" cx="32" cy="32" r="25">
                    {/* Анимация бегущей полоски*/}
                    <animate attributeName="stroke-dashoffset"
                             values="0;143.92;130.84;117.76;104.68;91.6;78.52;65.44;52.36;39.28;26.22;13.14;0" dur="3s"
                             repeatCount="indefinite" calcMode="discrete"/>
                </CircleUp>

            </svg>
        </PreloadingBlock>
    );
};

export default Preloader;

const PreloadingBlock = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

// style="stroke:#ABB7E0; fill:none;  stroke-width:15;//  stroke-dasharray:3 10.08;"
const CircleDown = styled.circle`
  stroke: #ABB7E0;
  fill: none;
  stroke-width: 15;
  stroke-dasharray: 3 10.08;
`

//style="stroke:#ffffff; fill:none;  stroke-width:15; stroke-dasharray:3 154; stroke-dashoffset: 157"
const CircleUp = styled.circle`
  stroke: #ffffff;
  fill: none;
  stroke-width: 15;
  stroke-dasharray: 3 154;
  stroke-dashoffset: 157
`

/*
Решение основано на анимации stroke-dashoffset
stroke-dasharray разбивает круг на 12 необходимых для прелоадера полосок.
 1. Расчёт параметров:
 Нижняя окружность, поделенная на 12 сегментов
При радиусе 25px длина окружности равна - 2 * 3.14 * 25 = 157px
Один сегмент равен 157 / 12 = 13.08 или 3 + 10.08
stroke-dasharray = 3 10.08, где 3px длина черты, 10.08px пробел

Анимация бегущего сегмента верхней окружности, достигается с помощью изменения
stroke-dashoffset (отступа от начала линии) равному длине одного сегмента
*/

