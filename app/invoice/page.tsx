import InvoicePageWrapper from "./InvoicePageWrapper"; // 🛑 Problem might be here
import { Suspense } from "react";
export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading invoice...</div>}>
        <InvoicePageWrapper /> {/* Error shows here */}
      </Suspense>
    </div>
  );
}
