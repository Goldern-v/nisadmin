import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Calendar from "./Calendar";
import { Button, Icon, DatePicker, message, Spin, Tooltip } from "antd";
import moment from "moment";
import api from "./api";
import { fileDownload } from "src/utils/file/file";
import { Backup, Day, Result } from "./types";
import { Upload } from "src/vendors/antd";
import { deepCopy } from "src/utils/json/clone";
import { authStore } from "src/stores";

export default observer(() => {
  const [current, setCurrent] = useState(moment(new Date));
  const [dataArr, setDataArr] = useState<Day[]>([]);
  const [nurseList, setNurseList]: any[] = useState([]);
  const [floorList, setFloorList]: any[] = useState([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [remarks, setRemarks] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);
  const [isPublish, setIsPublish] = useState(false); //已发布的内容不可编辑
  const [allSelect,setAllSelect]=useState(true)
  // const titleMap: any = {
  //   "1": "护士长值班表",
  //   "2": "门诊夜诊护士值班表",
  //   "3": "产科二值值班表",
  //   "4": "儿科二值值班表"
  // };

  const getData = async () => {
    const timeStr: string = moment(current).format("YYYY-MM");
    const { data } = await api.getScheduleData({
      roundsDate: timeStr
    });
    return data;
  };
  // 构造日历数据
  const statusData = () => {
    setLoading(true);
    const monthStr: string = moment(current).format("YYYY-MM-DD");
    const firstDay = moment(monthStr).startOf("month"); // 本月第一天
    const daysInMonth = firstDay.daysInMonth(); // 本月有几天
    const day: number = firstDay.day(); // 本月第一天为周几  （周一：1  ；周二：2  …… 周日：0）
    let daysArr: any[] = Array.from({ length: (day + 6) % 7 }, () => {
      return { "date": undefined };
    }); // 上个月的几天
    for (let i = 0; i < daysInMonth; i++) {
      const firstDayCopy = moment(monthStr).startOf("month");
      const currentDay = firstDayCopy.add(i, "d");
      daysArr.push({
        date: currentDay,
        roundsDate: currentDay.format("YYYY-MM-DD"),
        roundsTime: "",
        roundsEndTime: "",
        nurseNames: [],
        empNos: [],
        position: [],
        typeDescription: "",
        type: 2
      });
    }
    const _weeks: number = Math.ceil(daysArr.length / 7);
    while (daysArr.length < _weeks * 7) {
      daysArr.push({ "date": undefined });
    }
    setDataArr(daysArr);
    getData().then(data => {
      const qcSectionChief: string[] = data.qcSectionChief || [];
      setIsPublish(qcSectionChief.includes(authStore.user!.empNo));
      const { nurseRoundsSchedules: schedule, backups, description } = data as Result;
      schedule.map((items: any) => {
        items.nurseNames = items.nurseNames ? items.nurseNames.split(",") : [];
        items.empNos = items.empNos ? items.empNos.split(",") : [];
        items.position = items.position ? items.position.split(",") : [];
        /*isPublish 不等于1都是未发布*/
        items.isPublish = items.isPublish === 1 ? items.isPublish : 0;
        items.isCheck = false; //默认所有false
      });
      const temp = daysArr.map((item: any) => {
        if (item.date) {
          const dateStr: string = moment(item.date).format("YYYY-MM-DD");
          const findObj = schedule.find((i: any) => {
            return i.roundsDate === dateStr;
          });
          item = { ...item, ...findObj };
        }
        return item;
      });
      setDataArr(temp);
      setBackups(createBackups(backups));
      setRemarks(description);
      setList(qcSectionChief);
      setLoading(false);
    });
  };
  /**生成backups数据 */
  const createBackups = (backups: any) => {
    if (backups.length === 2) return backups
    const daysInMonth: number = moment(current).daysInMonth(); // 本月有几天
    const dataArr = [{
      startDate: moment(current).format("YYYY-MM-01"),
      endDate: moment(current).format("YYYY-MM-15")
    }, {
      startDate: moment(current).format("YYYY-MM-16"),
      endDate: moment(current).format("YYYY-MM-" + daysInMonth)
    }];
    return dataArr.map(v => {
      const index = backups.findIndex((v1: any) => v1.startData === v.startDate)
      if (index > -1) return backups[index]
      const [s1,s2,s3] = v.startDate.split('-')
      const [e1,e2,e3] = v.endDate.split('-')
      return {
        ...v,
        empNos: "",
        isPublish: 0,
        nurseNames: "",
        startAndEndDate: `${s2}.${s3}-${e2}.${e3}`,
        version: null,
      }
    })
  }

  const updateData = (data: any[]) => {
    setDataArr(data);
  };
  const updateBackups = (data:any[]) => {
    setBackups(data)
  }
  const saveRemarks = async ()=>{
    let params = {
      dictCode: "nurseRoundsScheduleDict",
      itemCode: "nurse_rounds_schedule_description",
      itemName: remarks
    }
    await api.saveRemarks(params);
  }
  // 保存整单
  const handleSave = async () => {
    if (!isPublish) return;
    setLoading(true);
    const dutyRosterList = dataArr.filter((item: any) => item.date);
    await api.saveAllData({nurseRoundsScheduleList: runApi(dutyRosterList), backups});
    saveRemarks()
    message.success("保存成功");
    setLoading(false);
    statusData();
  };
  /*发布*/
  const handleRelease = async (type: string) => {
    if (!isPublish) return;
    const dutyRosterList = dataArr.filter((item: any) => item.date);
    const data = dutyRosterList.filter((item: any) => item.isCheck);
    // if (!data.length) {
    //   return message.info("请选择一个班表");
    // }
    setLoading(true);
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item.roundsTime) {
        message.warning(`${moment(item.roundsDate).format("MM月DD日")}开始时间不能为空`);
        setLoading(false);
        return;
      }
      if (!item.roundsEndTime) {
        message.warning(`${moment(item.roundsDate).format("MM月DD日")}结束时间不能为空`);
        setLoading(false);
        return;
      }
      if (!item.empNos.length) {
        message.warning(`${moment(item.roundsDate).format("MM月DD日")}值班护士长不能为空`);
        setLoading(false);
        return;
      }
      if (!item.position.length) {
        message.warning(`${moment(item.roundsDate).format("MM月DD日")}查房楼层不能为空`);
        setLoading(false);
        return;
      }
    }
    const arr = backups.filter(v => v?.isCheck)
    if (type === "entry") {
      await api.releasePublish({nurseRoundsScheduleList: runApi(data), backups: arr});
    } else {
      await api.releaseUnPublish({nurseRoundsScheduleList: runApi(data), backups: arr});
    }
    message.success(type === "entry" ? "发布成功" : "取消发布成功");
    setLoading(false);
    statusData();
  };
  const runApi = (data: any) => {
    return deepCopy(data).map((item: any) => {
      item.empNos = item.empNos.length ? item.empNos.join(",") : "";
      item.nurseNames = item.nurseNames.length ? item.nurseNames.join(",") : "";
      item.position = item.position.length ? item.position.join(",") : "";
      item.isPublish = item.isCheck ? 1 :0
      return item;
    });
  };
  // 推送
  const handleNotice = async () => {
    if (!isPublish) return;
    setLoading(true);
    const roundsDate: string = moment(current).format("YYYY-MM");
    await api.sendNotice(roundsDate);
    message.success("推送成功");
    setLoading(false);
    statusData();
  };
  const handleExport = async () => {
    if (!isPublish) return;
    const res = await api.exportTable(moment(current).format("YYYY-MM"));
    fileDownload(res);
  };
  const handleTemplate = async () => {
    if (!isPublish) return;
    const res = await api.exportTemplate(moment(current).format("YYYY-MM"));
    fileDownload(res);
  };
  /*全选*/
  const handleAllCheck = () => {
    setAllSelect(!allSelect)
    let list = dataArr.map((item: any) => {
      item.isCheck = !item.isCheck;
      return item;
    });
    setDataArr([...list]);
  };

  useEffect(() => {
    api.getChargeNurse().then(res => {
      setNurseList(res.data);
    });
    api.getAllHosipitalFloor().then((res) => {
      setFloorList(res.data);
    });
  }, []);

  useEffect(() => {
    statusData();
  }, [current]);
  // 导入模板
  const handleUpload = async (info: any) => {
    if (!isPublish) return;
    setLoading(true);
    await api.importTable(info.file, moment(current).format("YYYY-MM")).then(res => {
      message.success(res.desc);
      return statusData();
    }).catch((err) => {
      return message.error(err);
    }).finally(() => {
      setLoading(false);
    });
  };
  return (
    <Wrapper>
      <SearchBar>
        <div className="page-title">
          <Tooltip placement="top" title="灰色日期代表未发布过，绿色日期代表已发布。">
            <img width="30" height="30" alt="" src={require("src/modules/quality/images/icon-待发布@3x.png")} />
          </Tooltip>
          {moment(current).format("YYYY年M月")}{"护士长夜查房排班表"}
        </div>
        <div className="button-group">
          <div className="button">
            <Button disabled={!isPublish} type="primary" onClick={() => handleAllCheck()}>{allSelect?'全选':'取消全选'}</Button>
            <Button disabled={!isPublish} type="primary" onClick={() => handleRelease("entry")}>发布</Button>
            <Button disabled={!isPublish} onClick={() => handleRelease("cancel")}>取消发布</Button>
            <Button type="primary" disabled={!isPublish || loading} onClick={() => handleSave()}>保存</Button>
            <Button className="notice" type="primary" disabled={!isPublish} onClick={() => handleNotice()}>
              <Icon type="bell" theme="filled" />
            </Button>
          </div>
          <DatePicker.MonthPicker disabled={loading} value={current} onChange={(val) => setCurrent(val)}
                                  style={{ marginLeft: "10px", width: "130px" }} />
          <Button disabled={loading} onClick={() => statusData()} type="primary">查询</Button>
          <Upload showUploadList={false} customRequest={handleUpload}>
            <Button type="primary" disabled={!isPublish}>导入</Button>
          </Upload>
          {/*<Button disabled={!isPublish} onClick={() => handleExport()}>导出</Button>*/}
          <Button disabled={!isPublish} onClick={() => handleTemplate()}>导出模版</Button>
        </div>
      </SearchBar>
      <MainWrapper>
        <div className="calendar-wrapper">
          <SpinCon>
            {loading ? (
              <div className="LoadingCon">
                <Spin spinning={loading} className="SpinLoadingClass" />
              </div>
            ) : (
              ""
            )}
          </SpinCon>
          <Calendar
            data={dataArr}
            updateData={updateData}
            nurseList={nurseList}
            floorList={floorList}
            backups={backups}
            updateBackups={updateBackups}
            description={remarks}
            setRemarks={setRemarks}
            dateMonth={current}
            statusData={statusData}
            list={list}
          />
        </div>
      </MainWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  padding: 0 10px 10px;
`;

const SearchBar = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-title {
    font-weight: bold;
    font-size: 22px;
  }

  .button-group {
    display: flex;
    align-items: center;

    button {
      margin-left: 10px;
      //width: 75px;
    }
  }
`;

const MainWrapper = styled.div`
  background: #fff;
  height: calc(100% - 50px);
  overflow-y: auto;

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

  .calendar-wrapper {
    height: calc(100%);
    position: relative;
  }
`;

const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.7);

    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
