import styled from "styled-components";
import { NewPageData, useCreateNewData } from "../services/api";
import { useParams } from "react-router-dom";

interface PopupProps {
  position: { top: number; left: number };
  onChangeBlockType: (newType: string) => void;
}

const BLOCK_POPUP_LIST = [
  { type: "h2", name: "제목1", desc: "섹션 제목(대)",
    img: "https://www.notion.so/images/blocks/header.57a7576a.png",
  },
  { type: "h3", name: "제목2", desc: "섹션 제목(중)",
    img: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
  },
  { type: "h4", name: "제목3", desc: "섹션 제목(소)",
    img: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
  },
];

const Popup: React.FC<PopupProps> = ({ position, onChangeBlockType }) => {
  const { id: pageId } = useParams<{ id: string }>();
  const createNewData = useCreateNewData();

  const handleNewPage = () => {
    const newPageData: NewPageData = {
      title: "",
      blocklist: [],
      parent_id: `${pageId}`,
    };

    createNewData(newPageData);
  };

  return (
    <PopupContainer style={{ top: position.top, left: position.left }}>
      <div>기본 블록</div>
      <PopupBox onClick={handleNewPage}>
        <img src="https://www.notion.so/images/blocks/page.83b0bf31.png" />
        <div>페이지</div>
      </PopupBox>
      {BLOCK_POPUP_LIST.map((cur, index) => (
        <PopupBox key={index} onClick={() => onChangeBlockType(cur.type)}>
          <img src={cur.img} />
          <div>
            <p>{cur.name}</p>
            <p>{cur.desc}</p>
          </div>
        </PopupBox>
      ))}
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  width: 200px;
  display: flex;
  position: absolute;
  flex-direction: column;
  border-radius: 6px;
  background: white;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
  overflow: hidden;
  gap: 10px;
  padding: 5px;
  margin-top: 30px;
  div {
    font-size: small;
    padding: 5px 10px;
  }
`;

const PopupBox = styled.div`
  display: flex;
  align-items: center;
  line-height: 120%;
  user-select: none;
  min-height: 45px;
  border: none;
  padding: 10px;
  cursor: pointer;
  img {
    width: 45px;
    display: block;
    object-fit: cover;
    border-radius: 4px;
    background: white;
    box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px;
  }
  &:hover {
    background-color: #f3f3f3;
    border-radius: 5px;
  }
`;

export default Popup;
