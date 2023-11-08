import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [Lists, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchUserId, setSearchUserId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  }, []);

useEffect(() => {
axios
  .get("http://localhost:8081/api/display")
  .then((res) => {
    console.log(res.data);
    setList(res.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}, [])

const handleDelete = (item) => {
  console.log(item._id)
  axios
    .delete(`http://localhost:8081/api/delete/${item._id}`)
    .then(() => {
      setList((prevList) => prevList.filter((listItem) => listItem._id !== item._id));
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
};

const handleUpdate = () => {
  if (selectedItem) {
    axios
      .put(`http://localhost:8081/api/update/${selectedItem._id}`, selectedItem)
      .then(() => {
        setList((prevList) =>
          prevList.map((listItem) => (listItem._id === selectedItem._id ? selectedItem : listItem))
        );
        setSelectedItem(null); // Clear the selected item
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  }
};

const handleSearch = () => {
  if (searchUserId) {
    axios
      .get(`http://localhost:8081/api/getbyId/${searchUserId}`)
      .then((res) => {
        console.log(res.data)
        setSearchedUser(res.data);
      })
      .catch((error) => {
        console.error("Error searching for user:", error);
        setSearchedUser(null);
      });
  }
};


  return (
    <>
    <div className="card">
      <div>HOME</div>
      <div>
        <span> {localStorage.getItem("EMAIL")} </span>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          {" "}
          LOGOUT{" "}
        </button>
      </div>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
{searchedUser && (
        <div className="search-result">
          <div>User ID: {searchedUser._id}</div>
          <div>Email: {searchedUser.email}</div>
          <div>Password: {searchedUser.password}</div>
        </div>
      )}
      <div className="list">
      <div className="row">
      <div className="column">Email</div>
     <div className="column">Password</div>
     <div className="column" >Action</div>
     </div>
  {Lists.map((list, Index) => (
    <div key={Index} className="row">
      <div className="column">{list.email}</div>
      <div className="column">{list.password}</div>
      <div className="column">
      <button onClick={() => handleDelete(list)}>Delete</button>
      <button onClick={() => setSelectedItem(list)}>Update</button>
      </div>
    </div>
  ))}
   {selectedItem && (
          <div>
            <input
              type="text"
              value={selectedItem.email}
              onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
            />
            <input
              type="text"
              value={selectedItem.password}
              onChange={(e) => setSelectedItem({ ...selectedItem, password: e.target.value })}
            />
            <button onClick={handleUpdate}>Save</button>
          </div>
        )}
</div>
    </>
  );
}

export default Home;
