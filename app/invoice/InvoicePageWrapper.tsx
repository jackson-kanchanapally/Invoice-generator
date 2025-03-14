"use client";
import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { numberToWords } from "amount-to-words";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface InvoiceItem {
  particulars: string;
  hsn: string;
  gst: string;
  qty: string | number;
  rate: string | number;
}

interface Invoice {
  invoiceNo: string;
  date: string;
  buyerName: string;
  buyerGstin: string;
  buyerPlotno: string;
  buyerState: string;
  buyerStateCode: string;
  buyerArea: string;
  DCno: string;
  dcDate: string;
  POno: string;
  poDate: string;
  wayBillno: string;
  wayBillDate: string;
  despatchedThrough: string;
  destination: string;
  items: InvoiceItem[];
}

const InvoicePageWrapper = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
  });
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setInvoice(parsed);
      } catch (err) {
        console.error("Failed to parse invoice data", err);
      }
    }
  }, [data]);

  if (!invoice) return <div className="p-8">Loading invoice...</div>;

  const totalAmount = invoice.items.reduce(
    (acc, item) => acc + Number(item.qty) * Number(item.rate),
    0
  );
  const cgst = (totalAmount * 0.09).toFixed(2);
  const sgst = (totalAmount * 0.09).toFixed(2);
  const grandTotal = Number(totalAmount) + Number(cgst) + Number(sgst);
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="flex flex-col items-center p-8 overflow-x-auto">
      <div className="mb-4">
        <button
          onClick={() => reactToPrintFn()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
      {/* <div className="w-full"> */}
      <div
        ref={contentRef}
        className="w-[794px] mx-auto  h-[1123px] bg-white text-black border py-4 px-6 print:w-full print:border-0 print:h-full print:text-black print:bg-white"
        style={{ fontSize: "12px" }}
      >
        <h2 className="text-center font-bold  text-base">GST INVOICE</h2>
        <div className="flex justify-between mt-4  text-xs border-b pb-1 mb-2">
          <div className="w-1/2 text-sm">
            <strong className="text-base">OM SAI TECHNOLOGIES</strong>
            <br />
            No. 10, Paigha Housing Colony, Behind Anand Theatre
            <br />
            S.P. Road Secunderabad - 500 003.
            <br />
            Phone: 040-27908483, 9848035742
            <br />
            Telangana Code - 36
            <br />
            GSTIN/UIN : 36ADEPG7460R2ZY
            <br />
            PAN : ADEPG7460R
            <br />
          </div>
          <div className="w-[390px] border-l px-2">
            <div className="max-w-2xl  text-xs">
              <div className="flex justify-between">
                <div className="w-[300px]  px-2 py-1 ">
                  <span className="font-semibold">Invoice No.</span> :{" "}
                  <span className="ml-1"> {invoice.invoiceNo}</span>
                </div>
                <div className="w-1/2 px-2 py-1 ">
                  <span className="font-semibold">Date</span> :{" "}
                  <span className="ml-1">{invoice.date}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[300px]  px-2 py-1 ">
                  <span className="font-semibold">DC No.</span> :
                  <span className="ml-1">{invoice.DCno}</span>
                </div>
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Date</span> :
                  <span className="ml-1">{invoice.dcDate}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[300px]  px-2 py-1">
                  <span className="font-semibold">P.O. No.</span> :
                  <span className="ml-1">{invoice.POno}</span>
                </div>
                <div className="w-1/2 px-2 py-1 ">
                  <span className="font-semibold">Date</span> :
                  <span className="ml-1">{invoice.poDate}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[300px] px-2 py-1">
                  <span className="font-semibold">Way Bill No.</span> :
                  <span className="ml-1">{invoice.wayBillno}</span>
                </div>
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Date</span> :
                  <span className="ml-1">{invoice.wayBillDate}</span>
                </div>
              </div>

              <div className=" px-2 py-1">
                <span className="font-semibold">Despatched through</span> :
                <span className="ml-1">{invoice.despatchedThrough}</span>
              </div>

              <div className="px-2 py-1">
                <span className="font-semibold">Destination</span> :
                <span className="ml-1">{invoice.destination}</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mb-2 text-xs">
          <strong className="text-base">Buyer (Bill to)</strong>
          <br />
          <span className={invoice.buyerName ? `block` : "hidden"}>
            {invoice.buyerName.toUpperCase()}
          </span>
          <br />
          <span className={invoice.buyerPlotno ? `block` : "hidden"}>
            {invoice.buyerPlotno}
          </span>
          <br />
          <span className={invoice.buyerArea ? `block` : "hidden"}>
            {invoice.buyerArea}
          </span>
          <br />
          <span className={invoice.buyerGstin ? `block` : "hidden"}>
            {invoice.buyerGstin
              ? `GSTIN/UIN : ${invoice.buyerGstin.toUpperCase()}`
              : ""}
          </span>
          <br />
          <span className={invoice.buyerState ? `block` : "hidden"}>
            {invoice.buyerState ? `  State Name : ${invoice.buyerState}, ` : ""}
          </span>
          <span className={invoice.buyerStateCode ? `block` : "hidden"}>
            {invoice.buyerStateCode ? `Code : ${invoice.buyerStateCode}` : ""}
          </span>
        </div> */}
        <div className="mb-2 text-xs">
          <strong className="text-base">Buyer (Bill to)</strong>

          <span className={invoice.buyerName ? `block` : "hidden"}>
            {invoice.buyerName.toUpperCase()}
          </span>

          <span className={invoice.buyerPlotno ? `block` : "hidden"}>
            {invoice.buyerPlotno}
          </span>

          <span className={invoice.buyerArea ? `block` : "hidden"}>
            {invoice.buyerArea}
          </span>

          <span className={invoice.buyerGstin ? `block` : "hidden"}>
            {invoice.buyerGstin
              ? `GSTIN/UIN : ${invoice.buyerGstin.toUpperCase()}`
              : ""}
          </span>

          <span className={invoice.buyerState ? `block` : "hidden"}>
            {invoice.buyerState ? `  State Name : ${invoice.buyerState}, ` : ""}
          </span>
          <span className={invoice.buyerStateCode ? `block` : "hidden"}>
            {invoice.buyerStateCode ? `Code : ${invoice.buyerStateCode}` : ""}
          </span>
        </div>

        <table className="w-full  text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 h-8">
              <th className="border">Sl No</th>
              <th className="border">Description of Goods</th>
              <th className="border">HSN/SAC</th>
              <th className="border">GST Rate</th>
              <th className="border">Quantity</th>

              <th className="border">Rate</th>
              <th className="border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item: InvoiceItem, idx: number) => (
              <tr key={idx} className="h-6">
                <td className="border text-center">{idx + 1}</td>
                <td className="border   pl-2">{item.particulars}</td>
                <td className="border   text-center">{item.hsn}</td>
                <td className="border   text-center">{item.gst}</td>
                <td className="border   text-center">{item.qty}</td>

                <td className="border   text-right pr-2">
                  ₹ {formatNumber(Number(item.rate))}
                </td>
                <td className="border   text-right pr-2">
                  ₹ {formatNumber(Number(item.rate) * Number(item.qty))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full flex  justify-between items-end p-4 border-b">
          <div className="">
            <strong>Our Bank Details:</strong>
            <br />
            Bank: KOTAK MAHINDRA BANK
            <br />
            Branch: S.P. Road, Secunderabad
            <br />
            A/c: 700011001908
            <br />
            IFSC: KKBK0007456
          </div>
          <table className="text-xs ">
            <tr className=" h-6">
              <td className="w-[90px]">Total: </td>
              <td className="w-[110px] text-right">
                ₹ {formatNumber(totalAmount)}
              </td>
            </tr>
            <tr className=" h-6">
              <td className="w-[90px]">CGST:</td>
              <td className="w-[110px] text-right">
                ₹ {formatNumber(Number(cgst))}
              </td>
            </tr>
            <tr className=" h-6">
              <td className="w-[90px]">SGST:</td>
              <td className="w-[110px] text-right">
                ₹ {formatNumber(Number(sgst))}
              </td>
            </tr>
            <tr className=" h-6 font-bold">
              <td className="w-[90px] ">Total Amount:</td>
              <td className="w-[110px]  text-right ">
                ₹ {formatNumber(grandTotal)}
              </td>
            </tr>
          </table>
        </div>

        <div className="py-2 border-b ">
          <strong className="pr-2">Amount Chargeable (in words) :</strong>
          {numberToWords(grandTotal.toFixed(0))} Only
        </div>

        <div className="mt-4 flex justify-between ">
          <div className="w-[450px] ">
            <strong>Declaration:</strong>
            <br />
            We declare that the particulars given are true and correct.
            <br />
            <ol className="list-decimal">
              <li className="ml-3">Goods once sold cannot be accepted back.</li>
              <li className="ml-3">
                Our responsibility ceases the moment goods leave our Premises
                and no warranty for burnt/Physical damage.
              </li>
              <li className="ml-3">
                Intrest@18% will be charged on bill if not paid within due date.
              </li>
              <li className="ml-3">Subject to Secunderabad Jurisdiction.</li>
            </ol>
          </div>
          <div className="flex items-end w-[500px]">
            <div className="text-center  w-1/2">
              <br />
              <em>Customer Signatory</em>
            </div>
            <div className="text-right  w-1/2">
              <strong>For OM SAI TECHNOLOGIES</strong>
              <br />
              <div className="h-8"> </div>
              <em className="">Authorized Signatory</em>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default InvoicePageWrapper;
