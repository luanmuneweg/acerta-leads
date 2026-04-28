import Loader from '@/components/loader/Loader'
import TableMobileCard from '@/components/table/TableMobileCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

type TableDefaultProps<TData> = {
    columns: ColumnDef<TData>[]
    data: TData[]
    isFetching?: boolean
    emptyText?: string
    className?: string
    mobileHeader?: string
}

export default function TableDefault<TData>({ columns, data, isFetching, emptyText, className, mobileHeader }: TableDefaultProps<TData>) {
    const skeletonRows = 5
    const hasData = data.length > 0

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const isEmpty = !isFetching && !hasData

    return (
        <div className={cn('relative w-full', className)}>
            {isFetching && hasData && (
                <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Loader variant="dark" />
                        <span className="text-darker text-sm font-semibold">Carregando</span>
                    </div>
                </div>
            )}

            {isEmpty ? (
                <div className="bg-surface-white flex h-11 items-center gap-6 px-6 py-3">
                    <p className="text-grey-light text-sm leading-[140%]">{emptyText ?? 'Nenhum resultado encontrado'}</p>
                </div>
            ) : (
                <>
                    <div className={cn(mobileHeader && 'hidden sm:block')}>
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="border-surface-grey border-x hover:bg-transparent">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isFetching && !hasData
                                    ? Array.from({ length: skeletonRows }).map((_, i) => (
                                          <TableRow key={i} className="border-surface-grey odd:bg-surface-white even:bg-surface-system h-11 border-x">
                                              {columns.map((_, j) => (
                                                  <TableCell key={j}>
                                                      <Skeleton className="h-4 w-full" />
                                                  </TableCell>
                                              ))}
                                          </TableRow>
                                      ))
                                    : table.getRowModel().rows.map((row) => (
                                          <TableRow key={row.id} className="border-surface-grey odd:bg-surface-white even:bg-surface-system h-11 border-x">
                                              {row.getVisibleCells().map((cell) => (
                                                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                              ))}
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </div>

                    {mobileHeader && (
                        <div className="flex flex-col gap-3 sm:hidden">
                            {isFetching && !hasData
                                ? Array.from({ length: skeletonRows }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)
                                : table
                                      .getRowModel()
                                      .rows.map((row) => <TableMobileCard key={row.id} row={row} columns={columns} mobileHeader={mobileHeader} />)}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
