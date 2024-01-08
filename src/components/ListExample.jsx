import { useEffect, useState } from "react";

const Calculator = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [cgpa, setCGPA] = useState(0);

  useEffect(() => {
    const savedNumCourses = localStorage.getItem("numCourses");
    const savedCourses = JSON.parse(localStorage.getItem("courses"));

    if (savedNumCourses !== null && savedCourses !== null) {
      setNumCourses(parseInt(savedNumCourses));
      setCourses(savedCourses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("numCourses", numCourses);
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [numCourses, courses]);

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    courses.forEach((course) => {
      const marks = parseFloat(course.marks);
      let gradePoint = 0;

      if (marks >= 90) {
        gradePoint = 4.0;
      } else if (marks >= 80) {
        gradePoint = 4.0;
      } else if (marks >= 75) {
        gradePoint = 3.5;
      } else if (marks >= 65) {
        gradePoint = 3.0;
      } else if (marks >= 60) {
        gradePoint = 2.5;
      } else if (marks >= 50) {
        gradePoint = 2.0;
      } else if (marks >= 40) {
        gradePoint = 1.0;
      }

      totalGradePoints += gradePoint * parseFloat(course.credits);
      totalCredits += parseFloat(course.credits);
    });

    const calculatedCGPA = totalGradePoints / totalCredits;
    setCGPA(calculatedCGPA.toFixed(2));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [name]: value };
    setCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { marks: 0, credits: 0 }]);
    setNumCourses(numCourses + 1);
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    setNumCourses(numCourses - 1);
  };

  return (
    <div className=" border-gray-950 items-center justify-center flex flex-col">
      <h1>CGPA Calculator</h1>
      <label>Number of Courses:</label>
      <input
        type="number"
        value={numCourses}
        onChange={(e) => setNumCourses(parseInt(e.target.value))}
      />

      <br />

      {[...Array(numCourses)].map((_, index) => (
        <div key={index}>
          <label>Course {index + 1} Marks:</label>
          <input
            type="number"
            name="marks"
            value={courses[index]?.marks || 0}
            onChange={(e) => handleInputChange(index, e)}
          />

          <label>Credits:</label>
          <input
            type="number"
            name="credits"
            value={courses[index]?.credits || 0}
            onChange={(e) => handleInputChange(index, e)}
          />

          <button type="button" onClick={() => handleRemoveCourse(index)}>
            Remove
          </button>
        </div>
      ))}

      <br />

      <button type="button" onClick={handleAddCourse}>
        Add Course
      </button>

      <br />

      <button type="button" onClick={calculateCGPA}>
        Calculate CGPA
      </button>

      <br />

      <h2>CGPA: {cgpa}</h2>
    </div>
  );
};

export default Calculator;
