import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LabelInput } from "../Input/LabelInput";
import './InsertQuestion.css';

interface InsertQuestionProps {
  tableName: string | undefined;
}

export const InsertQuestion: React.FC<InsertQuestionProps> = ({ tableName }) => {
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    correctAnswer: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/create-question/${tableName}`, formData);
      setFormData({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        correctAnswer: "",
        
      });
      navigate(0);
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LabelInput
        label="Pytanie"
        name="question"
        value={formData.question}
        onChange={handleChange}
        required
      />

      <LabelInput
        label="Opcja A"
        name="optionA"
        value={formData.optionA}
        onChange={handleChange}
        required
      />

      <LabelInput
        label="Opcja B"
        name="optionB"
        value={formData.optionB}
        onChange={handleChange}
        required
      />

      <LabelInput
        label="Opcja C"
        name="optionC"
        value={formData.optionC}
        onChange={handleChange}
        required
      />

        <label className="insert-question-label">
        Poprawna odpowiedź:
        {["A", "B", "C"].map((option) => (
            <span key={option}>
            <input
                type="radio"
                name="correctAnswer"
                value={option}
                checked={formData.correctAnswer === option}
                onChange={handleChange}
                required
            />{" "}
            {option}
            </span>
        ))}
        </label>


      <button type="submit">Dodaj pytanie</button>
    </form>
  );
};