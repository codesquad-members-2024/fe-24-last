# fe-24-last

### API 명세서

#### **페이지 API**

---

##### `GET /api/pages`

- **응답:**
  - **200 OK:** 페이지 목록 (JSON 형식)
  - **500 Internal Server Error**

---

##### `POST /api/pages`

- **요청 본문:**
  - 페이지 데이터 (JSON 형식)
- **응답:**
  - **200 OK:** 추가된 페이지 데이터
  - **500 Internal Server Error**

---

##### `GET /api/pages/:pageId`

- **매개변수:**
  - `pageId` - 조회할 페이지의 Id
- **응답:**
  - **200 OK:** 페이지 데이터
  - **404 Not Found**
  - **500 Internal Server Error**

---

##### `PATCH /api/pages/:pageId`

- **매개변수:**
  - `pageId` - 수정할 페이지의 Id
- **요청 본문:**
  - `title` - 수정할 제목 (string)
- **응답:**
  - **200 OK:** 수정된 페이지 데이터
  - **400 Bad Request**
  - **404 Not Found**
  - **500 Internal Server Error**

---

##### `DELETE /api/pages/:pageId`

- **매개변수:**
  - `pageId` - 삭제할 페이지의 Id
- **응답:**
  - **200 OK:** 성공 메시지
  - **404 Not Found**
  - **500 Internal Server Error**

---

#### **블록 API**

---

##### `GET /api/pages/:pageId/blocks/:blockId`

- **매개변수:**
  - `pageId` - 페이지 Id
  - `blockId` - 블록 Id
- **응답:**
  - **200 OK:** 블록 데이터
  - **404 Not Found**
  - **500 Internal Server Error**

---

##### `POST /api/pages/:pageId/blocks`

- **매개변수:**
  - `pageId` - 페이지 Id
- **요청 본문:**
  - 블록 데이터 (JSON 형식)
- **응답:**
  - **200 OK:** 추가된 블록 데이터
  - **404 Not Found**
  - **500 Internal Server Error**

---

##### `PATCH /api/pages/:pageId/blocks`

- **매개변수:**
  - `pageId` - 페이지 Id
- **요청 본문:**
  - 블록 전체 데이터 (위치 수정)
- **응답:**
  - **200 OK:** 수정된 블록 데이터
  - **404 Not Found**
  - **500 Internal Server Error**

---

##### `PATCH /api/pages/:pageId/blocks/:blockId`

- **매개변수:**
  - `pageId` - 페이지 Id
  - `blockId` - 블록 Id
- **요청 본문:**
  - 수정할 블록 데이터 (JSON 형식)
- **응답:**
  - **200 OK:** 수정된 블록 데이터
  - **404 Not Found**
  - **500 Internal Server Error**

---

##### `DELETE /api/pages/:pageId/blocks/:blockId`

- **매개변수:**
  - `pageId` - 페이지 Id
  - `blockId` - 블록 Id
- **응답:**
  - **200 OK:** 성공 메시지
  - **404 Not Found**
  - **500 Internal Server Error**

---

## 1주차 페어 프로그래밍 [마롱, 새턴]

- React + TypeScript + Vite 설정
- mongoDB 설정

### 앞으로 계획

- 페이지 라우팅, 생성
- 블록 생성
- 웹 소켓 통신

### 1주차 논의 한 내용, 학습 키워드

- 라우팅 방식

  - 고유한 아이디로 라우팅. `_id`
  - 데이터 구조 고민중.

  ```js
  const pages = [
  {
  Id: "1234567890abcdef1234567890abcdef",
  title: "Home",
  blocklist: [],
  owner_Id: "jsfhkewhfn1234",
  parent_Id: null,
  },
  {
  Id: "abcdef1234567890abcdef1234567890",
  title: "Subpage 1",
  blocklist: [],
  owner_Id: "jsfhkewhfn1234",
  parent_Id: "1234567890abcdef1234567890abcdef",
  },
  ];

  const block = {
  Id: "eluhtwiu3o2874",
  type: "text" || "page" || "title",
  content: "안녕하세요",
  page_Id: "eiluhwiuhegl2143",
  position: "애매함",
  };
  ```

- 블록

  - 페이지, 제목, 텍스트

- 동시 편집

  - 웹소켓 통신 방식
