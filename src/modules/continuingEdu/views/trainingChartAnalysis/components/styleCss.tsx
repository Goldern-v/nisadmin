import styled from "styled-components";

export const Content = styled.div`
  text-align: center;
  width: 100%;
  .echarts-body {
    .echarts-for-react {
      height: 680px !important;
    }
  }

  .chart-img-page {
    display: none;
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
      height: 500px;
    }
  }
`;
export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 25px 0;
`;
export const ChartCon = styled.div.attrs({
  height: 0,
})`
  padding: 5px 20px 0 20px;
  position: relative;
`;
