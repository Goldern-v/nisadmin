import styled from "styled-components";
import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import BaseTable  from "src/components/BaseTable";
import {
    ColumnProps,
    message, Modal,
} from "src/vendors/antd";
import {observer} from "mobx-react-lite";
import {PageHeader} from "src/components/common";
import createModal from "src/libs/createModal";
import moment from "moment";
import {throttle} from "src/utils/throttle/throttle";
import {codeAdapter} from "src/modules/WardRegisterDefault/utils/codeAdapter";
import {TableCon, Wrapper} from "src/modules/WardRegisterDefault/utils/style/style";
import {getFun, ItemConfigItem} from "src/modules/WardRegisterDefault/utils/fun/fun";
import classNames from "classnames";
import {getFileType} from 'src/utils/file/file'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from 'src/modules/WardRegisterDefault/components/Render.v1/FileUploadColumnRender'
import DatePickerColumnRender from 'src/modules/WardRegisterDefault/components/Render.v1/DatePickerColumnRender'
import InputColumnRender from 'src/modules/WardRegisterDefault/components/Render.v1/InputColumnRender'
import InputRender from 'src/modules/WardRegisterDefault/components/Render.v1/InputRender'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import {Button} from "antd";
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
import TemplateSingModal from 'src/modules/continuingEdu/components/SingModal'
import DeptSelect from "src/components/DeptSelect";

export interface Props {
    payload: any;
}

