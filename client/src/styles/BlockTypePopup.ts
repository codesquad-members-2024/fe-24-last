import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 325px;
  height: 390px;
  border: 1px solid rgb(232, 232, 232);
  border-radius: 7px;
  padding-top: 6px;
  overflow-y: scroll;
  z-index: 1000;
  position: absolute;
  background-color: white;
  top: 100%;
`;

export const PopupTitle = styled.div`
  color: gray;
  font-size: 12px;
  padding: 0 14px;
  margin-top: 6px;
  margin-bottom: 8px;
`;

export const ButtonBox = styled.div`
  margin: 0 4px;
  padding: 0 4px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: rgb(239, 239, 239);
    cursor: pointer;
  }
`;

export const ButtonEmoji = styled.div`
  width: 46px;
  height: 46px;
  border: 1px rgb(236, 236, 236) solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 1;

  & img {
    width: 20px;
    height: auto;
  }
`;

export const BlockTypeDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 238px;
`;

export const TypeName = styled.div`
  font-size: 15px;
  color: rgb(55, 53, 47);
`;

export const TypeDescription = styled.div`
  font-size: 12px;
  color: rgb(169, 169, 167);
`;
