import React, { useState } from 'react';
import type { ExtractionResult } from '../types.ts';
import { JsonViewer } from './JsonViewer.tsx';
import { downloadExcel } from '../utils/exportUtils.ts';

interface ResultsViewerProps {
    results: ExtractionResult[];
    theme?: any;
    isHealthMode?: boolean;
    onClose?: () => void;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({ results, theme, isHealthMode, onClose }) => {
    const [selectedResult, setSelectedResult] = useState<ExtractionResult | null>(
        results.length > 0 ? results[0] : null
    );

    const cardBg = isHealthMode ? '#ffffff' : 'rgba(30, 41, 59, 0.5)';
    const borderColor = isHealthMode ? theme?.border || '#6ee7b7' : 'rgba(51, 65, 85, 0.5)';
    const textColor = isHealthMode ? theme?.text || '#064e3b' : '#f1f5f9';
    const textSecondary = isHealthMode ? theme?.textSecondary || '#065f46' : '#94a3b8';
    const accentColor = isHealthMode ? theme?.primary || '#047857' : '#06b6d4';
    const headerBg = isHealthMode ? '#f0fdf4' : 'rgba(2, 6, 23, 0.5)';

    const handleDownloadJSON = () => {
        if (!selectedResult) return;

        const dataStr = JSON.stringify(selectedResult.extractedData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadCSV = () => {
        if (!selectedResult) return;

        // Convertir JSON a CSV
        const data = selectedResult.extractedData;
        let csv = '';

        // Si es un objeto plano, crear CSV simple
        if (typeof data === 'object' && !Array.isArray(data)) {
            const headers = Object.keys(data);
            csv = headers.join(',') + '\n';
            csv += headers.map(h => {
                const value = data[h];
                // Manejar valores que contienen comas o comillas
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
        }
        // Si es un array de objetos
        else if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
            const headers = Object.keys(data[0]);
            csv = headers.join(',') + '\n';
            csv += data.map((row: any) =>
                headers.map(h => {
                    const value = row[h];
                    if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(',')
            ).join('\n');
        }
        // Fallback: convertir todo el JSON a string
        else {
            csv = 'data\n' + JSON.stringify(data);
        }

        const dataBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadExcel = () => {
        if (!selectedResult) return;
        downloadExcel(
            selectedResult.extractedData,
            `${selectedResult.fileName.replace(/\.[^/.]+$/, '')}_extraccion`
        );
    };

    const handleCopyToClipboard = () => {
        if (!selectedResult) return;

        const dataStr = JSON.stringify(selectedResult.extractedData, null, 2);
        navigator.clipboard.writeText(dataStr);
        alert('Datos copiados al portapapeles');
    };

    if (results.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center h-full rounded-lg border p-6 text-center transition-colors duration-500"
                style={{
                    backgroundColor: cardBg,
                    borderColor: borderColor
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: textSecondary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold" style={{ color: textColor }}>Sin Resultados</h3>
                <p className="max-w-sm mx-auto mt-1" style={{ color: textSecondary }}>
                    Los resultados de las extracciones aparecerán aquí.
                </p>
            </div>
        );
    }

    return (
        <div
            className="rounded-lg border flex flex-col h-full transition-colors duration-500"
            style={{
                backgroundColor: cardBg,
                borderColor: borderColor
            }}
        >
            {/* Header */}
            <div
                className="p-4 border-b transition-colors duration-500"
                style={{
                    backgroundColor: headerBg,
                    borderBottomColor: borderColor
                }}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: textColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accentColor }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Resultados
                    </h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1 rounded transition-colors hover:opacity-80"
                            style={{ color: textSecondary }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Selector de resultado */}
                {results.length > 1 && (
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                            Seleccionar extracción:
                        </label>
                        <select
                            value={selectedResult?.id || ''}
                            onChange={(e) => {
                                const result = results.find(r => r.id === e.target.value);
                                if (result) setSelectedResult(result);
                            }}
                            className="w-full rounded-md p-2 text-sm transition-colors"
                            style={{
                                backgroundColor: isHealthMode ? '#ffffff' : '#1e293b',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: borderColor,
                                color: textColor
                            }}
                        >
                            {results.map(result => (
                                <option key={result.id} value={result.id}>
                                    {result.fileName} - {new Date(result.timestamp).toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedResult && (
                    <>
                        {/* Info del archivo */}
                        <div
                            className="p-3 rounded-lg border transition-colors"
                            style={{
                                backgroundColor: isHealthMode ? '#f0fdf4' : 'rgba(15, 23, 42, 0.5)',
                                borderColor: borderColor
                            }}
                        >
                            <p className="text-sm font-semibold" style={{ color: textColor }}>
                                {selectedResult.fileName}
                            </p>
                            <p className="text-xs mt-1" style={{ color: textSecondary }}>
                                Extraído el {new Date(selectedResult.timestamp).toLocaleString()}
                            </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleDownloadJSON}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: isHealthMode ? '#047857' : '#06b6d4',
                                    color: '#ffffff'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Descargar JSON
                            </button>
                            <button
                                onClick={handleDownloadCSV}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: isHealthMode ? '#059669' : '#0891b2',
                                    color: '#ffffff'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Descargar CSV
                            </button>
                            <button
                                onClick={handleDownloadExcel}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: isHealthMode ? '#10b981' : '#0e7490',
                                    color: '#ffffff'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Descargar Excel
                            </button>
                            <button
                                onClick={handleCopyToClipboard}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: isHealthMode ? '#6ee7b7' : 'rgba(100, 116, 139, 0.5)',
                                    color: isHealthMode ? '#064e3b' : '#f1f5f9',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: borderColor
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copiar
                            </button>
                        </div>

                        {/* Visualizador de datos */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2" style={{ color: textColor }}>
                                Datos Extraídos:
                            </h3>
                            <div
                                className="p-4 rounded-lg border transition-colors overflow-x-auto"
                                style={{
                                    backgroundColor: isHealthMode ? '#f9fafb' : 'rgba(15, 23, 42, 0.5)',
                                    borderColor: borderColor
                                }}
                            >
                                <JsonViewer data={selectedResult.extractedData} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
