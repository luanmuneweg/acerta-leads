import { flexRender } from '@tanstack/react-table'
import type { Row, ColumnDef } from '@tanstack/react-table'

type TableMobileCardProps<TData> = {
    row: Row<TData>
    columns: ColumnDef<TData>[]
    mobileHeader: string
}

export default function TableMobileCard<TData>({ row, columns, mobileHeader }: TableMobileCardProps<TData>) {
    const headerCell = row.getVisibleCells().find((c) => c.column.id === mobileHeader)
    const actionsCell = row.getVisibleCells().find((c) => c.column.id === 'actions')
    const bodyCells = row.getVisibleCells().filter((c) => c.column.id !== mobileHeader && c.column.id !== 'actions')

    return (
        <div className="border-surface-grey bg-surface-white rounded border">
            <div className="border-surface-grey flex items-center justify-between border-b px-4 py-3">
                <p className="text-grey-dark text-sm font-semibold break-all">
                    {headerCell ? flexRender(headerCell.column.columnDef.cell, headerCell.getContext()) : null}
                </p>
                {actionsCell && <div className="flex shrink-0 items-center">{flexRender(actionsCell.column.columnDef.cell, actionsCell.getContext())}</div>}
            </div>
            <div className="flex flex-col gap-1 px-4 py-3">
                {bodyCells.map((cell) => {
                    const colDef = columns.find((c) => ('accessorKey' in c ? c.accessorKey === cell.column.id : c.id === cell.column.id))
                    const label = typeof colDef?.header === 'string' ? colDef.header : cell.column.id
                    return (
                        <div key={cell.id} className="flex items-start gap-1">
                            <p className="text-grey-dark shrink-0 text-sm font-semibold">{label}:</p>
                            <p className="text-grey-base text-sm break-all">{flexRender(cell.column.columnDef.cell, cell.getContext())}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
