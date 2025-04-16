"use client"
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Link from 'next/link';

const TransaksiPage = () => {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [{
                            label: 'Monthly Sales',
                            data: [1, 2, 3, 4, 5, 6, 7],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutBounce'
                        }
                    }
                });
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
            <main className="flex-1 p-4">
                <div className="my-4 justify-center space-x-4">
                    <h2 className="pb-2"><b>MONTHLY SALES</b></h2>
                    <p className="pb-2">Here is the monthly sales data.</p>
                    <p className="pb-2">Total sales: $0</p>
                    <p className="pb-2">Average sales per month: $0</p>
                    <p className="pb-2">Sales trend: Growth</p>
                    <Link 
                    href="/manager/user" 
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                >
                    Click here to see user
                </Link>
                </div>
                <div className="my-4">
                    <canvas id="myChart"></canvas>
                </div>
                <div className="my-4 center">
                    <h2 className="pb-2"><b>Shop</b></h2>
                    <p className="pb-2">Go to our store to buy our stock.</p>
                    <Link 
                    href="/admin/product" 
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                >
                    Click here to go Product
                </Link>
                </div>
            </main>
        </div>
    )
}
export default TransaksiPage