"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Homeheader from "@/app/component/Homeheader";
import Homeinterest from "@/app/component/Homeinterest";
import Homerecommand from "@/app/component/Homerecommand";
import Homerefer from "@/app/component/Homerefer";
import Drawer from "@/app/component/MUI/Drawer";

export default function Home() {

  const [suggestData, setSuggestData] = useState([]);
  const [notification, setNotification] = useState<any[]>([]);

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    getSuggest();
    getNotification();
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

const getNotification = async () => {
    try {
        const response = await axios.get('/api/user/noti', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            setNotification(response.data.data);
        }

    } catch (error) {
        console.log('Error : ', error);
    }
}

  // console.log("suggestData : ", suggestData);

  // console.log("notification : ", notification);
  

  return (
    <div className="flex flex-col items-start gap-4 mx-8 pb-24 mt-2">
      <Homeheader setOpenDrawer={setOpenDrawer} notification={notification}/>
      <Homerecommand />
      <Homeinterest suggestData={suggestData} />
      <Homerefer />
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} notification={notification}/>
    </div>
  );
}
