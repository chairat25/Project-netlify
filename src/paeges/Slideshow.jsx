import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Import CSS file or add styles inline

function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลร้านอาหารจาก API
    fetch('http://127.0.0.1:8000/show_all_food/')
      .then(response => response.json())
      .then(data => {
        setSlidesData(data); // กำหนดข้อมูลร้านอาหารทั้งหมด
        showSlides(slideIndex); // แสดง slides เมื่อข้อมูลถูกดึงมาแล้ว
      })
      .catch(error => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านอาหาร:", error);
      });
  }, [slideIndex]); // รวม slideIndex ใน dependency array

  function plusSlides(n) {
    let newIndex = slideIndex + n;
    const totalSlides = slidesData.length;
    if (newIndex > totalSlides) {
      setSlideIndex(1); // กลับไปที่ slide แรกเมื่อมาถึง slide สุดท้าย
    } else if (newIndex < 1) {
      setSlideIndex(totalSlides); // ไปที่ slide สุดท้ายเมื่อมาถึง slide แรก
    } else {
      setSlideIndex(newIndex);
    }
  }

  function currentSlide(n) {
    setSlideIndex(n);
  }

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // ซ่อน slides ทั้งหมดและลบคลาส active ออกจาก dots
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // แสดง slide ตาม index ที่กำหนด
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
  }

  return (
    <div className="slideshow-container">
      {slidesData.map((slide, index) => (
        <div className="mySlides fade" key={index}>
          <div className="numbertext">{index + 1} / {slidesData.length}</div>
          <div className="text">{slide.Food_name}</div>
          <img src={slide.Food_picture} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      

      {/* ปุ่มนำทาง */}
      <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
      <a className="next" onClick={() => plusSlides(1)}>❯</a>

      {/* จุด */}
      <div style={{ textAlign: 'center' }}>
        {slidesData.map((_, index) => (
          <span className="dot" key={index} onClick={() => currentSlide(index + 1)}></span>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
