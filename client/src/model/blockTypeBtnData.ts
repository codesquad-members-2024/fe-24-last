import textImg from "../assets/abc.png";
import pageImg from "../assets/file.png";
import checkImg from "../assets/checklist.png";
import h1Img from "../assets/h1.png";
import h2Img from "../assets/h2.png";
import h3Img from "../assets/h3.png";
import circleImg from "../assets/new-moon.png";

export const blockTypeBtnsData = [
  {
    img: textImg,
    name: "text",
    title: "텍스트",
    description: "일반 텍스트를 사용해 쓰기를 시작하세요.",
  },
  {
    img: pageImg,
    name: "page",
    title: "페이지",
    description: "이 페이지 안에 하위 페이지를 만드세요.",
  },
  {
    img: checkImg,
    name: "checkList",
    title: "할 일 목록",
    description: "할 일 목록으로 작업을 추적하세요.",
  },
  {
    img: h1Img,
    name: "bigTitle",
    title: "제목1",
    description: "섹션 제목(대)",
  },
  {
    img: h2Img,
    name: "middleTitle",
    title: "제목2",
    description: "섹션 제목(중)",
  },
  {
    img: h3Img,
    name: "smallTitle",
    title: "제목3",
    description: "섹션 제목(소)",
  },
  {
    img: circleImg,
    name: "bulletPoint",
    title: "글머리 기호 목록",
    description: "간단한 글머리 기호 목록을 생성하세요.",
  },
];
