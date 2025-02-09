import React from 'react'

const Navbar = () => {
    return (

        <nav className=" bg-blue-600 p-4 sticky top-0 ">
            <div className="container mx-auto    flex items-center justify-between">
                <lord-icon
                    src="https://cdn.lordicon.com/ciawvzjk.json"
                    trigger="hover"
                    style={{ "width": "50px", "height": "50px" }}>
                </lord-icon>
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h18M3 6h18M3 14h18m-7 4h7"
                        />
                    </svg>
                    {/* Text for the logo */}
                    <span className="text-white text-xl font-bold">Expense Tracker</span>
                </div>

                {/* Other Navbar items */}
                <div>
                    <button className="text-white px-4 py-2 border border-white rounded hover:bg-blue-700">
                        <a href="https://github.com/vishaltewari/Expense-Tracker" target='_blank'>Github</a>
                        
                    </button>
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar

