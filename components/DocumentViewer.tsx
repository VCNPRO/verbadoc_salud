import React, { useState, useEffect } from 'react';
import { XIcon, DownloadIcon } from './Icons';

interface DocumentViewerProps {
    isOpen: boolean;
    onClose: () => void;
    documentUrl: string;
    title: string;
    downloadFilename?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
    isOpen,
    onClose,
    documentUrl,
    title,
    downloadFilename
}) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && documentUrl) {
            setLoading(true);
            setError(null);

            fetch(documentUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo cargar el documento');
                    }
                    return response.text();
                })
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [isOpen, documentUrl]);

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFilename || 'documento.md';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Simple markdown to HTML converter (basic formatting)
    const formatMarkdown = (text: string): string => {
        let html = text;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-slate-200 mt-6 mb-3">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-cyan-400 mt-8 mb-4">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-cyan-300 mt-10 mb-5">$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 p-3 rounded border border-slate-700 overflow-x-auto my-3"><code class="text-xs text-green-300">$1</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-2 py-0.5 rounded text-cyan-400 text-sm">$1</code>');

        // Lists
        html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 text-slate-300">• $1</li>');
        html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 text-slate-300">• $1</li>');
        html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 text-slate-300 list-decimal">$1</li>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>');

        // Line breaks
        html = html.replace(/\n\n/g, '<br/><br/>');
        html = html.replace(/\n/g, '<br/>');

        // Horizontal rules
        html = html.replace(/^---$/gim, '<hr class="border-slate-700 my-6"/>');

        return html;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-100 truncate">
                                {title}
                            </h2>
                            <p className="text-xs md:text-sm text-slate-400">Documentación VerbaDoc Salud</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {content && (
                            <button
                                onClick={handleDownload}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                                title="Descargar documento"
                            >
                                <DownloadIcon className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Cerrar"
                        >
                            <XIcon className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-4 md:p-6">
                    {loading && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-slate-400">Cargando documento...</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-center">
                            <p className="text-red-400">❌ Error: {error}</p>
                            <p className="text-slate-400 text-sm mt-2">No se pudo cargar el documento</p>
                        </div>
                    )}

                    {!loading && !error && content && (
                        <div
                            className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-slate-700 bg-slate-900/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-slate-500 text-center md:text-left">
                            🇪🇺 VerbaDoc Salud | 100% Procesado en Europa
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full md:w-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
