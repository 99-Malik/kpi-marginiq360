'use client';
import React, { useState, useEffect } from 'react'
import ProductDropdown from '../../components/DropDown/ProductDropDown';
import POSIntegrationModal from '../../components/Modal/Settings/PosIntegrationModal';
import ProcessingModal from '../../components/Modal/Settings/ProcessingModal';
import Image from 'next/image';
interface POSIntegration {
    id: string;
    name: string;
    vendor: string;
    description: string;
    isConnected: boolean;
}

function Page() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const [language, setLanguage] = useState('English');
    const [role, setRole] = useState('Super Admin');
    const [timezone, setTimezone] = useState('Eastern Time (US & Canada)');

    // Profile form state
    const [profileEmail, setProfileEmail] = useState('afshin@allfacetsconsulting.com');
    const [profileBirthday, setProfileBirthday] = useState('10/12/2025');
    const [profileLastName, setProfileLastName] = useState('');

    // Company form state
    const [companyName, setCompanyName] = useState('Demo Restaurant Group');
    const [companyPhone, setCompanyPhone] = useState('101-1532-13215');
    const [companyEmail, setCompanyEmail] = useState('vendor@132gmail.com');
    const [companyAddress, setCompanyAddress] = useState('');
    const [laborCost, setLaborCost] = useState('25');
    const [overheadPercentage, setOverheadPercentage] = useState('5');
    const [targetFoodCost, setTargetFoodCost] = useState('25');
    const [wasteThreshold, setWasteThreshold] = useState('5');
    const [inventoryMethod, setInventoryMethod] = useState('FIFO');

    const handleLogoClick = () => {
        setMenuOpen(!menuOpen);
    }

    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    // Notification toggle states
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);
    const [inAppNotifications, setInAppNotifications] = useState(true);
    const [dailySummaries, setDailySummaries] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [priceChanges, setPriceChanges] = useState(false);

    // Integration tab state
    const [activeIntegrationTab, setActiveIntegrationTab] = useState('POS Integrations');
    const [isPOSModalOpen, setIsPOSModalOpen] = useState(false);
    const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
    const [posIntegrations, setPosIntegrations] = useState<POSIntegration[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleStartIntegration = (data: { posVendor: string }) => {
        console.log('POS Integration Data:', data);

        // Close the POS modal and show processing modal
        setIsPOSModalOpen(false);
        setIsProcessingModalOpen(true);

        // Simulate processing time
        setTimeout(() => {
            // Close processing modal
            setIsProcessingModalOpen(false);

            // Add the new integration
            const newIntegration: POSIntegration = {
                id: Date.now().toString(),
                name: `${data.posVendor} Integration`,
                vendor: data.posVendor,
                description: 'Receive notifications via email',
                isConnected: true
            };

            setPosIntegrations(prev => [...prev, newIntegration]);
        }, 3000); // 3 seconds processing time
    };

    const handleDisconnectIntegration = (integrationId: string) => {
        setPosIntegrations(prev => prev.filter(integration => integration.id !== integrationId));
    };
    function VendorBadge({ vendor }: { vendor: string }) {
        const v = vendor.toLowerCase();
      
        if (v === 'toast') {
          // Put your image file in /public (e.g. /public/toast-badge.png)
          // or change the path below to wherever your image lives.
          const src = '/images/toast.png';
      
          return (
            <div className="h-12 w-22 rounded-xl bg-white p-1.5 shadow-sm flex items-center justify-center">
              <div className="h-full w-full rounded-xl overflow-hidden relative">
     
                <Image
                  src={src}
                  alt="Toast"
                  fill
                  className="object-cover"
                  priority
                />
               
              </div>
            </div>
          );
        }
      
        // Fallback for other vendors
        return (
          <div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-gray-600 leading-none">
              {vendor.slice(0, 1).toUpperCase()}
            </span>
          </div>
        );
      }
      
      
    // Don't render anything until client-side hydration is complete
    if (!isClient) {
        return (
            <div className="min-h-screen w-full flex flex-col">
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
       <>

                <main className="flex-1 overflow-auto px-2 pb-6 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Settings
                            </h1>
                            <p className="text-gray-500">Manage your account, company, and system preferences</p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="border-b border-gray-200">
                            <div className="flex gap-6 mt-12" role="tablist">
                                <button
                                    onClick={() => handleTabClick('Profile')}
                                    role="tab"
                                    aria-selected={activeTab === 'Profile'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
          ${activeTab === 'Profile'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-11 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => handleTabClick('Company')}
                                    role="tab"
                                    aria-selected={activeTab === 'Company'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
          ${activeTab === 'Company'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-16 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Company
                                </button>

                                <button
                                    onClick={() => handleTabClick('Notifications')}
                                    role="tab"
                                    aria-selected={activeTab === 'Notifications'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
          ${activeTab === 'Notifications'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-22 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Notifications
                                </button>

                                <button
                                    onClick={() => handleTabClick('Integration')}
                                    role="tab"
                                    aria-selected={activeTab === 'Integration'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
          ${activeTab === 'Integration'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-19 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Integration
                                </button>

                                <button
                                    onClick={() => handleTabClick('Security')}
                                    role="tab"
                                    aria-selected={activeTab === 'Security'}
                                    className={`relative -mb-px pb-2 text-sm transition-colors
          ${activeTab === 'Security'
                                            ? 'text-[#6E0AB8] font-semibold after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-14 after:rounded-full after:bg-[#6E0AB8]'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Security
                                </button>
                            </div>
                        </div>
                    </div>
                    {activeTab === 'Profile' && (
                        <div className="flex flex-col justify-center">
                            <div className="bg-white rounded-3xl border border-gray-200 px-4 py-4 max-w-full w-full">
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        {/* First Name */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={profileEmail}
                                                onChange={(e) => setProfileEmail(e.target.value)}
                                                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>

                                        {/* Currency */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Currency
                                            </label>
                                            <ProductDropdown
                                                value={currency}
                                                onChange={(value) => setCurrency(value)}
                                                options={[
                                                    { value: "USD", label: "USD" },
                                                    { value: "EUR", label: "EUR" },
                                                    { value: "GBP", label: "GBP" },
                                                    { value: "CAD", label: "CAD" },
                                                ]}
                                                buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>

                                        {/* Language */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Language
                                            </label>
                                            <ProductDropdown
                                                value={language}
                                                onChange={(value) => setLanguage(value)}
                                                options={[
                                                    { value: "English", label: "English" },
                                                    { value: "Spanish", label: "Spanish" },
                                                    { value: "French", label: "French" },
                                                    { value: "German", label: "German" },
                                                ]}
                                                buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        {/* Last Name */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={profileLastName}
                                                onChange={(e) => setProfileLastName(e.target.value)}
                                                placeholder="Name"
                                                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Role
                                            </label>
                                            <ProductDropdown
                                                value={role}
                                                onChange={(value) => setRole(value)}
                                                options={[
                                                    { value: "Super Admin", label: "Super Admin" },
                                                    { value: "Admin", label: "Admin" },
                                                    { value: "Manager", label: "Manager" },
                                                    { value: "User", label: "User" },
                                                ]}
                                                buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>

                                        {/* Timezone */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Timezone
                                            </label>
                                            <ProductDropdown
                                                value={timezone}
                                                onChange={(value) => setTimezone(value)}
                                                options={[
                                                    { value: "Eastern Time (US & Canada)", label: "Eastern Time (US & Canada)" },
                                                    { value: "Central Time (US & Canada)", label: "Central Time (US & Canada)" },
                                                    { value: "Mountain Time (US & Canada)", label: "Mountain Time (US & Canada)" },
                                                    { value: "Pacific Time (US & Canada)", label: "Pacific Time (US & Canada)" },
                                                ]}
                                                buttonClassName="flex items-center justify-between w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>

                                        {/* Birthday */}
                                        <div>
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Birthday
                                            </label>
                                            <input
                                                type="text"
                                                value={profileBirthday}
                                                onChange={(e) => setProfileBirthday(e.target.value)}
                                                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Changes Button */}

                            </div>
                            <div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-primary text-white px-6 text-xs py-3 rounded-xl font-medium transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'Company' && (
                        <div className="flex flex-col justify-center">
                            <div className="bg-white rounded-3xl border border-gray-200 px-4 py-4 max-w-full w-full">
                                <div className="space-y-8">
                                    {/* General Information Section */}
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 mb-6">General Information</h2>
                                        <div className="grid grid-cols-2 gap-8">
                                            {/* Company Name */}
                                            <div>
                                                <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={companyPhone}
                                                    onChange={(e) => setCompanyPhone(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={companyEmail}
                                                    onChange={(e) => setCompanyEmail(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Company Address - Full Width */}
                                        <div className="mt-6">
                                            <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                Company Address
                                            </label>
                                            <textarea
                                                value={companyAddress}
                                                onChange={(e) => setCompanyAddress(e.target.value)}
                                                placeholder="Write here"
                                                className="w-full h-20 px-3 py-2 bg-white border border-gray-200 rounded-md text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* COGS Breakdown Section */}
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 mb-6">COGS Breakdown</h2>
                                        <div className="grid grid-cols-2 gap-8">
                                            {/* Labor Cost per Hour */}
                                            <div>
                                                <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                    Labor Cost per Hour ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={laborCost}
                                                    onChange={(e) => setLaborCost(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>

                                            {/* Overhead Percentage */}
                                            <div>
                                                <label className="block text-xs font-medium mb-2">
                                                    Overhead Percentage (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={overheadPercentage}
                                                    onChange={(e) => setOverheadPercentage(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>

                                            {/* Target Food Cost */}
                                            <div>
                                                <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                    Target Food Cost (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={targetFoodCost}
                                                    onChange={(e) => setTargetFoodCost(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>

                                            {/* Waste Threshold */}
                                            <div>
                                                <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                    Waste Threshold (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={wasteThreshold}
                                                    onChange={(e) => setWasteThreshold(e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Inventory Method - Full Width */}
                                        <div className="mt-6">
                                            <label className="block text-[#727A90] text-xs font-medium mb-2">
                                                Inventory Method
                                            </label>
                                            <input
                                                type="text"
                                                value={inventoryMethod}
                                                onChange={(e) => setInventoryMethod(e.target.value)}
                                                className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-end mt-8">
                                    <button className="bg-primary text-white px-6 text-xs py-3 rounded-xl font-medium transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Notifications' && (
                        <div className="flex flex-col justify-center space-y-4">
                            {/* Email Notifications */}
                            <div className="bg-[#F8F8FC] rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* Email Icon */}
                                    <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <path d="M33.954 15.543L25.536 23.961C24.5974 24.8972 23.3257 25.423 22 25.423C20.6743 25.423 19.4026 24.8972 18.464 23.961L10.046 15.543C10.032 15.701 10 15.844 10 16.001V28.001C10.0016 29.3266 10.5289 30.5974 11.4662 31.5347C12.4036 32.4721 13.6744 32.9994 15 33.001H29C30.3256 32.9994 31.5964 32.4721 32.5338 31.5347C33.4711 30.5974 33.9984 29.3266 34 28.001V16.001C34 15.844 33.968 15.701 33.954 15.543Z" fill="#6E0AB8" />
                                            <path d="M24.1221 22.546L33.2561 13.411C32.8137 12.6773 32.1896 12.07 31.4441 11.6477C30.6986 11.2254 29.8569 11.0023 29.0001 11H15.0001C14.1434 11.0023 13.3016 11.2254 12.5562 11.6477C11.8107 12.07 11.1866 12.6773 10.7441 13.411L19.8781 22.546C20.4417 23.1073 21.2047 23.4225 22.0001 23.4225C22.7956 23.4225 23.5586 23.1073 24.1221 22.546Z" fill="#6E0AB8" />
                                        </svg>

                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Email Notifications</h3>
                                        <p className="text-xs text-[#24282E]">Receive notifications via email</p>
                                    </div>
                                </div>
                                {/* Toggle Switch - ON */}
                                <div
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ${emailNotifications ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                >
                                    <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${emailNotifications ? 'transform translate-x-6' : 'transform translate-x-1'}`}></span>
                                </div>
                            </div>

                            {/* SMS Alerts */}
                            <div className="bg-[#F8F8FC] rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* SMS Icon */}
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <g clip-path="url(#clip0_2207_29728)">
                                                <path d="M24.746 16.285C24.9355 16.0995 25.1909 15.9969 25.4561 15.9997C25.7213 16.0025 25.9745 16.1105 26.16 16.3L28 18.181V11C28 10.7348 28.1054 10.4804 28.2929 10.2929C28.4804 10.1054 28.7348 10 29 10C29.2652 10 29.5196 10.1054 29.7071 10.2929C29.8946 10.4804 30 10.7348 30 11V18.181L31.84 16.3C32.0257 16.1104 32.279 16.0023 32.5444 15.9994C32.8098 15.9966 33.0654 16.0993 33.255 16.285C33.4446 16.4707 33.5527 16.724 33.5556 16.9894C33.5584 17.2548 33.4557 17.5104 33.27 17.7L30.755 20.27C30.2932 20.734 29.6666 20.9964 29.012 21C29.0058 21.0015 28.9992 21.0015 28.993 21C28.6697 21.0001 28.3496 20.9364 28.051 20.8125C27.7524 20.6886 27.4812 20.5069 27.253 20.278L24.73 17.7C24.6381 17.6061 24.5655 17.495 24.5166 17.373C24.4676 17.251 24.4432 17.1206 24.4447 16.9892C24.4462 16.8578 24.4735 16.7279 24.5253 16.6071C24.577 16.4863 24.652 16.3768 24.746 16.285ZM22 25.422C22.7955 25.4229 23.5588 25.1078 24.122 24.546L26.463 22.205C26.2396 22.0528 26.0304 21.8808 25.838 21.691L23.3 19.1C22.7436 18.5313 22.4359 17.765 22.4446 16.9695C22.4532 16.174 22.7774 15.4145 23.346 14.858C23.82 14.394 24.792 13.543 25.42 13H15C14.1432 13.0023 13.3015 13.2254 12.556 13.6477C11.8106 14.07 11.1865 14.6773 10.744 15.411L19.878 24.546C20.4412 25.1078 21.2045 25.4229 22 25.422ZM32.185 21.668C31.7179 22.1489 31.146 22.5153 30.5138 22.7386C29.8817 22.9619 29.2065 23.0359 28.541 22.955L25.536 25.96C24.5972 26.896 23.3257 27.4216 22 27.4216C20.6743 27.4216 19.4028 26.896 18.464 25.96L10.046 17.542C10.032 17.7 10 17.843 10 18V29C10.0016 30.3256 10.5289 31.5964 11.4662 32.5338C12.4036 33.4711 13.6744 33.9984 15 34H29C30.3256 33.9984 31.5964 33.4711 32.5338 32.5338C33.4711 31.5964 33.9984 30.3256 34 29V19.812L32.185 21.668Z" fill="#6E0AB8" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2207_29728">
                                                    <rect width="24" height="24" fill="white" transform="translate(10 10)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">SMS Alerts</h3>
                                        <p className="text-xs text-[#24282E]">Get instant alerts on your mobile phone</p>
                                    </div>
                                </div>
                                {/* Toggle Switch - OFF */}
                                <div
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ${smsAlerts ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => setSmsAlerts(!smsAlerts)}
                                >
                                    <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${smsAlerts ? 'transform translate-x-6' : 'transform translate-x-1'}`}></span>
                                </div>
                            </div>

                            {/* In-App Notifications */}
                            <div className="bg-[#F8F8FC] rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* Bell Icon */}
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <path d="M25.848 26C25.5573 26 25.2701 26.0633 25.0064 26.1855C24.7427 26.3078 24.5088 26.4861 24.321 26.708L24.074 27H19.925L19.679 26.708C19.4911 26.486 19.2571 26.3076 18.9932 26.1853C18.7292 26.0631 18.4419 25.9998 18.151 26H12.5C11.837 26 11.2011 26.2634 10.7322 26.7322C10.2634 27.2011 10 27.837 10 28.5V28.5C10 29.163 10.2634 29.7989 10.7322 30.2678C11.2011 30.7366 11.837 31 12.5 31H31.5C31.8283 31 32.1534 30.9353 32.4567 30.8097C32.76 30.6841 33.0356 30.4999 33.2678 30.2678C33.4999 30.0356 33.6841 29.76 33.8097 29.4567C33.9353 29.1534 34 28.8283 34 28.5C34 28.1717 33.9353 27.8466 33.8097 27.5433C33.6841 27.24 33.4999 26.9644 33.2678 26.7322C33.0356 26.5001 32.76 26.3159 32.4567 26.1903C32.1534 26.0647 31.8283 26 31.5 26H25.848Z" fill="#6E0AB8" />
                                            <path d="M13 24H18.151C19.1265 23.9986 20.0688 24.3543 20.8 25H23.2C23.931 24.3553 24.8723 23.9997 25.847 24H31C31.3362 24.0023 31.6713 24.0392 32 24.11V18C31.9984 16.6744 31.4711 15.4036 30.5338 14.4662C29.5964 13.5289 28.3256 13.0016 27 13H17C15.6744 13.0016 14.4036 13.5289 13.4662 14.4662C12.5289 15.4036 12.0016 16.6744 12 18V24.11C12.3287 24.0392 12.6638 24.0023 13 24Z" fill="#6E0AB8" />
                                        </svg>


                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">In-App Notifications</h3>
                                        <p className="text-xs text-[#24282E]">View alerts within the application</p>
                                    </div>
                                </div>
                                {/* Toggle Switch - ON */}
                                <div
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ${inAppNotifications ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => setInAppNotifications(!inAppNotifications)}
                                >
                                    <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${inAppNotifications ? 'transform translate-x-6' : 'transform translate-x-1'}`}></span>
                                </div>
                            </div>

                            {/* Daily Summaries */}
                            <div className="bg-[#F8F8FC] rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* Document Icon */}
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <path d="M25 18.0009H31.54C31.1909 17.0758 30.6485 16.2358 29.949 15.5369L26.465 12.0509C25.7653 11.3523 24.9251 10.8103 24 10.4609V17.0009C24 17.5532 24.4477 18.0009 25 18.0009Z" fill="#6E0AB8" />
                                            <path d="M31.976 20H25C23.3431 20 22 18.6568 22 17V10.024C21.839 10.013 21.678 10 21.515 10H17C14.2399 10.0033 12.0033 12.24 12 15V29C12.0033 31.76 14.2399 33.9967 17 34H27C29.76 33.9967 31.9966 31.76 32 29V20.485C32 20.322 31.987 20.161 31.976 20Z" fill="#6E0AB8" />
                                        </svg>

                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Daily Summaries</h3>
                                        <p className="text-xs text-[#24282E]">Get a daily overview of updates and alerts in your inbox</p>
                                    </div>
                                </div>
                                {/* Toggle Switch - ON */}
                                <div
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ${dailySummaries ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => setDailySummaries(!dailySummaries)}
                                >
                                    <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${dailySummaries ? 'transform translate-x-6' : 'transform translate-x-1'}`}></span>
                                </div>
                            </div>

                            {/* Push Notifications */}
                            <div className="bg-[#F8F8FC] rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* Push Bell Icon */}
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <path d="M17.4238 31C17.8115 31.8914 18.4511 32.6502 19.264 33.1831C20.0769 33.716 21.0278 33.9999 21.9998 33.9999C22.9719 33.9999 23.9228 33.716 24.7357 33.1831C25.5486 32.6502 26.1882 31.8914 26.5758 31H17.4238Z" fill="#6E0AB8" />
                                            <path d="M32.3918 22.5497L30.6558 16.8267C30.0999 14.825 28.8912 13.0664 27.2217 11.8302C25.5522 10.5939 23.5175 9.95078 21.4407 10.0029C19.364 10.0551 17.3641 10.7995 15.7588 12.1181C14.1534 13.4366 13.0345 15.2536 12.5798 17.2807L11.2318 22.8177C11.0526 23.5534 11.0429 24.3203 11.2034 25.0603C11.3639 25.8004 11.6904 26.4943 12.1582 27.0897C12.6261 27.6852 13.2231 28.1666 13.9041 28.4976C14.5852 28.8287 15.3326 29.0007 16.0898 29.0007H27.6068C28.3875 29.0007 29.1574 28.8179 29.8548 28.4669C30.5522 28.1159 31.1577 27.6065 31.6228 26.9794C32.088 26.3523 32.3998 25.6251 32.5333 24.8558C32.6668 24.0866 32.6184 23.2968 32.3918 22.5497Z" fill="#6E0AB8" />
                                        </svg>

                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Push Notifications</h3>
                                        <p className="text-xs text-[#24282E]">Receive notifications directly on your device&apos;s home screen</p>
                                    </div>
                                </div>
                                {/* Toggle Switch - OFF */}
                                <div
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ${pushNotifications ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => setPushNotifications(!pushNotifications)}
                                >
                                    <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${pushNotifications ? 'transform translate-x-6' : 'transform translate-x-1'}`}></span>
                                </div>
                            </div>

                            {/* Price Changes */}
                            <div className="bg-[#F8F8FC] rounded-xl border border-[#E5E7EB] p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    {/* Settings with Dollar Icon */}
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="44" height="44" rx="22" fill="white" />
                                            <path d="M29 14H15C13.6744 14.0016 12.4036 14.5289 11.4662 15.4662C10.5289 16.4036 10.0016 17.6744 10 19V25C10.0016 26.3256 10.5289 27.5964 11.4662 28.5338C12.4036 29.4711 13.6744 29.9984 15 30H29C30.3256 29.9984 31.5964 29.4711 32.5338 28.5338C33.4711 27.5964 33.9984 26.3256 34 25V19C33.9984 17.6744 33.4711 16.4036 32.5338 15.4662C31.5964 14.5289 30.3256 14.0016 29 14ZM14 27C13.8022 27 13.6089 26.9414 13.4444 26.8315C13.28 26.7216 13.1518 26.5654 13.0761 26.3827C13.0004 26.2 12.9806 25.9989 13.0192 25.8049C13.0578 25.6109 13.153 25.4327 13.2929 25.2929C13.4327 25.153 13.6109 25.0578 13.8049 25.0192C13.9989 24.9806 14.2 25.0004 14.3827 25.0761C14.5654 25.1518 14.7216 25.28 14.8315 25.4444C14.9414 25.6089 15 25.8022 15 26C15 26.2652 14.8946 26.5196 14.7071 26.7071C14.5196 26.8946 14.2652 27 14 27ZM14 19C13.8022 19 13.6089 18.9414 13.4444 18.8315C13.28 18.7216 13.1518 18.5654 13.0761 18.3827C13.0004 18.2 12.9806 17.9989 13.0192 17.8049C13.0578 17.6109 13.153 17.4327 13.2929 17.2929C13.4327 17.153 13.6109 17.0578 13.8049 17.0192C13.9989 16.9806 14.2 17.0004 14.3827 17.0761C14.5654 17.1518 14.7216 17.28 14.8315 17.4444C14.9414 17.6089 15 17.8022 15 18C15 18.2652 14.8946 18.5196 14.7071 18.7071C14.5196 18.8946 14.2652 19 14 19ZM22 26C21.2089 26 20.4355 25.7654 19.7777 25.3259C19.1199 24.8864 18.6072 24.2616 18.3045 23.5307C18.0017 22.7998 17.9225 21.9956 18.0769 21.2196C18.2312 20.4437 18.6122 19.731 19.1716 19.1716C19.731 18.6122 20.4437 18.2312 21.2196 18.0769C21.9956 17.9225 22.7998 18.0017 23.5307 18.3045C24.2616 18.6072 24.8864 19.1199 25.3259 19.7777C25.7654 20.4355 26 21.2089 26 22C26 23.0609 25.5786 24.0783 24.8284 24.8284C24.0783 25.5786 23.0609 26 22 26ZM30 27C29.8022 27 29.6089 26.9414 29.4444 26.8315C29.28 26.7216 29.1518 26.5654 29.0761 26.3827C29.0004 26.2 28.9806 25.9989 29.0192 25.8049C29.0578 25.6109 29.153 25.4327 29.2929 25.2929C29.4327 25.153 29.6109 25.0578 29.8049 25.0192C29.9989 24.9806 30.2 25.0004 30.3827 25.0761C30.5654 25.1518 30.7216 25.28 30.8315 25.4444C30.9414 25.6089 31 25.8022 31 26C31 26.2652 30.8946 26.5196 30.7071 26.7071C30.5196 26.8946 30.2652 27 30 27ZM30 19C29.8022 19 29.6089 18.9414 29.4444 18.8315C29.28 18.7216 29.1518 18.5654 29.0761 18.3827C29.0004 18.2 28.9806 17.9989 29.0192 17.8049C29.0578 17.6109 29.153 17.4327 29.2929 17.2929C29.4327 17.153 29.6109 17.0578 29.8049 17.0192C29.9989 16.9806 30.2 17.0004 30.3827 17.0761C30.5654 17.1518 30.7216 17.28 30.8315 17.4444C30.9414 17.6089 31 17.8022 31 18C31 18.2652 30.8946 18.5196 30.7071 18.7071C30.5196 18.8946 30.2652 19 30 19ZM24 22C24 22.3956 23.8827 22.7822 23.6629 23.1111C23.4432 23.44 23.1308 23.6964 22.7654 23.8478C22.3999 23.9991 21.9978 24.0387 21.6098 23.9616C21.2219 23.8844 20.8655 23.6939 20.5858 23.4142C20.3061 23.1345 20.1156 22.7781 20.0384 22.3902C19.9613 22.0022 20.0009 21.6001 20.1522 21.2346C20.3036 20.8692 20.56 20.5568 20.8889 20.3371C21.2178 20.1173 21.6044 20 22 20C22.5304 20 23.0391 20.2107 23.4142 20.5858C23.7893 20.9609 24 21.4696 24 22Z" fill="#6E0AB8" />
                                        </svg>

                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Price Changes</h3>
                                        <p className="text-xs text-[#24282E]">Receive notifications via email</p>
                                    </div>
                                </div>
                                {/* Toggle Switch - OFF */}
                                <div
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-200 ${priceChanges ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => setPriceChanges(!priceChanges)}
                                >
                                    <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${priceChanges ? 'transform translate-x-6' : 'transform translate-x-1'}`}></span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-end mt-2">
                                    <button className="bg-primary text-white px-6 text-xs py-3 rounded-xl font-medium transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Integration' && (
                        <div className="flex flex-col justify-center">
                            {/* System Integrations Header */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">System Integrations</h2>

                                {/* Integration Tabs */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

                                <div className="inline-flex space-x-1 rounded-xl border border-gray-200 p-1 bg-white">
                                    <button
                                        className={`px-2 py-2 rounded-xl text-xs font-medium transition-colors ${activeIntegrationTab === "POS Integrations"
                                            ? "bg-purple-100 text-primary"
                                            : "text-[#727A90]"
                                            }`}
                                        onClick={() => setActiveIntegrationTab("POS Integrations")}
                                    >
                                        POS Integrations
                                    </button>

                                    <button
                                        className={`px-2 py-2 rounded-xl text-xs font-medium transition-colors ${activeIntegrationTab === "Vendor Integrations"
                                            ? "bg-purple-100 text-primary"
                                            : "text-[#727A90]"
                                            }`}
                                        onClick={() => setActiveIntegrationTab("Vendor Integrations")}
                                    >
                                        Vendor Integrations
                                    </button>

                                    <button
                                        className={`px-2 py-2 rounded-xl text-xs font-medium transition-colors ${activeIntegrationTab === "Payroll Integration"
                                            ? "bg-purple-100 text-primary"
                                            : "text-[#727A90]"
                                            }`}
                                        onClick={() => setActiveIntegrationTab("Payroll Integration")}
                                    >
                                        Payroll Integration
                                    </button>

                                    <button
                                        className={`px-2 py-2 rounded-xl text-xs font-medium transition-colors ${activeIntegrationTab === "Labor Schedule Software"
                                            ? "bg-purple-100 text-primary"
                                            : "text-[#727A90]"
                                            }`}
                                        onClick={() => setActiveIntegrationTab("Labor Schedule Software")}
                                    >
                                        Labor Schedule Software
                                    </button>
                                </div>
                                <div className="sm:ml-auto">
                                    <button
                                        onClick={() => setIsPOSModalOpen(true)}
                                        className="bg-primary text-white px-4 py-2 text-xs rounded-lg"
                                    >
                                        Add Pos
                                    </button>
                                </div>
                            </div>
                            </div>
                            {/* Content for active integration tab */}
                            {activeIntegrationTab === 'POS Integrations' && (
                                <>
                                    {posIntegrations.length === 0 ? (
                                        <div className="bg-white border border-[#E9EAEA] rounded-xl p-12 flex flex-col items-center justify-center min-h-[700px]">
                                            {/* Cash Register Icon */}
                                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                                <svg width="80" height="79" viewBox="0 0 80 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.947266" y="0.449219" width="78.1053" height="78.1053" rx="39.0526" fill="#F1E7F8" />
                                                    <mask id="path-2-outside-1_3090_32879" maskUnits="userSpaceOnUse" x="23.7266" y="31.2344" width="32" height="18" fill="black">
                                                        <rect fill="white" x="23.7266" y="31.2344" width="32" height="18" />
                                                        <path d="M31.2109 32.2598C31.2109 33.4199 31.2109 34.5801 31.2109 35.7754C30.8977 35.8102 30.8977 35.8102 30.5781 35.8457C30.5549 35.9385 30.5317 36.0313 30.5078 36.1269C30.671 36.2085 30.764 36.2059 30.9456 36.2057C31.0079 36.2058 31.0703 36.2059 31.1345 36.206C31.203 36.2057 31.2715 36.2055 31.3421 36.2052C31.4142 36.2052 31.4862 36.2053 31.5604 36.2053C31.7993 36.2052 32.0382 36.2047 32.2772 36.2041C32.4425 36.204 32.6078 36.2039 32.7731 36.2038C33.2089 36.2035 33.6447 36.2029 34.0805 36.2021C34.5249 36.2014 34.9693 36.201 35.4138 36.2007C36.2863 36.1999 37.1588 36.1987 38.0312 36.1973C38.0312 36.0812 38.0312 35.9652 38.0312 35.8457C37.7992 35.8225 37.5672 35.7993 37.3281 35.7754C37.3281 34.6152 37.3281 33.4551 37.3281 32.2598C38.9845 32.255 40.6408 32.2511 42.2972 32.2488C43.0663 32.2477 43.8354 32.2463 44.6045 32.2438C45.275 32.2417 45.9456 32.2404 46.6161 32.2399C46.971 32.2396 47.3258 32.239 47.6807 32.2375C48.0151 32.236 48.3495 32.2356 48.6839 32.2359C48.8062 32.2358 48.9286 32.2354 49.051 32.2346C50.105 32.228 50.9374 32.36 51.7474 33.0953C52.2561 33.6404 52.4876 34.2571 52.585 34.9858C52.596 35.0607 52.607 35.1355 52.6183 35.2126C52.6557 35.4703 52.6912 35.7283 52.7266 35.9863C52.7472 36.133 52.7679 36.2796 52.7887 36.4263C52.884 37.1008 52.976 37.7757 53.0674 38.4508C53.1013 38.7002 53.1352 38.9496 53.1692 39.199C53.2492 39.7868 53.329 40.3745 53.4087 40.9623C53.4907 41.5672 53.573 42.1721 53.6555 42.7769C53.7268 43.2993 53.7978 43.8218 53.8687 44.3443C53.9109 44.6551 53.9531 44.9658 53.9956 45.2766C54.0353 45.5675 54.0747 45.8584 54.114 46.1494C54.1284 46.2559 54.1429 46.3624 54.1575 46.469C54.1775 46.6145 54.1971 46.76 54.2166 46.9056C54.2332 47.0276 54.2332 47.0276 54.2501 47.152C54.2734 47.3769 54.2734 47.3769 54.2734 47.7988C44.853 47.7988 35.4325 47.7988 25.7266 47.7988C25.8057 46.7704 25.8057 46.7704 25.8653 46.3267C25.8718 46.2777 25.8783 46.2287 25.885 46.1782C25.9064 46.0178 25.9282 45.8575 25.95 45.6971C25.9656 45.5806 25.9812 45.4641 25.9968 45.3475C26.0388 45.0337 26.0812 44.7199 26.1236 44.4062C26.1592 44.1432 26.1946 43.8803 26.23 43.6173C26.3136 42.9966 26.3975 42.3759 26.4815 41.7552C26.568 41.1169 26.6539 40.4785 26.7395 39.8401C26.8133 39.2899 26.8875 38.7397 26.962 38.1896C27.0064 37.862 27.0506 37.5343 27.0944 37.2066C27.1357 36.8984 27.1774 36.5903 27.2194 36.2822C27.2347 36.1697 27.2498 36.0573 27.2647 35.9448C27.4202 34.7754 27.5701 33.7292 28.4688 32.8926C29.3567 32.2252 30.057 32.2598 31.2109 32.2598ZM42.1138 34.7075C42.0754 34.7529 42.0371 34.7983 41.9976 34.8451C41.7368 35.2576 41.7362 35.6653 41.7367 36.1374C41.7364 36.2057 41.7361 36.274 41.7358 36.3443C41.7353 36.4884 41.7353 36.6325 41.7356 36.7766C41.7358 36.9958 41.7342 37.2151 41.7324 37.4343C41.7322 37.5748 41.7322 37.7152 41.7323 37.8556C41.7316 37.9206 41.731 37.9856 41.7303 38.0526C41.7336 38.5212 41.7895 38.9351 42.1 39.308C42.1466 39.3459 42.1932 39.3838 42.2412 39.4228C42.2874 39.4618 42.3337 39.5008 42.3813 39.5409C42.7635 39.8 43.1052 39.8041 43.5528 39.8036C43.6534 39.8043 43.6534 39.8043 43.7559 39.805C43.9773 39.8064 44.1987 39.8067 44.4201 39.8068C44.5743 39.8073 44.7285 39.8077 44.8827 39.8082C45.206 39.8091 45.5292 39.8093 45.8525 39.8092C46.266 39.8092 46.6795 39.8112 47.093 39.8136C47.4115 39.8151 47.7301 39.8154 48.0486 39.8154C48.2011 39.8155 48.3535 39.8161 48.5059 39.8172C48.7194 39.8186 48.9329 39.8182 49.1465 39.8174C49.209 39.8181 49.2715 39.8189 49.3359 39.8197C49.8141 39.815 50.1833 39.6943 50.5485 39.3792C50.5956 39.3203 50.5956 39.3203 50.6436 39.2602C50.676 39.2212 50.7085 39.1821 50.7419 39.1419C50.9968 38.7513 50.9903 38.3888 50.9899 37.9361C50.9904 37.8312 50.9904 37.8312 50.9908 37.7241C50.9912 37.5763 50.9913 37.4285 50.9909 37.2807C50.9907 37.0557 50.9924 36.8308 50.9942 36.6058C50.9943 36.4618 50.9944 36.3179 50.9943 36.1739C50.9953 36.0738 50.9953 36.0738 50.9963 35.9717C50.993 35.4977 50.9379 35.086 50.6315 34.7037C50.5862 34.6658 50.5408 34.6279 50.4941 34.5889C50.4272 34.5304 50.4272 34.5304 50.359 34.4708C49.9462 34.2145 49.5155 34.2078 49.0441 34.2092C48.9478 34.2087 48.9478 34.2087 48.8496 34.2081C48.6384 34.2071 48.4273 34.2072 48.2161 34.2074C48.0686 34.2071 47.921 34.2068 47.7735 34.2064C47.4646 34.2059 47.1558 34.2059 46.8469 34.2063C46.4521 34.2067 46.0574 34.2055 45.6627 34.2039C45.3581 34.2029 45.0534 34.2028 44.7488 34.203C44.6033 34.203 44.4578 34.2026 44.3124 34.2019C44.1084 34.201 43.9046 34.2015 43.7006 34.2023C43.6412 34.2018 43.5818 34.2012 43.5206 34.2007C43.0033 34.2052 42.4555 34.2839 42.1138 34.7075ZM29.2422 41.1894C29.1958 41.2823 29.1494 41.3751 29.1016 41.4707C29.2324 41.6319 29.2324 41.6319 29.4389 41.6273C29.5206 41.6265 29.6024 41.6258 29.6866 41.625C29.775 41.6246 29.8633 41.6241 29.9544 41.6237C30.0471 41.6225 30.1398 41.6213 30.2354 41.6201C30.3296 41.6194 30.4238 41.6188 30.518 41.6182C30.749 41.6165 30.9799 41.6142 31.2109 41.6113C31.2589 41.4783 31.2589 41.4783 31.2812 41.3301C31.1512 41.1697 31.1512 41.1697 30.9504 41.1735C30.8716 41.1742 30.7928 41.1749 30.7116 41.1757C30.6264 41.1762 30.5412 41.1766 30.4534 41.1771C30.3641 41.1783 30.2747 41.1794 30.1826 41.1807C30.0927 41.1813 30.0028 41.1819 29.9102 41.1826C29.6875 41.1842 29.4648 41.1866 29.2422 41.1894ZM34.1641 41.1894C34.1372 41.3059 34.1139 41.4232 34.0938 41.541C34.1698 41.6329 34.1698 41.6329 34.3528 41.6193C34.4759 41.6187 34.4759 41.6187 34.6016 41.6182C34.7345 41.6178 34.7345 41.6178 34.8701 41.6175C34.9643 41.6169 35.0586 41.6163 35.1528 41.6157C35.2474 41.6154 35.3419 41.615 35.4364 41.6147C35.6686 41.6139 35.9007 41.6128 36.1328 41.6113C36.1807 41.4783 36.1807 41.4783 36.2031 41.3301C36.073 41.1697 36.073 41.1697 35.8723 41.1735C35.7935 41.1742 35.7147 41.1749 35.6335 41.1757C35.5483 41.1762 35.4631 41.1766 35.3753 41.1771C35.2859 41.1783 35.1966 41.1794 35.1045 41.1807C35.0146 41.1813 34.9247 41.1819 34.832 41.1826C34.6094 41.1842 34.3867 41.1866 34.1641 41.1894ZM38.875 41.3301C38.8982 41.4229 38.9214 41.5157 38.9453 41.6113C39.595 41.6113 40.2447 41.6113 40.9141 41.6113C40.9373 41.4953 40.9605 41.3793 40.9844 41.2598C40.6786 41.1069 40.2655 41.1764 39.9297 41.1763C39.8443 41.1754 39.7589 41.1745 39.671 41.1736C39.5896 41.1735 39.5082 41.1734 39.4243 41.1732C39.3119 41.1728 39.3119 41.1728 39.1972 41.1724C39.0041 41.1711 39.0041 41.1711 38.875 41.3301ZM43.9375 41.1894C43.8596 41.3218 43.8596 41.3218 43.7969 41.4707C43.8201 41.5171 43.8433 41.5635 43.8672 41.6113C44.5169 41.6113 45.1666 41.6113 45.8359 41.6113C45.8591 41.4953 45.8823 41.3793 45.9062 41.2598C45.831 41.1687 45.831 41.1687 45.6537 41.1815C45.5745 41.1818 45.4954 41.1822 45.4138 41.1826C45.2857 41.1829 45.2857 41.1829 45.1549 41.1833C45.065 41.1839 44.975 41.1844 44.8823 41.185C44.747 41.1855 44.747 41.1855 44.6089 41.186C44.3851 41.1868 44.1613 41.188 43.9375 41.1894ZM48.8594 41.1894C48.7814 41.3218 48.7814 41.3218 48.7188 41.4707C48.742 41.5171 48.7652 41.5635 48.7891 41.6113C49.4387 41.6113 50.0884 41.6113 50.7578 41.6113C50.781 41.4953 50.8042 41.3793 50.8281 41.2598C50.7529 41.1687 50.7529 41.1687 50.5756 41.1815C50.4964 41.1818 50.4172 41.1822 50.3357 41.1826C50.2075 41.1829 50.2075 41.1829 50.0768 41.1833C49.9868 41.1839 49.8969 41.1844 49.8042 41.185C49.6689 41.1855 49.6689 41.1855 49.5308 41.186C49.307 41.1868 49.0832 41.188 48.8594 41.1894ZM28.75 43.5098C28.785 43.7036 28.785 43.7036 28.8906 43.8613C29.2052 43.8792 29.5205 43.8743 29.8354 43.8745C29.9245 43.8754 30.0136 43.8762 30.1053 43.8771C30.1902 43.8772 30.2751 43.8774 30.3625 43.8775C30.4409 43.8778 30.5192 43.8781 30.5999 43.8784C30.7997 43.8807 30.7997 43.8807 30.9297 43.7207C30.918 43.5742 30.918 43.5742 30.8594 43.4394C30.5627 43.2911 30.1702 43.3561 29.8442 43.3559C29.7221 43.3547 29.7221 43.3547 29.5975 43.3533C29.5195 43.3532 29.4415 43.3531 29.3611 43.3529C29.2536 43.3525 29.2536 43.3525 29.144 43.352C28.9444 43.3561 28.9444 43.3561 28.75 43.5098ZM33.8828 43.5098C33.8828 43.6026 33.8828 43.6954 33.8828 43.791C34.1966 43.9479 34.6281 43.8743 34.9727 43.8745C35.1058 43.8758 35.1058 43.8758 35.2415 43.8771C35.3684 43.8773 35.3684 43.8773 35.4978 43.8775C35.5757 43.8778 35.6536 43.8781 35.7339 43.8784C35.9326 43.8806 35.9326 43.8806 36.0625 43.7207C36.0508 43.5742 36.0508 43.5742 35.9922 43.4394C35.6864 43.2866 35.2733 43.3561 34.9375 43.3559C34.8521 43.3551 34.7667 43.3542 34.6788 43.3533C34.5974 43.3532 34.516 43.3531 34.4321 43.3529C34.3197 43.3525 34.3197 43.3525 34.205 43.352C34.0119 43.3507 34.0119 43.3507 33.8828 43.5098ZM38.875 43.4394C38.8518 43.509 38.8286 43.5787 38.8047 43.6504C38.883 43.7636 38.883 43.7636 39.0156 43.8613C39.2199 43.8905 39.2199 43.8905 39.4515 43.8819C39.5365 43.8812 39.6215 43.8806 39.709 43.8799C39.7978 43.8781 39.8866 43.8763 39.978 43.8745C40.0676 43.8735 40.1572 43.8726 40.2495 43.8716C40.4711 43.8691 40.6926 43.8657 40.9141 43.8613C40.9605 43.7685 41.0069 43.6757 41.0547 43.5801C40.9292 43.4181 40.8682 43.3725 40.6618 43.3441C40.5906 43.3447 40.5194 43.3454 40.446 43.3461C40.3684 43.3464 40.2907 43.3468 40.2107 43.3472C40.1295 43.3486 40.0484 43.3501 39.9648 43.3516C39.8432 43.3521 39.8432 43.3521 39.719 43.3526C39.2901 43.3501 39.2901 43.3501 38.875 43.4394ZM43.9375 43.5098C43.9725 43.7036 43.9725 43.7036 44.0781 43.8613C44.2171 43.8683 44.3562 43.8705 44.4953 43.8707C44.6225 43.8708 44.6225 43.8708 44.7523 43.8709C44.8416 43.8707 44.9309 43.8704 45.0229 43.8701C45.1565 43.8705 45.1565 43.8705 45.2928 43.8709C45.3777 43.8708 45.4626 43.8707 45.55 43.8707C45.6284 43.8706 45.7067 43.8705 45.7874 43.8704C45.9745 43.8742 45.9745 43.8742 46.1172 43.791C46.093 43.6171 46.093 43.6171 46.0469 43.4394C45.7502 43.2911 45.3577 43.3561 45.0317 43.3559C44.9096 43.3547 44.9096 43.3547 44.785 43.3533C44.707 43.3532 44.629 43.3531 44.5486 43.3529C44.4412 43.3525 44.4412 43.3525 44.3315 43.352C44.1319 43.3561 44.1319 43.3561 43.9375 43.5098ZM49.0703 43.5098C49.1053 43.7036 49.1053 43.7036 49.2109 43.8613C49.5255 43.8792 49.8408 43.8743 50.1558 43.8745C50.2448 43.8754 50.3339 43.8762 50.4256 43.8771C50.5105 43.8772 50.5954 43.8774 50.6828 43.8775C50.7612 43.8778 50.8395 43.8781 50.9203 43.8784C51.12 43.8807 51.12 43.8807 51.25 43.7207C51.2383 43.5742 51.2383 43.5742 51.1797 43.4394C50.883 43.2911 50.4905 43.3561 50.1646 43.3559C50.0424 43.3547 50.0424 43.3547 49.9178 43.3533C49.8398 43.3532 49.7618 43.3531 49.6814 43.3529C49.574 43.3525 49.574 43.3525 49.4643 43.352C49.2647 43.3561 49.2647 43.3561 49.0703 43.5098ZM28.3281 45.9004C28.3398 46.0469 28.3398 46.0469 28.3984 46.1816C28.7032 46.334 29.114 46.2649 29.4487 46.2651C29.5335 46.266 29.6183 46.2668 29.7057 46.2677C29.8274 46.2679 29.8274 46.2679 29.9516 46.2681C30.0262 46.2684 30.1008 46.2687 30.1777 46.269C30.3829 46.2657 30.3829 46.2657 30.5781 46.1113C30.5431 45.9175 30.5431 45.9175 30.4375 45.7598C30.1112 45.7419 29.7842 45.7467 29.4575 45.7466C29.3189 45.7453 29.3189 45.7453 29.1775 45.744C29.0895 45.7438 29.0014 45.7437 28.9107 45.7435C28.8294 45.7433 28.7481 45.743 28.6643 45.7427C28.4589 45.7395 28.4589 45.7395 28.3281 45.9004ZM33.6801 45.8667C33.6542 45.901 33.6283 45.9353 33.6016 45.9707C33.6248 46.0403 33.648 46.1099 33.6719 46.1816C33.9853 46.3383 34.4131 46.2681 34.7573 46.2695C34.8895 46.2717 34.8895 46.2717 35.0244 46.2739C35.1088 46.2743 35.1931 46.2746 35.28 46.275C35.3575 46.2757 35.4351 46.2763 35.515 46.277C35.7135 46.269 35.7135 46.269 35.8433 46.145C35.8693 46.1107 35.8952 46.0764 35.9219 46.041C35.8871 45.9366 35.8871 45.9366 35.8516 45.8301C35.5381 45.6733 35.1103 45.7436 34.7661 45.7422C34.6339 45.74 34.6339 45.74 34.499 45.7378C34.4147 45.7374 34.3303 45.7371 34.2434 45.7367C34.1659 45.736 34.0884 45.7354 34.0085 45.7347C33.81 45.7427 33.81 45.7427 33.6801 45.8667ZM38.8047 45.9004C38.8164 46.0469 38.8164 46.0469 38.875 46.1816C39.1798 46.334 39.5905 46.2649 39.9253 46.2651C40.0101 46.266 40.0949 46.2668 40.1822 46.2677C40.304 46.2679 40.304 46.2679 40.4282 46.2681C40.5028 46.2684 40.5774 46.2687 40.6542 46.269C40.8594 46.2657 40.8594 46.2657 41.0547 46.1113C41.0197 45.9175 41.0197 45.9175 40.9141 45.7598C40.5878 45.7419 40.2608 45.7467 39.9341 45.7466C39.7955 45.7453 39.7955 45.7453 39.6541 45.744C39.566 45.7438 39.478 45.7437 39.3872 45.7435C39.3059 45.7433 39.2246 45.743 39.1409 45.7427C38.9354 45.7395 38.9354 45.7395 38.8047 45.9004ZM44.1567 45.8667C44.1307 45.901 44.1048 45.9353 44.0781 45.9707C44.1013 46.0403 44.1245 46.1099 44.1484 46.1816C44.4619 46.3383 44.8897 46.2681 45.2339 46.2695C45.3661 46.2717 45.3661 46.2717 45.501 46.2739C45.5853 46.2743 45.6697 46.2746 45.7566 46.275C45.8341 46.2757 45.9116 46.2763 45.9915 46.277C46.19 46.269 46.19 46.269 46.3199 46.145C46.3458 46.1107 46.3717 46.0764 46.3984 46.041C46.3636 45.9366 46.3636 45.9366 46.3281 45.8301C46.0147 45.6733 45.5869 45.7436 45.2427 45.7422C45.1105 45.74 45.1105 45.74 44.9756 45.7378C44.8912 45.7374 44.8069 45.7371 44.72 45.7367C44.6425 45.736 44.5649 45.7354 44.485 45.7347C44.2865 45.7427 44.2865 45.7427 44.1567 45.8667ZM49.4219 45.9004C49.4336 46.0469 49.4336 46.0469 49.4922 46.1816C49.7969 46.334 50.2077 46.2649 50.5425 46.2651C50.6273 46.266 50.7121 46.2668 50.7994 46.2677C50.9212 46.2679 50.9212 46.2679 51.0454 46.2681C51.12 46.2684 51.1946 46.2687 51.2714 46.269C51.4766 46.2657 51.4766 46.2657 51.6719 46.1113C51.6369 45.9175 51.6369 45.9175 51.5312 45.7598C51.205 45.7419 50.878 45.7467 50.5513 45.7466C50.4127 45.7453 50.4127 45.7453 50.2713 45.744C50.1832 45.7438 50.0951 45.7437 50.0044 45.7435C49.9231 45.7433 49.8418 45.743 49.7581 45.7427C49.5526 45.7395 49.5526 45.7395 49.4219 45.9004Z" />
                                                    </mask>
                                                    <path d="M31.2109 32.2598C31.2109 33.4199 31.2109 34.5801 31.2109 35.7754C30.8977 35.8102 30.8977 35.8102 30.5781 35.8457C30.5549 35.9385 30.5317 36.0313 30.5078 36.1269C30.671 36.2085 30.764 36.2059 30.9456 36.2057C31.0079 36.2058 31.0703 36.2059 31.1345 36.206C31.203 36.2057 31.2715 36.2055 31.3421 36.2052C31.4142 36.2052 31.4862 36.2053 31.5604 36.2053C31.7993 36.2052 32.0382 36.2047 32.2772 36.2041C32.4425 36.204 32.6078 36.2039 32.7731 36.2038C33.2089 36.2035 33.6447 36.2029 34.0805 36.2021C34.5249 36.2014 34.9693 36.201 35.4138 36.2007C36.2863 36.1999 37.1588 36.1987 38.0312 36.1973C38.0312 36.0812 38.0312 35.9652 38.0312 35.8457C37.7992 35.8225 37.5672 35.7993 37.3281 35.7754C37.3281 34.6152 37.3281 33.4551 37.3281 32.2598C38.9845 32.255 40.6408 32.2511 42.2972 32.2488C43.0663 32.2477 43.8354 32.2463 44.6045 32.2438C45.275 32.2417 45.9456 32.2404 46.6161 32.2399C46.971 32.2396 47.3258 32.239 47.6807 32.2375C48.0151 32.236 48.3495 32.2356 48.6839 32.2359C48.8062 32.2358 48.9286 32.2354 49.051 32.2346C50.105 32.228 50.9374 32.36 51.7474 33.0953C52.2561 33.6404 52.4876 34.2571 52.585 34.9858C52.596 35.0607 52.607 35.1355 52.6183 35.2126C52.6557 35.4703 52.6912 35.7283 52.7266 35.9863C52.7472 36.133 52.7679 36.2796 52.7887 36.4263C52.884 37.1008 52.976 37.7757 53.0674 38.4508C53.1013 38.7002 53.1352 38.9496 53.1692 39.199C53.2492 39.7868 53.329 40.3745 53.4087 40.9623C53.4907 41.5672 53.573 42.1721 53.6555 42.7769C53.7268 43.2993 53.7978 43.8218 53.8687 44.3443C53.9109 44.6551 53.9531 44.9658 53.9956 45.2766C54.0353 45.5675 54.0747 45.8584 54.114 46.1494C54.1284 46.2559 54.1429 46.3624 54.1575 46.469C54.1775 46.6145 54.1971 46.76 54.2166 46.9056C54.2332 47.0276 54.2332 47.0276 54.2501 47.152C54.2734 47.3769 54.2734 47.3769 54.2734 47.7988C44.853 47.7988 35.4325 47.7988 25.7266 47.7988C25.8057 46.7704 25.8057 46.7704 25.8653 46.3267C25.8718 46.2777 25.8783 46.2287 25.885 46.1782C25.9064 46.0178 25.9282 45.8575 25.95 45.6971C25.9656 45.5806 25.9812 45.4641 25.9968 45.3475C26.0388 45.0337 26.0812 44.7199 26.1236 44.4062C26.1592 44.1432 26.1946 43.8803 26.23 43.6173C26.3136 42.9966 26.3975 42.3759 26.4815 41.7552C26.568 41.1169 26.6539 40.4785 26.7395 39.8401C26.8133 39.2899 26.8875 38.7397 26.962 38.1896C27.0064 37.862 27.0506 37.5343 27.0944 37.2066C27.1357 36.8984 27.1774 36.5903 27.2194 36.2822C27.2347 36.1697 27.2498 36.0573 27.2647 35.9448C27.4202 34.7754 27.5701 33.7292 28.4688 32.8926C29.3567 32.2252 30.057 32.2598 31.2109 32.2598ZM42.1138 34.7075C42.0754 34.7529 42.0371 34.7983 41.9976 34.8451C41.7368 35.2576 41.7362 35.6653 41.7367 36.1374C41.7364 36.2057 41.7361 36.274 41.7358 36.3443C41.7353 36.4884 41.7353 36.6325 41.7356 36.7766C41.7358 36.9958 41.7342 37.2151 41.7324 37.4343C41.7322 37.5748 41.7322 37.7152 41.7323 37.8556C41.7316 37.9206 41.731 37.9856 41.7303 38.0526C41.7336 38.5212 41.7895 38.9351 42.1 39.308C42.1466 39.3459 42.1932 39.3838 42.2412 39.4228C42.2874 39.4618 42.3337 39.5008 42.3813 39.5409C42.7635 39.8 43.1052 39.8041 43.5528 39.8036C43.6534 39.8043 43.6534 39.8043 43.7559 39.805C43.9773 39.8064 44.1987 39.8067 44.4201 39.8068C44.5743 39.8073 44.7285 39.8077 44.8827 39.8082C45.206 39.8091 45.5292 39.8093 45.8525 39.8092C46.266 39.8092 46.6795 39.8112 47.093 39.8136C47.4115 39.8151 47.7301 39.8154 48.0486 39.8154C48.2011 39.8155 48.3535 39.8161 48.5059 39.8172C48.7194 39.8186 48.9329 39.8182 49.1465 39.8174C49.209 39.8181 49.2715 39.8189 49.3359 39.8197C49.8141 39.815 50.1833 39.6943 50.5485 39.3792C50.5956 39.3203 50.5956 39.3203 50.6436 39.2602C50.676 39.2212 50.7085 39.1821 50.7419 39.1419C50.9968 38.7513 50.9903 38.3888 50.9899 37.9361C50.9904 37.8312 50.9904 37.8312 50.9908 37.7241C50.9912 37.5763 50.9913 37.4285 50.9909 37.2807C50.9907 37.0557 50.9924 36.8308 50.9942 36.6058C50.9943 36.4618 50.9944 36.3179 50.9943 36.1739C50.9953 36.0738 50.9953 36.0738 50.9963 35.9717C50.993 35.4977 50.9379 35.086 50.6315 34.7037C50.5862 34.6658 50.5408 34.6279 50.4941 34.5889C50.4272 34.5304 50.4272 34.5304 50.359 34.4708C49.9462 34.2145 49.5155 34.2078 49.0441 34.2092C48.9478 34.2087 48.9478 34.2087 48.8496 34.2081C48.6384 34.2071 48.4273 34.2072 48.2161 34.2074C48.0686 34.2071 47.921 34.2068 47.7735 34.2064C47.4646 34.2059 47.1558 34.2059 46.8469 34.2063C46.4521 34.2067 46.0574 34.2055 45.6627 34.2039C45.3581 34.2029 45.0534 34.2028 44.7488 34.203C44.6033 34.203 44.4578 34.2026 44.3124 34.2019C44.1084 34.201 43.9046 34.2015 43.7006 34.2023C43.6412 34.2018 43.5818 34.2012 43.5206 34.2007C43.0033 34.2052 42.4555 34.2839 42.1138 34.7075ZM29.2422 41.1894C29.1958 41.2823 29.1494 41.3751 29.1016 41.4707C29.2324 41.6319 29.2324 41.6319 29.4389 41.6273C29.5206 41.6265 29.6024 41.6258 29.6866 41.625C29.775 41.6246 29.8633 41.6241 29.9544 41.6237C30.0471 41.6225 30.1398 41.6213 30.2354 41.6201C30.3296 41.6194 30.4238 41.6188 30.518 41.6182C30.749 41.6165 30.9799 41.6142 31.2109 41.6113C31.2589 41.4783 31.2589 41.4783 31.2812 41.3301C31.1512 41.1697 31.1512 41.1697 30.9504 41.1735C30.8716 41.1742 30.7928 41.1749 30.7116 41.1757C30.6264 41.1762 30.5412 41.1766 30.4534 41.1771C30.3641 41.1783 30.2747 41.1794 30.1826 41.1807C30.0927 41.1813 30.0028 41.1819 29.9102 41.1826C29.6875 41.1842 29.4648 41.1866 29.2422 41.1894ZM34.1641 41.1894C34.1372 41.3059 34.1139 41.4232 34.0938 41.541C34.1698 41.6329 34.1698 41.6329 34.3528 41.6193C34.4759 41.6187 34.4759 41.6187 34.6016 41.6182C34.7345 41.6178 34.7345 41.6178 34.8701 41.6175C34.9643 41.6169 35.0586 41.6163 35.1528 41.6157C35.2474 41.6154 35.3419 41.615 35.4364 41.6147C35.6686 41.6139 35.9007 41.6128 36.1328 41.6113C36.1807 41.4783 36.1807 41.4783 36.2031 41.3301C36.073 41.1697 36.073 41.1697 35.8723 41.1735C35.7935 41.1742 35.7147 41.1749 35.6335 41.1757C35.5483 41.1762 35.4631 41.1766 35.3753 41.1771C35.2859 41.1783 35.1966 41.1794 35.1045 41.1807C35.0146 41.1813 34.9247 41.1819 34.832 41.1826C34.6094 41.1842 34.3867 41.1866 34.1641 41.1894ZM38.875 41.3301C38.8982 41.4229 38.9214 41.5157 38.9453 41.6113C39.595 41.6113 40.2447 41.6113 40.9141 41.6113C40.9373 41.4953 40.9605 41.3793 40.9844 41.2598C40.6786 41.1069 40.2655 41.1764 39.9297 41.1763C39.8443 41.1754 39.7589 41.1745 39.671 41.1736C39.5896 41.1735 39.5082 41.1734 39.4243 41.1732C39.3119 41.1728 39.3119 41.1728 39.1972 41.1724C39.0041 41.1711 39.0041 41.1711 38.875 41.3301ZM43.9375 41.1894C43.8596 41.3218 43.8596 41.3218 43.7969 41.4707C43.8201 41.5171 43.8433 41.5635 43.8672 41.6113C44.5169 41.6113 45.1666 41.6113 45.8359 41.6113C45.8591 41.4953 45.8823 41.3793 45.9062 41.2598C45.831 41.1687 45.831 41.1687 45.6537 41.1815C45.5745 41.1818 45.4954 41.1822 45.4138 41.1826C45.2857 41.1829 45.2857 41.1829 45.1549 41.1833C45.065 41.1839 44.975 41.1844 44.8823 41.185C44.747 41.1855 44.747 41.1855 44.6089 41.186C44.3851 41.1868 44.1613 41.188 43.9375 41.1894ZM48.8594 41.1894C48.7814 41.3218 48.7814 41.3218 48.7188 41.4707C48.742 41.5171 48.7652 41.5635 48.7891 41.6113C49.4387 41.6113 50.0884 41.6113 50.7578 41.6113C50.781 41.4953 50.8042 41.3793 50.8281 41.2598C50.7529 41.1687 50.7529 41.1687 50.5756 41.1815C50.4964 41.1818 50.4172 41.1822 50.3357 41.1826C50.2075 41.1829 50.2075 41.1829 50.0768 41.1833C49.9868 41.1839 49.8969 41.1844 49.8042 41.185C49.6689 41.1855 49.6689 41.1855 49.5308 41.186C49.307 41.1868 49.0832 41.188 48.8594 41.1894ZM28.75 43.5098C28.785 43.7036 28.785 43.7036 28.8906 43.8613C29.2052 43.8792 29.5205 43.8743 29.8354 43.8745C29.9245 43.8754 30.0136 43.8762 30.1053 43.8771C30.1902 43.8772 30.2751 43.8774 30.3625 43.8775C30.4409 43.8778 30.5192 43.8781 30.5999 43.8784C30.7997 43.8807 30.7997 43.8807 30.9297 43.7207C30.918 43.5742 30.918 43.5742 30.8594 43.4394C30.5627 43.2911 30.1702 43.3561 29.8442 43.3559C29.7221 43.3547 29.7221 43.3547 29.5975 43.3533C29.5195 43.3532 29.4415 43.3531 29.3611 43.3529C29.2536 43.3525 29.2536 43.3525 29.144 43.352C28.9444 43.3561 28.9444 43.3561 28.75 43.5098ZM33.8828 43.5098C33.8828 43.6026 33.8828 43.6954 33.8828 43.791C34.1966 43.9479 34.6281 43.8743 34.9727 43.8745C35.1058 43.8758 35.1058 43.8758 35.2415 43.8771C35.3684 43.8773 35.3684 43.8773 35.4978 43.8775C35.5757 43.8778 35.6536 43.8781 35.7339 43.8784C35.9326 43.8806 35.9326 43.8806 36.0625 43.7207C36.0508 43.5742 36.0508 43.5742 35.9922 43.4394C35.6864 43.2866 35.2733 43.3561 34.9375 43.3559C34.8521 43.3551 34.7667 43.3542 34.6788 43.3533C34.5974 43.3532 34.516 43.3531 34.4321 43.3529C34.3197 43.3525 34.3197 43.3525 34.205 43.352C34.0119 43.3507 34.0119 43.3507 33.8828 43.5098ZM38.875 43.4394C38.8518 43.509 38.8286 43.5787 38.8047 43.6504C38.883 43.7636 38.883 43.7636 39.0156 43.8613C39.2199 43.8905 39.2199 43.8905 39.4515 43.8819C39.5365 43.8812 39.6215 43.8806 39.709 43.8799C39.7978 43.8781 39.8866 43.8763 39.978 43.8745C40.0676 43.8735 40.1572 43.8726 40.2495 43.8716C40.4711 43.8691 40.6926 43.8657 40.9141 43.8613C40.9605 43.7685 41.0069 43.6757 41.0547 43.5801C40.9292 43.4181 40.8682 43.3725 40.6618 43.3441C40.5906 43.3447 40.5194 43.3454 40.446 43.3461C40.3684 43.3464 40.2907 43.3468 40.2107 43.3472C40.1295 43.3486 40.0484 43.3501 39.9648 43.3516C39.8432 43.3521 39.8432 43.3521 39.719 43.3526C39.2901 43.3501 39.2901 43.3501 38.875 43.4394ZM43.9375 43.5098C43.9725 43.7036 43.9725 43.7036 44.0781 43.8613C44.2171 43.8683 44.3562 43.8705 44.4953 43.8707C44.6225 43.8708 44.6225 43.8708 44.7523 43.8709C44.8416 43.8707 44.9309 43.8704 45.0229 43.8701C45.1565 43.8705 45.1565 43.8705 45.2928 43.8709C45.3777 43.8708 45.4626 43.8707 45.55 43.8707C45.6284 43.8706 45.7067 43.8705 45.7874 43.8704C45.9745 43.8742 45.9745 43.8742 46.1172 43.791C46.093 43.6171 46.093 43.6171 46.0469 43.4394C45.7502 43.2911 45.3577 43.3561 45.0317 43.3559C44.9096 43.3547 44.9096 43.3547 44.785 43.3533C44.707 43.3532 44.629 43.3531 44.5486 43.3529C44.4412 43.3525 44.4412 43.3525 44.3315 43.352C44.1319 43.3561 44.1319 43.3561 43.9375 43.5098ZM49.0703 43.5098C49.1053 43.7036 49.1053 43.7036 49.2109 43.8613C49.5255 43.8792 49.8408 43.8743 50.1558 43.8745C50.2448 43.8754 50.3339 43.8762 50.4256 43.8771C50.5105 43.8772 50.5954 43.8774 50.6828 43.8775C50.7612 43.8778 50.8395 43.8781 50.9203 43.8784C51.12 43.8807 51.12 43.8807 51.25 43.7207C51.2383 43.5742 51.2383 43.5742 51.1797 43.4394C50.883 43.2911 50.4905 43.3561 50.1646 43.3559C50.0424 43.3547 50.0424 43.3547 49.9178 43.3533C49.8398 43.3532 49.7618 43.3531 49.6814 43.3529C49.574 43.3525 49.574 43.3525 49.4643 43.352C49.2647 43.3561 49.2647 43.3561 49.0703 43.5098ZM28.3281 45.9004C28.3398 46.0469 28.3398 46.0469 28.3984 46.1816C28.7032 46.334 29.114 46.2649 29.4487 46.2651C29.5335 46.266 29.6183 46.2668 29.7057 46.2677C29.8274 46.2679 29.8274 46.2679 29.9516 46.2681C30.0262 46.2684 30.1008 46.2687 30.1777 46.269C30.3829 46.2657 30.3829 46.2657 30.5781 46.1113C30.5431 45.9175 30.5431 45.9175 30.4375 45.7598C30.1112 45.7419 29.7842 45.7467 29.4575 45.7466C29.3189 45.7453 29.3189 45.7453 29.1775 45.744C29.0895 45.7438 29.0014 45.7437 28.9107 45.7435C28.8294 45.7433 28.7481 45.743 28.6643 45.7427C28.4589 45.7395 28.4589 45.7395 28.3281 45.9004ZM33.6801 45.8667C33.6542 45.901 33.6283 45.9353 33.6016 45.9707C33.6248 46.0403 33.648 46.1099 33.6719 46.1816C33.9853 46.3383 34.4131 46.2681 34.7573 46.2695C34.8895 46.2717 34.8895 46.2717 35.0244 46.2739C35.1088 46.2743 35.1931 46.2746 35.28 46.275C35.3575 46.2757 35.4351 46.2763 35.515 46.277C35.7135 46.269 35.7135 46.269 35.8433 46.145C35.8693 46.1107 35.8952 46.0764 35.9219 46.041C35.8871 45.9366 35.8871 45.9366 35.8516 45.8301C35.5381 45.6733 35.1103 45.7436 34.7661 45.7422C34.6339 45.74 34.6339 45.74 34.499 45.7378C34.4147 45.7374 34.3303 45.7371 34.2434 45.7367C34.1659 45.736 34.0884 45.7354 34.0085 45.7347C33.81 45.7427 33.81 45.7427 33.6801 45.8667ZM38.8047 45.9004C38.8164 46.0469 38.8164 46.0469 38.875 46.1816C39.1798 46.334 39.5905 46.2649 39.9253 46.2651C40.0101 46.266 40.0949 46.2668 40.1822 46.2677C40.304 46.2679 40.304 46.2679 40.4282 46.2681C40.5028 46.2684 40.5774 46.2687 40.6542 46.269C40.8594 46.2657 40.8594 46.2657 41.0547 46.1113C41.0197 45.9175 41.0197 45.9175 40.9141 45.7598C40.5878 45.7419 40.2608 45.7467 39.9341 45.7466C39.7955 45.7453 39.7955 45.7453 39.6541 45.744C39.566 45.7438 39.478 45.7437 39.3872 45.7435C39.3059 45.7433 39.2246 45.743 39.1409 45.7427C38.9354 45.7395 38.9354 45.7395 38.8047 45.9004ZM44.1567 45.8667C44.1307 45.901 44.1048 45.9353 44.0781 45.9707C44.1013 46.0403 44.1245 46.1099 44.1484 46.1816C44.4619 46.3383 44.8897 46.2681 45.2339 46.2695C45.3661 46.2717 45.3661 46.2717 45.501 46.2739C45.5853 46.2743 45.6697 46.2746 45.7566 46.275C45.8341 46.2757 45.9116 46.2763 45.9915 46.277C46.19 46.269 46.19 46.269 46.3199 46.145C46.3458 46.1107 46.3717 46.0764 46.3984 46.041C46.3636 45.9366 46.3636 45.9366 46.3281 45.8301C46.0147 45.6733 45.5869 45.7436 45.2427 45.7422C45.1105 45.74 45.1105 45.74 44.9756 45.7378C44.8912 45.7374 44.8069 45.7371 44.72 45.7367C44.6425 45.736 44.5649 45.7354 44.485 45.7347C44.2865 45.7427 44.2865 45.7427 44.1567 45.8667ZM49.4219 45.9004C49.4336 46.0469 49.4336 46.0469 49.4922 46.1816C49.7969 46.334 50.2077 46.2649 50.5425 46.2651C50.6273 46.266 50.7121 46.2668 50.7994 46.2677C50.9212 46.2679 50.9212 46.2679 51.0454 46.2681C51.12 46.2684 51.1946 46.2687 51.2714 46.269C51.4766 46.2657 51.4766 46.2657 51.6719 46.1113C51.6369 45.9175 51.6369 45.9175 51.5312 45.7598C51.205 45.7419 50.878 45.7467 50.5513 45.7466C50.4127 45.7453 50.4127 45.7453 50.2713 45.744C50.1832 45.7438 50.0951 45.7437 50.0044 45.7435C49.9231 45.7433 49.8418 45.743 49.7581 45.7427C49.5526 45.7395 49.5526 45.7395 49.4219 45.9004Z" fill="#6E0AB8" />
                                                    <path d="M31.2109 32.2598C31.2109 33.4199 31.2109 34.5801 31.2109 35.7754C30.8977 35.8102 30.8977 35.8102 30.5781 35.8457C30.5549 35.9385 30.5317 36.0313 30.5078 36.1269C30.671 36.2085 30.764 36.2059 30.9456 36.2057C31.0079 36.2058 31.0703 36.2059 31.1345 36.206C31.203 36.2057 31.2715 36.2055 31.3421 36.2052C31.4142 36.2052 31.4862 36.2053 31.5604 36.2053C31.7993 36.2052 32.0382 36.2047 32.2772 36.2041C32.4425 36.204 32.6078 36.2039 32.7731 36.2038C33.2089 36.2035 33.6447 36.2029 34.0805 36.2021C34.5249 36.2014 34.9693 36.201 35.4138 36.2007C36.2863 36.1999 37.1588 36.1987 38.0312 36.1973C38.0312 36.0812 38.0312 35.9652 38.0312 35.8457C37.7992 35.8225 37.5672 35.7993 37.3281 35.7754C37.3281 34.6152 37.3281 33.4551 37.3281 32.2598C38.9845 32.255 40.6408 32.2511 42.2972 32.2488C43.0663 32.2477 43.8354 32.2463 44.6045 32.2438C45.275 32.2417 45.9456 32.2404 46.6161 32.2399C46.971 32.2396 47.3258 32.239 47.6807 32.2375C48.0151 32.236 48.3495 32.2356 48.6839 32.2359C48.8062 32.2358 48.9286 32.2354 49.051 32.2346C50.105 32.228 50.9374 32.36 51.7474 33.0953C52.2561 33.6404 52.4876 34.2571 52.585 34.9858C52.596 35.0607 52.607 35.1355 52.6183 35.2126C52.6557 35.4703 52.6912 35.7283 52.7266 35.9863C52.7472 36.133 52.7679 36.2796 52.7887 36.4263C52.884 37.1008 52.976 37.7757 53.0674 38.4508C53.1013 38.7002 53.1352 38.9496 53.1692 39.199C53.2492 39.7868 53.329 40.3745 53.4087 40.9623C53.4907 41.5672 53.573 42.1721 53.6555 42.7769C53.7268 43.2993 53.7978 43.8218 53.8687 44.3443C53.9109 44.6551 53.9531 44.9658 53.9956 45.2766C54.0353 45.5675 54.0747 45.8584 54.114 46.1494C54.1284 46.2559 54.1429 46.3624 54.1575 46.469C54.1775 46.6145 54.1971 46.76 54.2166 46.9056C54.2332 47.0276 54.2332 47.0276 54.2501 47.152C54.2734 47.3769 54.2734 47.3769 54.2734 47.7988C44.853 47.7988 35.4325 47.7988 25.7266 47.7988C25.8057 46.7704 25.8057 46.7704 25.8653 46.3267C25.8718 46.2777 25.8783 46.2287 25.885 46.1782C25.9064 46.0178 25.9282 45.8575 25.95 45.6971C25.9656 45.5806 25.9812 45.4641 25.9968 45.3475C26.0388 45.0337 26.0812 44.7199 26.1236 44.4062C26.1592 44.1432 26.1946 43.8803 26.23 43.6173C26.3136 42.9966 26.3975 42.3759 26.4815 41.7552C26.568 41.1169 26.6539 40.4785 26.7395 39.8401C26.8133 39.2899 26.8875 38.7397 26.962 38.1896C27.0064 37.862 27.0506 37.5343 27.0944 37.2066C27.1357 36.8984 27.1774 36.5903 27.2194 36.2822C27.2347 36.1697 27.2498 36.0573 27.2647 35.9448C27.4202 34.7754 27.5701 33.7292 28.4688 32.8926C29.3567 32.2252 30.057 32.2598 31.2109 32.2598ZM42.1138 34.7075C42.0754 34.7529 42.0371 34.7983 41.9976 34.8451C41.7368 35.2576 41.7362 35.6653 41.7367 36.1374C41.7364 36.2057 41.7361 36.274 41.7358 36.3443C41.7353 36.4884 41.7353 36.6325 41.7356 36.7766C41.7358 36.9958 41.7342 37.2151 41.7324 37.4343C41.7322 37.5748 41.7322 37.7152 41.7323 37.8556C41.7316 37.9206 41.731 37.9856 41.7303 38.0526C41.7336 38.5212 41.7895 38.9351 42.1 39.308C42.1466 39.3459 42.1932 39.3838 42.2412 39.4228C42.2874 39.4618 42.3337 39.5008 42.3813 39.5409C42.7635 39.8 43.1052 39.8041 43.5528 39.8036C43.6534 39.8043 43.6534 39.8043 43.7559 39.805C43.9773 39.8064 44.1987 39.8067 44.4201 39.8068C44.5743 39.8073 44.7285 39.8077 44.8827 39.8082C45.206 39.8091 45.5292 39.8093 45.8525 39.8092C46.266 39.8092 46.6795 39.8112 47.093 39.8136C47.4115 39.8151 47.7301 39.8154 48.0486 39.8154C48.2011 39.8155 48.3535 39.8161 48.5059 39.8172C48.7194 39.8186 48.9329 39.8182 49.1465 39.8174C49.209 39.8181 49.2715 39.8189 49.3359 39.8197C49.8141 39.815 50.1833 39.6943 50.5485 39.3792C50.5956 39.3203 50.5956 39.3203 50.6436 39.2602C50.676 39.2212 50.7085 39.1821 50.7419 39.1419C50.9968 38.7513 50.9903 38.3888 50.9899 37.9361C50.9904 37.8312 50.9904 37.8312 50.9908 37.7241C50.9912 37.5763 50.9913 37.4285 50.9909 37.2807C50.9907 37.0557 50.9924 36.8308 50.9942 36.6058C50.9943 36.4618 50.9944 36.3179 50.9943 36.1739C50.9953 36.0738 50.9953 36.0738 50.9963 35.9717C50.993 35.4977 50.9379 35.086 50.6315 34.7037C50.5862 34.6658 50.5408 34.6279 50.4941 34.5889C50.4272 34.5304 50.4272 34.5304 50.359 34.4708C49.9462 34.2145 49.5155 34.2078 49.0441 34.2092C48.9478 34.2087 48.9478 34.2087 48.8496 34.2081C48.6384 34.2071 48.4273 34.2072 48.2161 34.2074C48.0686 34.2071 47.921 34.2068 47.7735 34.2064C47.4646 34.2059 47.1558 34.2059 46.8469 34.2063C46.4521 34.2067 46.0574 34.2055 45.6627 34.2039C45.3581 34.2029 45.0534 34.2028 44.7488 34.203C44.6033 34.203 44.4578 34.2026 44.3124 34.2019C44.1084 34.201 43.9046 34.2015 43.7006 34.2023C43.6412 34.2018 43.5818 34.2012 43.5206 34.2007C43.0033 34.2052 42.4555 34.2839 42.1138 34.7075ZM29.2422 41.1894C29.1958 41.2823 29.1494 41.3751 29.1016 41.4707C29.2324 41.6319 29.2324 41.6319 29.4389 41.6273C29.5206 41.6265 29.6024 41.6258 29.6866 41.625C29.775 41.6246 29.8633 41.6241 29.9544 41.6237C30.0471 41.6225 30.1398 41.6213 30.2354 41.6201C30.3296 41.6194 30.4238 41.6188 30.518 41.6182C30.749 41.6165 30.9799 41.6142 31.2109 41.6113C31.2589 41.4783 31.2589 41.4783 31.2812 41.3301C31.1512 41.1697 31.1512 41.1697 30.9504 41.1735C30.8716 41.1742 30.7928 41.1749 30.7116 41.1757C30.6264 41.1762 30.5412 41.1766 30.4534 41.1771C30.3641 41.1783 30.2747 41.1794 30.1826 41.1807C30.0927 41.1813 30.0028 41.1819 29.9102 41.1826C29.6875 41.1842 29.4648 41.1866 29.2422 41.1894ZM34.1641 41.1894C34.1372 41.3059 34.1139 41.4232 34.0938 41.541C34.1698 41.6329 34.1698 41.6329 34.3528 41.6193C34.4759 41.6187 34.4759 41.6187 34.6016 41.6182C34.7345 41.6178 34.7345 41.6178 34.8701 41.6175C34.9643 41.6169 35.0586 41.6163 35.1528 41.6157C35.2474 41.6154 35.3419 41.615 35.4364 41.6147C35.6686 41.6139 35.9007 41.6128 36.1328 41.6113C36.1807 41.4783 36.1807 41.4783 36.2031 41.3301C36.073 41.1697 36.073 41.1697 35.8723 41.1735C35.7935 41.1742 35.7147 41.1749 35.6335 41.1757C35.5483 41.1762 35.4631 41.1766 35.3753 41.1771C35.2859 41.1783 35.1966 41.1794 35.1045 41.1807C35.0146 41.1813 34.9247 41.1819 34.832 41.1826C34.6094 41.1842 34.3867 41.1866 34.1641 41.1894ZM38.875 41.3301C38.8982 41.4229 38.9214 41.5157 38.9453 41.6113C39.595 41.6113 40.2447 41.6113 40.9141 41.6113C40.9373 41.4953 40.9605 41.3793 40.9844 41.2598C40.6786 41.1069 40.2655 41.1764 39.9297 41.1763C39.8443 41.1754 39.7589 41.1745 39.671 41.1736C39.5896 41.1735 39.5082 41.1734 39.4243 41.1732C39.3119 41.1728 39.3119 41.1728 39.1972 41.1724C39.0041 41.1711 39.0041 41.1711 38.875 41.3301ZM43.9375 41.1894C43.8596 41.3218 43.8596 41.3218 43.7969 41.4707C43.8201 41.5171 43.8433 41.5635 43.8672 41.6113C44.5169 41.6113 45.1666 41.6113 45.8359 41.6113C45.8591 41.4953 45.8823 41.3793 45.9062 41.2598C45.831 41.1687 45.831 41.1687 45.6537 41.1815C45.5745 41.1818 45.4954 41.1822 45.4138 41.1826C45.2857 41.1829 45.2857 41.1829 45.1549 41.1833C45.065 41.1839 44.975 41.1844 44.8823 41.185C44.747 41.1855 44.747 41.1855 44.6089 41.186C44.3851 41.1868 44.1613 41.188 43.9375 41.1894ZM48.8594 41.1894C48.7814 41.3218 48.7814 41.3218 48.7188 41.4707C48.742 41.5171 48.7652 41.5635 48.7891 41.6113C49.4387 41.6113 50.0884 41.6113 50.7578 41.6113C50.781 41.4953 50.8042 41.3793 50.8281 41.2598C50.7529 41.1687 50.7529 41.1687 50.5756 41.1815C50.4964 41.1818 50.4172 41.1822 50.3357 41.1826C50.2075 41.1829 50.2075 41.1829 50.0768 41.1833C49.9868 41.1839 49.8969 41.1844 49.8042 41.185C49.6689 41.1855 49.6689 41.1855 49.5308 41.186C49.307 41.1868 49.0832 41.188 48.8594 41.1894ZM28.75 43.5098C28.785 43.7036 28.785 43.7036 28.8906 43.8613C29.2052 43.8792 29.5205 43.8743 29.8354 43.8745C29.9245 43.8754 30.0136 43.8762 30.1053 43.8771C30.1902 43.8772 30.2751 43.8774 30.3625 43.8775C30.4409 43.8778 30.5192 43.8781 30.5999 43.8784C30.7997 43.8807 30.7997 43.8807 30.9297 43.7207C30.918 43.5742 30.918 43.5742 30.8594 43.4394C30.5627 43.2911 30.1702 43.3561 29.8442 43.3559C29.7221 43.3547 29.7221 43.3547 29.5975 43.3533C29.5195 43.3532 29.4415 43.3531 29.3611 43.3529C29.2536 43.3525 29.2536 43.3525 29.144 43.352C28.9444 43.3561 28.9444 43.3561 28.75 43.5098ZM33.8828 43.5098C33.8828 43.6026 33.8828 43.6954 33.8828 43.791C34.1966 43.9479 34.6281 43.8743 34.9727 43.8745C35.1058 43.8758 35.1058 43.8758 35.2415 43.8771C35.3684 43.8773 35.3684 43.8773 35.4978 43.8775C35.5757 43.8778 35.6536 43.8781 35.7339 43.8784C35.9326 43.8806 35.9326 43.8806 36.0625 43.7207C36.0508 43.5742 36.0508 43.5742 35.9922 43.4394C35.6864 43.2866 35.2733 43.3561 34.9375 43.3559C34.8521 43.3551 34.7667 43.3542 34.6788 43.3533C34.5974 43.3532 34.516 43.3531 34.4321 43.3529C34.3197 43.3525 34.3197 43.3525 34.205 43.352C34.0119 43.3507 34.0119 43.3507 33.8828 43.5098ZM38.875 43.4394C38.8518 43.509 38.8286 43.5787 38.8047 43.6504C38.883 43.7636 38.883 43.7636 39.0156 43.8613C39.2199 43.8905 39.2199 43.8905 39.4515 43.8819C39.5365 43.8812 39.6215 43.8806 39.709 43.8799C39.7978 43.8781 39.8866 43.8763 39.978 43.8745C40.0676 43.8735 40.1572 43.8726 40.2495 43.8716C40.4711 43.8691 40.6926 43.8657 40.9141 43.8613C40.9605 43.7685 41.0069 43.6757 41.0547 43.5801C40.9292 43.4181 40.8682 43.3725 40.6618 43.3441C40.5906 43.3447 40.5194 43.3454 40.446 43.3461C40.3684 43.3464 40.2907 43.3468 40.2107 43.3472C40.1295 43.3486 40.0484 43.3501 39.9648 43.3516C39.8432 43.3521 39.8432 43.3521 39.719 43.3526C39.2901 43.3501 39.2901 43.3501 38.875 43.4394ZM43.9375 43.5098C43.9725 43.7036 43.9725 43.7036 44.0781 43.8613C44.2171 43.8683 44.3562 43.8705 44.4953 43.8707C44.6225 43.8708 44.6225 43.8708 44.7523 43.8709C44.8416 43.8707 44.9309 43.8704 45.0229 43.8701C45.1565 43.8705 45.1565 43.8705 45.2928 43.8709C45.3777 43.8708 45.4626 43.8707 45.55 43.8707C45.6284 43.8706 45.7067 43.8705 45.7874 43.8704C45.9745 43.8742 45.9745 43.8742 46.1172 43.791C46.093 43.6171 46.093 43.6171 46.0469 43.4394C45.7502 43.2911 45.3577 43.3561 45.0317 43.3559C44.9096 43.3547 44.9096 43.3547 44.785 43.3533C44.707 43.3532 44.629 43.3531 44.5486 43.3529C44.4412 43.3525 44.4412 43.3525 44.3315 43.352C44.1319 43.3561 44.1319 43.3561 43.9375 43.5098ZM49.0703 43.5098C49.1053 43.7036 49.1053 43.7036 49.2109 43.8613C49.5255 43.8792 49.8408 43.8743 50.1558 43.8745C50.2448 43.8754 50.3339 43.8762 50.4256 43.8771C50.5105 43.8772 50.5954 43.8774 50.6828 43.8775C50.7612 43.8778 50.8395 43.8781 50.9203 43.8784C51.12 43.8807 51.12 43.8807 51.25 43.7207C51.2383 43.5742 51.2383 43.5742 51.1797 43.4394C50.883 43.2911 50.4905 43.3561 50.1646 43.3559C50.0424 43.3547 50.0424 43.3547 49.9178 43.3533C49.8398 43.3532 49.7618 43.3531 49.6814 43.3529C49.574 43.3525 49.574 43.3525 49.4643 43.352C49.2647 43.3561 49.2647 43.3561 49.0703 43.5098ZM28.3281 45.9004C28.3398 46.0469 28.3398 46.0469 28.3984 46.1816C28.7032 46.334 29.114 46.2649 29.4487 46.2651C29.5335 46.266 29.6183 46.2668 29.7057 46.2677C29.8274 46.2679 29.8274 46.2679 29.9516 46.2681C30.0262 46.2684 30.1008 46.2687 30.1777 46.269C30.3829 46.2657 30.3829 46.2657 30.5781 46.1113C30.5431 45.9175 30.5431 45.9175 30.4375 45.7598C30.1112 45.7419 29.7842 45.7467 29.4575 45.7466C29.3189 45.7453 29.3189 45.7453 29.1775 45.744C29.0895 45.7438 29.0014 45.7437 28.9107 45.7435C28.8294 45.7433 28.7481 45.743 28.6643 45.7427C28.4589 45.7395 28.4589 45.7395 28.3281 45.9004ZM33.6801 45.8667C33.6542 45.901 33.6283 45.9353 33.6016 45.9707C33.6248 46.0403 33.648 46.1099 33.6719 46.1816C33.9853 46.3383 34.4131 46.2681 34.7573 46.2695C34.8895 46.2717 34.8895 46.2717 35.0244 46.2739C35.1088 46.2743 35.1931 46.2746 35.28 46.275C35.3575 46.2757 35.4351 46.2763 35.515 46.277C35.7135 46.269 35.7135 46.269 35.8433 46.145C35.8693 46.1107 35.8952 46.0764 35.9219 46.041C35.8871 45.9366 35.8871 45.9366 35.8516 45.8301C35.5381 45.6733 35.1103 45.7436 34.7661 45.7422C34.6339 45.74 34.6339 45.74 34.499 45.7378C34.4147 45.7374 34.3303 45.7371 34.2434 45.7367C34.1659 45.736 34.0884 45.7354 34.0085 45.7347C33.81 45.7427 33.81 45.7427 33.6801 45.8667ZM38.8047 45.9004C38.8164 46.0469 38.8164 46.0469 38.875 46.1816C39.1798 46.334 39.5905 46.2649 39.9253 46.2651C40.0101 46.266 40.0949 46.2668 40.1822 46.2677C40.304 46.2679 40.304 46.2679 40.4282 46.2681C40.5028 46.2684 40.5774 46.2687 40.6542 46.269C40.8594 46.2657 40.8594 46.2657 41.0547 46.1113C41.0197 45.9175 41.0197 45.9175 40.9141 45.7598C40.5878 45.7419 40.2608 45.7467 39.9341 45.7466C39.7955 45.7453 39.7955 45.7453 39.6541 45.744C39.566 45.7438 39.478 45.7437 39.3872 45.7435C39.3059 45.7433 39.2246 45.743 39.1409 45.7427C38.9354 45.7395 38.9354 45.7395 38.8047 45.9004ZM44.1567 45.8667C44.1307 45.901 44.1048 45.9353 44.0781 45.9707C44.1013 46.0403 44.1245 46.1099 44.1484 46.1816C44.4619 46.3383 44.8897 46.2681 45.2339 46.2695C45.3661 46.2717 45.3661 46.2717 45.501 46.2739C45.5853 46.2743 45.6697 46.2746 45.7566 46.275C45.8341 46.2757 45.9116 46.2763 45.9915 46.277C46.19 46.269 46.19 46.269 46.3199 46.145C46.3458 46.1107 46.3717 46.0764 46.3984 46.041C46.3636 45.9366 46.3636 45.9366 46.3281 45.8301C46.0147 45.6733 45.5869 45.7436 45.2427 45.7422C45.1105 45.74 45.1105 45.74 44.9756 45.7378C44.8912 45.7374 44.8069 45.7371 44.72 45.7367C44.6425 45.736 44.5649 45.7354 44.485 45.7347C44.2865 45.7427 44.2865 45.7427 44.1567 45.8667ZM49.4219 45.9004C49.4336 46.0469 49.4336 46.0469 49.4922 46.1816C49.7969 46.334 50.2077 46.2649 50.5425 46.2651C50.6273 46.266 50.7121 46.2668 50.7994 46.2677C50.9212 46.2679 50.9212 46.2679 51.0454 46.2681C51.12 46.2684 51.1946 46.2687 51.2714 46.269C51.4766 46.2657 51.4766 46.2657 51.6719 46.1113C51.6369 45.9175 51.6369 45.9175 51.5312 45.7598C51.205 45.7419 50.878 45.7467 50.5513 45.7466C50.4127 45.7453 50.4127 45.7453 50.2713 45.744C50.1832 45.7438 50.0951 45.7437 50.0044 45.7435C49.9231 45.7433 49.8418 45.743 49.7581 45.7427C49.5526 45.7395 49.5526 45.7395 49.4219 45.9004Z" fill="#6E0AB8" />
                                                    <path d="M31.2109 32.2598C31.2109 33.4199 31.2109 34.5801 31.2109 35.7754C30.8977 35.8102 30.8977 35.8102 30.5781 35.8457C30.5549 35.9385 30.5317 36.0313 30.5078 36.1269C30.671 36.2085 30.764 36.2059 30.9456 36.2057C31.0079 36.2058 31.0703 36.2059 31.1345 36.206C31.203 36.2057 31.2715 36.2055 31.3421 36.2052C31.4142 36.2052 31.4862 36.2053 31.5604 36.2053C31.7993 36.2052 32.0382 36.2047 32.2772 36.2041C32.4425 36.204 32.6078 36.2039 32.7731 36.2038C33.2089 36.2035 33.6447 36.2029 34.0805 36.2021C34.5249 36.2014 34.9693 36.201 35.4138 36.2007C36.2863 36.1999 37.1588 36.1987 38.0312 36.1973C38.0312 36.0812 38.0312 35.9652 38.0312 35.8457C37.7992 35.8225 37.5672 35.7993 37.3281 35.7754C37.3281 34.6152 37.3281 33.4551 37.3281 32.2598C38.9845 32.255 40.6408 32.2511 42.2972 32.2488C43.0663 32.2477 43.8354 32.2463 44.6045 32.2438C45.275 32.2417 45.9456 32.2404 46.6161 32.2399C46.971 32.2396 47.3258 32.239 47.6807 32.2375C48.0151 32.236 48.3495 32.2356 48.6839 32.2359C48.8062 32.2358 48.9286 32.2354 49.051 32.2346C50.105 32.228 50.9374 32.36 51.7474 33.0953C52.2561 33.6404 52.4876 34.2571 52.585 34.9858C52.596 35.0607 52.607 35.1355 52.6183 35.2126C52.6557 35.4703 52.6912 35.7283 52.7266 35.9863C52.7472 36.133 52.7679 36.2796 52.7887 36.4263C52.884 37.1008 52.976 37.7757 53.0674 38.4508C53.1013 38.7002 53.1352 38.9496 53.1692 39.199C53.2492 39.7868 53.329 40.3745 53.4087 40.9623C53.4907 41.5672 53.573 42.1721 53.6555 42.7769C53.7268 43.2993 53.7978 43.8218 53.8687 44.3443C53.9109 44.6551 53.9531 44.9658 53.9956 45.2766C54.0353 45.5675 54.0747 45.8584 54.114 46.1494C54.1284 46.2559 54.1429 46.3624 54.1575 46.469C54.1775 46.6145 54.1971 46.76 54.2166 46.9056C54.2332 47.0276 54.2332 47.0276 54.2501 47.152C54.2734 47.3769 54.2734 47.3769 54.2734 47.7988C44.853 47.7988 35.4325 47.7988 25.7266 47.7988C25.8057 46.7704 25.8057 46.7704 25.8653 46.3267C25.8718 46.2777 25.8783 46.2287 25.885 46.1782C25.9064 46.0178 25.9282 45.8575 25.95 45.6971C25.9656 45.5806 25.9812 45.4641 25.9968 45.3475C26.0388 45.0337 26.0812 44.7199 26.1236 44.4062C26.1592 44.1432 26.1946 43.8803 26.23 43.6173C26.3136 42.9966 26.3975 42.3759 26.4815 41.7552C26.568 41.1169 26.6539 40.4785 26.7395 39.8401C26.8133 39.2899 26.8875 38.7397 26.962 38.1896C27.0064 37.862 27.0506 37.5343 27.0944 37.2066C27.1357 36.8984 27.1774 36.5903 27.2194 36.2822C27.2347 36.1697 27.2498 36.0573 27.2647 35.9448C27.4202 34.7754 27.5701 33.7292 28.4688 32.8926C29.3567 32.2252 30.057 32.2598 31.2109 32.2598ZM42.1138 34.7075C42.0754 34.7529 42.0371 34.7983 41.9976 34.8451C41.7368 35.2576 41.7362 35.6653 41.7367 36.1374C41.7364 36.2057 41.7361 36.274 41.7358 36.3443C41.7353 36.4884 41.7353 36.6325 41.7356 36.7766C41.7358 36.9958 41.7342 37.2151 41.7324 37.4343C41.7322 37.5748 41.7322 37.7152 41.7323 37.8556C41.7316 37.9206 41.731 37.9856 41.7303 38.0526C41.7336 38.5212 41.7895 38.9351 42.1 39.308C42.1466 39.3459 42.1932 39.3838 42.2412 39.4228C42.2874 39.4618 42.3337 39.5008 42.3813 39.5409C42.7635 39.8 43.1052 39.8041 43.5528 39.8036C43.6534 39.8043 43.6534 39.8043 43.7559 39.805C43.9773 39.8064 44.1987 39.8067 44.4201 39.8068C44.5743 39.8073 44.7285 39.8077 44.8827 39.8082C45.206 39.8091 45.5292 39.8093 45.8525 39.8092C46.266 39.8092 46.6795 39.8112 47.093 39.8136C47.4115 39.8151 47.7301 39.8154 48.0486 39.8154C48.2011 39.8155 48.3535 39.8161 48.5059 39.8172C48.7194 39.8186 48.9329 39.8182 49.1465 39.8174C49.209 39.8181 49.2715 39.8189 49.3359 39.8197C49.8141 39.815 50.1833 39.6943 50.5485 39.3792C50.5956 39.3203 50.5956 39.3203 50.6436 39.2602C50.676 39.2212 50.7085 39.1821 50.7419 39.1419C50.9968 38.7513 50.9903 38.3888 50.9899 37.9361C50.9904 37.8312 50.9904 37.8312 50.9908 37.7241C50.9912 37.5763 50.9913 37.4285 50.9909 37.2807C50.9907 37.0557 50.9924 36.8308 50.9942 36.6058C50.9943 36.4618 50.9944 36.3179 50.9943 36.1739C50.9953 36.0738 50.9953 36.0738 50.9963 35.9717C50.993 35.4977 50.9379 35.086 50.6315 34.7037C50.5862 34.6658 50.5408 34.6279 50.4941 34.5889C50.4272 34.5304 50.4272 34.5304 50.359 34.4708C49.9462 34.2145 49.5155 34.2078 49.0441 34.2092C48.9478 34.2087 48.9478 34.2087 48.8496 34.2081C48.6384 34.2071 48.4273 34.2072 48.2161 34.2074C48.0686 34.2071 47.921 34.2068 47.7735 34.2064C47.4646 34.2059 47.1558 34.2059 46.8469 34.2063C46.4521 34.2067 46.0574 34.2055 45.6627 34.2039C45.3581 34.2029 45.0534 34.2028 44.7488 34.203C44.6033 34.203 44.4578 34.2026 44.3124 34.2019C44.1084 34.201 43.9046 34.2015 43.7006 34.2023C43.6412 34.2018 43.5818 34.2012 43.5206 34.2007C43.0033 34.2052 42.4555 34.2839 42.1138 34.7075ZM29.2422 41.1894C29.1958 41.2823 29.1494 41.3751 29.1016 41.4707C29.2324 41.6319 29.2324 41.6319 29.4389 41.6273C29.5206 41.6265 29.6024 41.6258 29.6866 41.625C29.775 41.6246 29.8633 41.6241 29.9544 41.6237C30.0471 41.6225 30.1398 41.6213 30.2354 41.6201C30.3296 41.6194 30.4238 41.6188 30.518 41.6182C30.749 41.6165 30.9799 41.6142 31.2109 41.6113C31.2589 41.4783 31.2589 41.4783 31.2812 41.3301C31.1512 41.1697 31.1512 41.1697 30.9504 41.1735C30.8716 41.1742 30.7928 41.1749 30.7116 41.1757C30.6264 41.1762 30.5412 41.1766 30.4534 41.1771C30.3641 41.1783 30.2747 41.1794 30.1826 41.1807C30.0927 41.1813 30.0028 41.1819 29.9102 41.1826C29.6875 41.1842 29.4648 41.1866 29.2422 41.1894ZM34.1641 41.1894C34.1372 41.3059 34.1139 41.4232 34.0938 41.541C34.1698 41.6329 34.1698 41.6329 34.3528 41.6193C34.4759 41.6187 34.4759 41.6187 34.6016 41.6182C34.7345 41.6178 34.7345 41.6178 34.8701 41.6175C34.9643 41.6169 35.0586 41.6163 35.1528 41.6157C35.2474 41.6154 35.3419 41.615 35.4364 41.6147C35.6686 41.6139 35.9007 41.6128 36.1328 41.6113C36.1807 41.4783 36.1807 41.4783 36.2031 41.3301C36.073 41.1697 36.073 41.1697 35.8723 41.1735C35.7935 41.1742 35.7147 41.1749 35.6335 41.1757C35.5483 41.1762 35.4631 41.1766 35.3753 41.1771C35.2859 41.1783 35.1966 41.1794 35.1045 41.1807C35.0146 41.1813 34.9247 41.1819 34.832 41.1826C34.6094 41.1842 34.3867 41.1866 34.1641 41.1894ZM38.875 41.3301C38.8982 41.4229 38.9214 41.5157 38.9453 41.6113C39.595 41.6113 40.2447 41.6113 40.9141 41.6113C40.9373 41.4953 40.9605 41.3793 40.9844 41.2598C40.6786 41.1069 40.2655 41.1764 39.9297 41.1763C39.8443 41.1754 39.7589 41.1745 39.671 41.1736C39.5896 41.1735 39.5082 41.1734 39.4243 41.1732C39.3119 41.1728 39.3119 41.1728 39.1972 41.1724C39.0041 41.1711 39.0041 41.1711 38.875 41.3301ZM43.9375 41.1894C43.8596 41.3218 43.8596 41.3218 43.7969 41.4707C43.8201 41.5171 43.8433 41.5635 43.8672 41.6113C44.5169 41.6113 45.1666 41.6113 45.8359 41.6113C45.8591 41.4953 45.8823 41.3793 45.9062 41.2598C45.831 41.1687 45.831 41.1687 45.6537 41.1815C45.5745 41.1818 45.4954 41.1822 45.4138 41.1826C45.2857 41.1829 45.2857 41.1829 45.1549 41.1833C45.065 41.1839 44.975 41.1844 44.8823 41.185C44.747 41.1855 44.747 41.1855 44.6089 41.186C44.3851 41.1868 44.1613 41.188 43.9375 41.1894ZM48.8594 41.1894C48.7814 41.3218 48.7814 41.3218 48.7188 41.4707C48.742 41.5171 48.7652 41.5635 48.7891 41.6113C49.4387 41.6113 50.0884 41.6113 50.7578 41.6113C50.781 41.4953 50.8042 41.3793 50.8281 41.2598C50.7529 41.1687 50.7529 41.1687 50.5756 41.1815C50.4964 41.1818 50.4172 41.1822 50.3357 41.1826C50.2075 41.1829 50.2075 41.1829 50.0768 41.1833C49.9868 41.1839 49.8969 41.1844 49.8042 41.185C49.6689 41.1855 49.6689 41.1855 49.5308 41.186C49.307 41.1868 49.0832 41.188 48.8594 41.1894ZM28.75 43.5098C28.785 43.7036 28.785 43.7036 28.8906 43.8613C29.2052 43.8792 29.5205 43.8743 29.8354 43.8745C29.9245 43.8754 30.0136 43.8762 30.1053 43.8771C30.1902 43.8772 30.2751 43.8774 30.3625 43.8775C30.4409 43.8778 30.5192 43.8781 30.5999 43.8784C30.7997 43.8807 30.7997 43.8807 30.9297 43.7207C30.918 43.5742 30.918 43.5742 30.8594 43.4394C30.5627 43.2911 30.1702 43.3561 29.8442 43.3559C29.7221 43.3547 29.7221 43.3547 29.5975 43.3533C29.5195 43.3532 29.4415 43.3531 29.3611 43.3529C29.2536 43.3525 29.2536 43.3525 29.144 43.352C28.9444 43.3561 28.9444 43.3561 28.75 43.5098ZM33.8828 43.5098C33.8828 43.6026 33.8828 43.6954 33.8828 43.791C34.1966 43.9479 34.6281 43.8743 34.9727 43.8745C35.1058 43.8758 35.1058 43.8758 35.2415 43.8771C35.3684 43.8773 35.3684 43.8773 35.4978 43.8775C35.5757 43.8778 35.6536 43.8781 35.7339 43.8784C35.9326 43.8806 35.9326 43.8806 36.0625 43.7207C36.0508 43.5742 36.0508 43.5742 35.9922 43.4394C35.6864 43.2866 35.2733 43.3561 34.9375 43.3559C34.8521 43.3551 34.7667 43.3542 34.6788 43.3533C34.5974 43.3532 34.516 43.3531 34.4321 43.3529C34.3197 43.3525 34.3197 43.3525 34.205 43.352C34.0119 43.3507 34.0119 43.3507 33.8828 43.5098ZM38.875 43.4394C38.8518 43.509 38.8286 43.5787 38.8047 43.6504C38.883 43.7636 38.883 43.7636 39.0156 43.8613C39.2199 43.8905 39.2199 43.8905 39.4515 43.8819C39.5365 43.8812 39.6215 43.8806 39.709 43.8799C39.7978 43.8781 39.8866 43.8763 39.978 43.8745C40.0676 43.8735 40.1572 43.8726 40.2495 43.8716C40.4711 43.8691 40.6926 43.8657 40.9141 43.8613C40.9605 43.7685 41.0069 43.6757 41.0547 43.5801C40.9292 43.4181 40.8682 43.3725 40.6618 43.3441C40.5906 43.3447 40.5194 43.3454 40.446 43.3461C40.3684 43.3464 40.2907 43.3468 40.2107 43.3472C40.1295 43.3486 40.0484 43.3501 39.9648 43.3516C39.8432 43.3521 39.8432 43.3521 39.719 43.3526C39.2901 43.3501 39.2901 43.3501 38.875 43.4394ZM43.9375 43.5098C43.9725 43.7036 43.9725 43.7036 44.0781 43.8613C44.2171 43.8683 44.3562 43.8705 44.4953 43.8707C44.6225 43.8708 44.6225 43.8708 44.7523 43.8709C44.8416 43.8707 44.9309 43.8704 45.0229 43.8701C45.1565 43.8705 45.1565 43.8705 45.2928 43.8709C45.3777 43.8708 45.4626 43.8707 45.55 43.8707C45.6284 43.8706 45.7067 43.8705 45.7874 43.8704C45.9745 43.8742 45.9745 43.8742 46.1172 43.791C46.093 43.6171 46.093 43.6171 46.0469 43.4394C45.7502 43.2911 45.3577 43.3561 45.0317 43.3559C44.9096 43.3547 44.9096 43.3547 44.785 43.3533C44.707 43.3532 44.629 43.3531 44.5486 43.3529C44.4412 43.3525 44.4412 43.3525 44.3315 43.352C44.1319 43.3561 44.1319 43.3561 43.9375 43.5098ZM49.0703 43.5098C49.1053 43.7036 49.1053 43.7036 49.2109 43.8613C49.5255 43.8792 49.8408 43.8743 50.1558 43.8745C50.2448 43.8754 50.3339 43.8762 50.4256 43.8771C50.5105 43.8772 50.5954 43.8774 50.6828 43.8775C50.7612 43.8778 50.8395 43.8781 50.9203 43.8784C51.12 43.8807 51.12 43.8807 51.25 43.7207C51.2383 43.5742 51.2383 43.5742 51.1797 43.4394C50.883 43.2911 50.4905 43.3561 50.1646 43.3559C50.0424 43.3547 50.0424 43.3547 49.9178 43.3533C49.8398 43.3532 49.7618 43.3531 49.6814 43.3529C49.574 43.3525 49.574 43.3525 49.4643 43.352C49.2647 43.3561 49.2647 43.3561 49.0703 43.5098ZM28.3281 45.9004C28.3398 46.0469 28.3398 46.0469 28.3984 46.1816C28.7032 46.334 29.114 46.2649 29.4487 46.2651C29.5335 46.266 29.6183 46.2668 29.7057 46.2677C29.8274 46.2679 29.8274 46.2679 29.9516 46.2681C30.0262 46.2684 30.1008 46.2687 30.1777 46.269C30.3829 46.2657 30.3829 46.2657 30.5781 46.1113C30.5431 45.9175 30.5431 45.9175 30.4375 45.7598C30.1112 45.7419 29.7842 45.7467 29.4575 45.7466C29.3189 45.7453 29.3189 45.7453 29.1775 45.744C29.0895 45.7438 29.0014 45.7437 28.9107 45.7435C28.8294 45.7433 28.7481 45.743 28.6643 45.7427C28.4589 45.7395 28.4589 45.7395 28.3281 45.9004ZM33.6801 45.8667C33.6542 45.901 33.6283 45.9353 33.6016 45.9707C33.6248 46.0403 33.648 46.1099 33.6719 46.1816C33.9853 46.3383 34.4131 46.2681 34.7573 46.2695C34.8895 46.2717 34.8895 46.2717 35.0244 46.2739C35.1088 46.2743 35.1931 46.2746 35.28 46.275C35.3575 46.2757 35.4351 46.2763 35.515 46.277C35.7135 46.269 35.7135 46.269 35.8433 46.145C35.8693 46.1107 35.8952 46.0764 35.9219 46.041C35.8871 45.9366 35.8871 45.9366 35.8516 45.8301C35.5381 45.6733 35.1103 45.7436 34.7661 45.7422C34.6339 45.74 34.6339 45.74 34.499 45.7378C34.4147 45.7374 34.3303 45.7371 34.2434 45.7367C34.1659 45.736 34.0884 45.7354 34.0085 45.7347C33.81 45.7427 33.81 45.7427 33.6801 45.8667ZM38.8047 45.9004C38.8164 46.0469 38.8164 46.0469 38.875 46.1816C39.1798 46.334 39.5905 46.2649 39.9253 46.2651C40.0101 46.266 40.0949 46.2668 40.1822 46.2677C40.304 46.2679 40.304 46.2679 40.4282 46.2681C40.5028 46.2684 40.5774 46.2687 40.6542 46.269C40.8594 46.2657 40.8594 46.2657 41.0547 46.1113C41.0197 45.9175 41.0197 45.9175 40.9141 45.7598C40.5878 45.7419 40.2608 45.7467 39.9341 45.7466C39.7955 45.7453 39.7955 45.7453 39.6541 45.744C39.566 45.7438 39.478 45.7437 39.3872 45.7435C39.3059 45.7433 39.2246 45.743 39.1409 45.7427C38.9354 45.7395 38.9354 45.7395 38.8047 45.9004ZM44.1567 45.8667C44.1307 45.901 44.1048 45.9353 44.0781 45.9707C44.1013 46.0403 44.1245 46.1099 44.1484 46.1816C44.4619 46.3383 44.8897 46.2681 45.2339 46.2695C45.3661 46.2717 45.3661 46.2717 45.501 46.2739C45.5853 46.2743 45.6697 46.2746 45.7566 46.275C45.8341 46.2757 45.9116 46.2763 45.9915 46.277C46.19 46.269 46.19 46.269 46.3199 46.145C46.3458 46.1107 46.3717 46.0764 46.3984 46.041C46.3636 45.9366 46.3636 45.9366 46.3281 45.8301C46.0147 45.6733 45.5869 45.7436 45.2427 45.7422C45.1105 45.74 45.1105 45.74 44.9756 45.7378C44.8912 45.7374 44.8069 45.7371 44.72 45.7367C44.6425 45.736 44.5649 45.7354 44.485 45.7347C44.2865 45.7427 44.2865 45.7427 44.1567 45.8667ZM49.4219 45.9004C49.4336 46.0469 49.4336 46.0469 49.4922 46.1816C49.7969 46.334 50.2077 46.2649 50.5425 46.2651C50.6273 46.266 50.7121 46.2668 50.7994 46.2677C50.9212 46.2679 50.9212 46.2679 51.0454 46.2681C51.12 46.2684 51.1946 46.2687 51.2714 46.269C51.4766 46.2657 51.4766 46.2657 51.6719 46.1113C51.6369 45.9175 51.6369 45.9175 51.5312 45.7598C51.205 45.7419 50.878 45.7467 50.5513 45.7466C50.4127 45.7453 50.4127 45.7453 50.2713 45.744C50.1832 45.7438 50.0951 45.7437 50.0044 45.7435C49.9231 45.7433 49.8418 45.743 49.7581 45.7427C49.5526 45.7395 49.5526 45.7395 49.4219 45.9004Z" stroke="white" stroke-width="2" mask="url(#path-2-outside-1_3090_32879)" />
                                                    <path d="M27.0205 48.1828C27.1372 48.1824 27.2539 48.182 27.3706 48.1814C27.69 48.1803 28.0093 48.1808 28.3286 48.1817C28.6735 48.1823 29.0184 48.1814 29.3633 48.1806C30.0385 48.1793 30.7136 48.1796 31.3887 48.1804C31.9375 48.1811 32.4863 48.1811 33.0351 48.1808C33.1132 48.1808 33.1914 48.1807 33.2719 48.1807C33.4306 48.1806 33.5894 48.1805 33.7482 48.1804C35.2364 48.1796 36.7246 48.1806 38.2128 48.1821C39.4894 48.1833 40.7659 48.1831 42.0425 48.1818C43.5254 48.1803 45.0084 48.1797 46.4913 48.1806C46.6495 48.1807 46.8077 48.1807 46.9659 48.1808C47.0437 48.1809 47.1215 48.1809 47.2017 48.181C47.7497 48.1812 48.2977 48.1808 48.8457 48.1801C49.5137 48.1793 50.1817 48.1796 50.8497 48.1811C51.1904 48.1818 51.5311 48.1821 51.8719 48.1812C52.184 48.1803 52.496 48.1808 52.8081 48.1823C52.9208 48.1826 53.0335 48.1824 53.1462 48.1817C54.0306 48.1768 54.7337 48.3037 55.3989 48.9216C55.9664 49.5193 56.1462 50.2384 56.1394 51.0442C56.1396 51.1161 56.1399 51.1881 56.1402 51.2623C56.1404 51.4133 56.1399 51.5643 56.1387 51.7153C56.1372 51.9445 56.1387 52.1735 56.1405 52.4026C56.1403 52.5504 56.1399 52.6981 56.1394 52.8459C56.1399 52.9133 56.1405 52.9807 56.1411 53.0502C56.1313 53.7707 55.9084 54.4408 55.4058 54.9682C54.7924 55.5557 54.1418 55.7503 53.3017 55.7511C53.2549 55.7513 53.2082 55.7514 53.16 55.7516C53.0034 55.752 52.8469 55.7519 52.6903 55.7518C52.5768 55.752 52.4634 55.7522 52.3499 55.7524C52.0383 55.753 51.7266 55.7531 51.4149 55.7532C51.0787 55.7533 50.7425 55.7538 50.4063 55.7543C49.6712 55.7552 48.9361 55.7557 48.2011 55.756C47.742 55.7562 47.2829 55.7565 46.8238 55.7568C45.5524 55.7576 44.281 55.7584 43.0097 55.7586C42.8876 55.7586 42.8876 55.7586 42.7631 55.7587C42.6816 55.7587 42.6 55.7587 42.516 55.7587C42.3508 55.7587 42.1855 55.7588 42.0203 55.7588C41.9383 55.7588 41.8563 55.7588 41.7719 55.7588C40.4439 55.7591 39.1159 55.7604 37.788 55.762C36.4242 55.7637 35.0604 55.7645 33.6967 55.7646C32.9311 55.7647 32.1656 55.7651 31.4 55.7664C30.7481 55.7674 30.0961 55.7678 29.4442 55.7672C29.1117 55.7669 28.7793 55.767 28.4468 55.768C28.142 55.7689 27.8373 55.7688 27.5326 55.768C27.4227 55.7678 27.3128 55.768 27.2029 55.7686C26.2078 55.7739 25.3536 55.6836 24.6042 54.9789C24.1642 54.5109 23.8943 53.9497 23.8865 53.3031C23.8856 53.238 23.8847 53.173 23.8837 53.1059C23.8832 53.036 23.8827 52.966 23.8821 52.894C23.8813 52.785 23.8813 52.785 23.8804 52.6737C23.8795 52.5198 23.8787 52.3658 23.8781 52.2118C23.8773 52.0554 23.8759 51.8989 23.8738 51.7424C23.8708 51.5154 23.8697 51.2885 23.869 51.0615C23.8677 50.9925 23.8665 50.9236 23.8652 50.8525C23.8675 50.1184 24.0918 49.459 24.602 48.9216C25.3177 48.2568 26.0806 48.1771 27.0205 48.1828ZM33.6372 50.9563C33.3584 51.3784 33.2433 51.7935 33.3208 52.2966C33.4822 52.7745 33.7338 53.1515 34.1645 53.4216C34.4422 53.5542 34.6644 53.5801 34.971 53.581C35.063 53.5816 35.1549 53.5822 35.2497 53.5828C35.3511 53.5828 35.4525 53.5827 35.554 53.5826C35.6612 53.5831 35.7684 53.5835 35.8756 53.5841C36.1664 53.5853 36.4573 53.5857 36.7481 53.5857C36.93 53.5858 37.1118 53.5861 37.2937 53.5865C37.9285 53.5878 38.5633 53.5884 39.1981 53.5883C39.7891 53.5882 40.3802 53.5897 40.9713 53.5919C41.4793 53.5937 41.9873 53.5945 42.4953 53.5944C42.7984 53.5944 43.1016 53.5948 43.4047 53.5963C43.69 53.5976 43.9753 53.5976 44.2606 53.5966C44.365 53.5965 44.4694 53.5968 44.5738 53.5976C45.2128 53.6025 45.6828 53.5882 46.1871 53.1631C46.5223 52.7489 46.7214 52.3659 46.7002 51.8231C46.6443 51.3786 46.4626 50.9743 46.1177 50.6794C45.5576 50.2916 45.0137 50.2773 44.3519 50.2824C44.2462 50.2819 44.1406 50.2813 44.0349 50.2805C43.7499 50.2789 43.4649 50.2795 43.1799 50.2806C42.8805 50.2815 42.5811 50.2807 42.2817 50.2801C41.7791 50.2795 41.2765 50.2803 40.7738 50.282C40.1941 50.2839 39.6145 50.2833 39.0348 50.2814C38.5355 50.2798 38.0363 50.2796 37.5371 50.2805C37.2396 50.281 36.9421 50.2811 36.6446 50.2799C36.3648 50.2789 36.085 50.2796 35.8052 50.2816C35.703 50.2821 35.6008 50.282 35.4986 50.2812C34.7529 50.276 34.1299 50.3502 33.6372 50.9563Z" fill="#6E0AB8" />
                                                    <path d="M41.4281 23.2476C41.5182 23.247 41.5182 23.247 41.61 23.2464C41.7079 23.2463 41.7079 23.2463 41.8078 23.2462C41.877 23.2458 41.9462 23.2455 42.0175 23.2451C42.2465 23.2441 42.4754 23.2436 42.7044 23.2432C42.8636 23.2428 43.0228 23.2424 43.182 23.242C43.5159 23.2413 43.8498 23.2408 44.1837 23.2406C44.6112 23.2402 45.0386 23.2385 45.4661 23.2365C45.795 23.2352 46.1239 23.2349 46.4529 23.2347C46.6104 23.2345 46.768 23.234 46.9256 23.233C47.1462 23.2318 47.3668 23.232 47.5875 23.2324C47.6847 23.2315 47.6847 23.2315 47.784 23.2305C48.2758 23.2336 48.6104 23.3128 48.9916 23.6442C49.2171 23.9095 49.2207 24.1114 49.2237 24.4484C49.2251 24.5772 49.2251 24.5772 49.2265 24.7087C49.227 24.8025 49.2276 24.8964 49.228 24.9903C49.2283 25.0377 49.2286 25.0851 49.2289 25.1339C49.2304 25.3846 49.2314 25.6354 49.232 25.8862C49.2328 26.1446 49.2352 26.403 49.238 26.6614C49.2399 26.8607 49.2405 27.0599 49.2407 27.2591C49.2412 27.4005 49.2431 27.5419 49.245 27.6833C49.243 28.496 49.243 28.496 48.93 28.8122C48.5533 29.1314 48.2488 29.1338 47.7775 29.1298C47.6685 29.1306 47.6685 29.1306 47.5573 29.1313C47.3177 29.1326 47.0781 29.1317 46.8385 29.1308C46.6716 29.131 46.5047 29.1312 46.3378 29.1316C45.9882 29.132 45.6386 29.1314 45.289 29.1301C44.8414 29.1285 44.3937 29.1294 43.9461 29.1311C43.6015 29.1321 43.2569 29.1318 42.9123 29.1311C42.7472 29.1309 42.5822 29.1311 42.4172 29.1318C42.1863 29.1325 41.9554 29.1314 41.7245 29.1298C41.6566 29.1304 41.5887 29.131 41.5187 29.1315C41.0934 29.1262 40.8389 29.0645 40.4925 28.8122C40.1163 28.4052 40.1717 27.819 40.1764 27.3021C40.1763 27.2118 40.1762 27.1215 40.1761 27.0285C40.176 26.8383 40.1769 26.6482 40.1785 26.458C40.1805 26.2151 40.1803 25.9723 40.1794 25.7294C40.1788 25.4963 40.1798 25.2632 40.1808 25.0301C40.1806 24.9433 40.1804 24.8565 40.1802 24.7671C40.1854 24.2945 40.1969 23.9323 40.5252 23.5637C40.8325 23.32 41.043 23.2492 41.4281 23.2476Z" fill="#6E0AB8" />
                                                    <path d="M43.1136 34.7013C43.1731 34.7007 43.2326 34.7001 43.2939 34.6995C43.391 34.6996 43.391 34.6996 43.4901 34.6997C43.5587 34.6992 43.6274 34.6988 43.6981 34.6983C43.9251 34.697 44.1521 34.6967 44.3791 34.6965C44.5369 34.6961 44.6947 34.6956 44.8525 34.6951C45.1834 34.6943 45.5142 34.694 45.8451 34.6941C46.269 34.6941 46.6928 34.6922 47.1167 34.6898C47.4426 34.6882 47.7686 34.6879 48.0946 34.688C48.2508 34.6878 48.4071 34.6872 48.5633 34.6861C48.782 34.6847 49.0006 34.6851 49.2192 34.686C49.3159 34.6848 49.3159 34.6848 49.4145 34.6836C49.8016 34.6874 50.0341 34.7354 50.3364 35.0014C50.5832 35.3638 50.5775 35.8117 50.5729 36.2346C50.5729 36.3279 50.5729 36.3279 50.573 36.4231C50.5728 36.5537 50.5721 36.6842 50.571 36.8148C50.5693 37.014 50.5695 37.2132 50.57 37.4123C50.5696 37.5398 50.5691 37.6672 50.5685 37.7947C50.5686 37.8538 50.5686 37.9129 50.5687 37.9738C50.5636 38.3956 50.5244 38.7248 50.2485 39.0619C49.862 39.3782 49.4689 39.3813 48.9918 39.379C48.8971 39.3793 48.8971 39.3793 48.8004 39.3797C48.5924 39.3803 48.3845 39.3799 48.1765 39.3795C48.0315 39.3795 47.8865 39.3797 47.7415 39.3799C47.4379 39.3801 47.1344 39.3798 46.8308 39.3791C46.4421 39.3783 46.0535 39.3788 45.6648 39.3796C45.3655 39.3801 45.0662 39.38 44.7668 39.3796C44.6235 39.3795 44.4802 39.3796 44.3369 39.3799C44.1365 39.3803 43.9361 39.3798 43.7357 39.379C43.6472 39.3794 43.6472 39.3794 43.557 39.3798C43.1298 39.3768 42.8056 39.3386 42.4746 39.0444C42.2707 38.8114 42.2415 38.7042 42.238 38.4024C42.2371 38.3348 42.2362 38.2672 42.2353 38.1976C42.2348 38.1242 42.2342 38.0509 42.2337 37.9754C42.2331 37.9001 42.2326 37.8249 42.232 37.7473C42.231 37.5877 42.2303 37.4281 42.2297 37.2685C42.2285 37.0248 42.2254 36.7812 42.2223 36.5376C42.2216 36.3826 42.221 36.2276 42.2205 36.0726C42.2193 35.9998 42.2181 35.9271 42.2168 35.8521C42.218 35.4414 42.241 35.1775 42.5317 34.8608C42.7319 34.7394 42.8807 34.7024 43.1136 34.7013Z" fill="#6E0AB8" />
                                                    <path d="M32.6511 28.5183C32.7283 28.5176 32.8055 28.5169 32.8851 28.5162C33.0098 28.5158 33.0098 28.5158 33.137 28.5153C33.2228 28.5149 33.3087 28.5145 33.3971 28.5141C33.5787 28.5134 33.7603 28.513 33.942 28.5127C34.2193 28.512 34.4965 28.5099 34.7738 28.5076C34.9504 28.5072 35.1269 28.5068 35.3035 28.5065C35.4276 28.5052 35.4276 28.5052 35.5541 28.5039C35.9869 28.5051 36.3182 28.5181 36.6952 28.7405C36.8382 28.9551 36.8533 28.9952 36.8527 29.2358C36.8529 29.2935 36.8531 29.3511 36.8533 29.4106C36.8526 29.5051 36.8526 29.5051 36.8518 29.6015C36.8518 29.6681 36.8518 29.7346 36.8518 29.8032C36.8517 30.0235 36.8506 30.2437 36.8495 30.464C36.8493 30.6166 36.8491 30.7692 36.8489 30.9219C36.8484 31.3238 36.847 31.7257 36.8455 32.1276C36.8438 32.6097 36.8431 33.0918 36.8423 33.5739C36.8409 34.3065 36.8383 35.0392 36.8358 35.7718C35.1188 35.7718 33.4018 35.7718 31.6327 35.7718C31.6242 34.1189 31.6242 34.1189 31.6224 33.4145C31.6211 32.9339 31.6196 32.4532 31.6168 31.9725C31.6145 31.585 31.6132 31.1975 31.6127 30.81C31.6123 30.6621 31.6115 30.5142 31.6104 30.3663C31.6089 30.1593 31.6086 29.9523 31.6087 29.7452C31.608 29.684 31.6072 29.6228 31.6064 29.5598C31.6086 29.1422 31.6814 28.9028 31.9843 28.5999C32.2062 28.5233 32.4176 28.5199 32.6511 28.5183ZM33.0389 30.0765C33.0157 30.1693 32.9925 30.2621 32.9686 30.3577C33.1032 30.5231 33.1032 30.5231 33.3382 30.5143C33.4357 30.5143 33.5331 30.5135 33.6306 30.5121C33.7075 30.5118 33.7075 30.5118 33.786 30.5115C33.9501 30.5107 34.1141 30.5089 34.2782 30.5071C34.3893 30.5064 34.5005 30.5058 34.6116 30.5052C34.8843 30.5037 35.1569 30.5012 35.4296 30.4984C35.5075 30.3659 35.5075 30.3659 35.5702 30.2171C35.5354 30.1475 35.5354 30.1475 35.4999 30.0765C34.6878 30.0765 33.8757 30.0765 33.0389 30.0765ZM33.0389 31.9749C32.991 32.1079 32.991 32.1079 32.9686 32.2562C33.1032 32.4215 33.1032 32.4215 33.3382 32.4128C33.4357 32.4127 33.5331 32.4119 33.6306 32.4105C33.7075 32.4102 33.7075 32.4102 33.786 32.4099C33.9501 32.4091 34.1141 32.4074 34.2782 32.4056C34.3893 32.4049 34.5005 32.4042 34.6116 32.4037C34.8843 32.4021 35.1569 32.3997 35.4296 32.3968C35.476 32.304 35.5224 32.2112 35.5702 32.1155C35.4348 31.9494 35.4348 31.9494 35.1941 31.959C35.0937 31.959 34.9933 31.9598 34.8929 31.9612C34.84 31.9614 34.7872 31.9616 34.7327 31.9618C34.5636 31.9626 34.3945 31.9643 34.2255 31.9661C34.1109 31.9668 33.9964 31.9675 33.8819 31.9681C33.6009 31.9696 33.3199 31.972 33.0389 31.9749ZM33.0389 33.8734C33.0121 33.9898 32.9887 34.1071 32.9686 34.2249C33.0492 34.3215 33.0492 34.3215 33.2664 34.3032C33.3672 34.3032 33.468 34.3028 33.5688 34.3021C33.6217 34.302 33.6747 34.3019 33.7292 34.3018C33.8991 34.3014 34.0688 34.3005 34.2386 34.2996C34.3535 34.2993 34.4684 34.299 34.5832 34.2987C34.8653 34.2979 35.1474 34.2967 35.4296 34.2952C35.476 34.2024 35.5224 34.1096 35.5702 34.014C35.4348 33.8478 35.4348 33.8478 35.1941 33.8574C35.0937 33.8574 34.9933 33.8582 34.8929 33.8596C34.84 33.8598 34.7872 33.86 34.7327 33.8602C34.5636 33.861 34.3945 33.8628 34.2255 33.8646C34.1109 33.8653 33.9964 33.8659 33.8819 33.8665C33.6009 33.868 33.3199 33.8705 33.0389 33.8734Z" fill="#6E0AB8" />
                                                    <path d="M35.1578 50.7405C35.2462 50.7401 35.3346 50.7397 35.4257 50.7393C35.5235 50.7392 35.6213 50.7391 35.7191 50.739C35.8223 50.7387 35.9255 50.7384 36.0286 50.738C36.3087 50.7371 36.5888 50.7366 36.8689 50.7363C37.044 50.7361 37.219 50.7358 37.3941 50.7355C37.9421 50.7345 38.4901 50.7339 39.0381 50.7336C39.6703 50.7333 40.3024 50.732 40.9346 50.73C41.4235 50.7285 41.9125 50.7278 42.4014 50.7277C42.6933 50.7276 42.9852 50.7272 43.2771 50.7259C43.5517 50.7248 43.8264 50.7246 44.101 50.7252C44.2016 50.7253 44.3022 50.725 44.4028 50.7243C45.4746 50.7173 45.4746 50.7173 45.886 51.0618C46.2062 51.4806 46.2936 51.7467 46.2249 52.2668C46.1457 52.632 45.9865 52.807 45.6797 53.0096C45.2438 53.2177 44.7744 53.1809 44.3016 53.1785C44.1964 53.179 44.0913 53.1796 43.9861 53.1803C43.7018 53.1819 43.4175 53.1817 43.1332 53.1811C42.8954 53.1807 42.6576 53.1813 42.4198 53.1818C41.8586 53.183 41.2975 53.1827 40.7363 53.1815C40.1583 53.1803 39.5803 53.1815 39.0022 53.1837C38.505 53.1856 38.0077 53.1861 37.5105 53.1855C37.2139 53.1852 36.9174 53.1853 36.6208 53.1868C36.3419 53.1881 36.0631 53.1876 35.7842 53.1859C35.6822 53.1856 35.5801 53.1858 35.4781 53.1867C34.9096 53.1913 34.4601 53.1849 34.0237 52.7894C33.761 52.4928 33.734 52.1193 33.7425 51.7348C33.8545 51.3146 34.0846 51.0521 34.4456 50.8207C34.684 50.743 34.9081 50.7412 35.1578 50.7405Z" fill="#6E0AB8" />
                                                    <path d="M42.9531 29.5156C44.1133 29.5156 45.2734 29.5156 46.4688 29.5156C46.4688 30.2813 46.4688 31.047 46.4688 31.8359C45.3086 31.8359 44.1484 31.8359 42.9531 31.8359C42.9531 31.0702 42.9531 30.3045 42.9531 29.5156Z" fill="#6E0AB8" />
                                                </svg>

                                            </div>

                                            {/* Primary Message */}
                                            <h3 className="text-lg font-bold text-[#24282E] mb-2">No POS Integrated Yet</h3>

                                            {/* Secondary Message */}
                                            <p className="text-[#727A90] text-sm mb-6">Click Add Count to add here</p>

                                            {/* Action Button */}
                                            <button
                                                onClick={() => setIsPOSModalOpen(true)}
                                                className="bg-primary text-white px-6 text-xs py-3 cursor-pointer rounded-xl font-medium transition-colors"
                                            >
                                                Start Integration
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* Add another integration CTA */}


                                            {/* List of integrations */}
                                            <div className="grid grid-cols-1 gap-4">
                                                {posIntegrations.map(item => {
                                                    return (
                                                        <div
                                                        key={item.id}
                                                        className="rounded-2xl border border-[#EEF0F4] bg-[#F8F8FC] p-4 sm:p-5"
                                                      >
                                                        <div className="flex items-center justify-between gap-3">
                                                          {/* Left: vendor badge + title + subtitle */}
                                                          <div className="flex items-center gap-3">
                                                            <VendorBadge vendor={item.vendor} />
                                                      
                                                            <div>
                                                              <div className="text-sm font-semibold text-gray-900">
                                                                {item.name}
                                                              </div>
                                                              <div className="text-xs text-[#727A90]">
                                                                {item.description || 'Receive notifications via email'}
                                                              </div>
                                                            </div>
                                                          </div>
                                                      
                                                          {/* Right: Disconnect (pale purple pill) */}
                                                          <button
                                                            onClick={() => handleDisconnectIntegration(item.id)}
                                                            className="text-xs font-medium text-primary bg-[#F1E7F8]  transition-colors px-3 py-2 rounded-lg"
                                                          >
                                                            Disconnect
                                                          </button>
                                                        </div>
                                                      </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}


                            {activeIntegrationTab === 'Vendor Integrations' && (
                                <div>Vendor Integrations</div>
                            )}

                            {activeIntegrationTab === 'Payroll Integration' && (
                                <div>Payroll Integration</div>
                            )}

                            {activeIntegrationTab === 'Labor Schedule Software' && (
                                <div>Labor Schedule Software</div>
                            )}
                        </div>
                    )}
                </main>
        

            {/* POS Integration Modal */}
            <POSIntegrationModal
                isOpen={isPOSModalOpen}
                onClose={() => setIsPOSModalOpen(false)}
                onStartIntegration={handleStartIntegration}
            />


            <ProcessingModal
                isOpen={isProcessingModalOpen}
            />

            </>

    )
}

export default Page;