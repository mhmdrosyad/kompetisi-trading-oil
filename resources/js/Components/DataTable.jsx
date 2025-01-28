import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

export default function DataTable({ columns, data }) {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        columns,
        data,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 border"
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none flex"
                                                        : "",
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: (
                                                    <span className="pl-2">
                                                        ↑
                                                    </span>
                                                ),
                                                desc: (
                                                    <span className="pl-2">
                                                        ↓
                                                    </span>
                                                ),
                                            }[header.column.getIsSorted()] ??
                                                null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-2 border "
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
                <div className="sm:mr-auto sm:mb-0 mb-2">
                    <select
                        className="border p-1 rounded w-16 border-gray-200"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 100, 500].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <ol className="flex justify-center gap-1 text-xs font-medium">
                        <li>
                            <button
                                onClick={() => table.previousPage()}
                                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Prev Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </li>

                        {table.getPageCount() > 1 &&
                            Array.from(
                                { length: table.getPageCount() },
                                (_, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            onClick={() =>
                                                table.setPageIndex(index)
                                            }
                                            className={`${
                                                table.getState().pagination
                                                    .pageIndex === index
                                                    ? "block size-8 rounded border-green-500 bg-green-500 text-center leading-8 text-white"
                                                    : "block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                                            }`}
                                        >
                                            {index + 1}
                                        </a>
                                    </li>
                                )
                            )}

                        <li>
                            <button
                                onClick={() => table.nextPage()}
                                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Next Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
