import { IAlert, setAlert } from '@/store/site/site.slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from "react";

export const alert = (dispatch: Dispatch<UnknownAction>, alert: Omit<IAlert, "show">, currentAlert: IAlert | null) => {
  if (currentAlert) return
  dispatch(setAlert({
    ...alert,
    show: true
  }))
  setTimeout(() => {
    dispatch(setAlert({
      ...alert,
      show: false
    }))
  }, 5000)
}