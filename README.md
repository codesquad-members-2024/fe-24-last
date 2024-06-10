## 1주차(2024.06.03(월) ~ 2024.06.07(금))

### 기능 구현 목표(task)

- [X] express, mongDB연결
- [X] 리스트를 가져와 사이드바 중첩 페이지 그리기
- [X] react-router-dom으로 라우터 연결
- [ ] 사이드바 각 페이지 클릭시 페이지 이동 및 페이지 정보 그리기
  - [X] url이동 및 데이터 보내기만 완료
- [X] 페이지 생성 기능
- [X] 페이지 삭제 기능
- [ ] 페이지 편집 기능

### 학습 목표
- [ ] React Testing Library, jest 학습
- [ ] react-router-dom 학습 후 라우터 파일 분리
- [ ] styled-component 학습 및 구현
  
학습중~~~~

### API 설계 및 routes 나누기(post맨 적용)
#### 필요한 API
- [X] 페이지 리스트를 불러오는 API
- [X] 페이지 생성 API
- [X] 페이지 삭제 API
- [ ] 편집 시 편집 요청 보낼 API


### 고민사항
- 편집 API를 제목, 블록 등 따로 분리해서 구현해야할지 고민
- SideBar 루트에서 데이터를 받고 있어 페이지 생성, 삭제 시 사이드바 컴포넌트 전체가 다시 렌더링 됨, 바뀌는 부분만 렌더링 될수 있게 useCallback, React.memo를 사용하면 좋을 것 같음
- useQuery, useMutation을 CustomHook을 사용해 Create, Delete, Post 따로 분리해 구현했는데, Delete, Post는 합칠 수 있을것 같음.
- 구현을 하다보니 테스트코드 짜는걸 깜빡한다...내일은 테스트코드 구현...
