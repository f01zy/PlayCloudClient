import { alert } from "./alert.service"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { blocked } from "./blocked.service"

export const handleClickBlock = (dispatch: Dispatch<UnknownAction>, currentBlocked: boolean, isShow: boolean) => {
  if (currentBlocked) { alert(dispatch, "There are too many requests. Try it in 5 seconds", isShow); return true }
  else { blocked(dispatch, currentBlocked); return false }
}