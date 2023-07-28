import styled from "styled-components";
import React, {useState, useEffect, useLayoutEffect} from "react";
import {Button,message, TreeSelect} from "antd";
import {PageHeader, PageTitle, Place} from "src/components/common";
import {
    DatePicker,
    ColumnProps,
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import {observer} from "mobx-react-lite";
import {appStore, authStore} from "src/stores";
import BaseTable from "src/components/BaseTable";
import {getWeekString, getWeekString2} from "src/utils/date/week";
import moment from "moment";
import classNames from "classnames";
import {tobeBedModal} from './viewModal/index'
import Cell from './components/Cell'
import {fileDownload} from "src/utils/file/file";
import {groupingService} from "src/modules/personnelManagement/views/arrangeHome/page/grouping/groupingService";
import debounce from "lodash/debounce";

export interface Props {
}

const {SHOW_PARENT, SHOW_CHILD} = TreeSelect;
export default React.memo(observer(function TubeBed() {
    const [surplusWidth, setSurplusWidth]: any = useState(false);
    const [isEdit, setIsEdit]: any = useState()
    const [options, setOptions] = useState([]) as any
    const columns: ColumnProps<any>[] | any = [
        {
            title: "序号",
            dataIndex: "",
            key: "",
            render: (text: any, record: any, index: number) => index + 1,
            align: "center",
            width: 60,
            fixed: 'left',
        },
        {
            title: "姓名",
            dataIndex: "empName",
            width: 80,
            align: "center",
            fixed: 'left',
        },
        ...tobeBedModal.dateList.map((date: any, col: any) => {
            return {
                title: <Th date={date}></Th>,
                width: 180,
                render(text: any, record: any, index: any) {
                    if (appStore.HOSPITAL_ID == 'whsl') {
                        return record.empNo ? <TreeSelect key={record.bedLabels} treeData={options}
                                                          treeCheckable={true}
                                                          defaultValue={record.bedList[col].bedLabels ? record.bedList[col].bedLabels.split(',') : []}
                                                          showCheckedStrategy={SHOW_CHILD}
                                                          style={{width: "100%"}}
                                                          onChange={(e: any) => onTreeSelectChange(e, index, col, record)}
                                                          searchPlaceholder="请选择床号"/> : ""
                    } else {
                        return record.empNo ? <Cell dataSource={record} row={index} col={col}
                                                    bedNoList={tobeBedModal.bedNoList}></Cell> : ""
                    }
                },
            };
        }),
    ];
    const onTreeSelectChange = debounce((value: any, index: any, col: any, row: any) => {
        let cell: any = {};
        cell.deptCode = authStore.selectedDeptCode
        cell.deptName = authStore.selectedDeptName
        cell.empName = row.empName
        cell.empNo = row.empNo
        cell.bedLabels = value.join(',').length ? value.join(',') : ''
        cell.workDate = row.bedList[col].workDate
        tobeBedModal.setAllTreeSelectCellData(index, col, cell)
    }, 1000)
    const onLoad = () => {
        tobeBedModal.getTobeBedTableData()
    };
    const saveOrUpdate = () => {
        tobeBedModal.saveOrUpdate().then(res => {
            if (res.code == 200) {
                message.success("设置成功");
                onLoad()
            }
        })
    }
    const schTubeBedExport = () => {
        tobeBedModal.schTubeBedExport().then(res => {
            fileDownload(res)
        })
    }
    const schTubeSyncEmp = () => {
        tobeBedModal.schTubeSyncEmp().then((res) => {
            message.success("同步人员成功");
            // onLoad()
            tobeBedModal.tobeBedTableData = res.data
        })
    }
    useLayoutEffect(() => {
        try {
            (document as any)
                .getElementById("baseTable")!
                .querySelector(
                    ".ant-table-fixed-left .ant-table-body-inner table.ant-table-fixed"
                )!.style.marginBottom =
                (document as any)
                    .getElementById("baseTable")!
                    .querySelector(".ant-table-footer")!.offsetHeight + "px";
        } catch (error) {
            console.log("同步备注滚动报错");
        }
        try {
            setTimeout(() => {
                if (
                    (document as any).querySelector("#arrangeSheet .ant-table-body") &&
                    (document as any).querySelector("#arrangeSheet .ant-table-body")
                        .scrollWidth ==
                    (document as any).querySelector("#arrangeSheet .ant-table-body")
                        .clientWidth
                ) {
                    let widthNys: any = 140;
                    /** noscorll */
                    (document as any).querySelector(
                        "#arrangeSheet #baseTable"
                    ).style.width = tobeBedModal.dateList.length * 180 + widthNys + "px";
                    setSurplusWidth(0);
                } else {
                    (document as any).querySelector("#arrangeSheet #baseTable") &&
                    ((document as any).querySelector(
                        "#arrangeSheet #baseTable"
                    ).style.width = "auto");
                    setSurplusWidth(isEdit ? 300 : 180);
                }
            }, 10);
        } catch (error) {
        }
    }, [tobeBedModal.date, tobeBedModal.dateList, tobeBedModal.tobeBedTableData]);
    useEffect(() => {
        onLoad();
    }, [tobeBedModal.date, authStore.selectedDeptCode]);
    useEffect(() => {
        if (appStore.HOSPITAL_ID == 'whsl') {
            //    title: 'Node1',
            //     value: '0-0',
            //     key: '0-0',
            //     children: [
            //       {
            //         title: 'Child Node1',
            //         value: '0-0-0',
            //         key: '0-0-0',
            //       },
            //     ],
            groupingService.getList().then((res: any) => {
                let list: any = res.data.map((item: any, index: number) => {
                    return {
                        title: item.bedGroupName,
                        value: `${index}-${index}`,
                        key: `${index}-${index}`,
                        children: item.bedLabels.split(',').map((i: any, k: number) => {
                            return {
                                title: i,
                                key: `${index}-${index}-${k}`,
                                value: `${index}-${index}-${i}`
                            }
                        })
                    }
                })
                setOptions([...list])
            })
        }
    }, [])
    useEffect(() => {
    }, []);
    return (
        <Wrapper>
            <PageHeader>
                <PageTitle>管床设置</PageTitle>
                <Place/>
                <span className="label">日期:</span>
                <DatePicker.RangePicker
                    allowClear={false}
                    style={{width: 220}}
                    value={tobeBedModal.date}
                    onChange={(value: any) => tobeBedModal.setDate(value)}
                />
                <span className="label">科室:</span>
                <DeptSelect onChange={() => {
                }}/>
                <Button type="primary" onClick={onLoad}>
                    查询
                </Button>
                <Button onClick={saveOrUpdate}>
                    保存
                </Button>
                <Button onClick={schTubeBedExport}>
                    导出
                </Button>
                <Button onClick={schTubeSyncEmp}>
                    同步人员
                </Button>
            </PageHeader>
            <div style={{margin: "0 15px"}}>
                <WrapperContent className={classNames({isEdit})} id="arrangeSheet">
                    <BaseTable
                        loading={tobeBedModal.pageLoading}
                        dataSource={tobeBedModal.tobeBedTableData || tobeBedModal.dateList}
                        columns={columns}
                        surplusHeight={180}
                        surplusWidth={surplusWidth}
                    />
                </WrapperContent>
            </div>
        </Wrapper>
    );
}));

function Th(props: { date: string }) {
    let date = props.date;
    const Con = styled.div`
      text-align: center;
      padding: 0px 0;
      font-size: 12px;
      line-height: 1.3;

      &.red-text {
        color: red;
      }
    `;
    return (
        <Con
            className={
                getWeekString2(date).indexOf("六") > -1 ||
                getWeekString(date).indexOf("日") > -1
                    ? "red-text"
                    : undefined
            }
        >
            <div>{moment(date).format("MM-DD")}</div>
            <div>{getWeekString2(date)}</div>
        </Con>
    );
}

const Wrapper = styled.div``;
const WrapperContent = styled.div`
  background: #fff;

  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;

    > td {
      background: #fff !important;
    }
  }

  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
    height: 27px;
  }

  #baseTable {
    /* margin: 10px;
    border-radius: 5px; */

    .ant-table-body td,
    .ant-table-tbody td {
      padding: 0 2px !important;
      font-size: 12px !important;
      height: 25px !important;
    }

    td {
      word-break: break-all;
    }

    /* tr {
      cursor: auto !important;
    } */

    .ant-table-column-title {
      font-size: 12px !important;
    }

    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-row-hover > td {
      background: none;
    }
  }

  .ant-table-column-title {
    font-size: 13px !important;
    line-height: 1.3;
  }

  .ant-table-fixed-left {
    box-shadow: none;
    z-index: 0 !important;
  }

  /** fix table scroll bug */

  div.ant-table-body {
    background: #fafafa !important;
  }

  tbody.ant-table-tbody {
    background: #fff;
  }

  .ant-table-footer {
    border: 0 !important;
    background: #fafafa !important;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
  }

  .ant-table-body-outer::after {
    background: #fafafa !important;
  }

  &.isEdit {
    .ant-table-fixed-left {
      td {
        background: #f8f8f8 !important;
      }
    }
  }

  .remark-con {
    margin-top: -10px;
    width: 100%;

    textarea {
      resize: none;
    }

    .remark-title {
      margin-bottom: 5px;
      font-size: 12px;
    }

    &.space {
      position: relative;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      padding: 0 0 10px;
    }

    &.real {
      position: absolute;
      left: 0;
      z-index: 10;
      padding: 10px;
    }
  }

  &.isEdit {
    .ant-table-body {
      tr {
        cursor: auto !important;
        /* pointer-events: none; */
      }
    }
  }

  .nysCss {
    text-align: left !important;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;
