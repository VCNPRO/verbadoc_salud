import React, { useState, useEffect } from 'react';
import { FileTextIcon, ReceiptIcon, FileIcon, SparklesIcon } from './Icons.tsx';
import type { SchemaField, Sector, MedicalSpecialty } from '../types.ts';
import { SECTORS, getSectorById } from '../utils/sectorsConfig.ts';
import { MEDICAL_SPECIALTIES, getSpecialtyById } from '../utils/specialtiesConfig.ts';
import { SchemaBuilder } from './SchemaBuilder.tsx';
import { generateSchemaFromPrompt, AVAILABLE_MODELS } from '../services/geminiService.ts';

export interface Template {
    id: string;
    name: string;
    description: string;
    type: 'factura' | 'nota' | 'modelo';
    icon: 'receipt' | 'file' | 'document';
    schema: SchemaField[];
    prompt: string;
    archived?: boolean;
    custom?: boolean;
    sector?: Sector;
    specialty?: MedicalSpecialty;
}

interface TemplatesPanelProps {
    onSelectTemplate: (template: any) => void;
    onSaveTemplate?: (name: string, description: string) => void;
    currentSchema?: SchemaField[];
    currentPrompt?: string;
    onSectorChange?: (sector: Sector) => void;
    currentSector?: Sector;
    theme?: any;
    isHealthMode?: boolean;
    selectedModel?: string;
    onModelChange?: (model: string) => void;
}

