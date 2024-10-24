import firebase_admin
from firebase_admin import credentials, storage

# Path to your Firebase service account key JSON file
cred = credentials.Certificate("D:\GAMANTARAY\GCS\Ground-Control-System\public/config.json")

# Initialize the Firebase app with the credentials and storage bucket
firebase_admin.initialize_app(cred, {
    'storageBucket': 'coba-4a9ab.appspot.com'  # Replace with your storage bucket name
})

def upload_file(file_path, firebase_path):
    """Uploads a file to Firebase Storage."""
    try:
        # Get a reference to the Firebase storage bucket
        bucket = storage.bucket()

        # Get a reference to the file location in Firebase Storage
        blob = bucket.blob(firebase_path)

        # Upload the file to Firebase Storage
        blob.upload_from_filename(file_path)

        # Optionally, make the file publicly accessible (you can remove this if you don't want public access)
        blob.make_public()

        print(f"File uploaded to {firebase_path}. Public URL: {blob.public_url}")

    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
file_path = "D:\GAMANTARAY\GCS\Ground-Control-System\public/Gamantaray.png"  # Local file path you want to upload
firebase_path = "Gamantaray.png"         # Desired path in Firebase Storage
upload_file(file_path, firebase_path)
