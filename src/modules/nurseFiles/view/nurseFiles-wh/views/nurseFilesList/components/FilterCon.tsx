import styled from "styled-components";
import React, { useEffect, useLayoutEffect } from "react";
import { nurseFilesListViewModel } from "../NurseFilesListViewModel";
import { observer } from "mobx-react-lite";
import { to } from "src/libs/fns";
import Form from "src/components/Form";
import { Row, Col, Input, Select } from "src/vendors/antd";
import { statisticsViewModal } from "src/modules/nurseFiles/view/statistics/StatisticsViewModal";
import AgeRangePicker from "src/components/AgeRangePicker";
import YearTimeRangePicker from "src/components/YearTimeRangePicker";
import MonthTimeRangePicker from "src/components/MonthTimeRangePicker";
import { appStore } from "src/stores";
import emitter from "src/libs/ev";
import { cleanObj } from "src/utils/object/cleanObj";
import { Obj } from "src/libs/types";
import { IDENTITY_TYPES, CLOTHS_SIZES } from "src/modules/nurseFiles/enums";
import { DatePicker, Button } from "antd";
import { dateFormat3 } from "src/modules/nurseHandBookNew/views/detail-lyrm/config";
import HeightRangePicker from "src/components/HeightRangePicker";

const is925 = ['925', 'zjhj'].includes(appStore.HOSPITAL_ID)