const throttler2 = throttle();
export default observer(function Template2(props: Props) {
    const registerCode = props.payload && props.payload.registerCode;
    const [dataSource, setDataSource]: any = useState([{}]);
    const [surplusHeight, setSurplusHeight]: any = useState(220);
    const [pageLoading,setPageLoading]=useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
    const [signValue, setSignValue] = useState('')
    const previewModal = createModal(PreviewModal)
    const templateSingModal = createModal(TemplateSingModal)
    const updateDataSource = (isAll?: boolean) => {
        if (isAll) {
            setDataSource([]);
            setDataSource([...dataSource]);
        } else {
            throttler2(() => {
                setDataSource([...dataSource]);
            });
        }
    };
    /** 判断是否快过期 */
    const isEndTime = (record: any) => {
        let current = ''
        let endTime = ''
        let itemCode = '有效期'

        if (
            registerCode == "QCRG_14_1"
            || registerCode == 'QCRG_21'
        ) {
            itemCode = '失效日期'
        }

        endTime = record[itemCode] || ''
        current = moment().format('YYYY-MM-DD')

        var currentDate = moment(current);
        var endTimeDate = moment(endTime);
        if (
            currentDate.isValid() &&
            endTimeDate.isValid() &&
            current && endTime
        ) {
            let m = endTimeDate.diff(currentDate, "d");
            if (m <= 90) return "color-red";
            // if (m < 3) return "color-orange";
        }
        return "";
    };


    const columns: ColumnProps<any>[] | any = [
        {
            title: "序号",
            dataIndex: 'index',
            width: 50,
            align: 'center',
            render: (text: string, record: any, index: number) => <span>{index + 1}</span>
        },
        //后端返回的自定义项目
        ...(handbookModel.formItems || []).map((item: any, index: number) => {
            item['itemCode'] = item.title
            return {
                title: item.children ? (
                    <PTitleTh>
                        <MergeTitle>
                            <pre>{item.pTitle || item.itemCode}</pre>
                        </MergeTitle>
                        <PTitleCon>
                            {item.children.map(
                                (cItem: ItemConfigItem, index: number, arr: any) => (
                                    <CTitleBox
                                        key={index}
                                        style={{
                                            ...{flex: (15 * cItem.width || 50) + 8, width: 0},
                                            ...(index == arr.length - 1 ? {border: 0} : {})
                                        }}
                                    >
                                        {cItem.checkSize ? (
                                            <ThBox>
                                                <div className="title">
                          <span className="title-text">
                            <pre>
                              {cItem.label || cItem.itemCode}
                            </pre>
                          </span>
                                                </div>
                                                <div className="aside">{cItem.checkSize}</div>
                                            </ThBox>
                                        ) : (
                                            <span className="title-text">
                        <pre>
                          {cItem.label || cItem.itemCode}
                        </pre>
                      </span>
                                        )}
                                    </CTitleBox>
                                )
                            )}
                        </PTitleCon>
                    </PTitleTh>
                ) : item.checkSize ? (
                    () => (
                        <ThBox>
                            <div className="title"><span className="title-text">
                <pre>
                  {item.itemCode}
                </pre>
              </span>
                            </div>
                            <div className="aside">{item.checkSize}</div>
                        </ThBox>
                    )
                ) : (
                    <pre>
            {item.label || item.itemCode}
          </pre>),
                align: "center",
                className:item.nullUse && "required-cell",
                colSpan: item.colSpan,
                width: (15 * item.width || 50) + 8,
                dataIndex: item.itemCode,
                render(text: string, record: any, index: number) {
                    let children: JSX.Element
                    let childrenClassName = classNames({
                        "warning-value": text == "未完成",
                        "checkSize-warning":
                            item.checkSize && (text != item.checkSize && text != "√")
                    })

                    childrenClassName +=
                        ` ${codeAdapter({
                            other: isEndTime(record)
                        }, registerCode)}`

                    if (item.type == 'date' || item.type == 'date_time' || item.type == 'time') {
                        /*不是默认开启不允许有默认值*/
                        // if(item.itemCode =='日期(年月)'){
                        //     console.log("record[item.itemCode]",item.itemCode,record,record[item.itemCode]);
                        // }
                        record[item.itemCode] = record[item.itemCode] || (item.defaultUse ? item.defaultValue:undefined)
                        let format = 'YYYY-MM-DD'
                        if (item.type == 'date_time') format = 'YYYY-MM'
                        if (item.type == 'time') format = 'YYYY-MM-DD HH:mm';
                        children = <DatePickerColumnRender
                            {...{
                                className: childrenClassName,
                                cellDisabled,
                                record,
                                itemCfg: item,
                                index,
                                showTime: item.type == 'date_time' || item.type == 'time',
                                format,
                                handleNextIptFocus,
                                updateDataSource,
                                registerCode,
                            }}
                        />
                    }else if(item.type == 'studyDept'){
                        children = <DeptSelect
                                    deptCode={record[item.itemCode]}
                                    onChange={(e:any)=>{
                                        record[item.itemCode] =e
                                        updateDataSource()
                                    }}
                        />
                    } else if (item.type == "attachment") {
                        //处理上传附件类型
                        children = <FileUploadColumnRender
                            {...{
                                className: childrenClassName,
                                record,
                                itemCfg: item,
                                index,
                                cellDisabled,
                                handleUpload,
                                handlePreview,
                                updateDataSource
                            }} />

                    } else if (item.type == "text") {
                        children = <InputRender
                            {...{
                                cellDisabled,
                                record,
                                className: childrenClassName,
                                itemCode: item.itemCode,
                                updateDataSource,
                                handleNextIptFocus,
                            }}
                        />
                    } else if (item.type == 'sign') {
                        children = <span
                            onClick={() => handleSign(record, item.itemCode)}>{record[item.itemCode] || '签名'}</span>
                    } else {
                        children = <InputColumnRender
                            {...{
                                cellDisabled,
                                options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
                                record,
                                className: childrenClassName,
                                itemCode: item.itemCode,
                                updateDataSource,
                                handleNextIptFocus,
                                multiple: item.type == "multiple_select",
                                selectAll: item.type == "multiple_select",
                            }}
                        />
                    }

                    let obj = {children}

                    return obj
                }
            };
        }),
    ];

    const handlePreview = (file: any) => {
        if (getFileType(file.name) == 'img') {
            reactZmage.browsing({src: file.path, backdrop: 'rgba(0,0,0, .8)'})
        } else {
            previewModal.show({
                title: file.name,
                path: file.path
            })
        }
    }


    const handleSelectedChange = (payload: any[]) => {
        setSelectedRowKeys(payload)
    }

    useEffect(() => {
        let list = handbookModel?.dataSource
        setDataSource([...list])
    }, [handbookModel?.dataSource])
    /** 公共函数 */
    const {cellDisabled, handleNextIptFocus, handleUpload} = getFun({ setPageLoading,dataSource, setDataSource});

    const pageHeaderRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        let tableHead: any = document.querySelector(".ant-table-thead");
        if (tableHead && pageHeaderRef?.current) {
            setSurplusHeight(tableHead.offsetHeight + 140 + pageHeaderRef.current?.offsetHeight);
        }
    });
    const handleSign = (record: any, itemCode: string) => {
        if (record[itemCode]) {
            Modal.confirm({
                title: '提示',
                content: '是否清除签名？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk:async () => {
                    record[itemCode] = '';
                    updateDataSource()
                    handleSave()
                }
            })
            return false
        }else{
            templateSingModal.show({
                handleOk: (value: any) => {
                    record.modified = true
                    record[itemCode] = value.empNo;
                    /**需要记录起来，下次签名直接使用**/
                    updateDataSource()
                }
            })
        }
        // if (!signValue) {
        //
        // } else {
        //     record[itemCode] = signValue;
        //     updateDataSource()
        // }

    }
    const handleSave = () => {
        const {
            id: catalogId,
            masterId,
            templateId,
            templateType
        } = handbookModel.curCatalogue
        /*需要验证必填*/
        let reslut:boolean =false
        handbookModel.formItems.map((item:any)=>{
            if(item.nullUse){
                dataSource.map((i:any)=>{
                    if(!i[item.title]){
                        // console.log(item.title,i,i[item.title]);
                     reslut =true
                 }
                })
            }
        })
        if(reslut){ return message.info('请检查必填项内容') }
        handbookModel.tableLoading = true
        trainingSettingApi.saveOrUpdateItemData({
            catalogId,
            masterId,
            templateId,
            templateType,
            itemDataStr: JSON.stringify(dataSource)
        }).then((res) => {
            message.success('保存成功')
            // 重新请求详情数据
            handbookModel.getCatalogueData()
        }).finally(()=>{
            handbookModel.tableLoading = false
        })
    }
    const handleAdd = () => {
        handbookModel.tableLoading = true
        setDataSource([...dataSource, {}])
        setTimeout(() => {
            handbookModel.tableLoading = false
        }, 500)
    }
    const handleDelete = () => {
        if (selectedRowKeys.length <= 0) {
            message.warn('未勾选项目')
            return
        } else {
            handbookModel.tableLoading = true
            let list = dataSource.filter((item: any) => !selectedRowKeys.includes(item.key))
            setDataSource([...list])
            setSelectedRowKeys && setSelectedRowKeys([])
            handbookModel.tableLoading = false
        }
    }
    const title =()=>{
        return(
            <div style={{display:"flex",justifyContent:'space-between'}}>
                <div>
                    <Button type='primary' onClick={handleAdd}>添加一行</Button>
                    <Button type='danger' onClick={handleDelete}>删除所选行</Button>
                </div>
                <Button type='primary' disabled={ !(dataSource.length > 0) } onClick={handleSave}>保存</Button>
            </div>
        )
    }
    return (
        <Container>
            <TableCon
                className='whyxTable'>

                <BaseTable
                    title={title}
                    className="record-page-table"
                    loading={handbookModel?.tableLoading}
                    dataSource={dataSource}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: handleSelectedChange,
                    }}
                    columns={columns.filter((item: any) => item)}
                    surplusHeight={surplusHeight}
                    surplusWidth={300}
                    rowClassName={(record: any, idx: number) => {
                        if (cellDisabled(record)) return 'disabled-row'

                        return ''
                    }}
                />
            </TableCon>
            <templateSingModal.Component/>
        </Container>
    );
});

