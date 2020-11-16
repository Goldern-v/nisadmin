import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Header from "./components/header/index";
import Content from "./components/content/index";
import {Modal} from "./modal";

export default observer(function main(props: { name: string }) {
    const [modal, setModal] = useState(new Modal(props.name))

    useEffect(() => {
      if (modal.name !== props.name) {
        setModal(new Modal(props.name))
      }
      modal.init().then()
    }, [props.name])
    return (
      <Wrapper>
        <Header modal={modal}/>
        <Content modal={modal}/>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
`
