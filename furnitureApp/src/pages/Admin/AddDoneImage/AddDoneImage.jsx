import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddDoneImage.scss'; 

const AddDoneImage = () => {
    const [file, setFile] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {

        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_done_images/');
                setImages(response.data);
            } catch (error) {
                setMessage('Error fetching images');
            }
        };

        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/upload_done_project/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImagePath(response.data.file_path);
            setMessage('File uploaded successfully');
            setImages([...images, { id: response.data.id, done_image_path: response.data.file_path }]);
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    const handleDelete = async () => {
        if (!selectedImage) {
            setMessage('No image selected to delete.');
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/delete_done_image/${selectedImage}`);
            setImages(images.filter((image) => image.id !== selectedImage));
            setSelectedImage(null);
            setMessage('Image deleted successfully');
        } catch (error) {
            setMessage('Error deleting image');
        }
    };

    const handleSelectImage = (id) => {
        setSelectedImage(id);
    };

    return (
        <div className="add-done-image">
            <h2>Dodaj zdjęcie realizacji</h2>

            <div className="delete-selected-btn-wrapper">
            <input type="file" onChange={handleFileChange} />
            <button className="form-button" onClick={handleUpload}>Upload</button>
            </div>
            {message && <p>{message}</p>}

            {imagePath && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={`http://localhost:8000${imagePath}`} alt="Uploaded Project" style={{ width: '300px', height: 'auto' }} />
                    <button onClick={handleDelete}>Usuń zdjęcie</button>
                </div>
            )}

            <h3>Uploaded Images</h3>
            <div className="image-gallery">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`image-item ${selectedImage === image.id ? 'selected' : ''}`}
                        onClick={() => handleSelectImage(image.id)}
                    >
                        <img
                            src={`http://127.0.0.1:8000/${image.done_image_path}`}
                            alt={`Image ${image.id}`}
                            style={{ width: '200px', height: 'auto' }}
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="delete-selected-btn-wrapper">
                    <button className="delete-selected-btn" onClick={handleDelete}>
                    Usuń zaznaczone zdjęcie
                    </button>
                </div>
                )}
        </div>
    );
};

export default AddDoneImage;
