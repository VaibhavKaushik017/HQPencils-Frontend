import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import CustomSketchForm from "./custom-sketch-form";
import { Button } from "./ui/button";

const invoices = [
  {
    id: 1,
    faces: "1 Face",
    time: "2-3 Days",
    charge: "₹1500",
    size: "A5 Size ( 6 x 8 Inches )",
  },
  {
    id: 2,
    faces: "1 Face",
    time: "3-4 Days",
    charge: "₹2500",
    size: "A4 Size ( 8 x 12 Inches )",
  },
  {
    id: 3,
    faces: "2 Faces",
    time: "4-5 Days",
    charge: "₹4000",
    size: "A4 Size ( 8 x 12 Inches )",
  },
  {
    id: 4,
    faces: "1 Face",
    time: "4-5 Days",
    charge: "₹3500",
    size: "A3 Size ( 12 x 16 Inches )",
  },
  {
    id: 5,
    faces: "2 Faces",
    time: "5-6 Days",
    charge: "₹6000",
    size: "A3 Size ( 12 x 16 Inches )",
  },
  {
    id: 6,
    faces: "3 Faces",
    time: "7-8 Days",
    charge: "₹7500",
    size: "A3 Size ( 12 x 16 Inches )",
  },
  {
    id: 7,
    faces: "4 Faces",
    time: "8-10 Days",
    charge: "₹9000",
    size: "A3 Size ( 12 x 16 Inches )",
  },
];

function CustomTable() {
  const [selectedRow, setSelectedRow] = useState<any>();

  const handleButtonClick = (invoice: any) => {
    setSelectedRow(invoice);
  };

  return (
    <>
      <Table className="w-[80%] mx-auto my-24">
        <TableCaption className="font-semibold tracking-widest">
          <span className="text-orange-400">HQPencils</span>, Known For Quality
          !! 🔥😉
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr. No.</TableHead>
            <TableHead>No. of Faces</TableHead>
            <TableHead>Time ( Approximate )</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Charges</TableHead>
            <TableHead className="text-right">Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.faces}</TableCell>
              <TableCell>{invoice.time}</TableCell>
              <TableCell>{invoice.size}</TableCell>
              <TableCell>{invoice.charge}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"link"}
                  className="text-orange-400 font-semibold"
                  onClick={() => handleButtonClick(invoice)}
                >
                  Click Here
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRow && <CustomSketchForm data={selectedRow} />}
    </>
  );
}

export default CustomTable;
