import Banner from "../components/banner";
import CustomTable from "../components/custom-table";
import Faq from "../components/faq";

function CustomSketch() {
  return (
    <div>
      <Banner
        image="b1.jpg"
        tag="ORDER YOUR CUSTOM PORTRAIT"
        line="Handmade Hyper Realistic Pencil Sketch From Photo"
      />
      <CustomTable />
      <Faq />
    </div>
  );
}

export default CustomSketch;
