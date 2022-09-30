import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import BaseBreadcrumb from "src/components/BaseBreadcrumb";
import { Button, message } from "src/vendors/antd";
import { starRatingReportEditModel } from "./model/StarRatingReportEditModel";
import { observer } from "src/vendors/mobx-react-lite";
import { ScrollBox } from "src/components/common";
import { Report } from "./types";
import printing from "printing";
import { useRef } from "src/types/react";
import { appStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { starRatingReportService } from "./api/StarRatingReportService";
import qs from "qs";
import { fileDownload } from "src/utils/file/file";
import PageJmfy from './components/nightReport_jmfy';
import moment from "moment";

export interface Props extends RouteComponentProps {
}

export default observer(function StarRatingReportEdit() {
  const pageRef: any = useRef<HTMLElement>();
  //获取贵州夜班统计标准字典
  const getStandardList = () =>{
    if(['gzsrm'].includes(appStore.HOSPITAL_ID))  starRatingReportEditModel.getGzsrmStandardList();
  }
  useEffect(() => {
    let search = appStore.location.search;
    let query = qs.parse(search.replace("?", ""));

    starRatingReportEditModel.init(query);
    //获取贵州夜班统计标准字典
    getStandardList();
  }, []);

  let report: Report = starRatingReportEditModel.getDataInAllData("report");

  let reportName =
    starRatingReportEditModel.getSectionData("报告名称")!.text ||
    report.reportName;
    

  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview;
    let title = document.title;
    document.title = reportName;
    printFun(pageRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
         .ant-btn,.hidden {
           display: none;
         }
         .print-page {
           box-shadow: none;
           -webkit-print-color-adjust: exact;
           margin: 0 auto;
         }
         .page-title {
           min-height: 20px;
           padding: 0px 30px 20px;
         }
         .page-title .title {
           text-align: center;
           margin-right: 0;
         }
         table, img {
           page-break-inside: avoid;
         }
         pre {
          page-break-after: avoid;
         }
         * {
           color: #000 !important;
         }
         .footer-title {
           min-height: 0;
           margin-bottom: 0;
         }
         .img-group{
           margin-top: 0 !important;
         }
         table { page-break-inside:auto }
         tr{ page-break-inside:avoid; page-break-after:auto }
      `
    });
    setTimeout(() => {
      document.title = title;
    }, 500);
  };
  const onDelete = () => {
    globalModal.confirm("删除确认", "你确定要删除该报告吗？").then(res => {
      starRatingReportService.delete(qs.parse(appStore.query)).then(res => {
        message.success("删除成功");
        setTimeout(() => {
          appStore.history.push("/personnelManagement/nightChargingReport");
        }, 500);
      });
    });
  };
  const onExport = () => {
    const data = starRatingReportEditModel.getSectionData("夜班费上报表")
    const list = data.list.map((i: any) => {
      const item = { ...i }
      delete item.key
      return item
    });
    let search = appStore.location.search;
    let query = qs.parse(search.replace("?", ""));
    const params = appStore.hisMatch({
      map: {
        'dghl,fqfybjy,sdlj,nfsd': {
          list1: list,
          list2: data.list2,
          schNightTotalModel: data.schNightTotalModel
        },
        'gzsrm':{
          id:query.id,
        },
        default: {
          lists: list
        }
      },
      vague: true,
    })
    appStore.hisMatch({
      map: {
        'fqfybjy': () => {
          starRatingReportService.exportFQ(params).then(res => {
            fileDownload(res);
          });
        },
        'sdlj,nfsd': () => {
          starRatingReportService.exportLJ(params).then(res => {
            fileDownload(res);
          });
        },
        other: () => {
          starRatingReportService.export(params).then(res => {
            fileDownload(res);
          });
        }
      },
      vague:true
    })()
    // if (['fqfybjy'].includes(appStore.HOSPITAL_ID)) {
    //   starRatingReportService.exportFQ(params).then(res => {
    //     fileDownload(res);
    //   });
    // }else{
    //   starRatingReportService.export(params).then(res => {
    //     fileDownload(res);
    //   });
    // }
    
  };
  const onPublish = () => {
    globalModal.confirm("提交确认", "你确定要提交该报告吗？").then(res => {
      starRatingReportService.publish(qs.parse(appStore.query)).then(res => {
        message.success("提交成功");
        setTimeout(() => {
          appStore.history.push("/qcOne/starRatingReport");
        }, 500);
      });
    });
  };
  const onCancelPublish = () => {
    globalModal.confirm("撤销确认", "你确定要撤销该报告吗？").then(res => {
      starRatingReportService
        .cancelPublish(qs.parse(appStore.query))
        .then(res => {
          message.success("撤销成功");
          setTimeout(() => {
            appStore.history.push("/qcOne/starRatingReport");
          }, 500);
        });
    });
  };

  //通用模板渲染
  const ScrollConCommon = () => {
    return (
      <ScrollCon>
        <Page
          ref={pageRef}
          className={['nys', 'dghl', 'fqfybjy','sdlj', 'nfsd'].includes(appStore.HOSPITAL_ID) ? "nysWidth" : ""}
        >
          {starRatingReportEditModel.sectionList.map((item, index) => {
            if (item.sectionId) {
              let Components = starRatingReportEditModel.getSection(
                item.sectionId
              );
              if (Components && Components.section) {
                return (
                  <Components.section
                    key={index}
                    sectionId={item.sectionId}
                    modalTitle={item.modalTitle}
                    sectionTitle={item.sectionTitle}
                  />
                );
              }
            }
          })}
        </Page>
        {starRatingReportEditModel.baseModal && (
          <starRatingReportEditModel.baseModal.Component />
        )}
      </ScrollCon>
    )
  }

  //贵州渲染
  const ScrollConGzsrm = () => {
    return (
      <ScrollCon>
        <Page
          ref={pageRef}
          className="gzsrmWith"
        >
          {starRatingReportEditModel.sectionList.map((item, index) => {
            if (item.sectionId) {
              console.log(item)
              console.log("item")
              let Components = starRatingReportEditModel.getSection(
                item.sectionId
              );
              if (Components && Components.section) {
                return (
                  <Components.section
                    key={index}
                    sectionId={item.sectionId}
                    modalTitle={item.modalTitle!="编辑报告名称"?"护理系统夜班绩效统计表":item.modalTitle}
                    sectionTitle={item.sectionTitle}
                  />
                );
              }
            }
          })}
          <div className="table-nrSignatureDate">{starRatingReportEditModel?.gzsrmReport?.nrSignatureDatemoment ? (starRatingReportEditModel.gzsrmReport.nrSignatureDate).format("YYYY年MM月DD日") : ''}</div>
          <div className="table-nrSignature">{starRatingReportEditModel?.gzsrmReport?.nrSignature != '' ? '护   士   长   签   名：' + starRatingReportEditModel?.gzsrmReport?.nrSignature : ''}</div>
          <div className="table-areaNrSignature">{starRatingReportEditModel?.gzsrmReport?.areaNrSignature != '' ? '片区护长审核签名：' + starRatingReportEditModel?.gzsrmReport?.areaNrSignature : ''}</div>
        </Page>
        {starRatingReportEditModel.baseModal && (
          <starRatingReportEditModel.baseModal.Component />
        )}

      </ScrollCon>
    )
  }

  /**
   * 渲染ScrollCon
   * @returns 
   */
  const ScrollConRender = () => {
    switch (appStore.HOSPITAL_ID) {
      case 'jmfy':
        return (
          <ScrollCon>
            <Page ref={pageRef} className={"nysWidth"}>
              <PageJmfy />
            </Page>
          </ScrollCon>
        );
      //20210926暂时隐藏
      case 'gzsrm':
        return ScrollConGzsrm();
      default:
        return ScrollConCommon();
    }
  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb
          data={[
            {
              name: "分析报告",
              link: "/personnelManagement/nightChargingReport"
            },
            { name: "报告详情", link: "" }
          ]}
        />
        <div className="title">{reportName}</div>
        {/* <div className='aside'>
          <span>
            由{report.creatorName}创建{report.updateTime && <span>，最后修改于{report.updateTime}</span>}
          </span>
        </div> */}
        <div className="tool-con">
          <Button onClick={onDelete}>删除</Button>
          {/* <Button onClick={() => onPrint(false)}>预览</Button> */}
          {/* {report.status == "1" ? (
            <Button onClick={onCancelPublish}>撤销</Button>
          ) : (
            // <Button onClick={onPublish}>提交</Button>
          )} */}
          {/* <Button onClick={() => onPrint(true)}>打印</Button> */}
          {
            ['gzsrm'].includes(appStore.HOSPITAL_ID)?
            <Button onClick={() => onPrint(true)}>打印</Button>:''
          }
          <Button onClick={onExport}>导出</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      {

        ScrollConRender()
      }
    </Wrapper>
  );
});
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
  .nysWidth {
    width: 1350px !important;
  }
  .gzsrmWith{
    width: 900px !important;
  }
`;

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
`;
const Page = styled.div`
  width: 720px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  .table-nrSignatureDate{
    text-align: right;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #333333;
    margin-top: -24px;
    margin-right: 50px;
  }
  .table-nrSignature,.table-areaNrSignature{
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #333333;
    margin-left: 46px;
  }
  .table-areaNrSignature{
    margin-top: 20px;
  }
`;

// @ts-ignore
const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`;
