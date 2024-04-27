import { BsInstagram, BsTelegram, BsYoutube } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Contact = () => {
  return (
    <>
      <div className="w-[100%] mt-12 py-10">
        <section className="flex w-[95%] border-[1px] py-20 border-gray-300 container mx-auto">
          <div className="flex flex-col lg:flex-row w-[85%] container mx-auto justify-around gap-20">
            <div className="lg:w-2/3">
              <form
                className="inline-grid gap-4 w-[100%]"
                action="https://formspree.io/f/mvonwdag"
                method="POST"
              >
                <p>LEAVE A MESSAGE</p>
                <Input
                  required
                  autoComplete="off"
                  name="name"
                  placeholder="Your Name"
                  type="text"
                />
                <Input
                  required
                  autoComplete="off"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                />
                <Input
                  name="subject"
                  required
                  autoComplete="off"
                  placeholder="Subject"
                  type="text"
                />
                <textarea
                  className="border-[1px] py-2 px-4 rounded-md border-gray-200"
                  required
                  autoComplete="off"
                  placeholder="Your Message"
                  name="message"
                  id=""
                  cols={30}
                  rows={10}
                />
                <Button type="submit" className="w-[150px]">
                  Submit
                </Button>
              </form>
            </div>

            <div className="flex flex-col lg:w-1/3 gap-6">
              <div>
                <h1 className="py-3 text-lg font-semibold">Contact</h1>
                <div className="flex gap-2">
                  <span className="font-semibold">Email :</span>
                  <a
                    className="text-gray-700"
                    href="mailto:support@hqpencils.com"
                  >
                    support@hqpencils.com
                  </a>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Hours :</span>
                  <p className="text-gray-700">10:00 - 18:00, Mon - Sat</p>
                </div>
              </div>

              <div>
                <h1 className="py-3 text-lg font-semibold">Follow us</h1>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/vaibhav.kaushik.017?igshid=ZDdkNTZiNTM="
                    target="_blank"
                  >
                    <BsInstagram
                      className="text-gray-700 hover:text-pink-600"
                      name="logo-instagram"
                    />
                  </a>
                  <a href="mailto:support@hqpencils.com" target="_blank">
                    <SiGmail
                      className="text-gray-700 hover:text-blue-600"
                      name="mail-outline"
                    />
                  </a>
                  <a href="https://www.youtube.com/@hqpencils" target="_blank">
                    <BsYoutube
                      className="text-gray-700 hover:text-red-600"
                      name="logo-youtube"
                    />
                  </a>
                  <a href="https://telegram.dog/hqpencils" target="_blank">
                    <BsTelegram
                      className="text-gray-700 hover:text-blue-600"
                      name="paper-plane-outline"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
