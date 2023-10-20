import { observer } from 'mobx-react'
import React from 'react'
import ReactECharts from 'echarts-for-react';
import { InputNumber,Input } from 'src/vendors/antd'
import { qcMonthCheckData } from './qcMonthCheckData'

export default observer(function QcMonthCheckThree(props) {
  const { isPrint } = props

  const { YTLL_YDHZFX_L3_003:
    {qcItemTotalCount,fullyCompliantItemCount,fullyCompliantRate,
      partiallyCompliantItemCount,partiallyCompliantRate,nonCompliantItemCount,
      nonCompliantRate,qcTreadData} 
  } = qcMonthCheckData
  
  const chartOptions = {
    title: {
      text: qcMonthCheckData.reportMasterData?.summaryFormName,
      left:"center"
    },
    xAxis: {
        show:true,
        type: 'category',
        data: qcTreadData.monthList
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
        type: 'value',
        axisLabel:{
          formatter:'{value}%'
        }
    },
    series: [{
        type: 'bar',
        data: qcTreadData?.dataList,
        label:{
          show:true,
          position:'top',
          formatter:(params:any)=>{
            return params.data+"%"
          }
        },
        itemStyle:{
          color:'#5f5f5f'
        }
    }],
  };

  const wardQcProblemMapList = ()=>{
    const { YTLL_YDHZFX_L3_004:{wardQcProblemMap}} = qcMonthCheckData
    return wardQcProblemMap && Object.keys(wardQcProblemMap).length>0 ?
    Object.keys(wardQcProblemMap).map((wardName:any)=>{
      return <div className="txt-indent-40 mg-bt-20">
        {wardName}:
        {wardQcProblemMap[wardName].map((li:any,ind:any)=>{
          return <p className="p-txt txt-indent-40" key={'qcItemName'+ind}>{`${ind+1}、${li.qcItemName}`}</p>
        })}
        </div>
    }) :
    <div className="no-data mg-bt-20">
      <img
        style={{ width: '100px' }}
        src={require('src/modules/statistic/img/noData.png')} />
      <br />
      <span>暂无数据</span>
    </div>
  }

  const qcProblemSummaryList = ()=>{
    const { YTLL_YDHZFX_L3_005:{qcProblemSummaryList}} = qcMonthCheckData
    return qcProblemSummaryList && qcProblemSummaryList.length>0 ?
    qcProblemSummaryList.map((prob:any,ind:any)=>{
      return <div className="txt-indent-40">
        {`${ind+1}、${prob.itemName} ${prob.count}次`}
        </div>
    }) :
    <div className="no-data mg-bt-20">
      <img
        style={{ width: '100px' }}
        src={require('src/modules/statistic/img/noData.png')} />
      <br />
      <span>暂无数据</span>
    </div>
  }

  return (
    <>
      <div className='first-content-box'>
        <div className='first-title mg-bt-20'>{`一、质控人员`}</div>
          <p className="p-txt txt-indent-40 mg-bt-20">{qcMonthCheckData.YTLL_YDHZFX_L3_001.qcPersonName}</p>
      </div>
      <div className='first-content-box'>
        <div className='first-title mg-bt-20'>{`二、质控项目`}</div>
          <p className="p-txt txt-indent-40 mg-bt-20">{qcMonthCheckData.YTLL_YDHZFX_L3_002.qcTemplateName}</p>
      </div>
      <div className='first-content-box'>
        <div className='first-title mg-bt-20'>{`三、质控结果`}</div>
        <div className="txt-indent-40">
          此次质控共质控
          <InputNumber  min={0}  size="small" value={qcMonthCheckData.YTLL_YDHZFX_L3_003.qcItemDepartCount} onChange={(val:any)=>qcMonthCheckData.YTLL_YDHZFX_L3_003.qcItemDepartCount = val} />
          个科室、
          <InputNumber  min={0} size="small" value={qcMonthCheckData.YTLL_YDHZFX_L3_003.qcItemWardCount} onChange={(val:any)=>qcMonthCheckData.YTLL_YDHZFX_L3_003.qcItemWardCount = val} />
          个病区，质控总条目数{qcItemTotalCount}个条目。
        </div>
        <p className="p-txt txt-indent-40">{`①完全达标${fullyCompliantItemCount}个条目，完全达标率=${fullyCompliantItemCount}/${qcItemTotalCount}*100%=${fullyCompliantRate}%`}</p>
        <p className="p-txt txt-indent-40">{`②部分达标${partiallyCompliantItemCount}个条目，部分达标率=${partiallyCompliantItemCount}/${qcItemTotalCount}*100%=${partiallyCompliantRate}%`}</p>
        <p className="p-txt txt-indent-40 mg-bt-20">{`③不达标${nonCompliantItemCount}个条目，不达标率=${nonCompliantItemCount}/${qcItemTotalCount}*100%=${nonCompliantRate}%`}</p>
        {
          isPrint ? 
          <img className="chart-img" src={''} /> :
          <ReactECharts option={chartOptions} />
        }
      </div>
      <div className='first-content-box'>
        <div className='first-title mg-bt-20'>{`四、本月质控问题`}</div>
        {wardQcProblemMapList()}
      </div>
      <div className='first-content-box mg-bt-20'>
        <div className='first-title mg-bt-20'>{`五、本月质控问题汇总`}</div>
        {qcProblemSummaryList()}
      </div>
      <div className='first-content-box mg-bt-20'>
        <div className='first-title mg-bt-20'>{`六、原因分析及整改措施`}</div>
        <div className='second-title mg-bt-20'>
          {`原因分析`}
          <Input.TextArea autosize={{ minRows: 5}} value={qcMonthCheckData.YTLL_YDHZFX_L3_006.reason}
            onChange={(e)=>qcMonthCheckData.YTLL_YDHZFX_L3_006.reason = e.target.value} />
        </div>
        <div className='second-title mg-bt-20'>
          {`整改措施`}
          <Input.TextArea autosize={{ minRows: 5}} value={qcMonthCheckData.YTLL_YDHZFX_L3_006.doSomething}
            onChange={(e)=>qcMonthCheckData.YTLL_YDHZFX_L3_006.doSomething = e.target.value} />
        </div>
      </div>
      <div className='first-content-box mg-bt-20'>
        <div className='first-title mg-bt-20'>{`七、效果评价`}</div>
          <Input.TextArea autosize={{ minRows: 5}} value={qcMonthCheckData.YTLL_YDHZFX_L3_007.pingjia}
            onChange={(e)=>qcMonthCheckData.YTLL_YDHZFX_L3_007.pingjia = e.target.value} />
      </div>
    </>
  )
})