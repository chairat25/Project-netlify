import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import "./AddFood.css";

function AddFood() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [input, setInput] = useState({
    Food_name: "",
    Food_element: "",
    Food_price: "",
  });
  const [imageURL, setImageURL] = useState("");

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          setImageURL(uri);
        },
        "base64",
        300,
        100
      );
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userToken = localStorage.getItem("token");

    if (userToken) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };

      const formData = new FormData();
      formData.append("Food_name", input.Food_name);
      formData.append("Food_element", input.Food_element);
      formData.append("Food_price", input.Food_price);
      formData.append("Food_picture", imageURL);

      axios
        .post("http://127.0.0.1:8000/add_food/", formData, { headers })
        .then((response) => {
          if (response.data.message === "Food data added successfully") {
            MySwal.fire({
              html: <i>{response.data.message}</i>,
              icon: "success",
            }).then(() => {
              navigate("/Home");
            });
          } else {
            MySwal.fire({
              html: <i>เพิ่มข้อมูลอาหารไม่สำเร็จ</i>,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          MySwal.fire({
            html: <i>เกิดข้อผิดพลาดในการเพิ่มข้อมูลอาหาร</i>,
            icon: "error",
          });
        });
    } else {
      MySwal.fire({
        html: <i>โปรดล็อกอิน</i>,
        icon: "warning",
      });
    }
  };

  const handleReset = () => {
    setInput({
      Food_name: "",
      Food_element: "",
      Food_price: "",
    });
    setImageURL("");
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
    <div className="backgroundfood">
      <div className="outlineinaddfood" onClick={handleBackClick}>
        <Icon icon="mdi:arrow-back" className="backinaddfood" />
      </div>
      <div className="boxtextfood">
        <div className="block text-gray-700 text-2xl font-bold mb-8 ">
          เพิ่มข้อมูลอาหาร
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2">
                  ชื่อเมนู
                </label>
                <input
                  className="input-stylefood"
                  name="Food_name"
                  type="text"
                  placeholder="ชื่อเมนู..."
                  value={input.Food_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2">
                  องค์ประกอบอาหาร
                </label>
                <textarea
                  className="inputfoodelement"
                  name="Food_element"
                  placeholder="องค์ประกอบอาหาร..."
                  value={input.Food_element}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2">
                  ราคา
                </label>
                <input
                  className="input-stylefoodpice"
                  name="Food_price"
                  type="text"
                  placeholder="ราคา..."
                  value={input.Food_price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2">
                  เพิ่มรูปอาหาร
                </label>
                <input
                  className="file"
                  name="Food_picture"
                  type="file"
                  onChange={handleChange}
                />
                <div>
                  {imageURL && (
                    <img src={imageURL} alt="Food" className="imgaddfood" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="buttonContainerfood">
            <div className="buttonfoodsubmit">
              <button type="submit">ยืนยัน</button>
            </div>
            <div className="buttonfoodcancel">
              <button type="button" onClick={handleReset}>
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
