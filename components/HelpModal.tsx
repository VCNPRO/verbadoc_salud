import React from 'react';
import { XIcon, InformationCircleIcon } from './Icons';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <InformationCircleIcon className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100">
                                Guía Rápida
                            </h2>
                            <p className="text-sm text-slate-400">Aprende a usar el Extractor de Datos</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                        title="Cerrar"
                    >
                        <XIcon className="w-6 h-6 text-slate-300" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {/* INICIO RÁPIDO - 5 MINUTOS */}
                    <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 border-2 border-cyan-600/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-cyan-300">⚡ Inicio Rápido (5 minutos)</h3>
                                <p className="text-sm text-cyan-200/80">Empieza a extraer datos ahora mismo</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-700/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">📤</span>
                                    <h4 className="font-semibold text-cyan-300">1. Sube Documento</h4>
                                </div>
                                <p className="text-xs text-slate-300">Arrastra tu PDF, JPG, PNG o TIFF a la columna izquierda</p>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-700/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">📋</span>
                                    <h4 className="font-semibold text-cyan-300">2. Selecciona Plantilla</h4>
                                </div>
                                <p className="text-xs text-slate-300">Panel derecho → "Plantillas" → Escoge tu especialidad (20+ disponibles)</p>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-700/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🚀</span>
                                    <h4 className="font-semibold text-cyan-300">3. Ejecuta Extracción</h4>
                                </div>
                                <p className="text-xs text-slate-300">Botón azul grande: "Ejecutar Extracción" (espera 5-30 seg)</p>
                            </div>

                            <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-700/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">💾</span>
                                    <h4 className="font-semibold text-cyan-300">4. Exporta Resultados</h4>
                                </div>
                                <p className="text-xs text-slate-300">Excel (recomendado), CSV o JSON</p>
                            </div>
                        </div>
                    </div>

                    {/* 3 COLUMNAS PRINCIPALES */}
                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">🎯 Las 3 Columnas de la Interfaz</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="bg-slate-800/50 p-3 rounded border border-blue-700/30">
                                <h4 className="font-semibold text-blue-400 mb-2">📄 Documentos</h4>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• Sube archivos</li>
                                    <li>• Vista previa</li>
                                    <li>• Eliminar</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded border border-cyan-700/30">
                                <h4 className="font-semibold text-cyan-400 mb-2">✏️ Editor</h4>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• Visor de documento</li>
                                    <li>• Prompt (instrucciones)</li>
                                    <li>• Esquema (estructura)</li>
                                    <li>• Botón extraer</li>
                                    <li>• Resultados</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded border border-green-700/30">
                                <h4 className="font-semibold text-green-400 mb-2">⚙️ Configuración</h4>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• Modelos IA (Flash/Pro)</li>
                                    <li>• Plantillas médicas</li>
                                    <li>• Mis Modelos</li>
                                    <li>• Crear/Guardar</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CONSEJOS RÁPIDOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/50">
                            <h4 className="font-semibold text-green-400 mb-3">✅ Haz Esto</h4>
                            <ul className="text-xs text-slate-300 space-y-2">
                                <li>• <strong>Usa plantillas</strong> para ahorrar tiempo</li>
                                <li>• <strong>Prueba con 1 primero</strong> antes de procesar 100</li>
                                <li>• <strong>Gemini Flash</strong> para docs estándar (más rápido)</li>
                                <li>• <strong>Guarda tus plantillas</strong> para reutilizar</li>
                                <li>• <strong>Exporta a Excel</strong> para análisis</li>
                            </ul>
                        </div>

                        <div className="bg-red-900/20 rounded-lg p-4 border border-red-700/50">
                            <h4 className="font-semibold text-red-400 mb-3">❌ Evita Esto</h4>
                            <ul className="text-xs text-slate-300 space-y-2">
                                <li>• No mezcles tipos de documentos en un lote</li>
                                <li>• No uses prompts vagos ("dame todo")</li>
                                <li>• No proceses sin probar primero</li>
                                <li>• No olvides exportar resultados</li>
                            </ul>
                        </div>
                    </div>

                    {/* TIPOS DE CAMPOS */}
                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50">
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">📊 Tipos de Campos Disponibles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30 flex justify-between">
                                <code className="text-blue-400">STRING</code>
                                <span className="text-slate-400">Texto (nombre, dirección)</span>
                            </div>
                            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30 flex justify-between">
                                <code className="text-green-400">NUMBER</code>
                                <span className="text-slate-400">Números (edad, peso)</span>
                            </div>
                            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30 flex justify-between">
                                <code className="text-purple-400">BOOLEAN</code>
                                <span className="text-slate-400">Sí/No (¿fumador?)</span>
                            </div>
                            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30 flex justify-between">
                                <code className="text-amber-400">ARRAY_OF_STRINGS</code>
                                <span className="text-slate-400">Lista textos (alergias)</span>
                            </div>
                            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30 flex justify-between">
                                <code className="text-pink-400">ARRAY_OF_OBJECTS</code>
                                <span className="text-slate-400">Lista grupos (medicamentos)</span>
                            </div>
                            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30 flex justify-between">
                                <code className="text-cyan-400">OBJECT</code>
                                <span className="text-slate-400">Grupo campos (dirección)</span>
                            </div>
                        </div>
                    </div>

                    {/* NUEVA SECCIÓN: Guía Informes Clínicos */}
                    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-6 border-2 border-green-600/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-300">🏥 Guía: Crear Plantilla para Informes Clínicos</h3>
                                <p className="text-sm text-green-200/80">Paso a paso para usuarios sin experiencia técnica</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Paso 1 - Ir al panel derecho */}
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-green-700/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        1
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-green-300 mb-2">Ve al panel derecho</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            En la parte derecha de la pantalla, busca el botón verde con borde punteado que dice <strong className="text-green-400">"Crear Plantilla"</strong>
                                        </p>
                                        <div className="bg-green-900/20 p-2 rounded border border-green-700/30 text-xs text-green-200">
                                            📍 Está arriba de todo, antes de las plantillas predefinidas
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 2 - Dar nombre */}
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-green-700/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        2
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-green-300 mb-2">Ponle un nombre a tu plantilla</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            En el campo <strong>"Nombre"</strong>, escribe algo descriptivo:
                                        </p>
                                        <div className="bg-slate-900/50 p-2 rounded border border-green-700/30">
                                            <p className="text-xs text-green-300 font-mono">Ejemplo: "Informe Consulta General"</p>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">
                                            (Opcional) Agrega una descripción: "Para extraer datos de consultas médicas generales"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 3 - Escribir prompt */}
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-green-700/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        3
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-green-300 mb-2">Escribe qué información quieres extraer</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            En el campo <strong>"Prompt"</strong>, describe lo que necesitas en lenguaje normal:
                                        </p>
                                        <div className="bg-slate-900/50 p-3 rounded border border-green-700/30 space-y-2">
                                            <p className="text-xs text-green-300 font-semibold">✅ Ejemplo para informe clínico:</p>
                                            <p className="text-xs text-slate-300 font-mono">
                                                "Extrae del informe médico: nombre del paciente, fecha de consulta,
                                                diagnóstico, tratamiento prescrito y próxima cita"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 4 - Definir campos */}
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-green-700/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        4
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-green-300 mb-2">Define los campos que quieres capturar</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            En <strong>"Campos del Esquema"</strong>, crea un campo por cada dato:
                                        </p>
                                        <div className="space-y-2">
                                            <div className="bg-slate-900/50 p-2 rounded border border-green-700/30 flex items-center gap-2">
                                                <span className="text-xs font-mono text-green-400">nombre_paciente</span>
                                                <span className="text-xs text-slate-400">→</span>
                                                <span className="text-xs text-blue-300">STRING</span>
                                                <span className="text-xs text-slate-400">(texto)</span>
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded border border-green-700/30 flex items-center gap-2">
                                                <span className="text-xs font-mono text-green-400">fecha_consulta</span>
                                                <span className="text-xs text-slate-400">→</span>
                                                <span className="text-xs text-blue-300">STRING</span>
                                                <span className="text-xs text-slate-400">(fecha)</span>
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded border border-green-700/30 flex items-center gap-2">
                                                <span className="text-xs font-mono text-green-400">diagnostico</span>
                                                <span className="text-xs text-slate-400">→</span>
                                                <span className="text-xs text-blue-300">STRING</span>
                                                <span className="text-xs text-slate-400">(texto)</span>
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded border border-green-700/30 flex items-center gap-2">
                                                <span className="text-xs font-mono text-green-400">tratamiento</span>
                                                <span className="text-xs text-slate-400">→</span>
                                                <span className="text-xs text-blue-300">STRING</span>
                                                <span className="text-xs text-slate-400">(texto)</span>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-900/20 p-2 rounded border border-yellow-700/30 mt-3">
                                            <p className="text-xs text-yellow-200">
                                                ⚠️ <strong>Importante:</strong> No uses espacios ni tildes en los nombres de campos.
                                                Usa guión bajo (_) para separar palabras.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 5 - Añadir más campos */}
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-green-700/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        5
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-green-300 mb-2">Añade todos los campos que necesites</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            Haz clic en <strong className="text-green-400">"Añadir Campo"</strong> (botón verde) para agregar más campos.
                                        </p>
                                        <div className="bg-slate-900/50 p-2 rounded border border-green-700/30">
                                            <p className="text-xs text-slate-300">
                                                💡 <strong className="text-green-300">Tip:</strong> Si un campo puede tener varios valores (ej: varios medicamentos),
                                                usa tipo <code className="text-amber-300">ARRAY_OF_STRINGS</code>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 6 - Guardar */}
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-green-700/30">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        6
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-green-300 mb-2">Guarda tu plantilla</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            Haz clic en el botón verde <strong className="text-green-400">"Guardar"</strong> al final del formulario.
                                        </p>
                                        <div className="bg-green-900/20 p-2 rounded border border-green-700/30">
                                            <p className="text-xs text-green-200">
                                                ✅ ¡Listo! Tu plantilla aparecerá en <strong>"Mis Modelos"</strong> y podrás reutilizarla siempre que quieras
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 7 - Usar plantilla */}
                            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-4 rounded-lg border-2 border-blue-600/50">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                        7
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-blue-300 mb-2">Cómo usar tu plantilla</h4>
                                        <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
                                            <li>Sube un informe clínico (panel izquierdo)</li>
                                            <li>En el panel derecho, haz clic en tu plantilla guardada</li>
                                            <li>En el panel central, haz clic en <strong className="text-cyan-400">"Extraer"</strong></li>
                                            <li>¡Los datos se extraerán automáticamente según tu plantilla!</li>
                                            <li>Descarga en JSON o CSV desde el panel derecho</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 pt-6">
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">📚 Guía General de Uso</h3>
                    </div>

                    {/* Paso 1 */}
                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                                1
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Subir Documentos</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Arrastra tus archivos (PDF, imágenes) a la zona de carga o haz clic para seleccionarlos.
                                </p>
                                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/30">
                                    <p className="text-xs text-slate-400">
                                        <strong className="text-cyan-300">💡 Tip:</strong> Puedes subir múltiples archivos a la vez si son del mismo tipo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paso 2 */}
                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                                2
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Escribir el Prompt</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    El <strong>prompt</strong> es la instrucción que le das a la IA. Sé específico sobre qué información quieres extraer.
                                </p>
                                <div className="bg-slate-800/50 p-3 rounded border border-green-700/30">
                                    <p className="text-xs text-green-300 mb-1"><strong>✅ Ejemplo bueno:</strong></p>
                                    <code className="text-xs text-slate-300">
                                        "Extrae el nombre del cliente, fecha de factura, lista de productos y total"
                                    </code>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded border border-red-700/30 mt-2">
                                    <p className="text-xs text-red-300 mb-1"><strong>❌ Ejemplo malo:</strong></p>
                                    <code className="text-xs text-slate-300">
                                        "Dame todo"
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paso 3 */}
                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                                3
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Definir el Esquema</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    El <strong>esquema</strong> es la estructura de los datos que quieres extraer.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30">
                                        <code className="text-blue-400">STRING</code>
                                        <p className="text-slate-400 mt-1">Texto (nombre, dirección)</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30">
                                        <code className="text-green-400">NUMBER</code>
                                        <p className="text-slate-400 mt-1">Números (precio, cantidad)</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30">
                                        <code className="text-purple-400">BOOLEAN</code>
                                        <p className="text-slate-400 mt-1">Sí/No (¿pagado?)</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-2 rounded border border-slate-700/30">
                                        <code className="text-amber-400">ARRAY</code>
                                        <p className="text-slate-400 mt-1">Listas (productos)</p>
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/30 mt-3">
                                    <p className="text-xs text-slate-400">
                                        <strong className="text-cyan-300">💡 Tip:</strong> Usa nombres sin espacios: <code className="text-cyan-300">nombre_cliente</code> en vez de "Nombre del Cliente"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paso 4 */}
                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-white">
                                4
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Ejecutar y Exportar</h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Haz clic en <strong>"Ejecutar Extracción"</strong> y espera los resultados.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <div className="bg-blue-900/30 border border-blue-700/50 rounded px-3 py-2">
                                        <p className="text-xs text-blue-300 font-semibold">JSON</p>
                                        <p className="text-xs text-slate-400">Para sistemas</p>
                                    </div>
                                    <div className="bg-green-900/30 border border-green-700/50 rounded px-3 py-2">
                                        <p className="text-xs text-green-300 font-semibold">CSV</p>
                                        <p className="text-xs text-slate-400">Para Excel/Sheets</p>
                                    </div>
                                    <div className="bg-emerald-900/30 border border-emerald-700/50 rounded px-3 py-2">
                                        <p className="text-xs text-emerald-300 font-semibold">Excel</p>
                                        <p className="text-xs text-slate-400">Archivo .xls</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Procesamiento en lote */}
                    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-5 border border-purple-700/50">
                        <h3 className="text-lg font-semibold text-purple-400 mb-2">🚀 Procesamiento en Lote</h3>
                        <p className="text-slate-300 text-sm mb-2">
                            ¿Tienes muchos documentos similares?
                        </p>
                        <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                            <li>Sube todos los archivos</li>
                            <li>Configura el esquema con el primero</li>
                            <li>Haz clic en <strong className="text-cyan-400">"Procesar Todos"</strong></li>
                            <li>¡Todos los archivos se procesarán automáticamente!</li>
                        </ol>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700 bg-slate-900/50">
                    <div className="space-y-4">
                        {/* Enlaces a Documentación */}
                        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-4 border border-indigo-700/50">
                            <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                📚 Documentación Completa
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Guía Rápida */}
                                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/30">
                                    <h4 className="text-sm font-semibold text-cyan-400 mb-2">📄 Guía Rápida</h4>
                                    <p className="text-xs text-slate-400 mb-3">Referencia condensada de características principales</p>
                                    <div className="flex gap-2">
                                        <a
                                            href="https://github.com/VCNPRO/verbadoc_salud/blob/main/GUIA_RAPIDA.md"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs rounded transition-colors"
                                        >
                                            Ver Online
                                        </a>
                                        <a
                                            href="https://raw.githubusercontent.com/VCNPRO/verbadoc_salud/main/GUIA_RAPIDA.md"
                                            download="GUIA_RAPIDA_VerbaDoc_Salud.md"
                                            className="flex-1 text-center px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-xs rounded transition-colors"
                                        >
                                            Descargar
                                        </a>
                                    </div>
                                </div>

                                {/* Guía Detallada */}
                                <div className="bg-slate-800/50 p-3 rounded border border-slate-700/30">
                                    <h4 className="text-sm font-semibold text-emerald-400 mb-2">📖 Guía Completa</h4>
                                    <p className="text-xs text-slate-400 mb-3">Manual detallado (80 páginas) con casos de uso y FAQ</p>
                                    <div className="flex gap-2">
                                        <a
                                            href="https://github.com/VCNPRO/verbadoc_salud/blob/main/GUIA_USUARIO_VERBADOC_SALUD.md"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded transition-colors"
                                        >
                                            Ver Online
                                        </a>
                                        <a
                                            href="https://raw.githubusercontent.com/VCNPRO/verbadoc_salud/main/GUIA_USUARIO_VERBADOC_SALUD.md"
                                            download="GUIA_USUARIO_VerbaDoc_Salud.md"
                                            className="flex-1 text-center px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-xs rounded transition-colors"
                                        >
                                            Descargar
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 bg-blue-900/20 p-2 rounded border border-blue-700/30">
                                <p className="text-xs text-blue-200">
                                    💡 <strong>Tip:</strong> Para convertir a PDF, abre el archivo descargado en un visualizador Markdown online como <a href="https://dillinger.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">dillinger.io</a> y exporta a PDF
                                </p>
                            </div>
                        </div>

                        {/* Botón Cerrar */}
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-slate-500">
                                🇪🇺 100% Procesado en Europa | RGPD Compliant
                            </p>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
                            >
                                ¡Entendido!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
