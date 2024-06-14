import styled from "styled-components";

const LayoutWrap = styled.div`
    display: flex;
    height: 100vh;
`

const ContentWrap = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
`

export {LayoutWrap, ContentWrap}