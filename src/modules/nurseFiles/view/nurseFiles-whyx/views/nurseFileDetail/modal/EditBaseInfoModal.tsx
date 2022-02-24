import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import {
  Modal,
  Input,
  Button,
  Radio,
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
import {
  TITLE_LIST,
  POST_LIST,
} from "../../nurseFilesList/modal/AddNursingModal";
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
import { formatIdCord, formatAge } from "src/utils/idCard/idCard";
import SelectOrAutoInput from "../components/SelectOrAutoInput";
import tinyPic from "src/utils/img/tinyPic";
const Option = Select.Option;
export interface Props extends ModalComponentProps {
  id?: number;
  data?: any;
  getTableData?: () => {};
}
const uploadCard = () => Promise.resolve("123");
const rules: Rules = {
  cardNumber: (val: any) => {
    if (val && val.length != 18) {
      return "身份证格式不正确";
    } else {
      return true;
    }
  },
  phone: (val: any) => {
    if (val && val.length != 11) return "手机号格式不正确"
    else return true
  }
};
export default function EditWorkHistoryModal(props: Props) {
  let { visible, onCancel, onOk, data, id } = props;
  let refForm = React.createRef<Form>();
  const [nativePlaceList, setNativePlaceList] = useState([]);

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
    value.zyzsNursingPostDate &&
      (value.zyzsNursingPostDate = value.zyzsNursingPostDate.format(
        "YYYY-MM-DD"
      ));
    value.jobStartDate &&
      (value.jobStartDate = value.jobStartDate.format("YYYY-MM-DD"));
    value.zyzsUrl && (value.zyzsUrl = value.zyzsUrl.join(","));
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
  /** 时间关联年数 */
  const computedDateToYear = (dateKey: string, yearKey: string) => {
    if (refForm.current) {
      let date = refForm.current.getField(dateKey);
      if (date) {
        let year = formatAge(date.format("YYYY-MM-DD"));
        if (year > -1) {
          refForm.current.setField(yearKey, year);
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
      refForm!.current!.setFields({
        ...data,
        ...{
          birthday: data.birthday || null,
          zyzsDate: data.zyzsDate || null,
          zyzsNursingPostDate: data.zyzsNursingPostDate
            ? moment(data.zyzsNursingPostDate)
            : null,
          takeWorkTime: data.takeWorkTime || null,
          goHospitalWorkDate: data.goHospitalWorkDate || null,
          jobStartDate: data.jobStartDate ? moment(data.jobStartDate) : null,
          highestEducationDate: data.highestEducationDate || null,
          zyzsEffectiveUpDate: data.zyzsEffectiveUpDate || null,
          zyzsUrl: data.zyzsUrl ? data.zyzsUrl.split(",") : [],
        },
      });
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
      footer={[
        <Button key="back" onClick={onCancel}>
          关闭
        </Button>,
        <Button key="save" type="primary" onClick={() => onSave(false)}>
          保存
        </Button>,
        <Button key="submit" type="primary" onClick={() => onSave(true)}>
          提交审核
        </Button>,
      ]}
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
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`民族`} name="nation">
              <Input />
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
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`政治面貌`} name="politicsLook">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`出生年月`} name="birthday">
              <Input disabled />
            </Form.Field>
          </Col>{" "}
          <Col span={12}>
            <Form.Field label={`年龄`} name="age">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`婚姻状况`} name="maps.maritalstatus">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`生育情况`} name="maps.fertility">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`手机号`} name="phone">
              <Input maxLength={11} />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`现住址`} name="address">
              <Input />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`参加工作时间`} name={'takeWorkTime'}>
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最近入职时间`} name="maps.hiredate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`来院工作时间`} name="goHospitalWorkDate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护士执业证书编号`} name="zyzsNumber">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`取得护士执业证书时间`} name="zyzsDate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`本院注册时间`} name="maps.registerdate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护士执业证书有效期`} name="zyzsEffectiveUpDate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`取得执业证书并从事护理岗位时间`} name="zyzsNursingPostDate">
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`初始学历`} name="initialEducation">
              {/* <Input /> */}
              <Select>
                {nurseFileDetailViewModal.getDict("最高学历类型").map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高学历`} name="highestEducation">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`取得最高学历时间`} name="highestEducationDate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高学位`} name="highestEducationDegree">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`最高职称`} name="newTitle">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`评职日期`} name="employNewTiTleDate">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`职务`} name="job">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`现职务任职起始时间`} name="jobStartDate">
              {/* <Input disabled /> */}
              <DatePicker />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护理层级`} name="nurseHierarchy">
              <Input disabled/>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`护理层级起始时间`} name="maps.nursinglevelstartdate">
              <Input disabled/>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`院内工作区域`} name="workAddress">
              <Input maxLength={25} />
            </Form.Field>
          </Col>
          {/* <Col span={12}>
            <Form.Field label={`工作护理单元`} name="deptName">
              <Input disabled />
            </Form.Field>
          </Col> */}
          <Col span={12}>
            <Form.Field
              label={`工作护理单元`}
              name="deptName"
              onValueChange={changeDept}
            >
              <Select disabled>
                {authStore.deptList.map((item) => (
                  <Select.Option value={item.name} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`鞋码大小`} name="shoeSize">
              <Select>
                {nurseFileDetailViewModal.getDict("鞋码大小").map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
          <Col span={12}>
            {/* todo */}
            <Form.Field label={`工作服码数`} name="maps.workclothessize">
              <Select>
                {nurseFileDetailViewModal.getDict("工作服码数").map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Field label={`部门类型`} name="maps.depttype">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`人员类别`} name="maps.emptype">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`职工类型`} name="maps.worktype">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`是否已转正`} name="maps.formalemp">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`合同类型`} name="maps.contracttype">
              <Input disabled />
            </Form.Field>
          </Col>
          <Col span={12}>
            <Form.Field label={`合同到期时间`} name="maps.contractexdate">
              <Input disabled />
            </Form.Field>
          </Col>
        </Row>
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
              {/* <ImageUploader upload={uploadCard} text='添加护士执业证书' /> */}
              <MultipleImageUploader
                text="添加图片"
                tip={
                  "1.上传护士执业证书，从第一个卫生部盖章页至最末次延续注册盖章页; "
                }
              />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal >
  );
}
const Wrapper = styled.div``;
