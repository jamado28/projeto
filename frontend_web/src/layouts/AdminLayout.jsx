import Navbar from "../components/Navbar";

function AdminLayout({ children }) {

  return (

    <>
      <Navbar />

      <div className="container mt-4">
        {children}
      </div>
    </>

  )

}

export default AdminLayout;