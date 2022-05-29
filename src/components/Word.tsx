import { useState } from "react";
// w로 새로운 변수명 할당

interface IProps {
  word: IWord;
  // any남발금물
}
// 여러개의 프로퍼티 각각 다른 타입 입력가능
// export 사용하면 다른 파일에서도 가능
export interface IWord {
  day: string;
  eng: string;
  kor: string;
  isDone: boolean;
  id: number;
}
export default function Word({ word: w }: IProps) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);
  function toggleShow() {
    setIsShow(!isShow);
  }
  function toggleIsDone() {
    fetch(`http://localhost:3002/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //   JSON문자열로 변환
      body: JSON.stringify({
        ...word, //기존데이터 deepcopy
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  function del() {
    if (window.confirm("삭제하시겠습니까?")) {
      fetch(`http://localhost:3002/words/${word.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          //삭제시화면 반영
          setWord({
            // deepcopy
            ...word,
            id: 0,
          });
        }
      });
    }
  }
  if (word.id === 0) {
    return null;
  }
  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleIsDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
        <button onClick={del} className="btn_del">
          삭제
        </button>
      </td>
    </tr>
  );
}
