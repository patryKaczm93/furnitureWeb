import React, { useState } from "react";
import './AddProject.scss';

const AddProject = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!projectDescription || !projectImage) {
      setError('All fields are required.');
      return;
    }
  
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('description', projectDescription);
    formData.append('file', projectImage); 
    console.log('user_id:', userId);
    console.log('description:', projectDescription);
    console.log('file:', projectImage);
  
    try {
      const response = await fetch('http://localhost:8000/upload_image/', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.msg);
        setProjectDescription('');
        setProjectImage(null);
        setImageName('');
      } else {
        setError(result.detail || 'Something went wrong!');
      }
    } catch (error) {
      setError('An error occurred while uploading the image.');
    }
  };

  const handleImageChange = (e) => {
    setProjectImage(e.target.files[0]);
    setImageName(e.target.files[0]?.name || '');
  };

  return (
    <div className="add-project-container">
      <h2>Add Project</h2>
      <p className="project-measurements-info">
        Jedyne co potrzebujemy od Ciebie na początek to zwymiarowanie wnętrza, a to nie jest trudne. Wystarczy do tego zwykła miarka. 
        Sprawdź na końcu czy wszystko się zgadza!
        <ul>
          <li>Zmierz wysokość pomieszczenia (podłoga-sufit).</li>
          <li>Zmierz odległości między ścianami i od narożników do drzwi.</li>
          <li>Zmierz wymiary okien i drzwi, uwzględniając odległości od podłogi, sufitu, narożników.</li>
          <li>Zaznacz kierunek otwierania drzwi i okien.</li>
          <li>Zmierz elementy wystające (kratki, kaloryfery, rury) oraz zaznacz gniazdka i włączniki.</li>
        </ul>
        <p>Dodaj zdjęcie w formacie PDF, JPG, PNG lub innym. Jeśli plik jest w innym formacie, proszę go zmienić.</p>
      </p>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="projectImage">Add Project Image</label>
          <input
            type="file"
            id="projectImage"
            onChange={handleImageChange}
            accept=".pdf, .jpg, .jpeg, .png"
          />
          {imageName && <div className="file-name">{imageName}</div>}
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
