import styled from "styled-components";
import React from "react";
import Zimage from "src/components/Zimage";
import { Radio, Icon, Input } from "antd";
const { TextArea } = Input;

interface Props {
  detailData: any;
}

export default function Left(props: Props) {
  const { detailData } = props;
  let messageBoxData = detailData.record || {};
  let pageItem = detailData.pageItem || {};
  let attachment = detailData.attachment || [];

  return (
    <Wrapper>
      <MessageBox>
        <div className="boxLeft">
          <div>时间：{messageBoxData.srDate}</div>
          <div>人员：{messageBoxData.empName}</div>
        </div>
        <div className="boxRight">
          <div>检查重点：{messageBoxData.keyPoints}</div>
          <div>社区：{messageBoxData.community}</div>
        </div>
      </MessageBox>
      <ContentCon>
        <QuestionItem>
          {/* -------本周质控检查记录 */}
          <div className="titleCon">
            <div className="titleLeftCon">一、本周质控检查记录</div>
          </div>
          <div className="itemCon">
            <div className="itemQuestionCon">
              {/* 内容项 */}
              <span className='questionTitle'>存在问题：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.existProblems} />
              <Place />
              <span className='questionTitle'>持续改进：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.improvement} />
              <Place />
              <span className='questionTitle'>其他：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.recordExpand} />
              {/* +附件 */}
              <div className="fujian">
                <span className="problemPro">附件：</span>
                <div className="imgCon">
                  <Zimage text={<span style={{ fontSize: "13px" }}>
                    <Icon
                      type="paper-clip"
                      style={{ fontSize: "13px" }}
                    />
                    {
                      attachment.filter((item: any) => item.type == "0").length
                    }
                  </span>
                  }
                    list={attachment
                      .filter((item: any) => item.type == "0")
                      .map((item: any) => item.path)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* -------二、护理业务查房 */}
          <div className="titleCon">
            <div className="titleLeftCon">二、护理业务查房</div>
          </div>
          <div className="itemCon">
            <div className="itemQuestionCon">
              {/* 内容项 */}
              <span className='questionTitle'>查房内容：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.srContent} />
              <Place />
              <span className='questionTitle'>小讲课人员：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.lecturer} />
              <Place />
              <span className='questionTitle'>小讲课内容：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.lectureContent} />
              <Place />
              <span className='questionTitle'>其他：</span>
              <Input.TextArea autosize={{ minRows: 3 }} disabled value={pageItem.lectureExpand} />
              {/* +附件 */}
              <div className="fujian">
                <span className="problemPro">附件：</span>
                <div className="imgCon">
                  <Zimage text={<span style={{ fontSize: "13px" }}>
                    <Icon
                      type="paper-clip"
                      style={{ fontSize: "13px" }}
                    />
                    {
                      attachment.filter((item: any) => item.type == "1").length
                    }
                  </span>
                  }
                    list={attachment
                      .filter((item: any) => item.type == "1")
                      .map((item: any) => item.path)}
                  />
                </div>
              </div>
            </div>
          </div>
        </QuestionItem>
      </ContentCon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 760px;
  padding: 10px 20px;
  color: #000000;
  background: #fff;
  border: 1px solid #ddd;
  .imgCon {
    display: inline-block;
    margin-right: 6px;
  }
  .fujian {
    margin-bottom: 10px;
  }
`;
const MessageBox = styled.div`
  margin-top: 10px;
  min-height: 60px;
  line-height: 24px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  font-size: 12px;
  display: flex;
  .boxLeft {
    flex: 1;
    width: 0;
  }
  .boxRight {
    flex: 1;
    width: 0;
  }
`;
const ContentCon = styled.div`
  margin-top: 10px;
  font-size: 12px;
  padding-bottom: 20px;
`;
const QuestionItem = styled.div`
  .titleCon {
    margin: 10px 0 0 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    .titleLeftCon {
      flex: 1;
      width: 0;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .itemCon {
    box-sizing: border-box;
    min-height: 40px;
    padding: 4px 0;
    border-bottom: 0.5px dashed #bbbbbb;
    .itemQuestionCon {
      margin-top: 5px;
      font-size: 12px;
      .questionTitle {
        margin-bottom: 5px;
        display: inline-block;
      }
      .problemPro {
        color: #000;
      }
      .itemAttachmentCon {
        display: inline-block;
        cursor: pointer;
        span {
          color: #333;
          &:hover {
            color: ${p => p.theme.$mtc};
          }
        }
      }
      .ant-radio-disabled + span {
        color: black;
      }
      .ant-radio-inner::after {
        background-color: #00a680;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .itemCon1 {
    border-bottom: none !important;
  }
  .notesCon {
    box-sizing: border-box;
    min-height: 116px;
    padding: 10px 0;
    display: flex;
    .notesLeftCon {
      width: 68px;
    }
    .notesRightCon {
      flex: 1;
      width: 0;
      font-size: 12px;
      textarea {
        font-size: 12px;
        resize: none;
        min-height: 90px !important;
      }
      .ant-input-disabled {
        color: black;
      }
    }
  }
`;
const Place = styled.div`
  margin-bottom: 20px;
`;
