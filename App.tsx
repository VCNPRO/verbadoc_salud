
import React, { useState, useMemo, useEffect } from 'react';
// Fix: Use explicit file extension in import.
import { FileUploader } from './components/FileUploader.tsx';
// Fix: Use explicit file extension in import.
import { ExtractionEditor } from './components/ExtractionEditor.tsx';
// Fix: Use explicit file extension in import.
import { HistoryViewer } from './components/HistoryViewer.tsx';
// Fix: Use explicit file extension in import.
import { TemplatesPanel } from './components/TemplatesPanel.tsx';
// Fix: Use explicit file extension in import.
import { PdfViewer } from './components/PdfViewer.tsx';
// Fix: Use explicit file extension in import.
import { HelpModal } from './components/HelpModal.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
// Fix: Use explicit file extension in import.
import { ResultsViewer } from './components/ResultsViewer.tsx';
// Fix: Use explicit file extension in import.
import type { UploadedFile, ExtractionResult, SchemaField, Sector } from './types.ts';
import { AVAILABLE_MODELS, type GeminiModel } from './services/geminiService.ts';
import { getSectorById, getDefaultTheme } from './utils/sectorsConfig.ts';

// Helper to create a dummy file for the example
function createExampleFile(): File {
    const exampleContent = `
HISTORIA CLÍNICA
═══════════════════════════════════════════════════════════════

DATOS DE FILIACIÓN
Nombre Completo: María González López
DNI/ID: 12345678-A
Fecha de Nacimiento: 15/03/1985 (39 años)
Género: Femenino
Dirección: Av. Principal 123, Ciudad Ejemplo
Teléfono: +34 600 123 456
Email: maria.gonzalez@email.com

MOTIVO DE CONSULTA
Dolor abdominal persistente de 3 días de evolución, acompañado de náuseas.

ANTECEDENTES PERSONALES
- Alergias: Penicilina
- Enfermedades crónicas: Diabetes Mellitus tipo 2 (diagnosticada en 2018)
- Cirugías previas: Apendicectomía (2010)
- Medicación actual: Metformina 850mg cada 12 horas

EXPLORACIÓN FÍSICA
Tensión Arterial: 125/80 mmHg
Frecuencia Cardíaca: 78 lpm
Temperatura: 37.2°C
Peso: 68 kg
Altura: 165 cm
IMC: 24.9

Estado General: Paciente consciente y orientada
Abdomen: Dolor a la palpación en epigastrio, sin signos de defensa

DIAGNÓSTICO PROVISIONAL
Gastritis aguda

TRATAMIENTO PRESCRITO
- Omeprazol 20mg, 1 comprimido cada 24 horas durante 14 días
- Dieta blanda
- Evitar irritantes gástricos (café, alcohol, picantes)

OBSERVACIONES
Se recomienda control en 7 días. Si los síntomas persisten o empeoran,
acudir a urgencias.

PRÓXIMA CITA
Fecha: 15/02/2025
Hora: 10:30

═══════════════════════════════════════════════════════════════
Médico: Dr. Carlos Ramírez Soto
Nº Colegiado: 12345
Firma: [Firma Digital]
Fecha de emisión: 08/02/2025
`;
    return new File([exampleContent], "historia-clinica-ejemplo.txt", { type: "text/plain" });
}


