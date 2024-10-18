const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS
const multer = require('multer');
const path = require('path');
const app = express();
const server = http.createServer(app);
// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React frontend
    methods: ['GET', 'POST'], // Allow these methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from the React frontend
      methods: ["GET", "POST"],
      credentials: true
    }
  });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Menggunakan nama asli file dan menambahkan timestamp
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // Menyimpan ekstensi asli
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
// Konfigurasi folder untuk menyimpan gambar yang diupload
const upload = multer({ storage: storage });

// Middleware untuk menyajikan file statis (gambar, dll.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Endpoint untuk menerima gambar dari camera.py
app.post('/upload-image', upload.single('image'), (req, res) => {
    if (req.file) {
      console.log("File uploaded:", req.file); // Log informasi file yang diupload
      const imagePath = `/uploads/${req.file.filename}`;
      io.emit('new-image', imagePath);
      res.status(200).send('Image uploaded successfully');
    } else {
      res.status(400).send('No image uploaded');
    }
  });
  

// Jalankan server
const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
