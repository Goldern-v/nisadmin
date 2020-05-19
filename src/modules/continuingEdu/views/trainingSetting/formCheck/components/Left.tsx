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

  return <Wrapper />;
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
