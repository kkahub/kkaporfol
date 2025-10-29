"use client";

import Image from "next/image";
import Link from "next/link";

import type { ModalProps } from "../../types/portfolio";

export default function ModalContent(props: ModalProps) {
  const { onClickModal, modalItem } = props;

  return (
    <div className="modal_dim">
      <div className="modal_layer">
        <div className="modal_header">
          <h2 className="modal_title">{modalItem.title}</h2>
          <button
            className="modal_close"
            onClick={() => onClickModal(modalItem)}
            type="button"
          >
            &#9587;
          </button>
        </div>
        <div className="modal_content">
          <div className="img_wrap">
            <Image
              className="responsive_size"
              src={modalItem.view}
              alt={modalItem.alt}
              fill
              priority
            />
          </div>
          <div className="content_wrap">
            <h2 className="modal_title">{modalItem.title}</h2>
            {modalItem.desc && (
              <p className="desc">
                {modalItem.desc?.split("\\n").map((desc) => (
                  <span key={desc}>
                    {desc}
                    <br />
                  </span>
                ))}
              </p>
            )}
            {modalItem.skills && <h3>핵심 기술</h3>}
            {modalItem.skills && (
              <ul className="keyword">
                {modalItem.skills.map((skill) => (
                  <li className="pill" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            )}
            <h3>참여도</h3>
            <p className="use_skill">{modalItem.participation}</p>
            <h3>사이트 보기</h3>
            {modalItem.url.service && (
              <ul className="sitepath">
                {modalItem.url.service.map((service) => (
                  <li key={service}>
                    <Link href={service} target="_blank">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {modalItem.url.sample && (
              <ul className="sitepath">
                {modalItem.url.sample.map((sample, i) => (
                  <li key={sample}>
                    <Link href={sample} target="_blank">
                      Sample Page {i + 1}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
