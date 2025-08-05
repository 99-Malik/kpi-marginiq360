'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import Terms from './Sections/Terms';
export default function SignIn() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        restaurantCode: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to Identity Verification in SignIn folder structure
        router.push('/sign-in/identity');
        console.log('Sign in attempt:', formData);
    };

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

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#727A90] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-input-ring rounded-xl focus:outline-none focus:ring-1 focus:ring-input-ring focus:border-input-ring transition-colors pr-12 text-[#24282E] text-[12px] placeholder:text-[12px] placeholder:text-[#A0A0A0]"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
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
                        </div>

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