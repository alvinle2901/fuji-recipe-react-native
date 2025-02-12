import { gql } from '@apollo/client';

// Define GraphQL Queries
const GET_ALL_PRESETS = gql`
  query GetAllPresets {
    getAllPresets {
      id
      name
      sensor
      images
      settings {
        filmSimulation
        dynamicRange
        highlight
        shadow
        color
        noiseReduction
        sharpening
        clarity
        grainEffect {
          strength
          size
        }
        colorChromeEffect
        colorChromeEffectBlue
        whiteBalance {
          mode
          redShift
          blueShift
        }
        iso {
          mode
          maxIso
        }
        exposureCompensation {
          min
          max
        }
      }
    }
  }
`;

const GET_PRESET = gql`
  query GetPreset($id: ID!) {
    getPreset(id: $id) {
      id
      name
      sensor
      images
      settings {
        filmSimulation
        dynamicRange
        highlight
        shadow
        color
        noiseReduction
        sharpening
        clarity
      }
    }
  }
`;

export { GET_ALL_PRESETS, GET_PRESET };
