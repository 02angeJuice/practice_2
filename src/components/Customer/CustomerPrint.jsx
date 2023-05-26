import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import { triggerPrint } from '../../store/slices/customerSlice'

const CustomerPrint = ({ ref }) => {
  const { customer } = useSelector((state) => ({ ...state }))

  // const dsadas = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: 'customer-data',
  //   onAfterPrint: () => console.log('dsds'),
  // })

  return (
    <>
      {customer.printer && (
        <div className="w-full h-screen" ref={ref}>
          <table className="table table-auto w-full  text-black mt-10 mb-5 ">
            <thead>
              <tr>
                <td>รหัสลูกค้า</td>
                <td>ชื่อลูกค้า</td>
                <td>ที่อยู่ลูกค้า</td>
                <td>รหัสไปรษณีย์</td>
                <td>เบอร์โทรศัพท์</td>
                <td>เบอร์แฟกซ์</td>
                <td>อีเมล</td>
              </tr>
            </thead>
            <tbody>
              {customer?.customers.map((item, index) => (
                <tr key={index}>
                  <td>{item.cust_id}</td>
                  <td>{item.cust_name}</td>
                  <td>{item.cust_address}</td>
                  <td>{item.cust_postcode}</td>
                  <td>{item.cust_phone}</td>
                  <td>{item.cust_fax}</td>
                  <td>{item.cust_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default CustomerPrint
