import React, { useState } from 'react';

export default function Modal({ open, onClose, children }) {
    return (
        // backdrop
        <div
            onClick={onClose}
            className={`fixed inset-0 flex px-20 justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
        >
            <div
                onClick={e => e.stopPropagation()}
                className={`relative bg-white rounded-xl shadow p-6 transition-all duration-300 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
}
