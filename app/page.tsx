import Image from "next/image";
import Invoice from "./components/Invoice";
import InvoiceForm from "./components/Form";

export default function Home() {
  return (
    <div>
      <InvoiceForm />
      {/* <Invoice /> */}
    </div>
  );
}
