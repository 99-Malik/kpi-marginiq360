import React from 'react'
export default function Terms() {

    return (
        <div>
         <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            By tapping with Google, Facebook or Apple you agree to{' '}
                            <a href="#" className="text-primary hover:text-primary-hover font-medium underline">
                                Terms and Conditions
                            </a>{' '}
                            &{' '}
                            <a href="#" className="text-primary hover:text-primary-hover font-medium underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
        </div>
    )
}