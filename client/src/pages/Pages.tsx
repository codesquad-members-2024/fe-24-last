import styled from "styled-components";

function Pages() {
  const handleSubmit = async () => {
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
      <StyledButton onClick={handleSubmit}>+ 새 페이지 생성</StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  width: 200px;
`;

export default Pages;
