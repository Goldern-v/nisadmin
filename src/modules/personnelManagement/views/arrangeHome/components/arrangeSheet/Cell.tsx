import classNames from 'classnames'
import styled from 'styled-components'
import React, { useState } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { message, Popover } from 'src/vendors/antd'
import { appStore, authStore } from 'src/stores'
import { ContextMenu } from '../../types/contextMenu'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import { ArrangeItem } from '../../types/Sheet'
import { cleanCell, cleanCellList, copyCellClick, copyRowClick, getAddArrangeMenuList } from './cellClickEvent'
import { resetArrangeCount } from '../../page/EditArrangePage/components/FlightMenu'

export interface Props {
    contextMenu: ContextMenu;
    editEffectiveTimeModal: any;
    addAccumulativeLeaveModal: any; // 添加积假
    addRemakeModal: any; // 添加备注
    editVacationCountModal: any;
    dataSource: any;
    index: number;
    isEdit: boolean;
}
/**排班符号 */
const SymbolIcon = ({ symbol }: { symbol: any }) => {
    return <span style={{ color: symbol.symbolColor || "#333" }}>
        {symbol.symbol || ""}
    </span>
}
export default observer(function Cell(props: Props) {
    let {
        contextMenu,
        dataSource,
        index,
        editEffectiveTimeModal,
        addAccumulativeLeaveModal, // 添加积假
        addRemakeModal, // 添加备注
        editVacationCountModal,
        isEdit
    } = props;

    const [hoverShow, setHoverShow] = useState(false);

    let cellObj =
        index < dataSource.settingDtos.length ? dataSource.settingDtos[index] : {};
    let cellConfig = sheetViewModal.analyseCell(cellObj);

    const onContextMenu = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        let target;
        if (!isEdit) return;
        event.preventDefault();
        if (cellConfig.isTwoDaysAgo) return;
        if ((event as any).target.tagName !== "DIV") {
            target = (event as any).target.parentNode;
        } else {
            target = (event as any).target;
        }
        sheetViewModal.selectedCell = cellObj;
        let hasArrange = !!(
            sheetViewModal.selectedCell && sheetViewModal.selectedCell.rangeName
        );

        let { left: x, top: y, width, height } = target.getBoundingClientRect();
        /** 公休节休不可编辑 */

        let disableByName =
            sheetViewModal.selectedCell.rangeName == "公休" ||
            sheetViewModal.selectedCell.rangeName == "节休";

        contextMenu.show(
            [
                {
                    icon: require("../../images/追加排班.png"),
                    disabled:
                        (sheetViewModal.selectedCell.rangeName &&
                            sheetViewModal.selectedCell.settings &&
                            sheetViewModal.selectedCell.settings.length) ||
                        disableByName,
                    label: "追加排班",
                    type: "text",
                    children: getAddArrangeMenuList(
                        sheetViewModal.arrangeMenu,
                        sheetViewModal.selectedCell
                    )
                },
                {
                    type: "line"
                },
                ['wh', 'gxjb', 'whyx', 'gzsrm', 'fssdy', 'fsxt', '925', 'nys', 'jmfy', 'lcey', 'dghl', 'fqfybjy', 'lyyz', 'qhwy', "whsl", "wjgdszd", 'ytll', 'whhk', 'dglb', 'zzwy', 'dghm', 'zjhj'].includes(appStore.HOSPITAL_ID)
                    ? {
                        icon: require("../../images/修改工时.png"),
                        label: "加/减班",
                        type: "text",
                        disabled: ['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) ? false : disableByName,
                        onClick: () => {
                            editEffectiveTimeModal.show({
                                data: sheetViewModal.selectedCell,
                                onOkCallBack(data: any) {
                                    // console.log(data, "datadata");
                                    sheetViewModal.selectedCell.detail = data.detail;

                                    if (data.statusType == "1") {
                                        /** 加班 */
                                        sheetViewModal.selectedCell.effectiveTime = Number(
                                            Number(data.effectiveTime) +
                                            Number(sheetViewModal.selectedCell.effectiveTimeOld)
                                        );
                                    } else if (data.statusType == "2") {
                                        /** 减班 */
                                        sheetViewModal.selectedCell.effectiveTime =
                                            Number(sheetViewModal.selectedCell.effectiveTimeOld) -
                                            Number(data.effectiveTime);
                                    }
                                    sheetViewModal.selectedCell.schAddOrSubs = [
                                        {
                                            startDate: data.startDate,
                                            endDate: data.endDate,
                                            statusType: data.statusType,
                                            hour: Number(data.effectiveTime),
                                            settingNightHour: Number(data.settingNightHour) || 0,
                                            settingMorningHour: Number(data.settingMorningHour) || 0
                                        }
                                    ];
                                }
                            });
                        }
                    }
                    : {
                        icon: require("../../images/修改工时.png"),
                        label: "修改工时",
                        type: "text",
                        disabled: disableByName,
                        onClick: () => {
                            editEffectiveTimeModal.show({
                                data: sheetViewModal.selectedCell,
                                onOkCallBack(value: any) {
                                    sheetViewModal.selectedCell.effectiveTime =
                                        value.effectiveTime;
                                    sheetViewModal.selectedCell.detail = value.detail;
                                    // setCellConfig(sheetViewModal.analyseCell(cellObj))
                                }
                            });
                        }
                    },
                ...appStore.hisMatch({
                    map: {
                        'jmfy': [
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "添加积假",
                                type: "text",
                                disabled: disableByName,
                                onClick: () => {
                                    addAccumulativeLeaveModal.show({
                                        data: sheetViewModal.selectedCell,
                                        onOkCallBack(data: any) {
                                            sheetViewModal.selectedCell.schJiJias = [{
                                                statusType: data.statusType,
                                                totalHoliday: data.totalHoliday,
                                            }]
                                        }
                                    });
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "添加备注",
                                type: "text",
                                onClick: () => {
                                    addRemakeModal.show({
                                        data: sheetViewModal.selectedCell,
                                        onOkCallBack(value: any) {
                                            sheetViewModal.selectedCell.schRemarks = [{ remark: value.detail }]
                                        }
                                    });
                                }
                            }
                        ],
                        'fssdy,nfzxy,whyx,whhk': [
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "添加备注",
                                type: "text",
                                onClick: () => {
                                    addRemakeModal.show({
                                        data: sheetViewModal.selectedCell,
                                        onOkCallBack(value: any) {
                                            sheetViewModal.selectedCell.schRemarks = [{ remark: value.detail }]
                                        }
                                    });
                                }
                            }
                        ],
                        'nfsd': [
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "添加备注",
                                type: "text",
                                onClick: () => {
                                    addRemakeModal.show({
                                        data: sheetViewModal.selectedCell,
                                        onOkCallBack(value: any) {
                                            sheetViewModal.selectedCell.schRemarks = [{ remark: value.detail }]
                                        }
                                    });
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "二值",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 1, typeName: "二值" }]
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "送病人",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 2, typeName: "送病人" }]
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "总值",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 3, typeName: "总值" }]
                                }
                            }
                        ],
                        'sdlj,qzde': [
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "添加备注",
                                type: "text",
                                onClick: () => {
                                    addRemakeModal.show({
                                        data: sheetViewModal.selectedCell,
                                        onOkCallBack(value: any) {
                                            sheetViewModal.selectedCell.schRemarks = [{ remark: value.detail }]
                                        }
                                    });
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "二值",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 1, typeName: "二值" }]
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "三值",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 4, typeName: "三值" }]
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "送病人",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 2, typeName: "送病人" }]
                                }
                            },
                            {
                                icon: require("../../images/修改工时.png"),
                                label: "总值",
                                type: "text",
                                onClick: () => {
                                    sheetViewModal.selectedCell.schSpecial = [{ type: 3, typeName: "总值" }]
                                }
                            }
                        ],
                        other: []
                    },
                    vague: true,
                }),
                ...appStore.hisMatch({
                    map: {
                        'zhzxy': [{
                            icon: require("../../images/修改工时.png"),
                            label: "添加备注",
                            type: "text",
                            onClick: () => {
                                addRemakeModal.show({
                                    data: sheetViewModal.selectedCell,
                                    onOkCallBack(value: any) {
                                        sheetViewModal.selectedCell.schRemarks = [{ remark: value.detail }]
                                    }
                                });
                            }
                        }],
                        other: []
                    }, vague: true
                }),
                {
                    icon: require("../../images/休假计数.png"),
                    disabled: !sheetViewModal.countArrangeNameList.includes(
                        sheetViewModal.selectedCell.rangeName
                    ),
                    label: "休假计数",
                    type: "text",
                    onClick: () => {
                        if (!sheetViewModal.selectedCell.rangeName) return;
                        if (!sheetViewModal.selectedCell.userId) return;
                        let [user, list] = sheetViewModal.getUser(
                            sheetViewModal.selectedCell.userId
                        );
                        editVacationCountModal.show({
                            baseNum: sheetViewModal.selectedCell.rangeNameCode,
                            data: sheetViewModal.selectedCell,
                            onOkCallBack(num: any) {
                                if (!sheetViewModal.selectedCell.userId) return;
                                /** 存班次计数断点 */
                                sheetViewModal.selectedCell.rangeNameCodeList = (num || 0) + "";
                                if (user && sheetViewModal.selectedCell.rangeName) {
                                    // user.countArrangeBaseIndexObj[
                                    //   sheetViewModal.selectedCell!.rangeName
                                    // ] = num - 1;
                                    resetArrangeCount(
                                        sheetViewModal.selectedCell.userId,
                                        sheetViewModal.selectedCell!.rangeName
                                    );
                                }
                            }
                        });
                    }
                },
                {
                    type: "line"
                },
                {
                    icon: require("../../images/符号.png"),
                    label: "符号",
                    type: "text",
                    disabled: !hasArrange,
                    children: [
                        ...sheetViewModal.schSymbolList.map(item => ({
                            type: "text",
                            dataSource: item,
                            label: (
                                <div className="symbol-con">
                                    <div className="symbol-icon"
                                        style={{ color: item.symbolColor || '' }}>{item.symbol}</div>
                                    <div className="symbol-aside">{item.detail}</div>
                                </div>
                            ),
                            onClick: (item: any) => {
                                // 可选择2个符号，队列式
                                if ('qhwy' === appStore.HOSPITAL_ID) {
                                    const addSymbols = sheetViewModal.selectedCell.addSymbols || []
                                    const curItem = {
                                        symbol: item.dataSource.symbol,
                                        detail: item.dataSource.detail,
                                        symbolColor: item.dataSource.symbolColor
                                    }
                                    const index = addSymbols!.findIndex(v => v.symbol === curItem.symbol)
                                    if (index > -1) {
                                        sheetViewModal.selectedCell.addSymbols?.splice(index, 1)
                                    } else {
                                        addSymbols!.push(curItem)
                                        addSymbols!.length > 3 && addSymbols?.shift()
                                        sheetViewModal.selectedCell.addSymbols = addSymbols
                                    }
                                    return
                                }
                                sheetViewModal.selectedCell.addSymbols = [
                                    {
                                        symbol: item.dataSource.symbol,
                                        detail: item.dataSource.detail,
                                        symbolColor: item.dataSource.symbolColor
                                    }
                                ];
                            }
                        })),
                        {
                            type: "line"
                        },
                        {
                            icon: require("../../images/删除.png"),
                            type: "text",
                            label: "清除符号",
                            onClick: (item: any) => {
                                sheetViewModal.selectedCell.addSymbols = null;
                            }
                        }
                    ]
                },
                {
                    type: "line"
                },
                {
                    icon: require("../../images/复制行.png"),
                    label: "复制格",
                    type: "text",
                    onClick() {
                        if (sheetViewModal.copyCellList.length) {
                            /** 多格子 */
                            sheetViewModal._copyCellList = [...sheetViewModal.copyCellList];
                        } else {
                            sheetViewModal.copyCell = sheetViewModal.selectedCell;
                            sheetViewModal._copyCellList = [];
                        }
                        sheetViewModal.selectedCellList = []
                        message.success("复制格成功");
                    }
                },
                {
                    icon: require("../../images/粘贴行.png"),
                    label: "粘贴格",
                    type: "text",
                    onClick() {
                        /** 存在多个格子选中的情况下，优先复制多个格子 */
                        if (
                            sheetViewModal._copyCellList.length &&
                            sheetViewModal.selectedCell.userId
                        ) {
                            const [user, list] = sheetViewModal.getUser(
                                sheetViewModal.selectedCell.userId
                            );
                            if (user) {
                                let index = list.findIndex(
                                    (item: any) => item == sheetViewModal.selectedCell
                                );
                                /** 剩余的格子 */
                                let restList = list.slice(index);

                                let length = Math.min(
                                    restList.length,
                                    sheetViewModal._copyCellList.length
                                );

                                for (let i = 0; i < length; i++) {
                                    copyCellClick(restList[i], sheetViewModal._copyCellList[i]);
                                }
                                sheetViewModal.selectedCell = {}
                                sheetViewModal.selectedCellList = []
                            }
                        } else {
                            copyCellClick(
                                sheetViewModal.selectedCell,
                                sheetViewModal.copyCell
                            );
                        }
                    }
                },

                {
                    icon: require("../../images/复制行.png"),
                    label: "复制行",
                    type: "text",
                    onClick() {
                        sheetViewModal.copyRow = sheetViewModal.getSelectCellList(true);
                        message.success("复制行成功");
                    }
                },
                {
                    icon: require("../../images/粘贴行.png"),
                    label: "粘贴行",
                    type: "text",
                    onClick() {
                        let list = sheetViewModal.getSelectCellList(true);
                        let copyRow = sheetViewModal.copyRow;
                        copyRowClick(list, copyRow, sheetViewModal.isCut);
                    }
                },
                {
                    icon: require("../../images/剪切行.png"),
                    label: "剪切行",
                    type: "text",
                    onClick() {
                        sheetViewModal.copyRow = sheetViewModal.getSelectCellList(true);
                        message.success("剪切行成功");
                        sheetViewModal.isCut = true
                    }
                },
                // 亚心同步
                ...appStore.hisMatch({
                    map: {
                        'whyx,whhk': [
                            {
                                icon: require("../../images/粘贴行.png"),
                                label: "同步同组排班",
                                type: "text",
                                onClick() {
                                    // sheetViewModal.copyRow = sheetViewModal.getSelectCellList(true);
                                    sheetViewModal.holdTeam()
                                    message.success("同步成功");
                                }
                            },
                        ],
                        other: []
                    },
                    vague: true
                }),
                // {
                //   icon: require("../../images/复制行.png"),
                //   label: "复制整周",
                //   type: "text",
                //   onClick() {
                //     // sheetViewModal.copyWeekRow = sheetViewModal.getSelectWeekList(true);
                //     let copyWeekNum = moment(
                //       sheetViewModal.selectedCell.workDate
                //     ).week();

                //     let copyWeekData = sheetViewModal
                //       .getAllCell(true)
                //       .filter(item => moment(item.workDate).week() == copyWeekNum);

                //     sheetViewModal.copyWeekData = cloneJson(copyWeekData);

                //     message.success("复制周成功");
                //   }
                // },
                // {
                //   icon: require("../../images/粘贴行.png"),
                //   label: "粘贴整周",
                //   type: "text",
                //   onClick() {
                //     // let list = sheetViewModal.getSelectWeekList(true);
                //     // let copyWeekRow = sheetViewModal.copyWeekRow;
                //     // copyRowClick(list, copyWeekRow, false);
                //     let currentWeekNum = moment(
                //       sheetViewModal.selectedCell.workDate
                //     ).week();

                //     sheetViewModal.copyWeek(currentWeekNum);
                //   }
                // },
                {
                    type: "line"
                },
                {
                    icon: require("../../images/删除.png"),
                    label: "清除格子",
                    type: "text",
                    onClick() {
                        cleanCell(sheetViewModal.selectedCell);
                    }
                },
                {
                    icon: require("../../images/删除.png"),
                    label: "清除行",
                    type: "text",
                    onClick() {
                        let list = sheetViewModal.getSelectCellList(true);
                        cleanCellList(list);
                    }
                }
            ],
            {
                x: x + width,
                // y: y - 80
                y: y + height / 2
            }
        );
    };

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isEdit) return;
        if (cellConfig.isTwoDaysAgo) return;
        /** 判断是否按下 ctrl */
        if (e.ctrlKey) {
            if (
                sheetViewModal.selectedCell.rangeName &&
                !sheetViewModal.copyCellList.includes(sheetViewModal.selectedCell)
            ) {
                sheetViewModal.copyCellList.push(sheetViewModal.selectedCell);
            }
            if (cellObj.rangeName && !sheetViewModal.copyCellList.includes(cellObj)) {
                sheetViewModal.copyCellList.push(cellObj);
            }
        } else {
            sheetViewModal.copyCellList = [];
        }

        // 东莞横沥 按住ctrl 可以选择多个cell  start -----
        if (['dghl', 'jmfy', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) {
            if (e.ctrlKey) {
                const includes = sheetViewModal.selectedCellList.includes(cellObj)
                if (!includes) { // 如果包含也不取消
                    sheetViewModal.selectedCellList.push(cellObj)
                }
            } else {
                sheetViewModal.selectedCellList = [cellObj]
            }
        }
        // end ------

        sheetViewModal.selectedCell = cellObj;
    };
    const onVisibleChange = (visible: boolean) => {
        if (cellConfig.isAddWordTime || cellConfig.isReduceWordTime || cellConfig.isJiJiaTime || cellConfig.isWorkTime) {
            return setHoverShow(visible);
        } else {
            return setHoverShow(false);
        }
    };
    const content = (
        <div>
            <div>
                备注:
                {cellObj.detail && <span>{cellObj.detail || ""}</span>}
                {!cellObj.detail && <span style={{ color: "#999" }}>无</span>}
            </div>
        </div>
    );
    const title = appStore.hisMatch({
        map: {
            'hj': () => {
                return (
                    (cellObj.effectiveTimeOld > cellObj.effectiveTime ? "减少" : "增加") +
                    "了" +
                    Math.abs(cellObj.effectiveTime - cellObj.effectiveTimeOld) +
                    "工时"
                )
            },
            'jmfy': () => {
                const jijia = cellObj.schJiJias && cellObj.schJiJias[0]
                if (!jijia) return ''
                return (
                    (jijia.statusType === '1' ? "增加" : "减少") +
                    "了" +
                    jijia.totalHoliday +
                    "天积假"
                );
            },
            'wh,wjgdszd,gxjb,lcey,dghl,fqfybjy,fssdy,fsxt,925,whyx,whhk,lyyz,ytll,zzwy,zjhj': () => {
                return (
                    (cellObj.schAddOrSubs &&
                        cellObj.schAddOrSubs.length &&
                        cellObj.schAddOrSubs[0].statusType == "1"
                        ? "加班"
                        : "减班") +
                    ":" +
                    (cellObj.schAddOrSubs && cellObj.schAddOrSubs.length
                        ? cellObj.schAddOrSubs[0].hour
                        : 0) +
                    "h" +
                    "，" +
                    `现:${cellObj.effectiveTime || 0}h，` +
                    `原:${cellObj.effectiveTimeOld || 0}h，` +
                    `白:${(cellObj.schAddOrSubs &&
                        cellObj.schAddOrSubs.length &&
                        cellObj.schAddOrSubs[0].settingMorningHour) ||
                    0}h，` +
                    `夜:${(cellObj.schAddOrSubs &&
                        cellObj.schAddOrSubs.length &&
                        cellObj.schAddOrSubs[0].settingNightHour) ||
                    0}h`
                )
            },
            'qhwy,whsl,dglb,dghm': () => {
                return (
                    (cellObj.schAddOrSubs &&
                        cellObj.schAddOrSubs.length &&
                        cellObj.schAddOrSubs[0].statusType == "1"
                        ? "加班"
                        : "减班") +
                    ":" +
                    (cellObj.schAddOrSubs && cellObj.schAddOrSubs.length
                        ? cellObj.schAddOrSubs[0].hour
                        : 0) +
                    "h" +
                    "，" +
                    `现:${cellObj.effectiveTime || 0}h，` +
                    `原:${cellObj.effectiveTimeOld || 0}h，` +
                    `白:${(cellObj.schAddOrSubs &&
                        cellObj.schAddOrSubs.length &&
                        cellObj.schAddOrSubs[0].settingMorningHour) ||
                    0}h，` +
                    `夜:${(cellObj.schAddOrSubs &&
                        cellObj.schAddOrSubs.length &&
                        cellObj.schAddOrSubs[0].settingNightHour) ||
                    0}h，` + (
                        cellObj.workTime ? `
            ${cellObj.rangeName} : ${cellObj.workTime}
          ` : '')
                );
            },
            default: () => ""
        },
        vague: true,
    })

    return (
        <Popover
            content={content}
            title={title()}
            trigger="hover"
            placement="rightTop"
            visible={hoverShow}
            onVisibleChange={onVisibleChange}
        >
            <Wrapper
                onContextMenu={onContextMenu}
                onClick={onClick}
                className={classNames(cellConfig)}
                backgroundColor={['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) ? cellObj.backgroundColor : ''}
            >
                {/* backgroundColor={['whyx', 'fssdy'].includes(appStore.HOSPITAL_ID) ? cellObj.backgroundColor : ""} */}
                {appStore.isDev && (
                    <span style={{ display: "none" }}>{JSON.stringify(cellConfig)}</span>
                )}
                {cellConfig.isAddWordTime ? <div className="sj add" /> : ""}
                {cellConfig.isJiJiaTime ? <div className="sj jijia" /> : ""}
                {cellConfig.isReduceWordTime ? <div className="sj reduce" /> : ""}
                {cellConfig.isExpectedScheduling ? (
                    <img
                        className="expect"
                        src={require("../../images/期望排班.png")}
                        alt=""
                    />
                ) : (
                    ""
                )}
                {formatCell(cellObj, isEdit)}
                {appStore.isDev && (
                    <span style={{ display: "none" }}>{JSON.stringify(cellObj)}</span>
                )}
            </Wrapper>
        </Popover>
    );
});

