import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { useSelector } from "react-redux";
import { getProfile } from "../redux/feature/authSlice";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import Loading from "../component/Loading";
import Image from "./Image";

const Profile = () => {
  const { dispatch, user } = useContext(GlobalContext);
  const { id } = useParams();

  const { profile, loading } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (!id) {
      dispatch(getProfile(user?.result?._id));
    } else {
      dispatch(getProfile(id));
    }
  }, [id]);

  return (
    <MDBCard
      alignment="center"
      style={{
        margin: "auto auto 10px auto",
        maxWidth: "800px",
        alignContent: "center",
        marginTop: "75px",
        minHeight: "calc(100vh - 85px)",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <MDBCardBody style={{ display: "flex", gap: "25px" }}>
          <Image
            src={profile?.userImage || "/img/defaultUserImage.jpg"}
            alt={`${profile?.firstName} ${profile?.lastName}`}
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "10px",
            }}
          />
          <div style={{ textAlign: "start" }}>
            <div>
              <span>
                <b>First name:</b>
              </span>{" "}
              <p>{profile?.firstName}</p>
            </div>
            <div>
              <span>
                <b>Last name:</b>
              </span>{" "}
              <p>{profile?.lastName}</p>
            </div>
            <div>
              <span>
                <b>Email:</b>{" "}
              </span>
              <p>
                <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
              </p>
            </div>
            <div>
              <span>
                <b>Adverts:</b>{" "}
              </span>
              <p>
                {profile?.adverts.length === 0
                  ? "Haven't created any adverts"
                  : profile?.adverts.map((advert, index) => (
                      <span>
                        <Link key={advert._id} to={`/advert/${advert._id}`}>
                          {advert.title}
                        </Link>
                        {index !== profile?.adverts.length - 1 && ", "}{" "}
                      </span>
                    ))}
              </p>
            </div>
          </div>
        </MDBCardBody>
      )}
    </MDBCard>
  );
};

export default Profile;