export default observer(function FilterCon() {
  const open = nurseFilesListViewModel.isOpenFilter;

  const setOpen = (value: boolean) => {
    if (!value && nurseFilesListViewModel.pageSize < 20) {
      nurseFilesListViewModel.pageSize = 20;
      nurseFilesListViewModel.loadNursingList();
    }
    nurseFilesListViewModel.isOpenFilter = value;
  };

  let refForm = React.createRef<Form>();
  useLayoutEffect(() => {
    if (refForm.current) {
      refForm.current.clean();
      let form = refForm.current;
      nurseFilesListViewModel.init().then(res => {
        form &&
          form.setFields({
            deptCode: statisticsViewModal.selectedDeptCode,
            sex: ''
          });
      });
    }
  }, []);

  useEffect(() => {
    emitter.removeAllListeners("nurseFileResize");
    emitter.addListener("nurseFileResize", () => {
      if (refForm.current) {
        (async () => {
          let form: any = refForm.current;
          let [err, value] = await to(form.validateFields());
          let nullObj = cleanObj(value);
          statisticsViewModal.reSetDept();
          form.setFields(
            Object.assign(nullObj, {
              deptCode: statisticsViewModal.reSetDept()
            })
          );
        })();
      }
    });
  });
  const onFieldChange = async (name: string, text: any, form: Form<any>) => {
    let [err, value] = await to(form.validateFields());
    if (err) return;
    if (value.deptCode && value.deptCode.length > 1) {
      if (value.deptCode[value.deptCode.length - 1] === "全院") {
        value.deptCode = ["全院"];
        form.setField("deptCode", value.deptCode);
        return;
      } else if (value.deptCode.includes("全院")) {
        value.deptCode = value.deptCode.filter((item: any) => item !== "全院");
        form.setField("deptCode", value.deptCode);
        return;
      } else if (value.deptCode[value.deptCode.length - 1] === "全部") {
        value.deptCode = ["全部"];
        form.setField("deptCode", value.deptCode);
        return;
      } else if (value.deptCode.includes("全部")) {
        value.deptCode = value.deptCode.filter((item: any) => item !== "全部");
        form.setField("deptCode", value.deptCode);
        return;
      }
    }
    let deptCodes;
    if (value.deptCode.length === 1 && value.deptCode[0] === "全部") {
      deptCodes = statisticsViewModal
        .getDict("全部科室")
        .map((item: any) => item.code)
        .filter((item: any) => item !== "全部");
    } else {
      deptCodes = value.deptCode;
    }
    let postObj: any = {
      deptCodes: deptCodes,
      name: value.name,
      newTitle: value.newTitle,
      nurseHierarchy: value.nurseHierarchy,
      membershipCardNumber: value.membershipCardNumber,
      job: value.job,
      jobList: value.jobList,
      highestEducation: value.highestEducation,
      politicsLook: value.politicsLook,
      workAddress: value.workAddress,
      initialEducation: value.initialEducation,
      shoeSize: value.shoeSize,
      address: value.address,
      workConversion: value.workConversion,
      ageStart: value.age ? value.age[0] : "",
      ageEnd: value.age ? value.age[1] : "",
      goHospitalWorkStartYear: value.goHospitalWork
        ? value.goHospitalWork[0]
        : "",
      goHospitalWorkEndYear: value.goHospitalWork
        ? value.goHospitalWork[1]
        : "",
      zyzsEffectiveUpStartDate: value.zyzsEffectiveUp
        ? value.zyzsEffectiveUp[0]
        : "",
      zyzsEffectiveUpEndDate: value.zyzsEffectiveUp
        ? value.zyzsEffectiveUp[1]
        : ""
    };
    if (['lyrm', 'stmz'].includes(appStore.HOSPITAL_ID)) {
      postObj.sex = value.sex
    }

    const [t1, t2] = value.zyzsEffectiveUpDate || []

    if (is925) {
      if(appStore.HOSPITAL_ID === '925'){
        postObj.identityType =value.identityType && value.identityType.indexOf('类') > 0 ? value.identityType.slice(0,2) : value.identityType
        postObj.nurseDressSize = value?.nurseDressSize || ''
        postObj.zyzsEffectiveUpStartDate = t1 ? t1.format(dateFormat3) : ''
        postObj.zyzsEffectiveUpEndDate = t2 ? t2.format(dateFormat3) : ''
        postObj.sex = value?.sex
        postObj.teachingTraineeQualification = value?.teachingTraineeQualification || ''
        postObj.nursingInstructor = value?.nursingInstructor || ''

      }else{
        postObj.identityType = value.identityType
      }
      // postObj.rewardName = value.rewardName
      const [d1, d2] = value.goHospitalWorkDate || []
      postObj.goHospitalWorkDateStart = d1 ? d1.format(dateFormat3) : ''
      postObj.goHospitalWorkDateEnd = d2 ? d2.format(dateFormat3) : ''
      
      

      if(value.heightRange){
        if(Number(value.heightRange[0]) > 0 && Number(value.heightRange[1]) === 0){
          // 只有开始身高或者只有结束身高
          return false
        }
        if(Number(value.heightRange[0]) === 0 && Number(value.heightRange[1]) > 0){
          return false
        }
      }
      postObj.heightBeginIndex = value.heightRange?Number(value.heightRange[0]):null //身高起始坐标
      postObj.heightEndIndex = value.heightRange?Number(value.heightRange[1]):null //身高终止坐标
    }
    statisticsViewModal.selectedDeptCode = value.deptCode;
    nurseFilesListViewModel.postObj = postObj;
    'qhwy' === appStore.HOSPITAL_ID && (nurseFilesListViewModel.pageIndex = 1)
    nurseFilesListViewModel.loadNursingList();
  };

  return (
    <Wrapper>
      <Inner style={{'height': open && ['925'].includes(appStore.HOSPITAL_ID) ? '150px' : 'auto'}}>
        <Form ref={refForm} labelWidth={80} onChange={onFieldChange}>
          <Row gutter={0}>
            <Col span={5} style={{ marginBottom: -6 }}>
              <Form.Field label={"科室"} name={"deptCode"}>
                <Select
                  mode="multiple"
                  allowClear={true}
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {statisticsViewModal
                    .getDict("全部科室")
                    .map((item, index) => (
                      <Select.Option value={item.code} key={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={7} className="long">
              <Form.Field label={is925 ? "来院工作年限" : "来院工作时间"} name={"goHospitalWork"}>
                <YearTimeRangePicker />
              </Form.Field>
            </Col>

            <Col span={4} className="short">
              {
                appStore.HOSPITAL_ID !== 'qhwy' ? 
                <Form.Field label={"职务"} name={"job"}>
                  <Select allowClear={true}>
                    {statisticsViewModal.getDict("职务").map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field> :
                <Form.Field label={"职务"} name={"jobList"}>
                  <Select allowClear={true} mode="multiple">
                    {statisticsViewModal.getDict("职务").map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              }
            </Col>
            <Col span={4}>
              <Form.Field label={"最高学历"} name={"highestEducation"}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict("学历").map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={4} className="long">
              <Form.Field label={"工号或姓名"} name={"name"}>
                <Input />
              </Form.Field>
            </Col>

            <Col span={5}>
              <Form.Field label={"层级"} name={"nurseHierarchy"}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict("层级").map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={7} className="long">
              <Form.Field label={"年龄"} name={"age"}>
                <AgeRangePicker />
              </Form.Field>
            </Col>
            <Col span={4} className={open ? 'marginBottom short': 'short'}>
              <Form.Field label={"职称"} name={"newTitle"}>
                <Select allowClear={true}>
                  {statisticsViewModal
                    .getDict("技术职称")
                    .map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={4} className={open ? 'marginBottom': ''}>
              <Form.Field label={"政治面貌"} name={"politicsLook"}>
                <Select allowClear={true}>
                  {statisticsViewModal
                    .getDict("政治面貌")
                    .map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
            </Col>

            {!is925&&<Col span={4} className="long">
              <Form.Field label={"院内工作地点"} name={"workAddress"}>
                <Select allowClear={true}>
                  {statisticsViewModal
                    .getDict("院内工作地点")
                    .map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
            </Col>}
            {appStore.HOSPITAL_ID === 'gxjb' ?
              <Col span={5}>
                <Form.Field label={"家庭住址"} name={"address"}>
                  <Input />
                </Form.Field>
              </Col> :
              <Col span={5}>
                <Form.Field label={"鞋码大小"} name={"shoeSize"}>
                  <Select allowClear={true}>
                    {statisticsViewModal
                      .getDict("鞋码大小")
                      .map((item, index) => (
                        <Select.Option value={item.code} key={index}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Field>
              </Col>}

            { !['925'].includes(appStore.HOSPITAL_ID) && 
            <Col span={7} className="long">
              <Form.Field label={"执业证书有效期"} name={"zyzsEffectiveUp"}>
                <MonthTimeRangePicker />
              </Form.Field>
            </Col>
            }
            {is925 ? <Col span={7} className="short">
                <Form.Field label={"身高"} name={"heightRange"}>
                  <HeightRangePicker />
                </Form.Field>
                
              </Col>:
            <Col span={4} className="short">
              <Form.Field label={"编制"} name={"workConversion"}>
                <Select allowClear={true}>
                  {statisticsViewModal
                    .getDict("工作编制")
                    .map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
            </Col>}
            {['qhwy', 'whhk', 'dglb', 'dghm'].includes(appStore.HOSPITAL_ID) &&
              <Col span={4} className="long--static">
                <Form.Field label={"护理学会会员证号"} name={"membershipCardNumber"}>
                  <Input />
                </Form.Field>
              </Col>}
              {['qhwy'].includes(appStore.HOSPITAL_ID) && <Col span={4} className="long">
              <Form.Field label={"初始学历"} name={"initialEducation"}>
                <Select allowClear={true}>
                  {statisticsViewModal
                    .getDict("初始学历")
                    .map((item, index) => (
                      <Select.Option value={item.code} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Field>
            </Col>}
            {['lyrm', 'stmz'].includes(appStore.HOSPITAL_ID) &&
              <Col span={4} className="short">
                <Form.Field label={"性别"} name={"sex"}>
                  <Select>
                    {
                      [
                        {value: '', label: '全部' },
                        {value: 1, label: '女' },
                        {value: 0, label: '男' },
                      ].map(v => (
                        <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>}
            {is925 && <>
              <Col span={4} >
                <Form.Field label={"身份类别"} name={"identityType"}>
                  <Select>
                    {
                      [
                        { code: '', name: '全部' },
                        ...IDENTITY_TYPES
                      ].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              {/* <Col span={4} className="short">
                <Form.Field label={"立功嘉奖"} name={"rewardName"}>
                  <Select>
                    {
                      [
                        { code: '', name: '全部' },
                        ...MERITORIOUS_PERFORMANCE
                      ].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col> */}
              {appStore.HOSPITAL_ID !== '925' && <Col span={6} className="long">
                <Form.Field label={"来院工作时间"} name={"goHospitalWorkDate"}>
                  <DatePicker.RangePicker />
                </Form.Field>
              </Col>
              }
              </>}
            
              {['925'].includes(appStore.HOSPITAL_ID) && <>
                <Col span={4}>
                  <Form.Field label={"护士服尺码"} name={"nurseDressSize"}>
                    <Select>
                      {
                        CLOTHS_SIZES.map(v => (
                          <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Field>
                </Col>
                <Col span={4} >
                  <Form.Field label={"性别"} name={"sex"}>
                    <Select>
                      {
                        [
                          {value: '', label: '全部' },
                          {value: 1, label: '女' },
                          {value: 0, label: '男' },
                        ].map(v => (
                          <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Field>
                </Col>
                <Col span={4} className="long">
                  <Form.Field label={"实习生带教资质"} name={"teachingTraineeQualification"}>
                    <Select>
                      {
                        [{code: '', name: '全部' }, { "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                          <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Field>
                </Col>
                <Col span={4} className="long">
                  <Form.Field label={"护理教员"} name={"nursingInstructor"}>
                    <Select>
                      {
                        [{code: '', name: '全部' }, { "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                          <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Field>
                </Col>
                <Col span={6} className="long">
                  <Form.Field label={"来院工作时间"} name={"goHospitalWorkDate"}>
                    <DatePicker.RangePicker />
                  </Form.Field>
                </Col>
                <Col span={8} className="moreLong">
                  <Form.Field label={"护士执业证书有效截止日期"} name={"zyzsEffectiveUpDate"}>
                    <DatePicker.RangePicker />
                  </Form.Field>
                </Col>
              </>}
          </Row>
        </Form>
        { ['925'].includes(appStore.HOSPITAL_ID) && 
        <div className="showHiddenIcon">
          <Button
            icon={open ? "down" : "up"}
            onClick={() => setOpen(!open)}
            size="small"
          >
            {open ? "展开" : "隐藏"}
          </Button>
        </div>}
      </Inner>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  
`;
const Inner = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100px;
  margin-top: 10px;
  padding: 25px 20px 10px 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: ${p => p.theme.$shadow};
  .marginBottom{
    margin-bottom: 40px
  }
  .showHiddenIcon{
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 2px;
    .ant-btn{
      font-size: 12px;
    }
  }
  .label {
    margin-right: 6px;
  }
  .ant-select {
    height: 26px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    height: 26px;
    // overflow: hidden;
  }
  .ant-select-selection__rendered{
    height: 100%;
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
  .long--static {
    .label {
      width: 120px;
    }
  }
  .moreLong{
    .label {
      width: 180px;
    }
  }
`;
