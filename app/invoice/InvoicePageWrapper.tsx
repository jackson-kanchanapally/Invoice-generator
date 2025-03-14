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
        <div className="border flex-grow ">
          <div className="flex justify-between mt-[1px]  text-xs border-b  mb-[1px]">
            <div className="w-1/2 text-xs pl-2 ">
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
            <div className="w-[390px] border-l px-2 pt-2">
              <div className="max-w-2xl  text-xs">
                <div className="flex justify-between">
                  <div className="w-[300px]  px-2 pb-[2px]">
                    <span className="font-semibold">Invoice No.</span> :{" "}
                    <span className="ml-1"> {invoice.invoiceNo}</span>
                  </div>
                  <div className="w-1/2 px-2 ">
                    <span className="font-semibold">Date</span> :{" "}
                    <span className="ml-1">{invoice.date}</span>
                  </div>
                </div>

                <div className="flex justify-between  pb-[2px]">
                  <div className="w-[300px]  px-2">
                    <span className="font-semibold">DC No.</span> :
                    <span className="ml-1">{invoice.DCno}</span>
                  </div>
                  <div className="w-1/2 px-2">
                    <span className="font-semibold">Date</span> :
                    <span className="ml-1">{invoice.dcDate}</span>
                  </div>
                </div>

                <div className="flex justify-between pb-[2px]">
                  <div className="w-[300px]  px-2 ">
                    <span className="font-semibold">P.O. No.</span> :
                    <span className="ml-1">{invoice.POno}</span>
                  </div>
                  <div className="w-1/2 px-2 ">
                    <span className="font-semibold">Date</span> :
                    <span className="ml-1">{invoice.poDate}</span>
                  </div>
                </div>

                <div className="flex justify-between pb-[2px] ">
                  <div className="w-[300px] px-2 ">
                    <span className="font-semibold">Way Bill No.</span> :
                    <span className="ml-1">{invoice.wayBillno}</span>
                  </div>
                  <div className="w-1/2 px-2">
                    <span className="font-semibold">Date</span> :
                    <span className="ml-1">{invoice.wayBillDate}</span>
                  </div>
                </div>

                <div className=" px-2 pb-[2px]">
                  <span className="font-semibold">Despatched through</span> :
                  <span className="ml-1">{invoice.despatchedThrough}</span>
                </div>

                <div className="px-2 ">
                  <span className="font-semibold">Destination</span> :
                  <span className="ml-1">{invoice.destination}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[602px]">
            <div className="mb-1 text-xs pl-2 ">
              <strong className="text-base">Buyer (Bill to)</strong>
              <div className="flex  justify-between pr-54 ">
                <span className={invoice.buyerName ? `block` : "hidden"}>
                  {invoice.buyerName.toUpperCase()}
                </span>
                <span className={invoice.buyerGstin ? `block font` : "hidden"}>
                  <span className="font-bold">GSTIN/UIN : </span>
                  {invoice.buyerGstin
                    ? ` ${invoice.buyerGstin.toUpperCase()}`
                    : ""}
                </span>
              </div>

              <span className={invoice.buyerPlotno ? `block` : "hidden"}>
                {invoice.buyerPlotno}
              </span>

              <span className={invoice.buyerArea ? `block` : "hidden"}>
                {invoice.buyerArea}
              </span>

              <div>
                <span className={invoice.buyerState ? `block` : "hidden"}>
                  <span className="font-bold">State Name :</span>
                  {invoice.buyerState ? `   ${invoice.buyerState},` : ""}
                  <span>Code: {invoice.buyerStateCode}</span>
                </span>
              </div>
            </div>

            <table className="w-full text-xs border-collapse">
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
                    <td className="border w-[40px] text-center">{idx + 1}</td>
                    <td className="border w-[300px] pl-2">
                      {item.particulars}
                    </td>
                    <td className="border  w-[70px] text-center">{item.hsn}</td>
                    <td className="border w-[70px]  text-center">{item.gst}</td>
                    <td className="border   text-center w-[70px]">
                      {item.qty}
                    </td>

                    <td className="border w-[100px]  text-right pr-2">
                      ₹ {formatNumber(Number(item.rate))}
                    </td>
                    <td className="border w-[100px]  text-right pr-2">
                      ₹ {formatNumber(Number(item.rate) * Number(item.qty))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Total Section*/}
          <div className="">
            <div className="w-full flex  justify-between items-end px-4 py-1 border-b">
              <div className="">
                <strong>Our Bank Details:</strong>
                <br />
                Bank: KOTAK MAHINDRA BANK
                <br />
                Branch: S.P. Road, Secunderabad
                <br />
                A/c: 700011001908 , IFSC: KKBK0007456
              </div>
              <table className="text-xs border">
                <tr className=" h-6">
                  <td className="w-[90px]  border px-2">Amount: </td>
                  <td className="w-[110px] border px-2 text-right">
                    ₹ {formatNumber(totalAmount)}
                  </td>
                </tr>
                <tr className=" h-6">
                  <td className="w-[90px] border px-2">CGST:</td>
                  <td className="w-[110px] border px-2 text-right">
                    {/* ₹ {formatNumber(Number(cgst))} */}
                    {Number(invoice.items[0].gst) / 2} %
                  </td>
                </tr>
                <tr className=" h-6">
                  <td className="w-[90px] border px-2">SGST:</td>
                  <td className="w-[110px] border px-2  text-right">
                    {/* ₹ {formatNumber(Number(sgst))} */}
                    {Number(invoice.items[0].gst) / 2} %
                  </td>
                </tr>
                <tr className=" h-6">
                  <td className="w-[90px] border px-2">IGST:</td>
                  <td className="w-[110px] border px-2 text-right">
                    {/* ₹ {formatNumber(Number(sgst))} */}
                  </td>
                </tr>
                <tr className=" h-6 font-bold ">
                  <td className="w-[90px] border px-2">Grand Total:</td>
                  <td className="w-[110px] px-2 border  text-right ">
                    ₹ {formatNumber(grandTotal)}
                  </td>
                </tr>
              </table>
            </div>

            <div className="py-1 border-b ">
              <strong className="px-2">Amount (in words) :</strong>
              {numberToWords(grandTotal.toFixed(0))} Only
            </div>

            <div className="mt-2 flex justify-between ">
              <div className="w-[460px] pl-2">
                {/* <strong>Declaration:</strong> */}
                We declare that the particulars given are true and correct.
                <br />
                <ol className="list-decimal">
                  <li className="ml-3">
                    Goods once sold cannot be accepted back.
                  </li>
                  <li className="ml-3">
                    Our responsibility ceases the moment goods leave our
                    Premises and no warranty for burnt/Physical damage.
                  </li>
                  <li className="ml-3">
                    Intrest@18% will be charged on bill if not paid within due
                    date.
                  </li>
                  <li className="ml-3">
                    Subject to Secunderabad Jurisdiction.
                  </li>
                </ol>
              </div>
              <div className="flex items-end w-[500px] pr-2">
                <div className="text-center  w-1/2">
                  <br />
                  <em>Customer Signatory</em>
                </div>
                <div className="text-right  w-1/2">
                  <strong>For OM SAI TECHNOLOGIES</strong>
                  <br />
                  <div className="h-18"> </div>
                  <em className="px-4">Authorized Signatory</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default InvoicePageWrapper;
