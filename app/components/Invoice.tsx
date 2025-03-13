"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import { numberToWords } from "amount-to-words";

const Invoice = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  // const downloadPDF = async () => {
  //   const element = invoiceRef.current;
  //   if (!element) return;

  //   const canvas = await html2canvas(element, {
  //     scale: 2,
  //   });

  //   const data = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: "a4",
  //   });

  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();

  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //   pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("invoice.pdf");
  // };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="mb-4">
        <button
          onClick={() => reactToPrintFn()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <div
        ref={contentRef}
        className=" w-[794px] h-[1123px] bg-white text-black border py-4 px-6 print:w-full print:border-0 print:h-full print:text-black print:bg-white"
        style={{ fontSize: "12px" }}
      >
        <h2 className="text-center font-bold text-lg">GST INVOICE</h2>
        <div className="flex justify-between mt-8 text-xs border-b pb-1 mb-2">
          <div className="w-[350px] text-sm">
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
            <div className="max-w-2xl  text-sm">
              <div className="flex justify-between">
                <div className="w-1/2  px-2 py-1 ">
                  <span className="font-semibold">Invoice No.</span> :{" "}
                  <span className="ml-1">65</span>
                </div>
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Date</span> :{" "}
                  <span className="ml-1">25/01/24</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-1/2  px-2 py-1">
                  <span className="font-semibold">DC No.</span> :
                </div>
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Date</span> :
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-1/2  px-2 py-1">
                  <span className="font-semibold">P.O. No.</span> :
                </div>
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Date</span> :
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Way Bill No.</span> :
                </div>
                <div className="w-1/2 px-2 py-1">
                  <span className="font-semibold">Date</span> :
                </div>
              </div>

              <div className=" px-2 py-1">
                <span className="font-semibold">Despatched through</span> :
              </div>

              <div className="px-2 py-1">
                <span className="font-semibold">Destination</span> :
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2 text-sm">
          <strong className="text-base">Buyer (Bill to)</strong>
          <br />
          OM SAI TECHNOLOGIES
          <br />
          PLOT NO-10, PAIGHA HOUSING COLONY
          <br />
          S.P.ROAD, SECUNDERABAD - 03
          <br />
          GSTIN/UIN : 36ADEF9746OR2ZY
          <br />
          State Name : Telangana, Code : 36
        </div>
        {/* <div className="border border-black"> */}
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
            <tr className="h-6">
              <td className="border text-center">1</td>
              <td className="border   pl-2">AARVEX 1TB SSD HDD</td>
              <td className="border   text-center">85235100</td>
              <td className="border   text-center">18%</td>
              <td className="border   text-center">1 Nos</td>

              <td className="border   text-center">3,347.46</td>
              <td className="border   text-center">3,347.46</td>
            </tr>
            <tr className="h-6">
              <td className="border   text-center">2</td>
              <td className="border   pl-2">LAPTOP BATTERY</td>
              <td className="border   text-center">85078000</td>
              <td className="border   text-center">18%</td>
              <td className="border   text-center">1 Nos</td>

              <td className="border   text-center">1,991.53</td>
              <td className="border   text-center">1,991.53</td>
            </tr>
          </tbody>
        </table>
        <div className="w-full flex justify-end p-4 border-b">
          <table className="text-xs ">
            <tr className=" h-6">
              <td className="w-[120px]">Total: </td>
              <td>₹ 5,338.99</td>
            </tr>
            <tr className=" h-6">
              <td className="w-[120px]">CGST:</td>
              <td>₹ 480.51</td>
            </tr>
            <tr className=" h-6">
              <td className="w-[120px]">SGST:</td>
              <td>₹ 480.51</td>
            </tr>
            <tr className=" h-6">
              <td className="w-[120px]">Rounded Off:</td>
              <td>₹ -0.01</td>
            </tr>
            <tr className=" h-6 font-bold">
              <td className="w-[120px] ">Total Amount:</td>
              <td>₹ 6,300.00</td>
            </tr>
          </table>
        </div>

        <div className="mt-4">
          <strong className="pr-2">Amount Chargeable (in words) :</strong>
          {numberToWords(6300)} Rupees Only
        </div>

        <div className="mt-4">
          <div>
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
          {/* <strong>Declaration:</strong>
          <br />
          We declare that the particulars given are true and correct.
          <br />
          <ol className="list-decimal">
            <li className="ml-3">Goods once sold cannot be accepted back.</li>
            <li className="ml-3">
              Our responsibility ceases the moment goods leave our Premises and
              no warranty for burnt/Physical damage.
            </li>
            <li className="ml-3">
              Intrest@18% will be charged on bill if not paid within due date.
            </li>
            <li className="ml-3">Subject to Secunderabad Jurisdiction.</li>
          </ol> */}
        </div>

        <div className="mt-4 flex justify-between">
          {/* <div>
            <strong>Our Bank Details:</strong>
            <br />
            Bank: KOTAK MAHINDRA BANK
            <br />
            Branch: S.P. Road, Secunderabad
            <br />
            A/c: 700011001908
            <br />
            IFSC: KKBK0007456
          </div> */}
          <div className="w-1/2">
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
            <div className="text-right  w-1/2">
              <br />
              <em>Customer Signatory</em>
            </div>
            <div className="text-right  w-1/2">
              <strong>For OM SAI TECHNOLOGIES</strong>
              <br />
              <em>Authorized Signatory</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
