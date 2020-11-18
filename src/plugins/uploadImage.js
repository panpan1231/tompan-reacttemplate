import { apiPostImage } from "../apis/imageServer";

async function uploadImage(img, folderName) {
  let formFormat = new FormData();
  formFormat.append("img", img);
  formFormat.append("folder", folderName);
  try {
    let success = await apiPostImage(formFormat);
    return Promise.resolve(success.data.data.filepath);
  } catch (err) {
    return Promise.reject(err);
  }
}
export default uploadImage;
