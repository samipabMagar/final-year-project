import DoctorDirectory from "@/components/doctors/DoctorDirectory";

export const metadata = {
  title: "Doctors | eDermaCare",
  description: "Browse approved dermatology doctors and check their availability.",
};

const DoctorsPage = () => {
  return <DoctorDirectory />;
};

export default DoctorsPage;
