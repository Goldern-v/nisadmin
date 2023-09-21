const otherColums = [
  {title: '产假',renciCode:"maternityTime",tianCode:"maternityDay"},
  {title: '病假',renciCode:"sickTime",tianCode:"sickDay"},
  {title: '进修',renciCode:"continuingTime",tianCode:"continuingDay"},
  {title: '事假',renciCode:"absenceTime",tianCode:"absenceDay"},
  {title: '育儿假',renciCode:"parentalTime",tianCode:"parentalDay"},
  {title: '计生假',renciCode:"bornTime",tianCode:"bornDay"},
  {title: '其他假期（援疆）',renciCode:"otherTime",tianCode:"otherDay"},
]

const specialColoms = (()=>{
    return otherColums.map(item=>{
      return {
        ...item,
        children : [
          {
            title: '人次',
            dataIndex: item.renciCode,
            key: item.renciCode,
            width: 40,
          },
          {
            title: '天数',
            dataIndex: item.tianCode,
            key: item.tianCode,
            width: 40,
          },
        ]
      }
    })
})()

export const colums = [
  {
    title: ' ',
    dataIndex: 'deptName',
    key: 'deptName',
    width: 100,
  },
  {
    title: '考勤在册人数',
    dataIndex: 'attendanceRecords',
    key: 'attendanceRecords',
    width: 40,
  },
  {
    title: '培训生',
    dataIndex: 'trainee',
    key: 'trainee',
    width: 40,
  },
  {
    title: '试用期',
    dataIndex: 'probationPeriod',
    key: 'probationPeriod',
    width: 40,
  },
  {
    title: '调出/调入护士',
    children:[
      {
        title: '人次',
        dataIndex: 'nursePersonTime',
        key: 'nursePersonTime',
        width: 40,
      },
      {
        title: '不在岗天数',
        dataIndex: 'nursePersonDay',
        key: 'nursePersonDay',
        width: 40,
      },
    ]
  },
  {
    title: '离职护士',
    children:[
      {
        title: '人次',
        dataIndex: 'retiredNurseTime',
        key: 'retiredNurseTime',
        width: 40,
      },
      {
        title: '不在岗天数',
        dataIndex: 'retiredNurseDay',
        key: 'retiredNurseDay',
        width: 40,
      },
    ]
  },
  ...specialColoms,
  {
    title: '实际不在岗总人次',
    dataIndex: 'realNursePerson',
    key: 'realNursePerson',
    width: 40,
    render:(val:any)=>val.toFixed(2)
  },
  {
    title: '护士在岗数',
    dataIndex: 'nursePerson',
    key: 'nursePerson',
    width: 40,
    render:(val:any)=>val.toFixed(2)
  },
]

