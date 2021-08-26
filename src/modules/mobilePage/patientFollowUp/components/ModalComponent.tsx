import { Modal, WingBlank } from "antd-mobile";
import React, { useState, useEffect } from "react";

export default function ModalComponent(props: any) {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const closest = (el: any, selector: any) => {
    const matchesSelector =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  };
  const showModal = (e: any, key: any) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    switch (key) {
      case "modal1":
        setModal1(true);
        break;
      case "modal2":
        setModal2(true);
        break;
    }
  };
  ModalComponent.prototype.showModal = showModal;
  const onClose = (key: any) => () => {
    switch (key) {
      case "modal1":
        setModal1(false);
        break;
      case "modal2":
        setModal2(false);
        break;
    }
  };
  const onWrapTouchStart = (e: any) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, ".am-modal-content");
    if (!pNode) {
      e.preventDefault();
    }
  };
  return (
    <WingBlank>
      <Modal
        visible={modal1}
        transparent
        maskClosable={false}
        onClose={() => onClose("modal1")}
        title="温馨提示"
        footer={[
          {
            text: "取消",
            onPress: () => {
              onClose("modal1")();
            },
          },
          {
            text: "确定",
            onPress: () => {
              props.onSure();
              onClose("modal1")();
            },
          },
        ]}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
      >
        <div style={{ height: 20 }}>确定是否填写完成并提交?</div>
      </Modal>
      <Modal
        visible={modal2}
        transparent
        maskClosable={false}
        onClose={() => onClose("modal2")}
        title="温馨提示"
        footer={[
          {
            text: "确定",
            onPress: () => {
              onClose("modal2")();
            },
          },
        ]}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
      >
        <div style={{ height: 20 }}>您还有必填项未填写,请完善后提交</div>
      </Modal>
    </WingBlank>
  );
}
