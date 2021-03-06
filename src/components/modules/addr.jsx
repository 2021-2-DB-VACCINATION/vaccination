import DaumPostCode from "react-daum-postcode";
import "./addr.css";
const DaumPost = ({ setAddr, setSido, setSigungu, open, setOpen }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      setAddr(fullAddress);
      setSido(data.sido);
      setSigungu(data.sigungu);
      if (open) {
        setOpen(!open);
      }
    }
  };
  return (
    <DaumPostCode onComplete={handleComplete} autoClose className="postCode" />
  );
};
export default DaumPost;
