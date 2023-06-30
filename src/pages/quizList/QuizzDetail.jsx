import React, { useState } from "react";
import { Button, Modal } from "antd";
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
    setIsModalOpen(false);
  };
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const handleClear = () => {
    setSelectedAnswers([]);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
    },
    {
      question: "Cuộc cách mạng tháng 10 tại Nga diễn ra vào năm nào?",
      choices: ["1910", "1920", "1930", "1940"],
      correctAnswer: "1910",
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
      <div className="row">
        <div className="col-md-9 ">
          {quizData.map((question, index) => (
            <div className="row mt-4">
              <div className="col-md-3 carddd ps-5">
                <div class="card-body p-2 border border-dark rounded">
                  <h5 class="card-title">Câu: {index + 1} </h5>
                  <p class="card-text">Câu trả lời: </p>
                  <p class="card-text"> Điểm của câu: </p>
                </div>
              </div>
              <div
                key={index}
                className="col-md-9 carddd border border-dark rounded"
              >
                <div class="card-body">
                  <p class="card-text">{question.question}</p>
                  <form>
                    {question.choices.map((choice, choiceIndex) => (
                      <div key={choiceIndex}>
                        <label>
                          <input
                            type="radio"
                            value={choice}
                            checked={selectedChoices[index] === choice}
                            onChange={(event) =>
                              handleChoiceChange(event, index)
                            }
                          />
                          {choice}
                        </label>
                      </div>
                    ))}
                  </form>
                  <a
                    style={{
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={handleClear}
                  >
                    Clear
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3 carddd mt-4 ">
          <div>
            <div class="card-body border p-2  border-dark rounded">
              <h5 class="card-title">Số câu đã làm </h5>
              <div class="carddd" style={{ width: "25px" }}>
                <div class="container card-body border border-dark m-2">
                  <p class="card-title">1</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body border p-2 mt-2 border-dark rounded">
            <p>Số câu trả lời đúng: {score}</p>
          </div>
        </div>
        <div className="col-md-8"></div>
        <div className="col-md-4 mt-2">
          <Button type="primary" onClick={showModal}>
            Kết thúc bài làm
          </Button>
          <Modal
            title="Thông báo"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
          >
            <p>
              Các câu trả lời sẽ được lưu vào hệ thống, bạn có chắc chắn nộp bài
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
