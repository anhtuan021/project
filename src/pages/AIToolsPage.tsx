import React, { useState } from 'react';
import { Lightbulb, Edit3, Upload, Sparkles, Palette, Eye, Download, Wand2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AIToolsPage = () => {
  const { t } = useLanguage();
  const [selectedTool, setSelectedTool] = useState('concept');
  const [conceptInput, setConceptInput] = useState('');
  const [generatedConcepts, setGeneratedConcepts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const tools = [
    {
      id: 'concept',
      name: t('aiTools.conceptGenerator'),
      icon: Lightbulb,
      description: t('aiTools.conceptDesc'),
    },
    {
      id: 'editor',
      name: t('aiTools.autoEditing'),
      icon: Edit3,
      description: t('aiTools.autoEditingDesc'),
    },
    {
      id: 'matcher',
      name: t('aiTools.styleMatcher'),
      icon: Sparkles,
      description: t('aiTools.styleMatcherDesc'),
    },
  ];

  const conceptCategories = [
    { name: t('aiTools.categoryNature'), active: false },
    { name: t('aiTools.categoryPortrait'), active: true },
    { name: t('aiTools.categoryUrban'), active: false },
    { name: t('aiTools.categoryAbstract'), active: false },
  ];

  const sampleConcepts = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: t('aiTools.conceptGoldenHour'),
      description: t('aiTools.conceptGoldenHourDesc')
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: t('aiTools.conceptUrban'),
      description: t('aiTools.conceptUrbanDesc')
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: t('aiTools.conceptStudio'),
      description: t('aiTools.conceptStudioDesc')
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      title: t('aiTools.conceptNatural'),
      description: t('aiTools.conceptNaturalDesc')
    },
  ];

  const matchedPhotographers = [
    {
      id: 1,
      name: t('aiTools.photographer1'),
      specialty: t('aiTools.specialtyWedding'),
      tags: [t('aiTools.tagPortrait')],
      match: t('aiTools.match98'),
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: t('aiTools.photographer2'),
      specialty: t('aiTools.specialtyWedding'),
      tags: [t('aiTools.tagPortrait')],
      match: t('aiTools.match96'),
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: t('aiTools.photographer3'),
      specialty: t('aiTools.specialtyWedding'),
      tags: [t('aiTools.tagPortrait')],
      match: t('aiTools.match94'),
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
              {t('aiTools.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('aiTools.subtitle')}
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
              <h3 className="font-semibold text-gray-900 mb-4">{t('aiTools.aiToolsTitle')}</h3>
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
                  <h2 className="text-2xl font-bold text-gray-900">{t('aiTools.conceptGenerator')}</h2>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('aiTools.enterTheme')}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={conceptInput}
                      onChange={(e) => setConceptInput(e.target.value)}
                      placeholder={t('aiTools.themePlaceholder')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={generateConcepts}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t('aiTools.generate')}
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
                  <h2 className="text-2xl font-bold text-gray-900">{t('aiTools.autoEditing')}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Section */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">{t('aiTools.uploadPhoto')}</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        {t('aiTools.dragDrop')}
                        <br />
                        <span className="text-sm">{t('aiTools.orBrowseFiles')}</span>
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
                        {t('aiTools.browseFiles')}
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
                    <h3 className="font-semibold text-gray-900 mb-4">{t('aiTools.aiEnhanced')}</h3>
                    <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Eye className="h-12 w-12 mx-auto mb-2" />
                        <p>{t('aiTools.enhancedPreview')}</p>
                      </div>
                    </div>

                    {/* Editing Controls */}
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('aiTools.brightness')}
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
                          {t('aiTools.contrast')}
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
                          {t('aiTools.saturation')}
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
                          {t('aiTools.autoEnhance')}
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
                  <h2 className="text-2xl font-bold text-gray-900">{t('aiTools.styleMatcher')}</h2>
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
