// import dummy from "../db/data.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Day() {
  // useParams로 무슨날짜인지 확인
  const { day } = useParams();
  const words = useFetch(`http://localhost:3002/words?day=${day}`);

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
