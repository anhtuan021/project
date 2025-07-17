import React, { useState } from 'react';
import { Lightbulb, Edit3, Upload, Sparkles, Palette, Eye, Download, Wand2 } from 'lucide-react';

const AIToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState('concept');
  const [conceptInput, setConceptInput] = useState('');
  const [generatedConcepts, setGeneratedConcepts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const tools = [
    {
      id: 'concept',
      name: 'Concept Generator',
      icon: Lightbulb,
      description: 'Generate creative photography concepts from text',
    },
    {
      id: 'editor',
      name: 'Auto-Editing Tool',
      icon: Edit3,
      description: 'AI-powered photo editing and enhancement',
    },
    {
      id: 'matcher',
      name: 'Style Matcher',
      icon: Sparkles,
      description: 'Find photographers with matching aesthetics',
    },
  ];

  const conceptCategories = [
    { name: 'Nature', active: false },
    { name: 'Portrait', active: true },
    { name: 'Urban', active: false },
    { name: 'Abstract', active: false },
  ];

  const sampleConcepts = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: 'Golden Hour Portrait',
      description: 'Warm, natural lighting with soft shadows'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: 'Urban Portrait',
      description: 'City backdrop with dramatic lighting'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: 'Studio Setup',
      description: 'Professional studio with controlled lighting'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: 'Natural Environment',
      description: 'Outdoor setting with natural elements'
    },
  ];

  const matchedPhotographers = [
    {
      id: 1,
      name: 'Photographer 1',
      specialty: 'Wedding',
      tags: ['Portrait'],
      match: '98% Match',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Photographer 2',
      specialty: 'Wedding',
      tags: ['Portrait'],
      match: '96% Match',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Photographer 3',
      specialty: 'Wedding',
      tags: ['Portrait'],
      match: '94% Match',
      avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateConcepts = () => {
    if (conceptInput.trim()) {
      // Simulate AI generation
      setGeneratedConcepts(sampleConcepts as any);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Powered Photography Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your photography workflow with our intelligent tools
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Selection */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">AI Tools</h3>
              <div className="space-y-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTool === tool.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tool.icon className={`h-5 w-5 ${
                        selectedTool === tool.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Concept Generator */}
            {selectedTool === 'concept' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Lightbulb className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Concept Generator</h2>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your theme or description
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={conceptInput}
                      onChange={(e) => setConceptInput(e.target.value)}
                      placeholder="e.g., romantic sunset wedding, modern urban portrait..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={generateConcepts}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                {/* Generated Concepts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sampleConcepts.map((concept) => (
                    <div key={concept.id} className="group cursor-pointer">
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img
                          src={concept.image}
                          alt={concept.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{concept.title}</h3>
                      <p className="text-gray-600 text-sm">{concept.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {conceptCategories.map((category, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        category.active
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Auto-Editing Tool */}
            {selectedTool === 'editor' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Edit3 className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Auto-Editing Tool</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Section */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Upload Your Photo</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Drag and drop your photo here
                        <br />
                        <span className="text-sm">or browse files</span>
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>

                    {uploadedImage && (
                      <div className="mt-6">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Preview Section */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">AI-Enhanced Preview</h3>
                    <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Eye className="h-12 w-12 mx-auto mb-2" />
                        <p>Enhanced photo will appear here</p>
                      </div>
                    </div>

                    {/* Editing Controls */}
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Brightness
                        </label>
                        <input
                          type="range"
                          className="w-full"
                          min="0"
                          max="100"
                          defaultValue="50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contrast
                        </label>
                        <input
                          type="range"
                          className="w-full"
                          min="0"
                          max="100"
                          defaultValue="50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saturation
                        </label>
                        <input
                          type="range"
                          className="w-full"
                          min="0"
                          max="100"
                          defaultValue="50"
                        />
                      </div>

                      <div className="flex gap-2 mt-6">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Auto Enhance
                        </button>
                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Style Matcher */}
            {selectedTool === 'matcher' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Style Matcher</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Reference Upload */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Upload a reference photo</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Upload a reference photo</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="reference-upload"
                      />
                      <label
                        htmlFor="reference-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>
                  </div>

                  {/* Matched Photographers */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Matched Photographers</h3>
                    <div className="space-y-4">
                      {matchedPhotographers.map((photographer) => (
                        <div key={photographer.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <img
                            src={photographer.avatar}
                            alt={photographer.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{photographer.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{photographer.specialty}</span>
                              <span>•</span>
                              <span>{photographer.tags.join(', ')}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-blue-600">
                              {photographer.match}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Style Tags */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Detected Style Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {['#Wedding', '#Portrait', '#Fashion', '#Street', '#Nature'].map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Get Started Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Get Started in Minutes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Generate Ideas</h3>
              <p className="text-blue-100">Create visual concepts from text descriptions</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Edit Automatically</h3>
              <p className="text-blue-100">Enhance your photos with AI-powered editing</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Match Styles</h3>
              <p className="text-blue-100">Find photographers with similar aesthetic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;