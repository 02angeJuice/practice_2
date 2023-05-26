import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '../../store/slices/customerSlice'

const CustomerList = () => {
  const { customer } = useSelector((state) => ({ ...state }))

  return (
    <>
      {!customer.printer && (
        <table className="table table-auto w-full bg-neutral-800 text-white mt-10 mb-5 rounded-md shadow-2xl">
          <thead>
            <tr>
              <td>รหัส</td>
              <td>ชื่อลูกค้า</td>
              <td>ที่อยู่ลูกค้า</td>
              <td>รหัสไปรษณีย์</td>
              <td>เบอร์โทรศัพท์</td>
              <td>เบอร์แฟกซ์</td>
              <td>อีเมล</td>
            </tr>
          </thead>
          <tbody>
            {customer?.customers.map((item, index) => {
              return <Item key={index} item={item} />
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

const Item = ({ item }) => {
  const { customer } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  return (
    <>
      <tr
        className={`${
          customer?.selecting.cust_id === item.cust_id
            ? 'bg-yellow-50 text-black'
            : ''
        } hover:bg-yellow-100 hover:text-black cursor-pointer`}
        onClick={() => dispatch(selectCustomer(item))}>
        <td>{item.cust_id}</td>
        <td>{item.cust_name}</td>
        <td>{item.cust_address}</td>
        <td>{item.cust_postcode}</td>
        <td>{item.cust_phone}</td>
        <td>{item.cust_fax}</td>
        <td>{item.cust_email}</td>
      </tr>
    </>
  )
}

export default CustomerList
