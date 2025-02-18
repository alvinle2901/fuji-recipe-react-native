/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ExposureCompensation = {
  __typename?: 'ExposureCompensation';
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

export type ExposureCompensationInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type GrainEffect = {
  __typename?: 'GrainEffect';
  size?: Maybe<Scalars['String']['output']>;
  strength?: Maybe<Scalars['String']['output']>;
};

export type GrainEffectInput = {
  size: Scalars['String']['input'];
  strength: Scalars['String']['input'];
};

export type IsoSettings = {
  __typename?: 'ISOSettings';
  maxIso: Scalars['Int']['output'];
  mode: Scalars['String']['output'];
};

export type IsoSettingsInput = {
  maxIso: Scalars['Int']['input'];
  mode: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPreset: Preset;
  deletePreset: Preset;
  updatePreset: Preset;
};


export type MutationCreatePresetArgs = {
  input: PresetInput;
};


export type MutationDeletePresetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePresetArgs = {
  id: Scalars['ID']['input'];
  input: PresetInput;
};

export type Preset = {
  __typename?: 'Preset';
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sensor: Scalars['String']['output'];
  settings: PresetSettings;
};

export type PresetInput = {
  images: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  sensor: Scalars['String']['input'];
  settings: PresetSettingsInput;
};

export type PresetSettings = {
  __typename?: 'PresetSettings';
  clarity?: Maybe<Scalars['Int']['output']>;
  color: Scalars['Int']['output'];
  colorChromeEffect?: Maybe<Scalars['String']['output']>;
  colorChromeEffectBlue?: Maybe<Scalars['String']['output']>;
  dynamicRange: Scalars['String']['output'];
  exposureCompensation?: Maybe<ExposureCompensation>;
  filmSimulation: Scalars['String']['output'];
  grainEffect?: Maybe<GrainEffect>;
  highlight: Scalars['Int']['output'];
  iso: IsoSettings;
  noiseReduction: Scalars['Int']['output'];
  shadow: Scalars['Int']['output'];
  sharpening: Scalars['Int']['output'];
  whiteBalance: WhiteBalance;
};

export type PresetSettingsInput = {
  clarity?: InputMaybe<Scalars['Int']['input']>;
  color: Scalars['Int']['input'];
  colorChromeEffect?: InputMaybe<Scalars['String']['input']>;
  colorChromeEffectBlue?: InputMaybe<Scalars['String']['input']>;
  dynamicRange: Scalars['String']['input'];
  exposureCompensation?: InputMaybe<ExposureCompensationInput>;
  filmSimulation: Scalars['String']['input'];
  grainEffect?: InputMaybe<GrainEffectInput>;
  highlight: Scalars['Int']['input'];
  iso: IsoSettingsInput;
  noiseReduction: Scalars['Int']['input'];
  shadow: Scalars['Int']['input'];
  sharpening: Scalars['Int']['input'];
  whiteBalance: WhiteBalanceInput;
};

export type Query = {
  __typename?: 'Query';
  getAllPresets: Array<Preset>;
  getPreset?: Maybe<Preset>;
};


export type QueryGetPresetArgs = {
  id: Scalars['ID']['input'];
};

export type WhiteBalance = {
  __typename?: 'WhiteBalance';
  blueShift: Scalars['Int']['output'];
  mode: Scalars['String']['output'];
  redShift: Scalars['Int']['output'];
};

export type WhiteBalanceInput = {
  blueShift: Scalars['Int']['input'];
  mode: Scalars['String']['input'];
  redShift: Scalars['Int']['input'];
};

export type CreatePresetMutationVariables = Exact<{
  input: PresetInput;
}>;


export type CreatePresetMutation = { __typename?: 'Mutation', createPreset: { __typename?: 'Preset', id: string, name: string } };

export type UpdatePresetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PresetInput;
}>;


export type UpdatePresetMutation = { __typename?: 'Mutation', updatePreset: { __typename?: 'Preset', id: string, name: string } };

export type DeletePresetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePresetMutation = { __typename?: 'Mutation', deletePreset: { __typename?: 'Preset', id: string, name: string } };

export type GetAllPresetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPresetsQuery = { __typename?: 'Query', getAllPresets: Array<{ __typename?: 'Preset', id: string, name: string, sensor: string, images: Array<string>, settings: { __typename?: 'PresetSettings', filmSimulation: string, dynamicRange: string, highlight: number, shadow: number, color: number, noiseReduction: number, sharpening: number, clarity?: number | null, colorChromeEffect?: string | null, colorChromeEffectBlue?: string | null, grainEffect?: { __typename?: 'GrainEffect', strength?: string | null, size?: string | null } | null, whiteBalance: { __typename?: 'WhiteBalance', mode: string, redShift: number, blueShift: number }, iso: { __typename?: 'ISOSettings', mode: string, maxIso: number }, exposureCompensation?: { __typename?: 'ExposureCompensation', min: number, max: number } | null } }> };

export type GetPresetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPresetQuery = { __typename?: 'Query', getPreset?: { __typename?: 'Preset', id: string, name: string, sensor: string, images: Array<string>, settings: { __typename?: 'PresetSettings', filmSimulation: string, dynamicRange: string, highlight: number, shadow: number, color: number, noiseReduction: number, sharpening: number, clarity?: number | null } } | null };


export const CreatePresetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePreset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PresetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPreset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreatePresetMutation, CreatePresetMutationVariables>;
export const UpdatePresetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePreset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PresetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePreset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdatePresetMutation, UpdatePresetMutationVariables>;
export const DeletePresetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePreset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePreset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeletePresetMutation, DeletePresetMutationVariables>;
export const GetAllPresetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPresets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPresets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sensor"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filmSimulation"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicRange"}},{"kind":"Field","name":{"kind":"Name","value":"highlight"}},{"kind":"Field","name":{"kind":"Name","value":"shadow"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"noiseReduction"}},{"kind":"Field","name":{"kind":"Name","value":"sharpening"}},{"kind":"Field","name":{"kind":"Name","value":"clarity"}},{"kind":"Field","name":{"kind":"Name","value":"grainEffect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"strength"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"colorChromeEffect"}},{"kind":"Field","name":{"kind":"Name","value":"colorChromeEffectBlue"}},{"kind":"Field","name":{"kind":"Name","value":"whiteBalance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"redShift"}},{"kind":"Field","name":{"kind":"Name","value":"blueShift"}}]}},{"kind":"Field","name":{"kind":"Name","value":"iso"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"maxIso"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exposureCompensation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPresetsQuery, GetAllPresetsQueryVariables>;
export const GetPresetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPreset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPreset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sensor"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filmSimulation"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicRange"}},{"kind":"Field","name":{"kind":"Name","value":"highlight"}},{"kind":"Field","name":{"kind":"Name","value":"shadow"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"noiseReduction"}},{"kind":"Field","name":{"kind":"Name","value":"sharpening"}},{"kind":"Field","name":{"kind":"Name","value":"clarity"}}]}}]}}]}}]} as unknown as DocumentNode<GetPresetQuery, GetPresetQueryVariables>;