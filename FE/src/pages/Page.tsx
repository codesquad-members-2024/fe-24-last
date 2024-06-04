import { useParams } from "react-router-dom"

const Page = () => {
    const { id } = useParams();
  return (
    <div>{id}번 페이지입니다.</div>
  )
}

export default Page