export const questionListDefault = () => {
  return [
    {
      question: "您对工作环境满意吗？", //题目
      questionType: 1, //题目类型 1、单选 2、多选 3、填空 4、问答题
      questionScore: 6, //题目最高能获得的分值
      totalScore: 0, //问题总得分
      sort: 1, //题目排序
      answer: [
        {
          option: "",//选项
          content: "是",//答案内容
          score: 6,//分数
          isChoose: false, //是否选中
          sort: 1, //题目排序
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "工作量适中",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 2,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "护理绩效考核与分配能调动工作积极性？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 3,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "报酬与工作付出成正比？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 4,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "责任制整体护理实施以来，您的个人能力及特长能得到发挥？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 5,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "目前的护理工作模式能使您自觉学习？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 6,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "科室实行弹性排班，既利于工作开展，又让您有时间安排私人事务？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 7,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "工作出现差错时，护士长会帮助您分析及改进工作？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 8,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "科室护理管理人员能发现并及时解决工作中出现的问题？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 9,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "工作有建议或意见，能与领导进行沟通？",
      questionType: 1,
      questionScore: 6,
      totalScore: 0,
      sort: 10,
      answer: [
        {
          option: "",
          content: "是",
          score: 6,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "护理管理者能倾听和反馈您在工作中关心的问题？",
      questionType: 1,
      questionScore: 8,
      totalScore: 0,
      sort: 11,
      answer: [
        {
          option: "",
          content: "是",
          score: 8,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "工作上有困难，同事会帮助我？",
      questionType: 1,
      questionScore: 8,
      totalScore: 0,
      sort: 12,
      answer: [
        {
          option: "",
          content: "是",
          score: 8,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "科内医护关系协调、和谐有利于工作的开展？",
      questionType: 1,
      questionScore: 8,
      totalScore: 0,
      sort: 13,
      answer: [
        {
          option: "",
          content: "是",
          score: 8,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "后勤保障系统能使您有更多的时间服务于病人？",
      questionType: 1,
      questionScore: 8,
      totalScore: 0,
      sort: 14,
      answer: [
        {
          option: "",
          content: "是",
          score: 8,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "工作中有培训学习的机会？",
      questionType: 1,
      questionScore: 8,
      totalScore: 0,
      sort: 15,
      answer: [
        {
          option: "",
          content: "是",
          score: 8,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "否",
          score: 0,
          isChoose: false,
          sort: 2,
        }
      ],
    },
    {
      question: "您对护理管理工作有什么意见及建议吗？",
      questionType: 4,
      questionScore: 0,
      totalScore: 0,
      sort: 16,
      answer: [
        {
          content: "",
          score: 0,
          sort: 1,
        },
      ],
    },
  ] as any[]
}