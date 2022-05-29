import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
export default function CreateWord() {
  const days = useFetch("http://localhost:3002/days");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    // 새로고침 막아주기
    if (!isLoading) {
      // 이러면 로딩중에 생성버튼 연타해도 ㄱㅊ
      setIsLoading(true);
      fetch(`http://localhost:3002/words/`, {
        // 작성하는거라 POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //   JSON문자열로 변환
        body: JSON.stringify({
          day: dayRef.current.value,
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료되었습니다");
          navigate(`/day/${dayRef.current.value}`);
        }
      });
    }
  }

  //  DOM에 접근할 수있게해줌 ex: 포커스, 스크롤
  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button style={{ opacity: isLoading ? 0.3 : 1 }}>
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
  );
}
