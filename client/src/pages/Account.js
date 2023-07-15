import axios from "axios"
import { useEffect, useState } from "react"
import { useAuthContext } from "../functions/useAuthContext"

const Account = () => {
  const { user } = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState(false)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/account`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        })
        setName(res.data.name)
        setEmail(res.data.email)
        setPassword(res.data.password)
        console.log(res)
      } catch (error) {}
    }
    getUser()
  }, [user])

  const handleUpdate = async() => {
    const userData = {
      name,
      email,
      password
    }
    try {
      await axios.patch(`/api/account`, userData, {headers: {
        Authorization: `Bearer ${user.data.token}`
      }})
      setMsg(true)
      setTimeout(() => {
        setMsg(false)
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-20">
      <input
        type="text"
        value={name}
        readOnly={!edit}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className={`border rounded-md p-2 mb-4 ${
          edit ? "bg-white" : "bg-gray-100"
        }`}
      />
      <input
        type="text"
        value={email}
        readOnly={!edit}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className={`border rounded-md p-2 mb-4 ${
          edit ? "bg-white" : "bg-gray-100"
        }`}
      />
      <input
        type="password"
        value={password}
        readOnly={!edit}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className={`border rounded-md p-2 mb-4 ${
          edit ? "bg-white" : "bg-gray-100"
        }`}
      />
      <button
        onClick={() => setEdit(!edit)}
        className={`bg-blue-500 text-white rounded-md px-4 py-2 mr-2 ${
          edit ? "hidden" : "block"
        }`}
      >
        Edit
      </button>
      <button
        onClick={handleUpdate}
        className={`bg-green-500 text-white rounded-md px-4 py-2 ${
          edit ? "block" : "hidden"
        }`}
      >
        Save
      </button>
      {msg && <p className="text-green-500">User updated!</p>}
    </div>
  );
  
}

export default Account
