"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface InvoiceItem {
  particulars: string;
  hsn: string;
  gst: string;
  qty: string;
  rate: string;
}

interface InvoiceData {
  invoiceNo: string;
  date: string;
  buyerName: string;
  buyerGstin: string;
  buyerPlotno: string;
  buyerArea: string;
  buyerState: string;
  buyerStateCode: string;
  DCno: string;
  dcDate: string;
  POno: string;
  poDate: string;
  wayBillno: string;
  wayBillDate: string;
  despatchedThrough: string;
  destination: string;
  // cgst: string;
  // sgst: string;
  // grandTotal: string;
}

export default function InvoiceForm() {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNo: "",
    date: "",
    buyerName: "",
    buyerGstin: "",
    buyerPlotno: "",
    buyerArea: "",
    buyerState: "",
    buyerStateCode: "",
    DCno: "",
    dcDate: "",
    POno: "",
    poDate: "",
    wayBillno: "",
    wayBillDate: "",
    despatchedThrough: "",
    destination: "",
    // cgst: "",
    // sgst: "",
    // grandTotal: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { particulars: "", hsn: "", gst: "", qty: "", rate: "" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { particulars: "", hsn: "", gst: "", qty: "", rate: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      ...invoiceData,
      items,
    };
    const encoded = encodeURIComponent(JSON.stringify(formData));
    router.push(`/invoice?data=${encoded}`);

    setInvoiceData({
      invoiceNo: "",
      date: "",
      buyerName: "",
      buyerGstin: "",
      buyerPlotno: "",
      buyerArea: "",
      buyerState: "",
      buyerStateCode: "",
      DCno: "",
      dcDate: "",
      POno: "",
      poDate: "",
      wayBillno: "",
      wayBillDate: "",
      despatchedThrough: "",
      destination: "",
      // cgst: "",
      // sgst: "",
      // grandTotal: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Form</h1>

      {/* Invoice Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
        <div></div>
        <input
          name="invoiceNo"
          placeholder="Invoice No."
          className="input rounded border h-12 p-2"
          value={invoiceData.invoiceNo}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          className="input rounded border h-12 p-2"
          value={invoiceData.date}
          onChange={handleChange}
        />
        <input
          name="DCno"
          placeholder="DC No."
          className="input rounded border h-12 p-2"
          value={invoiceData.DCno}
          onChange={handleChange}
        />
        <input
          name="dcDate"
          type="date"
          className="input rounded border h-12 p-2"
          value={invoiceData.dcDate}
          onChange={handleChange}
        />
        <input
          name="POno"
          placeholder="PO No."
          className="input rounded border h-12 p-2"
          value={invoiceData.POno}
          onChange={handleChange}
        />
        <input
          name="poDate"
          type="date"
          className="input rounded border h-12 p-2"
          value={invoiceData.poDate}
          onChange={handleChange}
        />
        <input
          name="wayBillno"
          placeholder="Way Bill No."
          className="input rounded border h-12 p-2"
          value={invoiceData.wayBillno}
          onChange={handleChange}
        />
        <input
          name="wayBillDate"
          type="date"
          className="input rounded border h-12 p-2"
          value={invoiceData.wayBillDate}
          onChange={handleChange}
        />

        <input
          name="despatchedThrough"
          placeholder="Despatched Through"
          className="input rounded border h-12 p-2"
          value={invoiceData.despatchedThrough}
          onChange={handleChange}
        />
        <input
          name="destination"
          placeholder="Destination"
          className="input rounded border h-12 p-2"
          value={invoiceData.destination}
          onChange={handleChange}
        />

        {/* buyer details */}
        <h2 className="text-xl font-semibold mb-1">Buyer Details</h2>
        <h1> </h1>
        <input
          name="buyerName"
          placeholder="Buyer Name"
          className="input rounded border h-12 p-2"
          value={invoiceData.buyerName}
          onChange={handleChange}
        />
        <input
          name="buyerGstin"
          placeholder="Buyer GSTIN"
          className="input rounded border h-12 p-2"
          value={invoiceData.buyerGstin}
          onChange={handleChange}
        />
        <input
          name="buyerPlotno"
          placeholder="Plot no , Street"
          className="input rounded border h-12 p-2"
          value={invoiceData.buyerPlotno}
          onChange={handleChange}
        />
        <input
          name="buyerArea"
          placeholder="Area / Locality"
          className="input rounded border h-12 p-2"
          value={invoiceData.buyerArea}
          onChange={handleChange}
        />
        <input
          name="buyerState"
          placeholder="State "
          className="input rounded border h-12 p-2"
          value={invoiceData.buyerState}
          onChange={handleChange}
        />
        <input
          name="buyerStateCode"
          placeholder="State Code"
          className="input rounded border h-12 p-2"
          value={invoiceData.buyerStateCode}
          onChange={handleChange}
        />
      </div>

      {/* Items */}
      <h2 className="text-xl font-semibold mb-4">Items</h2>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-3 border p-3 rounded-md bg-gray-50"
        >
          <input
            placeholder="Particulars"
            className="input md:col-span-2 h-8 p-2"
            value={item.particulars}
            onChange={(e) =>
              handleItemChange(idx, "particulars", e.target.value)
            }
          />
          <input
            placeholder="HSN Code"
            className="input h-8 p-2"
            value={item.hsn}
            onChange={(e) => handleItemChange(idx, "hsn", e.target.value)}
          />
          <input
            placeholder="GST %"
            className="input h-8 p-2"
            value={item.gst}
            onChange={(e) => handleItemChange(idx, "gst", e.target.value)}
          />
          <input
            placeholder="Qty"
            className="input h-8 p-2"
            type="number"
            value={item.qty}
            onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
          />
          <input
            type="number"
            placeholder="Rate"
            className="input h-8 p-2"
            value={item.rate}
            onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
      >
        + Add Item
      </button>

      {/* Tax & Total */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <input
          name="cgst"
          placeholder="CGST"
          className="input rounded border h-12 p-2"
          value={invoiceData.cgst}
          onChange={handleChange}
        />
        <input
          name="sgst"
          placeholder="SGST"
          className="input rounded border h-12 p-2"
          value={invoiceData.sgst}
          onChange={handleChange}
        />
        <input
          name="grandTotal"
          placeholder="Grand Total"
          className="input rounded border h-12 p-2"
          value={invoiceData.grandTotal}
          onChange={handleChange}
        />
      </div> */}

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg"
        >
          Submit Invoice
        </button>
      </div>
    </form>
  );
}
