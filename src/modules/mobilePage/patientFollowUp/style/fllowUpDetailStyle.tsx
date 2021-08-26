import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 50px;
  .content {
    background: #f5f5f9;
    margin-bottom: 15px;
    overflow: hidden;
    .card {
      background: #fff;
      margin-bottom: 20px;
      padding-bottom: 10px;
    }
    .patientinfo {
      padding: 15px;
      background-color: #fff;
      margin-bottom: 20px;
      line-height: 25px;
      font-size: 14px;
      .info_header {
        .patient_name {
          font-size: 16px;
          font-weight: 700;
          margin-right: 30px;
        }
      }
      .info_footer {
        .patient_tel {
          margin-right: 80px;
        }
      }
    }
    .documentDescription {
      background-color: #fff;
      line-height: 40px;
      text-indent: 15px;
      font-size: 14px;
      font-weight: 700;
    }
    .radio-box {
      position: relative;
      border: 1px solid rgba(0, 0, 0, 0.65);
      margin-bottom: -1px;
      /* border-top: 0; */
      min-height: 50px;
      line-height: 50px;
      margin: 0 15px 5px;
      font-size: 14px;
      padding-left: 15px;

      input {
        vertical-align: text-bottom;
        margin-right: 5px;
      }
    }
    .r-text {
      height: 30px;
      vertical-align: unset !important;
      margin-left: 15px;
      border: 1px solid rgba(0, 0, 0, 0.65);
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
    .am-list {
      margin-bottom: 10px;
      color: #333333;
      .am-list-content,
      .am-list-extra {
        font-size: 14px;
      }
    }
    .sub-title {
      background-color: #fff;
      padding: 0 15px;
      .title_h {
        font-size: 16px;
        line-height: 52px;
      }
      .title_c {
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
    .am-list-item {
      justify-content: space-around;
      padding-left: 0;
      .am-input-label.am-input-label-5 {
        width: 265px;
        font-size: 14px;
      }
      .am-list-line {
        padding-right: 0;
        justify-content: space-around;
        flex: 1;
        .am-list-arrow {
          margin-left: 0;
          transform: rotate(90deg);
        }
        .am-list-content {
          flex: none;
          width: 220px;
          color: #333333;
        }
        .am-input-control input {
          font-size: 14px;
          width: 50px;
        }
        .am-list-extra {
          flex-basis: unset;
          color: #cdbfcd;
          padding: 0;
        }
      }
    }
    .am-list-body {
      position: relative;
      .item {
        font-size: 14px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-top: 1px solid #e6e6e6;
        .item_text {
          width: 220px;
        }
        input {
          width: 50px;
          height: 20px;
          border: none;
          &::focus {
            border: none;
          }
        }
      }
    }
    .company {
      /* position: absolute;
        right:10px;
        top:14px; */
      font-size: 14px;
    }
    .question {
      font-size: 14px;
      padding: 20px;
    }
    .checkboxs {
      font-size: 14px;
      padding: 0 20px;
      .checklist:nth-child(1) {
        border-top: 1px solid #000;
      }
      .checklist {
        min-height: 30px;
        border: 1px solid #000;
        border-top: 0;
        box-sizing: border-box;
        padding-left: 20px;
        .firstcheck {
          .time {
            margin-left: 10px;
          }
          .timeinp {
            border: none;
            border-bottom: 1px solid #000;
            width: 40px;
            height: 20px;
            line-height: 0px;
            vertical-align: unset;
            text-align: center;
          }
          .hide {
            display: none;
          }
        }
      }
      .childrencheck {
        border-left: 0;
        border-right: 0;
        padding-left: 15px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        .checkitem {
          input {
            vertical-align: unset;
            margin-right: 5px;
            margin-left: 5px;
          }
        }
      }
      .checklist,
      .childrencheck {
        line-height: 30px;
        input {
          vertical-align: text-bottom;
          margin-right: 5px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #000;
    padding: 5px 0 0;
    .sumbit-btn {
      background-color: #169bd5;
      width: 90%;
      height: 94%;
      margin: 0 auto;
    }
  }
`;
export default Wrapper;
