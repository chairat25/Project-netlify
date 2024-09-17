import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
  state = {
    showProfileDropdown: false,
    showLoginDropdown: false,
    isSidebarOpen: false // เพิ่ม state ใหม่เพื่อเก็บสถานะของ Sidebar
  };

  toggleProfileDropdown = () => {
    this.setState(prevState => ({
      showProfileDropdown: !prevState.showProfileDropdown
    }));
  };

  toggleLoginDropdown = () => {
    this.setState(prevState => ({
      showLoginDropdown: !prevState.showLoginDropdown
    }));
  };

  openNav = () => {
    this.setState({ isSidebarOpen: true }); // ตั้งค่า isSidebarOpen เป็น true เมื่อเปิด Sidebar
  }

  closeNav = () => {
    this.setState({ isSidebarOpen: false }); // ตั้งค่า isSidebarOpen เป็น false เมื่อปิด Sidebar
  }

  render() {
    return (
      <div>
        <div id="mySidebar" className={`sidebar ${this.state.isSidebarOpen ? 'open' : ''}`}>
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
          <a href="/Home">หน้าร้านค้า</a>
          <a href="/Translate">แปลภาษา</a>
          <a href="#" onClick={this.toggleProfileDropdown}>เพิ่มข้อมูลสำหรับร้าน
            <img
              src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844438-hamburger-menu-more-navigation_110319.png"
              alt="คำอธิบายรูปภาพ"
              className="h-8 w-8"
            />
          </a>
          {this.state.showProfileDropdown && (
            <div className="dropdown-content">
              <a href="/AddDataShop">-เพิ่มข้อมูลร้านค้า</a>
              <a href="/AddFood">-เพิ่มข้อมูลอาหาร</a>
              <a href="/Fooddetails">-แสดงรายละเอียดข้อมูลร้านค้า</a>
            </div>
          )}
          <a href="#" onClick={this.toggleLoginDropdown}>แก้ไข้โปรไฟล์
            <img
              src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844438-hamburger-menu-more-navigation_110319.png"
              alt="คำอธิบายรูปภาพ"
              className="h-8 w-8"
            />
          </a>
          {this.state.showLoginDropdown && (
            <div className="dropdown-content">
              <a href="/Editstore">-แก้ไข้ข้อมูลร้านค้า</a>
              <a href="/Notshowfood">-ไม่แสดงรายการอาหาร</a>
            </div>
          )}
          
          <a href="#" onClick={this.toggleLoginDropdown}>ลงชื่อเข้าใช้
            <img
              src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844438-hamburger-menu-more-navigation_110319.png"
              alt="คำอธิบายรูปภาพ"
              className="h-8 w-8"
            />
          </a>
          {this.state.showLoginDropdown && (
            <div className="dropdown-content">
              <a href="/Login">-เข้าสู่ระบบ</a>
              <a href="/Register">-สมัครสมาชิก</a>
              <a href="/Logout">-ออกจาระบบ</a>
              <a href="/">-ลบบัญชี</a>
            </div>
          )}
        </div>


        <div className="hi">
              
            </div>
        <div id="main">
          <button className="openbtn" onClick={this.state.isSidebarOpen ? this.closeNav : this.openNav}>&#9776; </button>
        </div>
        
      </div>
    );
  }
}

export default Sidebar;
