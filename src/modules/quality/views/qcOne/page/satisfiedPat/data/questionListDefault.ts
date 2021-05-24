export const questionListDefault = () => {
  return [
    {
      question: "您此次住院对医护的入院介绍的满意程度？", //题目
      questionType: 1, //题目类型 1、单选 2、多选 3、填空 4、问答题
      questionScore: 5, //题目最高能获得的分值
      totalScore: 0, //问题总得分
      sort: 1, //题目排序
      answer: [
        {
          option: "",//选项
          content: "满意",//答案内容
          score: 5,//分数
          isChoose: false, //是否选中
          sort: 1, //题目排序
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对住院病区的环境的满意程度？",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 2,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您初入院时，对护士的接待服务态度的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 3,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对主管医师服务态度的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 4,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对主管医生向您交待的病情及可能发生的并发症是否详细、清晰?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 5,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对住院期间主管医师，科主任或上级医师进行的查房次数的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 6,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "治疗过程中，特殊药物及器械使用，医生是否通过您同意签字?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 7,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对医生医疗技术的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 8,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对护士的技术操作的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 9,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对护士护理工作（如发药、清洁护理等）的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 10,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对护理人员晨间护理、巡视病房、床边交接班情况的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 11,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "当您按床头红灯时，您对护士能否及时到床边服务的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 12,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您在住院期间医护人员的医德医风的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 13,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对治疗效果的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 14,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对自己所支付的医药费用使用情况是否明了?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 15,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对医护人员出院指导的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 16,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对后勤支持中心人员的服务态度的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 17,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对住院病房的营养饮食的花色、品种、口味和价格的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 18,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "您对办理出、入院手续流程是否方便的满意程度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 19,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
    {
      question: "总体来说，您对这次住院的总满意度?",
      questionType: 1,
      questionScore: 5,
      totalScore: 0,
      sort: 20,
      answer: [
        {
          option: "",
          content: "满意",
          score: 5,
          isChoose: false,
          sort: 1,
        },
        {
          option: "",
          content: "基本满意",
          score: 3,
          isChoose: false,
          sort: 2,
        },
        {
          option: "",
          content: "不满意",
          score: 0,
          isChoose: false,
          sort: 3,
        }
      ],
    },
  ] as any[]
}