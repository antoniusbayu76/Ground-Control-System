import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [surfaceImage, setSurfaceImage] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const imgPaths = ['/pic.jpg', '/pic2.jpg']; // Tambahkan lebih banyak jalur gambar jika diperlukan
    let currentIndex = 0;
    let intervalId;

    // Fungsi untuk memuat gambar dan menangani keberadaan gambar
    const loadImage = (path) => {
      const img = new Image();
      img.onload = () => {
        setSurfaceImage(path);
        // Jika gambar yang dimuat adalah pic2.jpg, hentikan penggantian gambar
        if (path === '/pic2.jpg') {
          clearInterval(intervalId);
        }
      };
      img.onerror = () => {
        // Handle error jika gambar tidak ditemukan
        console.error(`Gambar ${path} tidak ditemukan.`);
      };
      img.src = path;
    };

    // Fungsi untuk mengganti gambar secara berkala
    const changeImage = () => {
      currentIndex = (currentIndex + 1) % imgPaths.length;
      loadImage(imgPaths[currentIndex]);
    };

    // Mulai dengan memuat gambar pertama kali saat komponen dimount
    loadImage(imgPaths[currentIndex]);

    // Mengatur interval untuk mengganti gambar
    intervalId = setInterval(changeImage, 5000); // Ganti gambar setiap 5 detik

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []); // Dependency array kosong agar useEffect dipanggil hanya sekali saat komponen dimount

  useEffect(() => {
    // Fungsi untuk mengakses webcam
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing webcam: ', err);
        });
    };

    startVideo();
  }, []); // Dependency array kosong agar useEffect dipanggil hanya sekali saat komponen dimount


  return (
    <div className="container">
      <div className="header">
        <div className='nama-tim'>Nama Tim: SAFINAH-ONE PT: GAMANTARAY</div>
        <div className='lintasan'>Lintasan: .... ( A / B )</div>
      </div>
      <div className="content">
        <div className="position-log">
          <div className='log-tittle'>Position-Log</div>
          <ol>
            <li>Preparation</li>
            <li>Start</li>
            <li>Floating ball set 1-10</li>
            <li>Mission Surface Imaging </li>
            <li>Mission Underwater Imaging </li>
            <li>Finish</li>
          </ol>
        </div>
        <div className="scores">
          <div className="score"><img src={surfaceImage} alt="Surface Imaging" style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }} /></div>
          <div className="score">5</div>
        </div>
      </div>
      <div className="attitudes">
        <div className="attitudeinfo">
          <div className='attitude-tittle'>Attitude Information</div>
          <ul>
            <li>Trajectory graph (mapping)</li>
            <li>SOG</li>
            <li>COG</li>
          </ul>
        </div>
        <div className="attitude">
          <video ref={videoRef} autoPlay style={{ width: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }}></video>
        </div>
      </div>
      <div className="other-indicators">
        <div>Indikator Lain (bebas):</div>
        <ul>
          <li>Battery Level</li>
          <li>Visual Video</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
