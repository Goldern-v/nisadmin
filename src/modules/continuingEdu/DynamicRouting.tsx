import React, { useMemo, useState } from "react";
import { meunSettingApi } from "./views/menuSettings/api/MeunSettingApi";
import cloneDeep from 'lodash/cloneDeep'

export default function DynamicRouting() {

  // 查询获取动态菜单列表
  const [dataList, setDataList] = useState<any[]>([])
  const listLen = useMemo(() => dataList.length, [dataList])
  const getList = () => {
    meunSettingApi.getData().then((res: any) => {
      let newArr: any[] = [];
      if (res.data) {
        let arr = res.data || [];
        if (arr && arr.length) {
          arr.map((item: any, index: number) => {
            var obj1: any = {
              id: item.id,
              title: item.name,
              sort: item.sort,
              path: `/continuingEdu/${item.name}?Pid=${item.id}`,
            };
            if (item.childList && item.childList.length) {
              let Pid = item.id;
              let arr: any = [];
              item.childList.map((childItem: any, index: any) => {
                var obj2: any = {
                  parentsName: item.name,
                  id: childItem.id,
                  title: childItem.name,
                  path: `/continuingEdu/${Pid}/${childItem.id}?Pid=${Pid}&id=${childItem.id
                    }`,
                };
                arr.push(obj2);
                obj1.children = arr;
              });
            }
            newArr.push(obj1);
          });
          localStorage.setItem("continuDynamicRouter", JSON.stringify(cloneDeep(newArr)));
          console.log('test-newArr', [...newArr])
          setDataList(newArr)
        } else {
          setDataList([])
        }
        console.log('test-1', 1)
      }
    });
  };
  return { getList, dataList, listLen }
}

