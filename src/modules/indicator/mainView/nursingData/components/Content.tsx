import styled from "styled-components";
import React, { useLayoutEffect } from "react";
import { observer } from "src/vendors/mobx-react-lite";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Input, Spin } from "src/vendors/antd";
import { nursingDataModal } from "../NursingDataModal";

interface Props {}

export default observer(function Content(props: Props) {
  // 配置数据
  const data: any = [
    {
      title: "一、护士数量配置相关数据",
      data: [
        {
          name: "本季度实际开放床位数 ",
          value: nursingDataModal.dataList.nurseCount.bedSize
        },
        {
          name: "季初病区执业护士总人数",
          value: nursingDataModal.dataList.nurseCount.totalNurseInBegin
        },
        {
          name: "季末病区执业护士总人数",
          value: nursingDataModal.dataList.nurseCount.totalNurseInEnd
        },
        {
          name: "本季度白班责任护士数",
          value: nursingDataModal.dataList.nurseCount.nurseSizeInARange
        },
        {
          name: "本季度白班护理患者数",
          value: nursingDataModal.dataList.nurseCount.patientDaySizeInARange
        },
        {
          name: "本季度夜班责任护士数",
          value: nursingDataModal.dataList.nurseCount.nurseSizeInNRange
        },
        {
          name: "本季度夜班护理患者数",
          value: nursingDataModal.dataList.nurseCount.patientDaySizeInNRange
        },
        {
          name: "本季度病区执业护士实际上班小时数 ",
          value: nursingDataModal.dataList.nurseCount.totalWorkTime
        },
        {
          name: "本季度住院患者实际占用床日数",
          value: nursingDataModal.dataList.nurseCount.totalPatientDaySize
        },
        {
          name: "季初在院患者数",
          value: nursingDataModal.dataList.nurseCount.patientSizeInBegin
        },
        {
          name: "本季度新入病区患者总数",
          value: nursingDataModal.dataList.nurseCount.patientSizeInEnd
        },
        {
          name: "特级护理患者占用床日数",
          value: nursingDataModal.dataList.nurseCount.patientDaySizeIn0l
        },
        {
          name: "一级护理患者占用床日数",
          value: nursingDataModal.dataList.nurseCount.patientDaySizeIn1l
        },
        {
          name: "二级护理患者占用床日数",
          value: nursingDataModal.dataList.nurseCount.patientDaySizeIn2l
        },
        {
          name: "三级护理患者占用床日数",
          value: nursingDataModal.dataList.nurseCount.patientDaySizeIn3l
        }
      ]
    },
    {
      title: "二、人力资源结构--职称相关数据",
      data: [
        {
          name: "季初护士（初级）人数 ",
          value: nursingDataModal.dataList.nurseTitleCount.juniorNurseInBegin
        },
        {
          name: "季初护师人数",
          value:
            nursingDataModal.dataList.nurseTitleCount.nursePractitionerInBegin
        },
        {
          name: "季初主管护师人数",
          value: nursingDataModal.dataList.nurseTitleCount.nurseInChargeInBegin
        },
        {
          name: "季初副主任护师职称人数",
          value:
            nursingDataModal.dataList.nurseTitleCount.aProfessorOfNursingInBegin
        },
        {
          name: "季初主任护师人数",
          value:
            nursingDataModal.dataList.nurseTitleCount.professorOfNursingInBegin
        },
        {
          name: "季初各职称护士总人数",
          value: nursingDataModal.dataList.nurseTitleCount.totalNurseInBegin
        },
        {
          name: "季末护士（初级）人数",
          value: nursingDataModal.dataList.nurseTitleCount.juniorNurseInEnd
        },
        {
          name: "季末护师人数 ",
          value:
            nursingDataModal.dataList.nurseTitleCount.nursePractitionerInEnd
        },
        {
          name: "季末主管护师人数",
          value: nursingDataModal.dataList.nurseTitleCount.nurseInChargeInEnd
        },
        {
          name: "季末副主任护师职称人数",
          value:
            nursingDataModal.dataList.nurseTitleCount.aProfessorOfNursingInEnd
        },
        {
          name: "季末主任护师人数",
          value:
            nursingDataModal.dataList.nurseTitleCount.professorOfNursingInEnd
        },
        {
          name: "季末各职称护士总人数",
          value: nursingDataModal.dataList.nurseTitleCount.totalNurseInEnd
        }
      ]
    },
    {
      title: "三、人力资源结构--学历相关数据",
      data: [
        {
          name: "季初中专护士人数 ",
          value: nursingDataModal.dataList.nurseEduCount.schoolInBegin
        },
        {
          name: "季初大专护士人数",
          value: nursingDataModal.dataList.nurseEduCount.collegeInBegin
        },
        {
          name: "季初本科护士人数",
          value: nursingDataModal.dataList.nurseEduCount.undergraduateInBegin
        },
        {
          name: "季初硕士护士人数",
          value: nursingDataModal.dataList.nurseEduCount.masterInBegin
        },
        {
          name: "季初博士护士人数",
          value: nursingDataModal.dataList.nurseEduCount.doctorInBegin
        },
        {
          name: "季初各学历护士总人数",
          value: nursingDataModal.dataList.nurseEduCount.totalNurseInBegin
        },
        {
          name: "季末中专人数",
          value: nursingDataModal.dataList.nurseEduCount.schoolInEnd
        },
        {
          name: "季末大专人数",
          value: nursingDataModal.dataList.nurseEduCount.collegeInEnd
        },
        {
          name: "季末主管护师本科人数",
          value: nursingDataModal.dataList.nurseEduCount.undergraduateInEnd
        },
        {
          name: "季末硕士人数",
          value: nursingDataModal.dataList.nurseEduCount.masterInEnd
        },
        {
          name: "季末博士人数",
          value: nursingDataModal.dataList.nurseEduCount.doctorInEnd
        },
        {
          name: "季末各学历护士总人数",
          value: nursingDataModal.dataList.nurseEduCount.totalNurseInEnd
        }
      ]
    },
    {
      title: "四、人力资源结构--工作年限相关数据",
      data: [
        {
          name: "季初<1年资护士人数 ",
          value: nursingDataModal.dataList.workYearsCount.lessThanAYearInBegin
        },
        {
          name: "季初1≤y<2年资护士人数",
          value: nursingDataModal.dataList.workYearsCount.lessThanTwoYearInBegin
        },
        {
          name: "季初2≤y<5年资护士人数",
          value:
            nursingDataModal.dataList.workYearsCount.lessThanFiveYearInBegin
        },
        {
          name: "季初5≤y<10年资护士人数",
          value: nursingDataModal.dataList.workYearsCount.lessThanTenYearInBegin
        },
        {
          name: "本季度白班护季初10≤y<20年资护士人数",
          value:
            nursingDataModal.dataList.workYearsCount.lessThanTwentyYearInBegin
        },
        {
          name: "季初≥20年资护士人数",
          value:
            nursingDataModal.dataList.workYearsCount.moreThanTwentyYearInBegin
        },
        {
          name: "季初各工作年限护士总人数",
          value: nursingDataModal.dataList.workYearsCount.totalNurseInBegin
        },
        {
          name: "季末<1年资护士人数",
          value: nursingDataModal.dataList.workYearsCount.lessThanAYearInEnd
        },
        {
          name: "季末1≤y<2年资护士人数",
          value: nursingDataModal.dataList.workYearsCount.lessThanTwoYearInEnd
        },
        {
          name: "季末2≤y<5年资护士人数",
          value: nursingDataModal.dataList.workYearsCount.lessThanFiveYearInEnd
        },
        {
          name: "季末5≤y<10年资护士人数",
          value: nursingDataModal.dataList.workYearsCount.lessThanTenYearInEnd
        },
        {
          name: "季末10≤y<20年资护士人数",
          value:
            nursingDataModal.dataList.workYearsCount.lessThanTwentyYearInEnd
        },
        {
          name: "季末≥20年资护士人数",
          value:
            nursingDataModal.dataList.workYearsCount.moreThanTwentyYearInEnd
        },
        {
          name: "季季末各工作年限护士总人数",
          value: nursingDataModal.dataList.workYearsCount.totalNurseInEnd
        }
      ]
    },
    {
      title: "五、离职相关数据",
      data: [
        {
          name: "离职人数",
          value: nursingDataModal.dataList.dimission
        }
      ]
    },
    {
      title: "六、身体约束相关数据",
      data: [
        {
          name: "住院患者身体约束日期",
          value: "--"
        }
      ]
    },
    {
      title: "七、导管非计划拔管相关数据",
      data: [
        {
          name: "气管导管非计划拔管例次数",
          value: "--"
        },
        {
          name: "气管导管留置总日数",
          value: "--"
        },
        {
          name: "CVC非计划拔管例次数",
          value: "--"
        },
        {
          name: " CVC留置总日数",
          value: "--"
        },
        {
          name: "PICC非计划拔管例次数",
          value: "--"
        },
        {
          name: "PICC留置总日数",
          value: "--"
        },
        {
          name: "导尿管非计划拔管发生例次数",
          value: "--"
        },
        {
          name: "导尿管留置总日数",
          value: "--"
        },
        {
          name: "胃肠管（经口鼻）非计划拔管发生例次数",
          value: "--"
        },
        {
          name: "胃肠管（经口鼻）留置总日数",
          value: "--"
        }
      ]
    },
    {
      title: "八、导管相关性感染相关数据",
      data: [
        {
          name: "PICC相关血流感染发生例次数",
          value: "--"
        },
        {
          name: "CVC相关血流感染发生例次数",
          value: "--"
        },
        {
          name: "VAP发生例次数",
          value: "--"
        },
        {
          name: " 有创机械通气总日数",
          value: "--"
        },
        {
          name: "导尿管相关尿路感染（CAUTI)发生例次数",
          value: "--"
        }
      ]
    },
    {
      title: "九、跌倒相关数据",
      data: [
        {
          name: "住院患者跌倒发生总例次数",
          value: "--"
        },
        {
          name: "住院患者跌倒伤害总例次数",
          value: "--"
        },
        {
          name: "住院患者跌倒无伤害（0级）例次数",
          value: "--"
        },
        {
          name: " 住院患者跌倒轻度伤害（1级）例次数",
          value: "--"
        },
        {
          name: "住院患者跌倒中度伤害（2级）例次数",
          value: "--"
        },
        {
          name: " 住院患者跌倒重度伤害（3级）例次数",
          value: "--"
        },
        {
          name: "住院患者跌倒死亡例数",
          value: "--"
        }
      ]
    },
    {
      title: "十、病区压力性损伤相关数据",
      data: [
        {
          name: "2期及以上病区压力性损伤(包括粘膜压力性损伤)新发病例数",
          value: "--"
        }
      ]
    }
  ];

  return (
    <SpinLoad>
      <Spin spinning={nursingDataModal.dataLoading} className="spinLoad">
        <Wrapper>
          {data.map((item: any, index: number) => (
            <Cont className="specialCont">
              <Title>{item.title}</Title>
              <Data>
                {item.data.map((item: any, index: number) => (
                  <div key={index} className="main">
                    <div className="name">{item.name}</div>
                    <Input
                      value={item.value ? item.value : "--"}
                      disabled
                      style={{ width: "300px", color: "#666" }}
                    />
                  </div>
                ))}
              </Data>
            </Cont>
          ))}
        </Wrapper>
      </Spin>
    </SpinLoad>
  );
});
const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px 0px;
  background: rgb(255, 255, 255);
  padding: 0 30px 20px 30px;
  box-sizing: border-box;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;
const SpinLoad = styled.div`
  height: calc(100vh - 120px);
  position: relative;
  .spinLoad {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 100;
  }
`;

const Cont = styled.div`
  border: 1px solid #eee;
  background: #f8f8f8;
  padding: 0 20px 30px 20px;
  margin-top: 20px;
  box-sizing: border-box;
`;
const Title = styled.div`
  font-size: 15px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;
const Data = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .main {
    margin-top: 25px;
    height: 50px;
    width: 33%;
  }
  .name {
    margin-left: 5px;
    height: 25px;
    line-height: 25px;
  }
`;
