import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import createModal from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import DeptSelect from 'src/modules/statistic/common/DeptSelect'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { AutoComplete, Button, Form, Input, InputNumber, message, Modal, Select, Switch } from 'antd'
import { appStore, authStore, scheduleStore } from 'src/stores'

import AddShiftModal from '../../modal/AddShiftModal'
import AddShiftModal_wh from '../../modal/AddShiftModal_wh'
import UpdateAllModal from "../../modal/UpdateAllModal"; // 一级菜单弹窗

export interface Props extends RouteComponentProps {
}
// 是否显示班次系数
const isYtll = 'ytll' === appStore.HOSPITAL_ID
const isYtllText = 'ytll'
export default function ToolBar() {
  const addShiftModal = createModal(
    appStore.hisMatch({
      map: {
        'wh,qhwy,whsl,wjgdszd,ytll,zhzxy,whhk,dglb,dghm': AddShiftModal_wh,
        other: AddShiftModal
      },
      vague: true
    }),
  );

  const [bangci, setBangci]: [any, any] = useState([]);
  const [dataSourceColorCN, setDataSourceColorCN]: [any, any] = useState([]);
  const [colorMap, setColorMap]: [any, any] = useState({});
  const [colorMapCN, setColorMapCN]: [any, any] = useState({});
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [shiftType, setShiftType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameColor, setNameColor] = useState<string>('');
  const [nameColorList, setNameColorList] = useState<any[]>([]);
  const [shiftTypeList, setShiftTypeList] = useState<any[]>([]);
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
      setNameColorList(res.data)
    });
    service.commonApiService.dictInfo("sch_range_shift_type").then(res => {
      setBangci(res.data.map((res: any) => res.name));
      setShiftTypeList(res.data)
    });
  }, []); // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。
  emitter.removeAllListeners("弹窗编辑排班");

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
      ...appStore.hisMatch({
        map: {
          [isYtllText]: {
            coefficient: {
              value: record.coefficient || 0
            }
          },
          other: {}
        }
      })
    };
    addShift("编辑排班");
  });
  const save = (e: any) => {
    // 获取选中班次
    // console.log('获取选中班次', e)
    // return
    emitter.emit("获取选中班次列表", (shiftList: any) => {
      // message.success('保存排班班次设置')
      // return
      shiftList = shiftList.filter((u: any) => {
        return u.status !== null && u.id;
      });
      service.scheduleShiftApiService.saveAll(shiftList).then(res => {
        message.success("保存排班班次设置成功");
        emitter.emit("更新班次列表");
      });
    });
  };

  let customizedForm: any = null;
  const CustomizedForm = Form.create({
    // name: 'coordinated',
    onFieldsChange(props: any, changedFields: any) {
      // props = { ...props, ...changedFields }
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
        ...appStore.hisMatch({
          map: {
            [isYtllText]: {
              coefficient: Form.createFormField({
                ...props.status,
                value: props.status.value
              })
            },
            other: {}
          }
        })
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
            // filterOption={(inputValue: any, option: any) =>
            //   option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
            //   bangci.indexOf(inputValue.toUpperCase()) > -1
            // }
            />
          )}
        </Form.Item>
        <Form.Item label="上班时间">
          {getFieldDecorator("workTime", {
            rules: [{ required: false, message: "" }]
          })(<Input style={{ width: inputWidth }} />)}
        </Form.Item>
        {/* <Form.Item label='开始时间'>
          {getFieldDecorator('startTime', {
            rules: [{ required: false, message: '' }]
          })(<TimePicker style={{ width: inputWidth }} />)}
        </Form.Item> */}
        {/* <Form.Item label='结束时间'>
          {getFieldDecorator('endTime', {
            rules: [{ required: false, message: '' }]
          })(<TimePicker style={{ width: inputWidth }} />)}
        </Form.Item> */}
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
        {isYtll && <Form.Item label="班次系数">
          {getFieldDecorator("coefficient", {
            rules: [{ required: false, message: "" }]
          })(<InputNumber min={0} style={{ width: inputWidth }} />)}
        </Form.Item>}
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
    // console.log('handleFormChange', changedFields, customizedForm)
    // console.log('onFieldsChange', props, changedFields)
    // let diff = 0
    // let dateFormat = 'YYYY-MM-DD HH:mm:ss'
    // try {
    //   if (Object.keys(changedFields).indexOf('startTime') > -1) {
    //     diff = fields.endTime.value.diff(changedFields.startTime.value, 'hours')
    //   } else if (Object.keys(changedFields).indexOf('endTime') > -1) {
    //     diff = changedFields.endTime.value.diff(fields.startTime.value, 'hours')
    //   }
    //   if (diff) {
    //     diff = Math.abs(diff)
    //     fields.workHour.value = `${diff}`
    //     customizedForm.setFieldsValue({ workHour: diff })
    //   }
    // } catch (error) {
    //   //
    // }
    // console.log('工时', diff, fields.endTime)
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
    ...appStore.hisMatch({
      map: {
        [isYtllText]: {
          coefficient: {
            value: 0
          }
        },
        other: {}
      }
    })
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
    fields?.coefficient?.value !== null && (postData.coefficient = fields.coefficient.value)
    service.scheduleShiftApiService.save(postData).then(res => {
      message.success(title + "成功");
      emitter.emit("更新班次列表");
      console.log(title + "成功", res);
      // 更新班次列表
    });
    // message.success('onOk')
  };

  let inputWidth = "250px";

  // let modalInfo: any = null

  const addShift = (title: string) => {
    // message.success('添加班次')
    // console.log('Modal', Modal)
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
        // 班次系数
        ...appStore.hisMatch({
          map: {
            [isYtllText]: {
              coefficient: {
                value: 0
              }
            },
            other: {}
          }
        })
      };
    }

    // if (!modalInfo) {
    Modal.confirm({
      title: title + "",
      centered: true,
      // visible: false,
      onOk: () => onOk(title),
      onCancel: () => {
        // message.success('onCancel')
        // modalInfo.destroy()
      },
      iconType: "form",
      width: "500px",
      content: (
        <div>
          <CustomizedForm {...fields} onChange={handleFormChange} />
        </div>
      )
    });
    // } else {
    //   modalInfo.update({ visible: true })
    // }
  };

  // 添加班次权限设置
  const isOk = () => {
    switch (appStore.HOSPITAL_ID) {
      case "wh":
      case "lyyz":
      case "qhwy":
      case "ytll":
      case 'whhk':
      case 'dglb':
      case 'dghm':
        return authStore.isRoleManage;
      case "dghl":
      case "fqfybjy":
        return true;
      default:
        return (authStore.isDepartment || authStore.isRoleManage || authStore.isSupervisorNurse || authStore.isAd);
    }
  }

  return (
    <div>
      <BreadcrumbBox
        data={[
          {
            name: "排班管理",
            link: "/personnelManagement/arrangeHome"
          },
          {
            name: "班次设置"
          }
        ]}
      />

      <Wrapper>
        <Title>班次设置</Title>
        <div style={{ flex: 1 }} />
        {
          appStore.hisMatch({
            map: {
              'jmfy': <React.Fragment>
                <span className="item">班次名称:</span>
                <Input value={name}
                  style={{ width: 120 }}
                  onChange={(e) => {
                  setName(e.target.value);emitter.emit("更新班次列表",{name:e.target.value,shiftType,nameColor});
                }}></Input>
                  {/* <Select
                    value={name}
                    onChange={(value: any) => { setShiftType(value);emitter.emit("更新班次列表",{name:value,shiftType,nameColor}); }}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                  <Select.Option value="">全部</Select.Option>
                  {shiftTypeList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select> */}
                <span className="item">班次类别:</span>
                  <Select
                    value={shiftType}
                    onChange={(value: any) => { setShiftType(value);emitter.emit("更新班次列表",{shiftType:value,name,nameColor}); }}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                  <Select.Option value="">全部</Select.Option>
                  {shiftTypeList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <span className="item">颜色:</span>
                  <Select
                    value={nameColor}
                    onChange={(value: any) => { setNameColor(value);emitter.emit("更新班次列表",{nameColor:value,shiftType,name}); }}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                  <Select.Option value="">全部</Select.Option>
                  {nameColorList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <span className="item"></span>
              </React.Fragment>,
              other:"",
            },
          })
        }
        <DeptSelect
          onChange={() => {
            emitter.emit("更新班次列表");
          }}
        />
        {isOk() && (
          <Button
            onClick={() => {
              addShiftModal.show({
                clickType:"addForm",
                onOkCallBack: () => {
                  emitter.emit("更新班次列表");
                }
              });
            }}
            disabled={(['whyx','whhk'].includes(appStore.HOSPITAL_ID) && !authStore.isSuperAdmin) || (['jmfy','nys'].includes(appStore.HOSPITAL_ID) && !authStore.isDepartment)}
            style={{ marginLeft: 6, marginRight: 3 }}
          >
            添加新班次
          </Button>
        )}
        {appStore.HOSPITAL_ID == "nys" && (
          <Button
            onClick={() => setEditVisible(true)}
            style={{ marginLeft: 6, marginRight: 3 }}
          >
            批量修改
          </Button>
        )}

        <Button
          onClick={() => emitter.emit("更新班次列表")}
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
            emitter.emit("更新班次列表");
          }}
        />
      </Wrapper>
      <addShiftModal.Component />
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
  background: #fff;

  form.Item {
    width: "250px";
  }
  .item {
    margin: 0 10px 5px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
