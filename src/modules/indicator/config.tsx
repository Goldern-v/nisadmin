import React from "react";

import {ReactComponent as HLMGZL} from "./images/HLMGZL.svg";
import {ReactComponent as LCHL} from "./images/LCHL.svg";
import {ReactComponent as ZKHL} from "./images/ZKHL.svg";
import {ReactComponent as HLGZZL} from "./images/HLGZZL.svg";

export const LEFT_MENU = [
  {
    title: "护理质量相关数据",
    icon: <ZKHL/>,
    path: "/indicator/护理质量相关数据",
  },
  {
    title: "护理基础指标",
    icon: <HLMGZL/>,
    children: [
      {title: "医疗机构床护比（1:x）", path: ""},
      {title: "住院病区床护比（1:x）", path: ""},
      {title: "白班平均护患比（1:x）", path: ""},
      {title: "夜班平均护患比（1:x）", path: ""},
      {title: "平均每天护患比（1:x）", path: ""},
      {title: "每住院患者24小时平均护理时数", path: ""},
      {title: "特级护理占比", path: ""},
      {title: "一级护理占比", path: ""},
      {title: "二级护理占比", path: ""},
      {title: "三级护理占比", path: ""},
      {title: "全院护士职称占比", path: ""},
      {title: "全院护士学历占比", path: ""},
      {title: "全院年资护士占比", path: ""},
      {title: "护士离职率", path: ""},
      {title: "身体约束旅", path: ""},
      {title: "气管导管非计划性拔管率", path: ""},
      {title: "CVC非计划性拔管率", path: ""},
      {title: "PICC非计划性拔管率", path: ""},
      {title: "导尿管非计划性拔管率", path: ""},
      {title: "胃肠管（经口鼻）非计划性拔管率", path: ""},
      {title: "中心血管导管相关血流感染发生率", path: ""},
      {title: "呼吸机相关肺炎（VAP）发生率", path: ""},
      {title: "导尿管相关尿路感染（CAUTI）发生率", path: ""},
      {title: "跌倒发生率", path: ""},
      {title: "住院患者2期及以上院内压力性损伤（包括粘膜压力性）发生率", path: ""},
      {title: "高危药物外渗发生率", path: ""},
      {title: "VTE发生率", path: ""},
    ]
  },
  {
    title: "专科护理指标",
    icon: <LCHL/>,
    children: [
      {
        title: "产科敏感指标",
        path: "",
        children: [
          {title: "产后出血发生率", path: ""},
          {title: "尿储留发生率", path: ""},
          {title: "新生儿低血糖发生率", path: ""},
        ]
      },
      {
        title: "产前产房敏感指标",
        path: "",
        children: [
          {title: "产房阴道分娩产后出血发生率", path: ""},
          {title: "使用催产素并发症发生率", path: ""},
          {title: "新生儿臂丛神经损伤发生率", path: ""},
          {title: "新生儿产伤发生率", path: ""},
          {title: "阴道分娩新生儿骨折发生率", path: ""},
          {title: "阴道分娩新生儿重度窒息发生率", path: ""},
          {title: "阴道分娩产妇产伤发生率", path: ""},
          {title: "阴道分娩产妇会阴裂伤发生率", path: ""},
          {title: "阴道分娩产妇会阴侧切发生率", path: ""},
          {title: "无痛分娩中转剖宫产发生例数", path: ""},
          {title: "阴道分娩产妇宫颈裂伤发生率", path: ""},
          {title: "阴道分娩中转剖宫产发生率", path: ""},
          {title: "活产儿数", path: ""},
        ]
      },
      {
        title: "儿内科敏感指标",
        path: "",
        children: [
          {title: "患儿失禁性皮炎(臀红)发生率", path: ""},
          {title: "医源性皮肤损伤发生率", path: ""},
        ]
      },
      {
        title: "放射介入科敏感指标",
        path: "",
        children: [
          {
            title: "护理专科指标",
            path: "",
            children: [
              {title: '介入手术过程中发生血管相关性感染（例）', path: ''},
              {title: '介入手术患者护理意外伤发生例数（例）', path: ''},
            ],
          },
          {
            title: "护理工作指标",
            path: "",
            children: [
              {title: '介入手术患者身份信息不正确例数（例）', path: ''},
              {title: '医疗耗材使用后毁形执行率（%）', path: ''},
              {title: '介入耗材追溯执行率（%）', path: ''},
            ],
          },
          {
            title: "妇科专科敏感指标",
            path: "",
            children: [
              {title: '护士深静脉血栓评估正确率', path: ''},
              {title: '手术患者疼痛评估正确率', path: ''},
              {title: '住院患者跌倒发生率', path: ''},
            ],
          },
          {
            title: "供应室敏感指标",
            path: "",
            children: [
              {title: '无菌物品合格率', path: ''},
              {title: '器械清洗合格率', path: ''},
              {title: '包装合格率', path: ''},
              {title: '湿包发生率', path: ''},
            ],
          },
          {
            title: "骨科敏感指标",
            path: "",
            children: [
              {
                title: '护理专科指标',
                path: '',
                children: [
                  {title: 'DVT评估正确率', path: ''},
                  {title: '感觉评估正确率', path: ''},
                  {title: '骨牵引针眼感染发生率', path: ''},
                  {title: '肌力评估正确率', path: ''},
                  {title: '局部压疮评估正确率', path: ''},
                  {title: '髋关节置换术假体脱位发生率', path: ''},
                  {title: '深静脉血栓发生率', path: ''},
                  {title: '疼痛评估正确率', path: ''},
                  {title: '外周血循环评估正确率', path: ''},
                  {title: '足下垂发生率', path: ''},
                ]
              },
              {
                title: '护理工作指标', path: '', children: [
                  {title: '健康教育知晓率', path: ''},
                ]
              },
            ],
          },
          {
            title: "呼吸内科敏感指标",
            path: "",
            children: [
              {title: '提高呼吸科COPD患者呼吸功能锻炼规范执行率', path: ''},
              {title: '提高呼吸科吸入剂规范使用率', path: ''},
            ],
          },
          {
            title: "急诊科敏感指标",
            path: "",
            children: [
              {
                title: '护理基础指标',
                path: '',
                children: [
                  {title: '急诊科护患比', path: ''},
                  {title: '急诊科Ⅰ级患者比例', path: ''},
                  {title: '急诊科Ⅱ级患者比例', path: ''},
                  {title: '急诊科Ⅲ级患者比例', path: ''},
                  {title: '急诊科Ⅳ级患者比例', path: ''},
                ]
              },
              {
                title: '护理专科指标',
                path: '',
                children: [
                  {title: '急诊预检分诊率', path: ''},
                  {title: 'ROSC成功率', path: ''},
                ]
              },
              {
                title: '护理工作指标',
                path: '',
                children: [
                  {title: '急救人员设备操作与技能考核合格率', path: ''},
                  {title: '急救仪器设备完备率', path: ''},
                  {title: '急诊患者护理服务满意度', path: ''},
                  {title: '急性心梗绿色通道平均停留时间合格率', path: ''},
                  {title: '胸痛患者首份ECG报告时间<10min的比例', path: ''},
                  {title: '急诊预检分诊符合率', path: ''},
                ]
              },
            ],
          },
          {
            title: "泌尿外科敏感指标",
            path: "",
            children: [
              {title: '尿标本留取合格率', path: '',},
              {title: '术后DVT发生率', path: '',},
              {title: 'CAUTI发生率', path: '',},
            ],
          },
          {
            title: "普外科敏感指标",
            path: "",
            children: [
              {title: '管道固定的正确率', path: ''},
              {title: '疼痛评估准确率', path: ''},
              {title: '术后24小时离床活动率', path: ''},
            ],
          },
          {
            title: "神经内科敏感指标",
            path: "",
            children: [
              {
                title: '护理专科指标',
                path: '',
                children: [
                  {title: '自理能力评估准确率', path: ''},
                  {title: 'DVT评估准确率', path: ''},
                  {title: '预防跌倒措施落实率', path: ''},
                  {title: '吞咽评估准确率', path: ''},
                  {title: '吞咽障碍患者标准喂食准确率', path: ''},
                  {title: '吞咽障碍患者误吸发生率', path: ''},
                  {title: '肺部感染预防措施落实率', path: ''},
                ]
              },
              {
                title: '护理工作指标',
                path: '',
                children: [
                  {title: '健康教育知晓率', path: ''},
                  {title: '危急值报告处理准确率', path: ''},
                ]
              },
            ],
          },
          {
            title: "神经外科敏感指标",
            path: "",
            children: [
              {title: '脑室引流高度的合格率', path: '',},
              {title: '术前皮肤准备合格率', path: '',},
              {title: '颅脑损伤病人卧位正确率', path: '',},
              {title: '瞳孔评估准确率', path: '',},
              {title: '头部引流管非计划性拔管发生率', path: '',},
              {title: '大面积烧伤病人补液治疗合格率', path: '',},
            ],
          },
          {
            title: "手术室敏感指标",
            path: "",
            children: [
              {title: '手术病人护理意外伤害率', path: '',},
              {title: '手术同意书内容合格率', path: '',},
              {title: 'Time Out 执行正确率', path: '',},
              {title: '手术患者身份信息正确率', path: '',},
              {title: '手术部位标识正确率', path: '',},
              {title: '术中物品清点不符发生率', path: '',},
              {title: '手术过程中异物遗留发生例数', path: '',},
              {title: '手术标本留置不合格率', path: '',},
              {title: '手术标本漏送发生率', path: '',},
              {title: '手术标本遗失发生例数', path: '',},
              {title: '住院患者手术室压疮发生率', path: '',},
            ],
          },
          {
            title: "手足显微外科敏感指标",
            path: "",
            children: [
              {title: 'ADL评估正确率', path: '',},
              {title: '血液循环评估正确率', path: '',},
              {title: '疼痛评估正确率', path: '',},
            ],
          },
          {
            title: "消化内科敏感指标",
            path: "",
            children: [
              {title: '肠道准备合格率', path: '',},
              {title: '内镜清洗合格率', path: '',},
            ],
          },
          {
            title: "心血管内科敏感指标",
            path: "",
            children: [
              {
                title: '护理专科指标',
                path: '',
                children: [
                  {title: '高危药品入速准确率', path: '',},
                  {title: '降低运送患者意外事件发生率', path: '',},
                ]
              },
              {
                title: '护理工作指标',
                path: '',
                children: [
                  {title: '健康教育知晓率', path: '',},
                ]
              },
            ],
          },
          {
            title: "新生儿科敏感指标",
            path: "",
            children: [
              {title: 'NEC发生率', path: '',},
              {title: 'ROP发生率', path: '',},
              {title: '鼻中隔压伤发生率', path: '',},
              {title: '臀红发生率', path: '',},
              {title: '高危药物外渗的例数', path: '',},
              {title: '导管相关血流感染（CRBSI）发生率', path: '',},
            ],
          },
          {
            title: "血透室敏感指标",
            path: "",
            children: [
              {title: '患者血压控制合格率', path: '',},
              {title: '患者营养状况合格率', path: '',},
              {title: '透析充分性达标率', path: '',},
              {title: '患者留置导管感染发生率', path: '',},
              {title: '患者留自身内瘘或人造血管感染发生率', path: '',},
              {title: '内瘘、人造血管堵塞（栓塞）发生率', path: '',},
            ],
          },
          {
            title: "眼耳鼻喉科敏感指标",
            path: "",
            children: [
              {title: '耳鼻喉科扁桃体术后饮食正确率', path: '',},
              {title: '护士滴眼液执行率', path: '',},
              {title: '老年性白内障患者跌倒率', path: '',},
            ],
          },
          {
            title: "肿瘤血液敏感指标",
            path: "",
            children: [
              {title: '护士疼痛评估准确率', path: '',},
              {title: '化疗药物外渗发生率', path: '',},
            ],
          },
          {
            title: "ICU敏感指标",
            path: "",
            children: [
              {title: '呼吸机相关性肺炎肺炎感染（VAP）发生率', path: '',},
              {title: '导管相关血流感染（CRBSI）发生率', path: '',},
              {title: '尿管相关泌尿系统感染（CAUTI）发生率', path: '',},
              {title: '非计划气管插管拔管发生率', path: '',},
              {title: '非计划中心静脉导管拔管发生率', path: '',},
              {title: '非计划尿管拔管发生率', path: '',},
              {title: '非计划胃管拔管发生率', path: '',},
              {title: '非计划各引流管拔管发生率', path: '',},
              {title: '使用呼吸机患者卧位不正确发生率', path: '',},
              {title: 'ICU患者院内压疮发生率', path: '',},
              {title: 'ICU患者院内失禁性皮炎发生率', path: '',},
              {title: 'ICU住院患者身体约束率', path: '',},
              {title: '深静脉血栓预防率', path: '',},
              {title: '高危药物外渗发生率', path: '',},
              {title: '输液反应发生率', path: '',},
              {title: '输血反应发生率', path: '',},
              {title: '住院患者误吸发生率', path: '',},
              {title: '住院患者误吸并发窒息发生率', path: '',},
              {title: '患者足下垂发生率', path: '',},
            ],
          },
        ]
      },
    ]
  },
  {
    title: "护理工作质量指标",
    icon: <HLGZZL/>,
    children: [
      {title: "预防压力性损伤管理合格率", path: ""},
      {title: "预防跌倒/坠床管理合格率", path: ""},
      {title: "预防误吸管理合格率", path: ""},
      {title: "预防失禁性皮炎管理合格率", path: ""},
      {title: "基础护理合格率", path: ""},
      {title: "分级护理合格率", path: ""},
      {title: "病房管理合格率", path: ""},
      {title: "急救物品管理合格率", path: ""},
      {
        title: "查对制度落实率",
        path: "",
        children: [
          {title: "身份识别管理合格率", path: ""},
          {title: "医嘱护嘱查对合格率", path: ""},
        ]
      },
      {
        title: "预防VTE措施落实率",
        path: "",
        children: [
          {title: "预防VTE落实正确率", path: ""},
          {title: "预防VTE评估正确率", path: ""},
        ]
      },
      {title: "输血制度落实正确率", path: ""},
    ]
  },
];