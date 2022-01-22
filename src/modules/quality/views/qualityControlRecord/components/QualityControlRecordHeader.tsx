import moment from "moment";
import store, { authStore, appStore } from "src/stores";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { Button, DatePicker, Modal, message } from "antd";
import DeptSelect from "src/components/DeptSelect";
import FormSelect from "src/modules/quality/views/qualityControlRecord/components/common/FormSelect";
import StateSelect from "src/modules/quality/views/qualityControlRecord/components/common/StateSelect";
import { qualityControlRecordVM } from "../QualityControlRecordVM";
import { qualityControlRecordApi } from "../api/QualityControlRecordApi";
import { Select, Radio } from "src/vendors/antd";
import { PageTitle, Place } from "src/components/common";
import { numToChinese } from "src/utils/number/numToChinese";
import FormCreateModal from "./common/FormCreateModal";
import FormCreateByTagModal from "./common/FormCreateByTagModal";

import { qcFunTitle, qcOneTitle, qcThreeTitle } from "./../../../data/qcTitle";

export interface Props extends RouteComponentProps {}

const Option = Select.Option;

export default observer(function TopCon(props: any) {
  // const [readWay, setReadWay] = useState(1)
  const [formCreateVisible, setFormCreateVisible] = useState(false);

  const handleCreate = () => {
    setFormCreateVisible(true);
  };

  const title = () => {
    let defaultTitle = `${numToChinese(qualityControlRecordVM.level)}级质控`;
    return appStore.hisMatch({
      map: {
        nys: (() => {
          switch (qualityControlRecordVM.level) {
            case 1:
              return qcOneTitle.listViewTitle;
            case 3:
              return qcThreeTitle.listViewTitle;
            default:
              return defaultTitle;
          }
        })(),
        whyx: (() => {
          if (qualityControlRecordVM.level == 4) {
            return qcFunTitle.listViewTitle;
          }
          return defaultTitle;
        })(),
        other: defaultTitle,
      },
    });
  };

  /**科室下拉列表 */
  const filterDeptList = appStore.hisMatch({
    map: {
      nys: [{ code: "", name: "全部" }, ...authStore.deptList],
      other: qualityControlRecordVM.filterDeptList,
    },
  });

  /** 新建按钮 */
  const createBtnCon = () => {
    /** 护理部，科护士长权限 */
    const defaultCreateCon = (
      <Button
        onClick={handleCreate}
        style={{ marginLeft: 10 }}
        disabled={!(authStore.isDepartment || authStore.isSupervisorNurse)}
      >
        新建
      </Button>
    );

    /** 前端无控制权限 */
    const withOutAuditCreateCon = (
      <Button onClick={handleCreate} style={{ marginLeft: 10 }}>
        新建
      </Button>
    );

    return appStore.hisMatch({
      map: {
        // 武汉默认只有二级质控能在pc端添加
        wh: qualityControlRecordVM.level == 2 ? defaultCreateCon : <span />,
        hj: defaultCreateCon,
        gxjb: defaultCreateCon,
        whyx: createBtn ? withOutAuditCreateCon : "",
        other: withOutAuditCreateCon,
      },
    });
  };

  /** 导出按钮 */
  const exportCon = () => {
    return appStore.hisMatch({
      map: {
        nys: <span />,
        other: (
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => props.refExport && props.refExport()}
          >
            导出
          </Button>
        ),
      },
      vague: true,
    });
  };
  // 质控表单
  const [qcCodeList, setQcCodeList] = useState<any[]>([]);
  const getQcCodeList = async () => {
    try {
      const res = await qualityControlRecordApi.formTemplateList({
        level: Number(qualityControlRecordVM.level),
        templateName: "",
      });
      if (res.data)
        setQcCodeList([{ qcCode: "", qcName: "全部" }, ...res.data]);
    } catch (err) {}
  };
  const isWhyx = ["whyx"].includes(appStore.HOSPITAL_ID);
  const qcCodeCon = useCallback(() => {
    if (isWhyx) {
      return (
        <React.Fragment>
          <span style={{ margin: "0 3px 0 15px" }}>质控表单:</span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 180 }}
            value={qualityControlRecordVM.qcCode}
            onChange={(value: any) => {
              qualityControlRecordVM.qcCode = value;
              props.refreshData();
            }}
          >
            {qcCodeList.map((item: any) => (
              <Select.Option value={item.qcCode} key={item.qcCode}>
                {item.qcName}
              </Select.Option>
            ))}
          </Select>
        </React.Fragment>
      );
    }
    return "";
  }, [qcCodeList]);
  const [createBtn, setCreateBtn] = useState(true);
  useEffect(() => {
    if (isWhyx) {
      let arr = [
        "yx_one_level_quality_control",
        "yx_two_level_quality_control",
        "yx_tertiary_quality_control",
        "yx_functional_supervision",
      ];
      getQcCodeList();
      qualityControlRecordVM
        .judgePower({
          nodeCode: "commit",
          chainCode: arr[qualityControlRecordVM.level - 1],
          empNo: (authStore.user && authStore.user.empNo) || "",
        })
        .then((res) => {
          setCreateBtn(!res);
        });
    }
  }, []);

  return (
    <Wrapper>
      <PageTitle>{title()}</PageTitle>
      <Place />
      {qcCodeCon()}
      <span style={{ margin: "0 3px 0 0" }}>日期:</span>
      <DatePicker.RangePicker
        allowClear={false}
        value={qualityControlRecordVM.filterDate}
        onChange={(value) => {
          qualityControlRecordVM.filterDate = value;
          props.refreshData();
        }}
        style={{ width: 220 }}
      />
      {appStore.hisMatch({
        map: {
          jmfy: qualityControlRecordVM.formSelectList.length >= 1 && (
            <div className="radio-con">
              <Radio.Group
                name="radiogroup"
                value={qualityControlRecordVM.readWay}
                onChange={(e) => {
                  qualityControlRecordVM.readWay = e.target.value;
                  props.refreshData();
                }}
              >
                <Radio value={1}>按科室查看</Radio>
                <Radio value={2}>按质控组查看</Radio>
              </Radio.Group>
            </div>
          ),
          gzsrm: (
            <div className="radio-con">
              <Radio.Group
                name="radiogroup"
                value={qualityControlRecordVM.readWay}
                onChange={(e) => {
                  qualityControlRecordVM.readWay = e.target.value;
                  props.refreshData();
                }}
              >
                <Radio value={1}>按科室查看</Radio>
                <Radio value={-3}>我创建的</Radio>
                <Radio value={-4}>待我处理</Radio>
                <Radio value={-5}>我已处理</Radio>
              </Radio.Group>
            </div>
            // : qualityControlRecordVM.formSelectList.length >= 1 && qualityControlRecordVM.level != 2?//一级质控
            // (
            //   <div className='radio-con'>
            //     <Radio.Group
            //       name='radiogroup'
            //       value={qualityControlRecordVM.readWay}
            //       onChange={(e) => {
            //         qualityControlRecordVM.readWay = e.target.value
            //         props.refreshData()
            //       }}
            //     >
            //       <Radio value={1}>按科室查看</Radio>
            //       <Radio value={2}>按质控组查看</Radio>
            //     </Radio.Group>
            //   </div>
            // )
            // :''
          ),
          whyx: "",
          default: qualityControlRecordVM.formSelectList.length >= 1 &&
            qualityControlRecordVM.level != 2 && (
              <div className="radio-con">
                <Radio.Group
                  name="radiogroup"
                  value={qualityControlRecordVM.readWay}
                  onChange={(e) => {
                    qualityControlRecordVM.readWay = e.target.value;
                    props.refreshData();
                  }}
                >
                  <Radio value={1}>按科室查看</Radio>
                  <Radio value={2}>按质控组查看</Radio>
                </Radio.Group>
              </div>
            ),
        },
      })}

      {(qualityControlRecordVM.readWay == 1 ||
        qualityControlRecordVM.level == 2) && (
        <React.Fragment>
          <span style={{ margin: "0 3px 0 15px" }}>科室:</span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 180 }}
            value={qualityControlRecordVM.filterDeptCode}
            onChange={(value: any) => {
              qualityControlRecordVM.filterDeptCode = value;
              props.refreshData();
            }}
          >
            {filterDeptList.map((item: any) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </React.Fragment>
      )}

      {qualityControlRecordVM.readWay == 2 && (
        <React.Fragment>
          <span style={{ margin: "0 3px 0 15px" }}>检查小组:</span>
          <FormSelect refreshData={props.refreshData} />
        </React.Fragment>
      )}

      <span style={{ margin: "0 3px 0 15px" }}>状态:</span>
      <StateSelect refreshData={props.refreshData} />
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => props.refreshData()}
      >
        查询
      </Button>
      {createBtnCon()}
      {exportCon()}
      {appStore.hisMatch({
        map: {
          gzsrm: (
            <FormCreateByTagModal
              onCancel={() => setFormCreateVisible(false)}
              onOk={() => setFormCreateVisible(false)}
              visible={formCreateVisible}
              level={qualityControlRecordVM.level}
            />
          ),
          default: (
            <FormCreateModal
              onCancel={() => setFormCreateVisible(false)}
              onOk={() => setFormCreateVisible(false)}
              visible={formCreateVisible}
              level={qualityControlRecordVM.level}
            />
          ),
        },
      })}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 50px;
  /* background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4; */
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 15px 0 15px;
  display: flex;
  align-items: center;
  z-index: 1;
  /* .ant-calendar-range-picker-separator {
    position: relative;
    top: 5px;
  } */
  .radio-con {
    background: #fff;
    border: 1px solid #ddd;
    white-space: wrap;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 4px 0 10px;
    margin-left: 15px;
    overflow: auto;
    min-width: 248px;
  }
`;
const QualityControlCon = styled.div`
  /* margin-left: 30px; */
  /* display: flex; */
`;
