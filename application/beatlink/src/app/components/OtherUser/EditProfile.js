import React, { useState } from "react";
import styles from "../css/editprofile.module.scss";
import { FiEdit3 } from "react-icons/fi";
import { Formik, Field, Form } from "formik";
import axios from "axios";
// import { useToast } from "@chakra-ui/toast";

const Editprofile = ({ userDetail, userDetails, updateUserDetails }) => {
  //   const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const submitChange = (values) => {
    let data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      ProfileBio: values.ProfileBio,
    };
    try {
      axios({
        method: "patch",
        // maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_LOCAL}/user/profileUpdate`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
        .then((res) => {
          // console.log("Profile updated successfully:", res.data);
          const updatedUser = {
            name: `${res.data.firstName} ${res.data.lastName}`,
            email: res.data.email,
            ProfileBio: res.data.ProfileBio,
            profileImage: res.data.profileImage,
          };

          updateUserDetails(updatedUser);

          localStorage.setItem("userData", JSON.stringify(updatedUser));

          console.log("Updated User Details:", {
            name: `${res.data.firstName} ${res.data.lastName}`,
            email: res.data.email,
            ProfileBio: res.data.ProfileBio,
          });
        })
        .catch((error) => {
          console.log("Error fetching data: ", error);
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <div className={styles.editProMainDiv}>
        <div className={styles.editProInfo}>
          <div className={styles.editProPhoto}>
            <div className={styles.editProImg}>
              <img src="/default.jpg" alt="profilehead" />
            </div>
            <div className={styles.cameraIcon}>
              <label for="file-upload">
                <FiEdit3 />
              </label>
              <input
                id="file-upload"
                type="file"
                name="Choose Image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setSelectedImage(URL.createObjectURL(file));
                  } else {
                    console.error("Invalid file type. Please select an image.");
                  }
                }}
              />
            </div>
          </div>
          <p>Change Profile</p>
        </div>
        <div className={styles.editProForm}>
          <div className={styles.form}>
            <Formik
              initialValues={{
                firstName: userDetails?.name.split(" ")[0] || "",
                lastName: userDetails?.name.split(" ")[1] || "",
                email: userDetails?.email || "",
                ProfileBio: userDetails?.ProfileBio || "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                submitChange(values);
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={styles.projectDescriptionDiv}>
                    <div className={styles.lableInput}>
                      <div className={styles.leftMail}>
                        <label htmlFor="name" className={styles.lable}>
                          First Name
                        </label>
                        <Field
                          id="name"
                          name="firstName"
                          fieldName="firstName"
                          className={styles.inp}
                        />
                        {errors.firstName && touched.firstName ? (
                          <div className={styles.errMes}>
                            {errors.firstName}
                          </div>
                        ) : null}
                      </div>
                      <div className={styles.rightCall}>
                        <label htmlFor="name" className={styles.lable}>
                          Last Name
                        </label>
                        <Field
                          id="name"
                          name="lastName"
                          fieldName="lastName"
                          className={styles.inp}
                        />
                        {errors.lastName && touched.lastName ? (
                          <div className={styles.errMes}>{errors.lastName}</div>
                        ) : null}
                      </div>
                    </div>
                    {/* <div className={styles.lableEmail}>
                      <label htmlFor="email" className={styles.lable}>
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        fieldName="email"
                        className={styles.inp}
                      />
                      {errors.email && touched.email ? (
                        <div className={styles.errMes}>{errors.email}</div>
                      ) : null}
                    </div> */}
                    <div className={styles.lableEmail}>
                      <label htmlFor="email" className={styles.lable}>
                        ProfileBio
                      </label>
                      <Field
                        id="profilebio"
                        name="ProfileBio"
                        fieldName="ProfileBio"
                        className={styles.inp}
                      />
                      {errors.ProfileBio && touched.ProfileBio ? (
                        <div className={styles.errMes}>{errors.ProfileBio}</div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className={styles.btn}
                      // onChange={(e) => {
                      //   submitChange(e.target.value);
                      // }}
                    >
                      Save Changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
