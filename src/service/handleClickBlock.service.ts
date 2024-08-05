import { IAlert } from "@/store/site/site.slice"
import { alert } from "./alert.service"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { blocked } from "./blocked.service"

export const handleClickBlock = (dispatch: Dispatch<UnknownAction>, currentBlocked: boolean, currentAlert: IAlert | null) => {
  if (currentBlocked) { alert(dispatch, { message: "There are too many requests. Try it in 5 seconds" }, currentAlert); return true }
  else { blocked(dispatch, currentBlocked); return false }
}