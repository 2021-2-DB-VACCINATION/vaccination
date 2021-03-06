import Title from "../components/reservation/title";
import { WholeScreenWithHeader } from "../components/wholeScreen";
import CheckBox from "../components/reservation/checkBox";
import HospitalList from "../components/reservation/hospitalList";
import initTmap from "../components/tmapfornoshow";
import "./reservationNoShow.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReservationNoShow = () => {
  const navigate = useNavigate();
  const [hosList, setHosList] = useState([]);
  const [search, setSearch] = useState(true);
  let loc = {};
  let arr = [];
  let x = 0,
    y = 0;
  const [flist, setFlist] = useState([0, 0, 0, 0]);

  const token = localStorage.getItem("accessToken");

  const getNoShow = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .post("/vaccine/index", { jwtToken: token, flist: flist })
      .then((response) => {
        setHosList(response.data.hosList);
        loc = {};
        loc.name = "νμ¬ μμΉ";
        loc.x = x = response.data.pos[0].x;
        loc.y = y = response.data.pos[0].y;
        arr.push(loc);
        console.log(response);
        let length = response.data.hosList.length;
        response.data.hosList.map((data, i) => {
          axios
            .post("/search/more", { idx: data.Hnumber, isHos: true })
            .then((response) => {
              loc = {};
              loc.name = response.data.info[0].Hname;
              loc.x = response.data.info[0].x;
              loc.y = response.data.info[0].y;
              arr.push(loc);
              if (i == length - 1) {
                initTmap(x, y, arr);
              }
            })
            .catch((e) => {
              console.log(e);
              navigate("/noshowUnable")
            });
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getNoShow();
  }, []);

  useEffect(() => {
    console.log("flist===", flist);
  }, [flist]);

  return (
    <WholeScreenWithHeader>
      <section className="noshow">
        <section className="leftside">
          <div className="head">
            <Title
              title={"μμ¬λ°±μ  μ‘°ν"}
              subtitle={"μ§ κ·Όμ²μ μμ¬λ°±μ μ μ‘°νν΄λ³΄μΈμ!"}
            />
          </div>
          <div className="noshowdisplay">
            <div className="checkbig">
              <CheckBox
                name1={"νμ΄μ"}
                name2={"λͺ¨λλ"}
                name3={"μμ€νΈλΌμ λ€μΉ΄"}
                name4={"μμΌ"}
                flist={flist}
                setFlist={setFlist}
              />
            </div>
            <button
              type="button"
              className="checksearchbtn"
              onClick={() => {
                if (search) {
                  console.log("noshow");
                  getNoShow();
                } else {
                  window.location.reload();
                }
                setSearch(!search);
              }}
            >
              {search == true ? "κ²μ" : "μ΄κΈ°ν"}
            </button>
          </div>
          <div className="hospitalListBox">
          {search == false ? ( hosList != [] && hosList !="" ? (
            hosList.map((data, i) => {
              return (
                <HospitalList
                  id={data.Hnumber}
                  name={data.Hname}
                  vaccine={data.Vaccine}
                  key={i}
                />
              );
            })):(<div className="nobox">κ·Όμ²μ μμ¬λ°±μ μ΄ μμ΅λλ€</div>)
          ):(
            <div className="nobox">κ²μμ μ§νν΄μ£ΌμΈμ</div>
          )}
          </div>
        </section>
        <div className="mapBox">
          {hosList != [] && hosList != "" ? <div className="mapMap" id="map_div" /> : <></> }
        </div>
      </section>
    </WholeScreenWithHeader>
  );
};
export default ReservationNoShow;
