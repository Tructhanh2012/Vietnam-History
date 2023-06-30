import React, { useState } from "react";

const QuizDetail = () => {
  const [selectedChoices, setSelectedChoices] = useState({});
  const [score, setScore] = useState(0);

  const handleChoiceChange = (event, questionIndex) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [questionIndex]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    quizData.forEach((question, index) => {
      if (selectedChoices[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const quizData = [
    {
      question:
        "Ai là người đặt nền móng cho Cách mạng Tháng Tám năm 1945 tại Việt Nam?",
      choices: [
        "Hồ Chí Minh",
        "Võ Nguyên Giáp",
        "Phan Bội Châu",
        "Nguyễn Thái Học",
      ],
      correctAnswer: "Hồ Chí Minh",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    // Thêm câu hỏi khác tại đây
  ];

  return (
    <div>
      {quizData.map((question, index) => (
        <div key={index}>
          <h2>Câu hỏi:</h2>
          <p>{question.question}</p>

          {/* <h2>Lựa chọn:</h2> */}
          <form>
            {question.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <label>
                  <input
                    type="radio"
                    value={choice}
                    checked={selectedChoices[index] === choice}
                    onChange={(event) => handleChoiceChange(event, index)}
                  />
                  {choice}
                </label>
              </div>
            ))}
          </form>
        </div>
      ))}

      <button onClick={handleSubmit}>Hoàn thành</button>

      {/* {Object.keys(selectedChoices).length > 0 && ( */}
      <div>
        <h2>Kết quả:</h2>
        <p>Số câu trả lời đúng: {score}</p>
      </div>
      {/* )} */}
    </div>
  );
};

export default QuizDetail;
