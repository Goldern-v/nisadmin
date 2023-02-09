import DeptSelect from 'src/components/DeptSelect'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import emitter from 'src/libs/ev'
import service from 'src/services/api'
import styled from 'styled-components'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, message } from 'antd'
import { appStore } from 'src/stores'

export interface Props extends RouteComponentProps {
}

export default function ToolBar() {

  return (
    <div>
      <BreadcrumbBox
        data={[
          {
            name: "排班管理",
            link: "/personnelManagement/arrangeHome"
          },
          {
            name: "排班人员设置"
          }
        ]}
      />

      <Wrapper>
        <Title>排班人员设置</Title>
        <div style={{ flex: 1 }} />

        <DeptSelect onChange={() => {
        }} />
        {
          appStore.hisMatch({
            map: {
              'whyx,whhk': <Button onClick={(e: any) => {
                emitter.emit("全部列入排班");
              }} style={{ marginLeft: 3, marginRight: 3 }}> 全部列入排班</Button>,
              default: ""
            },
            vague:true
          })
        }

        <Button
          onClick={(e: any) => {
            emitter.emit("添加排班人员");
          }}
          style={{
            marginLeft: 3,
            marginRight: 3,
          }}
        >
          {
            appStore.hisMatch({
              map: {
                'wh,gzsrm,lyyz,qhwy,whsl,ytll,dglb,dghm': '添加',
                hj: '添加实习护士',
                "nys,lcey": '添加排班人员',
                'whyx,whhk': "添加实习/进修生护士",
                default: '添加实习护士',
              },
              vague: true
            })
          }
        </Button>

        <Button
          onClick={(e: any) => {
            // 获取选中人员
            // console.log('获取选中人员', e)
            // return
            emitter.emit("获取选中人员列表", (userList: any) => {
              let list = userList
                .map((item: any, key: number) => ({
                  ...item,
                  key,
                  sortValue: key + 1
                }))
                .filter((item: any) => item.empName);
              return service.scheduleUserApiService.save(list).then(res => {
                message.success("保存排班人员设置成功");
              });
            });
          }}
          style={{ marginLeft: 3, marginRight: 3 }}
        >
          保存
        </Button>
        <Button
          onClick={(e: any) => {
            emitter.emit("刷新人员列表");
          }}
          style={{ marginLeft: 3, marginRight: 3 }}
        >
          刷新
        </Button>
        <Button
          style={{ marginLeft: 3, marginRight: 3 }}
          onClick={() =>
            appStore.history.push("/personnelManagement/arrangeHome")
          }
          className="button-tools"
        >
          返回
        </Button>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: auto;
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
