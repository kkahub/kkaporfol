import { store } from "@/modules/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
