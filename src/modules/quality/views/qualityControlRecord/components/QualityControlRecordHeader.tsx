import { authStore, appStore } from "src/stores";
import styled from "styled-components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react-lite";
import { Button, DatePicker , Input} from "antd";
import FormSelect from "src/modules/quality/views/qualityControlRecord/components/common/FormSelect";
import TableSelect from "src/modules/quality/views/qualityControlRecord/components/common/TableSelect";
import StateSelect from "src/modules/quality/views/qualityControlRecord/components/common/StateSelect";
import { qualityControlRecordVM } from "../QualityControlRecordVM";
import { qualityControlRecordApi } from "../api/QualityControlRecordApi";
import { Select, Radio } from "src/vendors/antd";
import { PageTitle, Place } from "src/components/common";
import { numToChinese } from "src/utils/number/numToChinese";
import FormCreateModal from "./common/FormCreateModal";
import FormCreateByTagModal from "./common/FormCreateByTagModal";

import { qcFunTitle, qcOneTitle, qcThreeTitle } from "./../../../data/qcTitle";
import { CONFIG_TITLE } from "src/modules/quality/utils/enums";

export interface Props extends RouteComponentProps {}

const Option = Select.Option;

export default observer(function TopCon(props: any) {
  const [formCreateVisible, setFormCreateVisible] = useState(false);
  const [groupRoleList, setGroupRolelist] = useState([]);

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
        "whyx,whhk": (() => {
          if (qualityControlRecordVM.level == 4) {
            return qcFunTitle.listViewTitle;
          }
          return defaultTitle;
        })(),
        fqfybjy: CONFIG_TITLE[qualityControlRecordVM.level],
        other: defaultTitle,
      },
      vague:true
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
        disabled={!(authStore.isDepartment || authStore.isSupervisorNurse||authStore.isRoleManage)}
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
        'hj,nfsd,qzde': defaultCreateCon,
        gxjb: defaultCreateCon,
        "whyx,whhk": createBtn ? withOutAuditCreateCon : "",
        other: withOutAuditCreateCon,
      },
      vague: true,
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
      if(['ytll'].includes(appStore.HOSPITAL_ID)){
        const roleArr = await qualityControlRecordApi.qcRoleCode()
        setGroupRolelist(roleArr?.data)
      }
    } catch (err) {}
  };
  const isWhyx = ["whyx","whhk"].includes(appStore.HOSPITAL_ID);
  const qcCodeCon = useCallback(() => {
    if (isWhyx || ['gzsrm','yczyy', 'whsl'].includes(appStore.HOSPITAL_ID)) {
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
            dropdownMatchSelectWidth={false}
            style={{ width: 180 }}
            value={qualityControlRecordVM.qcCode}
            onChange={(value: any) => {
              qualityControlRecordVM.qcCode = value;
              props.refreshData();
            }}
          >
            {qcCodeList.map((item: any) => (
              <Option value={item.qcCode} key={item.qcCode} style={{fontSize:'12px'}} title={item.qcName}>
                {item.qcName}
              </Option >
            ))}
          </Select>
        </React.Fragment>
      );
    }
    return "";
  }, [qcCodeList]);
  const qcDeptCon = useCallback(() => {
    if (isWhyx) {
      return (
        <React.Fragment>
          <span style={{ margin: "0 3px 0 15px" }}>质控人员:</span>
          <Input style={{width:'70px'}} value={qualityControlRecordVM.creatorName} onChange={(e: any) => {
              qualityControlRecordVM.creatorName = e.target.value;
              props.refreshData();
            }}/>
        </React.Fragment>
      );
    }
    return "";
  }, [qcCodeList]);
  const [createBtn, setCreateBtn] = useState(true);
  const qcLevelKeys = useMemo(() => ([
    "yx_one_level_quality_control",
    "yx_two_level_quality_control",
    "yx_tertiary_quality_control",
    "yx_functional_supervision",
  ]), [])
  useEffect(() => {
    getQcCodeList();
    if (isWhyx) {
      qualityControlRecordVM
        .judgePower({
          nodeCode: "commit",
          chainCode: qcLevelKeys[qualityControlRecordVM.level - 1],
          empNo: (authStore.user && authStore.user.empNo) || "",
        })
        .then((res) => {
          setCreateBtn(!!res);
        });
    }
  }, [qualityControlRecordVM.level]);

  return (
    <Wrapper>
      <PageTitle>{title()}</PageTitle>
      <Place />
      {qcDeptCon()}
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
          ),
          'hj,nfsd,qzde': qualityControlRecordVM.formSelectList.length >= 1 && (
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
          "whyx,whhk": "",
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
        vague: true
      })}

      {(appStore.hisMatch({
        map: {
          'hj,nfsd,qzde': qualityControlRecordVM.readWay == 1 &&
          qualityControlRecordVM.level == 2,
          other: qualityControlRecordVM.readWay == 1 ||
          qualityControlRecordVM.level == 2
        },
        vague: true
      })) && (
        <React.Fragment>
          <span style={{ margin: "0 3px 0 15px" }}>科室:</span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={appStore.HOSPITAL_ID === 'gzsrm' ? {width: 200} : { width: 150 }}
            value={qualityControlRecordVM.filterDeptCode}
            onChange={(value: any) => {
              qualityControlRecordVM.filterDeptCode = value;
              props.refreshData();
            }}
          >
            {filterDeptList.map((item: any) => (
              <Option value={item.code} key={item.code} title={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          <span style={{ margin: "0 3px 0 15px" }}>质控组:</span>
          <Select
            value={qualityControlRecordVM.groupRoleCode}
            onChange={(groupRoleCode: any) => {
              qualityControlRecordVM.groupRoleCode = groupRoleCode;
              props.refreshData();
            }}
            style={{ width: 150 }}
          >
            <Option value="">全部</Option>
            {groupRoleList.map((item: any) => (
              <Option value={item.code} key={item.code}>
                {item.name}
              </Option>
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
      {["hj", 'nfsd', 'qzde','jmfy'].includes(appStore.HOSPITAL_ID) && (
        <React.Fragment>
          <span style={{ margin: "0 3px 0 15px" }}>表单小组:</span>
          <TableSelect refreshData={props.refreshData} />
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
          'gzsrm,whsl,zjhj': (
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
        vague:true
      })}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  /* max-height: 100px; */
  min-height: 50px;
  font-size: 13px;
  position: relative;
  color: #333333;
  padding: 0 15px 0 15px;
  line-height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  z-index: 1;

  .radio-con {
    background: #fff;
    border: 1px solid #ddd;
    white-space: wrap;
    min-height: 32px;
    line-height: 32px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 4px 0 10px;
    margin-left: 15px;
    overflow: auto;
    /* min-width: 248px; */
    .ant-radio-wrapper {
      font-size: 13px;
      margin-right: 0px;
    }
  }
  .dropdown-style {
    color:red;
  }
`;
