import React from "react";
import "./Notshowfood.css";

function Notshowfood() {
  const handleSuccess = () => {
    // เขียนโค้ดสำหรับการดำเนินการเมื่อคลิกปุ่ม success ที่นี่
    console.log("Success button clicked");
  };

  const handleCancel = () => {
    // เขียนโค้ดสำหรับการดำเนินการเมื่อคลิกปุ่ม cancel ที่นี่
    console.log("Cancel button clicked");
  };

  return (
    <div className="white-background">
      <div className="notshowfood">ไม่เเสดงรายการอาหาร</div>
      <div className="box-container">
        {/* ภาพอาหาร */}
        <img
          src="https://www.southernliving.com/thmb/dvvxHbEnU5yOTSV1WKrvvyY7clY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205217071-2000-2a26022fe10b4ec8923b109197ea5a69.jpg"
          className="picture-menu"
        />
        {/* ชื่ออาหาร */}
        <div className="food-name">ชื่ออาหาร กระเพราหมูสับใส่ไข่</div>
        {/* ช่อง checkbox */}
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue
          id="flexCheckDefault"
        />
      </div>
      {/* ปุ่ม success และ cancel */}
      <div className="grid-button">
        <button className="success-button" onClick={handleSuccess}>
          ยืนยัน
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

export default Notshowfood;
