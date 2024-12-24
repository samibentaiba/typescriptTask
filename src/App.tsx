import "./App.css";
import Generic from "./components/Generic";
import { useState } from "react";

function App() {
  const arrayQuestions = [
    {
      Question: "Is the Earth round?",
      correctAnswer: "true",
    },
    {
      Question: "Is the Sun a planet?",
      correctAnswer: "false",
    },
    {
      Question: "Does water boil at 100°C under normal atmospheric pressure?",
      correctAnswer: "true",
    },
    {
      Question: "Is Python a type of snake and a programming language?",
      correctAnswer: "true",
    },
    {
      Question: "Do humans have 5 senses?",
      correctAnswer: "false",
    },
  ];

  const [results, setResults] = useState<Record<number, boolean | null>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmitAnswers = (answers: Record<number, string | null>) => {
    const result: Record<number, boolean | null> = {};

    // Iterate over the answers using Object.entries()
    Object.entries(answers).forEach(([index, answer]) => {
      const correct = arrayQuestions[parseInt(index)].correctAnswer; // Use parseInt to convert index to a number
      result[parseInt(index)] = answer === correct;
    });

    setResults(result); // Save results
    setIsSubmitted(true); // Set the submission flag to true
  };

  console.log(results ? results : "there are no results");

  return (
    <>
      {/* Check if answers are submitted */}
      {!isSubmitted ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "40rem",
              justifyContent: "space-between",
            }}
          >
            <h5>Questions</h5>
            <h5>Reponse</h5>
          </div>
          <Generic
            itemsProp={arrayQuestions}
            render={(item) => <>{item.Question}</>}
            onSubmitAnswers={handleSubmitAnswers}
          />
        </>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <h6>Results:</h6>
          <ul>
            {arrayQuestions.map((item, index) => (
              <li key={index}>
                <strong>{item.Question}</strong>:{" "}
                {results[index] === null
                  ? "Not answered"
                  : results[index]
                    ? "Correct"
                    : "Incorrect"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
