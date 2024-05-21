"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { ActiveContext } from "../store/context";

export default function Nav() {
  const router = useRouter();

  const { active, setActive }: any = useContext(ActiveContext);

  const handleActive = (page: string) => {
    setActive(page);
    router.push(`/main/${page}`);
  };

  useEffect(() => {
    router.push(`/main/${active}`);
  }, []);

  return (
    <div className=" flex w-full h-[80px] items-center justify-center shrink-0 fixed left-0 bottom-0 z-50 bg-white border-t-2 border-line">
      <div className="flex w-full  justify-between items-center pl-11 pr-11 ">
        <Link href="/main/home">
          <button
            onClick={() => handleActive("home")}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={`${active === "home" ? "/Home-active" : "/Home"}.svg`}
              width={20}
              height={20}
              alt="Home page"
              style={{ width: "auto", height: "auto" }}
            />
            <span
              className={`text-xs not-italic font-normal leading-5 text-center mt-1 ${
                active === "home" ? "text-primary" : "text-textfield"
              }`}
            >
              หน้าหลัก
            </span>
          </button>
        </Link>
        <Link href="/main/breeding">
          <button
            onClick={() => handleActive("breeding")}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={`${
                active === "breeding" ? "/Breeding-active" : "/Breeding"
              }.svg`}
              width={20}
              height={20}
              alt="Breeding page"
              style={{ width: "auto", height: "auto" }}
            />
            <span
              className={`text-xs not-italic font-normal leading-5 text-center mt-1 ${
                active === "breeding" ? "text-primary" : "text-textfield"
              }`}
            >
              ผสมพันธุ์
            </span>
          </button>
        </Link>
        <Link href="/main/suggest">
          <button
            onClick={() => handleActive("suggest")}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={`${
                active === "suggest" ? "/Suggest-active" : "/Suggest"
              }.svg`}
              width={20}
              height={20}
              alt="Suggest page"
              style={{ width: "auto", height: "auto" }}
            />
            <span
              className={`text-xs not-italic font-normal leading-5 text-center mt-1 ${
                active === "suggest" ? "text-primary" : "text-textfield"
              }`}
            >
              แนะนำ
            </span>
          </button>
        </Link>
        <Link href="/main/profile">
          <button
            onClick={() => handleActive("profile")}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={`${
                active === "profile" ? "/Profile-active" : "/Profile"
              }.svg`}
              width={20}
              height={20}
              alt="Profile page"
              style={{ width: "auto", height: "auto" }}
            />
            <span
              className={`text-xs not-italic font-normal leading-5 text-center mt-1 ${
                active === "profile" ? "text-primary" : "text-textfield"
              }`}
            >
              ประวัติ
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
