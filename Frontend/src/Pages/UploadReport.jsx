import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image, AlertCircle, Check } from 'lucide-react';

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedText, setExtractedText] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
  
  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setIsUploading(false);
    setUploadProgress(0);
    setExtractedText(null);
    setError(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Check file type
    if (!allowedFileTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or image file (JPEG, PNG, GIF).');
      return;
    }
    
    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB.');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    
    // Generate preview
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === 'application/pdf') {
      // For PDFs, just show a PDF icon as preview
      setPreview('pdf');
    }
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      processFile(event.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 200);
      
      // Replace with your actual upload endpoint
      const response = await fetch('/api/health/upload-report', {
        method: 'POST',
        body: formData,
        // Add this if you need to track actual upload progress with XMLHttpRequest
        // onUploadProgress: (progressEvent) => {
        //   const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //   setUploadProgress(percentage);
        // },
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      setUploadProgress(100);
      
      // Simulate OCR processing
      setTimeout(async () => {
        // Replace with your actual OCR endpoint
        try {
          const ocrResponse = await fetch(`/api/health/extract-text?fileId=${file.name}`);
          const ocrData = await ocrResponse.json();
          
          setExtractedText(ocrData.text || 'No text could be extracted from this document.');
          setIsUploading(false);
        } catch (ocrError) {
          console.error('OCR processing failed:', ocrError);
          setError('Text extraction failed. Please try again later.');
          setIsUploading(false);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setError('Upload failed. Please try again later.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // For demo purposes
  const simulateUploadAndOCR = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
    
    // Simulate completion after 5 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Simulate OCR result
      setTimeout(() => {
        setExtractedText(`[OCR RESULT]
Date: 02/15/2025
Patient Name: John Doe
Patient ID: 123456789

LABORATORY RESULTS
Blood Glucose: 92 mg/dL (Reference: 70-99 mg/dL)
Total Cholesterol: 185 mg/dL (Reference: <200 mg/dL)
HDL Cholesterol: 55 mg/dL (Reference: >40 mg/dL)
LDL Cholesterol: 110 mg/dL (Reference: <100 mg/dL)
Triglycerides: 120 mg/dL (Reference: <150 mg/dL)

RECOMMENDATIONS
- Maintain current diet and exercise routine
- Follow up in 6 months
- Continue current medication`);
        setIsUploading(false);
      }, 2000);
    }, 5000);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Upload Health Report</h1>
        <p className="mt-1 text-sm text-gray-600">
          Upload your medical reports, lab results, or prescriptions. Our system will automatically extract important information.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-900">
                Drag and drop your file here, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PDF, JPEG, PNG, GIF (Max 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Preview Section */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {preview === 'pdf' ? (
                  <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText size={32} className="text-red-500" />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={preview} 
                      alt="Document preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                    </p>
                  </div>
                  <button 
                    onClick={resetUpload}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Progress bar */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-medium text-gray-900">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="mt-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-blue-600 transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Error message */}
                {error && (
                  <div className="mt-4 flex items-center text-sm text-red-600">
                    <AlertCircle size={16} className="mr-1" />
                    {error}
                  </div>
                )}
                
                {/* Upload completed message */}
                {uploadProgress === 100 && !isUploading && (
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <Check size={16} className="mr-1" />
                    Upload complete! Processing document...
                  </div>
                )}
              </div>
            </div>
            
            {/* Upload Button */}
            {!isUploading && uploadProgress < 100 && (
              <button
                onClick={simulateUploadAndOCR} // Using simulation for demo
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Report
              </button>
            )}
            
            {/* OCR Results */}
            {extractedText && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Extracted Information</h3>
                <div className="bg-gray-50 rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
                  {extractedText}
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Information
                  </button>
                  <button
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save to Health Record
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Additional Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Why Upload Health Reports?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Keep all your health data in one secure place</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Our AI will analyze your reports for trends and health insights</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Easily share with your healthcare providers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Track your health progress over time</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-purple-900 mb-2">Supported Reports</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Lab test results (blood work, urine tests, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Medical prescriptions and medication lists</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Doctor visit summaries and discharge papers</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Imaging reports (X-rays, MRIs, CT scans)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Vaccination records</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;