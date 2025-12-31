import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FileText, UploadCloud, PenTool, CheckCircle } from 'lucide-react';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  status: DocStatus;
  url?: string;
};

const DocumentProcessingChamber: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 1,
      name: 'Investment Agreement.pdf',
      type: 'Agreement',
      size: '2.4 MB',
      uploadedBy: 'John Doe',
      status: 'In Review'
    },
    {
      id: 2,
      name: 'Partnership Contract.pdf',
      type: 'Contract',
      size: '1.8 MB',
      uploadedBy: 'Jane Smith',
      status: 'Signed'
    },
    {
      id: 3,
      name: 'Project Proposal.docx',
      type: 'Proposal',
      size: '0.9 MB',
      uploadedBy: 'Robert Joh',
      status: 'Draft'
    }
  ]);

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const sigRef = useRef<SignatureCanvas>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const newDoc: DocumentItem = {
      id: documents.length + 1,
      name: file.name,
      type: file.name.split('.').pop() || 'Document',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploadedBy: 'You',
      status: 'Draft',
      url: URL.createObjectURL(file)
    };

    setDocuments([...documents, newDoc]);
  };

  const signDocument = () => {
    setDocuments(prev =>
      prev.map(d =>
        d.id === selectedDoc?.id ? { ...d, status: 'Signed' } : d
      )
    );
    sigRef.current?.clear();
    setShowSignature(false);
  };

  const statusBadge = (status: DocStatus) => {
    const map = {
      Draft: 'bg-gray-200 text-gray-700',
      'In Review': 'bg-yellow-200 text-yellow-800',
      Signed: 'bg-green-200 text-green-700'
    };
    return (
      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${map[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Document Processing Chamber</h1>
        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          <UploadCloud size={18} />
          Upload Document
          <input type="file" hidden onChange={handleUpload} />
        </label>
      </div>

      {/* Upload + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upload Box */}
        <div className="lg:col-span-2 bg-white border-2 border-dashed rounded p-6 flex flex-col items-center justify-center text-gray-500">
          <UploadCloud size={40} />
          <p className="mt-2 text-center">
            Drag & drop files here, or click Upload<br />
            <span className="text-xs">PDF, DOC, DOCX | Max 10MB</span>
          </p>
        </div>

        {/* Preview */}
        <div className="bg-white border rounded p-4 flex flex-col items-center justify-center">
          <FileText size={40} className="text-gray-300" />
          <p className="text-gray-500 text-sm mt-2">
            {selectedDoc ? selectedDoc.name : 'Select a document to preview'}
          </p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-3">Document</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Uploaded By</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <FileText size={16} />
                  {doc.name}
                </td>
                <td className="p-3">{doc.type}</td>
                <td className="p-3">{statusBadge(doc.status)}</td>
                <td className="p-3">{doc.uploadedBy}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="text-blue-600 text-sm"
                  >
                    View
                  </button>

                  {doc.status !== 'Signed' && (
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowSignature(true);
                      }}
                      className="text-purple-600 text-sm flex items-center gap-1"
                    >
                      <PenTool size={14} /> Sign
                    </button>
                  )}

                  {doc.status === 'Signed' && (
                    <span className="text-green-600 flex items-center gap-1 text-sm">
                      <CheckCircle size={14} /> Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Modal */}
      {showSignature && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-semibold mb-2">E-Signature</h3>
            <SignatureCanvas
              ref={sigRef}
              canvasProps={{ className: 'border w-full h-40 rounded' }}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => sigRef.current?.clear()}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Clear
              </button>
              <button
                onClick={signDocument}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Sign
              </button>
              <button
                onClick={() => setShowSignature(false)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentProcessingChamber;
