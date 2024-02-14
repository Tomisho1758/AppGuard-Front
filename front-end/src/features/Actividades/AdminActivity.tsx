import { useEffect } from "react"
import { columns } from "./data-table/columns"
import { DataTable } from "./data-table/data-table"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import CreateDialog from "./data-table/create-dialog"
import { getAdminActividades } from "@/redux/action-creators/actividades/admin/admin-get-actividades"
import PagesActTable from "./data-table/pagination-table"
import type { DetailType } from "@/redux/actions/actividadesActions"
import { cleanAdminActividades } from "@/redux/action-creators/actividades/admin/clean-admin-actividades"

const AdminActividades: React.FC = () => {
  const adminTable: DetailType[] = useAppSelector(
    state => state.actividadesReducer.adminTable,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    const token = localStorage.getItem("TOKEN")

    const fetchData = async () => {
      await dispatch(getAdminActividades({ token: token }))
      if (!mounted) {
        dispatch(cleanAdminActividades())
      }
    }
    fetchData()
    return () => {
      mounted = false
    }
  }, [dispatch])

  return (
    <div className="p-4 m-8 rounded border border-primary">
      <div className="flex justify-between">
        <p className="basis-2/3 text-3xl align-baseline">Actividades</p>
        <PagesActTable />
        <CreateDialog />
      </div>
      <DataTable columns={columns} data={adminTable} />
    </div>
  )
}

export default AdminActividades
