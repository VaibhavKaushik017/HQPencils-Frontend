import Banner from "../components/banner";
import CustomTable from "../components/custom-table";
import Faq from "../components/faq";

function CustomSketch() {
  return (
    <div>
      <Banner
        img="custom-banner.png"
        image="custom-banner.png"
        tag="ORDER YOUR CUSTOM PORTRAIT"
        line="Handmade Hyper Realistic Pencil Sketch From Photo"
      />
      <CustomTable />
      <Faq />
    </div>
  );
}

export default CustomSketch;
