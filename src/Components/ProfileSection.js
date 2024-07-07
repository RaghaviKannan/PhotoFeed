import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faUsers,
  faUserFriends,
  faImages,
  faHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./ProfileSection.css";

const ProfileSection = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [detailedUserDetails, setDetailedUserDetails] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/users/${userId}`,
          {
            headers: {
              Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
            },
          }
        );
        setDetailedUserDetails(response.data);
        if (response.data.links && response.data.links.photos) {
          const photosResponse = await axios.get(
            response.data.links.photos + `?per_page=50`,
            {
              headers: {
                Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
              },
            }
          );
          // Limit to the first 10 photos
          setUserPhotos(photosResponse.data.slice(0, 10));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="profile-container">
      {!loading && (
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          title="Back to feed"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
        </button>
      )}
      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : detailedUserDetails ? (
        <>
          <div className="profile-info">
            <img
              src={detailedUserDetails.profile_image.large}
              alt={detailedUserDetails.username}
              className="profile-image"
            />
            <div>
              <h1 className="username">{detailedUserDetails.username}</h1>
              <div className="profile-stats-box">
                <div className="profile-stats">
                  <div className="stat">
                    <div className="stat-circle">
                      <FontAwesomeIcon icon={faCamera} className="icon" />
                      <h3>{detailedUserDetails.total_photos}</h3>
                      <p>Photos</p>
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-circle">
                      <FontAwesomeIcon icon={faUsers} className="icon" />
                      <h3>{detailedUserDetails.followers_count}</h3>
                      <p>Followers</p>
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-circle">
                      <FontAwesomeIcon icon={faUserFriends} className="icon" />
                      <h3>{detailedUserDetails.following_count}</h3>
                      <p>Following</p>
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-circle">
                      <FontAwesomeIcon icon={faImages} className="icon" />
                      <h3>{detailedUserDetails.total_collections}</h3>
                      <p>Collections</p>
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-circle">
                      <FontAwesomeIcon icon={faHeart} className="icon" />
                      <h3>{detailedUserDetails.total_likes}</h3>
                      <p>Likes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-bio">
                <h2>
                  {detailedUserDetails.first_name}{" "}
                  {detailedUserDetails.last_name}
                </h2>
                <p>{detailedUserDetails.bio}</p>
              </div>
            </div>
          </div>
          <hr className="profile-divider" />
          <div className="profile-photos-grid">
            {userPhotos.map((photo) => (
              <div key={photo.id} className="photo">
                <img src={photo.urls.small} alt={photo.alt_description} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default ProfileSection;
