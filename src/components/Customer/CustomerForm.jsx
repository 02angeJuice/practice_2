import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteCustomer,
  addCustomer,
  editCustomer,
  setEditMode,
  triggerPrint,
} from '../../store/slices/customerSlice'

import ReactToPrint, { useReactToPrint } from 'react-to-print'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { nextId } from '../../utils'

// const schema = Joi.object({
//   cust_id: Joi.string().required(),
//   cust_name: Joi.string().required(),
//   cust_address: Joi.string().required(),
//   cust_postcode: Joi.number().required(),
//   cust_phone: Joi.number().required(),
//   cust_fax: Joi.number().required(),
//   cust_email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required(),
// })

const schema = yup.object().shape({
  cust_id: yup.string().required(),
  cust_name: yup.string().required('กรุณาใส่ชื่อ'),
  cust_address: yup
    .string()
    .required('กรุณาใส่ที่อยู่ลูกค้า')
    .min(10, 'โปรดใส่รายละเอียดเพิ่มเติม'),
  cust_postcode: yup
    .string()
    .required('กรุณาใส่รหัสไปรษณีย์')
    .matches(/\d+/, 'กรุณาใส่รหัสไปรษณีย์ ด้วยหมายเลข'),
  cust_phone: yup
    .string()
    .required('กรุณาใส่เบอร์โทรศัพท์')
    .matches(/\d+/, 'กรุณาใส่เบอร์โทรศัพท์ ด้วยหมายเลข')
    .min(10, 'เบอร์โทรศัพท์ไม่ถูกต้อง')
    .max(12, 'เบอร์โทรศัพท์ไม่ถูกต้อง'),
  cust_fax: yup
    .string()
    .required('กรุณาใส่เบอร์แฟกซ์')
    .matches(/\d+/, 'กรุณาใส่เบอร์แฟกซ์ ด้วยหมายเลข'),
  cust_email: yup
    .string()
    .email('โปรดใส่อีเมลให้ถูกต้อง')
    .required('กรุณาใส่อีเมล'),
})

