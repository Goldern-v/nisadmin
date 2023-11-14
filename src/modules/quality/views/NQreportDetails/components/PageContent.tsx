import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Button, Input, Upload, Modal, message as Message, Icon } from "antd";
import ReactEcharts from "echarts-for-react";
import {sensitiveEl}  from './pageConfig'
import AddEventModel from './addEventModel'
import {badEventReportService as api} from '../services/NQreportDetailsService'
import { appStore, authStore } from 'src/stores'
interface Props {
  pageData: Array<any>;
  currentPage: any;
  queryData: any;
  isPrint: Boolean;
}

const { TextArea } = Input;
export default function PageContent(props: Props) {
  const { currentPage, pageData, isPrint, queryData } = props;
  const [itemData, setItemData]: any = useState({});
  const [chartsImg, setChartsImg]: any = useState([]);
  const [query , setquery]: any = useState({});
  const [AddEventVisible, setAddEventVisible] = useState(false);
  const color = ["#4f81bd", "#c0504d", "#9bbb59", "#8064a2"];
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}
  useEffect(() => {
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl = document.querySelectorAll("canvas") as any;
      if (canvasEl.length) {
        let arr = [];
        for (let i = 0; i < canvasEl.length; i++) {
          arr.push(canvasEl[i].toDataURL());
        }
        setChartsImg(arr);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [pageData]);
  useEffect(() => {
    if(currentPage) {
      setItemData(currentPage);
    }
    return () => {
      setItemData({});
    };
  }, [currentPage]);
  useEffect(() => {
    if(queryData) {
      setquery(queryData);
    }
    return () => {
      setquery({});
    };
  },[queryData])
  
  // 柏拉图
  const getBurraOption = (data: any) => {
    if(!data.length) return []
    let lengths = data.length;
    let deptNamelist = data && data.map((item:any)=>item.deptName)
    function getList(key:string){
      return data && data.map((item:any)=>item[key])
    }
    data = [
      {
        key: "住院日数",
        list: getList('hospitalizationNumber'),
        type: "bar",
      },
      {
        key: "质控扣分",
        list: getList('evalDeductScore'),
        type: "bar",
      },
      {
        key: "护患比",
        list: getList('nurseToPatientRatio'),
        type: "line",
      },
    ];
    let legendTitle = data.map((item: any) => item.key);
    let intervalY1 = Math.ceil(Math.max(...data[1].list,...data[0].list ) / lengths);
    let intervalY2 = Math.ceil(Math.max(...data[2].list) / lengths);
    intervalY1 = intervalY1 == 0 ? 1 : intervalY1;
    intervalY2 = intervalY2 == 0 ? 1 : intervalY2;
    let option = {
      //提示框组件
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      // 图例
      legend: {
        data: legendTitle,
        y: "bottom",
      },
      grid:{
          bottom:"30%"  //grid 组件离容器下边距的距离
      },
      // 横坐标轴 xAxis 或者 纵坐标轴 yAxis
      xAxis: [
        {
          type: "category",
          data: deptNamelist,
          axisLabel: {
            interval: 0,
            rotate: 28,
            fontSize: 14
          }, // 坐标轴名字旋转，角度值
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          max: intervalY1 * lengths,
          interval: intervalY1,
          axisLabel: {
            formatter: "{value}",
          },
          splitNumber: lengths, // 坐标轴的分割段数(预估值)
        },
        {
          type: "value",
          min: 0,
          max: intervalY2 * lengths,
          interval: intervalY2,
          axisLabel: {
            formatter: "{value}",
          },
          splitNumber: lengths, // 坐标轴的分割段数(预估值)
        },
      ],
      series: data.map((item: any, index: number) => {
        let obj: any = {
          name: item.key,
          type: item.type,
          tooltip: {
            valueFormatter: function(value: any) {
              return value;
            },
          },
          data: item.list,
          color: color[index],
        };
        obj.type == "line" && (obj.yAxisIndex = 1);
        return obj;
      }),
    };
    return option;
  };
  // 多行柱状
  const getRowsOption = (data: any) => {
    let deptNamelist = data && data.map((item:any)=>item.deptName)
    function getList(key:string){
      return data && data.map((item:any)=>item[key])
    }
    data = [
      {
        name: "例次",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: getList('badEventNum'),
      },
      {
        name: "Ⅱ级",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: getList('secondLevelNum'),
      },
      {
        name: "Ⅲ级",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: getList('thirdLevelNum'),
      },
      {
        name: "Ⅳ级",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        data: getList('fourthLevelNum'),
      },

    ]
    
    const option = {
      title: {
        text: `${query?.reportData?.reportYear - 1}年${
          query?.reportData?.qcTime
        }不良事件分布及等级`,
        left: "center",
        textStyle: {
          fontSize: 24,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      color,
      grid: {
        left: "3%",
        right: "4%",
        bottom: "20%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: deptNamelist,
          axisLabel: {
            interval: 0,
            rotate: 28,
            fontSize: 14
          }, 
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series:data
    };
    return option;
  };
  // 普通
  const getBolatuOption = (data: any, title:string , types?:string, badEventType?:string) => {
    let deptNamelist = data && data.map((item:any)=>item[badEventType || 'badEventType'])
    function getList(key:string){
      return data && data.map((item:any)=>item[key])
    }
    data = [
      {
        data: getList(types || 'badEventNum'),
        type: "bar",
      },
    ]
    const option = {
      title: {
        text: title,
        left: "center",
        textStyle: {
          fontSize: 24,
        },
      },
      xAxis: {
        type: "category",
        data: deptNamelist,
        axisLabel: {
          interval: 0,
          rotate: 28,
          fontSize: 14
        }, 
      },
      yAxis: {
        type: "value",
        
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "20%",
      },
      series: data,
    };
    return option;
  };
  // 饼图
  const getCakeOption = (data: any) => {
    data = [
      { value: data.secondLevelNum, name: "Ⅱ级" },
      { value: data.thirdLevelNum, name: "Ⅲ级" },
      { value: data.fourthLevelNum, name: "Ⅳ级" },
    ]
    const option = {
      title: {
        text: "事件等级分布",
        left: "center",
        textStyle: {
          fontSize: 24,
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
        top: "center",
      },
      color,
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          label: {
            show: true,
            formatter: "{c}例  {d}%",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "#ccc",
            shadowOffsetX: 5,
            shadowOffsetY: 5,
          },
          labelLine: { show: true },
          data: data,
        },
      ],
    };
    return option;
  };
  //qualityDataList 字段input修改对接
  const handleInputQualityData = (e: any, key: string, data: any, y: any) => {
    data = data.map((item: any) => {
      y.qcCode == item.qcCode && (item[key] = e.target.value);
      return item;
    });
    setItemData({ ...itemData, qualityDataList: data });
  };
  //nurseTurnoverRateData 字段input修改对接
  const handleInputNurseTurnover = (e: any, key: string, data: any, parentKey:string) => {
    data[key] = e.target.value;
    setItemData({ ...itemData, parentKey: data });
  };
  const getTableColumns = (data: any) => {
    let columns: any = [
      { title: "序号", align: "center",dataIndex:'key',rowScope: 'row',  width: 80 },
      {
        title: "项目",
        key: "qcName",
        dataIndex: "qcName",
        align: "center",
        width: 160,
      },
      {
        title: "标准值",
        key: "standardValue",
        dataIndex: "standardValue",
        width: 100,
        align: "center",
        render: (text: any, key: any) => {
          return (
            <input
              value={text}
              onChange={(e) => {
                handleInputQualityData(e, "standardValue", data, key);
              }}
            />
          );
        },
      },
      {
        title: `${query?.reportData?.reportYear - 1}年${
          query?.reportData?.qcTime
        }合格率`,
        key: "preEvalRate",
        dataIndex: "preEvalRate",
        width: 100,
        align: "center",
        render: (text: any, key: any) => {
          return (
            <input
              value={text}
              onChange={(e) => {
                handleInputQualityData(e, "preEvalRate", data, key);
              }}
            />
          );
        },
      },
      {
        title: `${query?.reportData?.reportYear}年目标值`,
        key: "targetValue",
        dataIndex: "targetValue",
        width: 100,
        align: "center",
        render: (text: any, key: any) => {
          return (
            <input
              value={text}
              onChange={(e) => {
                handleInputQualityData(e, "targetValue", data, key);
              }}
            />
          );
        },
      },
      {
        title: `${query?.reportData?.reportYear}年${
          query?.reportData?.qcTime
        }合格率`,
        key: "curEvalRate",
        dataIndex: "curEvalRate",
        width: 100,
        align: "center",
        render: (text: any, key: any) => {
          return (
            <input
              value={text}
              onChange={(e) => {
                handleInputQualityData(e, "curEvalRate", data, key);
              }}
            />
          );
        },
      },
    ];
    return columns;
  };
  const handleCreateOk = (data:any) => {
    setItemData({...itemData, nursingQualityManagement: data})
    setAddEventVisible(false)
  }
  // 打开新建弹窗
  const handleCreate = () => {
    setAddEventVisible(true);
  };

  // 弹窗回调关闭
  const handleCreateCancel = () => {
    setAddEventVisible(false);
  };

  // 上传附件
  const handleUploadChange = (file:any, key:string, data: any, parentKey:string)=>{
    let fileData = file?.file?.response?.data
    if(!fileData) return
    let arrfile:any =  data[key] || [];
    arrfile.push({id: fileData?.id, path: fileData?.path, key})
    data[key] = arrfile;
    setItemData({ ...itemData, parentKey: data });
  }
  // 删除附件
  const handleFilesDel = (id:any, key:string, data: any, parentKey:string)=>{
    let content = (
      <div>
        <div>您确定要删除选中的附件吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        let arrfile:any =  data[key] || [];
        arrfile = arrfile.filter((item:any)=> item.id  != id);
        data[key] = arrfile;
        setItemData({ ...itemData, parentKey: data });
        api.getFilesDelete(id).then((res)=>{
          if(res.code == 200){
            Message.success('删除附件成功');
          }
        }).catch(e => {});
      }
    });
    
  }
  // 查看附件
  const handleFilesOpen = (path:any)=>{
    window.open(path)
  }
  return (
    <Wrapper>
      {pageData.map((item: any, index: any) => {
        return (
          <div className="first-content-box" key={index}>
            <div className="first-title">
              <span>{`${item.itemName}`}</span>{" "}
              {index == 1 && <Button size="small" onClick={handleCreate}>添加</Button>}
            </div>
            {/* 一、护理质量指标数据 */}
            {index == 0 && (
              <div className="second-content-table">
                <div
                  className="second-content-table-table"
                  style={{ width: "900px", margin: "0 auto" }}
                >
                  <Table
                    bordered
                    pagination={false}
                    dataSource={itemData.qualityDataList}
                    columns={getTableColumns(itemData.qualityDataList)}
                  />
                </div>
              </div>
            )}
            {/* 二、护理质量管理存在的主要问题 */}
            {index == 1 && (
              <div className="second-content">
                {itemData?.nursingQualityManagement && itemData?.nursingQualityManagement.map((item:any,index:number) => {
                  return(
                    <div key={index}>
                      {index == (itemData?.nursingQualityManagement.findIndex((findItem:any) => findItem.qcName == item.qcName)) && <div>{item.qcName}</div>}
                      <div>{item.comePoint}{item.measure && <span>措施：{item.measure }</span>} {item.trace && <span>有效追踪：{item.trace }</span>} </div>
                    </div>
                  )
                })}
              </div>
            )}
            {/* 伯拉图  三、各护理单元质控合格率与护患比对比*/}
            {index == 2 && (
              <div className="second-content-bolatu-bolatu">
                {itemData.evalRateAndNurseToPatientRatioList && <div>
                  {!isPrint && (
                    <ReactEcharts
                      style={{ height: 400 }}
                      option={getBurraOption(itemData.evalRateAndNurseToPatientRatioList)}
                    />
                  )}
                  {isPrint && chartsImg.length && (
                    <img className="img-bola" src={chartsImg[0]} alt="" />
                  )}
                </div> }
              </div>
            )}
            {index == 3 && (
              <div className="second-content-bolatu-bolatu">
                {/* 多行柱状图 */}
                <div>
                  （一）共发生护理不良事件
                  <Input value={itemData.badEventData?.badEventTotalNum}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "badEventTotalNum",
                        itemData.badEventData,
                        'badEventData'
                      );
                    }} className="item-small" />
                  例，上报护理单元及事件等级分布
                </div>
                {
                  itemData.badEventData?.allLevelList && <div>
                    {!isPrint && (
                      <ReactEcharts
                        style={{ height: 400 }}
                        option={getRowsOption(itemData.badEventData?.allLevelList)}
                      />
                    )}
                    {isPrint && chartsImg.length && (
                      <img className="img-bola" src={chartsImg[1]} alt="" />
                    )}
                  </div>
                }
                <div className="second-content-bolatu-bolatu">
                  {/* 普通柱状图 */}
                  <div>（二）事件发生类型 </div>
                  { itemData.badEventData?.badEventTypeList && <div>
                    {!isPrint && (
                      <ReactEcharts
                        style={{ height: 400 }}
                        option={getBolatuOption(itemData.badEventData?.badEventTypeList, '不良事件类型', 'badEventTypeNum')}
                      />
                    )}
                    {isPrint && chartsImg.length && (
                      <img className="img-bola" src={chartsImg[2]} alt="" />
                    )}
                    </div>}
                </div>
                {/* 饼图 */}
                <div className="second-content-bolatu-bolatu">
                  <div>（三）事件等级分布 </div>
                  { itemData.badEventData?.badEventTotalLevelData && <div>
                    {!isPrint && (
                      <ReactEcharts
                        style={{ height: 400 }}
                        option={getCakeOption(itemData.badEventData?.badEventTotalLevelData)}
                      />
                    )}
                    {isPrint && chartsImg.length && (
                      <img className="img-bola" src={chartsImg[3]} alt="" />
                    )}
                    </div>}
                </div>
                <div className="second-content-bolatu-bolatu">
                  <div>（四）Ⅱ级不良事件类型分布 </div>
                  { itemData.badEventData?.secondLevelList && <div>
                    {!isPrint && (
                    <ReactEcharts
                      style={{ height: 400 }}
                      option={getBolatuOption(itemData.badEventData?.secondLevelList, 'Ⅱ级不良事件类型分布')}
                    />
                  )}
                  {isPrint && chartsImg.length && (
                    <img className="img-bola" src={chartsImg[4]} alt="" />
                  )}
                    </div>}
                  
                </div>
                <div className="second-content-bolatu-bolatu">
                  <div>（五）Ⅲ级不良事件类型分布 </div>
                  { itemData.badEventData?.thirdLevelList && <div>
                    {!isPrint && (
                    <ReactEcharts
                      style={{ height: 400 }}
                      option={getBolatuOption(itemData.badEventData?.thirdLevelList, 'Ⅲ级不良事件类型分布')}
                    />
                  )}
                  {isPrint && chartsImg.length && (
                    <img className="img-bola" src={chartsImg[5]} alt="" />
                  )}
                    </div>}
                </div>
                <div className="second-content-bolatu-bolatu">
                  <div>（六）Ⅳ级不良事件类型分布</div>
                  { itemData.badEventData?.fourthLevelList && <div>
                    {!isPrint && (
                    <ReactEcharts
                      style={{ height: 400 }}
                      option={getBolatuOption(itemData.badEventData?.fourthLevelList, 'Ⅳ级不良事件类型分布')}
                    />
                  )}
                  {isPrint && chartsImg.length && (
                    <img className="img-bola" src={chartsImg[6]} alt="" />
                  )}
                    </div>}
                </div>
              </div>
            )}
            {index == 4 && (
              sensitiveEl.map((item: any, index:number) => {
                return (
                  <div className="second-content-bolatu-bolatu" key={index}>
                    {item.span && <div>{item.span}</div>}
                    <div>
                     {item.inputSpan} 
                     {item.inputEl && <Input value={itemData.sensitiveIndicatorData &&itemData.sensitiveIndicatorData[item.inputCode]}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        item.inputCode,
                        itemData.sensitiveIndicatorData,
                        'sensitiveIndicatorData'
                      );
                    }} className="item-middle" />}
                    </div>
                    {item.textareaEl && <TextArea
                      value={itemData.sensitiveIndicatorData && itemData.sensitiveIndicatorData[item.textCode]}
                      onChange={(e) => {
                        handleInputNurseTurnover(
                          e,
                          item.textCode,
                          itemData.sensitiveIndicatorData,
                          'sensitiveIndicatorData'
                        );
                      }} 
                      rows={3}
                    /> }
                    {
                      item.uploadEl && 
                      <div>
                      {
                        itemData.sensitiveIndicatorData?.[item.files] && itemData.sensitiveIndicatorData?.[item.files].map((itemEl: any)=>{
                          return (
                            <div className="img-item" key={itemEl.id}>
                              <img src={itemEl.path} />
                              <div className="icon-del">
                                <Icon type="delete"  onClick={()=>{handleFilesDel(itemEl.id,item.files,
                              itemData.sensitiveIndicatorData,
                              'sensitiveIndicatorData')}} />
                                <Icon type="zoom-in"  onClick={()=>{handleFilesOpen(itemEl.path)}} />
                              </div>
                            </div>
                          )
                        })
                      }
                      <Upload
                        showUploadList={false}
                        action="/crNursing/api/qcReport925/upload" 
                        headers={header} 
                        onChange={(file:any)=>{
                          handleUploadChange( file, item.files , itemData.sensitiveIndicatorData, 'sensitiveIndicatorData')
                        } }
                        accept={".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.bmp,.dib2"}
                      >
                        <Button type="primary">上传图片</Button>
                        <span style={{ marginLeft: "10px" }}>
                          *.jfif;*.pjpeg;*.jpeg;*.pjp;*jpg;*.png;*.bmp;*.dib2
                        </span>
                      </Upload>
                      </div>
                    } 
                    {
                      item.BolatuOptionEl && 
                      itemData.sensitiveIndicatorData && 
                      <div>
                        {!isPrint && (
                          <ReactEcharts
                            style={{ height: 400 }}
                            option={getBolatuOption(itemData.sensitiveIndicatorData?.deptNurseToPatientRatioList, '','deptNurseToPatientRatio', 'deptName')}
                          />
                        )}
                        {isPrint && chartsImg.length && (
                          <img className="img-bola" src={chartsImg[7]} alt="" />
                        )}
                      </div>
                    } 
                  </div>
                )
              })
            )}
            {index == 5 && (
              <div className="second-content-bolatu-bolatu">
                <TextArea
                  placeholder="请输入总结内容"
                  value={itemData.satisfaction?.satisfactionStr}
                  onChange={(e: any) => {
                    handleInputNurseTurnover(
                      e,
                      "satisfactionStr",
                      itemData.satisfaction,
                      'satisfaction'
                    );
                  }}
                  rows={10}
                />
                {
                  itemData.satisfaction?.satisfactionFiles && itemData.satisfaction?.satisfactionFiles.map((itemEl: any)=>{
                    return (
                      <div className="img-item" key={itemEl.id}>
                        <img src={itemEl.path} />
                        <div className="icon-del">
                          <Icon type="delete"  onClick={()=>{handleFilesDel(itemEl.id,"satisfactionFiles",
                        itemData.satisfaction,
                        'satisfaction')}} />
                          <Icon type="zoom-in"  onClick={()=>{handleFilesOpen(itemEl.path)}} />
                        </div>
                      </div>
                    )
                  })
                }
                <Upload
                  showUploadList={false}
                  action="/crNursing/api/qcReport925/upload" 
                  headers={header} 
                  onChange={(file:any)=>{
                    handleUploadChange( file, 'satisfactionFiles', itemData.satisfaction, 'satisfaction')
                  } }
                  accept={".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.bmp,.dib2"}
                >
                  <Button type="primary">上传图片</Button>
                  <span style={{ marginLeft: "10px" }}>
                    *.jfif;*.pjpeg;*.jpeg;*.pjp;*jpg;*.png;*.bmp;*.dib2
                  </span>
                </Upload>
              </div>
            )}
            {index == 6 && (
              <div className="second-content-bolatu-bolatu">
                <div>
                  <Input
                    value={itemData.nurseTurnoverRateData?.statisticsTimeStr}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "statisticsTimeStr",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-middle"
                  />
                  共计
                  <Input value={itemData.nurseTurnoverRateData?.resignationNum}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "resignationNum",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-small"/>
                  名护士离职，离职率为
                  <Input value={itemData.nurseTurnoverRateData?.resignationRate}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "resignationRate",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-small"/>
                  ，其中护士
                  <Input value={itemData.nurseTurnoverRateData?.nurseNum}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "nurseNum",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-small"/>
                  人，护师
                  <Input value={itemData.nurseTurnoverRateData?.nursePriNum}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "nursePriNum",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-small"/>
                  人，主管护师
                  <Input value={itemData.nurseTurnoverRateData?.nurseManageNum}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "nurseManageNum",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-small"/>
                  人。
                </div>
                <div>
                  离职原因:
                  <Input value={itemData.nurseTurnoverRateData?.resignationReason}
                    onChange={(e) => {
                      handleInputNurseTurnover(
                        e,
                        "resignationReason",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData'
                      );
                    }}
                    className="item-large"/>
                </div>
                {
                  itemData.nurseTurnoverRateData?.resignationFiles && itemData.nurseTurnoverRateData?.resignationFiles.map((itemEl: any)=>{
                    return (
                      <div className="img-item" key={itemEl.id}>
                        <img src={itemEl.path} />
                        <div className="icon-del">
                          <Icon type="delete"  onClick={()=>{handleFilesDel(itemEl.id,"resignationFiles",
                        itemData.nurseTurnoverRateData,
                        'nurseTurnoverRateData')}} />
                          <Icon type="zoom-in"  onClick={()=>{handleFilesOpen(itemEl.path)}} />
                        </div>
                      </div>
                    )
                  })
                }
                <Upload
                  showUploadList={false}
                  action="/crNursing/api/qcReport925/upload" 
                  headers={header} 
                  onChange={(file:any)=>{
                    handleUploadChange( file, 'resignationFiles', itemData.nurseTurnoverRateData, 'nurseTurnoverRateData')
                  } }
                  accept={".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.bmp,.dib2"}
                >
                  <Button type="primary">上传图片</Button>
                  <span style={{ marginLeft: "10px" }}>
                    *.jfif;*.pjpeg;*.jpeg;*.pjp;*jpg;*.png;*.bmp;*.dib2
                  </span>
                </Upload>
              </div>
            )}
            {index == 7 && (
              <div className="second-content-bolatu-bolatu">
                <TextArea
                  placeholder="请输入总结内容"
                  value={itemData.nursePracticeEnvironment?.environmentStr}
                  onChange={(e) => {
                    handleInputNurseTurnover(
                      e,
                      "environmentStr",
                      itemData.nursePracticeEnvironment,
                      'nursePracticeEnvironment'
                    );
                  }}
                  rows={8}
                />
                {
                  itemData.nursePracticeEnvironment?.environmentFlies && itemData.nursePracticeEnvironment?.environmentFlies.map((itemEl: any)=>{
                    return (
                      <div className="img-item" key={itemEl.id}>
                        <img src={itemEl.path} />
                        <div className="icon-del">
                          <Icon type="delete"  onClick={()=>{handleFilesDel(itemEl.id,"environmentFlies",
                        itemData.nursePracticeEnvironment,
                        'nursePracticeEnvironment')}} />
                          <Icon type="zoom-in"  onClick={()=>{handleFilesOpen(itemEl.path)}} />
                        </div>
                      </div>
                    )
                  })
                }
                <Upload
                  showUploadList={false}
                  action="/crNursing/api/qcReport925/upload" 
                  headers={header} 
                  onChange={(file:any)=>{
                    handleUploadChange( file, 'environmentFlies', itemData.nursePracticeEnvironment, 'nursePracticeEnvironment')
                  } }
                  accept={".jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.bmp,.dib2"}
                >
                  <Button type="primary">上传图片</Button>
                  <span style={{ marginLeft: "10px" }}>
                    *.jfif;*.pjpeg;*.jpeg;*.pjp;*jpg;*.png;*.bmp;*.dib2
                  </span>
                </Upload>
              </div>
            )}
          </div>
        );
      })}
      <AddEventModel
        visible={AddEventVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        groupRoleList={itemData?.nursingQualityManagement || []}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
  .first-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    text-indent: 20px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    margin-top: 20px;
  }
  .second-content {
    margin-left: 50px;
  }
  .second-content-table-title,
  .second-content-bar-title,
  .second-content-bolatu {
    font-weight: 700;
    line-height: 30px;
    text-indent: 20px;
  }

  .second-content-bolatu-bolatu {
    text-indent: 0;
    padding: 10px 20px;
    textarea,
    input {
      margin: 10px 0;
    }
  }
  .img-bola {
    width: 100%;
    object-fit: cover;
  }
  .item-small {
    width: 80px;
  }
  .item-middle {
    width: 20%;
  }
  .item-large {
    width: 90%;
  }
  .ant-table-row {
    input {
      width: 100%;
      border: none;
      resize: none;
      outline: none;
      text-align: center;
    }
  }
  .img-item{
    width: 100%;
    max-height: 1080px;
    margin: 10px 0; 
    border: 1px solid #999;
    position: relative;
    .icon-del{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      background-color: rgba(0 ,0 ,0 ,0.3);
      color: #ba2323;
      svg{
        padding: 0 5px;
        font-size: 28px;
      }
    }
    :hover{
      .icon-del{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    img{
      padding: 5px;
    }
  }
`;
