import { wardRegisterService } from "../../services/WardRegisterService";
import { authStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { message } from "src/vendors/antd";
import moment from "moment";

export interface ItemConfigItem {
  blockId: number;
  checkSize: number | null;
  createTime?: string;
  creatorName?: string;
  creatorNo?: string;
  indexNo?: number;
  itemCode: string;
  options: string;
  updateTime?: string;
  updaterName?: string;
  updaterNo?: string;
  width: number;
  colSpan?: number;
  label?: string;
  children?: ItemConfigItem[];
}

export function getFun(context: any) {
  const {
    registerCode,
    registerName,
    setBlockList,
    setSelectedBlockId,
    setPageOptions,
    pageOptions,
    setTotal,
    setDataSource,
    setItemConfigList,
    setRangeConfigList,
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    paramMap
  } = context;
  const onInitData = async () => {
    // setPageLoading(true);
    await wardRegisterService
      .qcRegisterBlockGetList(registerCode, authStore.selectedDeptCode)
      .then(async res => {
        setBlockList(res.data);
        if (res.data[res.data.length - 1]) {
          let blockId = (res.data[res.data.length - 1] as any)!.id;
          let lastPageIndex = await getLastPageIndex(blockId);
          setSelectedBlockId(blockId);
          setPageOptions({
            ...pageOptions,
            pageIndex: lastPageIndex
          });
        } else {
          setSelectedBlockId(null);
          setTotal(0);
          setDataSource([]);
          setItemConfigList([]);
          setRangeConfigList([]);
        }
      });
  };

  const getLastPageIndex = async (blockId: any) => {
    return await wardRegisterService
      .getPage(registerCode, {
        blockId: blockId,
        ...pageOptions
      })
      .then(res => res.data.itemDataPage.totalPage);
  };

  /** 表头合并 */
  const thMerge = (list: ItemConfigItem[]) => {
    return list.reduce(
      (total: ItemConfigItem[], current: ItemConfigItem, index: number) => {
        if (current.itemCode.includes("：")) {
          let pTitle = current.itemCode.split("：")[0];
          let cTitle = current.itemCode.split("：")[1];
          current.label = cTitle;
          let pthObj: any = total.find(item => item.itemCode == pTitle);
          if (!pthObj) {
            pthObj = {
              itemCode: pTitle,
              children: [current],
              colSpan: 1,
              width: current.width
            };
            total.push(pthObj);
          } else {
            pthObj.children.push(current);
            pthObj.colSpan += 1;
            current.colSpan = 0;
            total.push(current);
          }
        } else {
          total.push(current);
        }
        return total;
      },
      []
    );
  };

  const getPage = () => {
    setPageLoading(true);
    wardRegisterService
      .getPage(registerCode, {
        startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
        endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
        range: paramMap["班次"],
        blockId: selectedBlockId,
        paramMap,
        ...pageOptions
      })
      .then(res => {
        console.log(
          thMerge(res.data.itemConfigList),
          "thMerge(res.data.itemConfigList)"
        );
        console.log(res, "res");
        setTotal(res.data.itemDataPage.totalCount);
        setDataSource(res.data.itemDataPage.list);
        setItemConfigList(thMerge(res.data.itemConfigList));
        setRangeConfigList(res.data.rangeConfigList);
        setPageLoading(false);
        if (res.data.itemDataPage.list.length == 0) {
          createRow();
        }
      });
  };

  const onAddBlock = () => {
    globalModal
      .confirm(
        `是否新建${registerName}`,
        `新建${registerName}开始日期为${moment().format(
          "YYYY-MM-DD"
        )}，历史${registerName}请切换修订版本查看`
      )
      .then(res => {
        wardRegisterService
          .qcRegisterBlockCreate(registerCode, authStore.selectedDeptCode)
          .then(res => {
            message.success("创建成功");
            onInitData();
          });
      });
  };

  const onSave = () => {
    wardRegisterService
      .saveAndSignAll(registerCode, selectedBlockId, dataSource, false)
      .then(res => {
        message.success("保存成功");
        getPage();
      });
  };

  const onDelete = () => {
    globalModal.confirm("删除确认", "确定要删除此修订版本吗？").then(res => {
      wardRegisterService
        .qcRegisterBlockDelete(registerCode, selectedBlockId)
        .then(res => {
          message.success("保存成功");
          onInitData();
        });
    });
  };

  const createRow = () => {
    setDataSource([
      ...dataSource,
      { recordDate: moment().format("YYYY-MM-DD") }
    ]);
  };
  return {
    onInitData,
    getPage,
    onAddBlock,
    onSave,
    onDelete,
    createRow
  };
}
