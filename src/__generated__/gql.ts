/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreatePreset($input: PresetInput!) {\n    createPreset(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.CreatePresetDocument,
    "\n  mutation UpdatePreset($id: ID!, $input: PresetInput!) {\n    updatePreset(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.UpdatePresetDocument,
    "\n  mutation DeletePreset($id: ID!) {\n    deletePreset(id: $id) {\n      id\n      name\n    }\n  }\n": typeof types.DeletePresetDocument,
    "\n  query GetAllPresets {\n    getAllPresets {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n        grainEffect {\n          strength\n          size\n        }\n        colorChromeEffect\n        colorChromeEffectBlue\n        whiteBalance {\n          mode\n          redShift\n          blueShift\n        }\n        iso {\n          mode\n          maxIso\n        }\n        exposureCompensation {\n          min\n          max\n        }\n      }\n    }\n  }\n": typeof types.GetAllPresetsDocument,
    "\n  query GetPreset($id: ID!) {\n    getPreset(id: $id) {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n      }\n    }\n  }\n": typeof types.GetPresetDocument,
};
const documents: Documents = {
    "\n  mutation CreatePreset($input: PresetInput!) {\n    createPreset(input: $input) {\n      id\n      name\n    }\n  }\n": types.CreatePresetDocument,
    "\n  mutation UpdatePreset($id: ID!, $input: PresetInput!) {\n    updatePreset(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n": types.UpdatePresetDocument,
    "\n  mutation DeletePreset($id: ID!) {\n    deletePreset(id: $id) {\n      id\n      name\n    }\n  }\n": types.DeletePresetDocument,
    "\n  query GetAllPresets {\n    getAllPresets {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n        grainEffect {\n          strength\n          size\n        }\n        colorChromeEffect\n        colorChromeEffectBlue\n        whiteBalance {\n          mode\n          redShift\n          blueShift\n        }\n        iso {\n          mode\n          maxIso\n        }\n        exposureCompensation {\n          min\n          max\n        }\n      }\n    }\n  }\n": types.GetAllPresetsDocument,
    "\n  query GetPreset($id: ID!) {\n    getPreset(id: $id) {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n      }\n    }\n  }\n": types.GetPresetDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePreset($input: PresetInput!) {\n    createPreset(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePreset($input: PresetInput!) {\n    createPreset(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePreset($id: ID!, $input: PresetInput!) {\n    updatePreset(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePreset($id: ID!, $input: PresetInput!) {\n    updatePreset(id: $id, input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePreset($id: ID!) {\n    deletePreset(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePreset($id: ID!) {\n    deletePreset(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllPresets {\n    getAllPresets {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n        grainEffect {\n          strength\n          size\n        }\n        colorChromeEffect\n        colorChromeEffectBlue\n        whiteBalance {\n          mode\n          redShift\n          blueShift\n        }\n        iso {\n          mode\n          maxIso\n        }\n        exposureCompensation {\n          min\n          max\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPresets {\n    getAllPresets {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n        grainEffect {\n          strength\n          size\n        }\n        colorChromeEffect\n        colorChromeEffectBlue\n        whiteBalance {\n          mode\n          redShift\n          blueShift\n        }\n        iso {\n          mode\n          maxIso\n        }\n        exposureCompensation {\n          min\n          max\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPreset($id: ID!) {\n    getPreset(id: $id) {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPreset($id: ID!) {\n    getPreset(id: $id) {\n      id\n      name\n      sensor\n      images\n      settings {\n        filmSimulation\n        dynamicRange\n        highlight\n        shadow\n        color\n        noiseReduction\n        sharpening\n        clarity\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;