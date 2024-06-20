import styled from 'styled-components';
import { PopupWrapper, PopupLineWrapper, PopupLine } from '../../styles/themes';
import { CommentOutlined, DeleteOutlined } from '@ant-design/icons';

export default function TeamSpaceEditPopup() {
  return (
    <TeamSpacePopupWrapper>
      <PopupLineWrapper>
        <PopupLine>
          <div>
            <CommentOutlined />
            <span className="optionTitle">이름 수정</span>
          </div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div className="deleteTitle">
            <DeleteOutlined />
            <span className="optionTitle">삭제</span>
          </div>
        </PopupLine>
      </PopupLineWrapper>
    </TeamSpacePopupWrapper>
  );
}

const TeamSpacePopupWrapper = styled(PopupWrapper)`
  min-width: 150px;
  max-width: 150px;
`;
