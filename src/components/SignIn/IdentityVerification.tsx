'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import Terms from './Sections/Terms';

export default function IdentityVerification() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to OTP verification in SignIn folder structure
        router.push('/sign-in/otp');
        console.log('Sending OTP to:', email);
    };



    return (
        <div className="min-h-screen flex">
            {/* Left Section - Restaurant Image */}
            <LeftSection />


            {/* Right Section - Identity Verification Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
            <div className="w-[70%] max-w-md lg:mt-20 lg:mb-20">
                    {/* Back Button */}

                    {/* Logo and Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">KPI | Margin IQ</h1>
                    </div>

                    {/* Identity Verification Content */}
                    <div className="text-left mb-8">
                        <h2 className="md:text-xl lg:text-3xl font-bold text-gray-900 mb-2">Identity Verification</h2>
                        <p className="text-[#727A90] text-[16px] mt-4">Enter your details to continue</p>
                    </div>

                    {/* Identity Verification Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#727A90] mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-input-ring rounded-xl focus:outline-none focus:ring-1 focus:ring-input-ring focus:border-input-ring transition-colors text-[#24282E] text-[12px] placeholder:text-[12px] placeholder:text-[#A0A0A0]"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Send OTP Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-sm text-white py-2 px-3 rounded-xl font-medium hover:bg-primary-hover transition-colors "
                        >
                            Send OTP
                        </button>
                    </form>

                    {/* Terms and Privacy */}
                    <Terms />

                </div>
            </div>
        </div>
    );
}
