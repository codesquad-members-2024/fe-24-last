# fe-24-last

## 1주차 페어 프로그래밍 [마롱 marron, 새턴 saturn]

- React + TypeScript + Vite 설정
- mongoDB 설정

### 앞으로 계획

- 페이지 라우팅, 생성
- 블록 생성
- 웹 소켓 통신

### 오늘 논의 한 내용, 학습 키워드

- 라우팅 방식

  - 고유한 아이디로 라우팅 `crypto.randomUUID();`
  - 데이터 구조 고민중.

  ```js
  const pages = [
    {
      id: "1234567890abcdef1234567890abcdef",
      title: "Home",
      blocklist: [],
      owner_id: "jsfhkewhfn1234",
      parent_id: null,
    },
    {
      id: "abcdef1234567890abcdef1234567890",
      title: "Subpage 1",
      blocklist: [],
      owner_id: "jsfhkewhfn1234",
      parent_id: "1234567890abcdef1234567890abcdef",
    },
  ];

  const block = {
    id: "eluhtwiu3o2874",
    type: "text" || "page" || "title",
    content: "안녕하세요",
    page_id: "eiluhwiuhegl2143",
    position: "애매함",
  };
  ```

- 블록

  - 페이지, 제목, 텍스트

- 동시 편집

  - 웹소켓 통신 방식