const CustomerForm = () => {
  const { customer } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' })

  useEffect(() => {
    if (customer.customers.length !== 0 && Object.keys(errors).length === 0) {
      setValue('cust_id', nextId(customer.customers))
    } else if (customer.customers.length == 0) {
      setValue('cust_id', 'CUS-000')
    }
  })

  useEffect(() => {
    if (customer.selecting) {
      Object.entries(customer.selecting).forEach(([name, value]) =>
        setValue(name, value)
      )
    }
  }, [customer.selecting, setValue])

  const handleDelete = () => {
    confirm('confirm delete...!!!') &&
      dispatch(deleteCustomer(customer.selecting))
    reset()
  }

  const handleBack = () => {
    dispatch(setEditMode(false))
    reset()
  }

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: 'customer-data',
  //   onAfterPrint: () => alert('dsdsd'),
  // })

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'customer-data',
    onAfterPrint: () => dispatch(triggerPrint(false)),
  })

  const submitForm = async (formData) => {
    if (customer.editmode) {
      dispatch(editCustomer(formData))
      reset()
    } else {
      dispatch(
        addCustomer({
          ...formData,
          cust_id: nextId(customer.customers),
        })
      )
      reset()
    }
  }

  return (
    <>
      {customer.printer && (
        <div className="w-full h-screen">
          <div>
            <ReactToPrint
              trigger={() => (
                <div
                  className="button-shadow mt-5 m-auto w-20 text-center h-10 border border-black bg-gray-600 hover:bg-gray-800 rounded-md cursor-pointer text-white"
                  onClick={() => dispatch(triggerPrint(true))}>
                  ปริ้นท์
                </div>
              )}
              content={() => componentRef.current}
              onAfterPrint={() => dispatch(triggerPrint(false))}
            />
          </div>

          <table
            ref={componentRef}
            className="table table-auto w-full px-5 text-black mt-10 mb-5 ">
            <thead className="border border-black">
              <tr className="border border-black">
                <td className="border border-black">รหัสลูกค้า</td>
                <td className="border border-black">ชื่อลูกค้า</td>
                <td className="border border-black">ที่อยู่ลูกค้า</td>
                <td className="border border-black">รหัสไปรษณีย์</td>
                <td className="border border-black">เบอร์โทรศัพท์</td>
                <td className="border border-black">เบอร์แฟกซ์</td>
                <td className="border border-black">อีเมล</td>
              </tr>
            </thead>
            <tbody>
              {customer?.customers.map((item, idx) => (
                <tr className="border border-gray-100" key={idx}>
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

      {!customer.printer && (
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-2 gap-5 pt-3">
            <div className="mb-4">
              <label className="block" htmlFor="cust_id">
                รหัสลูกค้า
              </label>
              <input
                className="w-full h-10 border rounded-md px-3 !outline-none"
                type="text"
                {...register('cust_id')}
                disabled
              />
              {errors.cust_id && (
                <small className="text-red-400">{errors.cust_id.message}</small>
              )}
            </div>
            <div>
              <label htmlFor="cust_name">ชื่อลูกค้า</label>
              <input
                className="w-full h-10 border rounded-md px-3 !outline-none"
                type="text"
                {...register('cust_name')}
              />
              {errors.cust_name && (
                <small className="text-red-400">
                  {errors.cust_name.message}
                </small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 pt-3">
            <div>
              <label htmlFor="cust_address">ที่อยู่ลูกค้า</label>
              <textarea
                className="w-full h-20 border rounded-md px-3 !outline-none"
                type="text"
                {...register('cust_address')}
              />
              {errors.cust_address && (
                <small className="text-red-400">
                  {errors.cust_address.message}
                </small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 pt-3">
            <div>
              <label htmlFor="cust_postcode">รหัสไปรษณีย์</label>
              <input
                className="w-full h-10 border rounded-md px-3 !outline-none"
                type="text"
                {...register('cust_postcode')}
              />
              {errors.cust_postcode && (
                <small className="text-red-400">
                  {errors.cust_postcode.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="cust_phone">เบอร์โทรศัพท์</label>
              <input
                className="w-full h-10 border rounded-md px-3 !outline-none"
                type="text"
                {...register('cust_phone')}
              />
              {errors.cust_phone && (
                <small className="text-red-400">
                  {errors.cust_phone.message}
                </small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 pt-3">
            <div>
              <label htmlFor="cust_fax">เบอร์แฟกซ์</label>
              <input
                className="w-full h-10 border rounded-md px-3 !outline-none"
                type="text"
                {...register('cust_fax')}
              />
              {errors.cust_fax && (
                <small className="text-red-400">
                  {errors.cust_fax.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="cust_email">อีเมล</label>
              <input
                className="w-full h-10 border rounded-md px-3 !outline-none"
                type="email"
                {...register('cust_email')}
              />
              {errors.cust_email && (
                <small className="text-red-400">
                  {errors.cust_email.message}
                </small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 pt-5 text-center">
            {!customer.editmode && (
              <button className="button-shadow w-full h-10 border border-black bg-blue-400 hover:bg-blue-600 rounded-md">
                บันทึก
              </button>
            )}
            {!customer.editmode && (
              <div
                className="button-shadow w-full h-10 border border-black bg-pink-400 hover:bg-pink-600 rounded-md cursor-pointer"
                onClick={() => {
                  reset()
                }}>
                ล้างฟอร์ม
              </div>
            )}
            {!customer.editmode && (
              <div
                className="button-shadow w-full h-10 border border-black bg-gray-600 hover:bg-gray-800 rounded-md cursor-pointer text-white"
                onClick={() => dispatch(triggerPrint(true))}>
                ปริ้นท์
              </div>
            )}
            {customer.editmode && (
              <div
                className="button-shadow w-full h-10 border border-black bg-green-300 hover:bg-green-500 rounded-md cursor-pointer text-center"
                onClick={handleBack}>
                ย้อนกลับ
              </div>
            )}
            {customer.editmode && (
              <button className="button-shadow w-full h-10 border border-black bg-yellow-300 hover:bg-yellow-500 rounded-md cursor-pointer text-center">
                แก้ไข
              </button>
            )}
            {customer.editmode && (
              <div
                className="button-shadow w-full h-10 border border-black bg-red-400 hover:bg-red-600 rounded-md cursor-pointer text-center"
                onClick={handleDelete}>
                ลบ
              </div>
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default CustomerForm
