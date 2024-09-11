import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase"; // Import Firestore
import "./homepage.css";

const Form = ({ title }) => {
  const [formData, setFormData] = useState({
    storeName: "",
    storeOwner: "",
    phoneNumber: "",
    location: "",
    images: "",
    description: "",
    socialMediaLinks: "",
    file: null, // Add a new state for file
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  useEffect(() => {
    const docData = {
      stringExample: "Hello world!",
      booleanExample: true,
      numberExample: 3.14159265,
      arrayExample: [5, true, "hello"],
      nullExample: null,
      objectExample: {
        a: 5,
        b: {
          nested: "foo",
        },
      },
    };

    const writeData = async () => {
      try {
        // Use `setDoc` to write data to Firestore
        await setDoc(doc(db, "data"), docData);
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    };

    writeData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let fileUrl = "";
  
    if (formData.file) {
      try {
        const storage = getStorage();
        const fileRef = ref(storage, `files/${formData.file.name}`);
        await uploadBytes(fileRef, formData.file);
        fileUrl = await getDownloadURL(fileRef);
      } catch (error) {
        console.error("Error uploading file:", error.message);
        alert("Error uploading file: " + error.message);
        return; // Stop form submission if file upload fails
      }
    }
  
    try {
      const { file, ...dataWithoutFile } = formData;
      const dataToSave = { ...dataWithoutFile, fileUrl };
  
      await addDoc(collection(db, "store-test"), dataToSave);
      alert("Form submitted successfully");
    } catch (err) {
      console.error("Error submitting form:", err.message);
      alert("Error submitting form: " + err.message);
    }
  };  

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label>Store Name:</label>
        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={handleInputChange}
          required
        />

        <label>Store Owner Name:</label>
        <input
          type="text"
          name="storeOwner"
          placeholder="Store Owner Name"
          value={formData.storeOwner}
          onChange={handleInputChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />

        <label>Location of the store:</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />

        <label>Images of the store, in links format:</label>
        <input
          type="text"
          name="images"
          placeholder="Image links"
          value={formData.images}
          onChange={handleInputChange}
          required
        />

        <label>Description of the store:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label>Links of social media handles:</label>
        <input
          type="text"
          name="socialMediaLinks"
          placeholder="Social Media Links"
          value={formData.socialMediaLinks}
          onChange={handleInputChange}
          required
        />

        <label>Upload File:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
