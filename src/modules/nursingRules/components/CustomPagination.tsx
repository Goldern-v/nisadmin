import React from 'react';
import styled from 'styled-components'
import { Pagination, Button, Input } from 'antd'

export interface Props {
  page: number,
  size: number,
  total: number,
  onChange: any,
  onShowSizeChange: any
}

export default function CustomPagination(props: Props) {
  const { total, size, page, onChange, onShowSizeChange } = props;
  const totalPage = () => {
    return Math.ceil(total / size)
  }

  const itemRender = (current: any, type: string, originalElement: any) => {
    if (type === 'prev')
      return <Button size="small" className="btn-prev" disabled={page <= 1}>上一页</Button>;

    if (type === 'next')
      return <Button size="small" className="btn-next" disabled={page >= totalPage()}>下一页</Button>;

    return originalElement;
  }

  const handleInputSizeChange = (e: any) => {
    let target = e.target;
    let newVal = target.value;
    newVal = parseInt(newVal, 10);

    if (newVal <= 0) {
      setTimeout(() => {
        target.value = size.toString();
      })
      return;
    }

    setTimeout(() => {
      target.value = newVal.toString();
    })

    if (newVal == size) return;

    onShowSizeChange(newVal);
  }

  const handleInputPageChange = (e: any) => {
    let target = e.target;
    let newVal = target.value;
    newVal = parseInt(newVal, 10);

    if (newVal <= 0 || newVal > totalPage()) {
      setTimeout(() => {
        target.value = page.toString();
      })
      return;
    }

    setTimeout(() => {
      target.value = newVal.toString();
    })

    if (newVal == page) return;

    onChange(newVal);
  }

  return <Wrapper className="custom-pagination">
    <div className="float-left">
      每页<Input defaultValue={size.toString()} size="small" onBlur={handleInputSizeChange} className="size-input" />条
    </div>
    <div className="float-right">
      <Button size="small" className="btn btn-first" disabled={page <= 1}>首页</Button>
      <span className="pagination-contain">
        <Pagination
          total={total}
          size="small"
          itemRender={itemRender}
          pageSize={size}
          current={page}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange} />
      </span>
      <Button size="small" className="btn btn-last" disabled={page >= totalPage()}>末页</Button>
      <Input defaultValue={page.toString()} size="small" onBlur={handleInputPageChange} className="page-input" />
      <Button onClick={e => onChange(page)} size="small" className="btn">确定</Button>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
overflow:hidden;
padding: 10px 15px;
padding-top: 0;
  .float-left{
    float: left;
    .size-input{
      margin: 0 2px;
      width: 50px;
      display: inline-block;
    }
  }
  .float-right{
    float: right;
    .btn-prev,.btn-first{
      margin-right: 5px;
    }
    .btn-next,.btn-last{
      margin-left: 5px;
    }
    .pagination-contain{
      display: inline-block;
      vertical-align: middle;
    }
    .btn{
      vertical-align: middle;

    }
    .page-input{
      margin: 0 8px;
      width: 50px;
      display: inline-block;
      vertical-align: middle;
    }
  }
`