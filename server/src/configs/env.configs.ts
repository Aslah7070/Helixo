
import dotenv from "dotenv";
dotenv.config();
export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get MONGO_URI() {
    return process.env.MONGO_URI;
  },
  get JWT_ACCESS_SECRET() {
    return process.env.JWT_ACCESS_SECRET;
  },
  get JWT_REFRESH_SECRET() {
    return process.env.JWT_REFRESH_SECRET;
  },
  get REDIS_URL() {
    return process.env.REDIS_URL;
  },
  get CLIENT_ORIGIN() {
    return process.env.CLIENT_ORIGIN;
  },
    get CLIENT_ORIGIN_LOCAL() {
    return process.env.CLIENT_ORIGIN_LOCAL;
  },
  get RESET_PASS_URL() {
    return process.env.RESET_PASS_URL;
  },

  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
   get EMAIL_USER() {
    return process.env.EMAIL_USER;
  },
   get EMAIL_PASSWORD() {
    return process.env.EMAIL_PASSWORD;
  },
     get GEMINI_API_KEY() {
    return process.env.GEMINI_API_KEY;
  },
  get MODEL_TO_USER(){
    return process.env.MODEL_TO_USER
  },
    get AWS_REGION(){
    return process.env.AWS_REGION
  },
    get AWS_ACCESS_KEY_ID(){
    return process.env.AWS_ACCESS_KEY_ID
  },
    get AWS_SECRET_ACCESS_KEY(){
    return process.env.AWS_SECRET_ACCESS_KEY
  },
    get S3_BUCKET_NAME(){
    return process.env.S3_BUCKET_NAME
  }
};