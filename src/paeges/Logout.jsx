import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/A9FWShnz51oAAAAi/bow.gif")
        20px 300px
        no-repeat
      `,
      icon: "warning",
      title: "คุณต้องการออกจากระบบหรือไม่?",
      text: "ถ้าออกจากระบบเเล้วต้องเข้าใหม่น้าา",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/Home");
        Swal.fire({
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
          showConfirmButton: true,
          confirmButtonText: "ตกลง",
        });
      } else if (result.isDismissed) {
        navigate("/Home");
      }
    });
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
    <div className="bklogout">
      <div className="outlineinlogout" onClick={handleBackClick}>
        <Icon icon="mdi:arrow-back" className="iconbackinlogout" />
      </div>

      <div className="form-logout">
        <h1 className="text-2xl font-bold mb-3"></h1>
        <p className="text-center mb-5">คุณต้องการออกจากระบบใช่หรือไม่?</p>
        <div className="flex justify-center">
          <button
            className="w-48 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
