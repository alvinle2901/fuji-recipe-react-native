import { gql } from "@/__generated__";

// Define Mutations
const CREATE_PRESET = gql(`
  mutation CreatePreset($input: PresetInput!) {
    createPreset(input: $input) {
      id
      name
    }
  }
`);

const UPDATE_PRESET = gql(`
  mutation UpdatePreset($id: ID!, $input: PresetInput!) {
    updatePreset(id: $id, input: $input) {
      id
      name
    }
  }
`);

const DELETE_PRESET = gql(`
  mutation DeletePreset($id: ID!) {
    deletePreset(id: $id) {
      id
      name
    }
  }
`);

export { CREATE_PRESET, UPDATE_PRESET, DELETE_PRESET };
