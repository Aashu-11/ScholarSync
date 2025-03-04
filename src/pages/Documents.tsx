import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  FolderOpen, 
  Upload, 
  File, 
  FileText, 
  FileCheck, 
  FilePlus, 
  Trash2, 
  Search,
  Download,
  Calendar
} from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { documents as initialDocuments } from '../data/mockData';
import { Document } from '../types';

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState<{
    name: string;
    type: string;
    file: File | null;
  }>({
    name: '',
    type: 'other',
    file: null
  });

  // Filter documents based on search term and selected type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === null || doc.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Get all unique document types
  const documentTypes = Array.from(
    new Set(documents.map(doc => doc.type))
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setNewDocument(prev => ({
        ...prev,
        file: acceptedFiles[0],
        name: acceptedFiles[0].name
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const handleUpload = () => {
    if (newDocument.name && newDocument.type) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type as 'transcript' | 'recommendation' | 'essay' | 'resume' | 'other',
        uploadDate: new Date().toISOString().split('T')[0],
        fileUrl: newDocument.file ? URL.createObjectURL(newDocument.file) : '/documents/placeholder.pdf'
      };

      setDocuments([...documents, newDoc]);
      setUploadModalOpen(false);
      setNewDocument({
        name: '',
        type: 'other',
        file: null
      });
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'transcript':
        return <FileCheck className="text-blue-500" />;
      case 'recommendation':
        return <FileText className="text-purple-500" />;
      case 'essay':
        return <File className="text-green-500" />;
      case 'resume':
        return <FileText className="text-orange-500" />;
      default:
        return <File className="text-gray-500" />;
    }
  };

  const getDocumentTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      transcript: 'bg-blue-100 text-blue-800',
      recommendation: 'bg-purple-100 text-purple-800',
      essay: 'bg-green-100 text-green-800',
      resume: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type] || typeColors.other}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Include Sidebar component */}
      <div className="flex-1 ml-64 space-y-6 p-4 overflow-hidden">
        
        <motion.div 
                                      className="mb-8"
                                      initial={{ opacity: 0, y: -20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5 }}
                                    >
                                      <h1 className="text-3xl font-display font-bold primary-gradient-text">
                                      Document Management                </h1>
                                      <p className="text-gray-600 mt-2">
                                      Organize and manage your scholarship documents                                      </p>
                                    </motion.div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  fullWidth
                />
              </div>
              <div className="flex space-x-2">
                <select
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedType || ''}
                  onChange={(e) => setSelectedType(e.target.value === '' ? null : e.target.value)}
                >
                  <option value="">All Types</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
                <Button 
                  onClick={() => setUploadModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Upload size={18} />
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document, index) => (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <Card className="h-full hover:shadow-card-hover transition-shadow duration-300">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                      {getDocumentIcon(document.type)}
                      <h3 className="ml-2 font-semibold">{document.name}</h3>
                    </div>
                    <div>
                      {getDocumentTypeBadge(document.type)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar size={16} className="mr-1" />
                      <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 flex items-center justify-center"
                        onClick={() => window.open(document.fileUrl, '_blank')}
                      >
                        <Download size={16} className="mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                        onClick={() => deleteDocument(document.id)}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <FolderOpen size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No documents found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or upload a new document</p>
              <Button onClick={() => setUploadModalOpen(true)} className="mt-4">
                Upload Document
              </Button>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
                
                <div className="mb-4">
                  <Input
                    label="Document Name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                    fullWidth
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                  >
                    <option value="transcript">Transcript</option>
                    <option value="recommendation">Recommendation Letter</option>
                    <option value="essay">Essay</option>
                    <option value="resume">Resume</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-6 ${
                    isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <FilePlus className="mx-auto text-gray-400 mb-2" size={32} />
                  {newDocument.file ? (
                    <div>
                      <p className="text-sm font-medium text-gray-700">{newDocument.file.name}</p>
                      <p className="text-xs text-gray-500">{(newDocument.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Drag & drop a file here, or click to select</p>
                      <p className="text-xs text-gray-500">Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setUploadModalOpen(false);
                      setNewDocument({ name: '', type: 'other', file: null });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpload}
                    disabled={!newDocument.name || !newDocument.type}
                  >
                    Upload Document
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;