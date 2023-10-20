import styled from "styled-components";
import React, {useState, useEffect} from "react";
import {
    Modal,
    Button,
    Row,
    Col,
} from "antd";
import {ModalComponentProps} from "src/libs/createModal";
import Form from "src/components/Form";
import statisticsApi from "src/modules/statistic/api/StatisticsApi";

export interface Props extends ModalComponentProps {
}

interface InfoProps {
    deptCode: any;
    onCancel: () => void
    visible: boolean
}

export default function ByDeptCodeGetPeople(props: InfoProps) {
    let {
        visible,
        onCancel,
        deptCode,
    } = props;
    const [data, setData] = useState([] as any)
    useEffect(() => {
        if (visible) {
            statisticsApi.countEntryDateDetail({
                deptCode
            }).then((res: any) => {
                setData(res.data || [])
            })
        }
    }, [deptCode])
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
            <Form>
                {data.map((item: any) => {
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
                })}
            </Form>
        </Modal>
    );
}
const Wrapper = styled.div``;
