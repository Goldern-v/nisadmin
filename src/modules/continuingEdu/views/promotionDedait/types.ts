import { appStore, authStore } from "src/stores/index";
import moment from 'moment'
export const master ={
  id: '', // 晋升表code
  formCode: 'HSJS_0001', // 晋升表code
  formName: "N0->N1", // 晋升表名称
  status: "-1", // 晋升表状态
  nextNodeCode: "", // 提交&&创建&&保存
  creatorNo: authStore.user?.empNo,
  creatorName: authStore.user?.empName,
  updaterNo: authStore.user?.empNo,
  updaterName: authStore.user?.empName,
  updateTime: moment().format("YYYY-MM-DD HH:mm"),
  currentLevel: authStore.user?.currentLevel,
  deptName: authStore.user?.deptName,
  empNo: authStore.user?.empNo,
  empName: authStore.user?.empNo,
  chainCode: "HSJS_COMMON",
  chainName: "护士晋升申请通用",
  attachmentCount: 0,
  lastCommitTime: "2022-07-20 14:51",
  hasRead: false,
  noPass: false,
};

export const tableObjN1 = {
  JS0000001: '', // 科室
  JS0000002: '', // 姓名
  JS0000003: '', // SAP号码
  JS0000004: '', // 来院时间
  JS0000005: '', // 学历
  JS0000006: '', // 护士职业证书编号
  JS0000007: '', // 职称
  JS0000010: '', // 申请人签名
  JS0000011: '', // 申请日期
  JS0000012: '', // 护长审核
  JS0000013: '', // 护长审核内容
  JS0000014: '', // 护长签名
  JS0000015: '', // 护长签名工号
  JS0000016: '', // 护长签名日期
  JS0000017: '', // 科护长审核
  JS0000018: '', // 科护长审核内容
  JS0000019: '', // 科护长签名
  JS0000020: '', // 科护长签名工号
  JS0000021: '', // 科护长签名日期
  JS0000022: '', // 晋级小组科护士审核
  JS0000023: '', // 晋升小组护长审核详情
  JS0000024: '', // 晋升小组护长签名
  JS0000025: '', // 晋升小组护长签名工号
  JS0000026: '', // 晋升小组护长签名日期
  JS0000027: '', // 护理部科护士审核
  JS0000028: '', // 护理部科护士审核详情
  JS0000029: '', // 护理部科护士签名
  JS0000030: '', // 护理部科护士签名工号
  JS0000031: '', // 护理部科护士签名日期
  JS0000036: '', // N0分层培训手册填写
  JS0000037: '' || [] as any, // 资质认证
  JS0000038: moment(), // 三基理论考核_年度
  JS0000039: '', // 三基理论考核
  JS0000041: moment(), // 专科理论考核_年度
  JS0000042: '', // 专科理论考核
  JS0000044: '', // 独立从事一般患者护理工作
  JS0000045: '', // 转正后持续工作时间
  JS0000046: '', // 参与临床倒班时间
  JS0000032: '', // 各类长休假情况
  JS0000033: '', // 各类长休假情况明细
  JS0000034: '', // 曾获得何种荣誉
  JS0000035: '', // 自我总结
  JS0000047: '', // 晋升考核_理论考核
  JS0000048: '', // 晋升考核_床边综合能力考核
  JS0000049: '', // 晋升考核_读书报告
  JS0000050: '', // xxxx年度无护理服务投诉
  JS0000051: '', // xxxx年绩效考核
  JS0000052: '', // xxxx年度无个人原因得III级护理不良事件
  JS0000053: '', // xxxx年度学分达标
};  // 表单的数据1
export const tableObjN2 = {
  JS0000001: '', // 科室
  JS0000002: '', // 姓名
  JS0000003: '', // SAP号码
  JS0000004: '', // 来院时间
  JS0000005: '', // 学历
  JS0000007: '', // 职称
  JS0000008: '', // 获得初级护师_年度
  JS0000010: '', // 申请人签名
  JS0000011: '', // 申请日期
  JS0000012: '', // 护长审核
  JS0000013: '', // 护长审核内容
  JS0000014: '', // 护长签名
  JS0000015: '', // 护长签名工号
  JS0000016: '', // 护长签名日期
  JS0000017: '', // 科护长审核
  JS0000018: '', // 科护长审核内容
  JS0000019: '', // 科护长签名
  JS0000020: '', // 科护长签名工号
  JS0000021: '', // 科护长签名日期
  JS0000022: '', // 晋级小组科护士审核
  JS0000023: '', // 晋升小组护长审核详情
  JS0000024: '', // 晋升小组护长签名
  JS0000025: '', // 晋升小组护长签名工号
  JS0000026: '', // 晋升小组护长签名日期
  JS0000027: '', // 护理部科护士审核
  JS0000028: '', // 护理部科护士审核详情
  JS0000029: '', // 护理部科护士签名
  JS0000030: '', // 护理部科护士签名工号
  JS0000031: '', // 护理部科护士签名日期
  JS0000054: '', // 获取N1资质时间
  JS0000055: '', // N1分层培训
  JS0000056: '' || [] as any, // 资质认证
  JS0000057: undefined, // 三基理论考核1_年度
  JS0000058: '', // 三基理论考核1
  JS0000060: undefined, // 三基理论考核2_年度
  JS0000061: '', // 三基理论考核2
  JS0000041: undefined, // 专科理论考核_年度
  JS0000042: '', // 专科理论考核
  JS0000043: '', // 专科理论考核_未考核原因
  JS0000062: '', // 三基理论考核2_未考核原因
  JS0000063: '', // 能否独立承担班次工作
  JS0000064: '', // 能否独立进行为重患者护理
  JS0000065: undefined, // N班班次_年度起
  JS0000066: undefined, // N班班次_年度止
  JS0000067: '', // N班班次
  JS0000032: '', // 各类长休假情况
  JS0000033: '', // 各类长休假情况明细
  JS0000068: '' || [] as any, // 参与教学_健康大课堂授课
  JS0000069: '', // 健康大课堂授课_次数
  JS0000070: '', // 健康大课堂授课_授课时间及课题
  JS0000071: '' || [] as any, // 参与教学_理论授课
  JS0000072: '', // 理论授课_次数
  JS0000073: '', // 理论授课_授课时间及课题
  JS0000034: '', // 曾获得何种荣誉
  JS0000035: '', // 自我总结
  JS0000047: '', // 晋升考核_理论考核
  JS0000048: '', // 晋升考核_床边综合能力考核
  JS0000074: '', // 晋升考核_个案论文
  JS0000075: undefined, // 近两年无护理投诉1_年度
  JS0000076: '', // 近两年无护理投诉1
  JS0000077: undefined, // 近两年无护理投诉2_年度
  JS0000078: '', // 近两年无护理投诉
  JS0000079: undefined, // 年度考核结果1_年度
  JS0000080: '', // 年度考核结果1
  JS0000081: undefined, // 年度考核结果2_年度
  JS0000082: '', // 年度考核结果2
  JS0000083: undefined, // 无个人原因导致的III级护理不良事件1_年度
  JS0000084: '', // 无个人原因导致的III级护理不良事件1
  JS0000085: undefined, // 无个人原因导致的III级护理不良事件2_年度
  JS0000086: '', // 无个人原因导致的III级护理不良事件2
  JS0000087: undefined, // 年度学分达标1_年度
  JS0000088: '', // 年度学分达标1
  JS0000089: undefined, // 年度学分达标2_年度
  JS0000090: '', // 年度学分达标2
};  // 表单的数据2
export const tableObjN3 = {
  JS0000001: '', // 科室
  JS0000002: '', // 姓名
  JS0000003: '', // SAP号码
  JS0000004: '', // 来院时间
  JS0000005: '', // 学历
  JS0000007: '', // 职称
  JS0000008: undefined, // 获得初级护师_年度
  JS0000010: '', // 申请人签名
  JS0000011: '', // 申请日期
  JS0000012: '', // 护长审核
  JS0000013: '', // 护长审核内容
  JS0000014: '', // 护长签名
  JS0000015: '', // 护长签名工号
  JS0000016: '', // 护长签名日期
  JS0000017: '', // 科护长审核
  JS0000018: '', // 科护长审核内容
  JS0000019: '', // 科护长签名
  JS0000020: '', // 科护长签名工号
  JS0000021: '', // 科护长签名日期
  JS0000022: '', // 晋级小组科护士审核
  JS0000023: '', // 晋升小组护长审核详情
  JS0000024: '', // 晋升小组护长签名
  JS0000025: '', // 晋升小组护长签名工号
  JS0000026: '', // 晋升小组护长签名日期
  JS0000027: '', // 护理部科护士审核
  JS0000028: '', // 护理部科护士审核详情
  JS0000029: '', // 护理部科护士签名
  JS0000030: '', // 护理部科护士签名工号
  JS0000031: '', // 护理部科护士签名日期
  JS0000091: undefined, // 获取N2资质时间
  JS0000092: '', // N2分层培训
  JS0000093: '', // 资质认定
  JS0000094: '', // 资质认定_XXX专科护师证
  JS0000095: '', // 资质认定_XXX专长护理资质证
  JS0000096: '', // 资质认定_XXX委员会或小组联络员
  JS0000097: undefined, // 三基理论考核1_年度
  JS0000098: '', // 三基理论考核1
  JS0000099: '', // 三基理论考核1_未考核原因
  JS0000100: undefined, // 三基理论考核2_年度
  JS0000101: '', // 三基理论考核2
  JS0000102: '', // 三基理论考核2_未考核原因
  JS0000041: undefined, // 专科理论考核_年度
  JS0000042: '', // 专科理论考核
  JS0000043: '', // 专科理论考核_未考核原因
  JS0000103: '', // 发表护理论文>=1
  JS0000104: '', // 护理论文_论文题目
  JS0000105: '', // 护理论文_发表时间
  JS0000106: '', // 护理论文_期刊名称
  JS0000107: '', // 患者护理：指导下级护士进行危重患者护理
  JS0000108: '', // 能参与疑难危重护理、抢救护理
  JS0000065: undefined, // N班班次_年度起
  JS0000066: undefined, // N班班次_年度止
  JS0000067: '', // N班班次
  JS0000032: '', // 各类长休假情况
  JS0000033: '', // 各类长休假情况明细
  JS0000034: '', // 曾获得何种荣誉
  JS0000109: '', // 教学情况_实习/轮转/新护士带教
  JS0000110: '', // 教学情况_实习/轮转/新护士带教_人数
  JS0000111: '', // 教学情况_实习/轮转/新护士带教_时间及姓名
  JS0000112: '', // 教学情况_区域/护理部理论授课
  JS0000113: '', // 教学情况_区域/护理部理论授课_学时
  JS0000114: '', // 教学情况_区域/护理部理论授课_授课时间及课题
  JS0000115: '', // 教学情况_健康宣教大课堂授课
  JS0000116: '', // 教学情况_健康宣教大课堂授课_次数
  JS0000117: '', // 教学情况_健康宣教大课堂授课_授课时间及课题
  JS0000118: '', // 参与管理_协助病房管理
  JS0000119: '', // 参与管理_协助病房管理明细
  JS0000120: '', // 参与管理_QCC主题、承担角色
  JS0000121: '', // 参与管理_QCC主题、承担角色_明细
  JS0000122: '', // 参与管理_参与专科小组
  JS0000124: '', // 参与管理_参与专科小组_承担角色
  JS0000125: '', // 未参与
  JS0000035: '', // 自我总结
  JS0000126: '', // 晋升考核_是否申请免考
  JS0000127: '', // 晋升考核_免考明细
  JS0000047: '', // 晋升考核_理论考核
  JS0000048: '', // 晋升考核_床边综合能力考核
  JS0000128: '', // 晋升考核_CPR抢救配合考核
  JS0000129: undefined, // 护理服务投诉1_年度
  JS0000130: '', // 护理服务投诉1
  JS0000131: undefined, // 护理服务投诉2_年度
  JS0000132: '', // 护理服务投诉2
  JS0000079: undefined, // 年度考核结果1_年度
  JS0000080: '', // 年度考核结果1
  JS0000081: undefined, // 年度考核结果2_年度
  JS0000082: '', // 年度考核结果2
  JS0000083: undefined, // 无个人原因导致的III级护理不良事件1_年度
  JS0000084: '', // 无个人原因导致的III级护理不良事件1
  JS0000085: undefined, // 无个人原因导致的III级护理不良事件2_年度
  JS0000086: '', // 无个人原因导致的III级护理不良事件2
  JS0000087: undefined, // 年度学分达标1_年度
  JS0000088: '', // 年度学分达标1
  JS0000089: undefined, // 年度学分达标2_年度
  JS0000090: '', // 年度学分达标2,
};  // 表单的数据3
export const tableObjN4 = {
  JS0000001:'', // 科室
  JS0000002:'', // 姓名
  JS0000003:'', // SAP号码
  JS0000004:'', // 来院时间
  JS0000005:'', // 学历
  JS0000007:'', // 职称
  JS0000009: undefined, // 获得主管护师_年度
  JS0000010:'', // 申请人签名
  JS0000011:'', // 申请日期
  JS0000012:'', // 护长审核
  JS0000013:'', // 护长审核内容
  JS0000014:'', // 护长签名
  JS0000015:'', // 护长签名工号
  JS0000016:'', // 护长签名日期
  JS0000017:'', // 科护长审核
  JS0000018:'', // 科护长审核内容
  JS0000019:'', // 科护长签名
  JS0000020:'', // 科护长签名工号
  JS0000021:'', // 科护长签名日期
  JS0000022:'', // 晋级小组科护士审核
  JS0000023:'', // 晋升小组护长审核详情
  JS0000024:'', // 晋升小组护长签名
  JS0000025:'', // 晋升小组护长签名工号
  JS0000026:'', // 晋升小组护长签名日期
  JS0000027:'', // 护理部科护士审核
  JS0000028:'', // 护理部科护士审核详情
  JS0000029:'', // 护理部科护士签名
  JS0000030:'', // 护理部科护士签名工号
  JS0000031:'', // 护理部科护士签名日期
  JS0000133:'', // 获取N3资质时间
  JS0000134:'', // N3层级培训课程、操作技能完成率
  JS0000135:'', // 资质认证
  JS0000094:'', // 资质认定_XXX专科护师证
  JS0000095:'', // 资质认定_XXX专长护理资质证
  JS0000097: undefined, // 三基理论考核1_年度
  JS0000098:'', // 三基理论考核1
  JS0000099:'', // 三基理论考核1_未考核原因
  JS0000100: undefined, // 三基理论考核2_年度
  JS0000101:'', // 三基理论考核2
  JS0000102:'', // 三基理论考核2_未考核原因
  JS0000136: undefined, // 三基理论考核3_年度
  JS0000137:'', // 三基理论考核3
  JS0000138:'', // 三基理论考核3_未考核原因
  JS0000041: undefined, // 专科理论考核_年度
  JS0000042:'', // 专科理论考核
  JS0000043:'', // 专科理论考核_未考核原因
  JS0000139:'', // 发表护理论文>=2
  JS0000140:'', // 参编书籍
  JS0000141:'', // 专利发明人第一人
  JS0000142:'', // 护理论文_论文题目1
  JS0000143:'', // 护理论文_发表时间1
  JS0000144:'', // 护理论文_期刊名称1
  JS0000145:'', // 护理论文_影响因子1
  JS0000146:'', // 护理论文_论文题目2
  JS0000147:'', // 护理论文_发表时间2
  JS0000148:'', // 护理论文_期刊名称2
  JS0000149:'', // 护理论文_影响因子2
  JS0000150:'', // 其他（参编书籍、专利）
  JS0000151:'', // 患者护理：能指导下级护士进行疑难、危重、抢救护理，支持大科疑难讨论>=1
  JS0000152:'', // 患者护理：主持时间及患者信息
  JS0000153:'', // 患者护理：参与区域/院级疑难危重会诊
  JS0000154:'', // 患者护理：参与区域/院级疑难危重会诊_详情
  JS0000155:'', // 患者护理：参与护理门诊
  JS0000156:'', // 患者护理：参与护理门诊详情
  JS0000065: undefined, // N班班次_年度起
  JS0000066: undefined, // N班班次_年度止
  JS0000067:'', // N班班次
  JS0000032:'', // 各类长休假情况
  JS0000033:'', // 各类长休假情况明细
  JS0000034:'', // 曾获得何种荣誉
  JS0000109:'', // 教学情况_实习/轮转/新护士带教
  JS0000110:'', // 教学情况_实习/轮转/新护士带教_人数
  JS0000111:'', // 教学情况_实习/轮转/新护士带教_时间及姓名
  JS0000115:'', // 教学情况_健康宣教大课堂授课
  JS0000116:'', // 教学情况_健康宣教大课堂授课_次数
  JS0000117:'', // 教学情况_健康宣教大课堂授课_授课时间及课题
  JS0000157:'', // 教学情况_院级教学工作
  JS0000158:'', // 教学情况_院级教学工作_授课时间及课题
  JS0000118:'', // 参与管理_协助病房管理
  JS0000119:'', // 参与管理_协助病房管理明细
  JS0000120:'', // 参与管理_QCC主题、承担角色
  JS0000121:'', // 参与管理_QCC主题、承担角色_明细
  JS0000122:'', // 参与管理_参与专科小组
  JS0000123:'', // 参与管理_参与专科小组_XXX小组
  JS0000124:'', // 参与管理_参与专科小组_承担角色
  JS0000125:'', // 未参与
  JS0000035:'', // 自我总结
  JS0000126:'', // 晋升考核_是否申请免考
  JS0000127:'', // 晋升考核_免考明细
  JS0000047:'', // 晋升考核_理论考核
  JS0000048:'', // 晋升考核_床边综合能力考核
  JS0000128:'', // 晋升考核_CPR抢救配合考核
  JS0000159:'', // 晋升考核_同行评议结果
  JS0000129:undefined, // 护理服务投诉1_年度
  JS0000130:'', // 护理服务投诉1
  JS0000131:undefined, // 护理服务投诉2_年度
  JS0000132:'', // 护理服务投诉2
  JS0000160:undefined, // 护理服务投诉3_年度
  JS0000161:'', // 护理服务投诉3
  JS0000079:undefined, // 年度考核结果1_年度
  JS0000080:'', // 年度考核结果1
  JS0000081:undefined, // 年度考核结果2_年度
  JS0000082:'', // 年度考核结果2
  JS0000162: undefined, // 年度考核结果3_年度
  JS0000163:'', // 年度考核结果3
  JS0000083:undefined, // 无个人原因导致的III级护理不良事件1_年度
  JS0000084:'', // 无个人原因导致的III级护理不良事件1
  JS0000085:undefined, // 无个人原因导致的III级护理不良事件2_年度
  JS0000086:'', // 无个人原因导致的III级护理不良事件2
  JS0000164:undefined, // 无个人原因导致的III级护理不良事件3_年度
  JS0000165:'', // 无个人原因导致的III级护理不良事件3
  JS0000166:undefined, // 继续教育学分达标1_年度
  JS0000167:'', // 继续教育学分达标1
  JS0000168:undefined, // 继续教育学分达标2_年度
  JS0000169:'', // 继续教育学分达标2
  JS0000170:undefined, // 继续教育学分达标3_年度
  JS0000171:'', // 继续教育学分达标3
};  // 表单的数据4