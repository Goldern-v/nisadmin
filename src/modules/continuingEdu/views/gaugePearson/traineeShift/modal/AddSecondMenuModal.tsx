import styled from "styled-components";
import React, { useState } from "react";
import { Modal, message as Message } from "antd";
import YearPicker from "src/components/YearPicker";
import moment from "moment";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from './../TraineeShiftModal';

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
  setTitleList:Function;
  titleList?:any
}

export default function AddSecondMenuModal(props: Props) {
  const { visible, onCancel, onOk,setTitleList,titleList } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [beginYear, setBeginYear]: any = useState(moment().format("YYYY")); // 创建开始年份

  // 保存
  const checkForm = () => {
    let obj = {
      beginYear,
      endYear: moment(beginYear).add(1, "y").format("YYYY")+'-01-01'
    };
    // Message.success("创建成功");
    //     onOk();
    //     return false
    setEditLoading(true);
    traineeShiftApi
      .createScheduleSheet(obj)
      .then(res => {
        setEditLoading(false);
        Message.success("创建成功");
        traineeShiftModal.sheetId = res.data.id
        traineeShiftModal.sheetName = res.data.title
        titleList.unshift(res.data)
        setTitleList(titleList)
		      // settitleCurr(res.data.title)
        onOk();
      })
      .catch((e: any) => {
        console.log(e);
        setEditLoading(false);
      });
  };

  // 关闭取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width="500px"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      onOk={checkForm}
      confirmLoading={editLoading}
      title="创建规培生轮科"
    >
      <Wrapper>
        <div className="tips">确定是否创建，创建后无法删除</div>
        <div className="yearPicker">
          <YearPicker
            style={{ width: 120 }}
            allowClear={false}
            value={moment(beginYear)}
            onChange={(_moment: any) => setBeginYear(_moment.format("YYYY"))}
          />
          <span> —— </span>
          <YearPicker
            disabled
            style={{ width: 120 }}
            allowClear={false}
            value={moment(beginYear).add(1, "y")}
          />
        </div>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .tips {
    font-size: 15px;
    margin-bottom: 15px;
  }
  .yearPicker {
    span {
      margin: 0 12px;
    }
  }
`;
