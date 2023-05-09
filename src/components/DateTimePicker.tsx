import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";

import classNames from "classnames";
import { DatePicker, TimePicker } from "src/vendors/antd";
import moment from "moment";
export interface Props {
  value?: any;
  onChange?: any;
}

export default function DateTimePicker(props: Props) {
  let { value, onChange } = props;
  const [date, setDate]: any = useState(null);
  const [time, setTime]: any = useState(null);

  useEffect(() => {
    if (value) {
      setDate(moment(value));
      setTime(moment(value));
    } else {
      setDate(null);
      setTime(null);
    }
  }, [value]);

  return (
    <Wrapper>
      <DatePicker
        allowClear={false}
        value={date}
        mode="date"
        placeholder={"选择日期"}
        onChange={_date => {
          // setDate(_date)
          onChange && onChange(_date ? moment(_date).format("YYYY-MM-DD HH:mm:ss"): null);
        }}
      />
      <TimePicker
        allowClear={false}
        style={{ marginLeft: 20 }}
        value={time}
        minuteStep={5}
        placeholder={"选择时间"}
        format="HH:mm"
        onChange={_time => {
          onChange && onChange(_time ? moment(_time).format("YYYY-MM-DD HH:mm:ss") : null);
        }}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .ant-calendar-picker,
  .ant-time-picker {
    width: auto !important;
  }
`;
