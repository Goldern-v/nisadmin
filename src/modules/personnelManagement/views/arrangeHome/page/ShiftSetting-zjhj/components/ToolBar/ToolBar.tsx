import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import createModal from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import DeptSelect from 'src/modules/statistic/common/DeptSelect'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { AutoComplete, Button, Form, Input, DatePicker, message, Modal, Select, Switch } from 'antd'
import { appStore, authStore, scheduleStore } from 'src/stores'
import { getCurrentMonthNow } from "src/utils/date/currentMonth";
import moment from "moment";

import AddShiftModal from '../../modal/AddShiftModal'
import AduitModal from '../../modal/AduitModal'
import UpdateAllModal from "../../modal/UpdateAllModal"; // 一级菜单弹窗
import { resolve } from 'dns'

export interface Props extends RouteComponentProps {
}
export interface DeptType {
  code: string,
  name: string
}
export default function ToolBar() {
  const addShiftModal = createModal(AddShiftModal);
  const aduitModal = createModal(AduitModal);
  const pathName:boolean = appStore.location.pathname.includes('/ShiftSettingViewNewZJHJ')
  const statusTypeList =  [
    {
      code: "",
      name: "全部"
    },
    {
      code: "1",
      name: "待审核"
    },
    {
      code: "2",
      name: "已通过"
    },
    {
      code: "-1",
      name: "已驳回"
    },
    {
      code: "-2",
      name: "已撤销"
    }
  ];
  let deptList = [{name:'全院', code: ''}, ...authStore.deptList];
  const [bangci, setBangci]: [any, any] = useState([]);
  const [dataSourceColorCN, setDataSourceColorCN]: [any, any] = useState([]);
  const [colorMap, setColorMap]: [any, any] = useState({});
  const [colorMapCN, setColorMapCN]: [any, any] = useState({});
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [shiftTypeList, setShiftTypeList] = useState<any[]>([]);
  const [selectedStatusType, setSelectedStatusType] = useState("1");
  const [date, setDate]: any = useState(getCurrentMonthNow());
  const [selectData, setSelectData]= useState<any[]>([])
  const [defaultValue, setDefaultValue]= useState('')

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    service.commonApiService.dictInfo("sch_range_color").then(res => {
      let colorMap: any = {};
      let colorMapCN: any = {};
      let dataSourceColorCN: any = [];
      res.data.map((item: any) => {
        colorMap[item.name] = item.code;
        colorMapCN[item.code] = item.name;
        dataSourceColorCN.push(item.name);
      });
      setColorMap(colorMap);
      setColorMapCN(colorMapCN);
      setDataSourceColorCN(dataSourceColorCN);
    });
    service.commonApiService.dictInfo("sch_range_shift_type").then(res => {
      setBangci(res.data.map((res: any) => res.name));
      setShiftTypeList(res.data)
    });
  }, []); // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。
  emitter.removeAllListeners("弹窗编辑排班");
  emitter.removeAllListeners("添加审核");

  emitter.addListener("弹窗编辑排班", (record: any) => {
    fields = {
      shiftName: {
        value: record.name || ""
      },
      id: {
        value: record.id || ""
      },
      type: {
        value: record.shiftType || ""
      },
      workTime: {
        value: record.workTime || ""
      },
      workHour: {
        value: record.effectiveTime || ""
      },
      color: {
        value: colorMapCN[record.nameColor] || ""
      },
      status: {
        value: record.status != null ? record.status : true
      },
    };
    addShift("编辑排班");
  });
  emitter.addListener("添加审核", (record: any) => {
    setSelectData(record);
  });


  const save = (e: any) => {
    emitter.emit("获取选中班次列表zjhj", (shiftList: any) => {
      shiftList = shiftList.filter((u: any) => {
        return u.status !== null && u.id;
      });
      service.scheduleShiftApiService.saveAll(shiftList).then(res => {
        message.success("保存排班班次设置成功");
        emitter.emit("更新班次zjhj");
      });
    });
  };

  let customizedForm: any = null;
  const CustomizedForm = Form.create({
    onFieldsChange(props: any, changedFields: any) {
      props.onChange(changedFields);
    },
    mapPropsToFields(props: any) {
      return {
        id: Form.createFormField({
          ...props.id,
          value: props.id.value
        }),
        shiftName: Form.createFormField({
          ...props.shiftName,
          value: props.shiftName.value
        }),
        type: Form.createFormField({
          ...props.type,
          value: props.type.value
        }),
        workTime: Form.createFormField({
          ...props.workTime,
          value: props.workTime.value
        }),
        workHour: Form.createFormField({
          ...props.workHour,
          value: props.workHour.value
        }),
        color: Form.createFormField({
          ...props.color,
          value: props.color.value
        }),
        status: Form.createFormField({
          ...props.status,
          value: props.status.value
        }),
      };
    },
    onValuesChange(_: any, values: any) {
      console.log(values);
    }
  })((props: any) => {
    const { getFieldDecorator } = props.form;
    customizedForm = props.form;
    return (
      <Form layout="inline">
        <Form.Item label="班次名称">
          {getFieldDecorator("shiftName", {
            rules: [{ required: false, message: "班次名称在同一科室下为唯一" }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        <Form.Item label="所属类别">
          {getFieldDecorator("type", {
            rules: [{ required: false, message: "" }]
          })(
            <AutoComplete
              style={{ width: inputWidth }}
              dataSource={bangci}
              placeholder=""
            />
          )}
        </Form.Item>
        <Form.Item label="上班时间">
          {getFieldDecorator("workTime", {
            rules: [{ required: false, message: "" }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        <Form.Item label="标准工时">
          {getFieldDecorator("workHour", {
            rules: [{ required: false, message: "" }]
          })(<Input style={{ width: inputWidth }} placeholder="标准工时" />)}
        </Form.Item>

        <Form.Item label="颜色标记">
          {getFieldDecorator("color", {
            rules: [{ required: false, message: "" }]
          })(
            <AutoComplete
              style={{ width: inputWidth }}
              dataSource={dataSourceColorCN}
              placeholder=""
              filterOption={(inputValue: any, option: any) =>
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1 ||
                (dataSourceColorCN.indexOf(inputValue) > -1 ||
                  dataSourceColorCN.indexOf(inputValue) === -1)
              }
            />
          )}
        </Form.Item>
        <Form.Item label="启用状态">
          {getFieldDecorator("status", { valuePropName: "checked" })(
            <Switch />
          )}
        </Form.Item>
      </Form>
    );
  });

  const handleFormChange = (changedFields: any) => {
    fields = { ...fields, ...changedFields };
  };

  let fields = {
    shiftName: {
      value: ""
    },
    id: {
      value: ""
    },
    type: {
      value: ""
    },
    workTime: {
      value: "8:00 - 16:00"
    },
    workHour: {
      value: "8"
    },
    color: {
      value: "灰色"
    },
    status: {
      value: true
    },
    
  };

  const onOk = (title: any = "排班设置") => {
    const postData: any = {
      id: fields.id.value, // 	Long 必须参数 班次名称
      name: fields.shiftName.value, // 	Long 必须参数 班次名称
      deptCode: scheduleStore.getDeptCode(), // string 必须参数 科室编码
      shiftType: fields.type.value, // string 必须参数 所属类别
      workTime: fields.workTime.value, // string
      // startTime: fields.startTime.value.format('HH:mm'), // string 必须参数 开始时间
      // endTime: fields.endTime.value.format('HH:mm'), // string 必须参数 结束时间
      effectiveTime: fields.workHour.value, // string 必须参数 标准工时
      nameColor: colorMap[fields.color.value], // string 必须参数 班次颜色
      status: fields.status.value // Boolean 必须参数 启用状态 true或者false
    };
    service.scheduleShiftApiService.save(postData).then(res => {
      message.success(title + "成功");
      emitter.emit("更新班次zjhj" ,!pathName  && {auditStatus:selectedStatusType, startDate: date[0] ? moment(date[0]).format("YYYY-MM-DD") : "",endDate: date[1] ? moment(date[1]).format("YYYY-MM-DD") : "" ,deptCode: '' });
      console.log(title + "成功", res);
      // 更新班次zjhj
    });
  };

  let inputWidth = "250px";

  const addShift = (title: string) => {
    if (title === "添加排班") {
      fields = {
        shiftName: {
          value: ""
        },
        id: {
          value: ""
        },
        type: {
          value: ""
        },
        workTime: {
          value: "8:00 - 16:00"
        },
        workHour: {
          value: "8"
        },
        color: {
          value: "灰色"
        },
        status: {
          value: true
        },
      };
    }
    Modal.confirm({
      title: title + "",
      centered: true,
      onOk: () => onOk(title),
      onCancel: () => {
      },
      iconType: "form",
      width: "500px",
      content: (
        <div>
          <CustomizedForm {...fields} onChange={handleFormChange} />
        </div>
      )
    });
  };

  // 添加班次权限设置
  const isOk = () => {
    return (authStore.isDepartment || authStore.isRoleManage || authStore.isSupervisorNurse || authStore.isAd);
  }

  const getTableList = (value?:any, type?:any) =>{
    let data = {
      auditStatus:selectedStatusType, 
      deptCode: '',
      startDate: date[0] ? moment(date[0]).format("YYYY-MM-DD") : "",
      endDate: date[1] ? moment(date[1]).format("YYYY-MM-DD") : ""
    }
    if(type == 'auditStatus'){
      data.auditStatus = value
      
    }else if(type == 'date'){
      data.startDate = value[0] ? moment(value[0]).format("YYYY-MM-DD") : "";
      data.endDate = value[1] ? moment(value[1]).format("YYYY-MM-DD") : "";
    }else if(type == 'deptList'){
      data.deptCode = value;
    }
    
    emitter.emit("更新班次zjhj", data);
  }

  useEffect(()=>{
    emitter.emit("更新班次zjhj" ,!pathName  && {auditStatus:selectedStatusType, startDate: date[0] ? moment(date[0]).format("YYYY-MM-DD") : "",endDate: date[1] ? moment(date[1]).format("YYYY-MM-DD") : ""});
  }, [pathName])

  return (
    <div>
      <BreadcrumbBox
        data={[
          {
            name: "排班管理",
            link: "/personnelManagement/arrangeHome"
          },
          {
            name: pathName ? "班次设置" :'排班审核'
          }
        ]}
      />

      {
        pathName ? <Wrapper>
          <Title>班次设置</Title>
          <div style={{ flex: 1 }} />
          <DeptSelect
            onChange={() => {
              emitter.emit("更新班次zjhj");
            }}
          />
          {isOk() && (
            <Button
              onClick={() => {
                addShiftModal.show({
                  clickType:"addForm",
                  onOkCallBack: () => {
                    emitter.emit("更新班次zjhj");
                  }
                });
              }}
              style={{ marginLeft: 6, marginRight: 3 }}
            >
              添加新班次
            </Button>
          )}
          <Button
            onClick={() => emitter.emit("更新班次zjhj")}
            style={{ marginLeft: 3, marginRight: 3 }}
          >
            刷新
          </Button>
          <Button
            type="primary"
            onClick={save}
            style={{ marginLeft: 3, marginRight: 3 }}
          >
            保存
          </Button>
          <UpdateAllModal
            visible={editVisible}
            onCancel={() => setEditVisible(false)}
            onOk={() => {
              setEditVisible(false);
              emitter.emit("更新班次zjhj");
            }}
          />
        </Wrapper>:
        <Wrapper>
        <Title>排班审核</Title>
        <div style={{ flex: 1 }} />
        <span className='span'>科室</span>
        <Select
          defaultValue={defaultValue}
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: 200 }}
          onChange={(value: any)=>{setDefaultValue(value); getTableList(value, 'deptList')}}
        >
          {deptList.map((item: DeptType) => (
            <Select.Option key={item.code} value={item.code} title={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span className='span'>状态</span>
        <Select
          onChange={(value: string) =>{ setSelectedStatusType(value); getTableList(value, 'auditStatus') }}
          value={selectedStatusType}
        >
          {statusTypeList.map((item, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span className='span'>日期</span>
        <DatePicker.RangePicker
          allowClear={true}
          style={{ width: 220 }}
          value={date}
          onChange={value =>{ setDate(value);   getTableList(value, 'date') }}
        />
        <Button
          type="primary"
          onClick={() => {
            if(!selectData.length){
              return message.warning('请选择审核列表')
            }
            aduitModal.show({
              aduitData: selectData,
              onOkCallBack: () => {
                getTableList()
              }
            });
          }}
          style={{ marginLeft: 3, marginRight: 3 }}
        >
          审核
        </Button>
      </Wrapper>
      }
      <addShiftModal.Component />
      <aduitModal.Component />
    </div>
  );
}
const Wrapper = styled.div`
  /* background: #eee; */
  height: auto;
  padding: 0 20px 10px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
  align-items: center;
  background: #fff;

  form.Item {
    width: "250px";
  }
  .item {
    margin: 0 10px 5px;
  }
  .span{
    padding: 0 10px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
