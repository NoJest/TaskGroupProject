import React from 'react';

// Alert component
function Alert({ type, message }) {
    const alertStyles = {
        success: 'bg-green-100 text-green-800 border-green-500',
        error: 'bg-red-100 text-red-800 border-red-500',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
        info: 'bg-blue-100 text-blue-800 border-blue-500',
    };

    return (
        <div
            className={`border-l-4 p-4 rounded mb-4 shadow-md ${alertStyles[type]}`}
        >
            <p className="font-medium">{message}</p>
        </div>
    );
}

// Main alerts container
function AlertsPage() {
    // Example alerts data
    const alerts = [
        { id: 1, type: 'success', message: 'Operation completed successfully!' },
        { id: 2, type: 'error', message: 'There was an error processing your request.' },
        { id: 3, type: 'warning', message: 'Warning! Check your input values.' },
        { id: 4, type: 'info', message: 'New updates are available for your system.' },
    ];

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Alerts
            </h1>
            <div>
                {alerts.map((alert) => (
                    <Alert key={alert.id} type={alert.type} message={alert.message} />
                ))}
            </div>
        </div>
    );
}

export default AlertsPage;
