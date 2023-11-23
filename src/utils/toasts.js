import {toast} from 'sonner'
export const errorToast = (text, color = '#fb3c22') =>
  toast.error(text, {style:{
    width:"100%",
    backgroundColor:color,
    color:"white"
  }})

export const successToast = (text, color = '#1850BC') =>
  toast.success(text,{
    style:{
      width:"100%",
      backgroundColor:color,
      color:"white"
    }
  })
export const warningToast = (text,goTo) =>
toast.warning(text, {
  style:{
    width:"100%",
  
  },
  action: {
    label: 'Log In',
    onClick: () => goTo()
  },
})
export const warningToastNoAction = (text) =>
toast.warning(text, {
  style:{
    width:"100%",
  
  }
})

