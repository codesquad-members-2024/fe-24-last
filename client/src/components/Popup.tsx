import styled from "styled-components";
import { NewPageData, useCreateNewData } from "../services/api";
import { useParams } from "react-router-dom";

interface PopupProps {
  position: { top: number; left: number };
  onChangeBlockType: (newType: string) => void;
}

const BLOCK_POPUP_LIST = [
  { type: "h2", name: "제목1", desc: "섹션 제목(대)" },
  { type: "h3", name: "제목2", desc: "섹션 제목(중)" },
  { type: "h4", name: "제목3", desc: "섹션 제목(소)" },
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
      <button onClick={handleNewPage}>페이지</button>
      {BLOCK_POPUP_LIST.map((cur, index) => (
        <button key={index} onClick={() => onChangeBlockType(cur.type)}>
          <p>{cur.name}</p>
          <p>{cur.desc}</p>
        </button>
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
  }
  button {
    border: none;
    padding: 10px;
    cursor: pointer;
  }
`;

export default Popup;
