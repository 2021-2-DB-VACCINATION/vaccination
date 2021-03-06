import { WholeScreenWithHeader } from "../components/wholeScreen";
import Title from "../components/reservation/title";
import CategoryBox from "../components/reservation/categoryBox";
import "./reservationMain.css";
const ResMain = () => {
  return (
    <WholeScreenWithHeader>
      <section className="reservationMain">
        <Title title={"예약하기"} subtitle={"코로나19 백신을 예약해보세요!"} />
        <section className="contentSection">
          <CategoryBox
            bTitle={"예방접종 사전예약"}
            content={"지금 코로나19 백신을 예약하세요!"}
            url={"/reservationCheck"}
          />
          <CategoryBox
            bTitle={"잔여백신 조회"}
            content={"우리 집 근처의 잔여백신을 조회해보세요!"}
            url={"/reservationNoShow"}
          />
        </section>
      </section>
    </WholeScreenWithHeader>
  );
};
export default ResMain;
