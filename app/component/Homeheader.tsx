"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import learningcats from "../file/learningcats.json";

export default function Homeheader({ setOpenDrawer, notification }: any) {
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [newListCats, setNewListCats] = useState<any[]>([]);
  const [activeSearch, setActiveSearch] = useState<any[]>([]);

  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (learningcats.length > 0) {
      listCatBreed();
    }
  }, [learningcats]);

  // console.log("newListCats : ", newListCats);

  function listCatBreed() {
    setNewListCats(
      learningcats.map((cat: any) => ({
        thai: cat.name,
        english: cat.english_name,
      }))
    );
  }

  function handleSearch(e: any) {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setActiveSearch([]);
      return false;
    }
    setActiveSearch(
      newListCats
        .filter(
          (words: any) =>
            words.thai.toLowerCase().includes(searchValue) ||
            words.english.toLowerCase().includes(searchValue)
        )
        .map((word: any) => word.thai)
        .slice(0, 5)
    );
  }

  const selectSearch = (cat: string) => {
    router.push(`/main/home/learning/${cat}`); //slug
  };

  useEffect(() => {
    // console.log("notification in HomeHeader : ", notification);

    const today = new Date().toISOString().split("T")[0];
    const lastShownDay = localStorage.getItem('lastShownDay')
    const storedNotification = localStorage.getItem('shownNotification')

    if(lastShownDay !== today){
      setShowNotification(true);
      localStorage.setItem('lastShownDay', today)
    }else if(storedNotification !== null){
      setShowNotification(JSON.parse(storedNotification));// T or F base on storedNotification in localsotrage
      // console.log(JSON.parse(storedNotification));
      
    }else if(notification !== null){
      setShowNotification(true);
    }

  }, [notification]);

  const toggleDrawer = () => {
    setOpenDrawer(true);
    setShowNotification(false);
    localStorage.setItem('shownNotification', 'false')
  };

  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full ">
      <div className="flex w-full justify-between items-center">
        <h1 className="shrink-0 text-2xl text-primary not-italic font-semibold leading-8">
          เลือกแมวที่คุณต้องการ
        </h1>
        <div className="relative">
          <button
            onClick={toggleDrawer}
            className="flex justify-center items-center shrink-0"
          >
            <Image
              src="/Notification.svg"
              width={24}
              height={24}
              alt="Notification-btn"
            />
            {showNotification && (
              <span className=" absolute top-0 right-1 block h-[9px] w-[9px] rounded-full bg-error border-[2px] border-white"></span>
            )}
          </button>
        </div>
      </div>
      <span className="text-base text-textfield not-italic font-normal leading-6">
        {currentDate.toLocaleString("th-TH", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <div className="flex items-start relative w-full border rounded border-textfield">
        <button className="absolute left-0 top-0 h-full mx-3 border-[none] rounded border-textfield focus:outline-primary flex items-center">
          <Image src="/Search.svg" width={18} height={18} alt="Search-btn" />
        </button>
        <input
          type="text"
          placeholder="ค้นหาสายพันธุ์แมว"
          onChange={(e) => handleSearch(e)}
          className={`flex w-full h-10 flex-col items-start text-base not-italic font-normal leading-6 pl-2 ml-8 focus:outline-none border-[none]`}
        />
        {activeSearch.length > 0 && (
          <div className="flex flex-col gap-4 absolute top-12 p-4 bg-white text-black01 border-b-2 border-l-2 border-r-2 w-full rounded left-1/2 -translate-x-1/2 ">
            {activeSearch.map((cat: string, index: number) => (
              <button
                value={cat}
                key={index}
                onClick={() => selectSearch(cat)}
                className="flex items-center gap-2"
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
