import { Link } from "react-router-dom";

import "./ButtonGenerateRDO.css";

type RdoProps = {
  number: string;
  nameConstruction: string;
  client: string;
  description: string;
  location: string;
  processAdm: string;
  measurement: string;
  oversight: string;
};

export function ButtonGenerateRDO(props: RdoProps) {
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles key press on button, if Enter is pressed, saves data to localStorage
   * @param {any} e - key press event
   */
  /******  981138ab-d0bc-499c-9fe0-c3672fab56cc  *******/ const handleKeyPress =
    (e: any) => {
      if (e.key === "Enter") {
        console.log("You must have pressed Enter ");
        setDataLocalStorage();
      }
    };

  const setDataLocalStorage = () => {
    localStorage.setItem("@number", props.number);
    localStorage.setItem("@nameConstruction", props.nameConstruction);
    localStorage.setItem("@client", props.client);
    localStorage.setItem("@description", props.description);
    localStorage.setItem("@location", props.location);
    localStorage.setItem("@processAdm", props.processAdm);
    localStorage.setItem("@measurement", props.measurement);
    localStorage.setItem("@oversight", props.oversight);
  };

  return (
    <div>
      <div className="button-generate" onKeyDown={handleKeyPress}>
        <Link to={"/report"} style={{ color: "#fff" }}>
          <button
            onClick={() => {
              setDataLocalStorage();
            }}
          >
            {" "}
            Gerar RDO{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
