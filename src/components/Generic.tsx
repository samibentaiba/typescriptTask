import { ReactNode, useState } from "react";

function Generic<ListItem>({
  itemsProp,
  render,
  onSubmitAnswers, // New prop to handle submission
}: {
  itemsProp: ListItem[];
  render: (item: ListItem) => ReactNode;
  onSubmitAnswers: (answers: Record<number, string | null>) => void; // Callback to pass answers back
}) {
  const [selected, setSelected] = useState<Record<number, string | null>>({});

  const handleCheckboxChange = (index: number, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [index]: prev[index] === value ? null : value, // Toggle selection
    }));
  };

  const handleSubmit = () => {
    onSubmitAnswers(selected); // Submit answers to parent
  };

  return (
    <div>
      <ul style={{ padding: 0, position: "relative" }}>
        {itemsProp.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: "2rem",
              width: "40rem",
              justifyContent: "space-between",
              position: "relative",
              overflow: "visible",
            }}
          >
            {render(item)}
            <div
              style={{
                position: "absolute",
                right: "0rem",
                top: "-0.7rem", // Position it above the text
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
              }}
            >
              <label>
                <h6 style={{ margin: 0 }}>true</h6>
                <input
                  type="checkbox"
                  checked={selected[index] === "true"}
                  onChange={() => handleCheckboxChange(index, "true")}
                />
              </label>
              <label>
                <h6 style={{ margin: 0 }}>false</h6>
                <input
                  type="checkbox"
                  checked={selected[index] === "false"}
                  onChange={() => handleCheckboxChange(index, "false")}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
}

export default Generic;
