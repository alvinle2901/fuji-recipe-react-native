import * as Yup from 'yup'

export const validateSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  film: Yup.string().required('This field is required'),
  sensor: Yup.string().required('This field is required'),
  iso: Yup.string().required('This field is required'),
  dynamicRange: Yup.string().required('This field is required'),
  grainEffect: Yup.string().required('This field is required'),
  ccfx: Yup.string().required('This field is required'),
  wb: Yup.string().required('This field is required'),
  temp: Yup.string().required('This field is required')
})
