import { PopupWrapper, PopupLineWrapper, PopupLine } from '../../styles/themes';
import { CommentOutlined, StarFilled, DeleteOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';

export default function EditPopup() {
  return (
    <PopupWrapper>
      <PopupLineWrapper>
        <PopupLine>
          <div>
            <CommentOutlined />
            <span className="optionTitle">댓글</span>
          </div>
          <div className="optionShortCutKey">Ctrl+Shift+M</div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div>
            <StarFilled />
            <span className="optionTitle">AI에게 요청</span>
          </div>
          <div className="optionShortCutKey">Ctrl+J</div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div className="deleteTitle">
            <DeleteOutlined />
            <span className="optionTitle">삭제</span>
          </div>
          <div className="optionShortCutKey">Del</div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div>
            <RetweetOutlined />
            <span className="optionTitle">전환</span>
          </div>
          <div className="optionShortCutKey">
            <RightOutlined />
          </div>
        </PopupLine>
      </PopupLineWrapper>
    </PopupWrapper>
  );
}
