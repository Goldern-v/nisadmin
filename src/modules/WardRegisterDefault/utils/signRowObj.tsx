import { globalModal } from "src/global/globalModal";
import { wardRegisterDefaultService } from "../services/WardRegisterDefaultService";
import { message } from "src/vendors/antd";
import { appStore, authStore } from 'src/stores'
import { DoCon } from "src/components/BaseTable";
import React from "react";
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
  // 点击权限
  const clickRule = (title.match('护士长') || ('yczyy' === appStore.HOSPITAL_ID && dataIndex === 'auditorName')) && !authStore.isRoleManage
  return {
    title,
    width,
    dataIndex,
    align: "center",
    render(text: string, record: any, index: number) {
      let signApi = wardRegisterDefaultService.saveAndSignAll.bind(
        wardRegisterDefaultService
      ) as any
      let cancelSignApi = wardRegisterDefaultService.cancelSign.bind(
        wardRegisterDefaultService
      );
      let signerNo = record.signerNo
      if (dataIndex == "auditorName") {
        signerNo = record.auditorNo
        signApi = wardRegisterDefaultService.auditAll.bind(wardRegisterDefaultService);
        cancelSignApi = wardRegisterDefaultService.cancelAudit.bind(
          wardRegisterDefaultService
        );
      }
      if (dataIndex == "checkerName") {
        signerNo = record.checkerNo
        signApi = wardRegisterDefaultService.checkAll.bind(wardRegisterDefaultService);
        cancelSignApi = wardRegisterDefaultService.cancelCheck.bind(
          wardRegisterDefaultService
        );
      }

      //新建行无法签名
      if (!record.id) return <span
        title="保存后可签名"
        style={{ color: '#999', cursor: 'not-allowed' }}>
        签名
      </span>

      /**出院患者登记本QCRG_08允许其他人签名已签名条目 */
      let isSigner = false
      let operator = authStore.user?.empNo
      if (operator && (signerNo || '').toLowerCase() == operator.toLowerCase()) isSigner = true

      if (
        text
      ) {
        return (
          <div
            className="sign-name"
            onClick={() => {
              if (clickRule) {
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
        )
      } else {
        return (
          <DoCon>
            <span
              onClick={() => {
                // console.log(dataIndex, authStore.isRoleManage)
                if (clickRule) {
                  message.error('非护士长无法签名')
                  return
                }

                globalModal
                  .confirm(`${aside}签名确认`, `你确定${aside}签名吗？`)
                  .then(res => {
                    //如果是sign类型
                    if (dataIndex === "signerName") {
                      signApi(
                        registerCode,
                        selectedBlockId,
                        [{
                          ...record,
                          signerName: authStore.user?.empName,
                          signerNo: authStore.user?.empNo
                        }],
                        true
                      )
                        .then(
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
              {text || '签名'}
            </span>
          </DoCon>
        )
      }
    }
  };
}
