import { Check } from "lucide-react";

const AuthLayout = ({
  children,
  title,
  subtitle,
  sidebarTitle,
  sidebarSubtitle,
}) => {
  const features = [
    {
      icon: Check,
      title: "Expert Care",
      description: "Book appointments with expert dermatologists.",
    },
    {
      icon: Check,
      title: "Premium Products",
      description: "Shop premium skincare products",
    },
    {
      icon: Check,
      title: "Treatment plans",
      description: "Get personalized treatment plans from dermatologists.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E6F7F7] to-[#F9FAFB] flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl flex rounded-3xl min-h-80  overflow-hidden shadow-2xl">
        <div className="bg-[#2FA4A9] text-white  p-12  flex-col justify-between hidden  lg:flex">
          <div>
            <h1 className="text-4xl font-bold mb-4">{sidebarTitle}</h1>
            <p className="text-lg opacity-90 mb-8">{sidebarSubtitle}</p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center ">
                  <div className="bg-white flex items-center justify-center w-7 h-7 bg-opacity-20 rounded-full  mr-4 ">
                    <feature.icon className="w-6  text-gray-400 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="opacity-90 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* {bottomLink && (
            <div>
              <p className="text-sm opacity-75">{bottomLink.text}</p>
              {bottomLink.link}
            </div>
          )} */}
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-3/5 overflow-y-auto">
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
