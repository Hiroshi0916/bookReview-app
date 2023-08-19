import React, { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./interfaces/AuthContextType";
import { ErrorResponse } from "./interfaces/ErrorResponse";
import "./Profile.css";

function Profile() {
  const { user, updateUsername, setAvatarUrl } = useContext(
    AuthContext
  ) as AuthContextType;
  const initialName = localStorage.getItem("name") || (user ? user.name : "");
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const url = "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";

  const uploadAvatar = async () => {
    const formData = new FormData();
    if (avatar) {
      console.log("avatar name:", avatar.name);
      console.log("avatar size:", avatar.size);
      console.log("avatar type:", avatar.type);
    }
    if (avatar) {
      formData.append("icon", avatar);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${url}/uploads`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data.iconUrl;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error in uploadAvatar function:", error);
        if (error.response) {
          console.error("Server response:", error.response.data);
        }
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error;
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    let newAvatarUrl = "";
    if (avatar) {
      try {
        const avatarResponse = await uploadAvatar();
        newAvatarUrl = avatarResponse;
      } catch (error) {
        console.error("Error uploading avatar:", error);
        return;
      }
    }

    axios
      .put(
        `${url}/users`,
        { name, avatar: newAvatarUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const newName = response.data.name;
        localStorage.setItem("name", newName);
        updateUsername(newName);
        if (newAvatarUrl) {
          localStorage.setItem("avatarUrl", newAvatarUrl);
          setAvatarUrl(newAvatarUrl);
        }
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error("Error in updateProfile function - PUT /users:", error);
        if (error.response) {
          console.error(error.response.data.ErrorMessageEN);
        }
      });
  };

  return (
    <div className="center-div">
      <div className="content">
        <label>
          ユーザー名：
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className="avatar-label">
          アバター：
          <input
            type="file"
            onChange={(e) =>
              setAvatar(e.target.files ? e.target.files[0] : null)
            }
            accept=".jpg, .png"
          />
        </label>
        <br />
      </div>
      <button className="updateButton" type="submit" onClick={updateProfile}>
        Update Profile
      </button>
    </div>
  );
}

export default Profile;
