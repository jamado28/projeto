import AdminLayout from "../../layouts/AdminLayout";
import { getUser } from "../../services/authUtils";

function Dashboard() {

  const user = getUser();

  return (

    <AdminLayout>

      <h1 className="mb-4">
        Dashboard
      </h1>

      <h4>
        Bem-vindo {user?.email}
      </h4>

      <p>
        Role: {user?.role}
      </p>

    </AdminLayout>

  )

}

export default Dashboard;