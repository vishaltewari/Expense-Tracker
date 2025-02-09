import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './Main.css'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
const Main = () => {
  var currentMonth = (new Date().getMonth()) + 1;
  const [duration, setduration] = useState("thismonth")
  const [form, setform] = useState({ "ename": "", "category": "", "date": "", amount: 0 })
  const [details, setdetails] = useState([])
  const [amount, setamount] = useState(0)
  const [bgcolor, setbgcolor] = useState("#60a5fa")
  const [bgcolor1, setbgcolor1] = useState("#2563eb")
  // const [cate, setcate] = useState(['Food'])
  const getdetails=async() => {
      
    let req=await fetch("http://localhost:3000/")
    let detail = await req.json()
    console.log(detail)
    setdetails(detail)
    // if (detail) {
    //     setpasswordArray(JSON.parse(detail))
    // }
    // else {
    //     detail = []
    // }   
}
useEffect(() => {
  getdetails()
}, [])
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] })
  }
  const handleclick = async() => {
    if (form.amount.length > 0 && form.ename.length > 0 && form.date != null && form.category !== "") {
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
      const id = uuidv4();

      // Update the details state first
      const newExpense = { ...form, id }; // Use the generated id
      setdetails([...details, newExpense]);
  
      // Make the POST request with the same id
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      const month = new Date(form.date).getMonth() + 1
      if (month === currentMonth) {
        let a = Number(form.amount)
        setamount(amount + a)
        console.log(amount)
      }
      // console.log([...details])
    }
    else {
      toast('Please fill all the fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }
  }
  const handleselectchange = (e) => {
    const value = e.target.value
    setduration(value)
  }
  const handleedit = (id) => {
    setform(details.filter(item => item.id === id)[0])
    setdetails(details.filter(item => item.id !== id))
  }
  const handledelete = async(id) => {
    const st = confirm("Are you sure you want to delete?")
    if (st) {
      setdetails(details.filter(item => item.id !== id))
      let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
      setform({ "ename": "", "category": "", "date": "", amount: 0 })
    }
  }
  const totalAmount = details.filter(item => {
    const month = new Date(item.date).getMonth() + 1
    return month === currentMonth
  }).reduce((total, item) => total + Number(item.amount), 0);
  const totalAmountw=totalAmount/3
  const totalAmount1 = details.filter(item => {
    const month = new Date(item.date).getMonth() + 1
    return month === currentMonth - 1
  }).reduce((total, item) => total + Number(item.amount), 0);
  const totalAmount1w=totalAmount1/3
  const totalAmount2 = details.filter(item => {
    const month = new Date(item.date).getMonth() + 1
    return month === currentMonth - 2
  }).reduce((total, item) => total + Number(item.amount), 0);
  const totalAmount2w=totalAmount2/3
  const totalAmount6 = details.filter(item => {
    const month = new Date(item.date).getMonth() + 1
    return currentMonth - 6 < month <= currentMonth
  }).reduce((total, item) => total + Number(item.amount), 0);
  const categoryTotals = details.reduce((totals, item) => {
    const category = item.category;
    const amount = Number(item.amount);
    if (totals[category]) {
      totals[category] += amount;
    } else {
      totals[category] = amount;
    }
    return totals;
  }, {});
  const totalsf = categoryTotals['Food']
  const totalsfw = (totalsf / 3)
  const totalse = categoryTotals['Entertainment']
  const totalsew = (totalse / 3)
  const totalsu = categoryTotals['Utilities']
  const totalsuw = (totalsu / 3)
  const totalst = categoryTotals['Travel']
  const totalstw = (totalst / 3)
  const totalso = categoryTotals['Others']
  const totalsow = (totalso / 3)
  const handleclicknav = (e) => {
    setbgcolor(bgcolor === "#2563eb" ? "#60a5fa" : "#2563eb")
    setbgcolor1(bgcolor1 === "#60a5fa" ? "#2563eb" : "#60a5fa")
  }
  // const handleclicknav1=(e) => {
  //   // setbgcolor(bgcolor==="#2563eb"?"#3b82f6":"#2563eb")
  //   setbgcolor1(bgcolor==="red"?"#2563eb":"red")
  // }
  return (
    <div className='md:flex md:justify-between md:gap-3 bg-blue-200 min-h-[100vh] max-w-[100vw] container '>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className='first flex flex-col justify-start md:fixed   w-full md:w-[50vw]  md:mt-8 md:ml-8'>
        <div className='m-5'>
          <p className='font-bold text-lg'>Expense</p>
          <input onChange={handlechange} name="ename" value={form.ename} className='rounded-full border  w-3/4 p-4 py-1' placeholder='Give expense name' />
        </div>
        <div className='m-5'>
          <p className='font-bold text-lg'>Category</p>
          <select onChange={handlechange} className='bg-blue-600 text-white font-bold rounded-sm' name="category" value={form.category} id="duration">
            <option value="default">Select</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Travel">Travel</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className='m-5'>
          <p className='font-bold text-lg'>Date</p>
          <input onChange={handlechange} name="date" value={form.date} type='date' className='rounded-full border w-1/2 p-4 py-1' placeholder='Enter date' />
        </div>
        <div className='m-5'>
          <p className='font-bold text-lg'>Amount</p>
          <input onChange={handlechange} name="amount" value={form.amount} type="text" className='rounded-full border  w-1/2 p-4 py-1' placeholder='Enter Amount(in Rs)' />
        </div>
        <div>
          <button onClick={() => { handleclick() }} type="submit" className=" bg-blue-600 rounded-lg w-1/6 p-2 cursor-pointer hover:bg-blue-500 ml-7 md:m-4">Add</button>
        </div>
      </div>
      <div className="second md:w-[50vw]">
        <div className="buttons mt-3 md:ml-0 ml-5 ">
          <button onClick={handleclicknav} style={{ backgroundColor: bgcolor }} className=' rounded-lg md:w-1/4 w-1/4 p-2 cursor-pointer hover:bg-blue-500 md:m-4'>Log</button>
          <button onClick={handleclicknav} style={{ backgroundColor: bgcolor1 }} className='rounded-lg md:w-1/4 w-1/4 p-2 cursor-pointer hover:bg-blue-500  m-4'>Statistics</button>
        </div>
        {bgcolor === "#60a5fa" &&
          <div className="history md:ml-0  md:mt-10">
            <h1 className='font-bold text-2xl md:ml-0 ml-5  '>Transaction History</h1>
            <div className=' mt-5 md:ml-0 ml-5 md:mt-5 md:mb-5'>
              <select onChange={handleselectchange} className=' bg-blue-600 text-white font-bold rounded-sm' value={duration} name="duration" id="duration">
                <option value="all">All</option>
                <option value="thismonth">This Month</option>
                <option value="lastthreemonth">Last 3 Month</option>
                <option value="lastsixmonth">Last 6 Month</option>
              </select>
            </div>
            {details.length === 0 && <div className='text-xl'>No transaction History</div>}
            {details.length != 0 && duration === "all" &&
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className='bg-blue-600 text-white'>
                  <tr>
                    <th>Expense</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody className='bg-blue-100'>
                  {details.map((item, index) => {
                    return <tr key={index}>
                      <td className='text-center py-2 border border-white'>{item.ename}</td>
                      <td className='text-center py-2 border border-white'>{item.category}</td>
                      <td className='text-center py-2 border border-white'>{item.date}</td>
                      <td className='text-center py-2 border border-white'>{item.amount}</td>
                      <td className='text-center py-2 border border-white'>
                        <div className='flex flex-row gap-2 items-center justify-center'>
                          <lord-icon
                            onClick={() => { handleedit(item.id) }}
                            src="https://cdn.lordicon.com/ylvuooxd.json"
                            trigger="hover"
                            style={{ "width": "30px", "height": "30px" }}>
                          </lord-icon>
                          <lord-icon
                            onClick={() => { handledelete(item.id) }}
                            src="https://cdn.lordicon.com/hjbrplwk.json"
                            trigger="hover"
                            colors="primary:#646e78,secondary:#4bb3fd,tertiary:#ffffff,quaternary:#3a3347"
                            style={{ "width": "30px", "height": "30px" }}>
                          </lord-icon>
                        </div></td>
                    </tr>
                  })}
                </tbody>
              </table>
            }
            {details.length != 0 && duration === "thismonth" &&
              <div>
                <h2 className='text-xl font-bold ml-5 mt-5 md:ml-0'>Total Expense:{totalAmount}</h2>
                <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                  <thead className='bg-blue-600 text-white'>
                    <tr>
                      <th>Expense</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody className='bg-blue-100'>
                    {details.filter(item => {
                      const month = new Date(item.date).getMonth() + 1
                      return month === currentMonth
                    }).map((item, index) => {
                      return <tr key={index}>
                        <td className='text-center py-2 border border-white'>{item.ename}</td>
                        <td className='text-center py-2 border border-white'>{item.category}</td>
                        <td className='text-center py-2 border border-white'>{item.date}</td>
                        <td className='text-center py-2 border border-white'>{item.amount}</td>
                        <td className='text-center py-2 border border-white'>
                          <div className='flex flex-row gap-2 items-center justify-center'>
                            <lord-icon
                              onClick={() => { handleedit(item.id) }}
                              src="https://cdn.lordicon.com/ylvuooxd.json"
                              trigger="hover"
                              style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                            <lord-icon
                              onClick={() => { handledelete(item.id) }}
                              src="https://cdn.lordicon.com/hjbrplwk.json"
                              trigger="hover"
                              colors="primary:#646e78,secondary:#4bb3fd,tertiary:#ffffff,quaternary:#3a3347"
                              style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                          </div></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            }
            {details.length != 0 && duration === "lastthreemonth" &&
              <div>
                <h2 className='text-xl font-bold mt-5'>Total Expense:{totalAmount + totalAmount1 + totalAmount2}</h2>
                <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                  <thead className='bg-blue-600 text-white'>
                    <tr>
                      <th>Expense</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody className='bg-blue-100'>
                    {details.filter(item => {
                      const month = new Date(item.date).getMonth() + 1
                      return month >= currentMonth - 3 && month <= currentMonth
                    }).map((item, index) => {
                      return <tr key={index}>
                        <td className='text-center py-2 border border-white'>{item.ename}</td>
                        <td className='text-center py-2 border border-white'>{item.category}</td>
                        <td className='text-center py-2 border border-white'>{item.date}</td>
                        <td className='text-center py-2 border border-white'>{item.amount}</td>
                        <td className='text-center py-2 border border-white'>
                          <div className='flex flex-row gap-2 items-center justify-center'>
                            <lord-icon
                              onClick={() => { handleedit(item.id) }}
                              src="https://cdn.lordicon.com/ylvuooxd.json"
                              trigger="hover"
                              style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                            <lord-icon
                              onClick={() => { handledelete(item.id) }}
                              src="https://cdn.lordicon.com/hjbrplwk.json"
                              trigger="hover"
                              colors="primary:#646e78,secondary:#4bb3fd,tertiary:#ffffff,quaternary:#3a3347"
                              style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                          </div></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            }
            {details.length != 0 && duration === "lastsixmonth" &&
              <div className='min-h-[75vh]'>
                <h2 className='text-xl font-bold mt-5'>Total Expense:{totalAmount6}</h2>
                <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                  <thead className='bg-blue-600 text-white'>
                    <tr>
                      <th>Expense</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody className='bg-blue-100'>
                    {details.filter(item => {
                      const month = new Date(item.date).getMonth() + 1
                      return month >= currentMonth - 6 && month <= currentMonth
                    }).map((item, index) => {
                      return <tr key={index}>
                        <td className='text-center py-2 border border-white'>{item.ename}</td>
                        <td className='text-center py-2 border border-white'>{item.category}</td>
                        <td className='text-center py-2 border border-white'>{item.date}</td>
                        <td className='text-center py-2 border border-white'>{item.amount}</td>
                        <td className='text-center py-2 border border-white'>
                          <div className='flex flex-row gap-2 items-center justify-center'>
                            <lord-icon
                              onClick={() => { handleedit(item.id) }}
                              src="https://cdn.lordicon.com/ylvuooxd.json"
                              trigger="hover"
                              style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                            <lord-icon
                              onClick={() => { handledelete(item.id) }}
                              src="https://cdn.lordicon.com/hjbrplwk.json"
                              trigger="hover"
                              colors="primary:#646e78,secondary:#4bb3fd,tertiary:#ffffff,quaternary:#3a3347"
                              style={{ "width": "30px", "height": "30px" }}>
                            </lord-icon>
                          </div></td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            }
          </div>
        }
        {bgcolor1 === '#60a5fa' && duration === 'thismonth' &&
          <div className='md:min-h-[75vh] min-h-[50vh] m-5'>
            <h2 className='mb-3'>Food</h2>
            <div className='bg-red-600 m-2 ' style={{ width: totalsfw }}>{totalsf} </div>
            <br></br>
            <h2 className='mb-3'>Entertainment</h2>
            <div className='bg-blue-600 m-2' style={{ width: totalsew }}>{totalse} </div>
            <br></br>
            <h2 className='mb-3'>Utitlities</h2>
            <div className='bg-green-600 m-2' style={{ width: totalsuw }}>{totalsu} </div>
            <br></br>
            <h2 className='mb-3'>Travel</h2>
            <div className='bg-cyan-600' style={{ width: totalstw }}>{totalst} </div>
            <br></br>
            <h2 className='mb-3'>Others</h2>
            <div className='bg-red-600' style={{ width: totalsow }}>{totalso} </div>
          </div>
        }
        {bgcolor1 === '#60a5fa' && duration === 'lastthreemonth' &&
          <div className='md:min-h-[75vh]  min-h-[30vh] m-5'>
            <h2 className='mb-3'>Month:{currentMonth}</h2>
            <div className='bg-red-600 m-2 ' style={{ width: totalAmountw }}>{totalAmount} </div>
            <h2 className='mb-3'>Month:{currentMonth - 1}</h2>
            <div className='bg-blue-600 m-2' style={{ width: totalAmount1w }}>{totalAmount1} </div>

            <h2 className='mb-3'>Month:{currentMonth - 2}</h2>
            <div className='bg-green-600 m-2' style={{ width: totalAmount2w }}>{totalAmount2} </div>          
          </div>
        }
        {bgcolor1 === '#60a5fa'&& duration === 'lastsixmonth' &&
        <div className='min-h-[75vh]'></div>
        }
        {bgcolor1 === '#60a5fa'&& duration === 'all' &&
        <div className='min-h-[75vh]'></div>
        }
      </div>
    </div>
  )
}
export default Main
