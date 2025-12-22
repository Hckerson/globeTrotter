import { Resend } from "resend"

const {RESEND_API_KEY} = process.env

const connectResend = async()=>{
  return new Resend(RESEND_API_KEY)
}

const resend = connectResend()

export {resend}
