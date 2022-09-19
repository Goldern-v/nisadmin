import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message,
  Icon,
  Checkbox,
  Spin,
  AutoComplete
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import { ScrollBox } from "src/components/common";
import { appStore } from "src/stores";
import { selectPeopleViewModel as selectPeopleViewModel_com } from "./SelectPeopleViewModel";
import { selectPeopleViewModel as selectPeopleViewModel_lcey } from "../../../../modal/SelectPeople/SelectPeopleViewModel_lcey";
import { observer } from "mobx-react-lite";
const { Search } = Input;
const Option = Select.Option;

import { CheckboxChangeEvent } from "antd/lib/checkbox/index";

import service from "src/services/api";
import classNames from "classnames";
import { toJS } from "src/vendors/mobx-react-lite";
import { CheckUserItem } from "src/modules/notice/page/SentNoticeView";

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (checkedUserList: CheckUserItem[]) => void;
  checkedUserList: CheckUserItem[];
}

const selectPeopleViewModel = (() => {
  switch (appStore.HOSPITAL_ID) {
    case 'lcey':
      return selectPeopleViewModel_lcey;
    default:
      return selectPeopleViewModel_com;
  }
})();

interface User {
  label?: string;
  key: string;
}
export default observer(function SelectPeopleModal(props: Props) {
  let { visible, onCancel, onOkCallBack, onClose } = props;

  const [checkedUserList, setCheckedUserList]: any = useState([]);
  const [searchUserList, setSearchUserList]: any = useState([]);
  const [searchWord, setSearchWord]: any = useState("");

  const inCheckedUser = (user: User) => {
    return !!checkedUserList.find((item: any) => item.key === user.key);
  };

  const insertUser = (user: User | User[]) => {
    if (user instanceof Array) {
      let data = [];
      for (let i = 0; i < user.length; i++) {
        if (!checkedUserList.find((item: any) => item.key === user[i].key))
          data.push(user[i]);
      }
      setCheckedUserList([...checkedUserList, ...data]);
    } else {
      let _user = checkedUserList?.find((item: any) => item.key === user.key);
      if (!_user) {
        setCheckedUserList([...checkedUserList, user]);
      }
    }
  };

  const deleteUser = (user: User | User[]) => {
    if (user instanceof Array) {
      for (let i = 0; i < user.length; i++) {
        let index = checkedUserList.findIndex(
          (item: any) => item.key === user[i].key
        );
        if (index > -1) {
          checkedUserList.splice(index, 1);
        }
      }
      setCheckedUserList([...checkedUserList]);
    } else {
      let index = checkedUserList.findIndex(
        (item: any) => item.key === user.key
      );
      if (index > -1) {
        checkedUserList.splice(index, 1);
        setCheckedUserList([...checkedUserList]);
      }
    }
  };

  const onSave = () => {
    onOkCallBack && onOkCallBack(checkedUserList);
    onClose();
  };
  const onDeselect = (key: any) => {
    deleteUser(key);
  };

  useLayoutEffect(() => {
    if (visible) {
      selectPeopleViewModel.initData();
      setCheckedUserList(props.checkedUserList);
      setSearchWord("");
    }
  }, [visible]);

  const handleSearch = (value: any) => {
    setSearchWord(value);
    value &&
      service.commonApiService.searchUser(value).then(res => {
        setSearchUserList(
          res.data.userList.map((item: any) => ({
            ...item,
            label: item.empName,
            key: item.empNo,
            value: item.empNo,
            text: item.empName,
            userList: [item]
          }))
        );
      });
  };

  const onSelect = (ev: any) => {
    let selectedUser = searchUserList.find((item: any) => item.key === ev);
    setCheckedUserList((prevList: any[]) => {
      let user = prevList.find((item: any) => item.key === ev);
      if (!user) {
        return [...prevList, selectedUser];
      } else {
        message.warning("已经添加过此分组或护士了");
        return [...prevList];
      }
    });
  };

  const onClean = () => {
    setCheckedUserList([]);
  };
  return (
    <Modal
      title="选择联系人"
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      forceRender
      width={800}
      footer={null}
      centered
    >
      <Wrapper>
        {/* {toJS(selectPeopleViewModel.stepState)}123 */}
        <div className="main-con">
          <div className="left-part scrollBox">
            <Spin spinning={selectPeopleViewModel.modalLoading}>
              {selectPeopleViewModel.currentTreeData ? (
                <ListCon>
                  <div
                    className="title"
                    onClick={() => selectPeopleViewModel.popStep()}
                  >
                    <Icon type="left" />
                    <span style={{ paddingLeft: 5 }}>
                      {selectPeopleViewModel.currentTreeData!.parent}
                    </span>
                  </div>
                  {/* {JSON.stringify(checkedUserList)} */}
                  <div className="scrollBox">
                    <CheckListCon
                      checkedUserList={checkedUserList}
                      setCheckedUserList={setCheckedUserList}
                      insertUser={insertUser}
                      deleteUser={deleteUser}
                      inCheckedUser={inCheckedUser}
                    />
                  </div>
                </ListCon>
              ) : (
                <div>
                  {selectPeopleViewModel.selectedBigDeptCode ? (
                    <div
                      className="title"
                      onClick={() => selectPeopleViewModel.popStep()}
                      style={{
                        color: "#333",
                        marginBottom: "10px",
                        marginLeft: "-3px",
                        cursor: "pointer"
                      }}
                    >
                      <Icon type="left" />
                      <span style={{ paddingLeft: 5 }}>
                        {selectPeopleViewModel.selectedBigDeptName}
                      </span>
                    </div>
                  ) : (
                    <AutoComplete
                      dataSource={searchUserList}
                      style={{ width: "100%" }}
                      onSelect={onSelect}
                      onSearch={handleSearch}
                      value={searchWord}
                    >
                      <Search placeholder="请输入搜索关键字" />
                    </AutoComplete>
                  )}

                  <FileList>
                    {selectPeopleViewModel.selectTreeData.map(
                      (item: any, index: any) => (
                        <div
                          className="item-box"
                          onClick={() =>
                            selectPeopleViewModel.pushStep(item.step)
                          }
                          key={index}
                        >
                          <img
                            src={require("../../../../images/文件夹.png")}
                            alt=""
                          />
                          <span>{item.label}</span>
                        </div>
                      )
                    )}
                  </FileList>
                </div>
              )}
            </Spin>
          </div>
          <div className="right-part">
            <SelectCon>
              <Select
                mode="tags"
                placeholder="..."
                value={checkedUserList}
                labelInValue={true}
                style={{ width: "100%" }}
                open={false}
                onDeselect={onDeselect}
              />
            </SelectCon>

            <div className="footer-con">
              <Button onClick={onClose}>取消</Button>
              <Button onClick={onClean}>重置</Button>
              <Button type="primary" onClick={onSave}>
                确认
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
});
const CheckListCon = observer(function (props: any) {
  let {
    checkedUserList,
    setCheckedUserList,
    insertUser,
    deleteUser,
    inCheckedUser
  } = props;
  let checkAll = false;
  let indeterminate = false;
  try {
    let allKeys = selectPeopleViewModel.currentTreeData!.list.map(
      (item: any) => {
        return item.key;
      }
    );
    let checkedLabels = checkedUserList.map((item: any) => item.key);

    checkAll = (() => {
      for (let i = 0; i < allKeys.length; i++) {
        if (checkedLabels.indexOf(allKeys[i]) == -1) return false;
      }
      return true;
    })();
    indeterminate = (() => {
      if (checkAll) return false;
      for (let i = 0; i < allKeys.length; i++) {
        if (checkedLabels.indexOf(allKeys[i]) > -1) return true;
      }
      return false;
    })();
  } catch (error) { }

  const onCheck = (e: CheckboxChangeEvent, item: any) => {
    if (e.target.checked) {
      insertUser(item);
    } else {
      deleteUser(item);
    }
  };
  const onCheckAll = (e: CheckboxChangeEvent) => {
    let users = selectPeopleViewModel.currentTreeData!.list;
    if (e.target.checked) {
      insertUser(users);
    } else {
      deleteUser(users);
    }
  };
  const Con = styled.div`
    .ant-checkbox-group {
      width: 100%;
    }
    .check-row {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
    }
    .open {
      display: inline-block;
      width: 38px;
      text-align: center;
      color: ${p => p.theme.$mtc};
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
      &.inChecked {
        color: #bfbfbf;
        pointer-events: none;
      }
    }
  `;

  return (
    <div>
      {appStore.HOSPITAL_ID === 'lcey' && (selectPeopleViewModel!.currentTreeData!.parent === '本院' || selectPeopleViewModel!.currentTreeData!.parent === '华美院区') ? (
        <FileList>
          {selectPeopleViewModel.currentTreeData!.list.map(
            (item: any, index: any) => (
              <div
                className="item-box"
                onClick={() =>
                  selectPeopleViewModel.pushStep(item.step)
                }
                key={index}
              >
                <img src={require("../../../../images/文件夹.png")} alt="" />
                <span>{item.label}</span>
              </div>
            )
          )}
        </FileList>
      ) :
        (<Con>
          <div className="check-row">
            <Checkbox
              checked={checkAll}
              indeterminate={indeterminate}
              onChange={e => onCheckAll(e)}
            >
              全选
            </Checkbox>
          </div>
          <Checkbox.Group
            value={checkedUserList && checkedUserList.map((item: any) => item.key)}
          >
            {selectPeopleViewModel.currentTreeData!.list.map(
              (item: any, index: number) => {
                return (
                  <div className="check-row" key={index}>
                    <Checkbox value={item.key} onChange={e => onCheck(e, item)}>
                      <span>{item.label} </span>
                      {(appStore.HOSPITAL_ID == 'lcey' && item.settingDataList?.length > 0) && item.settingDataList.map((items: any, indexs: number) => {
                        return (
                          <span key={indexs} style={{ color: items.nameColor, fontSize: '12px' }}>({items.rangeName})</span>
                        )
                      })}
                    </Checkbox>
                    {selectPeopleViewModel!.currentTreeData!.type !==
                      "userList" && (
                        <div style={{ minWidth: 54 }}>
                          <span style={{ padding: "0 4px" }}>|</span>
                          <span
                            className={classNames({
                              open: true,
                              inChecked: inCheckedUser(item)
                            })}
                            onClick={() =>
                              selectPeopleViewModel.pushStep(
                                item[
                                  selectPeopleViewModel!.currentTreeData!.stepLabel
                                ]||item[
                                    selectPeopleViewModel!.currentTreeData!.dataLabel]
                                , appStore.HOSPITAL_ID == 'lcey' ? (item.deptCode || item.level || item.title || item.job || item.year) : ''
                              )
                            }
                          >
                            展开
                          </span>
                        </div>
                      )}
                  </div>
                );
              }
            )}
          </Checkbox.Group>
        </Con>
        )}
    </div>
  );
});
const Wrapper = styled.div`
  margin: -24px;
  .main-con,
  .left-part,
  .right-part {
    height: 460px;
  }
  .main-con {
    display: flex;
  }
  .left-part {
    width: 350px;
    border-right: 1px solid #dddddd;
    padding: 15px 20px;
  }
  .right-part {
    width: 0;
    flex: 1;
    position: relative;
  }
  .ant-select-selection {
    min-height: 30px;
    padding: 8px 0;
    border: 0;
    outline: none;
    box-shadow: none !important;
  }

  .footer-con {
    position: absolute;
    right: 20px;
    bottom: 10px;
    button {
      margin-left: 15px;
    }
  }
`;

const SelectCon = styled(ScrollBox)`
  height: 400px;
`;

const FileList = styled.div`
  margin: 10px 0;
  .item-box {
    height: 20px;
    padding: 7px 7px;
    font-size: 14px;
    color: #333333;
    box-sizing: content-box;
    cursor: pointer;
    border-radius: 2px;
    &:hover {
      background: #eee;
    }
    img {
      width: 16px;
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
  }
`;

const ListCon = styled.div`
  .title {
    color: #333;
    margin-bottom: 10px;
    margin-left: -3px;
    cursor: pointer;
  }
  .scrollBox {
    height: 390px;
    box-sizing: content-box;
    padding-right: 10px;
    margin-right: -10px;
  }
`;
