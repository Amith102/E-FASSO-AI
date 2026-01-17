"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ShoppingBag } from 'lucide-react';

const MOCK_HISTORY = [
    {
        id: 1,
        date: '2023-10-24',
        itemName: 'Classic Navy Suit',
        originalImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
        resultImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop', // Just a placeholder
    },
    {
        id: 2,
        date: '2023-10-20',
        itemName: 'Summer Floral Dress',
        originalImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
        resultImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', // Placeholder
    },
];

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100 dark:border-blue-900">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-4xl">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>

                                <div className="w-full space-y-3">
                                    <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                                        Edit Profile
                                    </button>
                                    <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity / History */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Total Orders</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                            </div>
                            <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Try-On Sessions</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">28</p>
                            </div>
                        </div>

                        {/* Recent Try-Ons */}
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Try-On History</h3>
                                <Link href="/upload" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    New Try-on
                                </Link>
                            </div>

                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {MOCK_HISTORY.map((item) => (
                                    <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="flex gap-4">
                                                <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={item.originalImage}
                                                        alt="Product"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-br">Original</div>
                                                </div>
                                                <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={item.resultImage}
                                                        alt="Result"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute top-0 left-0 bg-blue-600/80 text-white text-[10px] px-2 py-0.5 rounded-br">Result</div>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.itemName}</h4>
                                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {item.date}
                                                </div>
                                                <div className="flex gap-3 mt-auto">
                                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                                        View Details
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
