# Backend

## 기술스택
- JavaScript
- Express
- mongoDB

## API

### /page
- 페이지 리스트 가져오기
  - GET /api/pagesList

- 새로운 페이지 생성하기
  - POST /api/newPage

- 페이지 삭제
  - DELETE /api/delete/:id

- 페이지 타이틀 변경
  - PATCH /api/page/title/:id

- 페이지 블럭 변경
  - PATCH /api/page/block/:id