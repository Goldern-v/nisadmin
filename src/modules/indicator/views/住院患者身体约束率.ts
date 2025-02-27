const columns: any = [
  {
    title: "序号",
    render: (text: any, record: any, index: number) => index + 1,
    align: "center",
    width: 50
  },
  {
    title: "科室",
    dataIndex: "wardName",
    key: "科室",
    width: 200,
    align: "left"
  },
  {
    title: "约束天数",
    dataIndex: "br_days",
    key: "约束天数",
    width: 200,
    align: "center"
  },
  {
    title: "患者总人日数",
    dataIndex: "patient_days",
    key: "患者总人日数",
    width: 200,
    align: "center"
  },
  {
    title: "身体约束率(%)",
    dataIndex: "br_ratio",
    key: "身体约束率(%)",
    width: 200,
    align: "center"
  }
];

const dataSource = [
  {
    key: 1,
    护理单元: "五官科护理单元",
    约束天数: 2,
    患者总人日数: 60,
    "身体约束率(%)": 3.33
  },
  {
    key: 2,
    护理单元: "关节护理单元",
    约束天数: 1,
    患者总人日数: 40,
    "身体约束率(%)": 2.5
  },
  {
    key: 3,
    护理单元: "普外护理单元",
    约束天数: 1,
    患者总人日数: 76,
    "身体约束率(%)": 1.31
  },
  {
    key: 4,
    护理单元: "泌尿外科护理单元",
    约束天数: 1,
    患者总人日数: 88,
    "身体约束率(%)": 1.13
  },
  {
    key: 5,
    护理单元: "创骨护理单元",
    约束天数: 1,
    患者总人日数: 56,
    "身体约束率(%)": 1.78
  },
  {
    key: 6,
    护理单元: "产科护理单元",
    约束天数: 0,
    患者总人日数: 64,
    "身体约束率(%)": 0
  },
  {
    key: 7,
    护理单元: "儿科护理单元",
    约束天数: 0,
    患者总人日数: 90,
    "身体约束率(%)": 0
  },
  {
    key: 8,
    护理单元: "呼吸科护理单元",
    约束天数: 0,
    患者总人日数: 54,
    "身体约束率(%)": 0
  },
  {
    key: 9,
    护理单元: "心内护理单元",
    约束天数: 0,
    患者总人日数: 34,
    "身体约束率(%)": 0
  }
];

export const 住院患者身体约束率 = { dataSource, columns };
