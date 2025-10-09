import { useState } from "react";

export default function TaskInterview() {
  const initialUsers = [
    { name: "Markus", gender: "Male", active: false, lang: "Hiri Motu" },
    { name: "Tudor", gender: "Male", active: true, lang: "Romanian" },
    { name: "Sim", gender: "Male", active: true, lang: "Lithuanian" },
    { name: "Tildie", gender: "Female", active: false, lang: "Montenegrin" },
    { name: "Abigail", gender: "Female", active: true, lang: "Bosnian" },
    { name: "Karen", gender: "Bigender", active: true, lang: "Punjabi" },
    { name: "Dermot", gender: "Male", active: false, lang: "Swahili" },
    { name: "Leelah", gender: "Genderqueer", active: false, lang: "Tetum" },
    { name: "Tim", gender: "Male", active: true, lang: "Bosnian" },
    { name: "Theo", gender: "Male", active: false, lang: "West Frisian" },
    { name: "Arnie", gender: "Male", active: true, lang: "Georgian" },
    { name: "Kirsti", gender: "Female", active: true, lang: "Montenegrin" },
    { name: "Hermia", gender: "Female", active: true, lang: "Dzongkha" },
    { name: "Jethro", gender: "Male", active: true, lang: "Malagasy" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    active: false,
    lang: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, formData]);
  };

  return (
    <div>
      <h1>Users</h1>

      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleInputChange}
        />

        <label>Gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />

        <label>Active</label>
        <input
          name="active"
          type="text"
          value={formData.active}
          onChange={handleInputChange}
        />

        <label>Language</label>
        <input
          type="text"
          name="lang"
          value={formData.lang}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {users.map((item, index) => {
          return (
            <li key={index}>
              <h1>
                Name : {item.name}
                {""} Gender: {item.gender} Active : {item.active} Language:{" "}
                {item.lang}
              </h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
