export interface TriviaQuestion {
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    allAnswers: string[];
    selectedAnswer?: string;
    category: string;
    difficulty: string;
    type: string;
    questionId: string;
    score?: number;
}
