import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function UploadPhoto() {
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setSelectPhoto(file);
      setError("");

      //create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = () => {
    if (!selectPhoto) {
      setError("Please select a file first");
      return;
    }
    // we'll store it in sessionStorage as a base64 string
    const existingPhoto = JSON.parse(
      sessionStorage.getItem("customerPhotos") || "[]"
    );

    // add new photo with metadata
    const newPhoto = {
      id: Date.now(),
      name: selectPhoto.name,
      type: selectPhoto.type,
      size: selectPhoto.size,
      data: preview, // this is the base64 data
      uploadDate: new Date().toISOString(),
    };
    existingPhoto.push(newPhoto);
    sessionStorage.setItem("customerPhotos", JSON.stringify(existingPhoto));
    //update state
    setUploadedPhotos(existingPhoto);
    //Reset Form
    setSelectPhoto(null);
    setPreview(null);

    //sHOW SUSSESS MESSAGE
    setSuccessMessage("Photo uploaded successfully!");

    //cLEAR SUSSES MESSAGE AFTER 3 SEC
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  useEffect(() => {
    const existingPhoto = JSON.parse(
      sessionStorage.getItem("customerPhoto") || "[]"
    );
    setUploadedPhotos(existingPhoto);
  }, []);

  return (
    <div>
      <div>
        
          <div className="flex flex-col">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border shadow-md border-black rounded-md p-2 "
            />
            {error && <p className="text-red-500">{error}</p>}
          
          {preview && (
            <div>
              <h3> Preview</h3>
              <img src={preview} alt="preview" />
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={!selectPhoto}
            className={`w-full py-2 rounded font-semibold mt-5 ${
              selectPhoto
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}          >
            upload Photo{" "}
          </button>

          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {uploadedPhotos.length > 0 && (
            <div>
              <h3> your Uploaded Photos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {" "}
                {uploadedPhotos.map((photo) => (
                  <div key={photo.id}>
                    <img src={photo.data} alt={photo.name} />
                    <p>{photo.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(photo.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadPhoto;
