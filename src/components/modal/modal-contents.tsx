"use client";

import Image from "next/image";
import Link from "next/link";
import PortfolioList from "../../data/portfolio.json";

type OnClickModal = (i: string) => void;

interface ModalProps {
  onClickModal: OnClickModal;
  modalIndex: string;
}
interface PortfolioType {
  id: string;
  title: string;
  view: string;
  alt: string;
  skills?: string[];
  participation: string;
  url: { sample?: string[]; service?: string[] };
  desc?: string;
}

export default function ModalContent(props: ModalProps) {
  const { onClickModal, modalIndex } = props;
  const index: number = Number(modalIndex) - 1;
  const subject: PortfolioType = PortfolioList.portfolios[index];

  return (
    <div className="modal_dim">
      <div className="modal_layer">
        <div className="modal_header">
          <h2 className="modal_title">{subject.title}</h2>
          <button
            className="modal_close"
            onClick={() => onClickModal(modalIndex)}
            type="button"
          >
            &#9587;
          </button>
        </div>
        <div className="modal_content">
          <div className="img_wrap">
            <Image
              className="responsive_size"
              src={subject.view}
              alt={subject.alt}
              fill
            />
          </div>
          <div className="content_wrap">
            <h2 className="modal_title">{subject.title}</h2>
            {subject.desc && (
              <p className="desc">
                {subject.desc?.split("\\n").map((desc) => (
                  <span key={desc}>
                    {desc}
                    <br />
                  </span>
                ))}
              </p>
            )}
            {subject.skills && <h3>핵심 기술</h3>}
            {subject.skills && (
              <ul className="keyword">
                {subject.skills.map((skill) => (
                  <li className="pill" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            )}
            <h3>참여도</h3>
            <p className="use_skill">{subject.participation}</p>
            <h3>사이트 보기</h3>
            {subject.url.service && (
              <ul className="sitepath">
                {subject.url.service.map((service) => (
                  <li key={service}>
                    <Link href={service} target="_blank">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {subject.url.sample && (
              <ul className="sitepath">
                {subject.url.sample.map((sample) => (
                  <li key="sample">
                    <Link href={sample} target="_blank">
                      Sample Page
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
