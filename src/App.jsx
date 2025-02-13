import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';

function App() {
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [university, setuniversity] = useState("");
  const [major, setmajor] = useState("");
  const [position, setposition] = useState("");

  const sendEmail = async () => {
    try {
        await axios.post("/.netlify/functions/sendEmail", 
        {
            email,
            firstname,
            lastname,
            position
        });
        console.log("Email sent");
        console.log(email);
        console.log(firstname);
        console.log(lastname);
        console.log(position);
        Swal.fire({
            title: "Check your Email",
            text: "ทางบริษัทได้ส่งข้อสอบtestไปให้คุณแล้ว โปรดทำให้ทันในเวลาที่กำหนด",
            icon: "success"
        });
    } catch (error) {
        console.error("Error sending email:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Error sending email",
        });
    }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-xl m-auto">
        <CardHeader>
          <CardTitle>Internship Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col mx-auto gap-2 w-full max-w-xl">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-1 w-1/2">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>University</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setuniversity(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Major</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setmajor(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label>Position</label>
              <Select 
              value={position} 
              onValueChange={(value) => setposition(value)}>
                <SelectTrigger className="border rounded-lg p-2">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Position</SelectLabel>
                    <SelectItem value="ux/ui">UX/UI</SelectItem>
                    <SelectItem value="frontend">FrontEnd</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Button onClick={sendEmail} className="w-80 mx-auto">
            Apply
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
