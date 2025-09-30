import { Link } from "react-router-dom"

function AdminHome() {
  return (
    <div>
      <Link to="/admin/lisa-toode">
      <button>Lisa toode</button>
      </Link>

      <Link to="/admin/supplier">
      <button>Tarnija1</button>
      </Link>

      <Link to="/admin/supplier2">
      <button>Tarnija2</button>
      </Link>

      <Link to="/admin/supplier3">
      <button>Tarnija3</button>
      </Link>

      <Link to="/admin/halda-tooteid">
      <button>Halda tooteid</button>
      </Link>
    </div>
  )
}

export default AdminHome