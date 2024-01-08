import { useEffect, useState } from "react";

const Calculator = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const [cgpa, setCGPA] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
    // Validation check
    if (courses.some(course => !course.marks || !course.credits)) {
      setErrorMessage("Please provide marks and credits for all courses.");
      return;
    }

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
    setErrorMessage(""); // Clear any previous error message
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
    <div className="bg-green-300 bg-secondary w-11/12 mt-8 relative mx-auto rounded-3xl py-10 px-8 items-center justify-center flex flex-col">
    
      <label className="font-fraunces">Enter the Number of Courses you toom this semester:</label>
      <input
      placeholder="course"
      className="text-lg rounded-lg block  p-2.5"
        type="number"
        value={numCourses}
        onChange={(e) => setNumCourses(Math.max(0, parseInt(e.target.value)))}
      />

      <br />

      {numCourses > 0 &&
        [...Array(numCourses)].map((_, index) => (
          <div key={index}>
            <label className=" font-fraunces">Course {index + 1} Marks:</label>
            <input
                  className="p-2.5 rounded-lg"
              type="number"
              name="marks"
              value={courses[index]?.marks || 0}
              onChange={(e) => handleInputChange(index, e)}
            />

            <label className=" font-fraunces">Credits:</label>
            <input
                  className="p-2.5 rounded-lg"
              type="number"
              name="credits"
              value={courses[index]?.credits || 0}
              onChange={(e) => handleInputChange(index, e)}
            />
<br/>
            <button type="button" onClick={() => handleRemoveCourse(index)}>
              Remove
            </button>
          </div>
        ))}

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <br />

      <button type="button" onClick={handleAddCourse}>
        Add Course
      </button>

      <br />

      <button className="bg-blue-300 rounded-full py-2 px-4 font-fraunces" type="button" onClick={calculateCGPA}>
        Calculate
      </button>

      <br />

      <h2>CGPA: {cgpa}</h2>
    </div>
  );
};

export default Calculator;
