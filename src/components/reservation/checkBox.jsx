import React, { useState, useCallback, useEffect } from "react";
import "./checkBox.css";

const dataLists = [
  { id: 1, data: "화이자" },
  { id: 2, data: "모더나" },
  { id: 3, data: "아스트라제네카" },
  { id: 4, data: "얀센" },
];

//const [checkedItems, setCheckedItems] = useState(new Set());

// const checkedItemHandler = (id, isChecked) => {
//   if(isChecked) {
//     checkedItems.add(id);
//     setCheckedItems(checkedItems);
//   } else if(!isChecked && checkedItems.has(id)) {
//     checkedItems.delete(id);
//     setCheckedItems(checkedItems);
//   }
// };

const CheckBox = ({ name1, name2, name3, name4, flist, setFlist }) => {
  const [f1, setF1] = useState(flist[0]);
  const [f2, setF2] = useState(flist[1]);
  const [f3, setF3] = useState(flist[2]);
  const [f4, setF4] = useState(flist[3]);
  useEffect(() => {
    let arr = [];
    arr.push(f1, f2, f3, f4);
    setFlist(arr);
  }, [f1, f2, f3, f4]);

  return (
    <div className={"checkset"}>
      <label className={"checksetflex"} id="check1">
        <input
          className={"checkbox"}
          type="checkbox"
          onClick={() => (f1 == 1 ? setF1(0) : setF1(1))}
        />
        <div className={"checkboxtext"}>{name1}</div>
      </label>
      <label className={"checksetflex"} id="check2">
        <input
          className={"checkbox"}
          type="checkbox"
          onClick={() => (f2 == 1 ? setF2(0) : setF2(1))}
        />
        <div className={"checkboxtext"}>{name2}</div>
      </label>
      <label className={"checksetflex"} id="check3">
        <input
          className={"checkbox"}
          type="checkbox"
          onClick={() => (f3 == 1 ? setF3(0) : setF3(1))}
        />
        <div className={"checkboxtext"}>{name3}</div>
      </label>
      <label className={"checksetflex"} id="check4">
        <input
          className={"checkbox"}
          type="checkbox"
          onClick={() => (f4 == 1 ? setF4(0) : setF4(1))}
        />
        <div className={"checkboxtext"}>{name4}</div>
      </label>
    </div>
  );
};
export default CheckBox;
