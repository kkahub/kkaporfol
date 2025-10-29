export interface ModalProps {
  onClickModal: (item: PortfolioType) => void;
  modalItem: PortfolioType;
}
export interface PortfolioType {
  id: string;
  title: string;
  view: string;
  alt: string;
  skills?: string[];
  participation: string;
  url: { sample?: string[]; service?: string[] };
  desc?: string;
}
