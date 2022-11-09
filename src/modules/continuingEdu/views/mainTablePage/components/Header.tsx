import styled from "styled-components";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { appStore, authStore } from "src/stores";
import { DatePicker, Select, Input, Button, message } from "src/vendors/antd";
import { mainPageModal } from "../MainPageModal";
import { selectPeopleViewModel } from "../../../modal/SelectPeople/SelectPeopleViewModel";
import { stepViewModal } from "../../../modal/stepComponent/StepViewModal";
interface Props {
  getTitle: any;
  getId: any;
  addRecordModal: any;
}

export default observer(function Header(props: Props) {
  let Title = props.getTitle || "";
  let id = props.getId || "";
  const stateList = [
    { name: '全部', code: '' },
    { name: '草稿', code: '1' },
    { name: '待审核', code: '2' },
    { name: '退回', code: '3' },
    { name: '待开始', code: '41' },
    { name: '进行中', code: '42' },
    { name: '已结束', code: '43' },
  ]; //状态

  /** 初始化数据 */
  useEffect(() => {
    mainPageModal.id = id;
    mainPageModal.init();
  }, [id, Title]);

  /** 判断添加记录参与人员权限 */
  useEffect(() => {
    let dept = authStore.deptList.find(
      (dept: any) => dept.code == authStore.defaultDeptCode
    );

    selectPeopleViewModel.selectTreeDataAll = [
      {
        step: "按片区选择",
        label: "按片区选择",
        data: [],
        dataLabel: "deptName",
        stepLabel: "deptCode"
      },
      {
        step: "默认科室",
        label: "",
        data: []
      },
      {
        step: "按护理单元选择",
        label: "按护理单元选择",
        data: [],
        dataLabel: "deptName"
      },

      {
        step: "按职务选择",
        label: "按职务选择",
        data: [],
        dataLabel: "job"
      },
      {
        step: "按职称选择",
        label: "按职称选择",
        data: [],
        dataLabel: "title"
      },
      {
        step: "按层级选择",
        label: "按层级选择",
        data: [],
        dataLabel: "level"
      },
      ...appStore.hisMatch({
        map: {
          other: [
            {
              step: "按实习生选择",
              label: "按实习生选择",
              data: [],
              dataLabel: "year"
            },
            {
              step: "按进修生选择",
              label: "按进修生选择",
              data: [],
              dataLabel: "year"
            }
          ],
          'wh,ytll,gxjb': [],
          nys: [
            {
              step: "按实习生选择",
              label: "按实习生选择",
              data: [],
              dataLabel: "year"
            }
          ],
          lcey: [
            {
              step: "按实习生选择",
              label: "按实习生选择",
              data: [],
              dataLabel: "year"
            },
            {
              step: "按进修生选择",
              label: "按进修生选择",
              data: [],
              dataLabel: "year"
            },
            {
              step: "科室总带教",
              label: "科室总带教",
              data: [],
              dataLabel: "year"
            },
            {
              step: "院级培训师",
              label: "院级培训师",
              data: [],
              dataLabel: "year"
            },
            {
              step: "护理专业小组",
              label: "护理专业小组",
              data: [],
              dataLabel: "year"
            }
          ],
        }
      })
    ];
    selectPeopleViewModel.selectTreeDataAll.map((item: any) => {
      if (item.step == "默认科室") {
        item.label = dept ? dept.name : authStore.defaultDeptCodeName;
      }
    });
  }, [authStore.defaultDeptCode, Title]);

  /** 根据医院、一级菜单名动态渲染头部类型 */
  const getType = () => {
    const nameList = ["集中培训", "在线学习"];
    if (['hj', 'lyyz'].includes(appStore.HOSPITAL_ID) && nameList.includes(stepViewModal.getParentsName)) {
      return ''
    } else {
      return (
        <span>
          <span>类型：</span>
          <Select
            style={{ width: 120 }}
            value={mainPageModal.selectedType}
            onChange={(val: string) => {
              mainPageModal.selectedType = val;
              mainPageModal.pageIndex = 1;
              mainPageModal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {mainPageModal.selectTypeList.map((item: any, index: number) => (
              <Select.Option value={item.id} key={index}>
                {item.name}
              </Select.Option>
            ))}
            <Select.Option value="-1">其他</Select.Option>
          </Select>
        </span>
      )
    }
  }

  return (
    <Wrapper>
      <LeftIcon>
        <span>开始时间：</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={mainPageModal.selectedDate}
          onChange={date => {
            mainPageModal.selectedDate = date;
            mainPageModal.onload();
          }}
        />
        {getType()}
        <span>状态：</span>
        <Select
          style={{ width: 120 }}
          value={mainPageModal.selectedState}
          onChange={(val: string) => {
            mainPageModal.selectedState = val;
            mainPageModal.pageIndex = 1;
            mainPageModal.onload();
          }}
        >
          {stateList.map((item: any, idx: any) => (
            <Select.Option value={item.code} key={idx}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </LeftIcon>
      <RightIcon>
        <Input
          style={{ width: 150, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入要搜索的关键字"
          value={mainPageModal.keyWord}
          onChange={e => {
            mainPageModal.keyWord = e.target.value;
          }}
        />
        <Button
          onClick={() => {
            mainPageModal.onload();
          }}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            mainPageModal.export();
          }}
        >
          导出
        </Button>
        <Button
          type="primary"
          onClick={() => {
            props.addRecordModal.show({
              onOkCallBack() {
                message.success("保存成功");
                mainPageModal.onload();
              }
            });
          }}
        >
          添加记录
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 20px 0 20px;
  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
`;
