import React, { useState, useEffect } from 'react';
import { Upload, Download, LogOut, BookOpen, FileText, User } from 'lucide-react';

export default function LibraryManagementSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  
  const [regNumber, setRegNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  
  const [students, setStudents] = useState([]);
  const [pastPapers, setPastPapers] = useState([]);
  
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('');
  const [uploadYear, setUploadYear] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const studentsData = localStorage.getItem('students');
      const papersData = localStorage.getItem('pastPapers');
      
      if (studentsData) {
        setStudents(JSON.parse(studentsData));
      }
      if (papersData) {
        setPastPapers(JSON.parse(papersData));
      }
    } catch (error) {
      console.log('No existing data found');
    }
  };

  const saveStudents = (updatedStudents) => {
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  };

  const savePastPapers = (updatedPapers) => {
    localStorage.setItem('pastPapers', JSON.stringify(updatedPapers));
    setPastPapers(updatedPapers);
  };

  const handleRegister = () => {
    const existingStudent = students.find(s => s.regNumber === regNumber);
    if (existingStudent) {
      alert('Registration number already exists!');
      return;
    }

    const newStudent = { regNumber, studentId, name: studentName };
    saveStudents([...students, newStudent]);
    alert('Registration successful! You can now login.');
    setShowRegister(false);
    setRegNumber('');
    setStudentId('');
    setStudentName('');
  };

  const handleLogin = () => {
    const student = students.find(s => s.regNumber === regNumber && s.studentId === studentId);
    if (student) {
      setCurrentUser(student);
      setIsLoggedIn(true);
      setRegNumber('');
      setStudentId('');
    } else {
      alert('Invalid registration number or ID!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUploadPaper = () => {
    if (!uploadFile) {
      alert('Please select a file to upload');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newPaper = {
        id: Date.now(),
        title: uploadTitle,
        subject: uploadSubject,
        year: uploadYear,
        fileName: uploadFile.name,
        fileData: event.target.result,
        uploadedBy: currentUser.name,
        uploadDate: new Date().toISOString()
      };

      savePastPapers([...pastPapers, newPaper]);
      setUploadTitle('');
      setUploadSubject('');
      setUploadYear('');
      setUploadFile(null);
      alert('Past paper uploaded successfully!');
    };
    reader.readAsDataURL(uploadFile);
  };

  const handleDownload = (paper) => {
    const link = document.createElement('a');
    link.href = paper.fileData;
    link.download = paper.fileName;
    link.click();
  };

  const handleDeletePaper = (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      const updatedPapers = pastPapers.filter(p => p.id !== paperId);
      savePastPapers(updatedPapers);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Library System</h1>
          </div>

          {!showRegister ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Login</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <input type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID (Password)</label>
                <input type="password" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <button onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">Login</button>
              <button onClick={() => setShowRegister(true)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">Register New Student</button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Register</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <input type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID (This will be your password)</label>
                <input type="password" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <button onClick={handleRegister} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">Register</button>
              <button onClick={() => setShowRegister(false)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">Back to Login</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">School Library System</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{currentUser.name}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="w-6 h-6 text-indigo-600" />
              Upload Past Paper
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title</label>
                <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="e.g., Final Exam" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" value={uploadSubject} onChange={(e) => setUploadSubject(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="e.g., Mathematics" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="text" value={uploadYear} onChange={(e) => setUploadYear(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="e.g., 2024" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select File (PDF, DOC, etc.)</label>
                <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" accept=".pdf,.doc,.docx,.txt" />
              </div>
              <button onClick={handleUploadPaper} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Paper
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              Available Past Papers ({pastPapers.length})
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pastPapers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No past papers uploaded yet</p>
              ) : (
                pastPapers.map((paper) => (
                  <div key={paper.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">{paper.title}</h3>
                    <p className="text-sm text-gray-600">Subject: {paper.subject}</p>
                    <p className="text-sm text-gray-600">Year: {paper.year}</p>
                    <p className="text-xs text-gray-500 mt-1">Uploaded by: {paper.uploadedBy}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleDownload(paper)} className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      {currentUser.regNumber === paper.uploadedBy || currentUser.name === paper.uploadedBy ? (
                        <button onClick={() => handleDeletePaper(paper.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm">Delete</button>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}