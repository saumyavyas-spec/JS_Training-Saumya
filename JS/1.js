
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 58 },
  { name: "David", score: 74 },
  { name: "Alex", score: 84 },
  { name: "Rio", score: 50 },
  { name: "Donald", score: 77 },
  { name: "Steve", score: 80 },
  { name: "Mitchel", score: 75 }
];

// Initialize variables
let totalScore = 0;
let highestScore = students[0].score;
let lowestScore = students[0].score;
let highestName = students[0].name;
let lowestName = students[0].name;
// Grade counters
let gradeA = 0;
let gradeB = 0;
let gradeC = 0;
let gradeD = 0;
let gradeF = 0;

// List of students who need to retake
let retakeStudents = [];

// Loop through each student
for (let i = 0; i < students.length; i++) {
  let student = students[i];
  let score = student.score;

  // Add to total score
  totalScore = totalScore + score;

  // Check for highest score
  if (score > highestScore) {
    highestScore = score;
    highestName = student.name;
  }

  // Check for lowest score
  if (score < lowestScore) {
    lowestScore = score;
    lowestName = student.name;
  }

  // Grade categories
  if (score >= 90 && score <= 100) {
    gradeA = gradeA + 1;
  } else if (score >= 80 && score <= 89) {
    gradeB = gradeB + 1;
  } else if (score >= 70 && score <= 79) {
    gradeC = gradeC + 1;
  } else if (score >= 60 && score <= 69) {
    gradeD = gradeD + 1;
  } else {
    gradeF = gradeF + 1;
    retakeStudents.push(student.name);
  }
}// Calculate average
let averageScore = totalScore / students.length;
console.log("Average Score:", averageScore);
console.log("Highest Score:", highestName + " (" + highestScore + ")");
console.log("Lowest Score:", lowestName + " (" + lowestScore + ")");
console.log("Grade Distribution:", {
  A: gradeA,
  B: gradeB,
  C: gradeC,
  D: gradeD,
  F: gradeF
});
console.log("Students needing retake:", retakeStudents);


