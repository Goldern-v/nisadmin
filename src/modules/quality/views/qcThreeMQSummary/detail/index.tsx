import { Button, message, Spin } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
// import moment from "moment";
// import { analysisService } from "src/modules/quality/views/analysisWhyx/api/index";
// import { getSearchTempName } from "../../analysisWhyx/utils";
import { fileDownload } from "src/utils/file/file";
import { analysisDetailApi } from "../../analysisDetail/api";
import { PUBLISH_STATUS_ARR } from "../../../utils/enums";
import { appStore, authStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { useInstance } from "../../committeeWorkReportDetail/hook/useModel";
import { Report } from "../../analysisDetail/types";
import BaseBreadcrumb from "src/components/BaseBreadcrumb";
import { ScrollBox } from "src/components/common";
import { routePath } from "../../committeeWorkReportDetail/util/tool";
import AddDeptModal from "./components/addDeptModal";
import { Obj } from "src/libs/types";
import { wideTraversal } from "src/utils/array/array";
import { print } from "printing";

/**
 * 三级质控月季度汇总报告 by福清
 */
export default observer(function (props) {
  const { queryObj } = appStore

  const { instance } = useInstance()

  const printRef: any = useRef<HTMLElement>()
  useEffect(() => {
    instance.init()
  }, [])
  let report: Report = instance.getDataInAllData('pageInfo')

  const onPrint = () => {
    print(printRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      direction: "horizontal",
      css: `
        @page {
          margin: 0;
        }
        .contain {
          box-shadow: none;
        }
        .ant-btn {
          display: none;
        }
        `,
    })
  };

  /**发布/撤销 */
  const onPublishOrCancel = () => {
    let fn = analysisDetailApi.revokeReport
    let text = PUBLISH_STATUS_ARR[report?.status]?.btn
    if (report.status == '0') {
      fn = analysisDetailApi.publishReport
    }
    fn.call(analysisDetailApi, queryObj.id)
      .then(res => {
        message.success(text + '成功')
        setTimeout(() => {
          appStore.history.replace(routePath())
        }, 500)
      })
      .catch(e => { })
  }
  /**
   * 撤销、发布、保存权限
   */
  const btnRules = useMemo(() => authStore.level3Check && queryObj.id, [report])

  const handleDel = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      analysisDetailApi.deleteReport(queryObj.id).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          appStore.history.replace(routePath())
        }, 500)
      })
    })
  }
  const [addDeptVisible, setAddDeptVisible] = useState(false)
  const handleAddOk = (data: Obj) => {
    // 添加科室
    const obj1: Obj = {}
    const obj2: Obj = {}
    instance.getSectionData("1").tempList.forEach((v: Obj) => {
      obj1[v.key] = ''
    });
    wideTraversal(instance.getSectionData("2").tempList, 'children').forEach((v: Obj) => {
      obj2[v.key] = ''
    });
    const { deptName, deptCode } = data
    obj1.deptName = deptName
    obj1.deptCode = deptCode
    obj2.deptName = deptName
    obj2.deptCode = deptCode
    instance.setStaticSectionData('1', { list: instance.getSectionData('1').list.concat(obj1) })
    instance.setStaticSectionData('2', { list: instance.getSectionData('2').list.concat(obj2) })
    handleAddCancel()
  }
  const handleAddCancel = () => {
    setAddDeptVisible(false)
  }
  const addDept = () => {
    setAddDeptVisible(true)
  }

  return (
    <Wrapper>
      <Spin spinning={instance.loading}>
        <HeadCon>
          {/* check: 需要修改 */}
          <BaseBreadcrumb data={[{ name: '分析汇总', link: routePath() }, { name: '汇总详情', link: '' }]} />
          <div className='title'>{report.reportName}</div>
          <div className='aside'>
            <span>
              由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}{PUBLISH_STATUS_ARR[report.status] && <span style={{ color: PUBLISH_STATUS_ARR[report.status].color }}>{PUBLISH_STATUS_ARR[report.status].text}</span>}</span>}
            </span>
          </div>
          <div className='tool-con'>
            {btnRules && <Button loading={instance.loading} onClick={onPublishOrCancel}>{PUBLISH_STATUS_ARR[report?.status]?.btn}</Button>}
            {btnRules && report?.status == '0' && <Button loading={instance.loading} onClick={addDept}>添加科室</Button>}
            {authStore.level3Check && queryObj.id && <Button loading={instance.loading} onClick={handleDel}>删除</Button>}
            <Button loading={instance.loading} disabled={!queryObj.id} onClick={onPrint}>打印</Button>
            <Button loading={instance.loading} onClick={() => appStore.history.goBack()}>返回</Button>
          </div>
        </HeadCon>
        <ScrollCon status={report.status}>
          <Page className='contain' ref={printRef}>

            <div className="contain__title">
              <p>{report.reportName}</p>
            </div>
            {instance.sectionList.map((item: any, index: number) => {
              if (item.sectionId) {
                let Components = instance.getSection(item.sectionId)
                if (Components && Components.section) {
                  return (
                    <Components.section
                      key={item.sectionId}
                      sectionId={item.sectionId}
                      modalTitle={item.modalTitle}
                      sectionTitle={item.sectionTitle}
                      keyName={item.keyName}
                    />
                  )
                }
              }
            })}
            {instance.baseModal && <instance.baseModal.Component />}
          </Page>
          <AddDeptModal
            allowClear={true}
            visible={addDeptVisible}
            onOk={handleAddOk}
            onCancel={handleAddCancel} />
        </ScrollCon>
      </Spin>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  * {
    font-size: 14px;
  }

  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`
const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`
const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
  .ant-btn {
    display:${props => props.status == '1' ? "none" : "block"};  
  }
`
const Page = styled.div`
  /* width: 800px; */
  margin: 20px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  .ant-radio-group {
    padding: 20px;
  }
  .contain__title {
    position: relative;
    p {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    span {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 33px;
    }
  }
`
