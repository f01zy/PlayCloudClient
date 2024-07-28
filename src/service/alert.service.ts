import { IAlert, setAlert } from '@/store/site/site.slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from "react";

export const alert = (dispatch: Dispatch<UnknownAction>, alert: IAlert, currentAlert: IAlert | null) => {
  if (currentAlert) return
  dispatch(setAlert(alert))
  setTimeout(() => {
    dispatch(setAlert(null))
  }, 5000)
}