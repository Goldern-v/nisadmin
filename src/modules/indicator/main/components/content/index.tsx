import styled from "styled-components";
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {modal} from "../../modal";

interface Props {
}

export default observer(function Header(props: Props) {
  return (
    <Wrapper>

    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background: #ffffff;
`;
