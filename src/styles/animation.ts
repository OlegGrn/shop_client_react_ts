import {keyframes} from 'styled-components'

// анимация тряски вертикальной
export const wobble_vertical = keyframes`
  16.65% {
    transform: translateY(4px);
  }
  33.3% {
    transform: translateY(-2px);
  }
  49.95% {
    transform: translateY(1px);
  }
  66.6% {
    transform: translateY(-0px);
  }
  83.25% {
    transform: translateY(1px);
  }
  100% {
    transform: translateY(0);
  }
`;

// анимация исчезновения
export const fade = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const jump = keyframes`
  from {
    transform: translate(0%, 10%);
  }
  to {
    transform: translate(0%, 0%);
  }
`;

export const slip = keyframes`
    from{
      right: 0;
    }
    to {
      right: -80%;
    }
`




