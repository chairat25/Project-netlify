import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "picture") {
      setSelectedFile(event.target.files[0]);
    } else {
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const base64String = reader.result;

      const data = {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        username: inputs.username,
        password: inputs.password,
        phone: inputs.phone,
        picture: base64String,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8000/register/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            MySwal.fire({
              html: <i>{result.message}</i>,
              icon: "success",
            }).then(() => {
              navigate("/Login");
            });
          } else {
            MySwal.fire({
              html: <i>{result.message}</i>,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          MySwal.fire({
            html: <i>เกิดข้อผิดพลาด</i>,
            icon: "error",
          });
        });
    };
  };
  const handleBackClick = () => {
    Swal.fire({
      title: "โปรดรอเเป๊บนึง",
      text: "เรากำลังพาท่านกลับไป",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();
      navigate("/Home");
    }, 2000); // Delay of 2 seconds
  };

  return (
    <div className="bkregister">
      <div className="outlineregister" onClick={handleBackClick}>
        <Icon icon="mdi:arrow-back" className="iconbackregister" />
      </div>
      <div className="form-register">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-3">Register</h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Firstname
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={inputs.firstname || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lastname
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={inputs.lastname || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              name="phone"
              placeholder="Phone number"
              value={inputs.phone || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              name="username"
              placeholder="Username"
              value={inputs.username || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="password"
              name="password"
              placeholder="Password"
              value={inputs.password || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Picture
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="file"
              name="picture"
              onChange={handleChange}
              required
            />
          </div>

          {selectedFile && (
            <div className="flex justify-center mb-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="imgregister"
              />
            </div>
          )}

          <div className="flex justify-center">
            <button
              className="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              type="submit"
            >
              Register
            </button>
          </div>
          <a href="/Login" className="block text-center mt-5">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;
