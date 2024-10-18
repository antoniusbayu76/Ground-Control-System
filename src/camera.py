import requests
import time

pic1 = 'D:\GAMANTARAY\GCS\Ground-Control-System\public/pic1.png'
pic2 = 'D:\GAMANTARAY\GCS\Ground-Control-System\public/pic2.png'

def send_image(image_path):
    url = 'http://localhost:3001/upload-image'
    files = {'image': open(image_path, 'rb')}
    response = requests.post(url, files=files)
    print(response.text)

if __name__ == "__main__":
    images = [pic1,pic2]
    while True:
        for image in images:
            send_image(image)
            time.sleep(5)  # Kirim gambar setiap 5 detik
