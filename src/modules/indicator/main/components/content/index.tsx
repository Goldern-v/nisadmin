import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Radio} from "antd";
import BaseTable from "src/components/BaseTable";
import {crrentMonth} from "src/utils/moment/crrentMonth";
import {IModal} from "src/modules/indicator/main/interface";
import ChartComponent from './chartComponent'

interface Props {
  modal: IModal
}

export default observer(function Content(props: Props) {
  let [showType, setShowType] = useState('详情');

  const onLoad = async () => {
    let currentRouteName = props.modal.name;

  }

  return (
    <Wrapper>
      {/* 头部 */}
      <ContentHead>
        <div className='title-wrapper'>
          <div className='title'>{`${props.modal.name}`}</div>
        </div>
        <div className='radio-group'>
          <Radio.Group
            value={showType}
            buttonStyle="solid"
            onChange={(e: any) => {
              setShowType(e.target.value)
            }}
          >
            <Radio.Button value="详情">详情</Radio.Button>
            <Radio.Button value="图表">图表</Radio.Button>
          </Radio.Group>
        </div>
      </ContentHead>

      {/* 主体 （表格部分） */}
      <ContentBody>
        {showType === "详情" && (
          <BaseTable
            rowKey="index"
            loading={props.modal.isLoading}
            wrapperStyle={{padding: 0}}
            dataSource={props.modal.dataList}
            columns={props.modal.tableColumn}
            surplusHeight={250}
            surplusWidth={0}
          />
        )}
        {showType === "图表" && (
          <ChartComponent dataSource={props.modal.dataList}/>
        )}
      </ContentBody>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContentHead = styled.div`
  display: flex;
  .title-wrapper{
    flex: 1;
    margin-bottom: 10px;

    .title{
      font-size: 20px;
      color: #333;
      font-weight: bold;
      text-align: center;
    }
    .date{
      font-size: 13px;
      color: #333;
      text-align: center;
    }  
  }
`

const ContentBody = styled.div`
  flex: 1;
`