import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
interface Props {
  list: any[];
}
export default observer(function Table2_1(props: Props) {
  const [perLen, setPerLen] = useState<number>(0);
  const [perIndex, setPerIndex] = useState<number>(0);
  const [formatList, setFormatList] = useState<any>([]);
  useEffect(() => {
    let list = props.list.filter((v: any, i: number) => {
      if (v.wardName == "全院") {
        setPerIndex(i);
      }
      return v.wardName != "全院";
    });
    setFormatList(list);
    setPerLen(Math.ceil(list.length / 2));
  }, [props.list]);
  return (
    <Wrapper>
      <table className="table-2_1 table-horizon" cellPadding={0} cellSpacing="1">
        <colgroup>
          {["15%", "20%", "15%", "15%", "20%", "15%"].map((v: string, i: number) => (
            <col key={i} width={v} />
          ))}
        </colgroup>
        <tbody>
          <tr>
            {["序号", "科室", "平均分", "序号", "科室", "平均分"].map(
              (v: string, i: number) => (
                <td key={i}>{v}</td>
              )
            )}
          </tr>
          {Array.from(new Array(perLen), (j, k) => k).map((v: any, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{formatList[i]?.wardName}</td>
              <td>{formatList[i]?.averageScore}</td>
              {
                formatList[i + perLen] ? <Fragment>
                  <td>{i + 1 + perLen}</td>
                  <td>{formatList[i + perLen]?.wardName}</td>
                  <td>{formatList[i + perLen]?.averageScore}</td>
                </Fragment>:
                <td colSpan={3}></td>
              }
            </tr>
          ))}
          <tr>
            <td style={{textAlign: 'left'}} colSpan={6}>全院平均分:{props.list[perIndex]?.averageScore}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
