'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import Terms from './Sections/Terms';

export default function OTPVerification() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleOTPChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        console.log('Confirming OTP:', otpCode);
        router.push('/inventory-counts');
    };


    return (
        <div className="min-h-screen flex">
                        <LeftSection />


            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
            <div className="w-[70%] max-w-md lg:mt-20 lg:mb-20">


                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">KPI | Margin IQ</h1>
                    </div>

                    <div className="text-left mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Identity Verification</h2>
                        <p className="text-[#727A90] text-[16px] mt-6">Enter your details to continue</p>
                    </div>

                    <form onSubmit={handleOTPSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#727A90] mb-4 text-left mt-12">
                                Enter Restaurant Pin Code
                            </label>

                            <div className="flex justify-center gap-3 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        id={`otp-${index}`}
                                        value={digit ? '*' : ''}
                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                        className="w-12 h-12 text-center border border-input-ring rounded-lg focus:outline-none focus:ring-1 focus:ring-input-ring focus:border-input-ring transition-colors text-primary text-lg font-bold bg-[#F4ECFA]"
                                        maxLength={1}
                                        placeholder=""
                                    />
                                ))}
                            </div>

                            <p className="text-[#727A90] text-sm text-center mb-6">
                                Please enter the pin code to verify account
                            </p>
                        </div>

                        <div className="text-center">
                            <span className="text-[#727A90] text-sm">Did you get the code? </span>
                            <button
                                type="button"
                                className="text-primary underline hover:text-primary-hover font-medium text-sm"
                            >
                                Resend Code
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-[90%] bg-primary text-sm text-white py-2 px-4 rounded-xl font-medium hover:bg-primary-hover transition-colors "
                        >
                            Confirm Code
                        </button>
                    </form>

                    <Terms />
                </div>
            </div>
        </div>
    );
} 