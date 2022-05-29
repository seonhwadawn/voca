import React, { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { IDay } from "./DayList";

export default function CreateWord() {
  const days: IDay[] = useFetch("http://localhost:3002/days");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // 이벤트 타입 지정해줌
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 새로고침 막아주기
    // ref들이없으면 실행 안됨
    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      // 이러면 로딩중에 생성버튼 연타해도 ㄱㅊ
      setIsLoading(true);

      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;

      fetch(`http://localhost:3002/words/`, {
        // 작성하는거라 POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //   JSON문자열로 변환
        body: JSON.stringify({
          day,
          eng,
          kor,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료되었습니다");
          navigate(`/day/${day}`);
        }
      });
    }
  }

  //  DOM에 접근할 수있게해줌 ex: 포커스, 스크롤
  const engRef = useRef<HTMLInputElement>(null);
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);
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