function formatCell(cellObj: ArrangeItem, isEdit = false) {
    const Con = appStore.hisMatch({
        map: {
            // 谢岗： 除了黑色和灰色 其它字体都加粗
            'dgxg': styled.span<{ color: string | undefined }>`
              color: ${p => p.color};
              font-weight: ${p => ['#333333', '#999999'].includes(p.color || '') ? 'unset' : 'bold'};
            `,
            default: styled.span<{ color?: string | undefined }>`
              color: ${p => p.color};
            `
        }
    })
    const isHidden = appStore.hisMatch({
        map: {
            // 江门妇幼 普通用户 && cellObj.status === "" 或 "0"
            'jmfy': ['', '0'].includes(cellObj.status) && !authStore.isNotANormalNurse,
        }
    })
    if (isHidden && !isEdit) {
        return (
            <Con color={cellObj.nameColor} />
        )
    }

    const symbols: any[] = (cellObj.addSymbols && cellObj.addSymbols) || []
    if (cellObj) {
        return (
            <React.Fragment>
                <Con color={cellObj.nameColor}>
                    {!['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) &&
                        symbols.map(symbol => <SymbolIcon symbol={symbol} />
                        )}
                    {sheetViewModal.countArrangeNameList.includes(cellObj.rangeName)
                        ? (cellObj.rangeName || "") + (cellObj.rangeNameCode || "")
                        : cellObj.rangeName}
                        {['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) &&
                            symbols.map(symbol => <SymbolIcon symbol={symbol} />
                            )}
                    {/* {['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) &&
                        <span style={{ color: symbol.symbolColor || "#333" }}>
                            {symbol.symbol || ""}
                        </span>
                    } */}
                </Con>
                {(cellObj.settings && cellObj.settings.length && (
                    <React.Fragment>
                        <span>/</span>
                        <Con
                            color={cellObj.settings.length && cellObj.settings[0].nameColor}
                        >
                            {cellObj.settings.length && cellObj.settings[0].rangeName}
                        </Con>
                    </React.Fragment>
                )) ||
                    ""}
                {/* 聊城二院 备注功能 */}
                {(cellObj.schRemarks && cellObj.schRemarks.length) ? (
                    <span>({cellObj.schRemarks[0].remark})</span>
                ) : ''}
                {(cellObj.schSpecial && cellObj.schSpecial.length) ? (
                    <span>({cellObj.schSpecial[0].typeName})</span>
                ) : ''}

            </React.Fragment>
        );
    }
    return "";
}

const Wrapper = styled.div<{ backgroundColor?: string }>`
  height: calc(100% + 2px);
  width: calc(100% + 6px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -1px -3px;
  position: relative;
  word-break: break-all;
  background: ${p => p.backgroundColor || ""} !important;

  &.isSelected {
    background: #ffe36c !important;
    cursor: pointer;
  }

  &.isReduceWordTime {
    cursor: pointer;
  }

  &.isAddWordTime {
    cursor: pointer;
  }

  &.isTwoDaysAgo {
    background: #f8f8f8;
    height: 100%;
    width: auto;
    margin: 0 -2px;
  }

  .sj {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-width: 10px 10px 0 0;
    border-style: solid;
    border-color: transparent transparent;

    &.add {
      border-color: #e55b00 transparent !important;
    }

    &.jijia {
      border-color: #e55b00 transparent !important;
    }

    &.reduce {
      border-color: #53c5ac transparent !important;
    }
  }

  .expect {
    position: absolute;
    top: 1px;
    left: 1px;
    height: 10px;
    width: 10px;
  }
`;
