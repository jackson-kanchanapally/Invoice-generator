import InvoicePageWrapper from "./InvoicePageWrapper"; 
import { Suspense } from "react";
export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading invoice...</div>}>
        <InvoicePageWrapper /> 
      </Suspense>
    </div>
  );
}
