import React from 'react';

// Utility function to determine the background color based on progress
function getBackgroundColor(progress) {
    if (progress < 30) return 'bg-red-500';
    if (progress < 50) return 'bg-orange-400';
    if (progress < 70) return 'bg-blue-400';
    return 'bg-green-500';
}

function ProgressUpdate() {
    // Sample data from the API
    const goals = [
        { id: 1, progress: 10 },
        { id: 2, progress: 40 },
        { id: 3, progress: 60 },
        { id: 4, progress: 80 },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Progress</h1>
            {goals.map((goal) => (
                <div key={goal.id} className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">Goal {goal.id}</span>
                        <span className="text-gray-500">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className={`h-4 rounded-full ${getBackgroundColor(goal.progress)}`}
                            style={{ width: `${goal.progress}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProgressUpdate;
