"use client";
import QuestionData from "@/public/QuestionData";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RegisContext } from "../store/context";

export default function Genquestion({ progress, setProgress }: any) {
  const { setQuestionState }: any = useContext(RegisContext);

  const [current, setCurrent] = useState(0);
  const [selectChoice, setSelectChoice] = useState<number>(-1);
  const [allSelected, setAllSelected] = useState([]);

  useEffect(() => {
    //console.log(allSelected);
    if (allSelected.length === 8) {
      handleSentAnswer();
      setQuestionState("complete");
    }
  }, [allSelected]);

  const prevQuestion = () => {
    if (current === 0) {
      return;
    } else {
      clearLastAnswer();
      setCurrent(current - 1);
      setProgress(progress - 100 / 7);
    }
  };

  const clearLastAnswer = () => {
    setAllSelected((prevAllSelected) => prevAllSelected.slice(0, -1));
  };

  const nextQuestion = () => {
    setSelectChoice(-1); // Clear selectChoice
    if (selectChoice !== -1) {
      if (current < QuestionData.length - 1) {
        setCurrent(current + 1);
        setProgress(progress + 100 / 7);
      }
    }
  };

  const handleSelectChoice = () => {
    if (selectChoice !== -1) {
      setAllSelected((prevAllSelected): any => [
        ...prevAllSelected,
        selectChoice,
      ]);
      nextQuestion();
    }
  };

  const handleSentAnswer = async () => {
    const answer = allSelected;
    //console.log("answer: ", answer);

    try {
      const response = await axios.post(
        "/api/user/answer",
        { answer },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        if (response.data.success) {
          //console.log("success sent answer");
        }
      }
    } catch (error) {
      //console.log("Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 mt-4">
      {current !== 0 && (
        <button onClick={prevQuestion}>
        <img src="/ArrowLeft.svg" alt="Back" />
      </button>
      )}
      <div className="w-[364px]">
        <span className="text-black01 text-2xl not-italic font-bold leading-10">
          {QuestionData[current].question}
        </span>
      </div>
      <div className="flex flex-col items-start gap-4 h-[450px] overflow-auto">
        {QuestionData[current].choices.map((choice: any, index: number) => (
          <button
            key={index}
            onClick={() => setSelectChoice(index)}
            className={`flex items-center justify-between w-[364px] gap-2.5 p-4 border-black01 ${
              index !== selectChoice
                ? "rounded-lg border-2 border-solid text-black01"
                : "border-primary rounded-lg border-2 border-solid bg-primary text-white"
            }`}
          >
            <span>{choice}</span>
            {index === selectChoice && (
              <img
                src="/Check.svg"
                alt="Check"
                style={{ marginRight: "5px", alignSelf: "center" }}
              />
            )}
          </button>
        ))}
      </div>
      <button
        type="submit"
        onClick={handleSelectChoice}
        className="flex fixed w-[364px] justify-center items-center gap-2.5 px-4 py-2 mt-[480px] bg-primary text-white border rounded-lg border-solid text-base not-italic font-normal leading-6"
      >
        ถัดไป
      </button>
    </div>
  );
}
