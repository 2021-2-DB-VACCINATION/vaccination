import EasyCheck from "../components/home/easyCheck";
import { WholeScreenWithHeader } from "../components/wholeScreen";
import LineChart from "../components/home/linechart";
import TableChart from "../components/home/tablechart";
import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [firstnum, setFirstnum] = useState("");
  const [donenum, setdonenum] = useState("");
  const [personall, setpersonall] = useState("");
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [firstloc, setFirstloc] = useState([]);
  const [doneloc, setDoneloc] = useState([]);
  const [firstage, setFirstage] = useState([]);
  const [doneage, setDoneage] = useState([]);

  const getInfo = () => {
    axios
      .post("/home/index")
      .then((response) => {
        setFirstnum(response.data.person_vac1[0].count);
        setdonenum(response.data.person_vac2[0].count);
        setpersonall(response.data.person_all[0].count);
        setFirstloc(response.data.byLoc_vac1);
        setDoneloc(response.data.byLoc_vac2);
        setFirstage(response.data.byAge_vac1);
        setDoneage(response.data.byAge_vac2);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const checkMonth = () => {
    setCheck1(true);
  };

  const checkDay = () => {
    setCheck1(false);
  };

  const checkLoc = () => {
    setCheck2(true);
  };

  const checkAge = () => {
    setCheck2(false);
  };

  const MakeLocChart = () => {
    for (let i = 0; i < firstloc.length; i++) {
      for (let j = 0; j < doneloc.length; j++) {
        if (doneloc[j].sido_code == firstloc[i].sido_code) {
          firstloc[i].count2 = doneloc[j].count;
          break;
        } else {
          firstloc[i].count2 = 0;
        }
      }
      if (!firstloc[i].count2) {
        firstloc[i].count2 = 0;
      }
    }
    return <TableChart check={true} result={firstloc} />;
  };

  const MakeAgeChart = () => {
    for (let i = 0; i < firstage.length; i++) {
      for (let j = 0; j < doneage.length; j++) {
        if (doneage[j].ages == firstage[i].ages) {
          firstage[i].count2 = doneage[j].count;
          break;
        } else {
          firstage[i].count2 = 0;
        }
      }
      if (!firstage[i].count2) {
        firstage[i].count2 = 0;
      }
    }
    return <TableChart check={false} result={firstage} />;
  };

  var vac1_per = (firstnum / personall) * 100;
  var vac2_per = (donenum / personall) * 100;
  return (
    <WholeScreenWithHeader>
      <div className={"homeall"}>
        <div className={"leftside"}>
          <div className={"smallleft"}>
            <div className={"boldtitle"}>?????? ?????? ?????????</div>
            <div className={"donebox"}>
              <div className={"done"}>
                <div className={"bluetitle"}>1??? ????????????</div>
                <div className={"bluenum"}>{firstnum}</div>
                <div className={"blueper"}>({vac1_per.toFixed(2)}%)</div>
              </div>
              <div className={"done"}>
                <div className={"redtitle"}>?????? ????????????</div>
                <div className={"rednum"}>{donenum}</div>
                <div className={"redper"}>({vac2_per.toFixed(2)}%)</div>
              </div>
            </div>
            <div className={"linechart"}>
              <LineChart check={check1} />
            </div>
            <div className={"mondaybtnset"}>
              <button
                type="button"
                className={check1 ? "selectbutton" : "unselect"}
                onClick={() => checkMonth()}
              >
                ??????
              </button>
              <button
                type="button"
                className={check1 ? "unselect" : "selectbutton"}
                onClick={() => checkDay()}
              >
                ?????????
              </button>
            </div>
          </div>
        </div>
        <div className={"rightside"}>
          <div className={"smallright"}>
            <div>
              <div className={"locagebtnset"}>
                <button
                  type="button"
                  className={check2 ? "selectbutton" : "unselect"}
                  onClick={() => checkLoc()}
                >
                  ????????? ?????? ??????
                </button>
                <button
                  type="button"
                  className={check2 ? "unselect" : "selectbutton"}
                  onClick={() => checkAge()}
                >
                  ????????? ?????? ??????
                </button>
              </div>
              <div className={"tablechart"}>
                <div className={"oneline"}>
                  <div className={"location"}>??????</div>
                  <div className={"first"}>1??? ?????? ?????????</div>
                  <div className={"done"}>?????? ?????? ?????????</div>
                </div>
                {check2 ? <MakeLocChart /> : <MakeAgeChart />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WholeScreenWithHeader>
  );
};
export default Home;
