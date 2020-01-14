import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props { }

export default function AwnserInfo() {

  return <Wrapper>
    <div className="main-title">参考答案</div>
    <div className="title">2019年护理考试</div>
    <div>【单选题】</div>
    <div>1. C;   2. E;   3. D;   4. B;   5. C;   6. C;   7. E;   8. D;   9. E;  10. C;

  11. B;  12. C;  13. B;  14. C;  15. C;  16. A;  17. B;  18. B;  19. A;  20. C;

21. D;  22. E;  23. E;</div>
    <   div>【多选题】</div>
    <div>41. B,D;  42. A,B,D;  43. A,B,C,D;  44. A,B,C,D,E;  45. A,B,C,D,E;  46. A,B,C,D;  47. A,B,C,D,E;</div>
    <div className="notice">
      <div>特别提醒：</div>
      试卷预览，只是临时性的模拟一次考试试题，不会保存当前你所看到的记录。如果你的题目是
      <span style={{ color: 'red' }}>随机排序</span>
      的，可能下次你看到的就会不一样。
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  padding: 15px 10px;
  .main-title{
    font-size: 22px;
    color:#000;
    font-weight: bold;
  }
  .title{
    margin-top: 18px;
    margin-bottom: 10px;
    font-size: 16px;
    color:#000;
    font-weight: bold;
  }
  .notice{
    margin-top: 15px;
    padding: 15px;
    background: #eee;
  }
`