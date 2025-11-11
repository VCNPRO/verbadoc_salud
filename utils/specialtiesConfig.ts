import type { MedicalSpecialty, SpecialtyInfo } from '../types.ts';

export const MEDICAL_SPECIALTIES: SpecialtyInfo[] = [
    {
        id: 'general',
        name: 'General',
        description: 'Documentos médicos generales que no pertenecen a una especialidad específica',
        icon: '📋',
    },
    {
        id: 'laboratorio',
        name: 'Análisis Clínicos',
        description: 'Resultados de laboratorio, análisis de sangre, orina y otros fluidos',
        icon: '🔬',
    },
    {
        id: 'cardiologia',
        name: 'Cardiología',
        description: 'Estudios cardíacos, electrocardiogramas, ecocardiogramas',
        icon: '❤️',
    },
    {
        id: 'traumatologia',
        name: 'Traumatología',
        description: 'Informes de fracturas, lesiones, evaluaciones ortopédicas',
        icon: '🦴',
    },
    {
        id: 'oftalmologia',
        name: 'Oftalmología',
        description: 'Exámenes de vista, cirugías oculares, prescripciones de lentes',
        icon: '👁️',
    },
    {
        id: 'pediatria',
        name: 'Pediatría',
        description: 'Consultas pediátricas, seguimiento de desarrollo infantil',
        icon: '👶',
    },
    {
        id: 'cirugia',
        name: 'Cirugía',
        description: 'Informes quirúrgicos, protocolos operatorios, consentimientos',
        icon: '⚕️',
    },
    {
        id: 'radiologia',
        name: 'Radiología',
        description: 'Informes de rayos X, TAC, resonancias magnéticas, ecografías',
        icon: '📡',
    },
];

export const getSpecialtyById = (id: MedicalSpecialty): SpecialtyInfo | undefined => {
    return MEDICAL_SPECIALTIES.find(specialty => specialty.id === id);
};

export const getSpecialtyName = (id: MedicalSpecialty): string => {
    const specialty = getSpecialtyById(id);
    return specialty ? specialty.name : 'Desconocido';
};
