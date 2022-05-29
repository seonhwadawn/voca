import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function CreateDays() {
  const days = useFetch("http://localhost:3002/days");
  const navigate = useNavigate();

  function addDay(e) {
    e.preventDefault();
    // 새로고침 막아주기

    fetch(`http://localhost:3002/days/`, {
      // 작성하는거라 POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   JSON문자열로 변환
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("생성이 완료되었습니다");
        navigate(`/`);
      }
    });
  }

  return (
    <div>
      <h3>현재 일수 :{days.length}일</h3>
      <button onClick={addDay}> Day추가</button>
    </div>
  );
}
