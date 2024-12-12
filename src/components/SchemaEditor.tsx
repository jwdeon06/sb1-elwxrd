import React from 'react';

interface SchemaEditorProps {
  schema: any;
  onSave: (schema: any) => void;
}

export default function SchemaEditor({ schema, onSave }: SchemaEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Schema Editor</h2>
      <p className="text-gray-500">Schema editor temporarily disabled for debugging.</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
        {JSON.stringify(schema, null, 2)}
      </pre>
    </div>
  );
}