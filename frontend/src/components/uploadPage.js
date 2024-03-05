// App.js
import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";
import ReactMarkdown from 'react-markdown';


const fileTypeIcons = {
  'text/plain': '📄',
  'application/pdf': '📄',
  'application/msword': '📄',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📄',
};

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileMessage, setFileMessage] = useState('');
  const [loading, setLoading] = useState(true);



  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const filePath = response.data;
        console.log(filePath)
        // Fetch or display the content of the generated JSON file as needed
        // For example, you might want to fetch the content and log it
        
        setFileMessage(filePath.data)
        setLoading(false)
        console.log(`Story generated successfully.`);
      } else {
        console.error('Failed to generate story.');
      }

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Extract CodeSnippet component to reuse
const CodeSnippet = () => {
  const markdownContent = `${fileMessage}`; 

  return (
      <ReactMarkdown className="markdown-container">{markdownContent}</ReactMarkdown>
  );
};




  const handleDelete = () => {
    setFile(null);
    setFileMessage('');
  };

  return (
    <div className="w-screen h-full" style={{
      background: "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)",
      minHeight: "h-full",  // Set minHeight to ensure the gradient covers the entire height
      height: "100%",  // Set minHeight to ensure the gradient covers the entire height
      transition: "background 0.5s",  // Optional: Add transition for a smooth effect
    }}>
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-5/12 w-full">
          <h1 className="my-4 text-5xl font-bold leading-tight">
          From Words to Code, Transforming Ideas into Execution
          </h1>
          <p className="text-2xl mb-8">
            Translating BPMN or XML to code snippets, one keystroke at a time.
          </p>
          <div className="flex justify-center mx-auto">
            <input
              type="file"
              className="hidden"
              id="file-input"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-input"
              className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8 cursor-pointer mr-4"
            >
              Select file
            </label>
            <button
              className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8 mr-4"
              onClick={handleUpload}
              disabled={!file}
            >
              Upload
            </button>
          </div>
          {file && (
            <div className="mt-4 flex items-center">
              <h2 className="text-xl font-bold">File Preview:</h2>
              <p className="text-gray-300 flex items-center ml-2">
                {fileTypeIcons[file.type] || '📄'} <span className="ml-2">{file.name}</span>
              </p>
              <button className="bg-white text-red-500 font-bold rounded-full py-4 px-8 ml-4" onClick={handleDelete}>
                🗑️
              </button>
            </div>
          )}
        </div>  
      </div>
      {!loading && (
        <div className="flex items-center justify-center">
        <CodeSnippet />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
