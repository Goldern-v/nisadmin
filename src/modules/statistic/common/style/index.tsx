import styled from "styled-components"

export const DetailCon = styled.div`
height: calc(100vh - 50px);
display: flex;
flex-direction: column;
`
export const TableCon: any = styled.div`
flex: 1;
height: 0;
margin: ${(p) => p.theme.$margin};
padding: ${(p) => p.theme.$margin};
box-shadow: ${(p) => p.theme.$shadow};
background-color: #fff;
border-radius: 5px;
position: relative;
overflow: auto;
.buttonCon {
  position: absolute;
  top: 10px;
  right: 10px;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #ffffff;
  border-radius: 5px;
  background-color: #ffffff;
}
.title {
  text-align: center;
  font-size: 21px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
`
export const SearchCon: any = styled.div`
display: flex;
align-items: center;
height: 45px;
line-height: 45px;
padding-left: 14px;
background: rgba(248, 248, 248, 1);
box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
.ant-select {
  min-width: 60px;
}
>* + * {
  margin-left: 10px;
}
`
export const Spacing = styled.div`
width: 20px;
`