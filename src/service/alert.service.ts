import { IAlert, setAlert, setAlertSafeMessage } from '@/store/site/site.slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from "react";

export const alert = (dispatch: Dispatch<UnknownAction>, alert: IAlert, currentAlert: IAlert | null) => {
  if (currentAlert) return
  dispatch(setAlert(alert))
  dispatch(setAlertSafeMessage(alert.message))
  setTimeout(() => { dispatch(setAlert(null)) }, 5000)
}