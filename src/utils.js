const nextId = (items) => {
  if (items.length !== 0) {
    const prev = items[items.length - 1].cust_id
    const [cus, id] = prev.split('-')
    const increment = Number(id) + 1

    let str
    if (increment < 100) {
      str = '0'
      if (increment < 10) str = '00'
    }

    return `${cus}-${str}${increment}`
  } else {
    return 'CUS-000'
  }
}

export { nextId }
