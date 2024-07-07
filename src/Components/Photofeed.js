import React, { useState, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import usePhotoFeed from "../Hooks/UsePhotoFeed";
import { PhotoContext } from "../Context/PhotoContext";
import "./Photofeed.css";

const PhotoFeed = () => {
  const { state, dispatch } = useContext(PhotoContext);
  const [pageNumber, setPageNumber] = useState(1);

  const { photos, hasMore, loading, error } = usePhotoFeed(pageNumber);

  const observer = useRef();
  const lastPhotoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const toggleLike = (photoId) => {
    dispatch({
      type: "TOGGLE_LIKE",
      payload: photoId,
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Photo Feed</h1>
      <div className="photo-grid">
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <div
                ref={lastPhotoElementRef}
                key={photo.id}
                className="photo-card"
              >
                <div className="username-section">
                  <img
                    src={photo.user.profile_image.small}
                    alt={photo.user.username}
                    className="user-profile-image"
                  />
                  <Link
                    to={`/user/${photo.user.username}`}
                    style={{
                      textDecoration: "none",
                      color: "rgb(45, 95, 195)",
                      fontWeight: "bolder",
                      fontSize: "16px",
                    }}
                    className="username"
                  >
                    {photo.user.username}
                  </Link>
                </div>
                <img
                  src={photo.urls.small}
                  alt={photo.description}
                  className="photo-image"
                />
                <div className="photo-info">
                  <button onClick={() => toggleLike(photo.id)}>
                    {state.likedPhotos.includes(photo.id) ? "❤️" : "🤍"}
                  </button>
                  <p>
                    {photo.likes +
                      (state.likedPhotos.includes(photo.id) ? 1 : 0)}{" "}
                    likes
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={photo.id} className="photo-card">
                <div className="username-section">
                  <img
                    src={photo.user.profile_image.small}
                    alt={photo.user.username}
                    className="user-profile-image"
                  />
                  <Link
                    to={`/user/${photo.user.username}`}
                    style={{
                      textDecoration: "none",
                      color: "rgb(45, 95, 195)",
                      fontWeight: "bolder",
                      fontSize: "16px",
                    }}
                    className="username"
                  >
                    {photo.user.username}
                  </Link>
                </div>
                <img
                  src={photo.urls.small}
                  alt={photo.description}
                  className="photo-image"
                />
                <div className="photo-info">
                  <button onClick={() => toggleLike(photo.id)}>
                    {state.likedPhotos.includes(photo.id) ? "❤️" : "🤍"}
                  </button>
                  <p>
                    {photo.likes +
                      (state.likedPhotos.includes(photo.id) ? 1 : 0)}{" "}
                    likes
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default PhotoFeed;
