
'use client';

import { useState, useEffect } from 'react';
import { 
  Folder, 
  Plus, 
  Trash2, 
  FileText, 
  Upload, 
  Search, 
  Loader2,
  RefreshCw,
  ChevronRight,
  Database,
  Filter,
  Info,
  ExternalLink
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingStores, setLoadingStores] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [query, setQuery] = useState('');
  const [metadataFilter, setMetadataFilter] = useState('');
  const [response, setResponse] = useState('');
  const [querying, setQuerying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [uploadMetadata, setUploadMetadata] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (selectedStore) {
      fetchDocuments(selectedStore.name);
    } else {
      setDocuments([]);
    }
  }, [selectedStore]);

  const fetchStores = async () => {
    setLoadingStores(true);
    try {
      const res = await fetch('/api/stores');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStores(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingStores(false);
    }
  };

  const fetchDocuments = async (storeName: string) => {
    setLoadingDocs(true);
    try {
      const res = await fetch(`/api/documents?storeName=${encodeURIComponent(storeName)}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDocuments(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName) return;
    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: newStoreName }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setNewStoreName('');
      setIsCreatingStore(false);
      fetchStores();
    } catch (err: any) {
      alert('Error creating store: ' + err.message);
    }
  };

  const handleDeleteStore = async (name: string) => {
    if (!confirm('Are you sure you want to delete this store? All indexed data will be lost.')) return;
    try {
      const res = await fetch(`/api/stores/${name}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (selectedStore?.name === name) setSelectedStore(null);
      fetchStores();
    } catch (err: any) {
      alert('Error deleting store: ' + err.message);
    }
  };

  const handleDeleteDocument = async (name: string) => {
    if (!confirm('Are you sure you want to delete this document from the store?')) return;
    try {
      const res = await fetch(`/api/documents?documentName=${encodeURIComponent(name)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      fetchDocuments(selectedStore.name);
    } catch (err: any) {
      alert('Error deleting document: ' + err.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedStore) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('storeName', selectedStore.name);
    
    if (uploadMetadata) {
      formData.append('metadata', uploadMetadata);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      alert('File uploaded and import started!');
      fetchDocuments(selectedStore.name);
    } catch (err: any) {
      alert('Error uploading file: ' + err.message);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !selectedStore) return;

    setQuerying(true);
    setResponse('');
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          storeNames: [selectedStore.name],
          metadataFilter: metadataFilter || undefined
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from model.';
      setResponse(text);
    } catch (err: any) {
      alert('Error querying: ' + err.message);
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar - Stores */}
      <div className="w-80 border-r bg-white flex flex-col shadow-sm z-10">
        <div className="p-4 border-b flex items-center justify-between bg-slate-50/50">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Database className="text-blue-600" size={24} />
            Gemini Store
          </h1>
          <button 
            onClick={fetchStores}
            className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"
            title="Refresh Stores"
          >
            <RefreshCw size={16} className={loadingStores ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="p-4">
          {isCreatingStore ? (
            <form onSubmit={handleCreateStore} className="space-y-2 animate-in fade-in slide-in-from-top-1">
              <input
                autoFocus
                type="text"
                placeholder="Store Display Name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingStore(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsCreatingStore(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 py-3 rounded-xl text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all font-medium text-sm"
            >
              <Plus size={18} />
              <span>New Store</span>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loadingStores ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-3">
              <Loader2 className="animate-spin text-blue-500" />
              <span className="text-xs text-slate-400 font-medium">Loading stores...</span>
            </div>
          ) : stores.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Database className="mx-auto text-slate-200 mb-3" size={32} />
              <p className="text-slate-400 text-sm">No stores found. Create one to start indexing files.</p>
            </div>
          ) : (
            stores.map((store) => (
              <div
                key={store.name}
                onClick={() => setSelectedStore(store)}
                className={cn(
                  "group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all",
                  selectedStore?.name === store.name 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-[1.02]" 
                    : "hover:bg-slate-100 text-slate-600"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Folder size={18} className={selectedStore?.name === store.name ? "text-blue-100" : "text-slate-400"} />
                  <span className="truncate font-bold text-sm">{store.displayName || store.name.split('/').pop()}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStore(store.name);
                  }}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    selectedStore?.name === store.name 
                      ? "hover:bg-blue-500 text-blue-100" 
                      : "opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedStore ? (
          <>
            {/* Header */}
            <header className="bg-white border-b px-8 py-6 flex items-center justify-between shadow-sm z-0">
              <div className="flex items-center gap-6">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Database className="text-blue-600" size={32} />
                </div>
                <div>
                  <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Active File Store</div>
                  <h2 className="text-3xl font-black tracking-tight">{selectedStore.displayName}</h2>
                  <div className="text-xs text-slate-400 mt-1 font-mono bg-slate-50 px-2 py-0.5 rounded inline-block">{selectedStore.name}</div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="hidden lg:block">
                  <label className="text-xs font-bold text-slate-400 block mb-1">Optional Upload Metadata (JSON)</label>
                  <input 
                    type="text" 
                    placeholder='[{"key": "year", "numeric_value": 2024}]'
                    className="text-xs px-3 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={uploadMetadata}
                    onChange={(e) => setUploadMetadata(e.target.value)}
                  />
                </div>
                <label className={cn(
                  "flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95",
                  uploading && "opacity-50 cursor-not-allowed"
                )}>
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  <span>{uploading ? 'Processing...' : 'Upload File'}</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload} 
                    disabled={uploading}
                    accept=".pdf,.txt,.doc,.docx,.csv,.json,.md,.py,.js,.ts"
                  />
                </label>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 xl:grid-cols-5 gap-8 bg-slate-50/30">
              {/* Documents Column */}
              <section className="xl:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <FileText className="text-slate-400" />
                    Indexed Files
                  </h3>
                  <span className="bg-white border text-slate-600 text-xs font-black px-3 py-1 rounded-full shadow-sm">
                    {documents.length} Total
                  </span>
                </div>
                
                <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                  {loadingDocs ? (
                    <div className="flex flex-col items-center justify-center p-20 space-y-4">
                      <Loader2 className="animate-spin text-blue-500" size={32} />
                      <span className="text-sm text-slate-400 font-medium">Fetching documents...</span>
                    </div>
                  ) : documents.length === 0 ? (
                    <div className="p-20 text-center text-slate-400">
                      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Upload className="opacity-20" size={32} />
                      </div>
                      <p className="font-bold text-slate-600 mb-1">No files indexed yet</p>
                      <p className="text-sm max-w-xs mx-auto">Upload documents to this store to enable semantic search capabilities.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/80 border-b text-slate-400 text-[10px] uppercase font-black tracking-widest">
                          <tr>
                            <th className="px-6 py-4">Filename</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {documents.map((doc: any) => (
                            <tr key={doc.name} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                  <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <FileText size={16} className="text-slate-500 group-hover:text-blue-600" />
                                  </div>
                                  <div className="overflow-hidden">
                                    <div className="font-bold text-sm truncate max-w-[180px]" title={doc.displayName}>{doc.displayName}</div>
                                    <div className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">{doc.name.split('/').pop()}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                  {doc.mimeType?.split('/').pop()?.toUpperCase() || 'FILE'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => handleDeleteDocument(doc.name)}
                                  className="text-slate-300 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-all"
                                  title="Delete Document"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>

              {/* Chat/Query Column */}
              <section className="xl:col-span-3 space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <Search className="text-slate-400" />
                    RAG Playground
                  </h3>
                  <div className="flex items-center gap-2 bg-white border px-3 py-1.5 rounded-xl shadow-sm">
                    <Filter size={14} className="text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Metadata filter (e.g. year=2024)"
                      className="text-xs bg-transparent outline-none w-48 font-medium"
                      value={metadataFilter}
                      onChange={(e) => setMetadataFilter(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-white border rounded-3xl flex-1 flex flex-col shadow-sm overflow-hidden min-h-[500px]">
                  <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
                    {response ? (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-white p-8 border rounded-2xl shadow-sm border-blue-100 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                          <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info size={14} />
                            AI-Generated Insights
                          </h4>
                          <div className="prose prose-slate max-w-none whitespace-pre-wrap leading-relaxed text-slate-700 font-medium">
                            {response}
                          </div>
                        </div>
                        <button 
                          onClick={() => setResponse('')}
                          className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          Clear Response
                        </button>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-6 py-20">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-inner">
                          <Search size={48} className="opacity-10" />
                        </div>
                        <div className="max-w-xs">
                          <p className="font-black text-slate-600 text-lg mb-2">Ready to query</p>
                          <p className="text-sm">Enter a prompt below. Gemini will use semantic search to retrieve context from your indexed files.</p>
                        </div>
                      </div>
                    )}
                    {querying && (
                      <div className="mt-8 flex flex-col items-center justify-center gap-4 text-blue-600 animate-pulse">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Analyzing Documents</span>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleQuery} className="p-6 border-t bg-white">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="What do these documents say about...?"
                        className="w-full pl-6 pr-16 py-5 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 shadow-inner text-lg font-medium transition-all"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={querying}
                      />
                      <button
                        type="submit"
                        disabled={querying || !query}
                        className="absolute right-3 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-lg shadow-blue-200"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between px-2">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1"><Info size={10}/> Powered by Gemini 2.0 Flash</span>
                        <span className="flex items-center gap-1"><Database size={10}/> Semantic Vector Search</span>
                      </div>
                      <a href="https://ai.google.dev/docs" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-1 hover:underline">
                        API Docs <ExternalLink size={10} />
                      </a>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 p-8">
            <div className="bg-white p-16 rounded-[40px] shadow-2xl shadow-slate-200 border-t border-slate-50 flex flex-col items-center text-center max-w-xl">
              <div className="bg-blue-50 w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 rotate-12 shadow-inner">
                <Database size={64} className="text-blue-500 -rotate-12" />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">File Store Explorer</h2>
              <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                Connect your unstructured data to Gemini. Create a store, index your files, and build RAG applications with minimal friction.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => setIsCreatingStore(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Get Started
                </button>
                <button 
                  onClick={fetchStores}
                  className="bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all active:scale-95 border"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
