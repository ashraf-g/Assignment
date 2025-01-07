const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthDropdown = ({ selectedMonth, onChangeMonth }) => {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => onChangeMonth(e.target.value)}
      className="border p-2 rounded-md"
    >
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
