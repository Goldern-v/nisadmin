import { globalModal } from "src/global/globalModal";
import { wardRegisterService } from "../services/WardRegisterService";
import { message } from "src/vendors/antd";
import { authStore } from 'src/stores'
import { DoCon } from "src/components/BaseTable";
import React, { useState, useEffect } from "react";
export function signRowObj(obj: {
  title: string;
  width: number;
  dataIndex: string;
  aside: string;
  registerCode: string;
  updateDataSource: () => void;
  selectedBlockId: number;
  [p: string]: any
}) {
  let {
    title,
    width,
    dataIndex,
    aside,
    registerCode,
    updateDataSource,
    selectedBlockId
  } = obj;
  return {
    title,
    width,
    dataIndex,
    align: "center",
    render(text: string, record: any, index: number) {
      let signApi = wardRegisterService.saveAndSignAll.bind(
        wardRegisterService
      ) as any
      let cancelSignApi = wardRegisterService.cancelSign.bind(
        wardRegisterService
      );
      if (dataIndex == "auditorName") {
        signApi = wardRegisterService.auditAll.bind(wardRegisterService);
        cancelSignApi = wardRegisterService.cancelAudit.bind(
          wardRegisterService
        );
      }

      //新建行无法签名
      if (!record.id) return <span
        title="保存后可签名"
        style={{ color: '#999', cursor: 'not-allowed' }}>
        签名
      </span>

      return text ? (
        <div
          className="sign-name"
          onClick={() => {
            if (title.match('护士长') && !authStore.isRoleManage) {
              message.error('非护士长无法取消签名')
              return
            }

            globalModal
              .confirm(`${aside}签名取消`, `你确定取消${aside}签名吗？`)
              .then(res => {
                cancelSignApi(registerCode, [{ id: record.id }]).then(res => {
                  message.success(`取消${aside}签名成功`);
                  Object.assign(record, res.data.list[0]);
                  updateDataSource();
                });
              });
          }}
        >
          {text}
        </div>
      ) : (
          <DoCon>
            <span
              onClick={() => {
                // console.log(dataIndex, authStore.isRoleManage)
                if (title.match('护士长') && !authStore.isRoleManage) {
                  message.error('非护士长无法签名')
                  return
                }

                globalModal
                  .confirm(`${aside}签名确认`, `你确定${aside}签名吗？`)
                  .then(res => {
                    //如果是sign类型
                    if (dataIndex !== "auditorName") {
                      signApi(registerCode, selectedBlockId, [record], true).then(
                        (res: any) => {
                          message.success(`${aside}签名成功`);
                          Object.assign(record, { ...res.data.itemDataList[0], modified: false });
                          updateDataSource()
                        })
                    } else {
                      signApi(registerCode, [{ id: record.id }]).then(
                        (res: any) => {
                          message.success(`${aside}签名成功`);
                          Object.assign(record, res.data.list[0]);
                          updateDataSource()
                        })
                    }
                    //如果是audit类型
                  });
              }}
            >
              签名
          </span>
          </DoCon>
        );
    }
  };
}
