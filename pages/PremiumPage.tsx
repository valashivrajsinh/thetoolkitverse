
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon, CrownIcon, CheckCircleIcon, XCircleIcon, ChevronDownIcon } from '../components/icons';
import { updateSeoTags } from '../constants';

// To inform TypeScript about the Razorpay object on the window
declare global {
  interface Window {
    Razorpay: any;
  }
}

const FeatureListItem = ({ children, included }: { children: React.ReactNode, included: boolean }) => (
    <li className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
            {included ? (
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
            ) : (
                <XCircleIcon className="w-5 h-5 text-slate-500" />
            )}
        </div>
        <span className={included ? "text-slate-300" : "text-slate-500 line-through"}>{children}</span>
    </li>
);

const PremiumPage = () => {
    // Simple state for plan, no context needed for this version
    const [plan, setPlanState] = useState<'free' | 'premium'>(() => {
        try {
            return window.localStorage.getItem('userPlan') === 'premium' ? 'premium' : 'free';
        } catch {
            return 'free';
        }
    });

    const setPlan = (newPlan: 'free' | 'premium') => {
        try {
            window.localStorage.setItem('userPlan', newPlan);
            setPlanState(newPlan);
        } catch (e) {
            console.error("Could not set plan in localStorage", e);
        }
    };
    
    const navigate = useNavigate();
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
    const [isCurrencyMenuOpen, setCurrencyMenuOpen] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    
    const prices = {
        USD: { amount: 9, symbol: '$' },
        INR: { amount: 749, symbol: '₹' },
    };
    
    useEffect(() => {
        const title = 'Go Premium | Toolkitverse';
        const description = 'Upgrade to Toolkitverse Premium to unlock powerful features like unlimited tool comparisons, advanced AI analysis, and priority support.';
        updateSeoTags(title, description);
    }, []);

    const handleUpgrade = async () => {
        if (typeof window.Razorpay === 'undefined') {
            setPaymentError('Payment gateway is not available. Please refresh and try again.');
            return;
        }

        setIsUpgrading(true);
        setPaymentError(null);

        const razorpayKey = typeof process !== 'undefined' ? process.env.RAZORPAY_KEY_ID : undefined;

        if (!razorpayKey) {
            console.error("Razorpay Key ID is not configured in environment variables.");
            setPaymentError("Payment system is not configured. Please contact support.");
            setIsUpgrading(false);
            return;
        }
        
        const selectedPrice = prices[currency].amount;

        const options = {
            key: razorpayKey,
            amount: selectedPrice * 100, // Amount is in currency subunits.
            currency: currency,
            name: "Toolkitverse Premium",
            description: "Lifetime access to all premium features",
            handler: function (response: any) {
                console.log('Payment successful:', response);
                setPlan('premium');
                setIsUpgrading(false);
                navigate('/');
            },
            prefill: {
                name: "Valued User",
                email: "user@toolkitverse.com",
            },
            notes: {
                plan: "Premium Lifetime"
            },
            theme: {
                color: "#6366f1"
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment modal dismissed');
                    setIsUpgrading(false);
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                 <div className="inline-block bg-yellow-500/10 p-4 rounded-full mb-4 border border-yellow-500/20">
                     <CrownIcon className="w-8 h-8 text-yellow-400"/>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl tracking-tight">
                    Upgrade Your Toolkit
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                    Choose the plan that fits your needs and unlock the full power of Toolkitverse.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Free Plan */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm h-full flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-100">Free</h3>
                    <p className="text-slate-400 mt-1 mb-6">For casual explorers</p>
                    <div className="text-4xl font-extrabold text-slate-100 mb-6">
                        $0 <span className="text-lg font-medium text-slate-400">/ month</span>
                    </div>
                    <ul className="space-y-4 flex-grow">
                        <FeatureListItem included={true}>AI-Powered Tool Discovery</FeatureListItem>
                        <FeatureListItem included={true}>Basic Tool Analysis</FeatureListItem>
                        <FeatureListItem included={true}>Latest Tech News</FeatureListItem>
                        <FeatureListItem included={false}>Advanced Tool vs. Tool Comparison</FeatureListItem>
                        <FeatureListItem included={false}>Unlimited AI Analysis of Any Tool</FeatureListItem>
                        <FeatureListItem included={false}>Priority Access & Support</FeatureListItem>
                    </ul>
                     <div className="mt-8 text-center font-semibold text-slate-300 border-2 border-slate-700 bg-slate-800/50 rounded-lg py-3">
                        Your Current Plan
                    </div>
                </div>

                {/* Premium Plan */}
                <div className="relative bg-slate-900/60 border-2 border-indigo-500 rounded-2xl p-8 shadow-2xl shadow-indigo-600/10 backdrop-blur-sm h-full flex flex-col">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">Premium</h3>
                    <p className="text-indigo-300 mt-1 mb-6">For power users & professionals</p>
                    
                    <div className="flex items-end justify-between mb-6">
                        <div className="text-4xl font-extrabold text-slate-100">
                            {prices[currency].symbol}{prices[currency].amount}
                            <span className="text-lg font-medium text-slate-400"> / month</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setCurrencyMenuOpen(!isCurrencyMenuOpen)}
                                onBlur={() => setTimeout(() => setCurrencyMenuOpen(false), 200)}
                                className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-md text-sm text-slate-300 hover:bg-slate-700/70 transition-colors"
                                aria-haspopup="true"
                                aria-expanded={isCurrencyMenuOpen}
                            >
                                {currency}
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isCurrencyMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCurrencyMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-28 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 animate-fade-in-fast">
                                    <button
                                        onClick={() => { setCurrency('USD'); setCurrencyMenuOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-t-lg"
                                    >
                                        USD ($)
                                    </button>
                                    <button
                                        onClick={() => { setCurrency('INR'); setCurrencyMenuOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-b-lg"
                                    >
                                        INR (₹)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <ul className="space-y-4 flex-grow">
                        <FeatureListItem included={true}>AI-Powered Tool Discovery</FeatureListItem>
                        <FeatureListItem included={true}>Basic Tool Analysis</FeatureListItem>
                        <FeatureListItem included={true}>Latest Tech News</FeatureListItem>
                        <FeatureListItem included={true}>Advanced Tool vs. Tool Comparison</FeatureListItem>
                        <FeatureListItem included={true}>Unlimited AI Analysis of Any Tool</FeatureListItem>
                        <FeatureListItem included={true}>Priority Access & Support</FeatureListItem>
                    </ul>
                    <div className="mt-8">
                     {plan === 'premium' ? (
                         <div className="text-center font-semibold text-green-400 border-2 border-green-500/20 bg-green-900/30 rounded-lg py-3">
                            You are a Premium member!
                         </div>
                    ) : (
                        <>
                        <button 
                            onClick={handleUpgrade}
                            disabled={isUpgrading}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 disabled:bg-slate-600 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-wait flex items-center justify-center gap-2"
                        >
                            {isUpgrading ? (
                               <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Processing...
                               </>
                            ) : (
                               <>
                                <SparklesIcon className="text-yellow-300"/>
                                Upgrade Now
                               </>
                            )}
                        </button>
                        {paymentError && <div className="text-center mt-3 text-sm text-red-400">{paymentError}</div>}
                        </>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumPage;