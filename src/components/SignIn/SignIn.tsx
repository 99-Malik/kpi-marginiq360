'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import Terms from './Sections/Terms';
import PhoneNumberPicker from "../PhoneNumberPicker/PhoneNumberPicker";
import { CountryCode } from "libphonenumber-js"; 

export default function SignIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    restaurantCode: 'rs-1130',
    email: 'restaruratnkfc122@gmail.com',
    phone: '',
  });
  // const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handlePhoneChange = (value: string) => {
  //   setFormData((prev) => ({ ...prev, phone: value }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/sign-in/identity?method=${activeTab}`);
    console.log('Sign in attempt:', formData);
  };

  const [phone, setPhone] = useState({
    iso: "AE" as CountryCode,
    dialCode: "+971",
    national: "",
    e164: ""
  });
    return (
        <div className="min-h-screen flex">
            {/* Left Section - Restaurant Image */}
            <LeftSection />

            {/* Right Section - Sign In Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-[70%] max-w-md lg:mt-20 lg:mb-20">
                    {/* Logo and Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">KPI | Margin IQ</h1>

                    </div>
                    <div className="text-left mb-8 mt-16">

                        <h2 className="md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Sign In to Margin IQ</h2>
                        <p className="text-[#727A90] text-[16px] mt-4 lg:mt-6">Enter your details to continue</p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="w-full flex justify-center">
                        <div className="flex w-full lg:w-[70%] xl:w-[50%] mb-6 border border-gray-200 rounded-lg p-1 bg-white justify-between">
                            <button
                                type="button"
                                onClick={() => setActiveTab('email')}
                                className={`py-1 px-3 rounded-lg text-xs lg:text-xs font-medium transition-colors
        ${activeTab === 'email'
                                        ? 'bg-purple-100  text-purple-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Via Email
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('phone')}
                                className={`py-1 px-3 rounded-lg text-xs lg:text-xs font-medium transition-colors
        ${activeTab === 'phone'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Via Phone Number
                            </button>
                        </div>
                    </div>
                    {/* Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Restaurant Code */}
                        <div>
                            <label htmlFor="restaurantCode" className="block text-sm font-medium text-[#727A90] mb-2">
                                Restaurant Code
                            </label>
                            <input
                                type="text"
                                id="restaurantCode"
                                name="restaurantCode"
                                value={formData.restaurantCode}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-input-ring rounded-xl focus:outline-none focus:ring-1 focus:ring-input-ring focus:border-input-ring transition-colors pr-12 text-[#24282E] text-[12px] placeholder:text-[12px] placeholder:text-[#A0A0A0]"
                                placeholder="Enter restaurant code"
                            />
                        </div>

                        {/* Email or Phone Number Input */}
                        <div>
                            <label
                                htmlFor={activeTab}
                                className="block text-sm font-medium text-[#727A90] mb-2"
                            >
                                {activeTab === 'email' ? 'Email' : 'Phone Number'}
                            </label>

                            {activeTab === 'email' ? (
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-input-ring rounded-xl focus:outline-none focus:ring-1 focus:ring-input-ring focus:border-input-ring transition-colors pr-12 text-[#24282E] text-[12px] placeholder:text-[12px] placeholder:text-[#A0A0A0]"
                                    placeholder="Enter your email"
                                />
                            ) : (
                                <PhoneNumberPicker
                                    value={phone}
                                    onChange={setPhone}
                                    label="Contact Number"
                                    required
                                />
                            )}
                        </div>
                        {/* Password */}
                        {/* <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#727A90] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-input-ring rounded-xl focus:outline-none focus:ring-1 focus:ring-input-ring focus:border-input-ring transition-colors pr-12 text-[#24282E] text-[12px] placeholder:text-[12px] placeholder:text-[#A0A0A0]"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform text-[12px] -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <p className="text-primary text-[10px] mt-2 cursor-pointer">Wrong Password</p>
                        </div> */}

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-sm text-white py-2 px-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Terms and Privacy */}
                    <Terms />

                </div>
            </div>
        </div>
    );
} 