// @ts-ignore
const Container = styled(Wrapper)`
  .required-cell{
    .ant-table-column-title :before{
      content: '*';
      color: red;
    }
  }
  .ant-select-disabled .ant-select-selection {
    background: rgba(0, 0, 0, 0.0) !important;
  }

  .disabled-row {
    td.input-cell {
      background: rgba(0, 0, 0, 0.03) !important;
    }

    .ant-input[disabled] {
      color: #000 !important;
      background: rgba(0, 0, 0, 0.0) !important;
    }
  }

  .ant-input[disabled] {
    color: #000 !important;
    background: rgba(0, 0, 0, 0.03) !important;
  }

  .color-red,
  .color-red *,
  .disabled-row .color-red[disabled],
  .disabled-row .color-red *[disabled] {
    color: red !important;
  }

  .color-orange,
  .color-orange *,
  .disabled-row .color-orange[disabled],
  .disabled-row .color-orange *[disabled] {
    color: orange !important;
  }

  #baseTable .footer-page-table .ant-table-body {
    overflow-y: auto !important;
  }

  .ant-table-footer {
    padding: 0 !important;

    .footer-page-table td {
      color: #00A680;
      /* padding: 0; */

    }
  }

`;
const NewPageHeader = styled(PageHeader)`
  height: auto;
  min-height: 50px;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-top: 5px;

  .ant-btn {
    margin-bottom: 5px;
  }`;

const ThBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 4px;
    display: flex;
  }

  .aside {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #e8e8e8;
    font-weight: normal;
  }
`;

const PTitleTh = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PTitleCon = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;

  .title-text {
    display: block;
    padding: 4px 0;
  }
`;
const CTitleBox = styled.div`
  flex: 1;
  border-right: 1px solid #e8e8e8;
  box-sizing: content-box;
  /* padding: 4px 0; */
`;

const MergeTitle = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid #e8e8e8;
`;
