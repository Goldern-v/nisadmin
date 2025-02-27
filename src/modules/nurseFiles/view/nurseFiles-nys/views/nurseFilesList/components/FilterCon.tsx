import Form from 'src/components/Form'
import YearTimeRangePicker from 'src/components/YearTimeRangePicker'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Col, Input, Row, Select, Tag } from 'antd'
import { theme } from 'src/styles/theme'
import { to } from 'src/libs/fns'

import { nurseFilesListViewModel } from '../NurseFilesListViewModel'

const FILTER_MAP: any = {
  学历: ["全部", "中专", "大专", "本科", "研究生", "博士"],
  职称: [
    "全部",
    "见习期护士",
    "护士",
    "护师",
    "主管护师",
    "副主任护师",
    "主任护师"
  ],
  层级: ["全部", "N0", "N1", "N2", "N3", "N4", "N5", "N6"],
  职务: [
    "全部",
    "无",
    "教学小组组长",
    "教学秘书",
    "护理组长",
    "副护士长",
    "护士长",
    "科护士长",
    "护理部副主任",
    "护理部主任"
  ],
  科室属性: ["全部", "住院护理单元花名册", "门诊护理单元花名册"],
  性别: ["全部", "男", "女"]
};

type FilterMap = typeof FILTER_MAP;

const getFilterAdapter = (label: string) => {
  switch (label) {
    case "学历": {
      return nurseFilesListViewModel.filterXl;
    }
    case "职称": {
      return nurseFilesListViewModel.filterZc;
    }
    case "层级": {
      return nurseFilesListViewModel.filterCj;
    }
    case "职务": {
      return nurseFilesListViewModel.filterZw;
    }
    case "科室属性": {
      return nurseFilesListViewModel.filterKs;
    }
    case "性别": {
      return nurseFilesListViewModel.filterXb;
    }
    default: {
      return "";
    }
  }
};