function App() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [activeFileId, setActiveFileId] = useState<string | null>(null);
    const [history, setHistory] = useState<ExtractionResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewingFile, setViewingFile] = useState<File | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to light mode
    const currentSector: Sector = 'salud'; // Hardcoded to health sector only
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [showResultsExpanded, setShowResultsExpanded] = useState<boolean>(false);
    const [selectedModel, setSelectedModel] = useState<GeminiModel>('gemini-2.5-flash');

    // State for the editor, which can be reused across different files
    const [prompt, setPrompt] = useState<string>('Extrae la información clave del siguiente documento según el esquema JSON proporcionado.');
    const [schema, setSchema] = useState<SchemaField[]>([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);

    // Obtener el tema basado en el sector actual
    const currentTheme = useMemo(() => {
        const sectorInfo = getSectorById(currentSector);
        return sectorInfo?.theme || getDefaultTheme();
    }, [currentSector]);

    // Determinar si estamos en modo salud y modo claro
    const isHealthMode = !isDarkMode; // Light mode shows health theme, dark mode shows dark theme

    // Cargar historial desde localStorage al iniciar
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('verbadoc-history');
            if (savedHistory) {
                const parsed = JSON.parse(savedHistory);
                setHistory(parsed);
                console.log('✅ Historial cargado desde localStorage:', parsed.length, 'extracciones');
            }
        } catch (error) {
            console.error('Error al cargar historial desde localStorage:', error);
        }
    }, []);

    // Guardar historial en localStorage cada vez que cambie
    useEffect(() => {
        try {
            localStorage.setItem('verbadoc-history', JSON.stringify(history));
            console.log('💾 Historial guardado en localStorage:', history.length, 'extracciones');
        } catch (error) {
            console.error('Error al guardar historial en localStorage:', error);
        }
    }, [history]);

    const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

    const handleFileSelect = (id: string | null) => {
        setActiveFileId(id);
    };
    
    const handleExtract = async () => {
        if (!activeFile) return;

        // Lazy import the service
        const { extractDataFromDocument } = await import('./services/geminiService.ts');

        setIsLoading(true);
        // Reset status for the current file
        setFiles(currentFiles =>
            currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'procesando', error: undefined, extractedData: undefined } : f)
        );

        try {
            const extractedData = await extractDataFromDocument(activeFile.file, schema, prompt, selectedModel);

            setFiles(currentFiles =>
                currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'completado', extractedData: extractedData, error: undefined } : f)
            );

            const newHistoryEntry: ExtractionResult = {
                id: `hist-${Date.now()}`,
                fileId: activeFile.id,
                fileName: activeFile.file.name,
                schema: JSON.parse(JSON.stringify(schema)), // Deep copy schema
                extractedData: extractedData,
                timestamp: new Date().toISOString(),
            };
            setHistory(currentHistory => [newHistoryEntry, ...currentHistory]);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
            setFiles(currentFiles =>
                currentFiles.map(f => f.id === activeFile.id ? { ...f, status: 'error', error: errorMessage, extractedData: undefined } : f)
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleExtractAll = async () => {
        const pendingFiles = files.filter(f => f.status === 'pendiente' || f.status === 'error');
        if (pendingFiles.length === 0) return;

        // Lazy import the service
        const { extractDataFromDocument } = await import('./services/geminiService.ts');

        setIsLoading(true);

        for (const file of pendingFiles) {
            // Reset status for the current file
            setFiles(currentFiles =>
                currentFiles.map(f => f.id === file.id ? { ...f, status: 'procesando', error: undefined, extractedData: undefined } : f)
            );

            try {
                const extractedData = await extractDataFromDocument(file.file, schema, prompt, selectedModel);

                setFiles(currentFiles =>
                    currentFiles.map(f => f.id === file.id ? { ...f, status: 'completado', extractedData: extractedData, error: undefined } : f)
                );

                const newHistoryEntry: ExtractionResult = {
                    id: `hist-${Date.now()}-${file.id}`,
                    fileId: file.id,
                    fileName: file.file.name,
                    schema: JSON.parse(JSON.stringify(schema)), // Deep copy schema
                    extractedData: extractedData,
                    timestamp: new Date().toISOString(),
                };
                setHistory(currentHistory => [newHistoryEntry, ...currentHistory]);

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
                setFiles(currentFiles =>
                    currentFiles.map(f => f.id === file.id ? { ...f, status: 'error', error: errorMessage, extractedData: undefined } : f)
                );
            }
        }

        setIsLoading(false);
        setShowingResults(true); // Mostrar resultados automáticamente
    };

    const handleUseExampleFile = () => {
        const exampleFile = createExampleFile();
        const newFile: UploadedFile = {
            id: `file-${Date.now()}`,
            file: exampleFile,
            status: 'pendiente',
        };
        setFiles([newFile]);
        setActiveFileId(newFile.id);
    };
    
    const handleReplay = (result: ExtractionResult) => {
        // Find if the file still exists in the current batch
        const originalFile = files.find(f => f.id === result.fileId);
        if (originalFile) {
            setActiveFileId(originalFile.id);
            setSchema(JSON.parse(JSON.stringify(result.schema))); // Deep copy schema
            // You might want to reuse the prompt as well if it were saved in history
        } else {
             alert(`El archivo original "${result.fileName}" ya no está en el lote actual. Cargue el archivo de nuevo para reutilizar esta extracción.`);
        }
    };

    const handleSelectTemplate = (template: any) => {
        setSelectedTemplate(template);
        const isHealthTemplate = 'secciones' in template;

        if (isHealthTemplate) {
            const newSchema: SchemaField[] = template.secciones.flatMap((seccion: any) =>
                seccion.campos.map((campo: any) => {
                    let type: SchemaFieldType = 'STRING';
                    switch (campo.tipo_dato) {
                        case 'numero':
                            type = 'NUMBER';
                            break;
                        case 'multiseleccion':
                            type = 'ARRAY_OF_STRINGS';
                            break;
                        case 'tabla':
                            type = 'ARRAY_OF_OBJECTS';
                            break;
                        default:
                            type = 'STRING';
                    }
                    return {
                        id: `field-${campo.nombre_campo}-${Date.now()}`,
                        name: campo.etiqueta,
                        type: type,
                    };
                })
            );
            setSchema(newSchema);
            setPrompt('Extrae la información clave del siguiente documento de salud.');
        } else {
            setSchema(JSON.parse(JSON.stringify(template.schema)));
            setPrompt(template.prompt);
        }

        // No sector change needed - always health sector
    };

    const handleViewFile = (file: File) => {
        setViewingFile(file);
    };

    const handleCloseViewer = () => {
        setViewingFile(null);
    };

    const handleUpdateHealthTemplate = (sectionId: string, fieldName: string, newLabel: string) => {
        if (!selectedTemplate) return;

        const newTemplate = { ...selectedTemplate };
        const section = newTemplate.secciones.find((s: any) => s.id === sectionId);
        if (section) {
            const field = section.campos.find((f: any) => f.nombre_campo === fieldName);
            if (field) {
                field.etiqueta = newLabel;
            }
        }
        setSelectedTemplate(newTemplate);
    };

    // Limpiar todo el historial
    const handleClearHistory = () => {
        if (confirm('¿Estás seguro de que deseas eliminar todo el historial? Esta acción no se puede deshacer.')) {
            setHistory([]);
            localStorage.removeItem('verbadoc-history');
            console.log('🗑️ Historial limpiado');
        }
    };

    // Exportar historial como JSON
    const handleExportHistory = () => {
        if (history.length === 0) {
            alert('No hay historial para exportar');
            return;
        }

        const dataStr = JSON.stringify(history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `verbadoc-historial-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        console.log('📥 Historial exportado');
    };

    // Importar historial desde JSON
    const handleImportHistory = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target?.result as string);
                    if (Array.isArray(imported)) {
                        if (confirm(`¿Importar ${imported.length} extracciones? Esto se añadirá al historial existente.`)) {
                            setHistory(currentHistory => [...imported, ...currentHistory]);
                            console.log('📤 Historial importado:', imported.length, 'extracciones');
                        }
                    } else {
                        alert('El archivo no contiene un historial válido');
                    }
                } catch (error) {
                    alert('Error al leer el archivo. Asegúrate de que sea un JSON válido.');
                    console.error('Error al importar historial:', error);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    // Debug: Log theme values
    console.log('isDarkMode:', isDarkMode, 'isHealthMode:', isHealthMode, 'theme:', currentTheme);

    return (
        <div
            className="min-h-screen font-sans transition-colors duration-500"
            style={{
                backgroundColor: isDarkMode ? '#0f172a' : '#ecfdf5',
                color: isDarkMode ? '#e2e8f0' : '#064e3b'
            }}
        >
            <header
                className="backdrop-blur-sm border-b-2 sticky top-0 z-10 transition-colors duration-500 shadow-md"
                style={{
                    backgroundColor: isDarkMode ? 'rgba(2, 6, 23, 0.7)' : '#ffffff',
                    borderBottomColor: isDarkMode ? 'rgba(51, 65, 85, 0.5)' : '#6ee7b7'
                }}
            >
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-baseline gap-3">
                            <h1
                                className="text-3xl font-bold font-orbitron tracking-wider transition-colors duration-500"
                                style={{
                                    color: isDarkMode ? '#f1f5f9' : '#047857'
                                }}
                            >
                                verbadoc
                            </h1>
                            <p
                                className="text-sm font-sans transition-colors duration-500"
                                style={{
                                    color: isDarkMode ? '#94a3b8' : '#064e3b'
                                }}
                            >
                                trabajando para {!isDarkMode && <span className="font-bold px-2 py-1 bg-green-100 text-green-800 rounded-md">🏥 Sector Salud</span>}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Selector de Modelo IA */}
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="model-select"
                                    className="text-xs font-medium hidden sm:inline"
                                    style={{ color: isHealthMode ? '#047857' : '#94a3b8' }}
                                >
                                    Modelo IA:
                                </label>
                                <select
                                    id="model-select"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value as GeminiModel)}
                                    className="text-sm px-3 py-1.5 rounded-md border-2 focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: isHealthMode ? '#f9fafb' : '#1e293b',
                                        borderColor: isHealthMode ? '#6ee7b7' : '#475569',
                                        color: isHealthMode ? '#047857' : '#f1f5f9'
                                    }}
                                >
                                    {AVAILABLE_MODELS.map(model => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Theme Toggle Button */}
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-105"
                                style={{
                                    backgroundColor: isHealthMode ? '#f0fdf4' : '#1e293b',
                                    borderColor: isHealthMode ? '#6ee7b7' : '#475569',
                                    color: isHealthMode ? '#047857' : '#fbbf24'
                                }}
                                title={isDarkMode ? "Cambiar a modo día" : "Cambiar a modo noche"}
                            >
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            {/* Help Button */}
                            <button
                                onClick={() => setIsHelpModalOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-105"
                                style={{
                                    backgroundColor: isHealthMode ? '#f0fdf4' : '#1e293b',
                                    borderColor: isHealthMode ? '#6ee7b7' : '#475569',
                                    color: isHealthMode ? '#047857' : '#60a5fa'
                                }}
                                title="Ayuda y Guía de Usuario"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {/* Settings Button */}
                            <button
                                onClick={() => setIsSettingsModalOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-105"
                                style={{
                                    backgroundColor: isHealthMode ? '#f0fdf4' : '#1e293b',
                                    borderColor: isHealthMode ? '#6ee7b7' : '#475569',
                                    color: isHealthMode ? '#047857' : '#60a5fa'
                                }}
                                title="Configuración y Cumplimiento Legal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-3 py-2 border-2 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-105"
                                style={{
                                    backgroundColor: isHealthMode ? '#fef2f2' : '#1e293b',
                                    borderColor: isHealthMode ? '#fca5a5' : '#475569',
                                    color: isHealthMode ? '#dc2626' : '#f87171'
                                }}
                                title="Salir"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{height: 'calc(100vh - 112px)'}}>
                    <div className="lg:col-span-3 h-full">
                         <FileUploader
                            files={files}
                            setFiles={setFiles}
                            activeFileId={activeFileId}
                            onFileSelect={handleFileSelect}
                            onUseExample={handleUseExampleFile}
                            onExtractAll={handleExtractAll}
                            isLoading={isLoading}
                            onViewFile={handleViewFile}
                            theme={currentTheme}
                            isHealthMode={isHealthMode}
                        />
                    </div>
                    <div className="lg:col-span-6 h-full">
                        <ExtractionEditor
                            file={activeFile}
                            template={selectedTemplate}
                            onUpdateTemplate={handleUpdateHealthTemplate}
                            schema={schema}
                            setSchema={setSchema}
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onExtract={handleExtract}
                            isLoading={isLoading}
                            theme={currentTheme}
                            isHealthMode={isHealthMode}
                        />
                    </div>
                    <div className="lg:col-span-3 h-full">
                        <div className="h-full flex flex-col">
                            {/* Botón para ver resultados en vista expandida */}
                            {history.length > 0 && (
                                <button
                                    onClick={() => setShowResultsExpanded(true)}
                                    className="mb-2 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 shadow-md"
                                    style={{
                                        backgroundColor: isHealthMode ? '#047857' : '#06b6d4',
                                        color: '#ffffff'
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Ver Resultados ({history.length})
                                </button>
                            )}
                            <div className="flex-1">
                                <TemplatesPanel
                                    onSelectTemplate={handleSelectTemplate}
                                    currentSchema={schema}
                                    currentPrompt={prompt}
                                    theme={currentTheme}
                                    isHealthMode={isHealthMode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PdfViewer
                file={viewingFile}
                onClose={handleCloseViewer}
            />

            <HelpModal
                isOpen={isHelpModalOpen}
                onClose={() => setIsHelpModalOpen(false)}
            />

            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                isHealthMode={isHealthMode}
            />

            {/* Modal expandido de resultados */}
            {showResultsExpanded && history.length > 0 && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setShowResultsExpanded(false)}
                >
                    <div
                        className="w-full max-w-6xl h-[90vh] rounded-lg shadow-2xl overflow-hidden"
                        style={{
                            backgroundColor: isHealthMode ? '#ffffff' : '#1e293b'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header del modal */}
                        <div
                            className="flex items-center justify-between p-4 border-b"
                            style={{
                                backgroundColor: isHealthMode ? '#f0fdf4' : 'rgba(15, 23, 42, 0.5)',
                                borderBottomColor: isHealthMode ? '#6ee7b7' : '#475569'
                            }}
                        >
                            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: isHealthMode ? '#047857' : '#f1f5f9' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isHealthMode ? '#047857' : '#06b6d4' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Resultados de Extracción
                            </h2>
                            <button
                                onClick={() => setShowResultsExpanded(false)}
                                className="p-2 rounded-lg transition-all hover:opacity-80"
                                style={{
                                    backgroundColor: isHealthMode ? '#fee2e2' : 'rgba(239, 68, 68, 0.2)',
                                    color: isHealthMode ? '#dc2626' : '#f87171'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="h-[calc(90vh-72px)] overflow-hidden">
                            <ResultsViewer
                                results={history}
                                theme={currentTheme}
                                isHealthMode={isHealthMode}
                                onClearHistory={handleClearHistory}
                                onExportHistory={handleExportHistory}
                                onImportHistory={handleImportHistory}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer
                className="border-t-2 py-6 px-8 mt-auto"
                style={{
                    backgroundColor: isHealthMode ? '#f9fafb' : '#0f172a',
                    borderTopColor: isHealthMode ? '#d1d5db' : '#334155',
                }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        {/* Company Info */}
                        <div>
                            <h4 className="font-bold mb-2" style={{ color: isHealthMode ? '#047857' : '#06b6d4' }}>
                                VerbaDoc Salud
                            </h4>
                            <p className="text-sm" style={{ color: isHealthMode ? '#6b7280' : '#94a3b8' }}>
                                Extracción inteligente de datos médicos con IA procesada en Europa
                            </p>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h4 className="font-bold mb-2" style={{ color: isHealthMode ? '#047857' : '#06b6d4' }}>
                                Legal
                            </h4>
                            <div className="space-y-1">
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsSettingsModalOpen(true); }}
                                    className="block text-sm hover:underline"
                                    style={{ color: isHealthMode ? '#6b7280' : '#94a3b8' }}
                                >
                                    Política de Privacidad
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsSettingsModalOpen(true); }}
                                    className="block text-sm hover:underline"
                                    style={{ color: isHealthMode ? '#6b7280' : '#94a3b8' }}
                                >
                                    Términos y Condiciones
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsSettingsModalOpen(true); }}
                                    className="block text-sm hover:underline"
                                    style={{ color: isHealthMode ? '#6b7280' : '#94a3b8' }}
                                >
                                    Cumplimiento RGPD
                                </a>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold mb-2" style={{ color: isHealthMode ? '#047857' : '#06b6d4' }}>
                                Contacto
                            </h4>
                            <div className="space-y-1">
                                <a
                                    href="mailto:legal@verbadoc.com"
                                    className="block text-sm hover:underline"
                                    style={{ color: isHealthMode ? '#6b7280' : '#94a3b8' }}
                                >
                                    legal@verbadoc.com
                                </a>
                                <a
                                    href="mailto:soporte@verbadoc.com"
                                    className="block text-sm hover:underline"
                                    style={{ color: isHealthMode ? '#6b7280' : '#94a3b8' }}
                                >
                                    soporte@verbadoc.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t pt-4" style={{ borderTopColor: isHealthMode ? '#d1d5db' : '#334155' }}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                            <p className="text-xs" style={{ color: isHealthMode ? '#6b7280' : '#64748b' }}>
                                © 2025 VerbaDoc Salud. Todos los derechos reservados. • Procesamiento 100% en Europa 🇪🇺
                            </p>
                            <p className="text-xs" style={{ color: isHealthMode ? '#6b7280' : '#64748b' }}>
                                v1.0 • Powered by Google Gemini AI (Bélgica)
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
