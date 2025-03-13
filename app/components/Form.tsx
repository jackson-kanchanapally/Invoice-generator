"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function InvoiceForm() {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    date: "",
    buyerName: "",
    buyerGstin: "",
    cgst: "",
    sgst: "",
    grandTotal: "",
  });

  const [items, setItems] = useState([
    { particulars: "", hsn: "", gst: "", qty: "", rate: "" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
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

  const handleSubmit = (e: React.FormEvent) => {
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
      cgst: "",
      sgst: "",
      grandTotal: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Form</h1>

      {/* Invoice Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
            className="input md:col-span-2 h-8 "
            value={item.particulars}
            onChange={(e) =>
              handleItemChange(idx, "particulars", e.target.value)
            }
          />
          <input
            placeholder="HSN Code"
            className="input h-8 "
            value={item.hsn}
            onChange={(e) => handleItemChange(idx, "hsn", e.target.value)}
          />
          <input
            placeholder="GST %"
            className="input h-8 "
            value={item.gst}
            onChange={(e) => handleItemChange(idx, "gst", e.target.value)}
          />
          <input
            placeholder="Qty"
            className="input h-8 "
            type="number"
            value={item.qty}
            onChange={(e) =>
              handleItemChange(idx, "qty", Number(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Rate"
            className="input h-8 "
            value={item.rate}
            onChange={(e) =>
              handleItemChange(idx, "rate", Number(e.target.value))
            }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
      </div>

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
