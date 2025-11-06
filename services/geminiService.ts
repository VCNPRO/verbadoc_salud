
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
// Fix: Use explicit file extension in import.
import type { SchemaField } from '../types.ts';

// This function is a helper to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve(''); // Should handle ArrayBuffer case if necessary, for now empty string.
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};


// Recursive function to convert our custom schema to Gemini's format
const convertSchemaToGemini = (schema: SchemaField[]): { type: Type, properties: any, required: string[] } => {
    const properties: { [key: string]: any } = {};
    const required: string[] = [];

    schema.forEach(field => {
        if (field.name) {
            required.push(field.name);
            let fieldSchema: any = {};
            switch (field.type) {
                case 'STRING':
                    fieldSchema.type = Type.STRING;
                    break;
                case 'NUMBER':
                    fieldSchema.type = Type.NUMBER;
                    break;
                case 'BOOLEAN':
                    fieldSchema.type = Type.BOOLEAN;
                    break;
                case 'ARRAY_OF_STRINGS':
                    fieldSchema.type = Type.ARRAY;
                    fieldSchema.items = { type: Type.STRING };
                    break;
                case 'OBJECT':
                    if (field.children && field.children.length > 0) {
                        const nestedSchema = convertSchemaToGemini(field.children);
                        fieldSchema.type = Type.OBJECT;
                        fieldSchema.properties = nestedSchema.properties;
                        fieldSchema.required = nestedSchema.required;
                    } else {
                        // Gemini requires object properties to be defined.
                        fieldSchema.type = Type.OBJECT;
                        fieldSchema.properties = { placeholder: { type: Type.STRING, description: "Placeholder for empty object" } };
                    }
                    break;
                case 'ARRAY_OF_OBJECTS':
                    fieldSchema.type = Type.ARRAY;
                    if (field.children && field.children.length > 0) {
                        const nestedSchema = convertSchemaToGemini(field.children);
                        fieldSchema.items = {
                            type: Type.OBJECT,
                            properties: nestedSchema.properties,
                            required: nestedSchema.required,
                        };
                    } else {
                        // Add placeholder if empty.
                        fieldSchema.items = { type: Type.OBJECT, properties: { placeholder: { type: Type.STRING, description: "Placeholder for empty object" } } };
                    }
                    break;
            }
            properties[field.name] = fieldSchema;
        }
    });

    return {
        type: Type.OBJECT,
        properties,
        required,
    };
};

let ai: GoogleGenAI | null = null;
let currentApiKey: string | null = null;

export const setApiKey = (apiKey: string) => {
    currentApiKey = apiKey;
    ai = null; // Reset AI instance to use new key
};

export const getApiKey = (): string | null => {
    return currentApiKey;
};

const getGenAI = () => {
    if (!currentApiKey) {
        throw new Error("An API Key must be set when running in a browser");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: currentApiKey });
    }
    return ai;
}

export type GeminiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-1.5-flash' | 'gemini-1.5-pro';

export interface ModelInfo {
    id: GeminiModel;
    name: string;
    description: string;
    bestFor: string;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
    {
        id: 'gemini-2.5-flash',
        name: 'Flash 2.5 (Rápido)',
        description: 'Modelo rápido y eficiente',
        bestFor: 'Documentos simples, facturas básicas, textos cortos'
    },
    {
        id: 'gemini-2.5-pro',
        name: 'Pro 2.5 (Avanzado)',
        description: 'Modelo avanzado con mejor precisión',
        bestFor: 'Documentos complejos, múltiples tablas, análisis profundo'
    },
    {
        id: 'gemini-1.5-flash',
        name: 'Flash 1.5',
        description: 'Versión anterior del modelo rápido',
        bestFor: 'Documentos simples con compatibilidad legacy'
    }
];

