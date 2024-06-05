import styled from "styled-components";

export function SideBar() {
  const handleNewPage = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          blocklist: [],
          parent_id: "",
        }),
      });
      if (!response.ok) {
        console.log("실패 !");
      }
    } catch (error) {
      console.error("Failed to submit new Pages:", error);
    }
  };

  return (
    <>
      <Wrapper>
        <StyledTopBox>
          <UserInfo>사용자 이름</UserInfo>
          <NewPageButton onClick={handleNewPage}>+</NewPageButton>
        </StyledTopBox>
        <StyledMidleBox>
          <div>개인 페이지</div>
          <></>
        </StyledMidleBox>
        <StyledBottomBox>
          <TemplateButton>
            <div>✔️ 할 일 목록 템플릿</div>
          </TemplateButton>
        </StyledBottomBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(247, 247, 245);
  min-width: 240px;

  height: 100vh;
`;

const StyledTopBox = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const NewPageButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 25px;
  cursor: pointer;
`;

const StyledMidleBox = styled.div`
  div {
    padding: 0 15px;
  }
`;

const StyledBottomBox = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;
const TemplateButton = styled.div`
  padding: 0 15px;
`;
