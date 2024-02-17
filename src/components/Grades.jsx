const Grades = () => {
  const data = [
    { subject: "90 AND AB0VE", grade: "A+" },
    { subject: "80-89", grade: "A" },
    { subject: "75-79", grade: "B+" },
    { subject: "65-74", grade: "B" },
    { subject: "60-64", grade: "C+" },
    { subject: "50-59", grade: "C" },
    { subject: "40-49", grade: "D" },
    { subject: "BELOW", grade: "F" },
  ];

  return (
    <div className="container w-7/12 font-fraunces  mt-4 rounded-3xl mx-auto p-4">
      <table className="min-w-full ring-2 ring-[#246d49] rounded-3xl ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Out of 100</th>
            <th className="py-2 px-4 border-b">Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={(index + 1) % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td className="py-2 px-4 border-b">{row.subject}</td>
              <td className="py-2 px-4 border-b">{row.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
