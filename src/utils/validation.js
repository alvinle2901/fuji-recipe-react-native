import * as yup from 'yup'

export const validateSchema = yup.object().shape({
  title: yup.string().required('This field is required'),
  film: yup.string().required('This field is required'),
  sensor: yup.string().required('This field is required'),
  iso: yup.string().required('This field is required'),
  dynamicRange: yup.string().required('This field is required'),
  grainEffect: yup.string().required('This field is required'),
  ccfx: yup.string().required('This field is required'),
  wb: yup.string().required('This field is required'),
  temp: yup.string().when('wb', {
    is: (wb) => wb == 'Color Temperature',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema,
  })
})
