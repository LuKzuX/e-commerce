const fill = (length) => {
  const newArr = []
  for (let i = 0; i < length; i++) {
    newArr.push(<option key={i}>{i + 1}</option>)
  }
  return newArr
}

export default fill
