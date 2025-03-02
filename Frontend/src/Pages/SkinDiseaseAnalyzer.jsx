import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import Base64 from "base64-js";

const API_KEY = "AIzaSyAr6KT_yxWLcazNZB_6TIb7GrVnq82VGfw";

const SkinDiseaseAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState(
    "Explain the user about the skin disease that they are having and provide immediate measures, long-term prevention, and recommended diet."
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      // Convert Image to Base64
      const imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(image);
        reader.onload = () => resolve(Base64.fromByteArray(new Uint8Array(reader.result)));
        reader.onerror = reject;
      });

      const mimeType = image.type;

      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
            {
              text: `${prompt}

              Please format the response in the following structured way:
              🩺 **Diagnosis**: [Skin Disease Name]
              🚑 **Immediate Measures**:
              - Measure 1
              - Measure 2

              🛡 **Long-Term Prevention**:
              - Prevention 1
              - Prevention 2

              🥗 **Recommended Diet**:
              - Food 1
              - Food 2
              `,
            },
          ],
        },
      ];

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContentStream({ contents });

      // let buffer = [];
      // for await (let response of result.stream) {
      //   buffer.push(response.text());
        
      //   // Try to parse the markdown response into sections
      //   const text = buffer.join("");
        
      //   // Extract sections using regex
      //   const diagnosisMatch = text.match(/🩺\s*\*\*Diagnosis\*\*:\s*(.*?)(?=🚑|\n\n|$)/s);
      //   const measuresMatch = text.match(/🚑\s*\*\*Immediate Measures\*\*:(.*?)(?=🛡|\n\n|$)/s);
      //   const preventionMatch = text.match(/🛡\s*\*\*Long-Term Prevention\*\*:(.*?)(?=🥗|\n\n|$)/s);
      //   const dietMatch = text.match(/🥗\s*\*\*Recommended Diet\*\*:(.*?)(?=\n\n|$)/s);
        
      //   // Update state with parsed sections
      //   setResults({
      //     diagnosis: diagnosisMatch ? diagnosisMatch[1].trim() : "Analyzing...",
      //     measures: measuresMatch ? measuresMatch[1] : "Analyzing...",
      //     prevention: preventionMatch ? preventionMatch[1] : "Analyzing...",
      //     diet: dietMatch ? dietMatch[1] : "Analyzing...",
      //     rawText: text
      //   });
      // }

      let fullResponse = "";
      for await (let response of result.stream) {
        fullResponse += await response.text();
      }

      console.log("Full AI Response:", fullResponse);

      // Debugging: Check if fullResponse is correctly logged
      if (!fullResponse) {
        console.error("Full AI Response is empty!");
      }

      // Improved regex patterns with better matching
      const diagnosisMatch = fullResponse.match(/🩺\s*\*\*Diagnosis\*\*:\s*(.*?)(?=\n|\r|$)/);
      const measuresMatch = fullResponse.match(/🚑\s*\*\*Immediate Measures.*?\*\*:\s*([\s\S]*?)(?=🛡|\*\*Again|$)/);
      const preventionMatch = fullResponse.match(/🛡\s*\*\*Long-Term Prevention.*?\*\*:\s*([\s\S]*?)(?=🥗|\*\*Again|$)/);
      const dietMatch = fullResponse.match(/🥗\s*\*\*Recommended Diet.*?\*\*:\s*([\s\S]*?)(?=\*\*Again|$)/);

      // Debugging: Log matches
      console.log("Diagnosis Match:", diagnosisMatch ? diagnosisMatch[1] : "Not detected");
      console.log("Measures Match:", measuresMatch ? measuresMatch[1] : "Not detected");
      console.log("Prevention Match:", preventionMatch ? preventionMatch[1] : "Not detected");
      console.log("Diet Match:", dietMatch ? dietMatch[1] : "Not detected");

      // Set results after extracting the data
      setResults({
        diagnosis: diagnosisMatch ? diagnosisMatch[1].trim() : "Not detected",
        measures: measuresMatch ? measuresMatch[1].trim() : "Not detected",
        prevention: preventionMatch ? preventionMatch[1].trim() : "Not detected",
        diet: dietMatch ? dietMatch[1].trim() : "Not detected",
        rawText: fullResponse
      });

    } catch (error) {
      setResults({
        diagnosis: "Error occurred",
        measures: `Error: ${error.message}`,
        prevention: "Please try again",
        diet: "Please try again",
        rawText: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  console.log("results ",results)

  const speakOverallResult = () => {
    if ("speechSynthesis" in window) {
      const combinedText = `
        Diagnosis: ${results.diagnosis}. 
        Immediate Measures: ${results.measures.replace(/<\/?[^>]+(>|$)/g, "")}. 
        Long-Term Prevention: ${results.prevention.replace(/<\/?[^>]+(>|$)/g, "")}. 
        Recommended Diet: ${results.diet.replace(/<\/?[^>]+(>|$)/g, "")}.
      `;
  
      const utterance = new SpeechSynthesisUtterance(combinedText);
      utterance.lang = "en-US"; // Set language
      utterance.rate = 1; // Adjust speech speed
      utterance.pitch = 1; // Adjust pitch
  
      // Start speech synthesis
      window.speechSynthesis.cancel(); // Stop any previous speech
      window.speechSynthesis.speak(utterance);
    }
  };
  
  //Function to stop speech
  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop speech immediately
    }
  };
  
  useEffect(() => {
    if (results) {
      speakOverallResult();
    }
  }, [results]);


  

  return (
    <div className="mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        <span className="mr-2">🩺</span>Skin Disease Analyzer
      </h1>
      
      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        
        
        <form onSubmit={analyzeImage} className="space-y-4">
          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload a clear image of the affected skin area:</label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label 
              htmlFor="imageInput" 
              className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition"
            >
              Choose Image
            </label>
            
            {imagePreview && (
              <div className="mt-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-40 mx-auto rounded"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : "Analyze Image"}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-700">Analyzing your image...</p>
        </div>
      ) : results ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Analysis Results</h2>
          <button
            onClick={stopSpeech}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center ml-auto"
          >
            🔇 Stop Audio
          </button>
          </div>
          <div className="space-y-6">
            {/* Diagnosis Section */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="flex items-center text-lg font-semibold text-blue-700">
                <span className="mr-2">🩺</span>Diagnosis
              </h3>
              <p className="mt-2 text-blue-900 font-medium">{results.diagnosis}</p>
            </div>
            
            {/* Immediate Measures Section */}
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="flex items-center text-lg font-semibold text-red-700">
                <span className="mr-2">🚑</span>Immediate Measures
              </h3>
              <div className="mt-2 text-red-900" dangerouslySetInnerHTML={{__html: new MarkdownIt().render(results.measures)}}></div>
            </div>
            
            {/* Long-Term Prevention Section */}
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="flex items-center text-lg font-semibold text-purple-700">
                <span className="mr-2">🛡</span>Long-Term Prevention
              </h3>
              <div className="mt-2 text-purple-900" dangerouslySetInnerHTML={{__html: new MarkdownIt().render(results.prevention)}}></div>
            </div>
            
            {/* Recommended Diet Section */}
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="flex items-center text-lg font-semibold text-green-700">
                <span className="mr-2">🥗</span>Recommended Diet
              </h3>
              <div className="mt-2 text-green-900" dangerouslySetInnerHTML={{__html: new MarkdownIt().render(results.diet)}}></div>
            </div>
            
            <div className="text-xs text-gray-500 italic text-center mt-4">
              Disclaimer: This is an AI-powered analysis and should not replace professional medical advice.
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          <p>Upload an image and click "Analyze" to see results here</p>
        </div>
      )}

    </div>
  );
};

export default SkinDiseaseAnalyzer;