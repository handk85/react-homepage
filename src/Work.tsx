import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { load } from "js-yaml";

interface ContractDate {
  month: string;
  year: number;
}

interface Work {
  title: string;
  affiliation: string;
  url?: string;
  city: string;
  country: string;
  begin: ContractDate;
  end?: ContractDate;
}

function WorkExperience() {
  const [work, setWork] = useState<Work[]>([]);

  useEffect(() => {
    fetch("./data/work.yaml").then(async (response) => {
      const text = await response.text();
      const data: Work[] = (await load(text)) as Work[];
      setWork(data);
    });
  }, []);

  return work.length < 1 ? (
    <Spinner animation="border" />
  ) : (
    <>
      <h3>
        <FontAwesomeIcon icon={faBriefcase} /> Work Experience
      </h3>
      <ul>
        {work.map((item, i) => {
          return (
            <li key={i}>
              {item.title},{" "}
              {item.url ? (
                <a href={item.url}>{item.affiliation}</a>
              ) : (
                item.affiliation
              )}
              , {item.city}, {item.country}, {item.begin.month}{" "}
              {item.begin.year} ~{" "}
              {item.end ? `${item.end.month} ${item.end.year}` : "Present"}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default WorkExperience;
