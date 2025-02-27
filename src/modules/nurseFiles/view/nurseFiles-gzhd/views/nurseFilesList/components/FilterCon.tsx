import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { nurseFilesListViewModel } from "../NurseFilesListViewModel";
import { observer } from "mobx-react-lite";
import { Button, Tag } from "antd";
import { theme } from "src/styles/theme";
import { nurseFilesService } from "../../../services/NurseFilesService";

const FILTER_MAP: any = {
  学历: ["全部", "中专", "大专", "本科", "研究生", "博士"],
  职称: [
    "全部",
    "见习期护士",
    "护士",
    "护师",
    "主管护师",
    "副主任护师",
    "主任护师"
  ],
  层级: ["全部", "N0", "N1", "N2", "N3", "N4", "N5", "N6"],
  工作年限:["全部","<1年资护士","1≤y<2年资护士","2≤y<5年资护士","5≤y<10年资护士", "10≤y<20年资护士","≥20年资护士"],
  职务: [
    "全部",
    "无",
    '护士',
    "教学小组组长",
    "教学秘书",
    "护理组长",
    "副护士长",
    "护士长",
    "科护士长",
    "护理部副主任",
    "护理部主任"
  ],
  科室属性: ["全部", "住院护理单元花名册", "门诊护理单元花名册"],
  护理岗位:nurseFilesListViewModel.nursePostList,
};

type FilterMap = typeof FILTER_MAP;

const getFilterAdapter = (label: string) => {
  switch (label) {
    case "学历": {
      return nurseFilesListViewModel.filterXl;
    }
    case "职称": {
      return nurseFilesListViewModel.filterZc;
    }
    case "层级": {
      return nurseFilesListViewModel.filterCj;
    }
    case "工作年限": {
      return nurseFilesListViewModel.filterWyears;
    }
    case "职务": {
      return nurseFilesListViewModel.filterZw;
    }
		case "护理岗位": {
      return nurseFilesListViewModel.filterHLGW;
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
    case "学历":
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
      case "工作年限":
        switch (value) {
          case '<1年资护士':
            {nurseFilesListViewModel.filterWyears = '<1年资护士'
						nurseFilesListViewModel.filterWyearsCode = "1"}
            break;
          case '1≤y<2年资护士':
            {nurseFilesListViewModel.filterWyears = '1≤y<2年资护士'
						nurseFilesListViewModel.filterWyearsCode = "2"}
            break;
					case '2≤y<5年资护士':
						{nurseFilesListViewModel.filterWyears = '2≤y<5年资护士'
						nurseFilesListViewModel.filterWyearsCode = "3"}
						break;
					case '5≤y<10年资护士':
						{nurseFilesListViewModel.filterWyears = '5≤y<10年资护士'
						nurseFilesListViewModel.filterWyearsCode = "4"}
						break;
					case '10≤y<20年资护士':
						{nurseFilesListViewModel.filterWyears ='10≤y<20年资护士'
						nurseFilesListViewModel.filterWyearsCode = "5"}
						break;
					case '≥20年资护士':
						{nurseFilesListViewModel.filterWyears = '≥20年资护士'
						nurseFilesListViewModel.filterWyearsCode = "6"}
						break;
          default:
						{nurseFilesListViewModel.filterWyears = '全部'
						nurseFilesListViewModel.filterWyearsCode = ''}
            break;
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
    case "护理岗位":
    {
      nurseFilesListViewModel.filterHLGW = value;
    }
      break;
      break;
    default:
  }
};
export default observer(function FilterCon() {
	const [nowkey, setNowkey] = useState(1);
	useEffect(() => {
			// console.log('护理岗位')
			setTimeout(() => {
				FILTER_MAP['护理岗位'] = nurseFilesListViewModel.nursePostList
				setNowkey(Date.now())
			}, 100);
	}, [nurseFilesListViewModel.nursePostList])
	
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
            <FilterItem nowtime={nowkey}
              filterKey={index}
              label={item}
              key={index}
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
	nowtime:number;
  filterKey:number,
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
    &:last-child{
      min-height: 36px;
      height: auto;
      .label,.option{
        float: left;
      }
    }
    .last-option{
      overflow: hidden;
    }
  `;
  const Option = styled.div<{ active: boolean }>`
    margin-right: 30px;
    cursor: pointer;
    color: ${p => (p.active ? p.theme.$mtdc : "inherit")};
    font-weight: ${p => (p.active ? "bold" : "normal")};
  `;
  let { label, options, selected,nowtime,filterKey } = props;
  return (
    <ItemStyl>
      {
        filterKey<(Object.keys(FILTER_MAP).length-1)?
        <>
        <div className="label" data-no={nowtime}>{label}：</div>
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
        </> :<>
        <div className="label" data-no={nowtime}>{label}：</div>
        <div className="last-option">
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
        </div>
          
        </>
      }
      
      
    </ItemStyl>
  );
};
