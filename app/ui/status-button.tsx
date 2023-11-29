import React from 'react'

type Props = {}

export const PendingButton = (props: Props) => {
    return (
        <span className="inline-flex items-center bg-yellow-200 text-yellow-500 text-xs font-medium px-2 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-yellow-300 rounded-full"></span>
            Pending
        </span>
    )
}

export const DoneButton = (props: Props) => {
    return (
        <span className="inline-flex items-center bg-green-200 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            Done
        </span>
    )
}
