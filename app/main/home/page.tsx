"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Homeheader from "@/app/component/Homeheader";
import Homeinterest from "@/app/component/Homeinterest";
import Homerecommand from "@/app/component/Homerecommand";
import Homerefer from "@/app/component/Homerefer";

export default function Home() {
  const [suggestData, setSuggestData] = useState([]);

  useEffect(() => {
    getSuggest();
  }, []);

  const getSuggest = async () => {
    try {
      const response = await axios.get("/api/recommend/cat/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setSuggestData(response.data.data);
        return true;
      }
      return false;
    } catch (error) {
      //console.log("Error : ", error);
      return false;
    }
  };

  // //console.log("suggestData : ", suggestData);

  return (
    <div className="flex flex-col items-start gap-4 mx-8 my-12">
      <Homeheader />
      <Homerecommand />
      <Homeinterest suggestData={suggestData} />
      <Homerefer />
    </div>
  );
}
