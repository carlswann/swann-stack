import { createGlobalStyle } from 'styled-components';
import { colors } from './variables';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const GlobalStyle = createGlobalStyle`
  // ==============================|| LIGHT BOX ||============================== //
  .fullscreen .react-images__blanket {
      z-index: 1200;
  }

  // ==============================|| APEXCHART ||============================== //

  .apexcharts-legend-series .apexcharts-legend-marker {
      margin-right: 8px;
  }

  // ==============================|| PERFECT SCROLLBAR ||============================== //

  .scrollbar-container {
      .ps__rail-y {
          &:hover > .ps__thumb-y,
          &:focus > .ps__thumb-y,
          &.ps--clicking .ps__thumb-y {
              background-color: ${colors.grey500};
              width: 5px;
          }
      }
      .ps__thumb-y {
          background-color: ${colors.grey500};
          border-radius: 6px;
          width: 5px;
          right: 0;
      }
  }

  .scrollbar-container.ps,
  .scrollbar-container > .ps {
      &.ps--active-y > .ps__rail-y {
          width: 5px;
          background-color: transparent !important;
          z-index: 999;
          &:hover,
          &.ps--clicking {
              width: 5px;
              background-color: transparent;
          }
      }
      &.ps--scrolling-y > .ps__rail-y,
      &.ps--scrolling-x > .ps__rail-x {
          opacity: 0.4;
          background-color: transparent;
      }
  }


  // ==============================|| MUI DATA GRID ||============================== //

  /* 
    The MUI Data Grid doesn't wrap text by default for some reason :s
    So weird that we have to do this. Might replace the data grid soon, idk.
  
    Ref :: https://github.com/mui/mui-x/issues/417
  */
  .MuiDataGrid-viewport,
  .MuiDataGrid-row,
  .MuiDataGrid-renderingZone {
    max-height: fit-content !important;
  }
  
  .MuiDataGrid-cell {
    max-height: fit-content !important;
    overflow: auto;
    white-space: initial !important;
    line-height: 16px !important;
    display: flex !important;
    align-items: center;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  // ==============================|| ANIMATION KEYFRAMES ||============================== //

  @keyframes wings {
      50% {
          transform: translateY(-40px);
      }
      100% {
          transform: translateY(0px);
      }
  }

  @keyframes blink {
      50% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }

  @keyframes bounce {
      0%,
      20%,
      53%,
      to {
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: translateZ(0);
      }
      40%,
      43% {
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          transform: translate3d(0, -5px, 0);
      }
      70% {
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          transform: translate3d(0, -7px, 0);
      }
      80% {
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: translateZ(0);
      }
      90% {
          transform: translate3d(0, -2px, 0);
      }
  }

  @keyframes slideY {
      0%,
      50%,
      100% {
          transform: translateY(0px);
      }
      25% {
          transform: translateY(-10px);
      }
      75% {
          transform: translateY(10px);
      }
  }

  @keyframes slideX {
      0%,
      50%,
      100% {
          transform: translateX(0px);
      }
      25% {
          transform: translateX(-10px);
      }
      75% {
          transform: translateX(10px);
      }
  }
`;

export default GlobalStyle;
