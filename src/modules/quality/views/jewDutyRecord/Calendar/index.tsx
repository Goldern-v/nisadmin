import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { Select, Input, TimePicker, message, Checkbox } from "antd";
import api from "src/modules/quality/views/dutyRecord/api";
import { Backup } from "../types";
import { authStore } from "src/stores";
import classNames from "classnames";

const { TextArea } = Input;

interface Props {
  data: any[];
  nurseList: any[];
  floorList: any[];
  updateData: Function;
  description: string;
  backups: any[];
  updateBackups: Function;
  dateMonth: any;
  statusData: Function;
  setRemarks: Function;
  list: string[];
}

export default observer((props: Props) => {
  const { data, nurseList, updateData, floorList, description, backups, dateMonth, statusData, list, updateBackups,setRemarks } = props;
  let disabled: boolean = list.includes(authStore.user!.empNo);
  const typeList = ["自下而上", "自上而下", ""];
  const [weeks, setWeeks] = useState<number>(5); // 当前月跨多少个周
  // 日历（每天，组件）
  const DayCmp = (day: any, key: string) => {
    // console.log("day===",data);
    const date: string = day.date ? day.date.format("MM月DD号") : "";
    const weekArr: string[] = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    const [, week]: any = key.split("-");
    // 下拉更改
    const handleChange = (val: any, option: any, key?: string) => {
      /*多选*/
      if (option instanceof Array) {
        if (option.length > 2 && key === "empNo") {
          message.warning("当前选择最大为2项！");
          return;
        }
        const newData = data.map((item: any) => {
          if (item.date === day.date) {
            if (key === "empNo") {
              item.empNos = val;
              item.nurseNames = option.map((oItem: any) => oItem.props.children);
            }
            // else if (key === "floor") {
            //   item.position = [val];
            // }
          }
          return item;
        });
        updateData(newData);
      } else {
        /*单选*/
        const newData = data.map((item: any) => {
          if (item.date === day.date) {
            if (key === "type") {
              item.type = val;
              item.typeDescription = typeList[item.type];
            }
            if (key === "floor") {
              item.position = [val];
            }
          }
          return item;
        });
        updateData(newData);
      }
    };
    // 查房时间更改
    const changeTime = (time: moment.Moment, timeString: string, key: string) => {
      const newData = data.map((item: any) => {
        if (day.date == item.date) {
          item[key] = timeString;
        }
        return item;
      });
      updateData(newData);
    };
    const handleCheck = (value: any) => {
      const arrData = data.map((item: any) => {
        if (item.roundsDate == day.roundsDate) {
          item.isCheck = value;
          // item.isPublish = value ? 1 : 0;
        }
        return item;
      });
      updateData(arrData);
    };
    const selectTime = ['20:30—3:30', '21:30—4:30', '21:00—04:00']
    const handleSelectTime = (value: any, key: string) => {
      const newData = data.map((item: any) => {
        if (day.date == item.date) {
          item.roundsTime = value.split('—')[0];
          item.roundsEndTime = value.split('—')[1];
          console.log(item, value.split('—')[0], value.split('—')[1]);
        }
        return item;
      });
      updateData(newData);
    }
    return (
      <DayWrapper key={key}>
        {/*isPublish 1就是已发布，其他未发布  灰色 ：待发布  绿色 已发布*/}
        <div className={classNames({
          "date": true,
          "released": day.isPublish !== 1
        })}>
          {day.empNos && <Checkbox
            style={{ marginRight: "5px" }}
            onChange={(e) => handleCheck(e.target.checked)}
            checked={day.isCheck}>
          </Checkbox>}
          {date}{weekArr[week]}</div>
        <div className="week">
          {day.date &&
            <React.Fragment>
              <Select
                showSearch
                dropdownClassName="dropdown-class"
                className="black-bold"
                placeholder="请选择"
                onChange={(value: any) => handleSelectTime(value, key)}
                value={(day.roundsTime || day.roundsEndTime) ? [`${day.roundsTime}-${day.roundsEndTime}`] : []}
                disabled={!disabled || (day.isPublish == 1)}
                optionFilterProp="children"
                filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {selectTime.map((user: any) => {
                  return <Select.Option style={{ fontWeight: 'bold', color: '#000' }} value={user} key={`empNo${user}`}>{user}</Select.Option>;
                })}
              </Select>
              {/*<TimePicker*/}
              {/*  size="small"*/}
              {/*  value={day.roundsTime ? moment(day.roundsTime, "HH:mm") : undefined}*/}
              {/*  format="HH:mm"*/}
              {/*  allowClear={false}*/}
              {/*  disabled={!disabled || (day.isPublish == 1)}*/}
              {/*  placeholder={"开始时间"}*/}
              {/*  onChange={*/}
              {/*    (time: moment.Moment, timeString: string) => changeTime(time, timeString, "roundsTime")*/}
              {/*  }*/}
              {/*/>*/}
              {/*{<span className="connect" style={{ color: "#333" }}>-</span>}*/}
              {/*<TimePicker*/}
              {/*  size="small"*/}
              {/*  value={day.roundsEndTime ? moment(day.roundsEndTime, "HH:mm") : undefined}*/}
              {/*  format="HH:mm"*/}
              {/*  disabled={!disabled || (day.isPublish == 1)}*/}
              {/*  allowClear={false}*/}
              {/*  placeholder={"结束时间"}*/}
              {/*  onChange={(time: moment.Moment, timeString: string) => changeTime(time, timeString, "roundsEndTime")*/}
              {/*  }*/}
              {/*/>*/}
            </React.Fragment>
          }
        </div>
        <div className="person">
          {
            day.date && (
              <div className="select-context">
                <div>
                  <Select
                    showSearch
                    placeholder="选择值班护士长"
                    className="black-bold"
                    mode="multiple"
                    value={day.empNos}
                    onChange={(val: any, option: any) => handleChange(val, option, "empNo")}
                    disabled={!disabled || (day.isPublish == 1)}
                    optionFilterProp="children"
                    filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {nurseList.map((user: any) => {
                      return <Select.Option style={{ fontWeight: 'bold', color: '#000' }} value={user.empNo} key={`empNo${user.empNo}`}>{user.empName}</Select.Option>;
                    })}
                  </Select>
                </div>
                <div className='floor-mar' style={!authStore.isDepartment ? { pointerEvents: "none" } : {}}>
                  <Select
                    showSearch
                    value={day.position}
                    onChange={(val: any, option: any) => handleChange(val, option, "floor")}
                    optionFilterProp="children"
                    disabled={!disabled || (day.isPublish == 1)}
                    placeholder="请选择楼层"
                    className="black-bold"
                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {floorList.map((floor: any) => {
                      return <Select.Option style={{ fontWeight: 'bold', color: '#000' }} value={floor} key={`floor${floor}`}>{floor}</Select.Option>;
                    })}
                  </Select>
                </div>
                <div>
                  <Select
                    showSearch
                    value={day.type}
                    placeholder="请选择方式"
                    className="black-bold"
                    disabled={!disabled || (day.isPublish == 1)}
                    onChange={(val: any, option: any) => handleChange(val, option, "type")}
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {typeList.map((x: string, index: number) => {
                      return <Select.Option style={{ fontWeight: 'bold', color: '#000' }} value={index} key={index}>{x}</Select.Option>;
                    })}
                  </Select>
                </div>
              </div>
            )
          }
        </div>
      </DayWrapper>
    );
  };
  // 日历（周，组件）
  const WeekCmp = (weekData: any[], key: number) => {
    return (
      <WeekWrapper key={key}>
        {weekData.map((item, index) => {
          return DayCmp(item, key + "-" + index);
        })}
      </WeekWrapper>
    );
  };
  const getWeeks = () => {
    const fakeArr = Array.from({ length: weeks });
    return (
      <React.Fragment>
        {fakeArr.map((item, index) => {
          return WeekCmp(data.slice(index * 7, index * 7 + 7), index);
        })}
      </React.Fragment>
    );
  };
  const currentRangeDate = (index: number) => {
    const firstDate: string = moment(dateMonth).format("YYYY-MM-01") + "——" + moment(dateMonth).format("YYYY-MM-15");
    const daysInMonth: number = moment(dateMonth).daysInMonth(); // 本月有几天
    const secondDate: string = moment(dateMonth).format("YYYY-MM-16") + "——" + moment(dateMonth).format(`YYYY-MM-${daysInMonth}`);
    return [firstDate, secondDate][index].split("——");
  };
  const rightPart = (date: string, item: Backup, index: number) => {
    const nurses: string[] = item && item.empNos ? item.empNos?.split(",") : [];
    // const nurses: string = item && item.empNos ? item.empNos : "";
    const handleChange = async (val: any, option: any) => {
      /*多选*/
      if (option instanceof Array) {
        if (option.length > 2) {
          message.warning("当前选择最大为2项！");
          return;
        }
      }
      // const [startDate, endDate] = currentRangeDate(index);
      // const params: Backup = {
      //   id: item?.id,
      // };
      updateBackups(backups.map((v: any, i: number) => {
        if (i === index) return {
          ...v,
          // startDate,
          // endDate,
          nurseNames: option.map((_op: any) => _op.props.children).join(","),
          empNos: val.join(",")
        }
        return v
      }))
      // await api.saveBackup(params);
      // statusData();
    };
    /**勾选数据 */
    const handleCheck = (value: any) => {
      const arrData = backups.map((item: any, i: number) => {
        if (i === index) {
          item.isCheck = value;
        }
        return item;
      });
      updateBackups(arrData);
    };
    return (
      <DayWrapper>
        <div
          className={classNames({
            "date": true,
            "released": item?.isPublish !== 1
          })}>
          <Checkbox
            style={{ marginRight: "5px" }}
            onChange={(e) => handleCheck(e.target.checked)}
            checked={item?.isCheck || false}>
          </Checkbox>
          {date}</div>
        <div className="beiBan" style={{ backgroundColor: "#3371ea" }}>备班</div>
        <div className="person">

          <div className="select-context beiban-select">
            <div>
              <Select
                showSearch
                mode="multiple"
                className="black-bold"
                placeholder={"选择值班护士长"}
                disabled={!disabled || item?.isPublish == 1}
                size="small"
                value={nurses}
                onChange={(val: any, option: any) => handleChange(val, option)}
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {nurseList.map((user: any) => {
                  return <Select.Option style={{ fontWeight: 'bold', color: '#000' }} value={user.empNo} key={user.empNo}>{user.empName}</Select.Option>;
                })}
              </Select>
            </div>
          </div>
        </div>
      </DayWrapper>
    );
  };
  const ReserveContext = () => {
    const startDate: string = moment(dateMonth).format("MM月01日") + "-" + moment(dateMonth).format("MM月15日");
    const daysInMonth: number = moment(dateMonth).daysInMonth(); // 本月有几天
    const endDate: string = moment(dateMonth).format("MM月16日") + "-" + moment(dateMonth).format(`MM月${daysInMonth}日`);
    const dataArr: string[] = [startDate, endDate];
    return (
      <React.Fragment>
        {
          dataArr.map((item: string, index: number) => {
            return (
              <div
                style={
                  index !== 0 ? { margin: "20px 0px 0px 20px" } : { margin: "0px 0px 0px 20px" }
                }
                key={index}
              >
                {rightPart(item, backups[index], index)}
              </div>
            );
          })
        }
        <div style={{ fontSize: "14px", margin: "20px 0px 0px 10px" }}>
          备注
        </div>
        <div className="notes">
          <TextArea
            value={description}
            key="description"
            disabled={!disabled}
            onChange={(e)=>{
              setRemarks(e.target.value)
            }}
            // onBlur={async (e) => {
            //   const params = {
            //     dictCode: "nurseRoundsScheduleDict",
            //     itemCode: "nurse_rounds_schedule_description",
            //     itemName: e.target.value
            //   };
            //   // await api.saveRemarks(params);
            //   // statusData();
            // }}
          />
        </div>
      </React.Fragment>
    );
  };
  useEffect(() => {
    if (props.data.length) {
      setWeeks(Math.ceil(props.data.length / 7));
    }
  }, [props.data]);

  return (

    <Wrapper>
      <div className="MainLeft">
        {getWeeks()}
      </div>
      <div className="MainRight">{ReserveContext()} </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: calc(100% - 40px);
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 5px;

  .MainLeft {
    width: 84%;
    height: 100%;
  }

  .MainRight {
    width: 16%;
    height: 100%;
  }

  .notes {
    height: calc(100% - 190px);
    background-color: rgb(236, 236, 236);
    margin: 10px 0 0 20px;

    TextArea {
      width: 100%;
      height: 100%;
      resize: none;
      transition: none;
    }
  }
`;
const WeekWrapper = styled.div`
  flex: 1;
  display: flex;

  .week-title {
    flex: 1;
    border: 1px solid #e5e5e5;
    background: #B9B4FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
`;

const DayWrapper = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  font-size: 14px !important;

  .ant-select-disabled .ant-select-selection {
    background-color: #f9f9f9 !important;
  }
  .ant-time-picker-input::webkit-input-placeholder{
    color:red;
  }
  .date {
    background: #ffffff;
    color: #04a580;
    flex: 0.5;
    padding: 1px;
  }
  .released,.dropdown-class,.black-bold {
    /* color: #666;
    font-weight: 500; */
    color: #000;
    font-weight: bold;
  }
 

  .week {
    background: #f0f0f0;
    flex: 0.5;
    color: #666666;
    padding: 1px;
    min-height: 23px;
    display: flex;
    align-items: center;
    margin: 5px 0;
    .ant-time-picker {
      width: 60px;
    }

    .ant-time-picker-input {
      background: #f0f0f0;
      border: none;
      text-align: center;
      color: #666;
      height: 100%;
      width: 100%;
      padding: 1px;

      &::-webkit-input-placeholder {
        color: #fff;
      }

      &::-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #fff;
      }

      &::placeholder {
        color: #fff;
      }

      &:-moz-placeholder {
        color: #fff;
      }

      &::-moz-placeholder {
        color: #fff;
      }

      &:-ms-input-placeholder {
        color: #fff;
      }
    }

    .ant-time-picker-icon {
      display: none;
    }
  }

  .beiBan {
    background-color: #3371ea;
    color: #fff;
  }

  .person {
    flex: 3;
    padding: 2px;
  }

  div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .select-context {
    display: block;
    .floor-mar{
      margin: 5px 0;
    }
  }
  

  .ant-select-selection__rendered {
    display: block;
  }
`;

