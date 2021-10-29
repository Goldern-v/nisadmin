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
import { authStore, appStore } from "src/stores";
import { selectPeopleViewModel as selectPeopleViewModel_lcey } from "./SelectPeopleViewModel_lcey"
import { selectPeopleViewModel as selectPeopleViewModel_com } from "./SelectPeopleViewModel"
import { observer } from "mobx-react-lite";
const { Search } = Input;
const Option = Select.Option;

import { CheckboxChangeEvent } from "antd/lib/checkbox/index";

import service from "src/services/api";
import classNames from "classnames";
import { toJS } from "src/vendors/mobx-react-lite";
import { stepViewModal } from "../stepComponent/StepViewModal";
import GroupsSettingModal from './modal/GroupsSettingModal'
import { stepServices } from "../stepComponent/services/stepServices";

const selectPeopleViewModel = (() => {
  switch (appStore.HOSPITAL_ID) {
    case 'lcey':
      return selectPeopleViewModel_lcey;
    default:
      return selectPeopleViewModel_com;
  }
})();

export interface Props {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (checkedUserList: any[]) => void;
  checkedUserList: any[];
}

interface User {
  label?: string;
  key: string;
}

export default observer(function SelectPeople(props: Props) {
  let { onOkCallBack } = props;
  const [initEd, setInitEd]: any = useState(false);
  const [checkedUserList, setCheckedUserList]: any = useState([]);
  const [searchUserList, setSearchUserList]: any = useState([]);
  const [searchWord, setSearchWord]: any = useState("");
  const [allPeople, setAllPeople]: any = useState(0);
  const [editVisible, setEditVisible] = useState(false); // 小组设置弹窗状态
  const [groupId, setGroupId] = useState('');// 小组id

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
      setNumber(user, 1);
      setCheckedUserList([...checkedUserList, ...data]);
    } else {
      let _user = checkedUserList.find((item: any) => item.key === user.key);
      if (!_user) {
        setNumber(user, 1);
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
      setNumber(user, 2);
      setCheckedUserList([...checkedUserList]);
    } else {
      let index = checkedUserList.findIndex(
        (item: any) => item.key === user.key
      );
      if (index > -1) {
        checkedUserList.splice(index, 1);
        setNumber(user, 2);
        setCheckedUserList([...checkedUserList]);
      }
    }
  };

  // const addAll = (checkedUserList: any) => {
  //   let num1 = 0;
  //   let num2 = 0;
  //   let num = 0;
  //   checkedUserList.map((item: any) => {
  //     if (typeof item == "object") {
  //       if (item.label.indexOf("（") != -1) {
  //         num1++;
  //         let str1: any = item.label.indexOf("（");
  //         let str2: any = item.label.indexOf("）");
  //         num2 = Number(item.label.substring(str1 + 1, str2));
  //       } else {
  //         num2 = 0;
  //       }
  //       num += num2;
  //     } else {
  //       num = +1;
  //     }
  //   });
  //   return checkedUserList.length + num - num1;
  // };

  // 总人数统计
  const setNumber = (data: any, type: any) => {
    let number = 0;
    if (data instanceof Array) {
      data.map((item: any) => {
        number += item.userList ? item.userList.length : 0;
      });
    } else {
      number += data.userList ? data.userList.length : 0;
    }
    let value = type === 1 ? number + allPeople : allPeople - number;
    setAllPeople(value);
  };

  const onSave = () => {
    onOkCallBack && onOkCallBack(checkedUserList);
  };
  const onDeselect = (key: any) => {
    let _user = checkedUserList.find((item: any) => item.key === key.key);
    deleteUser(_user);
  };

  useLayoutEffect(() => {
    selectPeopleViewModel.initData();
    setCheckedUserList(props.checkedUserList);
    setNumber(props.checkedUserList, 1);
    setSearchWord("");
    setInitEd(true);
    getGroups();
  }, [props.checkedUserList]);

  useEffect(() => {
    if (initEd) {
      stepViewModal.stepData3.participantList = checkedUserList;
    }
  }, [checkedUserList]);

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
    setAllPeople(0);
  };

  /**南医三小组设置 */
  // 获取全部小组
  const getGroups = () => {
    stepServices.getMyGroups().then((res: any) => {
      selectPeopleViewModel.groupsList = res.data || []
    })
  }

  // 南医三小组弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
    setGroupId('');
  };
  const handleEditOk = () => {
    getGroups();
    handleEditCancel();
  };

  // 新建小组
  const handleGroupSetting = () => {
    if (!stepViewModal.stepData3.participantList.length) {
      message.warning('新建小组前请选择你想加入该小组的成员！');
      return;
    }
    setEditVisible(true);
  }

  // 删除小组
  const deleteGroup = (e: any, id: any) => {
    e.stopPropagation();
    let content = (
      <div>
        <div>您确定要删除选中的小组吗？</div>
        <div>删除后将无法恢复。</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        stepServices
          .deleteGroup(id)
          .then(res => {
            if (res.code == 200) {
              message.success("小组删除成功");
              getGroups();
            } else message.error("小组删除失败");
          })
          .catch(err => {
            message.error("文件删除失败");
          });
      }
    });
  }
  console.log(selectPeopleViewModel.currentTreeData, 113)
  console.log(selectPeopleViewModel.selectedBigDeptCode, 7777)

  return (
    <Wrapper>
      {/* {stepViewModal.stepData3.participantList.length} */}
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
                        <img src={require("../../images/文件夹.png")} alt="" />
                        <span>{item.label}</span>
                      </div>
                    )
                  )}
                  {appStore.HOSPITAL_ID == 'nys' && selectPeopleViewModel.groupsList.map(
                    (item: any, index: any) => (
                      <div
                        className="item-box"
                        onClick={() =>
                          selectPeopleViewModel.pushStep(item.groupName, item.id)
                        }
                        key={index}
                      >
                        <div id='groups'>
                          <img src={require("../../images/文件夹.png")} alt="" />
                          <span>{item.groupName}</span>
                          <span

                            className='button settingBtn'
                            onClick={(e) => {
                              e.stopPropagation();
                              setGroupId(item.id);
                              handleGroupSetting()
                            }}
                          >
                            设置
                          </span>
                          <span
                            className='button deleteBtn'
                            onClick={(e) => deleteGroup(e, item.id)}
                          >
                            删除
                          </span>
                        </div>
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
        </div>
      </div>
      <div className="footer-con">
        <span>共选择 {allPeople} 人</span>
        <Button onClick={onClean}>重置</Button>
        {appStore.HOSPITAL_ID == 'nys' && <Button onClick={handleGroupSetting} type='primary'>新建小组</Button>}
      </div>
      <GroupsSettingModal
        visible={editVisible}
        id={groupId}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
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
  console.log(selectPeopleViewModel.currentTreeData, 'sssssssssss')

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
                <img src={require("../../images/文件夹.png")} alt="" />
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

          <Checkbox.Group value={checkedUserList.map((item: any) => item.key)}>
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
                                ]
                                  ? `${item[
                                  selectPeopleViewModel!.currentTreeData!
                                    .stepLabel
                                  ]
                                  }-${item[
                                  selectPeopleViewModel!.currentTreeData!
                                    .dataLabel
                                  ]
                                  }`
                                  : item[
                                  selectPeopleViewModel!.currentTreeData!
                                    .dataLabel || ""
                                  ], appStore.HOSPITAL_ID == 'lcey' ? (item.deptCode || item.level || item.job || item.title || item.year) : ''
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
        </Con>)}
    </div>
  );
});
const Wrapper = styled.div`
  margin: 0px;
  .main-con,
  .left-part,
  .right-part {
    min-height: calc(55vh - 0px);
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
    right: 50px;
    bottom: 65px;
    button {
      margin-left: 15px;
    }
  }
`;

const SelectCon = styled(ScrollBox)`
  /* height: 390px; */
  min-height: calc(55vh - 0px);
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
  .settingBtn {
    left: 210px;
  }
  .deleteBtn {
    left: 250px;
  }
  .button {
    display: none;
    color: rgb(0, 166, 128);
    position: absolute;
  }
  #groups {
    position: relative;
    &:hover {
      .button{
        display: inline;
      }
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
    /* height: 390px; */
    min-height: calc(55vh - 60px);
    box-sizing: content-box;
    padding-right: 10px;
    margin-right: -10px;
  }
`;
