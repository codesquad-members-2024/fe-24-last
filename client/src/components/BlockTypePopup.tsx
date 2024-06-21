import styled from "styled-components";
import { blockTypeBtnsData } from "../model/blockTypeBtnData";

export default function BlockTypePopup() {
  return (
    <Wrapper>
      <PopupTitle>기본 블록</PopupTitle>

      {blockTypeBtnsData.map((typeObj, index) => {
        const { img, name, description } = typeObj;
        return (
          <ButtonBox key={`blockTypeBtn-${index}`}>
            <ButtonEmoji>
              <img src={img} />
            </ButtonEmoji>
            <BlockTypeDescription>
              <TypeName>{name}</TypeName>
              <TypeDescription>{description}</TypeDescription>
            </BlockTypeDescription>
          </ButtonBox>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
`;

const PopupTitle = styled.div`
  color: gray;
  font-size: 12px;
  padding: 0 14px;
  margin-top: 6px;
  margin-bottom: 8px;
`;

const ButtonBox = styled.div`
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

const ButtonEmoji = styled.div`
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

const BlockTypeDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 238px;
`;

const TypeName = styled.div`
  font-size: 15px;
  color: rgb(55, 53, 47);
`;

const TypeDescription = styled.div`
  font-size: 12px;
  color: rgb(169, 169, 167);
`;
