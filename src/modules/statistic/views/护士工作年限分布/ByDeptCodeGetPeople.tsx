import styled from "styled-components";
import React, {useState, useEffect} from "react";
import {
    Modal,
    Button,
    Row,
    Col, Empty, Spin,
} from "antd";
import {ModalComponentProps} from "src/libs/createModal";
import Form from "src/components/Form";
import statisticsApi from "src/modules/statistic/api/StatisticsApi";

export interface Props extends ModalComponentProps {
}

interface InfoProps {
    dept: number
    workType: string
    onCancel: () => void
    visible: boolean
}

export default function ByDeptCodeGetPeople(props: InfoProps) {
    let {
        visible,
        onCancel,
        dept,
        workType
    } = props;
    const [data, setData] = useState([] as any)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if (visible) {
            setLoading(true)
            statisticsApi.countEntryDateDetail({
                deptCode: dept
            }).then((res: any) => {
                let newData: any = res.data.filter((item: any) => workType == item.workType)
                setData(newData || [])
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [visible])
    return (
        <Modal
            title={'人员信息'}
            closable={false}
            visible={visible}
            forceRender
            width={600}
            footer={<Button onClick={() => {
                onCancel()
            }}>关闭</Button>}
            centered>
            <Spin spinning={loading}>
                <Form>
                    {data.length > 0 ? data.map((item: any) => {
                        return (
                            <Row style={{marginTop: '20px'}}>
                                <Col span={8}>
                                    科室:{item.deptName}
                                </Col>
                                <Col span={8}>
                                    工号:{item.empNo}
                                </Col>
                                <Col span={8}>
                                    姓名:{item.empName}
                                </Col>
                            </Row>
                        )
                    }) : <Empty/>}
                </Form>
            </Spin>
        </Modal>
    );
}
const Wrapper = styled.div``;
