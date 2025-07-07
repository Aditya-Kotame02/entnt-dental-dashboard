import React from 'react';
import { FaFilePdf, FaFileImage, FaFileAlt } from 'react-icons/fa';

const FilePreview = ({ files }) => {
  if (!files || files.length === 0) return null;

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg'].includes(ext)) return <FaFileImage className="text-green-500 mr-2" />;
    if (ext === 'pdf') return <FaFilePdf className="text-red-500 mr-2" />;
    return <FaFileAlt className="text-gray-500 mr-2" />;
  };

  const isImage = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    return ['png', 'jpg', 'jpeg'].includes(ext);
  };

  return (
    <div className="space-y-3 mt-3">
      <h4 className="text-sm font-semibold">Attachments:</h4>
      {files.map((file, idx) => (
        <div key={idx} className="flex items-start space-x-3">
          <div className="text-xl mt-1">{getFileIcon(file.name)}</div>
          <div>
            <a
              href={file.url}
              download={file.name}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              {file.name}
            </a>
            {isImage(file.name) && (
              <div className="mt-2">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-32 h-auto rounded border"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;
