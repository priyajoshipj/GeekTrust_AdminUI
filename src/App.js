import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers, updateUsers, deleteUsers} from "./store/action"
import {
  getUsers
} from "./app/api";
import "./app.scss";
import DataTable from "./components/DataTable";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {


  const dispatch = useDispatch();

  const users = useSelector(state => {return state.getAllUser});

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    role:"",
    email: ""
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(async()=>{
    let getAllTheUser = await getUsers();
    dispatch(getAllUsers(getAllTheUser))
    setSavedUsers(getAllTheUser)
 },[])


  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users?.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedUsers.filter(user =>
        Object.keys(user).some(key =>
          user[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      console.log(" resultsresults ", results)
      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedUsers });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "name":
        const nameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.first_name.localeCompare(b.first_name, "tr")
            : b.first_name.localeCompare(a.first_name, "tr");
        });
        dispatch({ type: "SET_USERS", data: nameSort });
        return;
      case "surname":
        const surnameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.last_name.localeCompare(b.last_name, "tr")
            : b.last_name.localeCompare(a.last_name, "tr");
        });
        dispatch({ type: "SET_USERS", data: surnameSort });
        return;
      case "email":
        const emailSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.email.localeCompare(b.email, "tr")
            : b.email.localeCompare(a.email, "tr");
        });
        dispatch({ type: "SET_USERS", data: emailSort });
        return;
      default:
        break;
    }
  };

  // Update User
  const updateRow = user => {
    setModal("Update User");
    setCurrentUser({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    });
  };

  const updateUser = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);
    dispatch(updateUsers({id,updatedUser}))
    setLoading(false);
  };

  // Delete User
  const deleteRow = user => {
    setModal("Delete User");
    setCurrentUser({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email
    });
  };

  const deleteUser = async id => {
    setActiveModal(false);
    setLoading(true);
    dispatch(deleteUsers(id))
    setLoading(false);
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      await getUsers().then( (data) => {
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <Search search={search} resetSearch={search} />
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={users?.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Update User" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete User" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
