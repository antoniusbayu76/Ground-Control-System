import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { initializeApp } from 'firebase/app'; // Firebase App initialization
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; // Firebase storage functions

// Your Firebase configuration (replace with your actual Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDYKL8mNqhBnHLCpjXDhPLj4rusod10tLE",
  authDomain: "coba-4a9ab.firebaseapp.com",
  projectId: "coba-4a9ab",
  storageBucket: "coba-4a9ab.appspot.com",
  messagingSenderId: "157860719335",
  appId: "1:157860719335:web:fe53f19132141978a85042",
  measurementId: "G-XW1PEFMQGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function App() {
  const [surfaceImage, setSurfaceImage] = useState('');
  const [surfaceImage1, setSurfaceImage1] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const imgPaths = ['pic1.png', 'pic2.png']; // Names of images in Firebase Storage
    let currentIndex = 0;
    let intervalId;

    const loadImage = (path) => {
      const imageRef = ref(storage, path); // Create a reference to the file in Firebase Storage
      getDownloadURL(imageRef)
        .then((url) => {
          setSurfaceImage(url);
        })
        .catch((error) => {
          console.error(`Error loading ${path}:`, error);
        });
    };

    loadImage(imgPaths[currentIndex]);

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % imgPaths.length;
      loadImage(imgPaths[currentIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const imgPaths = ['pic3.png', 'pic4.png']; // Names of images in Firebase Storage
    let currentIndex = 0;
    let intervalId;

    const loadImage = (path) => {
      const imageRef = ref(storage, path); // Create a reference to the file in Firebase Storage
      getDownloadURL(imageRef)
        .then((url) => {
          setSurfaceImage1(url);
        })
        .catch((error) => {
          console.error(`Error loading ${path}:`, error);
        });
    };

    loadImage(imgPaths[currentIndex]);

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % imgPaths.length;
      loadImage(imgPaths[currentIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const steps = 6;
    let stepIntervalId = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps);
    }, 5000);

    return () => clearInterval(stepIntervalId);
  }, []);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) {
        mapRef.current = L.map('map-container').setView([51.505, -0.09], 13); // Initial map coordinates and zoom level
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(mapRef.current);

        const customIcon = L.icon({
          iconUrl: 'leaflet/dist/images/marker-icon.png',
          iconSize: [32, 32], // Size of the icon
          iconAnchor: [16, 32], // Anchor point of the icon
        });
        L.marker([51.5, -0.09], { icon: customIcon }).addTo(mapRef.current)
          .bindPopup('A floating marker.')
          .openPopup();
      }
    };

    if (typeof window !== 'undefined') {
      initMap();
    }
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className='nama-tim'>Nama Tim: SAFINAH-ONE </div>
        <div className='nama-tim'>PT: GAMANTARAY</div>
        <div className='lintasan'>Lintasan: .... ( A / B )</div>
      </div>
      <div className="content">
        <div className="position-log">
          <div className='log-tittle'>Position-Log</div>
          <div className='list1'>
            <div className={activeStep === 0 ? 'active-step' : 'step'}>Preparation</div>
            <div className={activeStep === 1 ? 'active-step' : 'step'}>Start</div>
            <div className={activeStep === 2 ? 'active-step' : 'step'}>Floating ball set 1-10</div>
            <div className={activeStep === 3 ? 'active-step' : 'step'}>Mission Surface Imaging</div>
            <div className={activeStep === 4 ? 'active-step' : 'step'}>Mission Underwater Imaging</div>
            <div className={activeStep === 5 ? 'active-step' : 'step'}>Finish</div>
          </div>
        </div>
        <div className="logo-box">
          <div className='logo'>
            <p>POWERED BY</p>
            <img src="LogoGamantaray.png" alt="New Section Image" style={{ width: '70%', height: 'auto' }} />
          </div>
        </div>

        <div className="scores">
          <div className="score">
            <img src={surfaceImage} alt="Surface Imaging" style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }} />
          </div>
          <div className="score">
            <img src={surfaceImage1} alt="Surface Imagingg" style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto', width: 'auto' }} />
          </div>
        </div>
      </div>
      <div className="attitudes">
        <div className="attitudeinfo">
          <div className='attitude-tittle'>Attitude Information</div>
          <div className='list2'>
            <div className='stats'>Trajectory graph</div>
            <div className='stats'>SOG</div>
            <div className='stats'>COG</div>
          </div>
        </div>
        <div className="attitude">
          <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