const defaultTemplates: any[] = [
    // ANÁLISIS CLÍNICOS / LABORATORIO
    {
        id: 'template_lab_results',
        name: 'Resultados de Laboratorio',
        description: 'Extracción de datos de análisis de laboratorio clínico',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'laboratorio',
        prompt: 'Extrae los datos del análisis de laboratorio: información del paciente, fecha, tipo de análisis, y todos los resultados con sus valores de referencia.',
        schema: [
            { id: 'f1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'f2', name: 'paciente_dni', type: 'STRING' },
            { id: 'f3', name: 'fecha_extraccion', type: 'STRING' },
            { id: 'f4', name: 'fecha_informe', type: 'STRING' },
            { id: 'f5', name: 'laboratorio', type: 'STRING' },
            { id: 'f6', name: 'medico_solicitante', type: 'STRING' },
            {
                id: 'f7',
                name: 'resultados',
                type: 'ARRAY_OF_OBJECTS',
                children: [
                    { id: 'f7a', name: 'parametro', type: 'STRING' },
                    { id: 'f7b', name: 'resultado', type: 'STRING' },
                    { id: 'f7c', name: 'unidad', type: 'STRING' },
                    { id: 'f7d', name: 'valor_referencia', type: 'STRING' },
                ]
            },
            { id: 'f8', name: 'observaciones', type: 'STRING' },
        ]
    },
    // GENERAL
    {
        id: 'template_prescription',
        name: 'Receta Médica',
        description: 'Extracción de prescripciones y medicamentos recetados',
        type: 'modelo',
        icon: 'receipt',
        sector: 'salud',
        specialty: 'general',
        prompt: 'Extrae los datos de la receta médica: información del paciente, médico prescriptor, medicamentos prescritos con dosis y duración.',
        schema: [
            { id: 'p1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'p2', name: 'paciente_dni', type: 'STRING' },
            { id: 'p3', name: 'fecha_prescripcion', type: 'STRING' },
            { id: 'p4', name: 'medico_nombre', type: 'STRING' },
            { id: 'p5', name: 'medico_colegiado', type: 'STRING' },
            {
                id: 'p6',
                name: 'medicamentos',
                type: 'ARRAY_OF_OBJECTS',
                children: [
                    { id: 'p6a', name: 'nombre_medicamento', type: 'STRING' },
                    { id: 'p6b', name: 'dosis', type: 'STRING' },
                    { id: 'p6c', name: 'frecuencia', type: 'STRING' },
                    { id: 'p6d', name: 'duracion', type: 'STRING' },
                    { id: 'p6e', name: 'indicaciones', type: 'STRING' },
                ]
            },
            { id: 'p7', name: 'diagnostico', type: 'STRING' },
        ]
    },
    {
        id: 'template_medical_certificate',
        name: 'Certificado Médico',
        description: 'Extracción de certificados médicos y bajas laborales',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'general',
        prompt: 'Extrae los datos del certificado médico: datos del paciente, médico certificante, diagnóstico, período de reposo y restricciones.',
        schema: [
            { id: 'c1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'c2', name: 'paciente_dni', type: 'STRING' },
            { id: 'c3', name: 'fecha_emision', type: 'STRING' },
            { id: 'c4', name: 'medico_nombre', type: 'STRING' },
            { id: 'c5', name: 'medico_colegiado', type: 'STRING' },
            { id: 'c6', name: 'diagnostico', type: 'STRING' },
            { id: 'c7', name: 'fecha_inicio_reposo', type: 'STRING' },
            { id: 'c8', name: 'fecha_fin_reposo', type: 'STRING' },
            { id: 'c9', name: 'dias_reposo', type: 'NUMBER' },
            { id: 'c10', name: 'restricciones', type: 'ARRAY_OF_STRINGS' },
            { id: 'c11', name: 'observaciones', type: 'STRING' },
        ]
    },
    {
        id: 'template_radiology',
        name: 'Informe Radiológico',
        description: 'Extracción de informes de radiología y diagnóstico por imagen',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'radiologia',
        prompt: 'Extrae los datos del informe radiológico: información del paciente, tipo de estudio, hallazgos, impresión diagnóstica y conclusiones.',
        schema: [
            { id: 'r1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'r2', name: 'paciente_dni', type: 'STRING' },
            { id: 'r3', name: 'fecha_estudio', type: 'STRING' },
            { id: 'r4', name: 'tipo_estudio', type: 'STRING' },
            { id: 'r5', name: 'zona_anatomica', type: 'STRING' },
            { id: 'r6', name: 'tecnica_utilizada', type: 'STRING' },
            { id: 'r7', name: 'indicacion_clinica', type: 'STRING' },
            { id: 'r8', name: 'hallazgos', type: 'STRING' },
            { id: 'r9', name: 'impresion_diagnostica', type: 'STRING' },
            { id: 'r10', name: 'radiologo', type: 'STRING' },
        ]
    },
    {
        id: 'template_vaccination',
        name: 'Certificado de Vacunación',
        description: 'Extracción de datos de certificados y cartillas de vacunación',
        type: 'modelo',
        icon: 'receipt',
        sector: 'salud',
        specialty: 'general',
        prompt: 'Extrae los datos del certificado de vacunación: información del paciente y listado completo de vacunas aplicadas con fechas y lotes.',
        schema: [
            { id: 'v1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'v2', name: 'paciente_dni', type: 'STRING' },
            { id: 'v3', name: 'fecha_nacimiento', type: 'STRING' },
            {
                id: 'v4',
                name: 'vacunas',
                type: 'ARRAY_OF_OBJECTS',
                children: [
                    { id: 'v4a', name: 'vacuna', type: 'STRING' },
                    { id: 'v4b', name: 'fecha_aplicacion', type: 'STRING' },
                    { id: 'v4c', name: 'dosis', type: 'STRING' },
                    { id: 'v4d', name: 'lote', type: 'STRING' },
                    { id: 'v4e', name: 'centro_vacunacion', type: 'STRING' },
                ]
            },
            { id: 'v5', name: 'proxima_vacuna', type: 'STRING' },
            { id: 'v6', name: 'fecha_proxima_dosis', type: 'STRING' },
        ]
    },
    {
        id: 'template_consultation',
        name: 'Consulta Médica',
        description: 'Extracción de datos de consultas y evoluciones médicas',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'general',
        prompt: 'Extrae los datos de la consulta médica: motivo de consulta, antecedentes, exploración física, diagnóstico y plan de tratamiento.',
        schema: [
            { id: 'm1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'm2', name: 'paciente_dni', type: 'STRING' },
            { id: 'm3', name: 'fecha_consulta', type: 'STRING' },
            { id: 'm4', name: 'medico', type: 'STRING' },
            { id: 'm5', name: 'motivo_consulta', type: 'STRING' },
            { id: 'm6', name: 'antecedentes', type: 'STRING' },
            { id: 'm7', name: 'exploracion_fisica', type: 'STRING' },
            { id: 'm8', name: 'signos_vitales', type: 'OBJECT', children: [
                { id: 'm8a', name: 'presion_arterial', type: 'STRING' },
                { id: 'm8b', name: 'frecuencia_cardiaca', type: 'NUMBER' },
                { id: 'm8c', name: 'temperatura', type: 'NUMBER' },
                { id: 'm8d', name: 'saturacion_oxigeno', type: 'NUMBER' },
            ]},
            { id: 'm9', name: 'diagnostico', type: 'STRING' },
            { id: 'm10', name: 'plan_tratamiento', type: 'STRING' },
            { id: 'm11', name: 'proxima_cita', type: 'STRING' },
        ]
    },
    {
        id: 'template_discharge',
        name: 'Resumen de Alta Hospitalaria',
        description: 'Extracción de informes de alta y evolución hospitalaria',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'general',
        prompt: 'Extrae los datos del informe de alta hospitalaria: motivo de ingreso, evolución, procedimientos realizados, diagnósticos y recomendaciones al alta.',
        schema: [
            { id: 'd1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'd2', name: 'paciente_dni', type: 'STRING' },
            { id: 'd3', name: 'fecha_ingreso', type: 'STRING' },
            { id: 'd4', name: 'fecha_alta', type: 'STRING' },
            { id: 'd5', name: 'servicio', type: 'STRING' },
            { id: 'd6', name: 'medico_responsable', type: 'STRING' },
            { id: 'd7', name: 'motivo_ingreso', type: 'STRING' },
            { id: 'd8', name: 'evolucion', type: 'STRING' },
            { id: 'd9', name: 'procedimientos_realizados', type: 'ARRAY_OF_STRINGS' },
            { id: 'd10', name: 'diagnostico_principal', type: 'STRING' },
            { id: 'd11', name: 'diagnosticos_secundarios', type: 'ARRAY_OF_STRINGS' },
            { id: 'd12', name: 'medicacion_alta', type: 'STRING' },
            { id: 'd13', name: 'recomendaciones', type: 'STRING' },
            { id: 'd14', name: 'cita_revision', type: 'STRING' },
        ]
    },

    // OFTALMOLOGÍA
    {
        id: 'template_ophthalmology_consultation',
        name: 'Consulta Oftalmológica',
        description: 'Examen oftalmológico completo con agudeza visual y diagnóstico',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'oftalmologia',
        prompt: 'Extrae los datos de la consulta oftalmológica: datos del paciente, agudeza visual, refracción, presión intraocular, examen de segmento anterior y posterior, diagnóstico y plan.',
        schema: [
            { id: 'oft1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'oft2', name: 'paciente_dni', type: 'STRING' },
            { id: 'oft3', name: 'fecha_consulta', type: 'STRING' },
            { id: 'oft4', name: 'oftalmologo', type: 'STRING' },
            { id: 'oft5', name: 'motivo_consulta', type: 'STRING' },
            { id: 'oft6', name: 'agudeza_visual', type: 'OBJECT', children: [
                { id: 'oft6a', name: 'ojo_derecho_sin_correccion', type: 'STRING' },
                { id: 'oft6b', name: 'ojo_izquierdo_sin_correccion', type: 'STRING' },
                { id: 'oft6c', name: 'ojo_derecho_con_correccion', type: 'STRING' },
                { id: 'oft6d', name: 'ojo_izquierdo_con_correccion', type: 'STRING' },
            ]},
            { id: 'oft7', name: 'refraccion', type: 'OBJECT', children: [
                { id: 'oft7a', name: 'ojo_derecho', type: 'STRING' },
                { id: 'oft7b', name: 'ojo_izquierdo', type: 'STRING' },
            ]},
            { id: 'oft8', name: 'presion_intraocular', type: 'OBJECT', children: [
                { id: 'oft8a', name: 'ojo_derecho', type: 'NUMBER' },
                { id: 'oft8b', name: 'ojo_izquierdo', type: 'NUMBER' },
            ]},
            { id: 'oft9', name: 'segmento_anterior', type: 'STRING' },
            { id: 'oft10', name: 'segmento_posterior', type: 'STRING' },
            { id: 'oft11', name: 'diagnostico', type: 'STRING' },
            { id: 'oft12', name: 'tratamiento', type: 'STRING' },
        ]
    },
    {
        id: 'template_cataract_surgery',
        name: 'Cirugía de Cataratas',
        description: 'Informe operatorio de facoemulsificación e implante de lente intraocular',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'oftalmologia',
        prompt: 'Extrae los datos del informe de cirugía de cataratas: paciente, ojo operado, tipo de catarata, técnica quirúrgica, lente intraocular implantada, complicaciones y recomendaciones.',
        schema: [
            { id: 'cat1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'cat2', name: 'paciente_dni', type: 'STRING' },
            { id: 'cat3', name: 'fecha_cirugia', type: 'STRING' },
            { id: 'cat4', name: 'cirujano', type: 'STRING' },
            { id: 'cat5', name: 'ojo_operado', type: 'STRING' },
            { id: 'cat6', name: 'tipo_catarata', type: 'STRING' },
            { id: 'cat7', name: 'tecnica_quirurgica', type: 'STRING' },
            { id: 'cat8', name: 'lente_intraocular', type: 'OBJECT', children: [
                { id: 'cat8a', name: 'tipo', type: 'STRING' },
                { id: 'cat8b', name: 'dioptrias', type: 'NUMBER' },
                { id: 'cat8c', name: 'marca_modelo', type: 'STRING' },
            ]},
            { id: 'cat9', name: 'biometria_preoperatoria', type: 'STRING' },
            { id: 'cat10', name: 'complicaciones_intraoperatorias', type: 'STRING' },
            { id: 'cat11', name: 'observaciones', type: 'STRING' },
            { id: 'cat12', name: 'cuidados_postoperatorios', type: 'STRING' },
        ]
    },
    {
        id: 'template_fundoscopy',
        name: 'Fondo de Ojo / Retinografía',
        description: 'Exploración del fondo de ojo y análisis de retina',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'oftalmologia',
        prompt: 'Extrae los datos de la exploración de fondo de ojo: paciente, características del nervio óptico, mácula, vasos retinianos, hallazgos patológicos y conclusiones.',
        schema: [
            { id: 'ret1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'ret2', name: 'paciente_dni', type: 'STRING' },
            { id: 'ret3', name: 'fecha_exploracion', type: 'STRING' },
            { id: 'ret4', name: 'medico_explorador', type: 'STRING' },
            { id: 'ret5', name: 'midriasis_realizada', type: 'STRING' },
            { id: 'ret6', name: 'ojo_derecho', type: 'OBJECT', children: [
                { id: 'ret6a', name: 'papila_optica', type: 'STRING' },
                { id: 'ret6b', name: 'macula', type: 'STRING' },
                { id: 'ret6c', name: 'vasos_retinianos', type: 'STRING' },
                { id: 'ret6d', name: 'periferia', type: 'STRING' },
            ]},
            { id: 'ret7', name: 'ojo_izquierdo', type: 'OBJECT', children: [
                { id: 'ret7a', name: 'papila_optica', type: 'STRING' },
                { id: 'ret7b', name: 'macula', type: 'STRING' },
                { id: 'ret7c', name: 'vasos_retinianos', type: 'STRING' },
                { id: 'ret7d', name: 'periferia', type: 'STRING' },
            ]},
            { id: 'ret8', name: 'hallazgos_patologicos', type: 'STRING' },
            { id: 'ret9', name: 'diagnostico', type: 'STRING' },
            { id: 'ret10', name: 'recomendaciones', type: 'STRING' },
        ]
    },
    {
        id: 'template_tonometry',
        name: 'Tonometría (Presión Ocular)',
        description: 'Medición de la presión intraocular para detección de glaucoma',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'oftalmologia',
        prompt: 'Extrae los datos de la tonometría: paciente, método utilizado, valores de presión intraocular en ambos ojos, interpretación y seguimiento.',
        schema: [
            { id: 'ton1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'ton2', name: 'paciente_dni', type: 'STRING' },
            { id: 'ton3', name: 'fecha_medicion', type: 'STRING' },
            { id: 'ton4', name: 'hora_medicion', type: 'STRING' },
            { id: 'ton5', name: 'metodo_tonometria', type: 'STRING' },
            { id: 'ton6', name: 'presion_intraocular', type: 'OBJECT', children: [
                { id: 'ton6a', name: 'ojo_derecho', type: 'NUMBER' },
                { id: 'ton6b', name: 'ojo_izquierdo', type: 'NUMBER' },
                { id: 'ton6c', name: 'unidad', type: 'STRING' },
            ]},
            { id: 'ton7', name: 'espesor_corneal', type: 'OBJECT', children: [
                { id: 'ton7a', name: 'ojo_derecho', type: 'NUMBER' },
                { id: 'ton7b', name: 'ojo_izquierdo', type: 'NUMBER' },
            ]},
            { id: 'ton8', name: 'interpretacion', type: 'STRING' },
            { id: 'ton9', name: 'riesgo_glaucoma', type: 'STRING' },
            { id: 'ton10', name: 'seguimiento', type: 'STRING' },
        ]
    },
    {
        id: 'template_visual_field',
        name: 'Campo Visual / Perimetría',
        description: 'Estudio de campo visual para detección de defectos',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'oftalmologia',
        prompt: 'Extrae los datos del campo visual: paciente, tipo de perimetría, resultados por cada ojo, índices de fiabilidad, defectos detectados y conclusiones.',
        schema: [
            { id: 'cv1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'cv2', name: 'paciente_dni', type: 'STRING' },
            { id: 'cv3', name: 'fecha_estudio', type: 'STRING' },
            { id: 'cv4', name: 'tipo_perimetria', type: 'STRING' },
            { id: 'cv5', name: 'estrategia', type: 'STRING' },
            { id: 'cv6', name: 'ojo_derecho', type: 'OBJECT', children: [
                { id: 'cv6a', name: 'fiabilidad', type: 'STRING' },
                { id: 'cv6b', name: 'md_mean_deviation', type: 'NUMBER' },
                { id: 'cv6c', name: 'psd_pattern_standard_deviation', type: 'NUMBER' },
                { id: 'cv6d', name: 'defectos_detectados', type: 'STRING' },
            ]},
            { id: 'cv7', name: 'ojo_izquierdo', type: 'OBJECT', children: [
                { id: 'cv7a', name: 'fiabilidad', type: 'STRING' },
                { id: 'cv7b', name: 'md_mean_deviation', type: 'NUMBER' },
                { id: 'cv7c', name: 'psd_pattern_standard_deviation', type: 'NUMBER' },
                { id: 'cv7d', name: 'defectos_detectados', type: 'STRING' },
            ]},
            { id: 'cv8', name: 'interpretacion', type: 'STRING' },
            { id: 'cv9', name: 'diagnostico', type: 'STRING' },
        ]
    },
    {
        id: 'template_glasses_prescription',
        name: 'Receta de Lentes/Gafas',
        description: 'Prescripción óptica para corrección visual',
        type: 'modelo',
        icon: 'receipt',
        sector: 'salud',
        specialty: 'oftalmologia',
        prompt: 'Extrae los datos de la receta de lentes: paciente, graduación para cada ojo (esfera, cilindro, eje), adición, distancia pupilar y tipo de lentes.',
        schema: [
            { id: 'gaf1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'gaf2', name: 'paciente_dni', type: 'STRING' },
            { id: 'gaf3', name: 'fecha_prescripcion', type: 'STRING' },
            { id: 'gaf4', name: 'oftalmologo_optometrista', type: 'STRING' },
            { id: 'gaf5', name: 'numero_colegiado', type: 'STRING' },
            { id: 'gaf6', name: 'ojo_derecho', type: 'OBJECT', children: [
                { id: 'gaf6a', name: 'esfera', type: 'NUMBER' },
                { id: 'gaf6b', name: 'cilindro', type: 'NUMBER' },
                { id: 'gaf6c', name: 'eje', type: 'NUMBER' },
                { id: 'gaf6d', name: 'adicion', type: 'NUMBER' },
            ]},
            { id: 'gaf7', name: 'ojo_izquierdo', type: 'OBJECT', children: [
                { id: 'gaf7a', name: 'esfera', type: 'NUMBER' },
                { id: 'gaf7b', name: 'cilindro', type: 'NUMBER' },
                { id: 'gaf7c', name: 'eje', type: 'NUMBER' },
                { id: 'gaf7d', name: 'adicion', type: 'NUMBER' },
            ]},
            { id: 'gaf8', name: 'distancia_pupilar', type: 'NUMBER' },
            { id: 'gaf9', name: 'tipo_lentes', type: 'STRING' },
            { id: 'gaf10', name: 'observaciones', type: 'STRING' },
        ]
    },
];

// Archived health sector templates
const archivedHealthTemplates: any[] = [
    {
        id: 'template_consent',
        name: 'Consentimiento Informado',
        description: 'Extracción de datos de formularios de consentimiento médico',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'general',
        archived: true,
        prompt: 'Extrae los datos del consentimiento informado: paciente, procedimiento, riesgos aceptados, y firmas.',
        schema: [
            { id: 'ci1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'ci2', name: 'paciente_dni', type: 'STRING' },
            { id: 'ci3', name: 'fecha_documento', type: 'STRING' },
            { id: 'ci4', name: 'procedimiento_propuesto', type: 'STRING' },
            { id: 'ci5', name: 'medico_responsable', type: 'STRING' },
            { id: 'ci6', name: 'riesgos_explicados', type: 'ARRAY_OF_STRINGS' },
            { id: 'ci7', name: 'alternativas_tratamiento', type: 'STRING' },
            { id: 'ci8', name: 'paciente_firma', type: 'STRING' },
            { id: 'ci9', name: 'medico_firma', type: 'STRING' },
            { id: 'ci10', name: 'testigo_nombre', type: 'STRING' },
        ]
    },
    {
        id: 'template_emergency',
        name: 'Parte de Urgencias',
        description: 'Extracción de datos de informes de urgencias hospitalarias',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'general',
        archived: true,
        prompt: 'Extrae los datos del parte de urgencias: llegada, triaje, motivo consulta, constantes vitales, diagnóstico y destino.',
        schema: [
            { id: 'u1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'u2', name: 'paciente_dni', type: 'STRING' },
            { id: 'u3', name: 'fecha_hora_llegada', type: 'STRING' },
            { id: 'u4', name: 'nivel_triaje', type: 'STRING' },
            { id: 'u5', name: 'motivo_consulta', type: 'STRING' },
            { id: 'u6', name: 'constantes_vitales', type: 'OBJECT', children: [
                { id: 'u6a', name: 'presion_arterial', type: 'STRING' },
                { id: 'u6b', name: 'frecuencia_cardiaca', type: 'NUMBER' },
                { id: 'u6c', name: 'temperatura', type: 'NUMBER' },
                { id: 'u6d', name: 'saturacion_oxigeno', type: 'NUMBER' },
                { id: 'u6e', name: 'glasgow', type: 'NUMBER' },
            ]},
            { id: 'u7', name: 'exploracion', type: 'STRING' },
            { id: 'u8', name: 'pruebas_realizadas', type: 'ARRAY_OF_STRINGS' },
            { id: 'u9', name: 'diagnostico_urgencias', type: 'STRING' },
            { id: 'u10', name: 'tratamiento_urgencias', type: 'STRING' },
            { id: 'u11', name: 'destino_paciente', type: 'STRING' },
        ]
    },
    {
        id: 'template_surgery',
        name: 'Informe Quirúrgico',
        description: 'Extracción de datos de informes operatorios y cirugías',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'cirugia',
        archived: true,
        prompt: 'Extrae los datos del informe quirúrgico: datos del paciente, equipo quirúrgico, procedimiento, hallazgos y complicaciones.',
        schema: [
            { id: 'q1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'q2', name: 'paciente_dni', type: 'STRING' },
            { id: 'q3', name: 'fecha_cirugia', type: 'STRING' },
            { id: 'q4', name: 'cirujano_principal', type: 'STRING' },
            { id: 'q5', name: 'equipo_quirurgico', type: 'ARRAY_OF_STRINGS' },
            { id: 'q6', name: 'tipo_anestesia', type: 'STRING' },
            { id: 'q7', name: 'anestesiologo', type: 'STRING' },
            { id: 'q8', name: 'diagnostico_preoperatorio', type: 'STRING' },
            { id: 'q9', name: 'procedimiento_realizado', type: 'STRING' },
            { id: 'q10', name: 'hallazgos_quirurgicos', type: 'STRING' },
            { id: 'q11', name: 'tecnica_quirurgica', type: 'STRING' },
            { id: 'q12', name: 'complicaciones', type: 'STRING' },
            { id: 'q13', name: 'diagnostico_postoperatorio', type: 'STRING' },
            { id: 'q14', name: 'recomendaciones_postoperatorias', type: 'STRING' },
        ]
    },
    {
        id: 'template_epicrisis',
        name: 'Epicrisis / Resumen de Ingreso',
        description: 'Resumen completo de hospitalización para historia clínica',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'general',
        archived: true,
        prompt: 'Extrae los datos de la epicrisis: resumen completo del ingreso hospitalario incluyendo evolución, procedimientos y plan al alta.',
        schema: [
            { id: 'e1', name: 'paciente_nombre', type: 'STRING' },
            { id: 'e2', name: 'paciente_dni', type: 'STRING' },
            { id: 'e3', name: 'fecha_ingreso', type: 'STRING' },
            { id: 'e4', name: 'fecha_alta', type: 'STRING' },
            { id: 'e5', name: 'dias_estancia', type: 'NUMBER' },
            { id: 'e6', name: 'servicio_ingreso', type: 'STRING' },
            { id: 'e7', name: 'motivo_ingreso', type: 'STRING' },
            { id: 'e8', name: 'antecedentes_relevantes', type: 'STRING' },
            { id: 'e9', name: 'evolucion_durante_ingreso', type: 'STRING' },
            { id: 'e10', name: 'procedimientos_diagnosticos', type: 'ARRAY_OF_STRINGS' },
            { id: 'e11', name: 'procedimientos_terapeuticos', type: 'ARRAY_OF_STRINGS' },
            { id: 'e12', name: 'diagnosticos_finales', type: 'ARRAY_OF_STRINGS' },
            { id: 'e13', name: 'tratamiento_al_alta', type: 'STRING' },
            { id: 'e14', name: 'cuidados_domiciliarios', type: 'STRING' },
            { id: 'e15', name: 'seguimiento', type: 'STRING' },
        ]
    },
    {
        id: 'template_pediatric',
        name: 'Historia Clínica Pediátrica',
        description: 'Historia clínica específica para pacientes pediátricos',
        type: 'modelo',
        icon: 'document',
        sector: 'salud',
        specialty: 'pediatria',
        archived: true,
        prompt: 'Extrae los datos de la historia clínica pediátrica: datos del niño, desarrollo, vacunación, y valoración pediátrica.',
        schema: [
            { id: 'ped1', name: 'nombre_paciente', type: 'STRING' },
            { id: 'ped2', name: 'fecha_nacimiento', type: 'STRING' },
            { id: 'ped3', name: 'edad', type: 'STRING' },
            { id: 'ped4', name: 'sexo', type: 'STRING' },
            { id: 'ped5', name: 'tutor_legal', type: 'STRING' },
            { id: 'ped6', name: 'datos_nacimiento', type: 'OBJECT', children: [
                { id: 'ped6a', name: 'semanas_gestacion', type: 'NUMBER' },
                { id: 'ped6b', name: 'peso_nacer', type: 'NUMBER' },
                { id: 'ped6c', name: 'talla_nacer', type: 'NUMBER' },
                { id: 'ped6d', name: 'tipo_parto', type: 'STRING' },
            ]},
            { id: 'ped7', name: 'desarrollo_psicomotor', type: 'STRING' },
            { id: 'ped8', name: 'vacunacion_completa', type: 'STRING' },
            { id: 'ped9', name: 'alimentacion', type: 'STRING' },
            { id: 'ped10', name: 'peso_actual', type: 'NUMBER' },
            { id: 'ped11', name: 'talla_actual', type: 'NUMBER' },
            { id: 'ped12', name: 'perimetro_cefalico', type: 'NUMBER' },
            { id: 'ped13', name: 'alergias', type: 'ARRAY_OF_STRINGS' },
            { id: 'ped14', name: 'valoracion_pediatrica', type: 'STRING' },
        ]
    },
];

export function TemplatesPanel({ onSelectTemplate, onSaveTemplate, currentSchema, currentPrompt, onSectorChange, currentSector, theme, isHealthMode, selectedModel, onModelChange }: TemplatesPanelProps) {
    const [customTemplates, setCustomTemplates] = useState<any[]>([]);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [newTemplateDescription, setNewTemplateDescription] = useState('');
    const [showArchived, setShowArchived] = useState(false);
    const [showArchivedCustom, setShowArchivedCustom] = useState(false);
    const selectedSector: Sector = 'salud'; // Hardcoded to health sector only - no state needed
    const [selectedSpecialty, setSelectedSpecialty] = useState<MedicalSpecialty>('general');

    // Estados para controlar desplegables
    const [showModelsSection, setShowModelsSection] = useState(true);
    const [showTemplatesSection, setShowTemplatesSection] = useState(true);
    const [showMyModelsSection, setShowMyModelsSection] = useState(false);
    const [showCertificationsModal, setShowCertificationsModal] = useState(false);
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
    const [newSchema, setNewSchema] = useState<SchemaField[]>([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);
    const [newPrompt, setNewPrompt] = useState('Extrae la información clave del siguiente documento según el esquema JSON proporcionado.');
    const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);

    // Load custom templates from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('customTemplates');
        if (stored) {
            try {
                setCustomTemplates(JSON.parse(stored));
            } catch (e) {
                console.error('Error loading custom templates:', e);
            }
        }
    }, []);

    // Save custom templates to localStorage
    const saveToLocalStorage = (templates: Template[]) => {
        localStorage.setItem('customTemplates', JSON.stringify(templates));
    };

    const handleSaveTemplate = () => {
        if (!newTemplateName.trim()) return;

        // Usar newSchema/newPrompt si estamos creando, sino usar current
        const schemaToSave = isCreatingTemplate ? newSchema : (currentSchema || []);
        const promptToSave = isCreatingTemplate ? newPrompt : (currentPrompt || '');

        if (schemaToSave.length === 0) return;

        const newTemplate: any = {
            id: `custom-${Date.now()}`,
            name: newTemplateName.trim(),
            description: newTemplateDescription.trim() || 'Plantilla personalizada',
            type: 'modelo',
            icon: 'file',
            schema: JSON.parse(JSON.stringify(schemaToSave)),
            prompt: promptToSave,
            custom: true,
            archived: false
        };

        const updatedTemplates = [...customTemplates, newTemplate];
        setCustomTemplates(updatedTemplates);
        saveToLocalStorage(updatedTemplates);

        setNewTemplateName('');
        setNewTemplateDescription('');
        setShowSaveDialog(false);
        setIsCreatingTemplate(false);
        // Reset new schema/prompt
        setNewSchema([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);
        setNewPrompt('Extrae la información clave del siguiente documento según el esquema JSON proporcionado.');
    };

    const handleGenerateSchemaFromPrompt = async () => {
        if (!newPrompt.trim()) {
            alert('Por favor, escribe primero un prompt describiendo qué datos quieres extraer.');
            return;
        }

        setIsGeneratingSchema(true);
        try {
            const generatedFields = await generateSchemaFromPrompt(newPrompt);
            setNewSchema(generatedFields);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al generar campos: ${errorMessage}`);
        } finally {
            setIsGeneratingSchema(false);
        }
    };

    const handleArchiveTemplate = (templateId: string) => {
        const updatedTemplates = customTemplates.map(t =>
            t.id === templateId ? { ...t, archived: !t.archived } : t
        );
        setCustomTemplates(updatedTemplates);
        saveToLocalStorage(updatedTemplates);
    };

    const handleDeleteTemplate = (templateId: string) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
            const updatedTemplates = customTemplates.filter(t => t.id !== templateId);
            setCustomTemplates(updatedTemplates);
            saveToLocalStorage(updatedTemplates);
        }
    };

    // Filter templates by selected specialty
    const filteredTemplates = defaultTemplates.filter(t =>
        (t.sector === 'salud' || !t.sector) &&
        (t.specialty === selectedSpecialty || !t.specialty)
    );

    const filteredArchivedTemplates = archivedHealthTemplates.filter(t =>
        t.specialty === selectedSpecialty || !t.specialty
    );

    const activeCustomTemplates = customTemplates.filter(t => showArchived || !t.archived);
    const archivedCustomTemplates = customTemplates.filter(t => t.archived);
    const currentSectorInfo = getSectorById(selectedSector);
    const currentSpecialtyInfo = getSpecialtyById(selectedSpecialty);

    const renderIcon = (iconType: Template['icon']) => {
        switch (iconType) {
            case 'receipt':
                return <ReceiptIcon className="w-5 h-5" />;
            case 'document':
                return <FileTextIcon className="w-5 h-5" />;
            default:
                return <FileIcon className="w-5 h-5" />;
        }
    };

    const TemplateCard = ({ template, showActions = false }: { template: any, showActions?: boolean }) => {
        const isHealthTemplate = 'secciones' in template;

        return (
            <div className="relative group/card">
                <button
                    onClick={() => onSelectTemplate(template)}
                    className="w-full text-left p-3 border rounded-lg transition-all group hover:shadow-md"
                    style={{
                        backgroundColor: isHealthMode ? '#ffffff' : 'rgba(30, 41, 59, 0.5)',
                        borderColor: isHealthMode ? '#d1d5db' : '#475569'
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="mt-0.5 transition-colors"
                            style={{ color: isHealthMode ? accentColor : '#60a5fa' }}
                        >
                            {renderIcon(isHealthTemplate ? 'document' : template.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4
                                className="text-sm font-semibold transition-colors"
                                style={{ color: textColor }}
                            >
                                {isHealthTemplate ? template.nombre : template.name} {template.archived && <span className="text-xs opacity-50">(Archivada)</span>}
                            </h4>
                            <p
                                className="text-xs mt-0.5 line-clamp-2 transition-colors"
                                style={{ color: textSecondary }}
                            >
                                {template.description || (isHealthTemplate && template.descripcion)}
                            </p>
                        </div>
                    </div>
                </button>
                {showActions && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity flex gap-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleArchiveTemplate(template.id);
                            }}
                            className="p-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 hover:text-white transition-colors"
                            title={template.archived ? "Desarchivar" : "Archivar"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTemplate(template.id);
                            }}
                            className="p-1 bg-red-700 hover:bg-red-600 rounded text-white transition-colors"
                            title="Eliminar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const cardBg = isHealthMode ? '#ffffff' : 'rgba(30, 41, 59, 0.3)';
    const borderColor = isHealthMode ? theme?.border || '#10b981' : 'rgba(51, 65, 85, 0.5)';
    const headerBg = isHealthMode ? '#ffffff' : 'rgba(2, 6, 23, 0.5)';
    const textColor = isHealthMode ? theme?.text || '#0f172a' : '#f1f5f9';
    const textSecondary = isHealthMode ? theme?.textSecondary || '#475569' : '#94a3b8';
    const accentColor = isHealthMode ? theme?.primary || '#059669' : '#06b6d4';

    return (
        <div
            className="h-full flex flex-col rounded-lg border overflow-hidden transition-colors duration-500"
            style={{
                backgroundColor: cardBg,
                borderColor: borderColor
            }}
        >
            <div
                className="p-4 border-b transition-colors duration-500"
                style={{
                    backgroundColor: headerBg,
                    borderBottomColor: borderColor
                }}
            >
                <h2 className="text-lg font-semibold transition-colors duration-500" style={{ color: textColor }}>Plantillas</h2>
                <p className="text-xs mt-1 transition-colors duration-500" style={{ color: textSecondary }}>Gestión de plantillas de extracción</p>
            </div>

            <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{
                    backgroundColor: isHealthMode ? '#f0fdf4' : 'transparent'
                }}
            >
                {!isCreatingTemplate ? (
                    <>
                        {/* SECCIÓN 1: MIS MODELOS */}
                        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: borderColor }}>
                            <button
                                onClick={() => setShowMyModelsSection(!showMyModelsSection)}
                                className="w-full flex items-center justify-between p-3 transition-colors hover:opacity-80"
                                style={{
                                    backgroundColor: isHealthMode ? '#ffffff' : 'rgba(30, 41, 59, 0.5)',
                                    borderBottomWidth: showMyModelsSection ? '2px' : '0',
                                    borderBottomColor: borderColor
                                }}
                            >
                                <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: textColor }}>
                                    <FileIcon className="w-5 h-5" style={{ color: isHealthMode ? '#a855f7' : '#c084fc' }} />
                                    Mis Modelos ({activeCustomTemplates.length})
                                </h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 transition-transform ${showMyModelsSection ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ color: textColor }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showMyModelsSection && (
                                <div className="p-3 space-y-3">
                                    {/* Botón crear plantilla */}
                                    <button
                                        onClick={() => setIsCreatingTemplate(true)}
                                        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-dashed transition-all hover:shadow-md"
                                        style={{
                                            backgroundColor: isHealthMode ? '#dcfce7' : 'rgba(34, 197, 94, 0.1)',
                                            borderColor: isHealthMode ? '#10b981' : '#22c55e',
                                            color: isHealthMode ? '#047857' : '#4ade80'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="text-xs font-medium">Crear Nueva Plantilla</span>
                                    </button>

                                    {/* Plantillas personalizadas */}
                                    {activeCustomTemplates.length > 0 ? (
                                        <div className="space-y-2">
                                            {activeCustomTemplates.map(template => (
                                                <TemplateCard key={template.id} template={template} showActions={true} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-xs" style={{ color: textSecondary }}>
                                            <p>No tienes plantillas personalizadas</p>
                                            <p className="mt-1">Crea una para empezar</p>
                                        </div>
                                    )}

                                    {/* Plantillas archivadas */}
                                    {archivedCustomTemplates.length > 0 && (
                                        <div className="mt-3 pt-3 border-t" style={{ borderTopColor: borderColor }}>
                                            <button
                                                onClick={() => setShowArchivedCustom(!showArchivedCustom)}
                                                className="w-full flex items-center justify-between p-2 rounded transition-colors hover:opacity-80"
                                                style={{
                                                    backgroundColor: isHealthMode ? '#80cbc4' : 'rgba(16, 185, 129, 0.1)',
                                                    color: textColor
                                                }}
                                            >
                                                <span className="text-xs font-medium">📦 Archivadas ({archivedCustomTemplates.length})</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-4 w-4 transition-transform ${showArchivedCustom ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {showArchivedCustom && (
                                                <div className="mt-2 space-y-2">
                                                    {archivedCustomTemplates.map(template => (
                                                        <TemplateCard key={template.id} template={template} showActions={true} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* SECCIÓN 2: PLANTILLAS PREDEFINIDAS */}
                        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: borderColor }}>
                            <button
                                onClick={() => setShowTemplatesSection(!showTemplatesSection)}
                                className="w-full flex items-center justify-between p-3 transition-colors hover:opacity-80"
                                style={{
                                    backgroundColor: isHealthMode ? '#ffffff' : 'rgba(30, 41, 59, 0.5)',
                                    borderBottomWidth: showTemplatesSection ? '2px' : '0',
                                    borderBottomColor: borderColor
                                }}
                            >
                                <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: textColor }}>
                                    <FileTextIcon className="w-5 h-5" />
                                    Plantillas
                                </h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 transition-transform ${showTemplatesSection ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ color: textColor }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showTemplatesSection && (
                                <div className="p-3 space-y-3">
                                    {/* Selector de especialidad */}
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5" style={{ color: textColor }}>
                                            Especialidad médica:
                                        </label>
                                        <select
                                            value={selectedSpecialty}
                                            onChange={(e) => setSelectedSpecialty(e.target.value as MedicalSpecialty)}
                                            className="w-full rounded-md p-2 text-sm"
                                            style={{
                                                backgroundColor: isHealthMode ? '#ffffff' : '#1e293b',
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor: borderColor,
                                                color: textColor
                                            }}
                                        >
                                            {MEDICAL_SPECIALTIES.map(specialty => (
                                                <option key={specialty.id} value={specialty.id}>
                                                    {specialty.icon} {specialty.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Plantillas filtradas */}
                                    {filteredTemplates.length > 0 ? (
                                        <div className="space-y-2">
                                            {filteredTemplates.map(template => (
                                                <TemplateCard key={template.id} template={template} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-xs" style={{ color: textSecondary }}>
                                            <p>No hay plantillas para esta especialidad</p>
                                        </div>
                                    )}

                                    {/* Plantillas archivadas */}
                                    {filteredArchivedTemplates.length > 0 && (
                                        <div className="mt-3 pt-3 border-t" style={{ borderTopColor: borderColor }}>
                                            <button
                                                onClick={() => setShowArchived(!showArchived)}
                                                className="w-full flex items-center justify-between p-2 rounded transition-colors hover:opacity-80"
                                                style={{
                                                    backgroundColor: isHealthMode ? '#80cbc4' : 'rgba(16, 185, 129, 0.1)',
                                                    color: textColor
                                                }}
                                            >
                                                <span className="text-xs font-medium">📦 Archivadas ({filteredArchivedTemplates.length})</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-4 w-4 transition-transform ${showArchived ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {showArchived && (
                                                <div className="mt-2 space-y-2">
                                                    {filteredArchivedTemplates.map(template => (
                                                        <TemplateCard key={template.id} template={template} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="space-y-3">
                        {/* Header con título y botón cancelar */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold transition-colors" style={{ color: textColor }}>
                                Nueva Plantilla
                            </h3>
                            <button
                                onClick={() => {
                                    setIsCreatingTemplate(false);
                                    setNewSchema([{ id: `field-${Date.now()}`, name: '', type: 'STRING' }]);
                                    setNewPrompt('Extrae la información clave del siguiente documento según el esquema JSON proporcionado.');
                                }}
                                className="text-xs px-2 py-1 rounded transition-colors hover:opacity-80"
                                style={{
                                    backgroundColor: isHealthMode ? '#fee2e2' : 'rgba(239, 68, 68, 0.2)',
                                    color: isHealthMode ? '#dc2626' : '#f87171'
                                }}
                            >
                                Cancelar
                            </button>
                        </div>

                        {/* Formulario de nombre y descripción */}
                        <div className="space-y-2">
                            <div>
                                <label className="block text-xs font-medium mb-1 transition-colors" style={{ color: textColor }}>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: Factura Médica"
                                    value={newTemplateName}
                                    onChange={(e) => setNewTemplateName(e.target.value)}
                                    className="w-full rounded px-2 py-1.5 text-sm transition-colors"
                                    style={{
                                        backgroundColor: isHealthMode ? '#ffffff' : '#1e293b',
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: borderColor,
                                        color: textColor
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1 transition-colors" style={{ color: textColor }}>
                                    Descripción (opcional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Breve descripción"
                                    value={newTemplateDescription}
                                    onChange={(e) => setNewTemplateDescription(e.target.value)}
                                    className="w-full rounded px-2 py-1.5 text-sm transition-colors"
                                    style={{
                                        backgroundColor: isHealthMode ? '#ffffff' : '#1e293b',
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: borderColor,
                                        color: textColor
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1 transition-colors" style={{ color: textColor }}>
                                    Prompt
                                </label>
                                <textarea
                                    value={newPrompt}
                                    onChange={(e) => setNewPrompt(e.target.value)}
                                    rows={2}
                                    className="w-full rounded px-2 py-1.5 text-sm transition-colors"
                                    style={{
                                        backgroundColor: isHealthMode ? '#ffffff' : '#1e293b',
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: borderColor,
                                        color: textColor
                                    }}
                                />
                            </div>
                        </div>

                        {/* Schema Builder */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-medium transition-colors" style={{ color: textColor }}>
                                    Campos del Esquema
                                </label>
                                <button
                                    onClick={handleGenerateSchemaFromPrompt}
                                    disabled={isGeneratingSchema || !newPrompt.trim()}
                                    className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                                    style={{
                                        backgroundColor: isHealthMode ? '#047857' : '#06b6d4',
                                        color: '#ffffff'
                                    }}
                                >
                                    {isGeneratingSchema ? (
                                        <>
                                            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            ...
                                        </>
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-3 h-3" />
                                            Generar desde Prompt
                                        </>
                                    )}
                                </button>
                            </div>
                            <SchemaBuilder
                                schema={newSchema}
                                setSchema={setNewSchema}
                                theme={theme}
                                isHealthMode={isHealthMode}
                            />
                        </div>

                        {/* Botón guardar */}
                        <button
                            onClick={handleSaveTemplate}
                            disabled={!newTemplateName.trim() || newSchema.length === 0}
                            className="w-full py-1.5 rounded font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                            style={{
                                backgroundColor: isHealthMode ? '#047857' : '#06b6d4',
                                color: '#ffffff'
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Certificaciones HIPAA */}
            {showCertificationsModal && currentSectorInfo?.certifications && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowCertificationsModal(false)}>
                    <div className="bg-slate-800 rounded-lg border border-green-500/50 shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-green-300">Certificaciones del Sector Salud</h3>
                            </div>
                            <button
                                onClick={() => setShowCertificationsModal(false)}
                                className="text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4 p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
                            <p className="text-sm text-green-200">
                                Google Gemini cuenta con las certificaciones necesarias para trabajar con datos médicos y cumplir con regulaciones de salud.
                            </p>
                        </div>

                        <h4 className="text-sm font-medium text-slate-200 mb-3">Certificaciones Actuales (2025):</h4>
                        <ul className="space-y-2 mb-4">
                            {currentSectorInfo.certifications.map((cert, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{cert}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg text-xs text-blue-200">
                            <p className="font-medium mb-1">Nota Importante:</p>
                            <p>Para usar Gemini con datos médicos protegidos (PHI), se requiere firmar un Business Associate Agreement (BAA) con Google y activar las configuraciones de proyectos regulados.</p>
                        </div>

                        <button
                            onClick={() => setShowCertificationsModal(false)}
                            className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
