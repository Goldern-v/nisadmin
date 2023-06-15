import React, { useState, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  message,
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { nurseFilesService } from "../../../services/NurseFilesService";
import { nurseFileDetailViewModal } from "../NurseFileDetailViewModal";

import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import moment from "moment";
// 加附件
import ImageUploader from "src/components/ImageUploader";
import { appStore, authStore } from "src/stores";
import service from "src/services/api";
import emitter from "src/libs/ev";
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
import { AutoComplete } from "src/vendors/antd";
import { formatIdCord } from "src/utils/idCard/idCard";
import SelectOrAutoInput from "../components/SelectOrAutoInput";
import tinyPic from "src/utils/img/tinyPic";
import { CLOTHS_SIZES, TITLE_TYPES, IDENTITY_TYPES } from "src/modules/nurseFiles/enums";
import { strFormatIntoMoment } from "src/utils/moment/crrentMonth";
import { Obj } from "src/libs/types";
import DatePickerCheckbox from "../components/DatePickerCheckbox";
import cloneDeep from 'lodash/cloneDeep'

export interface Props extends ModalComponentProps {
  id?: number;
  data?: any;
  getTableData?: () => {};
}

const rules: Rules = {
  cardNumber: (val: any) => {
    if (val && val.length != 18) {
      return "身份证格式不正确";
    } else {
      return true;
    }
  },
  ...appStore.hisMatch({
    map: {
      wh: {
        sex: (val: any) => !!val || '请选择性别',
        age: (val: any) => !!val || '请选择年龄',
        // 'maps.user_hierarchy': (val: any) => !!val || '请选择层级',
        job: (val: any) => !!val || '请选择职务',
        phone: (val: any) => !!val || '请选择手机号',
        highestEducation: (val: any) => !!val || '请选择最高学历',
        nativePlace: (val: any) => !!val || '请选择籍贯',
        politicsLook: (val: any) => !!val || '请选择政治面貌',
        nation: (val: any) => !!val || '请选择民族',
        workAddress: (val: any) => !!val || '请选择院内工作地点',
        shoeSize: (val: any) => !!val || '请选择鞋码大小',
        takeWorkTime: (val: any) => !!val || '请选择参加工作时间',
      },
      other: {}
    }
  })
};
const isSdlj = ['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)
const isQhwy = ['qhwy', 'whhk', 'dglb'].includes(appStore.HOSPITAL_ID)
const Indef = '无限期'

export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, id } = props;
  let refForm = React.createRef<Form>();
  const [nativePlaceList, setNativePlaceList] = useState([]);
  const initFooterList = () => {
    let footerList: any[] = []
    // if (['ytll'].includes(appStore.HOSPITAL_ID)) {
    footerList = [
      <Button key="back" onClick={onCancel}>
        关闭
      </Button>
    ]
    if (data?.needAudit) {
      footerList.push(<Button key="submit" type="primary" onClick={() => onSave(true)}>
        提交审核
      </Button>)
    } else {
      footerList.push(<Button key="save" type="primary" onClick={() => onSave(false)}>
        保存
      </Button>)
    }
    // }
    // else {
    //   footerList = [
    //     <Button key="back" onClick={onCancel}>
    //       关闭
    //     </Button>,
    //     <Button key="save" type="primary" onClick={() => onSave(false)}>
    //       保存
    //     </Button>,
    //     <Button key="submit" type="primary" onClick={() => onSave(true)}>
    //       提交审核
    //     </Button>,
    //   ]
    // }
    return footerList
  }

  const onFieldChange = (name: any, value: any, form: Form<any>) => {
    if (name == "nativePlace") {
      if (value) {
        nurseFilesService.nurseNativePlaceFindByName(value).then((res) => {
          setNativePlaceList(
            res.data.list
              .filter((item: any, index: number) => index < 100)
              .map((item: any) => item.nativePlaceName)
          );
        });
      } else {
        setNativePlaceList([]);
      }
    }
  };

  const uploadCard = async (file: any) => {
    let img = await tinyPic(file);
    var fileObj = new File([img.img], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
    let obj: any = {
      file: fileObj,
      empNo: appStore.queryObj.empNo,
      type: "0",
    };

    const [err, res] = await to(service.commonApiService.uploadFile(obj));
    if (err) {
      return "";
    }
    if (res.data) {
      let pathImg = `${res.data.path}`;
      return pathImg;
    }
  };
  /**moment对象转字符串 */
  const momentFormatIntoStr = (obj: Obj, key: string, formatText = 'YYYY-MM-DD') => {
    if (!key.includes('.'))
      return obj[key] && (obj[key] = obj[key].format(formatText));
    const keys = key.split('.')
    const len = keys.length
    let val: any = ''
    // val的上级
    let parentObj = obj
    let i = 0
    while (i < len) {
      if (parentObj === null) {
        return
      }
      val = parentObj[keys[i]]
      if (val === undefined) return
      if (i < len - 1) parentObj = val
      ++i
    }
    return val && (parentObj[keys[len - 1]] = moment.isMoment(val) ? val.format(formatText) : val)
  }

  const onSave = async (sign: boolean) => {
    let obj = {
      id: id,
      auditedStatus: "",
    };
    if ((authStore.user && authStore.user.post) == "护长") {
      obj.auditedStatus = "waitAuditedNurse";
    } else if ((authStore.user && authStore.user.post) == "护理部") {
      obj.auditedStatus = "waitAuditedDepartment";
    }

    if (!refForm.current) return;
    let [err, value] = await to(refForm.current.validateFields());
    if (err) return;
    momentFormatIntoStr(value, 'birthday')
    momentFormatIntoStr(value, 'zyzsDate')
    momentFormatIntoStr(value, 'zyzsNursingPostDate')

    momentFormatIntoStr(value, 'takeWorkTime')
    momentFormatIntoStr(value, 'goHospitalWorkDate')
    momentFormatIntoStr(value, 'jobStartDate')
    momentFormatIntoStr(value, 'highestEducationDate')
    momentFormatIntoStr(value, 'zyzsEffectiveUpDate')
    momentFormatIntoStr(value, 'newTitleDate')
    momentFormatIntoStr(value, 'maps.contract_due_date')
    value.zyzsUrl && (value.zyzsUrl = value.zyzsUrl.join(","));
    value?.maps?.meritorious_performance && delete value.maps.meritorious_performance
    if ('whhk' === appStore.HOSPITAL_ID) {
      value.maps.highesteducation_url = value.maps.highesteducation_url ? value.maps.highesteducation_url.join(',') : ''
      value.maps.newtitle_url = value.maps.newtitle_url ? value.maps.newtitle_url.join(',') : ''
      value.maps.specialistnurse_url = value.maps.specialistnurse_url ? value.maps.specialistnurse_url.join(',') : ''
    }
    // value?.maps?.schoolname && delete value.maps.schoolname
    nurseFilesService
      .saveOrUpdate({ ...value, ...obj, sign })
      .then((res: any) => {
        message.success("保存成功");
        props.getTableData && props.getTableData();
        emitter.emit("refreshNurseFileDeatilLeftMenu");
        onCancel();
      });
  };

  /** 解析身份证赋值给出生日期，年龄 */
  const computedIdCard = () => {
    if (refForm.current) {
      let cardNumber = refForm.current.getField("cardNumber");

      if (cardNumber) {
        let cardObj = formatIdCord(cardNumber);
        if (cardObj.legal) {
          let age = cardObj.age;
          let birthday = cardObj.birthday;
          if (age && age > -1) {
            refForm.current.setField("age", age);
          }
          refForm.current.setField("birthday", moment(birthday));
        }
      }
    }
  };

  /** 修改科室 */
  const changeDept = () => {
    if (refForm.current) {
      let name = refForm.current.getField("deptName");
      if (name) {
        let dept = authStore.deptList.find((item) => item.name == name);
        if (dept) {
          refForm.current.setField("deptCode", dept.code);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean();
    /** 如果是修改 */
    if (data && refForm.current && visible) {
      const newData = cloneDeep(data)
      const newObj = {
        ...newData,
        ...{
          birthday: strFormatIntoMoment(data.birthday),
          zyzsDate: strFormatIntoMoment(data.zyzsDate),
          zyzsNursingPostDate: strFormatIntoMoment(data.zyzsNursingPostDate),
          takeWorkTime: strFormatIntoMoment(data.takeWorkTime),
          goHospitalWorkDate: strFormatIntoMoment(data.goHospitalWorkDate),
          jobStartDate: strFormatIntoMoment(data.jobStartDate),
          highestEducationDate: strFormatIntoMoment(data.highestEducationDate),
          zyzsEffectiveUpDate: strFormatIntoMoment(data.zyzsEffectiveUpDate),
          zyzsUrl: data.zyzsUrl ? data.zyzsUrl.split(",") : [],
          goWorkTime: strFormatIntoMoment(data.goWorkTime),
          newTitleDate: strFormatIntoMoment(data.newTitleDate),
        },
      }
      // maps中的数据格式化
      if (newObj?.maps?.contract_due_date !== undefined && newObj?.maps?.contract_due_date != Indef) {
        newObj!.maps!.contract_due_date = strFormatIntoMoment(newObj?.maps?.contract_due_date)
      }

      if (newObj?.maps?.meritorious_performance !== undefined) {
        newObj!.maps!.meritorious_performance = newObj!.maps!.meritorious_performance ? newObj!.maps!.meritorious_performance?.toString().split(",") : []
      }
      if (newObj?.maps?.highesteducation_url !== undefined) {
        newObj!.maps!.highesteducation_url = newObj!.maps!.highesteducation_url ? newObj!.maps!.highesteducation_url?.toString().split(",") : []
      }
      if (newObj?.maps?.newtitle_url !== undefined) {
        newObj!.maps!.newtitle_url = newObj!.maps!.newtitle_url ? newObj!.maps!.newtitle_url?.toString().split(",") : []
      }
      if (newObj?.maps?.specialistnurse_url !== undefined) {
        newObj!.maps!.specialistnurse_url = newObj!.maps!.specialistnurse_url ? newObj!.maps!.specialistnurse_url?.toString().split(",") : []
      }
      refForm!.current!.setFields(newObj);
    }
  }, [visible]);

  return (
    <Modal
      title="修改基本信息"
      width={1000}
      visible={visible}
      onCancel={onCancel}
      forceRender
      centered
      footer={initFooterList()}
    >
      <Form
        ref={refForm}
        labelWidth={200}
        onChange={onFieldChange}
        rules={rules}
      >
        <Row>
          <Col span={12}>
            <Form.Field label={`姓名`} name="empName">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`性别`} name="sex">
              <Select>
                {nurseFileDetailViewModal.getDict("性别").map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`民族`} name="nation">
              <Select>
                {nurseFileDetailViewModal.getDict("民族").map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`籍贯`} name="nativePlace">
              <AutoComplete dataSource={nativePlaceList} />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`工号`} name="empNo">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field
              label={`身份证号`}
              name="cardNumber"
              onValueChange={computedIdCard}
            >
              <Input />
            </Form.Field>
          </Col>
          <Col span={12} style={{ height: '52px' }}>
            <Form.Field label={`政治面貌`} name="politicsLook">
              <SelectOrAutoInput dict="政治面貌" />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`出生年月`} name="birthday">
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`年龄`} name="age">
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`手机号`} name="phone">
              <Input />
            </Form.Field>
          </Col>
          {
            'whhk' === appStore.HOSPITAL_ID && <>
              <Col span={12}>
                <Form.Field label={`工作服大小`} name="maps.work_clothes_size">
                  <Select>
                    {nurseFileDetailViewModal.getDict("工作服大小").map((item) => (
                      <Select.Option value={item.code} key={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label={`护士层级`} name="maps.user_hierarchy">
                  <Select>
                    {nurseFileDetailViewModal.getDict("护士层级").map((item) => (
                      <Select.Option value={item.code} key={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label={`专科护士`} name="maps.nurse_name">
                  <Select>
                    {nurseFileDetailViewModal.getDict("专科护士").map((item) => (
                      <Select.Option value={item.code} key={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label={`专科护士级别`} name="maps.nurse_level">
                  <Select>
                    {nurseFileDetailViewModal.getDict("专科护士级别").map((item) => (
                      <Select.Option value={item.code} key={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Field>
              </Col>
            </>
          }
          {
            !['925'].includes(appStore.HOSPITAL_ID) && <Col span={12}>
              <Form.Field label={`参加工作时间`} name={['fsxt', '925'].includes(appStore.HOSPITAL_ID) ? 'goWorkTime' : 'takeWorkTime'}>
                <DatePicker />
              </Form.Field>
            </Col>
          }
          <Col span={12}>
            <Form.Field label={`来院工作时间`} name="goHospitalWorkDate">
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护士执业证书编号`} name="zyzsNumber">
              <Input />
            </Form.Field>
          </Col>
          {
            !['925'].includes(appStore.HOSPITAL_ID) && <Col span={12}>
              <Form.Field label={`取得护士执业证书时间`} name="zyzsDate">
                <DatePicker />
              </Form.Field>
            </Col>
          }
          {
            !['925'].includes(appStore.HOSPITAL_ID) && <Col span={12}>
              <Form.Field
                label={isSdlj ? '参加护理工作时间' : 'whhk' === appStore.HOSPITAL_ID ? '从事护理岗位时间' : `取得执业证书并从事护理岗位时间`}
                name="zyzsNursingPostDate"
              >
                <DatePicker />
              </Form.Field>
            </Col>
          }
          <Col span={12}>
            <Form.Field
              label={`护士执业证书有效截止日期`}
              name="zyzsEffectiveUpDate"
            >
              <DatePicker />
            </Form.Field>
          </Col>
          {
            !['fsxt', '925', 'dghm'].includes(appStore.HOSPITAL_ID) && <Col span={12}>
              <Form.Field label={`初始学历`} name="initialEducation">
                <Select>
                  {nurseFileDetailViewModal.getDict("初始学历").map((item) => (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          }
          {
            (['dghm'].includes(appStore.HOSPITAL_ID)) && <Col span={12}>
              <Form.Field label={`家庭住址`} name="address">
                <Input />
              </Form.Field>
            </Col>
          }
          {
            (['zhzxy'].includes(appStore.HOSPITAL_ID)) && <Col span={12}>
              <Form.Field label={`毕业学校`} name="maps.school_name">
                <Input />
              </Form.Field>
            </Col>
          }
          {
            (['zhzxy'].includes(appStore.HOSPITAL_ID)) && <Col span={12}>
              <Form.Field label={`所学专业`} name="maps.major">
                <Input />
              </Form.Field>
            </Col>
          }
          <Col span={12}>
            <Form.Field label={`最高学历`} name="highestEducation">
              <Select>
                {nurseFileDetailViewModal
                  .getDict("最高学历类型")
                  .map((item) => (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Field>
          </Col>
          {/* {appStore.HOSPITAL_ID  == 'zhzxy' &&(<span>
            <Col span={12}>
            <Form.Field label={`毕业学校`} name="schoolName">
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
          <Form.Field label={`所学专业`} name="major">
            <Input />
          </Form.Field>
        </Col>
          </span>)
          } */}
          {
            appStore.HOSPITAL_ID !== 'fsxt' && <Col span={12}>
              <Form.Field label={`取得最高学历时间`} name="highestEducationDate">
                <DatePicker />
              </Form.Field>
            </Col>
          }
          {
            !['fsxt'].includes(appStore.HOSPITAL_ID) && <Col span={12}>
              <Form.Field label={`最高学历学位`} name="highestEducationDegree">
                <AutoComplete
                  dataSource={nurseFileDetailViewModal
                    .getDict("学位")
                    .map((item) => item.name)}
                />
              </Form.Field>
            </Col>
          }
          <Col span={12} style={{ height: '52px' }}>
            <Form.Field label={`职务`} name="job">
              <SelectOrAutoInput dict="职务" />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`现职务任职起始时间`} name="jobStartDate">
              <DatePicker />
            </Form.Field>
          </Col>
          {
            !['fsxt', '925'].includes(appStore.HOSPITAL_ID) && <Col span={12} style={{ height: '52px' }}>
              <Form.Field label={['wjgdszd'].includes(appStore.HOSPITAL_ID) ? '编制科室' : `院内工作地点`}
                name="workAddress">
                <SelectOrAutoInput dict="院内工作地点" />
              </Form.Field>
            </Col>
          }
          <Col span={12}>
            <Form.Field
              label={`工作护理单元`}
              name="deptName"
              onValueChange={changeDept}
            >
              <Select>
                {authStore.deptList.map((item) => (
                  <Select.Option value={item.name} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            {
              appStore.hisMatch({
                map: {
                  gxjb: (
                    <Form.Field label={`家庭住址`} name="address">
                      <Input />
                    </Form.Field>),
                  "dghm,925": (
                    <Form.Field label={`现职称`} name="newTitle">
                      <Select>
                        {TITLE_TYPES.map((item: any) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Field>),
                  other: (
                    <Form.Field label={isSdlj ? `夏季鞋码大小` : `鞋码大小`} name="shoeSize">
                      {['lyrm', 'stmz'].includes(appStore.HOSPITAL_ID) ? <Input /> : <SelectOrAutoInput dict="鞋码大小" />}
                    </Form.Field>)
                },
                vague: true
              })
            }
          </Col>
          {
            isSdlj && <Col span={12} style={{ height: '52px' }}>
              <Form.Field label={`冬季鞋码大小`} name="maps.winter_shoe_size">
                <SelectOrAutoInput dict="鞋码大小" />
              </Form.Field>
            </Col>
          }
          {
            appStore.HOSPITAL_ID === "gzsrm" ? (
              <Col span={12}>
                <Form.Field label={`职称`} name="newTitle">
                  <Input disabled />
                </Form.Field>
              </Col>
            ) : (
              ""
            )
          }
          {
            isQhwy && <Col span={12}>
              <Form.Field label={`护理学会会员证号`} name="membershipCardNumber">
                <Input />
              </Form.Field>
            </Col>
          }
          {
            ['lyrm', 'stmz'].includes(appStore.HOSPITAL_ID) && <Col span={12}>
              <Form.Field label='个人住址' name="address">
                <Input />
              </Form.Field>
            </Col>
          }
          {
            'dghm' === appStore.HOSPITAL_ID &&
            <Col span={12}>
              <Form.Field label={`取得现有职称时间`} name="newTitleDate">
                <DatePicker />
              </Form.Field>
            </Col>
          }
          {
            '925' === appStore.HOSPITAL_ID && <>
              <Col span={12}>
                <Form.Field label='身高' name="maps.height">
                  <Input />
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='护士服尺码' name="maps.nurse_dress_size">
                  <Select>
                    {
                      CLOTHS_SIZES.map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='家庭住址' name="address">
                  <Input />
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='合同截至日期' name="maps.contract_due_date">
                  {/* <DatePicker /> */}
                  <DatePickerCheckbox text={Indef} />
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='身份类别' name="maps.identity_category">
                  <Select>
                    {
                      IDENTITY_TYPES.map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='新入职护士带教资质' name="maps.teaching_qualification">
                  <Select>
                    {
                      [{ "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='实习生带教资质' name="maps.teaching_trainee_qualification">
                  <Select>
                    {
                      [{ "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='管理培训班资质' name="maps.qualification_manage_training">
                  <Select>
                    {
                      [{ "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='专科护士' name="maps.specialist_nurse">
                  <Select>
                    {
                      [{ "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label='护理教员' name="maps.nursing_instructor">
                  <Select>
                    {
                      [{ "code": "有", "name": "有" }, { "code": "无", "name": "无" }].map(v => (
                        <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Field>
              </Col>
            </>
          }



          {/* <Col span={12}>
            <Form.Field label='立功表现' name="maps.meritorious_performance">
              <Select mode="multiple">
                {
                  MERITORIOUS_PERFORMANCE.map(v => (
                      <Select.Option value={v.code} key={v.code}>{v.name}</Select.Option>
                  ))
                }
              </Select>
            </Form.Field>
          </Col> */}
        </Row >
        <Row>
          <Col span={12}>
            <Form.Field label={`添加个人头像`} name="nearImageUrl">
              <ImageUploader
                upload={uploadCard}
                text="添加个人头像"
                tip={"上传近照一寸彩色照片"}
              />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`添加护士执业证书`} name="zyzsUrl">
              <MultipleImageUploader
                text="添加图片"
                tip={
                  "1.上传护士执业证书，从第一个卫生部盖章页至最末次延续注册盖章页; "
                }
              />
            </Form.Field>
          </Col>
        </Row>
        {
          'whhk' === appStore.HOSPITAL_ID && <>
            <Row>
              <Col span={12}>
                <Form.Field label={`添加最高学历学位照片`} name="maps.highesteducation_url">
                  <MultipleImageUploader
                    text="添加图片"
                  />
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label={`添加职业证书电子版`} name="maps.newtitle_url">
                  <MultipleImageUploader
                    text="添加图片"
                  />
                </Form.Field>
              </Col>
              <Col span={12}>
                <Form.Field label={`添加专科护士证书`} name="maps.specialistnurse_url">
                  <MultipleImageUploader
                    text="添加图片"
                  />
                </Form.Field>
              </Col>
            </Row>
          </>
        }
      </Form >
    </Modal >
  );
}
