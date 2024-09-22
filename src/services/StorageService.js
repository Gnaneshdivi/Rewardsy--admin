// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDv1bdyDivwMM0_U69DDMuqTaWP4XM9eTw",
    authDomain: "rewardsy-app.firebaseapp.com",
    projectId: "rewardsy-app",
    storageBucket: "rewardsy-app.appspot.com",
    messagingSenderId: "925031745113",
    appId: "1:925031745113:web:4bfb9e5acaa6989e9ad348",
    measurementId: "G-R4RMBWDZN3"
  };
  
  export const FILE_TYPES = Object.freeze({
    DP: 'dp',
    BANNER: 'banner',
    STORE: 'store',
    CONTENT: 'content'
  });


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Storage service to handle file uploads
const StorageService = {
    async uploadFileToStorage(file, enumType) {
        if (!file) {
          throw new Error('No file provided for upload');
        }
      
        try {
          const storage = getStorage(); // Initialize Firebase Storage
          
          // Define storage directory based on the enumType
          let storagePath = '';
          switch (enumType) {
            case FILE_TYPES.DP:
              storagePath = `dp/${file.name}`;
              break;
            case FILE_TYPES.BANNER:
              storagePath = `banner/${file.name}`;
              break;
            case FILE_TYPES.STORE:
              storagePath = `store/${file.name}`;
              break;
            case FILE_TYPES.CONTENT:
              storagePath = `content/${file.name}`;
              break;
            default:
              throw new Error('Invalid file type for storage');
          }
      
          // Create a reference to the file's directory in Firebase Storage
          const fileRef = ref(storage, storagePath);
          
          // Upload the file to the specified directory
          await uploadBytes(fileRef, file);
          
          // Get and return the file's download URL
          const downloadUrl = await getDownloadURL(fileRef);
          
          return downloadUrl;
        } catch (error) {
          console.error('Error uploading file:', error.message);
          throw error;
        }
      }
};

export default StorageService;
