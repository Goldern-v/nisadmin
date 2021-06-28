import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { nurseFilesListViewModel } from "../NurseFilesListViewModel";
import { observer } from "mobx-react-lite";
import { Button, Tag } from "antd";
import { theme } from "src/styles/theme";
import { CURRENTLEVEL_LIST, EDUCATION_LIST, POST_LIST, TITLE_LIST } from "src/modules/nurseFiles/view/nurseFiles-lcey/views/nurseFilesList/modal/AddNursingModal";

const FILTER_MAP: any = {
  最高学历: ["全部", ...EDUCATION_LIST],
  职称: ["全部", ...TITLE_LIST],
  层级: ["全部", ...CURRENTLEVEL_LIST],
  职务: ["全部", ...POST_LIST],
  科室属性: ["全部", "住院护理单元花名册", "门诊护理单元花名册"]
};

// type FilterMap = typeof FILTER_MAP;

const getFilterAdapter = (label: string) => {
  switch (label) {
    case "最高学历": {
      return nurseFilesListViewModel.filterXl;
    }
    case "职称": {
      return nurseFilesListViewModel.filterZc;
    }
    case "层级": {
      return nurseFilesListViewModel.filterCj;
    }
    case "职务": {
      return nurseFilesListViewModel.filterZw;
    }
    case "科室属性": {
      return nurseFilesListViewModel.filterKs;
    }
    default: {
      return "";
    }
  }
};

/** 设置筛选条件适配器 */
const setFilterAdapter = (label: string, value: string) => {
  switch (label) {
    case "最高学历":
      {
        nurseFilesListViewModel.filterXl = value;
      }
      break;
    case "职称":
      {
        nurseFilesListViewModel.filterZc = value;
      }
      break;
    case "层级":
      {
        nurseFilesListViewModel.filterCj = value;
      }
      break;
    case "职务":
      {
        nurseFilesListViewModel.filterZw = value;
      }
      break;
    case "科室属性":
      {
        nurseFilesListViewModel.filterKs = value;
      }
      break;
    default:
  }
};
export default observer(function FilterCon() {
  const open = nurseFilesListViewModel.isOpenFilter;
  const setOpen = (value: boolean) => {
    if (!value && nurseFilesListViewModel.pageSize < 20) {
      nurseFilesListViewModel.pageSize = 20;
      nurseFilesListViewModel.loadNursingList();
    }
    nurseFilesListViewModel.isOpenFilter = value;
  };
  const onClose = (e: any, item: any) => {
    e.preventDefault();
    setFilterAdapter(item, "全部");
  };
  return (
    <Wrapper>
      <Head>
        <div className="left">
          选择：
          {Object.keys(FILTER_MAP).map(
            (item: any) =>
              getFilterAdapter(item) &&
              getFilterAdapter(item) !== "全部" && (
                <Tag closable onClose={(e: any) => onClose(e, item)} key={item}>
                  {getFilterAdapter(item)}
                </Tag>
              )
          )}
        </div>
        <div className="right">
          <Button
            icon={open ? "down" : "left"}
            onClick={() => setOpen(!open)}
            size="small"
          >
            {open ? "隐藏" : "展开"}
          </Button>
        </div>
      </Head>
      <Inner open={open}>
        {Object.keys(FILTER_MAP).map((item, index) => {
          return (
            <FilterItem
              key={index}
              label={item}
              selected={getFilterAdapter(item)}
              options={FILTER_MAP[item]}
            />
          );
        })}
      </Inner>
    </Wrapper>
  );
});

const Wrapper = styled.div``;
const Inner = styled.div<{ open: boolean }>`
  background: rgba(255, 255, 255, 1);
  box-shadow: ${p => p.theme.$shadow};
  > div:last-child {
    border: 0;
  }
  /* transition: height 1s; */
  ${p =>
    !p.open &&
    `
      height: 0;
      overflow: hidden;
    `}
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  * {
    font-size: 12px;
  }
`;
interface FilterItemProps {
  label: string;
  selected: string;
  options: string[];
}

const FilterItem = (props: FilterItemProps) => {
  const ItemStyl = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px dashed #dbe0e4;
    padding: 0 17px;
    .label {
      color: #999;
      margin-right: 20px;
    }
  `;
  const Option = styled.div<{ active: boolean }>`
    margin-right: 30px;
    cursor: pointer;
    color: ${p => (p.active ? p.theme.$mtdc : "inherit")};
    font-weight: ${p => (p.active ? "bold" : "normal")};
  `;
  let { label, options, selected } = props;
  return (
    <ItemStyl>
      <div className="label">{label}：</div>
      {options.map((item, index) => (
        <Option
          className="option"
          active={item === selected}
          key={index}
          onClick={() => setFilterAdapter(label, item)}
        >
          {item}
        </Option>
      ))}
    </ItemStyl>
  );
};
