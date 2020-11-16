import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Header from "./components/header/index";
import Content from "./components/content/index";
import {IModal} from "src/modules/indicator/main/interface";
import {Modal} from "./modal";

export default observer(function main(props: { name: string }) {
    let modal: IModal = new Modal(props.name)

    useEffect(() => {
      if (modal.name !== props.name) {
        modal = new Modal(props.name)
      }
      modal.init()
    }, [props.name])

    const onSearch = () => {
    }

    return (
      <Wrapper>
        <Header modal={modal}/>
        <Content modal={modal}/>
      </Wrapper>
    );
  }
)
;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
`;
