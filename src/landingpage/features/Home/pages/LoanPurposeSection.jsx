import GridBg from "../../../../assets/Grid.png"; // Update extension if it's a .png
import LoanImg from "../../../../assets/LoanImg.png";
import SolarHouse from "../../../../assets/SolarHouse.png";
import Ambulance from "../../../../assets/Ambulance.png";
import EatingWoman from "../../../../assets/EatingWoman.png";
import WinterHouse from "../../../../assets/WinterHouse.png";
import Table from "../../../../assets/Table.png";
import Notebook from "../../../../assets/Notebook.png";
import School from "../../../../assets/School.png";
import WhiteCar from "../../../../assets/WhiteCar.png";
import Star from "../../../../assets/Star.svg?react";
import MoneyBag from "../../../../assets/MoneyBag.svg?react";
import Emergency from "../../../../assets/Emergency.svg?react";
import HomeIcon from "../../../../assets/Home.svg?react";
import MedicalIcon from "../../../../assets/MedicalKit.svg?react";
import Settings from "../../../../assets/Settings.svg?react";
import Card from "../../../../assets/Card.svg?react";

const LoanPurposeSection = () => {
  return (
    <section
      className="relative px-5 py-20 sm:px-10 lg:px-20 bg-brand-secondary bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${GridBg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-secondary via-40% to-brand-secondary pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Container (Image) */}
        <div className="w-full h-full relative">
          <img
            src={LoanImg}
            alt="Person considering a loan"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Floating Icon Grid */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-brand-white rounded-xl border-4 border-brand-lightblue px-4 py-2 sm:px-6 sm:py-3 flex flex-col justify-center">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                { src: SolarHouse, alt: "Solar House" },
                { src: Ambulance, alt: "Ambulance" },
                { src: EatingWoman, alt: "Eating Woman" },
                { src: WinterHouse, alt: "Winter House" },
                { src: Table, alt: "Table" },
                { src: Notebook, alt: "Notebook" },
                { src: School, alt: "School" },
                { src: WhiteCar, alt: "White Car" },
              ].map((img, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-8 h-8 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Container (Texts) */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-brand-accent1">
                Loan Purposes
              </span>
              <Star className="h-3 w-3 text-brand-accent1" />
            </div>
            <h2 className="text-3xl font-bold my-8 text-brand-offwhite md:text-5xl">
              Loans for Everyday Financial Needs
            </h2>
            <p className="md:text-lg max-w-xl text-brand-stroke">
              People use YourCreditPal for many different financial situations.
            </p>
          </div>

          {/* 3x2 Icon Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-brand-body rounded-xl overflow-hidden isolate mt-4">
            {[
              {
                Icon: MoneyBag,
                title: "Debt Consolidation",
                text: "Combine balances into one manageable payment.",
              },
              {
                Icon: Emergency,
                title: "Emergency Expenses",
                text: "Handle unexpected bills and urgent costs quickly.",
              },
              {
                Icon: HomeIcon,
                title: "Home Improvement",
                text: "Fund repairs, upgrades, or renovation projects.",
              },
              {
                Icon: MedicalIcon,
                title: "Medical Expenses",
                text: "Cover healthcare and medical-related costs.",
              },
              {
                Icon: Settings,
                title: "Auto Repairs",
                text: "Pay for vehicle repairs and transportation needs.",
              },
              {
                Icon: Card,
                title: "Major Purchases",
                text: "Finance important planned expenses responsibly.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start gap-3 border-brand-body p-6 sm:p-8 transition hover:bg-brand-body/20 ${[1, 2, 5].includes(idx) ? "bg-brand-title" : ""} ${idx !== 5 ? "border-b-2" : ""} ${idx >= 4 ? "sm:border-b-0" : ""} ${idx % 2 === 0 ? "sm:border-r-2" : ""}`}
              >
                <item.Icon className="w-7 sm:w-10 h-7 sm:h-10" />
                <h3 className="text-lg sm:text-xl font-bold text-brand-offwhite">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-stroke leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanPurposeSection;
