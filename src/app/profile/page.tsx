"use client";

import React from "react";
import Image from "next/image";

export default function Profile() {
  return (
    <div id="Profile" className="section profile">
      <div className="inner">
        <h2 className="title">PROFILE</h2>
        <div className="content">
          <div className="photo">
            <Image
              src="../../../public/images/profile_photo.png"
              alt="KKA photo"
            />
          </div>
          <div className="profile_con">
            <dl>
              <dt>Name</dt>
              <dd>김근애</dd>
              <dt>E&#45;mail</dt>
              <dd>oceco@naver.com</dd>
              <dt>Web Designer</dt>
              <dd>2012.04~</dd>
              <dt>Web Publisher</dt>
              <dd>2014.04~</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
