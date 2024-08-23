import { hideAlert, setAlert } from '@/store/site/site.slice';
import { UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from "react";

export const alert = (dispatch: Dispatch<UnknownAction>, alert: string, isShow: boolean) => {
  if (isShow) return
  dispatch(setAlert(alert))
  setTimeout(() => { dispatch(hideAlert()) }, 5000)
}