/** 设置筛选条件适配器 */
const setFilterAdapter = (label: string, value: string) => {
  switch (label) {
    case "学历":
      {
        nurseFilesListViewModel.filterXl = value;
      }
      break;
    case "职称":
      {
        nurseFilesListViewModel.filterZc = value;
      }
      break;
    case "层级":
      {
        nurseFilesListViewModel.filterCj = value;
      }
      break;
    case "职务":
      {
        nurseFilesListViewModel.filterZw = value;
      }
      break;
    case "科室属性":
      {
        nurseFilesListViewModel.filterKs = value;
      }
      break;
    case "性别":
      {
        nurseFilesListViewModel.filterXb = value;
      }
      break;
    default:
  }
};
export default observer(function FilterCon() {
  const open = nurseFilesListViewModel.isOpenFilter;
  const [titleList, setTitleList]: any = useState([]);
  const [postList, setPostList]: any = useState([]);
  const [nansanTypeList, setNansanTypeList]: any = useState([]);
  const [educationList, setEducationList]: any = useState([]);
  const setOpen = (value: boolean) => {
    if (!value && nurseFilesListViewModel.pageSize < 20) {
      nurseFilesListViewModel.pageSize = 20;
      nurseFilesListViewModel.loadNursingList();
    }
    nurseFilesListViewModel.isOpenFilter = value;
  };
  let refForm = React.createRef<Form>();
  const onClose = (e: any, item: any) => {
    e.preventDefault();
    setFilterAdapter(item, "全部");
  };

  const onFieldChange = async (name: string, text: any, form: Form<any>) => {
    let [err, value] = await to(form.validateFields());


    /** 学历 */
    nurseFilesListViewModel.filterXl = value.education;
    /**  类型 */
    nurseFilesListViewModel.filterCj = value.nurseHierarchy;
    /** 职称 */
    nurseFilesListViewModel.filterZc = value.newTitle;
    /** 职务 */
    nurseFilesListViewModel.filterZw = value.job;
    /** 性别 */
    nurseFilesListViewModel.filterXb = value.sex;
    /** 工作年限 */
    nurseFilesListViewModel.goHospitalWorkStartYear = value.goHospitalWork
      ? value.goHospitalWork[0]
      : "";
    nurseFilesListViewModel.goHospitalWorkEndYear = value.goHospitalWork
      ? value.goHospitalWork[1]
      : "";
    nurseFilesListViewModel.loadNursingList();
  };

  useEffect(() => {
    /** 职务 */
    service.commonApiService.dictInfo("user_new_job").then(res => {
      setPostList(res.data);
    });

    /** 职称 */
    service.commonApiService.dictInfo("user_new_title").then(res => {
      setTitleList(res.data);
    });

    /** 类型 --南医三专有 */
    service.commonApiService.dictInfo("user_new_nansan_type").then(res => {
      setNansanTypeList(res.data);
    });

    /** 学历 */
    service.commonApiService
      .dictInfo("user_new_highest_education")
      .then(res => {
        setEducationList(res.data);
      });
  }, []);

  return (
    <Wrapper>
      <Head>
        <div className="left">
          选择：
          {Object.keys(FILTER_MAP).map(
          (item: any) =>
            getFilterAdapter(item) &&
            getFilterAdapter(item) !== "全部" && (
              <Tag closable onClose={(e: any) => onClose(e, item)} key={item}>
                {(() => {
                  let val = getFilterAdapter(item)
                  if (item == '性别') {
                    switch (val) {
                      case '0':
                        val = '男'
                        break
                      case '1':
                        val = '女'
                        break
                    }
                  }
                  return val
                })()}
              </Tag>
            )
        )}
        </div>
        <div className="right">
          <Button
            icon={open ? "down" : "left"}
            onClick={() => setOpen(!open)}
            size="small"
          >
            {open ? "隐藏" : "展开"}
          </Button>
        </div>
      </Head>
      <Inner open={open}>
        <Form ref={refForm} labelWidth={80} onChange={onFieldChange}>
          <Row gutter={0}>
            <Col span={7} className="long">
              <Form.Field label={"来院工作时间"} name={"goHospitalWork"}>
                <YearTimeRangePicker />
              </Form.Field>
            </Col>

            <Col span={4} className="short">
              <Form.Field label={"职务"} name={"job"}>
                <Select allowClear={true}>
                  {postList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>

            <Col span={5}>
              <Form.Field label={"类型"} name={"nurseHierarchy"}>
                <Select allowClear={true}>
                  {nansanTypeList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>

            <Col span={4} className="short">
              <Form.Field label={"职称"} name={"newTitle"}>
                <Select allowClear={true}>
                  {titleList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={4} className="short">
              <Form.Field label={"学历"} name={"education"}>
                <Select allowClear={true}>
                  {educationList.map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col span={4} className="short" style={{ marginLeft: 51 }}>
              <Form.Field label={"性别"} name={"sex"} >
                <Select allowClear={true}>
                  {[
                    { name: '男', code: '0' },
                    { name: '女', code: '1' },
                  ].map((item: any, index: number) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Inner>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
const Inner = styled.div<{ open: boolean }>`
  min-height: 100px;
  margin-top: 10px;
  padding: 25px 20px 0 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: ${p => p.theme.$shadow};
  ${p =>
    !p.open &&
    `
      min-height: 0;
      padding:0;
      height: 0;
      overflow: hidden;
    `}
  .label {
    margin-right: 6px;
  }
  .ant-select {

  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    overflow: hidden;
  }
  .short {
    .label {
      width: 50px;
    }
  }
  .long {
    .label {
      width: 100px;
    }
  }
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  * {
    font-size: 12px;
  }
`;
interface FilterItemProps {
  label: string;
  selected: string;
  options: string[];
}

const FilterItem = (props: FilterItemProps) => {
  const ItemStyl = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px dashed #dbe0e4;
    padding: 0 17px;
    .label {
      color: #999;
      margin-right: 20px;
    }
  `;
  const Option = styled.div<{ active: boolean }>`
    margin-right: 30px;
    cursor: pointer;
    color: ${p => (p.active ? p.theme.$mtdc : "inherit")};
    font-weight: ${p => (p.active ? "bold" : "normal")};
  `;
  let { label, options, selected } = props;
  return (
    <ItemStyl>
      <div className="label">{label}：</div>
      {options.map((item, index) => (
        <Option
          className="option"
          active={item === selected}
          key={index}
          onClick={() => setFilterAdapter(label, item)}
        >
          {item}
        </Option>
      ))}
    </ItemStyl>
  );
};
