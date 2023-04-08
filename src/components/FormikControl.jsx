import styled from "styled-components"
import { Field, ErrorMessage } from "formik"
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"
import { useEffect } from "react";

const FormControl = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  margin:20px 0;
  input,select{
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid gray;
    border-radius: 2px;
    font-size: 18px;
    background-color: #fff;
    &:focus{
    outline: none;
    }
  }
  input[type=file]{
    display:none
  }
`
const ImgLabel = styled.label`
  cursor: pointer;
  color: rgb(0, 128, 87);
  background-color: rgb(129, 201, 201);
  border-radius: 5px;
  width: 70px;
  height: 30px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`
const InStockOption = styled.option`
  height: 25px;
  padding: 5px 10px;
  border-radius: 2px;
  font-size: 15px;
  background-color: white;
`
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #9b9b9b;
  `
const ErrorMsg = styled.label`
  font-size: 12px;
  padding: 3px;
  color: red;
  `
const ImgPreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  `

const FormikControl = ({ control, label, name, options, img, onFileChange, type, ...rest }) => {

  const [fileToUpload, setFileToUpload] = useState("")
  const [profileImg, setProfileImg] = useState("https://firebasestorage.googleapis.com/v0/b/ecommerce-images-pr.appspot.com/o/images%2Fdefault-product.png?alt=media&token=303d08ae-ada8-401a-bb99-1bc1e82ec7f0")

  useEffect(() => {
    const handleImgUpload = async () => {
      const fileName = new Date().getTime() + fileToUpload.name
      const storage = getStorage(app); // Create a root reference
      const storageRef = ref(storage, 'images/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            setProfileImg(downloadURL)
          });
        }
      );
    }
    fileToUpload && handleImgUpload()
  }, [fileToUpload])


  switch (control) {
    case "textarea":
    case "select": return (
      <FormControl>
        <Label htmlFor={name}>{label.toUpperCase()}</Label>
        <Field as="select" id={name} name={name}>
          {
            options.map(option => (
              <InStockOption key={option.key} value={option.value}>{option.key}</InStockOption>
            ))
          }
        </Field>
        <ErrorMessage name={name}>
          {error => <ErrorMsg>{error}</ErrorMsg>}
        </ErrorMessage>
      </FormControl>
    )
    case "radio":
    case "checkbox":
    case "imgUpload": return (
      <FormControl style={control === "imgUpload" ? { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" } : null}>
        <Field id={name} name={name}>
          {
            ({ field, form, meta }) => {
              console.log(form)
              return (
                <input
                  id={name}
                  // value={meta.value}
                  type={type}
                  onChange={e => { setFileToUpload(e.target.files[0]); form.setFieldValue("file", profileImg) }}
                />
              )
            }
          }
        </Field>
        <ImgPreview src={profileImg} />
        <ImgLabel htmlFor={name}>{label}</ImgLabel>
      </FormControl>
    )
    default: return (
      <FormControl>
        <Label htmlFor={name}>{label.toUpperCase()}</Label>
        <Field id={name} name={name}>
          {
            ({ field, form, meta }) => {
              return (
                <input {...rest} {...field} style={(meta.error && meta.touched) ? { border: "solid red 1px" } : null} />
              )
            }
          }
        </Field>
        <ErrorMessage name={name}>
          {error => <ErrorMsg>{error}</ErrorMsg>}
        </ErrorMessage>
      </FormControl>
    )
  }

}

export default FormikControl