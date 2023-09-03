import React from "react";

const Profile = React.lazy(() => import("remote_profile/Profile"));

export default function Dev() {
  return (
    <>
      <Profile />
    </>
  );
}