// Nueva función: Generar campos del schema automáticamente desde el prompt
export const generateSchemaFromPrompt = async (
    prompt: string,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<SchemaField[]> => {
    const genAI = getGenAI();

    const analysisPrompt = `Analiza el siguiente prompt de extracción de datos y genera una lista de campos JSON que se necesitan extraer.

Prompt del usuario:
"${prompt}"

INSTRUCCIONES:
1. Identifica TODOS los datos que el usuario quiere extraer
2. Para cada dato, crea un campo con:
   - name: nombre del campo en snake_case (sin espacios, sin tildes, ej: "nombre_paciente")
   - type: uno de estos tipos: STRING, NUMBER, BOOLEAN, ARRAY_OF_STRINGS, ARRAY_OF_OBJECTS
   - children: SOLO si type es ARRAY_OF_OBJECTS, define los sub-campos del objeto
3. Si menciona una lista o varios elementos del mismo tipo, usa ARRAY_OF_STRINGS
4. Si menciona objetos complejos con sub-campos, usa ARRAY_OF_OBJECTS y define los children

TIPOS:
- STRING: Para texto, nombres, descripciones, fechas
- NUMBER: Para números, cantidades, precios
- BOOLEAN: Para sí/no, verdadero/falso
- ARRAY_OF_STRINGS: Para listas simples
- ARRAY_OF_OBJECTS: Para listas con estructura (ej: lista de medicamentos con nombre, dosis, frecuencia)

EJEMPLOS:
Para "lista de medicamentos con nombre y dosis":
{
  "name": "medicamentos",
  "type": "ARRAY_OF_OBJECTS",
  "children": [
    {"name": "nombre", "type": "STRING"},
    {"name": "dosis", "type": "STRING"}
  ]
}

Para "nombre del paciente":
{
  "name": "nombre_paciente",
  "type": "STRING"
}

Responde SOLO con un JSON con este formato:
{
  "fields": [
    {
      "name": "nombre_campo",
      "type": "STRING"
    },
    {
      "name": "campo_complejo",
      "type": "ARRAY_OF_OBJECTS",
      "children": [
        {"name": "subcampo1", "type": "STRING"},
        {"name": "subcampo2", "type": "NUMBER"}
      ]
    }
  ]
}`;

    try {
        const response: GenerateContentResponse = await genAI.models.generateContent({
            model: modelId,
            contents: { parts: [{ text: analysisPrompt }] },
            config: {
                responseMimeType: "application/json",
            },
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);

        // Recursive function to add IDs to fields
        const addIdsToFields = (fields: any[], prefix: string = ''): SchemaField[] => {
            return fields.map((field: any, index: number) => {
                const id = prefix ? `${prefix}-${index}` : `field-${Date.now()}-${index}`;
                return {
                    id,
                    name: field.name,
                    type: field.type,
                    children: field.children && field.children.length > 0
                        ? addIdsToFields(field.children, `${id}-child`)
                        : undefined
                };
            });
        };

        // Convert to SchemaField format with IDs
        const fields: SchemaField[] = addIdsToFields(result.fields);

        return fields;
    } catch (error) {
        console.error("Error al generar schema desde prompt:", error);
        throw new Error("No se pudo generar el schema automáticamente. Intenta definir los campos manualmente.");
    }
};

export const extractDataFromDocument = async (
    file: File,
    schema: SchemaField[],
    prompt: string,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<object> => {
    const genAI = getGenAI();
    const model = modelId;

    const generativePart = await fileToGenerativePart(file);

    const textPart = {
        text: prompt,
    };
    
    // Recursive function to filter out fields without valid names
    const filterValidFields = (fields: SchemaField[]): SchemaField[] => {
        return fields
            .filter(f => f.name.trim() !== '')
            .map(f => ({
                ...f,
                children: f.children ? filterValidFields(f.children) : undefined
            }));
    };

    // Filter out fields without a name from the final schema (recursively)
    const validSchemaFields = filterValidFields(schema);
    if (validSchemaFields.length === 0) {
        throw new Error("El esquema está vacío o no contiene campos con nombre válidos.");
    }

    const geminiSchema = convertSchemaToGemini(validSchemaFields);


    try {
        const response: GenerateContentResponse = await genAI.models.generateContent({
            model: model,
            contents: { parts: [textPart, generativePart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: geminiSchema,
            },
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Error al llamar a la API de Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`Error de la API de Gemini: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al comunicarse con la API de Gemini.");
    }
};

/**
 * Busca una imagen/logo de referencia en un documento
 */
export const searchImageInDocument = async (
    documentFile: File,
    referenceImageFile: File,
    modelId: GeminiModel = 'gemini-2.5-flash'
): Promise<{ found: boolean; description: string; location?: string; confidence?: string }> => {
    const genAI = getGenAI();
    const model = modelId;

    const documentPart = await fileToGenerativePart(documentFile);
    const referencePart = await fileToGenerativePart(referenceImageFile);

    const prompt = {
        text: `Analiza el documento y busca si contiene una imagen o logo similar a la imagen de referencia proporcionada.

Proporciona la respuesta en formato JSON con los siguientes campos:
- found: boolean (true si se encontró una imagen similar, false si no)
- description: string (descripción de lo que encontraste o no encontraste)
- location: string (opcional, ubicación aproximada en el documento: "arriba izquierda", "centro", "pie de página", etc.)
- confidence: string (opcional, nivel de confianza: "alta", "media", "baja")

Sé específico en la descripción sobre las similitudes o diferencias encontradas.`
    };

    try {
        const response: GenerateContentResponse = await genAI.models.generateContent({
            model: model,
            contents: {
                parts: [
                    prompt,
                    { text: "Imagen de referencia a buscar:" },
                    referencePart,
                    { text: "Documento donde buscar:" },
                    documentPart
                ]
            },
            config: {
                responseMimeType: "application/json",
            },
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Error al buscar imagen en documento:", error);
        if (error instanceof Error) {
            throw new Error(`Error de búsqueda: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al buscar la imagen.");
    }
};
