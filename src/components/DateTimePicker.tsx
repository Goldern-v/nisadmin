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
        value={date}
        mode="date"
        placeholder={"选择日期"}
        onChange={_date => {
          // setDate(_date)
          onChange && onChange(moment(_date).format("YYYY-MM-DD HH:mm:ss"));
        }}
      />
      <TimePicker
        style={{ marginLeft: 20 }}
        value={time}
        placeholder={"选择时间"}
        onChange={_time => {
          onChange && onChange(moment(_time).format("YYYY-MM-DD HH:mm:ss"));
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
