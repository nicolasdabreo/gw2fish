import React from 'react';

export default function Spinner() {
    return (
        <div class="flex justify-center items-center space-x-2">
            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}
