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
    if (courses.some((course) => !course.marks || !course.credits)) {
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
    <div className="ring-2 ring-[#246d49] w-7/12 mt-8 relative mx-auto rounded-3xl py-10 px-8 items-center justify-center flex flex-col mb-10">
      <label className="font-fraunces text-black text-2xl">
        Enter the Number of Courses you took This semester:
      </label>
      <br />
      <input
        placeholder="course"
        className="text-lg rounded-lg block w-16 md:w-32 lg:w-48 p-2.5 ring-2 ring-[#246d49]"
        type="number"
        value={numCourses}
        onChange={(e) => setNumCourses(Math.max(0, parseInt(e.target.value)))}
      />

      <br />

      {numCourses > 0 &&
        [...Array(numCourses)].map((_, index) => (
          <div key={index}>
            <br />
            <label className=" text-black font-fraunces ">
              Course {index + 1} Mark Out of 100:{" "}
            </label>
            <input
              className="p-2.5 rounded-lg ml-3 mr-3 ring-2 ring-[#246d49]"
              type="number"
              name="marks"
              value={courses[index]?.marks || 0}
              onChange={(e) => handleInputChange(index, e)}
            />

            <label className=" text-black font-fraunces">
             Credit Hour:
            </label>
            <input
              className="p-2.5 rounded-lg ring-2 ml-3 ring-[#246d49]"
              type="number"
              name="credits"
              value={courses[index]?.credits || 0}
              onChange={(e) => handleInputChange(index, e)}
            />
            <br />
            <br />

            <button
              className=" rounded-full bg-[#246d49] text-white py-2 px-4 font-fraunces"
              type="button"
              onClick={() => handleRemoveCourse(index)}
            >
              Remove
            </button>
            <br />
          </div>
        ))}

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <br />

      <button
        className="ring-2 ring-[#246d49] rounded-full font-fraunces px-4 py-2"
        type="button"
        onClick={handleAddCourse}
      >
        Add Course
      </button>

      <br />

      <button
        className="bg-[#246d49] text-white border-collapse rounded-full py-2 px-4 font-fraunces"
        type="button"
        onClick={calculateCGPA}
      >
        Calculate
      </button>

      <br />

      <h2 className="bg-[#effb8f] ring-2 ring-[#246d49] rounded-full py-2 px-4 font-fraunces">
        {" "}
        Semester (CGPA): {cgpa}
      </h2>
    </div>
  );
};

export default Calculator;
