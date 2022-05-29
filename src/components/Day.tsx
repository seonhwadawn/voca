// import dummy from "../db/data.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word, { IWord } from "./Word";

export default function Day() {
  // useParams로 무슨날짜인지 확인
  //  {}를 이용해 어떤 타입을 사용할지 설정할 수 있음
  const { day } = useParams<{ day: string }>();
  const words: IWord[] = useFetch(`http://localhost:3002/words?day=${day}`);

  return (
    <>
      <h2>Day : {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
