import { useLocation, useParams } from "react-router-dom"

const Page = () => {
    const { id } = useParams();
    const location = useLocation();
    const state = location.state || {};
    // state 전개 연산자로 분리
  return (
    <div>
      <div>{state.title}</div>
      <div>{id}번 페이지입니다.</div>
    </div>
  )
}

// export default React.memo(Page)
export default Page