import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Button, InputNumber, Popover} from 'antd'
import {hjExamModal} from '../../HjExamModal'

export interface Props {
    data?: any[],
    title?: string,
    type?: 'view' | 'edit',
}

export default function QuestionsStatistics(props: Props) {
    const {data, type, title} = props
    const [heard, setHeard] = useState([] as any)
    useEffect(() => {
        const {
            examDuration,
            questionCount,
            totalScores,
            passScores,
            startTime,
            endTime,
            correctRate
        } = hjExamModal.analyCorrectRateData
        setHeard([{name: '开始时间', value: startTime}, {name: '结束时间', value: endTime}, {
            name: "考试时间",
            value: examDuration
        }, {name: '及格分数线', value: passScores ? passScores : 0}, {
            name: '题目数量',
            value: questionCount ? questionCount : 0
        }, {
            name: '试卷总正确率',
            value: correctRate ? correctRate : 0
        }])
    }, [])
    const viewType = type || 'edit'
    const correctImg = <img src={require('./../../../../assets/question-correct.png')}/>
    const topic = (item: any) => {
        console.log("item===",item);
        return (
            <div className='wrong-topic'>
                <div style={{marginRight: "10px"}}>答对次数:{item.correctCount ? item.correctCount : 0}</div>
                <div style={{marginRight: "10px"}}>答错次数:{item.errorCount?item.errorCount:0}</div>
                <div style={{marginRight: "10px"}}>正确率:{item.correctRate?item.correctRate:0}%</div>
            </div>
        )
    }
    const choiceContent = (item: any, idx: number) => {
        let selectedArr = []
        let answerList = item.answerList || []
        for (let i = 0; i < answerList.length; i++) {
            let answerItem = answerList[i]

            if (answerItem.isSelected)
                selectedArr.push(answerItem.optionLabel)
        }

        return <div className="question-item" key={idx || 0}>
            <span className="question-content">
        <div>
          <span className="index">{item.sort}、</span>
          <span className="question-type">
            [{item.questionType == 1 ? '单选题' : '多选题'}]
          </span>
          <span className="question-desc">{item.questionContent}</span>
          <span style={{color: '#999'}}>({item.scores}分) </span>
        </div>
        <div style={{paddingLeft: '5px'}}>
          {answerList.map((awnserItem: any, awnserIdx: number) =>
              <React.Fragment>
              <span className="choice-item" key={`${idx}-${awnserIdx}`}>
                {!!awnserItem.isRight &&
                    <span className="correct-choice">{correctImg}</span>}
                  <span className="choice-desc">
                  {`${awnserItem.optionLabel}、${awnserItem.optionContent}`}
                </span>
              </span>
              </React.Fragment>)}
        </div>
      </span>
            {/*   错题率 */}
            {topic(item)}
        </div>
    }

    const fillContent = (item: any, idx: number) => {
        return <div className="question-item" key={idx || 0}>
            <span className="question-content">
        <div>
          <span className="index">{item.sort}、</span>
          <span className="question-type">[填空题] </span>
          <span className="question-desc">
            <span
                dangerouslySetInnerHTML={{
                    __html: `${item.questionContent
                        .replace(/##/g, '<span class="fill-underline"></span>')}`
                }}></span>
            <span style={{color: '#999'}}>({item.scores}分) </span>
          </span>
        </div>
      </span>
            {/*   错题率 */}
            {topic(item)}
        </div>
    }

    const wendaContent = (item: any, idx: number) => {
        let answer = (item.answerList && item.answerList[0]) || {}
        return <div className="question-item" key={idx || 0}>
        <span className="question-content">
        <div>
          <span className="index">{item.sort}、</span>
          <span className="question-type">[问答题] </span>
          <span className="question-desc">
            {item.questionContent}（{item.scores}分）
          </span>
          <Popover
              content={<pre>{answer.suggestedAnswer}</pre>}
              trigger="click" title="参考答案">
            <span className="refer">参考答案</span>
          </Popover>
            {viewType == 'edit' && <span className="de-score">
            答案扣
            <InputNumber
                className="de-score-ipt"
                size="small"
                value={item.deduction}
                precision={1}
                step={0.1}
                max={item.scores}
                min={0}/>
            分
          </span>}
        </div>
      </span>
            {/*   错题率 */}
            {topic(item)}
        </div>
    }

    return <Wrapper>
        <div className="main-title">《{title}》</div>
        <div className="question-list">
            {/*考试详情*/}
            <div className='question-head'>
                {
                    (heard || []).map((item: any, index: number) => {
                        return (
                            <div key={item.name} className='question-head-item'
                                 style={{color: index === 5 ? 'red' : ''}}>
                                <div>{item.name}</div>
                                :
                                <div>{item.value}{{2: '分钟', 3: '分', 4: '题', 5: '%'}[index]}</div>
                            </div>
                        )
                    })
                }
            </div>
            {data?.map((item: any, idx: number) => {
                switch (item.questionType) {
                    case 1:
                    case 2:
                        return choiceContent(item, idx)
                    case 3:
                        return fillContent(item, idx)
                    case 4:
                        return wendaContent(item, idx)
                    default:
                        return <span key={idx}></span>
                }
            })}
        </div>
    </Wrapper>
}

const pageWidth = 750
const pagePadding = 25
const pageBorder = 1
const contentWidth = pageWidth - pagePadding * 2 - pageBorder * 2

const Wrapper = styled.div`
  width: ${pageWidth}px;
  margin: 15px auto;
  background: #fff;
  padding: ${pagePadding}px;
  min-height: 800px;
  border: ${pageBorder}px solid #e8e8e8;

  .main-title {
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }

  .question-list {
    .question-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      background-color: rgba(238, 239, 238);
      padding: 10px;
      margin-bottom: 10px;

      .question-head-item {
        display: flex;
        align-items: center;
        width: 300px;
        margin-bottom: 10px;
      }
    }
  }

  .question-item {
    & > span {
      display: inline-block;
      vertical-align: top;
    }

    .question-result {
      width: 20px;
      min-height: 20px;
      float: left;

      span {
        font-size: 13px;
        color: #000;
      }

      img {
        width: 15px;
        position: relative;
        left: 1px;
      }
    }

    .fill-underline {
      display: inline-block;
      width: 40px;
      border-bottom: 1px solid #333;
    }

    .question-content {
      width: ${contentWidth - 20}px;
      padding-left: 10px;
      font-size: 13px;
      margin-bottom: 15px;

      .question-type {
        color: #F59A23;
      }

      .emp-choices {
        color: #00f;
        display: inline-block;
      }

      .choice-item {
        position: relative;
        margin-right: 15px;

        .correct-choice {
          position: absolute;
          top: -2px;
          left: -2px;

          img {
            width: 14px;
          }
        }
      }

      .refer {
        margin-right: 15px;
        cursor: pointer;
        color: #027DB4;
        display: inline-block;
        text-decoration: underline;
      }

      .de-score {
        .de-score-ipt {
          margin: 0 2px;
          width: 60px;

          .ant-input-number-input {
            color: red;
          }

          .ant-input-number-handler-wrap {
            display: none;
          }
        }
      }

      pre {
        white-space: pre-wrap;
        word-break: break-all;

        &.answer {
          color: #00f;
        }
      }
    }

    .wrong-topic {
      display: flex;
      height: 40px;
      margin-bottom: 10px;
      align-items: center;
      background-color: rgba(238, 238, 238);
      color: red;
    }
  }
`
