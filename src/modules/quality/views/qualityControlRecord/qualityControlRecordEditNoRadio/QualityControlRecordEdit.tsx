import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message, Spin, Modal } from "antd";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { appStore } from "src/stores";
import { qualityControlRecordEditModel as qcModel } from "./model/QualityControlRecordEditModel";
import { observer } from "mobx-react-lite";
import qs from "qs";
import { ScrollBox } from "src/components/common";
import FormPannel from "./components/FormPannel";
import PreviewPannel from "./components/PreviewPannel";
import { navTitle } from "src/modules/quality/data/qcTitle";

export interface Props {}
// 贵州的满意度表使用
export default observer(function QualityControlRecordEdit() {
  //固定参数
  const { history, location, match } = appStore;
  const search = qs.parse(location.search.replace("?", ""));
  //流程状态相关参数
  const [step, setStep] = useState(1);
  //数据相关参数
  const {
    loading,
    baseInfo,
    master,
    masterErrObj,
    itemGroupList,
    itemListErrObj,
  } = qcModel;

  useEffect(() => {
    qcModel.inited(search, () => {
      message.error("未知表单", 2, () => history.goBack());
    });
  }, []);

  //校验并跳转预览界面
  const handleNext = () => {
    let masterErr = false;
    let itemListErr = false;
    let errMsg = "";
    for (let x in master) {
      if (x == "inpNo") {
        //床号必须为整数
        //默认为7位
        //武汉要支持8位数
        if (master[x].length > 0) {
          let inpNo = Number(master[x]);
          let inpNoLengthArr = appStore.hisMatch({
            map: {
              wh: [7, 8],
              other: [7],
            },
          });
          ////非贵州
          if (
            !["ytll","gzsrm","lyrm","whsl", 'stmz'].includes(appStore.HOSPITAL_ID) &&
            (isNaN(inpNo) || inpNoLengthArr.indexOf(master[x].length) < 0)
          ) {
            //if (isNaN(inpNo) || inpNoLengthArr.indexOf(master[x].length) < 0) {
            qcModel.setMasterErrObj(x, true);
            masterErr = true;
            errMsg = `住院号必须为${inpNoLengthArr.join(",")}位数字`;
          } else if (["gzsrm"].includes(appStore.HOSPITAL_ID) && isNaN(inpNo)) {
            qcModel.setMasterErrObj(x, true);
            masterErr = true;
            errMsg = `住院号必须为数字`;
          }
        }
      } else if (master[x] instanceof Array) {
        if (master[x].length <= 0) {
          if (Object.keys(masterErrObj).indexOf(x) >= 0) {
            qcModel.setMasterErrObj(x, true);
            masterErr = true;
          }
        }
      } else {
        if (master[x] == "") {
          if (Object.keys(masterErrObj).indexOf(x) >= 0) {
            masterErrObj[x] = true;
            masterErr = true;
          }
        }
      }
    }

    for (let i = 0; i < itemGroupList.length; i++) {
      let itemList = itemGroupList[i].itemList;
      if (itemList)
        for (let j = 0; j < itemList.length; j++) {
          let item = itemList[j];
          if (!item.subItemList) break;
          if (item.qcItemValue === "") {
            if (Object.keys(itemListErrObj).indexOf(item.qcItemCode) >= 0) {
              qcModel.setItemListErrObj(item.qcItemCode, true);
              itemListErr = true;
            }
          }
        }
    }

    if (masterErr || itemListErr)
      Modal.warning({
        centered: true,
        title: "提示",
        content: errMsg || "项目未填写",
        onOk: () => {
          if (masterErr) {
            let masterArea = document.getElementById("masterArea");
            if (masterArea) masterArea.scrollIntoView();
            return;
          }

          if (itemListErr) {
            for (let x in itemListErrObj) {
              let item = itemListErrObj[x];
              if (item.err) {
                let target = document.getElementById(
                  `itemGroupItem${item.key}`
                );

                if (target) {
                  target.scrollIntoView();
                  return;
                }
              }
            }
          }
        },
      });
    else {
      setStep(2);
    }
  };

  const handleCache = () => {
    qcModel.formCache(() => {
      message.success("暂存成功!");
    });
  };

  const handleSubmit = () => {
    if (master.followEvaluate) {
      if (!master.followEvaluateDate) {
        message.error("请填写追踪日期");
        return;
      }
    }
    qcModel.formSubmit({ empNo: "", password: "" }, () => {
      message.success("提交成功", 2, () => history.goBack());
    });
  };

  return (
    <Wrapper>
      <TopPannel>
        <TopHeader>
          <BreadcrumbBox
            style={{
              paddingLeft: 0,
              paddingTop: 10,
              paddingBottom: 2,
            }}
            data={[
              {
                name: navTitle(baseInfo.qcLevel),
                link:
                  baseInfo.qcLevel == "3"
                    ? "/qcThree"
                    : baseInfo.qcLevel == "2"
                    ? "/qcTwo"
                    : "3",
              },
              {
                name: search.id ? "修改表单" : "新建表单",
              },
            ]}
          />
          <div className="topHeaderTitle">
            <div className="title">{baseInfo.qcName}</div>
            <div className="sub-title">{/* {baseInfo.intro} */}</div>
            <div className="topHeaderButton">
              {step === 1 && !loading && (
                <React.Fragment>
                  <Button onClick={handleCache}>暂存</Button>
                  <Button onClick={handleNext}>下一步</Button>
                </React.Fragment>
              )}
              {step === 2 && !loading && (
                <React.Fragment>
                  <Button onClick={() => setStep(1)}>上一步</Button>
                  <Button type="primary" onClick={handleSubmit}>
                    确认提交
                  </Button>
                </React.Fragment>
              )}
              <Button onClick={() => history.goBack()}>返回</Button>
            </div>
          </div>
        </TopHeader>
      </TopPannel>
      <MainPannel>
        <div className="main-contain">
          <Spin spinning={loading}>
            <div className="main-content">
              {step === 1 && <FormPannel />}
              {step === 2 && (
                <PreviewPannel setpChange={(step) => setStep(step)} />
              )}
            </div>
          </Spin>
        </div>
      </MainPannel>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .main-contain {
    margin: 0 auto;
    width: 760px;
    padding: 10px 20px;
    color: #000000;
    background: #fff;
    border: 1px solid #ddd;
    min-height: 100%;
  }
  .main-content {
    min-height: 400px;
  }
`;

// @ts-ignore
const MainPannel = styled(ScrollBox)`
  height: calc(100vh - 145px);
  padding: 20px 0;
`;

const TopPannel = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
    .sub-title {
      color: #999;
      min-height: 29px;
      min-width: 10px;
      font-size: 12px;
      padding-bottom: 10px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`;
