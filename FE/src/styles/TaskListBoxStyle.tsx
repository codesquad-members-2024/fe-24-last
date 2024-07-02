import styled from "styled-components";

const TaskListWrap = styled.div`
    max-width: 708px;
    outline: none;
    margin: 50px auto 0px;
    display: flex;
    gap: 10px;
`;

const TaskContainer = styled.div`
    flex-grow: 1;
    min-width: 256px;
`

const TaskNameBox = styled.span<{$bgColor: string}>`
    background-color: ${({ $bgColor }) => ($bgColor)};
    font-size: 15px;
    padding: 2px 4px;
    border-radius: 5px;
`

const PageName = styled.div`
    margin-left: 3px;
`
const ControlBox = styled.div`
    visibility: hidden
`

const PageContainer = styled.div`
    width: auto;
    height: 30px;
    margin: 10px 0;
    padding: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e0e0e0;
    border-radius: 7px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    background-color: #fff;

    &:hover {
        ${ControlBox} {
            visibility: visible;
        }
    }

`

export {TaskListWrap, TaskContainer, TaskNameBox, PageName, PageContainer, ControlBox}